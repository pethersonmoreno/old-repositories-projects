const expressValidation = require('express-validation');
const ValidationError = require('../errors/ValidationError');
const Error = require('../errors/Error');

const mapError = error => {
  if (error instanceof Error) {
    return error;
  }

  if (error instanceof expressValidation.ValidationError) {
    return new ValidationError({
      errors: error.errors,
      status: error.status,
      stack: error.stack
    });
  }

  return new Error({
    message: error.message,
    status: error.status,
    stack: error.stack
  });
};

module.exports = mapError;
