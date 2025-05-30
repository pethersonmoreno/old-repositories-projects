const getAuthToken = headers => {
  if (
    headers.authorization &&
    headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return headers.authorization.split(' ')[1];
  }
  return null;
};

module.exports = getAuthToken;
