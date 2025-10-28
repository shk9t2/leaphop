import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Главное меню</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game')}>
        <Text style={styles.buttonText}>🎮 Начать игру</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.buttonText}>⚙️ Настройки</Text>
      </TouchableOpacity>
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
});
