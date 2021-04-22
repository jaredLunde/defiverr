module.exports = {
  extends: ['lunde'],
  rules: {
    'no-empty-pattern': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.{ts,tsx}'],
      settings: {
        'import/resolver': {
          node: {
            moduleDirectory: ['node_modules', '../node_modules', 'pages/'],
          },
          jest: {
            jestConfigFile: './jest.config.js',
          },
        },
      },
    },
  ],
};
