import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useContext } from 'react';
import AppContext from '../AppContext';

export default function HomeScreen({ navigation }) {
  const { gameSettings } = useContext(AppContext);

  const sortedScores = gameSettings.highScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // топ 5

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Runner</Text>
      <Image source={require('../assets/player.png')} style={styles.characterImage} />
      <Text style={styles.description}>
        Добро пожаловать в увлекательный 2D платформер!
      </Text>
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
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.buttonText}>Начать игру</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#87CEEB',
    padding: 20,
  },
  title: { fontSize: 36, fontWeight: 'bold', color: '#2C3E50', marginBottom: 30 },
  characterImage: { width: 100, height: 100, marginBottom: 30 },
  description: { fontSize: 16, color: '#34495E', textAlign: 'center', marginBottom: 20 },
  leaderboardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
  },
  leaderboardTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 10 },
  scoreText: { fontSize: 14, color: '#34495E', marginBottom: 5 },
  noScoresText: { fontSize: 14, color: '#7F8C8D', fontStyle: 'italic' },
  button: { backgroundColor: '#E74C3C', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 25 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
