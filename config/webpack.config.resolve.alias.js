const path = require('path');

module.exports = {
  resolve: {
    alias: {
      api: path.resolve('src/api'),
      state: path.resolve('src/state'),
      Atoms: path.resolve('src/view/Atoms'),
      Molecules: path.resolve('src/view/Molecules'),
      Organisms: path.resolve('src/view/Organisms'),
      Pages: path.resolve('src/view/Pages'),
      Templates: path.resolve('src/view/Templates'),
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
    },
  },
};
