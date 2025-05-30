const functions = require('firebase-functions');

process.env.FIREBASE_SERVE = true;
if (functions.config().cashflowapi && functions.config().cashflowapi.firebase) {
  process.env.FIREBASE_API_KEY = functions.config().cashflowapi.firebase.apikey;
  process.env.FIREBASE_PROJECT_ID = functions.config().cashflowapi.firebase.projectid;
  process.env.FIREBASE_DATABASE_URL = functions.config().cashflowapi.firebase.databaseurl;
}
const app = require('./app');

exports.api = functions.https.onRequest(app);
