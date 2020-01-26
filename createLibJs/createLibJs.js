const createProgram = require('./createProgram');
const createApp = require('./createApp');

const createLibJs = async () => {
  const { projectName, program, packageManager } = await createProgram();
  await createApp(
    projectName,
    packageManager,
    program.verbose,
    program.template,
    program.typescript,
  );
};

module.exports = createLibJs;
