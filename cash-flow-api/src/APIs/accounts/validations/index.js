const list = require('./list');
const get = require('./get');
const create = require('./create');
const replace = require('./replace');
const deleteValidation = require('./delete');

module.exports = {
  list,
  get,
  create,
  replace,
  delete: deleteValidation
};
