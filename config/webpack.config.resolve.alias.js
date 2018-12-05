const path = require('path');

module.exports = {
  resolve: {
    alias: {
      helpers: path.resolve('src/helpers'),
      HOC: path.resolve('src/HOC'),
      Atoms: path.resolve('src/Atoms'),
      Molecules: path.resolve('src/Molecules'),
      Organisms: path.resolve('src/Organisms'),
      Pages: path.resolve('src/Pages'),
      Templates: path.resolve('src/Templates'),
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
    },
  },
};
