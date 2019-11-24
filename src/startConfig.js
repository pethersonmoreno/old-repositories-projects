import dotenv from 'dotenv';

const warnsStartsToIgnore = [
  'Warning: componentWillMount has been renamed, and is not recommended for use. See ',
  'Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See ',
  'Warning: componentWillUpdate has been renamed, and is not recommended for use. See '
];
const originalConsoleWarn = console.warn;
console.warn = (...params) => {
  if (!warnsStartsToIgnore.find(warnStart => params[0].startsWith(warnStart))) {
    originalConsoleWarn(...params);
  }
};
dotenv.config();
