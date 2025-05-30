const chalk = require('chalk');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const semver = require('semver');
const checkThatNpmCanReadCwd = require('./checkThatNpmCanReadCwd');
const isSafeToCreateProjectIn = require('./isSafeToCreateProjectIn');
const checkAppName = require('./checkAppName');
const checkNpmVersion = require('./checkNpmVersion');
const run = require('./run');

const createApp = async (
  name,
  packageManager,
  verbose,
  template,
  useTypeScript,
) => {
  const unsupportedNodeVersion = !semver.satisfies(process.version, '>=8.10.0');
  if (unsupportedNodeVersion) {
    console.error(
      chalk.red(
        `You are using Node ${process.version}. Node 8.10 or higher is required.\n`,
      ),
    );

    process.exit(1);
  }

  const root = path.resolve(name);
  const appName = path.basename(root);

  checkAppName(appName);
  fs.ensureDirSync(name);
  if (!isSafeToCreateProjectIn(root, name)) {
    process.exit(1);
  }
  console.log();

  console.log(`Creating a new JS Library in ${chalk.green(root)}.`);
  console.log();

  const packageJson = {
    name: appName,
    version: '0.1.0',
    private: true,
  };
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL,
  );

  const originalDirectory = process.cwd();
  process.chdir(root);
  if (!checkThatNpmCanReadCwd()) {
    process.exit(1);
  }

  const npmInfo = checkNpmVersion();
  if (!npmInfo.hasMinNpm) {
    if (npmInfo.npmVersion) {
      console.log(
        chalk.yellow(
          `You are using npm ${npmInfo.npmVersion} so the project will be bootstrapped with an old unsupported version of tools.\n\n` +
            `Please update to npm 5 or higher for a better, fully supported experience.\n`,
        ),
      );
    }
  }

  if (useTypeScript) {
    if (!template) {
      template = 'typescript';
    }
  }

  await run(
    root,
    appName,
    packageManager,
    verbose,
    originalDirectory,
    template,
  );
};

module.exports = createApp;
