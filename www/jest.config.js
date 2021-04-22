module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  moduleDirectories: [
    'node_modules',
    '../node_modules',
    'components',
    'pages',
    'styles',
    'test',
  ],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  testMatch: [
    '<rootDir>/{test,components,styles}/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  transformIgnorePatterns: ['node_modules'],
};
