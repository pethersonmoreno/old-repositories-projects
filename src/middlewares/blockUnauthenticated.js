const UnauthenticatedError = require('../errors/UnauthenticatedError');
const loadUserAuthenticatedInfo = require('./loadUserAuthenticatedInfo');

const blockUnauthenticated = (req, res, next) => {
  loadUserAuthenticatedInfo(req, res, () => {
    if (req.userInfo) {
      return next();
    }
    return next(new UnauthenticatedError());
  });
};

module.exports = blockUnauthenticated;
