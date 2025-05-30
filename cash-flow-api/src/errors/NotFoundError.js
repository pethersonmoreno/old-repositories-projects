const httpStatus = require('http-status');
const Error = require('./Error');

class NotFoundError extends Error {
  constructor() {
    super({
      status: httpStatus.NOT_FOUND
    });
  }
}

module.exports = NotFoundError;
