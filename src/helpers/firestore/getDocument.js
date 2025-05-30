const getCollection = require('./getCollection');

const getDocument = (collection, documentPath) => getCollection(collection)
    .doc(documentPath)
    .get();

module.exports = getDocument;
