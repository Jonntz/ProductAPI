const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const productRoutes = require('./routes/productRoutes');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const cors = require("cors");


app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000', 'https://productapi-lzfn.onrender.com:10000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, UPDATE, PUT");
    next();
});

app.use(cors(
    {
        origin: "*",
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
        credentials: true,
    }
));

dotenv.config();

app.use(express.json());
app.use('/products', productRoutes);

// Adicione a rota de documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
