const Joi = require('@hapi/joi');
const CashFlowInOutEnum = require('../../../enums/CashFlowInOutEnum');
const idSchema = require('../../../schemas/id');
const dateOnlySchema = require('../../../schemas/dateOnly');

module.exports = {
  inOut: Joi.valid(
    CashFlowInOutEnum.INPUT,
    CashFlowInOutEnum.OUTPUT
  ).required(),
  accountId: idSchema.required(),
  nextDate: dateOnlySchema.required(),
  value: Joi.number().required(),
  cashFlowDescriptionId: idSchema.required(),
  repeat: Joi.valid('none', 'week', 'month', 'year').required()
};
