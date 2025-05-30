const getCollection = require('./getCollection');

const addDocument = (collection, data) => getCollection(collection).add(data);

module.exports = addDocument;
