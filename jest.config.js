module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/__mocks__/globalMocks.tsx'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/mock.ts',
    '<rootDir>/__mocks__',
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
  // testEnvironment: 'jsdom',
};
