class ExtendableError extends Error {
  constructor({ message, errors, status, stack }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.stack = stack;
  }
}

module.exports = ExtendableError;
