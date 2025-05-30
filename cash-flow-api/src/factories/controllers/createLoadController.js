/* eslint-disable require-atomic-updates */
const NotFoundError = require('../../errors/NotFoundError');
const getDocument = require('../../helpers/firestore/getDocument');

const createLoadController = (
  collationName,
  localName,
  mapDocumentToData
) => paramRouteName => async (req, res, next) => {
  const { [paramRouteName]: id } = req.params;
  try {
    const doc = await getDocument(collationName, id);
    if (!doc.exists) {
      throw new NotFoundError();
    }
    const documentData = mapDocumentToData(doc);
    req.locals = { [localName]: documentData };
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = createLoadController;
