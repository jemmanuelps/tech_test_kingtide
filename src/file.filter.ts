const fileFilter = function (req: any, file: any, cb: any) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|docx)$/)) {
        return cb(new Error('Only jpg, jpeg, png, pdf and docx files are allowed!'), false);
    }
    cb(null, true);
};

export { fileFilter }