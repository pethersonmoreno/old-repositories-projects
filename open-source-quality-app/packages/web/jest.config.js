const path = require('path');
const pathCreateJestConfig = require.resolve('react-scripts/scripts/utils/createJestConfig');
const createJestConfig = require(pathCreateJestConfig);

const pathReactScripts = pathCreateJestConfig.replace(/react-scripts.+$/, 'react-scripts');

const jestConfig = createJestConfig(
  (relativePath) => path.resolve(pathReactScripts, relativePath),
  path.resolve(__dirname),
  false,
);
let setupFilesAfterEnv = jestConfig.setupFilesAfterEnv;
if (!jestConfig.setupFilesAfterEnv.find((item) => item.includes('setupTests'))) {
  setupFilesAfterEnv = [...jestConfig.setupFilesAfterEnv, '<rootDir>/src/setupTests.ts'];
}

module.exports = {
  ...jestConfig,
  setupFilesAfterEnv,
};
