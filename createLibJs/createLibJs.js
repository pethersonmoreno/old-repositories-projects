const createProgram = require('./createProgram');
const createApp = require('./createApp');

const createLibJs = () => {
  const { projectName, program } = createProgram();
  createApp(projectName, program.verbose, program.template, program.typescript);
};

module.exports = createLibJs;
