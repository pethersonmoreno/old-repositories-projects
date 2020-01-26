const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

const abortInstall = (root, appName, reason) => {
  console.log();
  console.log('Aborting installation.');
  if (reason.command) {
    console.log(`  ${chalk.cyan(reason.command)} has failed.`);
  } else {
    console.log(chalk.red('Unexpected error. Please report it as a bug:'));
    console.log(reason);
  }
  console.log();

  // On 'exit' we will delete these files from target directory.
  const knownGeneratedFiles = ['package.json', 'node_modules'];
  const currentFiles = fs.readdirSync(path.join(root));
  currentFiles.forEach(file => {
    knownGeneratedFiles.forEach(fileToMatch => {
      // This removes all knownGeneratedFiles.
      if (file === fileToMatch) {
        console.log(`Deleting generated file... ${chalk.cyan(file)}`);
        fs.removeSync(path.join(root, file));
      }
    });
  });
  const remainingFiles = fs.readdirSync(path.join(root));
  if (!remainingFiles.length) {
    // Delete target folder if empty
    console.log(
      `Deleting ${chalk.cyan(`${appName}/`)} from ${chalk.cyan(
        path.resolve(root, '..'),
      )}`,
    );
    process.chdir(path.resolve(root, '..'));
    fs.removeSync(path.join(root));
  } else {
    console.log(
      `The directory ${chalk.green(
        path.basename(root),
      )} contains files, then it was not removed:`,
    );
    console.log();
    for (const file of remainingFiles) {
      try {
        const stats = fs.lstatSync(path.join(root, file));
        if (stats.isDirectory()) {
          console.log(`  ${chalk.blue(`${file}/`)}`);
        } else {
          console.log(`  ${file}`);
        }
      } catch (e) {
        console.log(`  ${file}`);
      }
    }
  }
  console.log('Done.');
  process.exit(1);
};

module.exports = abortInstall;
