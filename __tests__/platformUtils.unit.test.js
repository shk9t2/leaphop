/**
 * Полностью изолированный unit-тест для utils/PlatformUtils.js
 * Работает в среде Jest без нативных модулей React Native.
 */

// --- Моки для DevMenu и TurboModules ---
jest.mock('react-native/Libraries/NativeModules/specs/NativeDevMenu', () => ({}));
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
  getEnforcing: () => ({}),
  get: () => ({}),
}));

// --- Минимальный мок react-native ---
jest.mock('react-native', () => ({
  Platform: { OS: 'android' },
  Vibration: { vibrate: jest.fn() },
  Linking: { openURL: jest.fn().mockResolvedValue(true) },
}));

import PlatformUtils from '../utils/PlatformUtils';

describe('PlatformUtils', () => {
  it('vibrate() вызывает системную вибрацию', () => {
    PlatformUtils.vibrate();
    expect(require('react-native').Vibration.vibrate).toHaveBeenCalled();
  });

  it('vibrationPatterns() возвращает шаблоны вибрации', () => {
    const patterns = PlatformUtils.vibrationPatterns();
    expect(Array.isArray(patterns)).toBeTruthy();
  });

  it('openURL() открывает ссылку успешно', async () => {
    const result = await PlatformUtils.openURL('https://example.com');
    expect(result).toBe(true);
  });
});
