const httpStatus = require('http-status');

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack
  };

  if (process.env.NODE_ENV !== 'development') {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};

module.exports = errorMiddleware;
