const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    info: {
        title: 'Product API',
        version: '1.0.0',
        description: 'API para gerenciar produtos usando PrismaORM e Supabase',
    },
    host: 'productapi-lzfn.onrender.com', // Substitua pelo seu host e porta
    basePath: '/',
};

const options = {
    swaggerDefinition,
    apis: [`${__dirname}/controller/productController.js`], // Substitua pelo caminho correto das suas rotas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
