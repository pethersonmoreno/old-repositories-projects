const AuthenticatedInvalidEmailError = require('../errors/AuthenticatedInvalidEmailError');
const getDocument = require('../helpers/firestore/getDocument');

const blockAuthenticatedInvalidEmail = async (req, res, next) => {
  const auth = await getDocument('config', 'auth');
  if (auth.data().validEmails.includes(req.userInfo.email)) {
    return next();
  }
  return next(new AuthenticatedInvalidEmailError());
};

module.exports = blockAuthenticatedInvalidEmail;
