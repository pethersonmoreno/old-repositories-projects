/* eslint-disable require-atomic-updates */
const getDocument = require('../../helpers/firestore/getDocument');
const ValidationError = require('../../errors/ValidationError');
const mapDocumentToDataDefault = require('../../mappers/documentToData');

const isUpdateNotChangingCashFlowDescription = (
  req,
  localName,
  cashFlowDescriptionIdField
) => req.locals &&
  req.locals[localName] &&
  req.locals[localName][cashFlowDescriptionIdField] ===
    req.body[cashFlowDescriptionIdField];

const createBlockNotFoundCashFlowDescriptionController = (
  localName,
  cashFlowDescriptionIdField,
  mapDocumentToData = mapDocumentToDataDefault
) => async (req, res, next) => {
  const notLoadAndVerifyCashFlowDescription = isUpdateNotChangingCashFlowDescription(
    req,
    localName,
    cashFlowDescriptionIdField
  );
  if (notLoadAndVerifyCashFlowDescription) {
    return next();
  }
  try {
    const cashFlowDescriptionDoc = await getDocument(
      'cashFlowDescriptions',
      req.body[cashFlowDescriptionIdField]
    );
    if (!cashFlowDescriptionDoc.exists) {
      throw new ValidationError({
        errors: [
          {
            field: [cashFlowDescriptionIdField],
            location: 'body',
            messages: [
              `Not found cash flow description with id "${req.body[cashFlowDescriptionIdField]}"`
            ],
            types: []
          }
        ]
      });
    }
    const cashFlowDescription = mapDocumentToData(cashFlowDescriptionDoc);
    if (!req.locals) {
      req.locals = {};
    }
    req.locals.cashFlowDescription = cashFlowDescription;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = createBlockNotFoundCashFlowDescriptionController;
