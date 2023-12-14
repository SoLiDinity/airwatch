const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use('/', routes);

module.exports = app;
