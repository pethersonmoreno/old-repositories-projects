/* eslint-disable require-atomic-updates */
const { LOCAL_NAME } = require('../constants');
const existDocumentWithFieldValue = require('../../../helpers/firestore/existDocumentWithFieldValue');
const ValidationError = require('../../../errors/ValidationError');

const blockUsedAccount = async (req, res, next) => {
  const {
    [LOCAL_NAME]: { id }
  } = req.locals;
  try {
    const errors = [];
    const existInCashFlows = await existDocumentWithFieldValue(
      'cashFlows',
      'accountId',
      id
    );
    const existInCashFlowSchedules = await existDocumentWithFieldValue(
      'cashFlowSchedules',
      'accountId',
      id
    );
    if (existInCashFlows) {
      errors.push({
        field: ['id'],
        location: 'params',
        messages: [
          `Account with id "${id}" is been used in cash flows collection`
        ],
        types: []
      });
    }
    if (existInCashFlowSchedules) {
      errors.push({
        field: ['id'],
        location: 'params',
        messages: [
          `Account with id "${id}" is been used in cash flow schedules collection`
        ],
        types: []
      });
    }
    if (errors.length) {
      throw new ValidationError({ errors });
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = blockUsedAccount;
