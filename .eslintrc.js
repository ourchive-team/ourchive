module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'airbnb', 'airbnb-typescript'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
  },
  plugins: ['react'],
  rules: {
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'arrow-body-style': 'off',
  },
};
