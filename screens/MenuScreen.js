import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import AppContext from '../AppContext';

export default function MenuScreen({ navigation }) {
  const { gameSettings } = useContext(AppContext);

  const sortedScores = gameSettings.highScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // топ 5

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Главное меню</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game')}>
        <Text style={styles.buttonText}>🎮 Начать игру</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.buttonText}>⚙️ Настройки</Text>
      </TouchableOpacity>

      <View style={styles.leaderboardContainer}>
        <Text style={styles.leaderboardTitle}>Таблица рекордов:</Text>
        {sortedScores.length > 0 ? (
          sortedScores.map((entry, index) => (
            <Text key={index} style={styles.scoreText}>
              {index + 1}. Очки: {entry.score} | Уровень: {entry.level} | Время: {entry.time}s
            </Text>
          ))
        ) : (
          <Text style={styles.noScoresText}>Нет рекордов</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 40 },
  button: {
    backgroundColor: '#3498DB',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  leaderboardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  leaderboardTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 10 },
  scoreText: { fontSize: 14, color: '#34495E', marginBottom: 5 },
  noScoresText: { fontSize: 14, color: '#7F8C8D', fontStyle: 'italic' },
});
