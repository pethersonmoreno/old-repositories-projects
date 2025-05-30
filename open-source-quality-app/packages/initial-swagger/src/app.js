const path = require('path');
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.resolve(__dirname, './swagger.yml'));
 
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = { app }