const admin = require('firebase-admin');
const getAuthToken = require('../helpers/getAuthToken');

const loadUserAuthenticatedInfo = async (req, res, next) => {
  const authToken = getAuthToken(req.headers);
  req.userInfo = null;
  if (!authToken) {
    next();
    return;
  }
  try {
    req.userInfo = await admin.auth().verifyIdToken(authToken);
    next();
  } catch (e) {
    next();
  }
};

module.exports = loadUserAuthenticatedInfo;
