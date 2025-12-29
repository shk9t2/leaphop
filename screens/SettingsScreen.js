/**
 * ЭКРАН НАСТРОЕК
 * 
 * Задачи реализованы:
 * ✅ Управление ресурсами приложения (настройки)
 * ✅ Использование хуков для управления состоянием
 * ✅ Применение дизайна и стилей
 */

import React, { useState, useContext } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Switch, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import AppContext from '../AppContext';

export default function SettingsScreen() {
  const { gameSettings, saveSettings } = useContext(AppContext);
  
  // Локальное состояние для настроек
  const [localSettings, setLocalSettings] = useState(gameSettings);

  /**
   * ОБНОВЛЕНИЕ НАСТРОЙКИ
   */
  const updateSetting = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
  };

  /**
   * СОХРАНЕНИЕ НАСТРОЕК
   */
  const handleSaveSettings = () => {
    saveSettings(localSettings);
    Alert.alert('Успех', 'Настройки сохранены!');
  };

  /**
   * СБРОС НАСТРОЕК
   */
  const handleResetSettings = () => {
    Alert.alert(
      'Сброс настроек',
      'Вы уверены, что хотите сбросить все настройки?',
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Сбросить', 
          style: 'destructive',
            onPress: () => {
            const defaultSettings = {
              soundEnabled: false,
              musicEnabled: false,
              vibrationEnabled: false,
              difficulty: 'medium',
              bestScore: gameSettings.bestScore, // Сохраняем рекорд
              totalCoins: gameSettings.totalCoins // Сохраняем монеты
            };
            setLocalSettings(defaultSettings);
            saveSettings(defaultSettings);
          }
        },
      ]
    );
  };

  /**
   * СБРОС ПРОГРЕССА
   */
  const handleResetProgress = () => {
    Alert.alert(
      'Сброс прогресса',
      'Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя отменить.',
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Сбросить', 
          style: 'destructive',
          onPress: () => {
            const resetSettings = {
              ...localSettings,
              bestScore: 0,
              totalCoins: 0
            };
            setLocalSettings(resetSettings);
            saveSettings(resetSettings);
          }
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Настройки игры</Text>
      
      {/* НАСТРОЙКИ ЗВУКА */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔊 Звук</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Звуковые эффекты</Text>
          <Switch
            value={localSettings.soundEnabled}
            onValueChange={(value) => updateSetting('soundEnabled', value)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={localSettings.soundEnabled ? '#3498DB' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Фоновая музыка</Text>
          <Switch
            value={localSettings.musicEnabled}
            onValueChange={(value) => updateSetting('musicEnabled', value)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={localSettings.musicEnabled ? '#3498DB' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Вибрация</Text>
          <Switch
            value={localSettings.vibrationEnabled}
            onValueChange={(value) => updateSetting('vibrationEnabled', value)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={localSettings.vibrationEnabled ? '#3498DB' : '#f4f3f4'}
          />
        </View>
      </View>
      {/* ТЕСТИРОВАНИЕ СОВМЕСТИМОСТИ */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧪 Тестирование</Text>
        
        <TouchableOpacity 
          style={styles.dataButton}
          onPress={() => {
            const deviceInfo = PlatformUtils.getDeviceInfo();
            const capabilities = PlatformUtils.checkDeviceCapabilities();
            
            PlatformUtils.showAlert(
              'Информация об устройстве',
              `Платформа: ${deviceInfo.platform}\n` +
              `Устройство: ${deviceInfo.deviceName}\n` +
              `Версия: ${deviceInfo.version}\n` +
              `Тип: ${deviceInfo.isTablet ? 'Планшет' : 'Телефон'}\n` +
              `Эмулятор: ${deviceInfo.isEmulator ? 'Да' : 'Нет'}\n\n` +
              `Возможности:\n` +
              `• Вибрация: ${capabilities.vibration ? '✅' : '❌'}\n` +
              `• Темная тема: ${capabilities.darkMode ? '✅' : '❌'}\n` +
              `• Биометрия: ${capabilities.biometrics ? '✅' : '❌'}`
            );
          }}
        >
          <Text style={styles.dataButtonText}>📱 Информация об устройстве</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.dataButton}
          onPress={() => {
            const tests = PlatformUtils.runCompatibilityTests();
            PlatformUtils.showAlert(
              'Тест совместимости',
              `Платформа: ${tests.platform}\n` +
              `Ориентация: ${tests.orientation}\n` +
              `Разрешение: ${tests.screenDimensions.width}x${tests.screenDimensions.height}\n` +
              `Производительность: ${tests.performance.score}\n` +
              `Время теста: ${tests.performance.duration}ms`
            );
          }}
        >
          <Text style={styles.dataButtonText}>⚡ Тест производительности</Text>
        </TouchableOpacity>
      </View>
      
      {/* НАСТРОЙКИ ГЕЙМПЛЕЯ */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎮 Геймплей</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Сложность игры</Text>
          <View style={styles.difficultyContainer}>
            {[
              { value: 'easy', label: 'Легко' },
              { value: 'medium', label: 'Нормально' },
              { value: 'hard', label: 'Сложно' }
            ].map((level) => (
              <TouchableOpacity
                key={level.value}
                style={[
                  styles.difficultyButton,
                  localSettings.difficulty === level.value && styles.difficultyButtonActive
                ]}
                onPress={() => updateSetting('difficulty', level.value)}
              >
                <Text style={[
                  styles.difficultyText,
                  localSettings.difficulty === level.value && styles.difficultyTextActive
                ]}>
                  {level.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      
      {/* УПРАВЛЕНИЕ ДАННЫМИ */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Данные</Text>
        
        <TouchableOpacity 
          style={styles.dataButton}
          onPress={handleResetProgress}
        >
          <Text style={styles.dataButtonText}>🔄 Сбросить прогресс</Text>
        </TouchableOpacity>
        
        <View style={styles.dataInfo}>
          <Text style={styles.dataInfoText}>Лучший счет: {gameSettings.bestScore}</Text>
          <Text style={styles.dataInfoText}>Всего монет: {gameSettings.totalCoins}</Text>
        </View>
      </View>
      
      {/* КНОПКИ ДЕЙСТВИЙ */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSaveSettings}
        >
          <Text style={styles.saveButtonText}>💾 Сохранить настройки</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={handleResetSettings}
        >
          <Text style={styles.resetButtonText}>🔄 Сбросить настройки</Text>
        </TouchableOpacity>
      </View>
      
      {/* ИНФОРМАЦИЯ О ПРИЛОЖЕНИИ */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>О приложении</Text>
        <Text style={styles.infoText}>Simple Runner v2.0.0</Text>
        <Text style={styles.infoText}>Разработано с ❤️ для мобильных платформ</Text>
        <Text style={styles.infoText}>© 2024 Все права защищены</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
    padding: 20,
    // Для ландшафтного режима можно добавить
    flexDirection: 'row', // или изменить расположение элементов
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#ECF0F1',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  settingText: {
    fontSize: 16,
    color: '#34495E',
    flex: 1,
  },
  difficultyContainer: {
    flexDirection: 'row',
    backgroundColor: '#ECF0F1',
    borderRadius: 8,
    padding: 4,
  },
  difficultyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  difficultyButtonActive: {
    backgroundColor: '#3498DB',
  },
  difficultyText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  difficultyTextActive: {
    color: 'white',
  },
  dataButton: {
    backgroundColor: '#E74C3C',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  dataButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dataInfo: {
    backgroundColor: '#F8F9F9',
    padding: 15,
    borderRadius: 8,
  },
  dataInfoText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  actions: {
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: '#27AE60',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#E74C3C',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 5,
    textAlign: 'center',
  },
});