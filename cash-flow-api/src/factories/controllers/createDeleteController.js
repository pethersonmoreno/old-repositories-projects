const deleteDocument = require('../../helpers/firestore/deleteDocument');

const createReplaceController = (collationName, localName) => async (
  req,
  res
) => {
  const {
    [localName]: { id }
  } = req.locals;
  await deleteDocument(collationName, id);
  return res.json({ id, deleted: true });
};

module.exports = createReplaceController;
