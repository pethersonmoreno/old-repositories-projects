const idSchema = require('../../../schemas/id');
const schema = require('./schema');

module.exports = {
  body: schema,
  params: {
    id: idSchema.required()
  },
  options: {
    allowUnknownBody: false,
    allowUnknownParams: false
  }
};
