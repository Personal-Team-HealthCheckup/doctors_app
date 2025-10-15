module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/__mocks__/globalMocks.tsx'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/helper/',
    '<rootDir>/__tests__/mock.ts',
    '<rootDir>/__mocks__',
    '<rootDir>/src/config/*',
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/helper/',
    '<rootDir>/__tests__/mock.ts',
    '<rootDir>/__mocks__',
    '<rootDir>/src/config/*',
  ],
  // testEnvironment: 'jsdom',
};
