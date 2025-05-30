module.exports = {
  projects: [
    '<rootDir>/packages/initial-swagger',
    require('./packages/api/jest.config.js'),
    require('./packages/web/jest.config.js'),
  ],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
