# Тестирование SimpleRunner (Expo React Native)

В этом коммите добавлены:
- **Модульные тесты** `__tests__/platformUtils.unit.test.js` для `utils/PlatformUtils.js`
- **Интеграционные тесты** `__tests__/menuScreen.integration.test.js` для навигации на экране Меню
- **Функциональные тесты** `__tests__/homeScreen.functional.test.js` для основного пользовательского сценария (переход на меню)
- **Снапшот-тест** `__tests__/app.snapshot.test.js` для корневого дерева навигации
- Конфигурация Jest: `jest.config.js` + скрипты в `package.json`

## Установка зависимостей

```bash
npm i -D jest jest-expo @testing-library/react-native @testing-library/jest-native react-test-renderer
```

> Если используете Yarn:
```bash
yarn add -D jest jest-expo @testing-library/react-native @testing-library/jest-native react-test-renderer
```

## Запуск тестов

```bash
npm test
# или
npm run test:coverage
```

## Структура

```
__tests__/
  app.snapshot.test.js
  homeScreen.functional.test.js
  menuScreen.integration.test.js
  platformUtils.unit.test.js
jest.config.js
```

## Примечания
- Тесты навигации используют мок `navigation={{ navigate: jest.fn() }}`.
- Для unit-тестов `expo-device`, `Vibration`, `Linking`, `Platform` замоканы.
- При необходимости можно расширить функциональные тесты с помощью Detox для e2e.