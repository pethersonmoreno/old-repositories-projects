const Joi = require('@hapi/joi');
const idSchema = require('../../../schemas/id');

module.exports = {
  personId: idSchema.required(),
  description: Joi.string()
    .min(3)
    .max(30)
    .required(),
  currentValue: Joi.number().required()
};
