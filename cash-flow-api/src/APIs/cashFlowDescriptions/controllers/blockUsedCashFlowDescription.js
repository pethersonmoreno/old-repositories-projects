const { LOCAL_NAME } = require('../constants');
const existDocumentWithFieldValue = require('../../../helpers/firestore/existDocumentWithFieldValue');
const ValidationError = require('../../../errors/ValidationError');

const blockUsedCashFlowDescription = async (req, res, next) => {
  const {
    [LOCAL_NAME]: { id }
  } = req.locals;
  try {
    const errors = [];
    const existInCashFlows = await existDocumentWithFieldValue(
      'cashFlows',
      'cashFlowDescriptionId',
      id
    );
    const existInCashFlowSchedules = await existDocumentWithFieldValue(
      'cashFlowSchedules',
      'cashFlowDescriptionId',
      id
    );
    if (existInCashFlows) {
      errors.push({
        field: ['id'],
        location: 'params',
        messages: [
          `Cash Flow Description with id "${id}" is been used in cash flows collection`
        ],
        types: []
      });
    }
    if (existInCashFlowSchedules) {
      errors.push({
        field: ['id'],
        location: 'params',
        messages: [
          `Cash Flow Description with id "${id}" is been used in cash flow schedules collection`
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

module.exports = blockUsedCashFlowDescription;
