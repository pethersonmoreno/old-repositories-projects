import dotenv from 'dotenv';
import WebFontLoader from 'webfontloader';

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

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});
