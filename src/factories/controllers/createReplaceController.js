const replaceDocument = require('../../helpers/firestore/replaceDocument');

const createReplaceController = (
  collationName,
  localName,
  mapDataToDocument
) => async (req, res) => {
  const {
    [localName]: { id }
  } = req.locals;
  const documentData = mapDataToDocument(req.body);
  await replaceDocument(collationName, id, documentData);
  return res.json({ id, ...req.body });
};

module.exports = createReplaceController;
