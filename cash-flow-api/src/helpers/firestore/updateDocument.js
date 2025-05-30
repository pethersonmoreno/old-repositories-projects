const getCollection = require('./getCollection');

const updateDocument = (collection, documentPath, data) => getCollection(collection)
    .doc(documentPath)
    .update(data);

module.exports = updateDocument;
