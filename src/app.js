const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const { initDatabase } = require('./models/articleModel');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
const PORT = 3000;

// 1. MIDDLEWARES (AVANT TOUT LE RESTE)
app.use(cors());
app.use(express.json()); // Indispensable pour lire le JSON

// 2. CONFIG SWAGGER
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'API Blog INF222', version: '1.0.0' },
        servers: [{ url: `http://localhost:${PORT}` }],
    },
    apis: ['./src/routes/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 3. ROUTES
initDatabase();
app.use('/api/articles', articleRoutes);

app.get('/', (req, res) => {
    res.send('Serveur OK. Allez sur <a href="/api-docs">/api-docs</a>');
});

app.listen(PORT, () => {
    console.log(`🚀 Serveur : http://localhost:${PORT}`);
    console.log(`📖 Swagger : http://localhost:${PORT}/api-docs`);
});
