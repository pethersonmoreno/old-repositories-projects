const mapDataToDocument = require('../../../mappers/dataToDocument');

const mapDataToDocumentScheduling = data => {
  const documentData = mapDataToDocument(data);
  documentData.nextDate = new Date(documentData.nextDate);
  return documentData;
};

module.exports = mapDataToDocumentScheduling;
