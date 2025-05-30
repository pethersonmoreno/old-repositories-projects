const httpStatus = require('http-status');
const Error = require('./Error');

class UnauthenticatedError extends Error {
  constructor() {
    super({
      message: 'Request not authorized to make this request',
      status: httpStatus.UNAUTHORIZED
    });
  }
}

module.exports = UnauthenticatedError;
