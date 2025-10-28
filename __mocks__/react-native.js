module.exports = {
  StyleSheet: { create: (styles) => styles },
  View: 'View',
  Text: 'Text',
  Platform: { OS: 'android' },
  Vibration: { vibrate: jest.fn() },
  Linking: { openURL: jest.fn().mockResolvedValue(true) },
  InteractionManager: {
    runAfterInteractions: (cb) => {
      if (typeof cb === 'function') cb();
      return { cancel: () => {} };
    },
    createInteractionHandle: jest.fn(() => 1),
    clearInteractionHandle: jest.fn(),
  },
};
