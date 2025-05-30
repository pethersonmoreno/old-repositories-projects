const Joi = require('@hapi/joi');

Joi.validate = (request, schema, joiOptions, callbackResult) => {
  const { error, value } = Joi.object(schema).validate(request, joiOptions);
  callbackResult(error, value);
};

module.exports = Joi;
