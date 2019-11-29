// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  // add your custom rules here
  rules: {
  },
  overrides: [{
    "files": ["*.vue"],
    "rules": {
      // 'no-console': "off",
    }
  }]
}
