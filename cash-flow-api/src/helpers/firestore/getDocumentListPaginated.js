const getCollection = require('./getCollection');

const getDocumentListPaginated = async (
  collationName,
  page,
  perPage,
  orderBy,
  orderByDirection
) => {
  let query = getCollection(collationName);
  if (orderBy) {
    query = query.orderBy(
      orderBy,
      orderByDirection === 'desc' ? 'desc' : 'asc'
    );
  }
  const skip = perPage * (page - 1);
  if (skip > 0) {
    const firstDocsSnapshots = await query.limit(skip).get();
    const lastVisible =
      firstDocsSnapshots.docs[firstDocsSnapshots.docs.length - 1];
    return query
      .startAfter(lastVisible)
      .limit(perPage)
      .get();
  }
  return query.limit(perPage).get();
};

module.exports = getDocumentListPaginated;
