require('module-alias/register');
const admin = require('firebase-admin');
require('dotenv').config();
const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');

const serviceAccount = require('../serviceAccountKey.json');

const corsMiddleware = require('./middlewares/corsMiddleware');
const blockUnauthenticated = require('./middlewares/blockUnauthenticated');
const blockAuthenticatedInvalidEmail = require('./middlewares/blockAuthenticatedInvalidEmail');
const notFoundMiddleware = require('./middlewares/notFoundMiddleware');
const errorConverterMiddleware = require('./middlewares/errorConverterMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');

const peopleRouter = require('./APIs/people');
const accountsRouter = require('./APIs/accounts');
const cashFlowDescriptionsRouter = require('./APIs/cashFlowDescriptions');
const cashFlowsRouter = require('./APIs/cashFlows');
const cashFlowSchedulesRouter = require('./APIs/cashFlowSchedules');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const app = express();
const router = express.Router();

const securityActive = true;

if (securityActive) {
  app.use(corsMiddleware);
  app.use(blockUnauthenticated);

  router.get('/isValidEmail', (req, res) => {
    blockAuthenticatedInvalidEmail(req, res, error => {
      res.json(!error);
    });
  });
}
router.get('/', (req, res) => {
  res.send('index test');
});
app.use('/', router);

if (securityActive) {
  app.use(blockAuthenticatedInvalidEmail);
}
app.use(bodyParser.json());

app.use('/people', peopleRouter);
app.use('/accounts', accountsRouter);
app.use('/cashFlowDescriptions', cashFlowDescriptionsRouter);
app.use('/cashFlows', cashFlowsRouter);
app.use('/cashFlowSchedules', cashFlowSchedulesRouter);

app.use(notFoundMiddleware);
app.use(errorConverterMiddleware);
app.use(errorMiddleware);

module.exports = app;
