const getCollection = require('./getCollection');

const existDocumentWithFieldValue = async (
  collectionName,
  fieldName,
  value
) => {
  const listWithFirstFound = await getCollection(collectionName)
    .where(fieldName, '==', value)
    .limit(1)
    .get();
  return listWithFirstFound.size > 0;
};

module.exports = existDocumentWithFieldValue;
