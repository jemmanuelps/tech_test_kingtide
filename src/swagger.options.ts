export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'kingtide-test-backend',
            description: 'Users and files api',
            version: '1.0.0'
        },
        servers: [
            {
                url:'http://localhost:3030',
            }
        ]
    },
    apis: ['./src/routes/*.ts']
}