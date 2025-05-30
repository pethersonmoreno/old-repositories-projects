const mapDocumentToDataDefault = require('../../mappers/documentToData');
const mapDataToDocumentDefault = require('../../mappers/dataToDocument');
const createLoadController = require('./createLoadController');
const createListController = require('./createListController');
const createGetItemController = require('./createGetItemController');
const createCreateController = require('./createCreateController');
const createReplaceController = require('./createReplaceController');
const createDeleteController = require('./createDeleteController');

const createCommonControllers = (
  collationName,
  localName,
  perPageDefault,
  mapDocumentToData = mapDocumentToDataDefault,
  mapDataToDocument = mapDataToDocumentDefault
) => {
  const load = createLoadController(
    collationName,
    localName,
    mapDocumentToData
  );
  const list = createListController(
    collationName,
    perPageDefault,
    mapDocumentToData
  );
  const get = createGetItemController(localName);
  const create = createCreateController(collationName, mapDataToDocument);
  const replace = createReplaceController(
    collationName,
    localName,
    mapDataToDocument
  );
  const deleteController = createDeleteController(collationName, localName);
  return {
    load,
    list,
    get,
    create,
    replace,
    delete: deleteController
  };
};

module.exports = createCommonControllers;
