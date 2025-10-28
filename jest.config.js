module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: [],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
    '@testing-library/jest-native/extend-expect',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native'
      + '|@react-native'
      + '|@react-navigation'
      + '|expo'
      + '|expo-device'
      + '|expo-modules-core'
      + '|react-native-web'
      + ')/)',
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^react-native$': '<rootDir>/__mocks__/react-native.js',
    '^expo-device$': '<rootDir>/__mocks__/expo-device.js',
    '^expo-modules-core$': '<rootDir>/__mocks__/expo-modules-core.js',
    '^@react-navigation/native$': '<rootDir>/__mocks__/@react-navigation/native.js',
    '^@react-navigation/stack$': '<rootDir>/__mocks__/@react-navigation/stack.js',

    // 👇 Поддержка ассетов (png, jpg, svg и т.п.)
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testTimeout: 10000,
};
