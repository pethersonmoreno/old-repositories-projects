const os = require('os');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const spawn = require('cross-spawn');
const getPackageInfo = require('./getPackageInfo');
const getTemplateInstallPackage = require('./getTemplateInstallPackage');

const install = (root, dependencies, verbose, isOnline, isDev = false) => {
  return new Promise((resolve, reject) => {
    let command;
    let args;
    command = 'npm';
    args = [
      'install',
      isDev ? '--save-dev' : '--save',
      '--save-exact',
      '--loglevel',
      'error',
    ].concat(dependencies);

    if (verbose) {
      args.push('--verbose');
    }

    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`,
        });
        return;
      }
      resolve();
    });
  });
};

const getTemplateData = installPackage => {
  const data = require(installPackage);
  return data;
};

const run = (root, appName, verbose, originalDirectory, template) => {
  Promise.all([getTemplateInstallPackage(template, originalDirectory)])
    .then(([templateToInstall]) => {
      const localTemplateToInstall = path.resolve(
        __dirname,
        '..',
        'templates',
        `${templateToInstall}/`,
      );
      return [localTemplateToInstall];
    })
    .then(([templateToInstall]) => {
      const allDependencies = [];
      const allDevDependencies = ['jest'];

      console.log('Installing packages. This might take a couple of minutes.');

      Promise.all([
        getPackageInfo(templateToInstall),
        getTemplateData(templateToInstall),
      ])
        .then(([templateInfo, templateData]) => ({
          templateInfo,
          templateData,
        }))
        .then(async ({ templateData }) => {
          if (templateData.package && templateData.package.dependencies) {
            const templateDependencies = Object.keys(
              templateData.package.dependencies,
            ).map(key => `${key}@${templateData.package.dependencies[key]}`);
            allDependencies.push(...templateDependencies);
          }
          if (templateData.package && templateData.package.devDependencies) {
            const templateDevDependencies = Object.keys(
              templateData.package.devDependencies,
            ).map(key => `${key}@${templateData.package.devDependencies[key]}`);
            allDevDependencies.push(...templateDevDependencies);
          }
          if ((template || '').includes('typescript')) {
            allDevDependencies.push('@types/node', '@types/jest', 'typescript');
          }

          console.log(`Installing dependencies`);
          console.log();

          await install(
            root,
            allDependencies,
            verbose,
            true, //isOnline
            false, //Production
          );
          await install(
            root,
            allDevDependencies,
            verbose,
            true, //isOnline
            true, //Development
          );

          if (templateData.package && templateData.package.scripts) {
            const currentPackageJson = JSON.parse(
              fs.readFileSync(path.join(root, 'package.json')),
            );
            const {
              dependencies,
              devDependencies,
              ...otherConfigs
            } = currentPackageJson;
            const newPackageJson = {
              ...otherConfigs,
              scripts: templateData.package.scripts,
              dependencies,
              devDependencies,
            };
            fs.writeFileSync(
              path.join(root, 'package.json'),
              JSON.stringify(newPackageJson, null, 2) + os.EOL,
            );
          }

          console.log(`Creating files from template`);
          console.log();
          const templateDir = path.join(templateToInstall, 'template');
          if (fs.existsSync(templateDir)) {
            fs.copySync(templateDir, root);
          }
        })
        .catch(reason => {
          console.log();
          console.log('Aborting installation.');
          if (reason.command) {
            console.log(`  ${chalk.cyan(reason.command)} has failed.`);
          } else {
            console.log(
              chalk.red('Unexpected error. Please report it as a bug:'),
            );
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
          }
          console.log('Done.');
          process.exit(1);
        });
    });
};

module.exports = run;
