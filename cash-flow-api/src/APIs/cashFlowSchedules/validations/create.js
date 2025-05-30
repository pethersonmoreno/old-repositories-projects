const schema = require('./schema');

module.exports = {
  body: schema,
  options: {
    allowUnknownBody: false
  }
};
