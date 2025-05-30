const {
  COLLATION_NAME,
  LOCAL_NAME,
  PER_PAGE_DEFAULT
} = require('../constants');
const createCommonControllers = require('../../../factories/controllers/createCommonControllers');

module.exports = createCommonControllers(
  COLLATION_NAME,
  LOCAL_NAME,
  PER_PAGE_DEFAULT
);
