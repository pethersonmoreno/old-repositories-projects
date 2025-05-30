const admin = require('firebase-admin');

const getCollection = collection => admin.firestore().collection(collection);

module.exports = getCollection;
