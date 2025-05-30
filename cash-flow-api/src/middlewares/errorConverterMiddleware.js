const mapError = require('../mappers/error');

const errorConverter = (error, req, res, next) => next(mapError(error));

module.exports = errorConverter;
