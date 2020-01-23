const createProgram = require('./createProgram');
const createApp = require('./createApp');

const createJsLibrary = () => {
  const { projectName, program } = createProgram();
  createApp(projectName, program.verbose, program.template, program.typescript);
};

module.exports = createJsLibrary;
