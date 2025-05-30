const getCollection = require('./getCollection');

const deleteDocument = (collection, documentPath) => getCollection(collection)
    .doc(documentPath)
    .delete();

module.exports = deleteDocument;
