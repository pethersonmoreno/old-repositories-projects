const httpStatus = require('http-status');
const ExtendableError = require('./ExtendableError');

class Error extends ExtendableError {
  constructor({
    message,
    errors,
    stack,
    status = httpStatus.INTERNAL_SERVER_ERROR
  }) {
    super({
      message,
      errors,
      status,
      stack
    });
  }
}

module.exports = Error;
