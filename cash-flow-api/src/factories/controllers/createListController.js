const getDocumentListPaginated = require('../../helpers/firestore/getDocumentListPaginated');
const ValidationError = require('../../errors/ValidationError');

const createListController = (
  collationName,
  perPageDefault,
  mapDocumentToData
) => async (req, res) => {
  const {
    page = 1,
    perPage = perPageDefault,
    orderBy = null,
    orderByDirection = null
  } = req.query;
  if (orderByDirection !== null && orderBy === null) {
    throw new ValidationError({
      errors: [
        {
          field: ['orderByDirection'],
          location: 'query',
          messages: [
            `Cannot use orderByDirection without orderBy in query string`
          ],
          types: []
        }
      ]
    });
  }
  const snapshot = await getDocumentListPaginated(
    collationName,
    page,
    perPage,
    orderBy,
    orderByDirection
  );
  const list = snapshot.docs.map(mapDocumentToData);
  return res.json(list);
};

module.exports = createListController;
