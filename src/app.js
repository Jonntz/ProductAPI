const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const productRoutes = require('./routes/productRoutes');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

dotenv.config();

app.use(express.json());
app.use('/products', productRoutes);

// Adicione a rota de documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
