const NotFoundError = require('../errors/NotFoundError');

const notFoundMiddleware = () => {
  throw new NotFoundError();
};

module.exports = notFoundMiddleware;
