const httpStatus = require('http-status');
const Error = require('./Error');

class AuthenticatedInvalidEmailError extends Error {
  constructor() {
    super({
      message: 'Your e-mail is not authorized to make this request',
      status: httpStatus.UNAUTHORIZED
    });
  }
}

module.exports = AuthenticatedInvalidEmailError;
