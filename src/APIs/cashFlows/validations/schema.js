const Joi = require('@hapi/joi');
const CashFlowInOutEnum = require('../../../enums/CashFlowInOutEnum');
const idSchema = require('../../../schemas/id');

module.exports = {
  inOut: Joi.valid(
    CashFlowInOutEnum.INPUT,
    CashFlowInOutEnum.OUTPUT
  ).required(),
  accountId: idSchema.required(),
  dateTime: Joi.date().required(),
  value: Joi.number()
    .invalid(0)
    .required(),
  cashFlowDescriptionId: idSchema.required()
};
