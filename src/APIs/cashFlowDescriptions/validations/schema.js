const Joi = require('@hapi/joi');

module.exports = {
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
};
