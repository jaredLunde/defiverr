module.exports = {
  extends: ['lunde'],
  rules: {
    'no-empty-pattern': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/order': [
      'warn',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'parent',
          },
        ],
        groups: [
          'builtin',
          ['external', 'internal'],
          'parent',
          ['sibling', 'index'],
        ],
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'sort-imports': [
      'warn',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],
    'jsx-a11y/anchor-is-valid': 'off',
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
