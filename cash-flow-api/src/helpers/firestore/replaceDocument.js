const getCollection = require('./getCollection');

const replaceDocument = (collection, documentPath, data) => getCollection(collection)
    .doc(documentPath)
    .set(data);

module.exports = replaceDocument;
