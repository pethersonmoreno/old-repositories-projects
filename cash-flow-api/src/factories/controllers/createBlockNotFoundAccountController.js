/* eslint-disable require-atomic-updates */
const getDocument = require('../../helpers/firestore/getDocument');
const ValidationError = require('../../errors/ValidationError');
const mapDocumentToDataDefault = require('../../mappers/documentToData');

const isUpdateNotChangingAccountData = (
  req,
  localName,
  accountIdField,
  otherFieldsToLoadAccount
) => {
  if (!req.locals || !req.locals[localName]) {
    return false;
  }
  const updatedAccountIdReference =
    req.locals[localName][accountIdField] === req.body[accountIdField];
  if (!updatedAccountIdReference) {
    return false;
  }
  const foundOtherFieldChanged =
    otherFieldsToLoadAccount.find(
      fieldName => req.locals[localName][fieldName] !== req.body[fieldName]
    ) !== undefined;
  return !foundOtherFieldChanged;
};

const createBlockNotFoundAccountController = (
  localName,
  accountIdField,
  otherFieldsToLoadAccount = [],
  mapDocumentToData = mapDocumentToDataDefault
) => async (req, res, next) => {
  const notLoadAndVerifyAccount = isUpdateNotChangingAccountData(
    req,
    localName,
    accountIdField,
    otherFieldsToLoadAccount
  );
  if (notLoadAndVerifyAccount) {
    return next();
  }
  try {
    const accountDoc = await getDocument('accounts', req.body[accountIdField]);
    if (!accountDoc.exists) {
      throw new ValidationError({
        errors: [
          {
            field: [accountIdField],
            location: 'body',
            messages: [
              `Not found account with id "${req.body[accountIdField]}"`
            ],
            types: []
          }
        ]
      });
    }
    const account = mapDocumentToData(accountDoc);
    if (!req.locals) {
      req.locals = {};
    }
    req.locals.account = account;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = createBlockNotFoundAccountController;
