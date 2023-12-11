const express = require('express');
const routes = require('./routes');

const { swaggerUi, specs } = require('./swagger');

const app = express();

app.use(express.json());

app.use('/', routes, swaggerUi.serve);
app.get('/', swaggerUi.setup(specs));

module.exports = app;
