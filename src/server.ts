import http from 'http';
import express, { Express } from 'express';
import multer from 'multer'
import morgan from 'morgan';
import routes from './routes/routes';
import dotenv from 'dotenv';
import { databaseConnection } from './db.connection';
import { fileFilter } from './file.filter';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './swagger.options';
import cors from 'cors';

const router: Express = express();
dotenv.config();

/** Logging */
router.use(morgan('dev'));

/** Multer */
const storage = multer.diskStorage({
    destination: path.join(__dirname, process.env.STATIC_PATH ?? ''),
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname).toLocaleLowerCase());
    }
});

const upload = multer({
    dest: `${process.env.UPLOAD_PATH}/`,
    fileFilter,
    limits: { fileSize: 5242880 },
    storage
});

/** Express config */
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

/** CORS */
router.use(
    cors({
        allowedHeaders: ["Authorization", "Content-type", "Accept"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: "*",
        preflightContinue: false,
    })
);

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PUT PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

const specs = swaggerJSDoc(options);
/** Routes */
databaseConnection().then(() => {
    router.use(upload.single(process.env.FILE_NAME_POST ?? ''));
    router.use('/', routes);
    router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('not found');
        return res.status(404).json({
            message: error.message
        });
    });
})
    .catch((error: Error) => {
        console.error('Database connection failed', error);
        process.exit();
    });

/** Server */
const httpServer = http.createServer(router);
httpServer.listen(process.env.PORT, () => console.log(`The server is running on port ${process.env.PORT}`));