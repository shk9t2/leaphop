/**
 * ПЛАТФОРМО-СПЕЦИФИЧНЫЕ УТИЛИТЫ
 */
import { Platform, Vibration, Alert, Linking, Dimensions } from 'react-native';
import * as Device from 'expo-device';

/**
 * КЛАСС ДЛЯ РАБОТЫ С ПЛАТФОРМО-СПЕЦИФИЧНОЙ ФУНКЦИОНАЛЬНОСТЬЮ
 */
class PlatformUtils {
  /**
   * ВИБРАЦИЯ - РАЗНАЯ ДЛЯ IOS И ANDROID
   */
  static vibrate = (pattern = [100]) => {
    if (!Device.isDevice) {
      console.log('Vibration simulated (not on real device)');
      return;
    }

    try {
      if (Platform.OS === 'ios') {
        // iOS использует другую систему вибрации
        Vibration.vibrate(100);
      } else {
        // Android поддерживает сложные паттерны
        Vibration.vibrate(pattern);
      }
    } catch (error) {
      console.warn('Vibration not supported:', error);
    }
  };

  /**
   * ВИБРАЦИЯ ДЛЯ РАЗНЫХ СОБЫТИЙ
   */
  static vibrationPatterns = {
    buttonPress: Platform.OS === 'ios' ? [50] : [50],
    coinCollected: Platform.OS === 'ios' ? [100, 50, 100] : [100, 50, 100],
    enemyDefeated: Platform.OS === 'ios' ? [200] : [200, 100, 200],
    gameOver: Platform.OS === 'ios' ? [400] : [400, 200, 400, 200],
  };

  /**
   * ПЛАТФОРМО-СПЕЦИФИЧНЫЕ СТИЛИ
   */
  static getPlatformStyles() {
    return {
      // Разные тени для iOS и Android
      shadow: Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
        web: {
          boxShadow: '0 2px 5px rgba(0,0,0,0.25)'
        }
      }),

      // Разные радиусы скругления
      borderRadius: Platform.select({
        ios: 12,
        android: 8,
        web: 8
      }),

      // Разные отступы для статус бара
      statusBarPadding: Platform.select({
        ios: 44,
        android: 24,
        web: 0
      }),

      // Разные размеры шрифтов
      fontSize: {
        small: Platform.select({
          ios: 14,
          android: 13,
          web: 14
        }),
        medium: Platform.select({
          ios: 16,
          android: 15,
          web: 16
        }),
        large: Platform.select({
          ios: 18,
          android: 17,
          web: 18
        })
      }
    };
  }

  /**
   * ОПРЕДЕЛЕНИЕ ТИПА УСТРОЙСТВА
   */
  static getDeviceInfo() {
    return {
      platform: Platform.OS,
      version: Platform.Version,
      isTablet: Device.deviceType === Device.DeviceType.TABLET,
      isPhone: Device.deviceType === Device.DeviceType.PHONE,
      deviceName: Device.modelName,
      brand: Device.brand,
      manufacturer: Device.manufacturer,
      isEmulator: !Device.isDevice,
    };
  }

  /**
   * ПЛАТФОРМО-СПЕЦИФИЧНЫЕ АЛЕРТЫ
   */
  static showAlert(title, message, buttons = []) {
    if (Platform.OS === 'web') {
      // Для web используем браузерный alert
      alert(`${title}\n\n${message}`);
    } else {
      // Для мобильных платформ используем нативный Alert
      Alert.alert(title, message, buttons);
    }
  }

  /**
   * ПРОВЕРКА ВОЗМОЖНОСТЕЙ УСТРОЙСТВА
   */
  static checkDeviceCapabilities() {
    const capabilities = {
      vibration: Platform.OS !== 'web', // Web не поддерживает вибрацию
      hapticFeedback: Platform.OS === 'ios', // Только iOS имеет расширенный haptic feedback
      edgeToEdge: Platform.OS === 'android' && Platform.Version >= 29, // Android 10+
      darkMode: true, // Обе платформы поддерживают
      biometrics: Device.isDevice, // Биометрия на реальных устройствах
    };

    console.log('Device capabilities:', capabilities);
    return capabilities;
  }

  /**
   * ОТКРЫТИЕ ССЫЛОК С ПРОВЕРКОЙ ПЛАТФОРМЫ
   */
  static openURL = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        this.showAlert('Ошибка', 'Не удается открыть ссылку: ' + url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      this.showAlert('Ошибка', 'Произошла ошибка при открытии ссылки');
    }
  };

  /**
   * ТЕСТИРОВАНИЕ СОВМЕСТИМОСТИ
   */
  static runCompatibilityTests() {
    const tests = {
      platform: Platform.OS,
      screenDimensions: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        scale: Dimensions.get('window').scale,
      },
      orientation: this.getOrientation(),
      performance: this.performanceTest(),
    };

    console.log('Compatibility test results:', tests);
    return tests;
  }

  static getOrientation() {
    const { width, height } = Dimensions.get('window');
    return width > height ? 'landscape' : 'portrait';
  }

  static performanceTest() {
    const startTime = Date.now();
    
    // Простой тест производительности
    let testValue = 0;
    for (let i = 0; i < 100000; i++) {
      testValue += Math.sqrt(i);
    }
    
    const endTime = Date.now();
    return {
      duration: endTime - startTime,
      score: testValue > 0 ? 'good' : 'poor'
    };
  }
}

export default PlatformUtils;