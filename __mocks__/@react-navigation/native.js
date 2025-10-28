module.exports = {
  NavigationContainer: ({ children }) => children,
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  })),
};
