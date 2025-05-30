const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname),
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
};
