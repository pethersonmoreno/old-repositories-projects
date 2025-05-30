const Joi = require('@hapi/joi');

module.exports = Joi.string().regex(/^[0-9a-zA-Z]{20}$/, 'identifier');
