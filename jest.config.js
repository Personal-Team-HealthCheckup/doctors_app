module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/__mocks__/globalMocks.tsx'],
  moduleNameMapper: {
    '^react-native-vector-icons/(.*)$':
      '<rootDir>/__mocks__/reactNativeVectorIcons.tsx',
  },
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
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|react-native-vector-icons|@reduxjs/toolkit|immer|@react-navigation)',
  ],
  // testEnvironment: 'jsdom',
};
