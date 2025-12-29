/**
 * ГЛАВНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ
 */
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

// Импорт экранов приложения
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import GameScreen from './screens/GameScreen';
import SettingsScreen from './screens/SettingsScreen';
import ScoresScreen from './screens/ScoresScreen';

// Импорт контекста из отдельного файла
import AppContext from './AppContext';

const Stack = createStackNavigator();

export default function App() {
  const [gameSettings, setGameSettings] = useState({
    soundEnabled: false,
    musicEnabled: false,
    vibrationEnabled: false,
    difficulty: 'medium',
    bestScore: 0,
    totalCoins: 0
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    console.log('Загрузка настроек...');
  };

  const saveSettings = async (newSettings) => {
    setGameSettings(newSettings);
    console.log('Сохранение настроек...');
  };

  return (
    <AppContext.Provider value={{ gameSettings, saveSettings }}>
      <View style={styles.appContainer}>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: '#4A90E2' },
              headerTintColor: 'white',
              headerTitleStyle: { fontWeight: 'bold' }
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Главная' }} />
            <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Меню игры' }} />
            <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Настройки' }} />
            <Stack.Screen name="Scores" component={ScoresScreen} options={{ title: 'Рекорды' }} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});