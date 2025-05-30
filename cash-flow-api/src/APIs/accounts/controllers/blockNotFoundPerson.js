/* eslint-disable require-atomic-updates */
const { LOCAL_NAME } = require('../constants');
const getDocument = require('../../../helpers/firestore/getDocument');
const ValidationError = require('../../../errors/ValidationError');
const mapDocumentToData = require('../../../mappers/documentToData');

const isUpdateNotChangingPerson = req => req.locals &&
  req.locals[LOCAL_NAME] &&
  req.locals[LOCAL_NAME].personId === req.body.personId;

const blockNotFoundPerson = async (req, res, next) => {
  if (isUpdateNotChangingPerson(req)) {
    return next();
  }
  try {
    const personDoc = await getDocument('people', req.body.personId);
    if (!personDoc.exists) {
      throw new ValidationError({
        errors: [
          {
            field: ['personId'],
            location: 'body',
            messages: [`Not found person with id "${req.body.personId}"`],
            types: []
          }
        ]
      });
    }
    const person = mapDocumentToData(personDoc);
    if (!req.locals) {
      req.locals = {};
    }
    req.locals.person = person;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = blockNotFoundPerson;
