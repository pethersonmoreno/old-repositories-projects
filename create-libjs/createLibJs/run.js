const os = require('os');
const path = require('path');
const fs = require('fs-extra');
const spawn = require('cross-spawn');
const getPackageInfo = require('./getPackageInfo');
const getTemplateInstallPackage = require('./getTemplateInstallPackage');
const abortInstall = require('./abortInstall');

const install = (packageManager, dependencies, verbose, isDev) => {
  return new Promise((resolve, reject) => {
    const useYarn = packageManager === 'yarn';
    let command;
    let args;
    if (useYarn) {
      command = 'yarnpkg';
      args = ['add', '--exact'].concat(dependencies);
      if (isDev) {
        args.push('--dev');
      }
    } else {
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

const runScript = (packageManager, scriptName, verbose) => {
  return new Promise((resolve, reject) => {
    const useYarn = packageManager === 'yarn';
    let command;
    let args;
    if (useYarn) {
      command = 'yarnpkg';
      args = ['run', scriptName];
    } else {
      command = 'npm';
      args = ['run', scriptName, '--loglevel', 'error'];
    }
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

const prepareTemplateWithPackageManager = async ({
  packageManager,
  root,
  templateInfo,
  tmpPackageTemplatePath,
  verbose,
}) => {
  const tempPackageJson = path.resolve(tmpPackageTemplatePath, 'package.json');
  fs.copySync(path.resolve(root, 'package.json'), tempPackageJson);
  await install(
    packageManager,
    [templateInfo.install],
    verbose,
    false, //Production
  );
  fs.removeSync(tempPackageJson);
  fs.moveSync(
    path.resolve(tmpPackageTemplatePath, 'node_modules', templateInfo.name),
    path.resolve(tmpPackageTemplatePath, 'template'),
  );
  fs.removeSync(path.resolve(tmpPackageTemplatePath, 'node_modules'));
  process.chdir(root);
};

const prepareTemplate = async ({
  tmpPackageTemplatePath,
  packageManager,
  root,
  appName,
  originalDirectory,
  template,
  verbose,
}) => {
  const templateToInstall = await getTemplateInstallPackage(
    template,
    originalDirectory,
  );
  console.log(`Getting template`);
  console.log();
  const templateInfo = await getPackageInfo(templateToInstall);
  fs.ensureDirSync(tmpPackageTemplatePath);
  process.chdir(tmpPackageTemplatePath);
  try {
    if (templateInfo.local) {
      fs.copySync(
        templateInfo.local,
        path.resolve(tmpPackageTemplatePath, 'template'),
      );
    } else {
      await prepareTemplateWithPackageManager({
        packageManager,
        root,
        templateInfo,
        tmpPackageTemplatePath,
        verbose,
      });
    }
    process.chdir(root);
  } catch (error) {
    console.error('Fail to get template package: ', error);
    process.chdir(root);
    abortInstall(root, appName, error);
    return;
  }
  const templatePath = path.resolve(tmpPackageTemplatePath, 'template');
  return {
    templateInfo,
    templatePath,
  };
};
const getDirectoriesInPath = pathDir => {
  const files = fs.readdirSync(path.join(pathDir));
  return files.filter(fileName =>
    fs.lstatSync(path.join(pathDir, fileName)).isDirectory(),
  );
};

const run = async (
  root,
  appName,
  packageManager,
  verbose,
  originalDirectory,
  template,
) => {
  const allDependencies = [];
  const allDevDependencies = [];

  console.log('Installing packages. This might take a couple of minutes.');
  const tmpPackageTemplatePath = path.resolve(root, 'tmp-template');
  const {
    templateInfo,
    templatePath: localTemplatePath,
  } = await prepareTemplate({
    tmpPackageTemplatePath,
    packageManager,
    root,
    appName,
    originalDirectory,
    template,
    verbose,
  });
  const templateData = await getTemplateData(localTemplatePath);
  try {
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
    if (allDependencies.length > 0 || allDevDependencies.length > 0) {
      console.log(`Installing dependencies`);
      console.log();
      if (allDependencies.length > 0) {
        await install(
          packageManager,
          allDependencies,
          verbose,
          false, //Production
        );
      }
      if (allDevDependencies.length > 0) {
        await install(
          packageManager,
          allDevDependencies,
          verbose,
          true, //Development
        );
      }
    }

    if (templateData.package) {
      const currentPackageJson = JSON.parse(
        fs.readFileSync(path.join(root, 'package.json')),
      );
      const ignorePackageKeys = ['dependencies', 'devDependencies', 'version'];
      const packageValues = Object.keys(templateData.package)
        .filter(key => !ignorePackageKeys.find(k => k === key))
        .reduce((acc, key) => {
          acc[key] = templateData.package[key];
          return acc;
        }, {});
      const {
        dependencies,
        devDependencies,
        ...otherConfigs
      } = currentPackageJson;
      const newPackageJson = {
        ...otherConfigs,
        ...packageValues,
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
    const templateDir = path.join(localTemplatePath, 'template');
    if (fs.existsSync(templateDir)) {
      fs.copySync(templateDir, root);
    }
    if (templateData.config && templateData.config.updatePackageNames) {
      console.log(`Updating package names`);
      console.log();
      const packagesDir = path.join(root, 'packages');
      const listPackageJsonToUpdate = [path.join(root, 'package.json')];
      if (fs.existsSync(packagesDir)) {
        const listProjects = getDirectoriesInPath(packagesDir);
        for (const project of listProjects) {
          listPackageJsonToUpdate.push(
            path.join(packagesDir, project, 'package.json'),
          );
        }
      }
      if (templateData.config.additionalUpdatePackageNames) {
        for (const fileRelativePath of templateData.config
          .additionalUpdatePackageNames) {
          listPackageJsonToUpdate.push(path.join(root, fileRelativePath));
        }
      }
      for (const pathPackageJsonToupdate of listPackageJsonToUpdate) {
        const projectPackageJson = fs.readFileSync(pathPackageJsonToupdate);
        fs.writeFileSync(
          pathPackageJsonToupdate,
          projectPackageJson
            .toString()
            .split(`@${templateInfo.name}`)
            .join(`@${appName}`),
        );
      }
    }
    if (
      templateData.package &&
      templateData.package.scripts &&
      templateData.package.scripts.postinstall
    ) {
      console.log(`Running postinstall`);
      console.log();
      await runScript(packageManager, 'postinstall', verbose);
    }
    fs.removeSync(tmpPackageTemplatePath);
  } catch (reason) {
    abortInstall(root, appName, reason);
  }
};

module.exports = run;
