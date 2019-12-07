const taskSchema = require('./taskSchema');

const validatorTask = async (task) => {
  await taskSchema.validateAsync(task);
}

module.exports = validatorTask;
