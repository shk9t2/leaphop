/**
 * Изолированный unit-тест для utils/PlatformUtils.js
 * Работает в Jest без нативных модулей React Native.
 */

jest.resetModules();

// --- Мок react-native ---
jest.doMock('react-native', () => ({
  Platform: { OS: 'android' },
  Vibration: { vibrate: jest.fn() },
  Linking: {
    openURL: jest.fn().mockResolvedValue(true),
    canOpenURL: jest.fn().mockResolvedValue(true),
  },
  Alert: { alert: jest.fn() },
}));

// --- Моки для DevMenu и TurboModules ---
jest.mock('react-native/Libraries/NativeModules/specs/NativeDevMenu', () => ({}));
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
  getEnforcing: () => ({}),
  get: () => ({}),
}));

// --- Тесты ---
describe('PlatformUtils', () => {
  it('vibrate() вызывает системную вибрацию', () => {
    jest.isolateModules(() => {
      const PlatformUtils = require('../utils/PlatformUtils').default;
      PlatformUtils.vibrate();
      const { Vibration } = require('react-native');
      expect(Vibration.vibrate).toHaveBeenCalled();
    });
  });

  it('vibrationPatterns() возвращает шаблоны вибрации', () => {
    jest.isolateModules(() => {
      const PlatformUtils = require('../utils/PlatformUtils').default;
      const patterns = PlatformUtils.vibrationPatterns();
      expect(typeof patterns).toBe('object');
      expect(Array.isArray(patterns.short)).toBe(true);
    });
  });

  it('openURL() открывает ссылку успешно', async () => {
    jest.isolateModules(async () => {
      const PlatformUtils = require('../utils/PlatformUtils').default;
      const result = await PlatformUtils.openURL('https://example.com');
      expect(result).toBe(true);
    });
  });
});
