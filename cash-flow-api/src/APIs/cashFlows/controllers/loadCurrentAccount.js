const getDocument = require('../../../helpers/firestore/getDocument');
const ValidationError = require('../../../errors/ValidationError');
const { LOCAL_NAME } = require('../constants');
const mapDocumentToData = require('../../../mappers/documentToData');

const loadCurrentAccount = async (req, res, next) => {
  const { accountId } = req.locals[LOCAL_NAME];
  try {
    const doc = await getDocument('accounts', accountId);
    if (!doc.exists) {
      throw new ValidationError({
        errors: [
          {
            field: ['id'],
            location: 'params',
            messages: [`Not found current account with id "${accountId}"`],
            types: []
          }
        ]
      });
    }
    const documentData = mapDocumentToData(doc);
    req.locals.account = documentData;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = loadCurrentAccount;
