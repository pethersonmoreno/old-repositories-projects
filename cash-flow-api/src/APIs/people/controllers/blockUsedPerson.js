/* eslint-disable require-atomic-updates */
const { LOCAL_NAME } = require('../constants');
const existDocumentWithFieldValue = require('../../../helpers/firestore/existDocumentWithFieldValue');
const ValidationError = require('../../../errors/ValidationError');

const blockUsedPerson = async (req, res, next) => {
  const {
    [LOCAL_NAME]: { id }
  } = req.locals;
  try {
    const existInAccounts = await existDocumentWithFieldValue(
      'accounts',
      'personId',
      id
    );
    if (existInAccounts) {
      throw new ValidationError({
        errors: [
          {
            field: ['id'],
            location: 'params',
            messages: [
              `Person with id "${id}" is been used in accounts collection`
            ],
            types: []
          }
        ]
      });
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = blockUsedPerson;
