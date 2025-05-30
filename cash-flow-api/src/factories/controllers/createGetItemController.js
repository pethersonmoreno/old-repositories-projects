const createGetItemController = localName => async (req, res) => {
  const { [localName]: documentData } = req.locals;
  return res.json(documentData);
};

module.exports = createGetItemController;
