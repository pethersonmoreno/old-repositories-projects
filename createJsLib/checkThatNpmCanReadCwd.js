const chalk = require('chalk');
const spawn = require('cross-spawn');

const getChildOutputFromConfigList = () => {
  try {
    return spawn.sync('npm', ['config', 'list']).output.join('');
  } catch (err) {
    return null;
  }
};

const getCurrentCwdFromNpm = () => {
  const childOutput = getChildOutputFromConfigList();
  if (typeof childOutput !== 'string') {
    return;
  }
  const lines = childOutput.split('\n');
  const prefix = '; cwd = ';
  const line = lines.find(line => line.startsWith(prefix));
  if (!line) {
    return;
  }
  return line.substring(prefix.length);
};
const showErrorNpmCwd = (cwd, npmCWD) => {
  console.error(
    chalk.red(
      `Could not start an npm process in the right directory.\n\n` +
        `The current directory is: ${chalk.bold(cwd)}\n` +
        `However, a newly started npm process runs in: ${chalk.bold(
          npmCWD,
        )}\n\n` +
        `This is probably caused by a misconfigured system terminal shell.`,
    ),
  );
  if (process.platform === 'win32') {
    console.error(
      chalk.red(`On Windows, this can usually be fixed by running:\n\n`) +
        `  ${chalk.cyan(
          'reg',
        )} delete "HKCU\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n` +
        `  ${chalk.cyan(
          'reg',
        )} delete "HKLM\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n\n` +
        chalk.red(`Try to run the above two lines in the terminal.\n`) +
        chalk.red(
          `To learn more about this problem, read: https://blogs.msdn.microsoft.com/oldnewthing/20071121-00/?p=24433/`,
        ),
    );
  }
};

const checkThatNpmCanReadCwd = () => {
  const npmCWD = getCurrentCwdFromNpm();
  if (typeof npmCWD !== 'string') {
    return true;
  }
  const cwd = process.cwd();
  if (npmCWD === cwd) {
    return true;
  }
  showErrorNpmCwd(cwd, npmCWD);
  return false;
};

module.exports = checkThatNpmCanReadCwd;
