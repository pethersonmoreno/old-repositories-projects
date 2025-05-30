const Error = require('./Error');

class ValidationError extends Error {
  constructor({ errors, status, stack }) {
    super({
      message: 'Validation Error',
      errors,
      status,
      stack
    });
  }
}

module.exports = ValidationError;
