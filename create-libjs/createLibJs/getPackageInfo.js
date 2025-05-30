const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const hyperquest = require('hyperquest');
const tmp = require('tmp');
const unpack = require('tar-pack').unpack;

const getTemporaryDirectory = () => {
  return new Promise((resolve, reject) => {
    // Unsafe cleanup lets us recursively delete the directory if it contains
    // contents; by default it only allows removal if it's empty
    tmp.dir({ unsafeCleanup: true }, (err, tmpdir, callback) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          tmpdir: tmpdir,
          cleanup: () => {
            try {
              callback();
            } catch (ignored) {
              // Callback might throw and fail, since it's a temp directory the
              // OS will clean it up eventually...
            }
          },
        });
      }
    });
  });
};

const extractStream = (stream, dest) => {
  return new Promise((resolve, reject) => {
    stream.pipe(
      unpack(dest, err => {
        if (err) {
          reject(err);
        } else {
          resolve(dest);
        }
      }),
    );
  });
};

const getPackageInfo = installPackage => {
  if (installPackage.match(/^.+\.(tgz|tar\.gz)$/)) {
    return getTemporaryDirectory()
      .then(obj => {
        let stream;
        if (/^http/.test(installPackage)) {
          stream = hyperquest(installPackage);
        } else {
          stream = fs.createReadStream(installPackage);
        }
        return extractStream(stream, obj.tmpdir).then(() => obj);
      })
      .then(obj => {
        const { name, version } = require(path.join(
          obj.tmpdir,
          'package.json',
        ));
        obj.cleanup();
        return { name, version, install: installPackage };
      })
      .catch(err => {
        console.log(
          `Could not extract the package name from the archive: ${err.message}`,
        );
        const assumedProjectName = installPackage.match(
          /^.+\/(.+?)(?:-\d+.+)?\.(tgz|tar\.gz)$/,
        )[1];
        console.log(
          `Based on the filename, assuming it is "${chalk.cyan(
            assumedProjectName,
          )}"`,
        );
        return Promise.resolve({
          name: assumedProjectName,
          install: installPackage,
        });
      });
  } else if (
    installPackage.startsWith('git+') ||
    installPackage.startsWith('http')
  ) {
    return Promise.resolve({
      name: installPackage.match(/([^/]+)\.git(#.*)?$/)[1],
      install: installPackage,
    });
  } else if (installPackage.match(/.+@/)) {
    // Do not match @scope/ when stripping off @version or @tag

    const name =
      installPackage.charAt(0) + installPackage.substr(1).split('@')[0];
    const version = installPackage.split('@')[1];
    return Promise.resolve({
      name,
      version,
      install: `${name}${version ? '@' + version : ''}`,
    });
  } else if (installPackage.match(/^file:/)) {
    const installPackagePath = installPackage.match(/^file:(.*)?$/)[1];
    const { name, version } = require(path.join(
      installPackagePath,
      'package.json',
    ));
    return Promise.resolve({
      name,
      version,
      local: path.resolve(installPackagePath),
    });
  }
  return Promise.resolve({ name: installPackage, install: installPackage });
};

module.exports = getPackageInfo;
