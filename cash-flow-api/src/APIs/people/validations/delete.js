const idSchema = require('../../../schemas/id');

module.exports = {
  params: {
    id: idSchema.required()
  },
  options: {
    allowUnknownParams: false
  }
};
