const updateDocument = require('../../../helpers/firestore/updateDocument');

const undoUpdateAccountCurrentValueOnError = async (error, req, res, next) => {
  try {
    if (req.locals && req.locals.updatedAccount) {
      const { account, accountOld } = req.locals;
      await updateDocument('accounts', account.id, {
        currentValue: account.currentValue
      });
      if (accountOld) {
        await updateDocument('accounts', accountOld.id, {
          currentValue: accountOld.currentValue
        });
      }
    }
    return next(error);
  } catch (errorOnUndo) {
    return next(errorOnUndo);
  }
};

module.exports = undoUpdateAccountCurrentValueOnError;
