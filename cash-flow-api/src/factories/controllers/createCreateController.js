const addDocument = require('../../helpers/firestore/addDocument');

const createCreateController = (collationName, mapDataToDocument) => async (
  req,
  res
) => {
  const documentData = mapDataToDocument(req.body);
  const { id } = await addDocument(collationName, documentData);
  return res.json({ id, ...req.body });
};

module.exports = createCreateController;
