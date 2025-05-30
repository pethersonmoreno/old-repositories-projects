module.exports = {
  env: {
    node: true,
    es6: true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  extends: [
    'eslint:recommended',
    // 'prettier',
    // 'plugin:prettier/recommended'
  ],
  // plugins: [
  //   'prettier'
  // ],
  rules: {
    'comma-dangle': ["error", "only-multiline"]
  }
}
