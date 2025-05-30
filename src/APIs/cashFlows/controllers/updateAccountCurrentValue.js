/* eslint-disable require-atomic-updates */
const { LOCAL_NAME } = require('../constants');
const CashFlowInOutEnum = require('../../../enums/CashFlowInOutEnum');
const getDocument = require('../../../helpers/firestore/getDocument');
const ValidationError = require('../../../errors/ValidationError');
const mapDocumentToData = require('../../../mappers/documentToData');
const updateDocument = require('../../../helpers/firestore/updateDocument');

const isUpdate = req => req.method === 'PUT';
const isDelete = req => req.method === 'DELETE';

const isUpdateNotChangingValue = req => isUpdate(req) &&
  req.locals[LOCAL_NAME].value === req.body.value &&
  req.locals[LOCAL_NAME].inOut === req.body.inOut;

const getOldAccountById = async oldAccountId => {
  const accountDoc = await getDocument('accounts', oldAccountId);
  if (!accountDoc.exists) {
    throw new ValidationError({
      errors: [
        {
          field: ['accountId'],
          location: 'body',
          messages: [`Not found old account with id "${oldAccountId}"`],
          types: []
        }
      ]
    });
  }
  return mapDocumentToData(accountDoc);
};

const updateAccountCurrentValue = async (req, res, next) => {
  if (isUpdateNotChangingValue(req)) {
    return next();
  }
  try {
    const { account: accountCurrent } = req.locals;

    if (isDelete(req)) {
      const valueDiffCurrent =
        req.locals[LOCAL_NAME].value *
        (req.locals[LOCAL_NAME].inOut === CashFlowInOutEnum.INPUT ? 1 : -1);
      await updateDocument('accounts', accountCurrent.id, {
        currentValue: accountCurrent.currentValue - valueDiffCurrent
      });
    } else {
      const valueDiffCurrent =
        req.body.value * (req.body.inOut === CashFlowInOutEnum.INPUT ? 1 : -1);

      const updated = isUpdate(req);
      const changedAccountReference =
        updated && req.locals[LOCAL_NAME].accountId !== req.body.accountId;
      const valueDiffOld = updated
        ? req.locals[LOCAL_NAME].value *
          (req.locals[LOCAL_NAME].inOut === CashFlowInOutEnum.INPUT ? 1 : -1)
        : 0;
      if (changedAccountReference) {
        const accountOld = await getOldAccountById(
          req.locals[LOCAL_NAME].accountId
        );
        req.locals.accountOld = accountOld;
        await updateDocument('accounts', accountOld.id, {
          currentValue: accountOld.currentValue - valueDiffOld
        });
        await updateDocument('accounts', accountCurrent.id, {
          currentValue: accountCurrent.currentValue + valueDiffCurrent
        });
      } else {
        const valueDiff = valueDiffCurrent - valueDiffOld;
        await updateDocument('accounts', accountCurrent.id, {
          currentValue: accountCurrent.currentValue + valueDiff
        });
      }
    }
    req.locals.updatedAccount = true;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = updateAccountCurrentValue;
