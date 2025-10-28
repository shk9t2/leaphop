module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native'
      + '|@react-native'
      + '|@react-navigation'
      + '|expo'
      + '|expo-device'
      + '|expo-modules-core'
      + ')/)',
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^react-native$': '<rootDir>/__mocks__/react-native.js',
    '^expo-device$': '<rootDir>/__mocks__/expo-device.js',
    '^@react-navigation/native$': '<rootDir>/__mocks__/@react-navigation/native.js',
  },
};
