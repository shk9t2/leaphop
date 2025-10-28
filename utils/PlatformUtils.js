/**
 * Универсальные утилиты платформы для игры Simple Runner.
 * Работает как в среде Expo, так и в нативных RN-проектах.
 * Безопасен для тестов Jest.
 */

import { Platform, Vibration, Alert, Linking, Dimensions } from 'react-native';
import * as Device from 'expo-device';

class PlatformUtils {
  /** Информация об устройстве */
  static getDeviceInfo() {
    return {
      brand: Device.brand || 'Unknown',
      modelName: Device.modelName || 'Unknown',
      osName: Device.osName || Platform.OS,
      osVersion: Device.osVersion || 'Unknown',
      isDevice: Device.isDevice || false,
    };
  }

  /** Размеры экрана */
  static getScreenDimensions() {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  }

  /** Тип платформы */
  static getPlatformType() {
    if (Platform.OS === 'ios') return 'iOS';
    if (Platform.OS === 'android') return 'Android';
    if (Platform.OS === 'web') return 'Web';
    return 'Unknown';
  }

  /** Вибрация устройства */
  static vibrate(pattern = [100]) {
    try {
      Vibration.vibrate(pattern);
    } catch (error) {
      console.error('Vibration error:', error);
    }
  }

  /** Стандартные шаблоны вибрации */
  static vibrationPatterns() {
    return {
      short: [50],
      medium: [100, 100, 100],
      long: [300, 200, 300],
      alert: [100, 50, 100, 50, 100],
    };
  }

  /** Показывает системный алерт */
  static showAlert(title, message, buttons) {
    if (Platform.OS === 'web') {
      global.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message, buttons);
    }
  }

  /** Безопасное открытие ссылки */
  static async openURL(url) {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
        return true;
      } else {
        this.showAlert('Ошибка', 'Невозможно открыть ссылку');
        return false;
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      this.showAlert('Ошибка', 'Произошла ошибка при открытии ссылки');
      return false;
    }
  }

  /** Проверка соединения (простой мок) */
  static async checkInternetConnection() {
    try {
      const response = await fetch('https://www.google.com', { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  /** Отладочная информация */
  static debugInfo() {
    return {
      ...this.getDeviceInfo(),
      ...this.getScreenDimensions(),
      platform: this.getPlatformType(),
    };
  }
}

export default PlatformUtils;
