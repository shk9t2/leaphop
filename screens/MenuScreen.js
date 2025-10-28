import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Меню игры</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.buttonText}>🎮 Начать игру</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.buttonText}>⚙️ Настройки</Text>
      </TouchableOpacity>
    </View>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#3498DB',
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});