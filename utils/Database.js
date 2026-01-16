import * as SQLite from 'expo-sqlite';

// Открываем базу данных (создастся если не существует)
const db = SQLite.openDatabase('leaphop.db');

// Функция для инициализации таблиц (просто объявлена, но не вызывается)
export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS high_scores (id INTEGER PRIMARY KEY AUTOINCREMENT, score INTEGER, level INTEGER, time INTEGER);',
      [],
      () => console.log('Таблица high_scores создана'),
      (_, error) => console.log('Ошибка создания таблицы:', error)
    );
  });
};

// Функция для вставки данных (просто объявлена, но не используется)
export const insertScore = (score, level, time) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO high_scores (score, level, time) VALUES (?, ?, ?);',
      [score, level, time],
      (_, result) => console.log('Рекорд вставлен:', result.insertId),
      (_, error) => console.log('Ошибка вставки:', error)
    );
  });
};

// Функция для получения данных (просто объявлена, но не используется)
export const getHighScores = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM high_scores ORDER BY score DESC LIMIT 10;',
      [],
      (_, { rows }) => callback(rows._array),
      (_, error) => console.log('Ошибка получения:', error)
    );
  });
};

export default db;