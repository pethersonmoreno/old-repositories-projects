const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');

const validFiles = [
  '.DS_Store',
  '.git',
  '.gitattributes',
  '.gitignore',
  '.gitlab-ci.yml',
  '.hg',
  '.hgcheck',
  '.hgignore',
  '.idea',
  '.npmignore',
  '.travis.yml',
  'docs',
  'LICENSE',
  'README.md',
  'mkdocs.yml',
  'Thumbs.db',
];

const errorLogFilePatterns = ['npm-debug.log'];
const isErrorLog = file =>
  errorLogFilePatterns.some(pattern => file.startsWith(pattern));

const findConflicts = root =>
  fs
    .readdirSync(root)
    .filter(file => !validFiles.includes(file))
    // IntelliJ IDEA creates module files before CJL is launched
    .filter(file => !/\.iml$/.test(file))
    // Don't treat log files from previous installation as conflicts
    .filter(file => !isErrorLog(file));

const showConflictsError = (root, name, conflicts) => {
  console.log(
    `The directory ${chalk.green(name)} contains files that could conflict:`,
  );
  console.log();
  for (const file of conflicts) {
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
  console.log();
  console.log(
    'Either try using a new directory name, or remove the files listed above.',
  );
};

const isSafeToCreateProjectIn = (root, name) => {
  const conflicts = findConflicts(root);
  if (conflicts.length > 0) {
    showConflictsError(root, name, conflicts);
    return false;
  }
  fs.readdirSync(root).forEach(file => {
    if (isErrorLog(file)) {
      fs.removeSync(path.join(root, file));
    }
  });
  return true;
};

module.exports = isSafeToCreateProjectIn;
