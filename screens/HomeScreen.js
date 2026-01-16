import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Runner</Text>
      <Image source={require('../assets/player.png')} style={styles.characterImage} />
      <Text style={styles.description}>
        Добро пожаловать в увлекательный 2D платформер!
      </Text>
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
  description: { fontSize: 16, color: '#34495E', textAlign: 'center', marginBottom: 40 },
  button: { backgroundColor: '#E74C3C', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 25 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
