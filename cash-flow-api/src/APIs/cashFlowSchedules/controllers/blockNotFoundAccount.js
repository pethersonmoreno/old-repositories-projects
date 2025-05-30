const { LOCAL_NAME } = require('../constants');
const createBlockNotFoundAccountController = require('../../../factories/controllers/createBlockNotFoundAccountController');

module.exports = createBlockNotFoundAccountController(LOCAL_NAME, 'accountId');
