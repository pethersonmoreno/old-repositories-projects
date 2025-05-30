const { LOCAL_NAME } = require('../constants');
const createBlockNotFoundCashFlowDescriptionController = require('../../../factories/controllers/createBlockNotFoundCashFlowDescriptionController');

module.exports = createBlockNotFoundCashFlowDescriptionController(
  LOCAL_NAME,
  'cashFlowDescriptionId'
);
