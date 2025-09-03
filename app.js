const express = require('express');
const userController = require('./controllers/userController');
const transferController = require('./controllers/transferController');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const authenticateJWT = require('./middlewares/authenticateToken');

const app = express();
app.use(express.json());

// User routes
app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/users', userController.getUsers);

// Transfer routes protegidas por JWT
app.post('/transfer', authenticateJWT, transferController.transfer);
app.get('/transfers', authenticateJWT, transferController.getTransfers);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
