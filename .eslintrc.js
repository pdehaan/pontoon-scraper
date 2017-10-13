module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  root: true,
  rules: {
    'eqeqeq': ['error'],
    'no-var': 'error',
    'prefer-const': 'error',
    'quotes': ['error', 'single']
  }
};
