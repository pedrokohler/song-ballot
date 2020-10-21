module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "airbnb-base",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
    "no-param-reassign": [2, { props: false }],
    quotes: [2, "double", "avoid-escape"],
  },
};
