/**
 * Глобальная настройка Jest окружения
 * Здесь подключаются дом-матчеры и общие моки
 */

// Матчеры, вроде toBeInTheDocument()
import '@testing-library/jest-dom';

// Глобальные моки API
global.fetch = require('jest-fetch-mock');
global.alert = jest.fn();
global.console.error = jest.fn();
global.console.warn = jest.fn();

// Безопасная заглушка для старых RN-модулей (в RN 0.81+ файл удалён)
try {
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => ({}));
} catch {
  // Игнорируем, если модуль не существует
}

// Предотвращаем реальные вызовы Linking / Vibration
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Linking: {
      openURL: jest.fn().mockResolvedValue(true),
      canOpenURL: jest.fn().mockResolvedValue(true),
    },
    Vibration: { vibrate: jest.fn() },
    Dimensions: {
      get: jest.fn(() => ({ width: 1080, height: 1920 })),
    },
  };
});
