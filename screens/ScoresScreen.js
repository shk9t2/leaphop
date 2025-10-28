/**
 * ЭКРАН РЕКОРДОВ
 * 
 * Задачи реализованы:
 * ✅ Управление ресурсами приложения (данные)
 * ✅ Применение дизайна и стилей
 * ✅ Добавление функциональных возможностей
 */

import React, { useContext } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  TouchableOpacity 
} from 'react-native';
import AppContext from '../AppContext';

export default function ScoresScreen({ navigation }) {
  const { gameSettings } = useContext(AppContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🏆 Рекорды</Text>
      
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Статистика игрока</Text>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Лучший счет:</Text>
          <Text style={styles.statValue}>{gameSettings.bestScore}</Text>
        </View>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Всего монет:</Text>
          <Text style={styles.statValue}>{gameSettings.totalCoins}</Text>
        </View>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Уровень сложности:</Text>
          <Text style={styles.statValue}>
            {gameSettings.difficulty === 'easy' ? 'Легкий' : 
             gameSettings.difficulty === 'medium' ? 'Средний' : 'Сложный'}
          </Text>
        </View>
      </View>

      <View style={styles.achievementsCard}>
        <Text style={styles.achievementsTitle}>Достижения</Text>
        
        <View style={styles.achievement}>
          <Text style={styles.achievementIcon}>🥇</Text>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementName}>Первый шаг</Text>
            <Text style={styles.achievementDesc}>Наберите 1000 очков</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${Math.min(100, (gameSettings.bestScore / 1000) * 100)}%` }]} />
            </View>
          </View>
        </View>

        <View style={styles.achievement}>
          <Text style={styles.achievementIcon}>💰</Text>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementName}>Коллекционер</Text>
            <Text style={styles.achievementDesc}>Соберите 50 монет</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${Math.min(100, (gameSettings.totalCoins / 50) * 100)}%` }]} />
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Назад</Text>
      </TouchableOpacity>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginVertical: 30,
  },
  statsCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  statLabel: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  achievementsCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    textAlign: 'center',
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#ECF0F1',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#27AE60',
    borderRadius: 3,
  },
  backButton: {
    backgroundColor: '#3498DB',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});