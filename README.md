# Установка и запуск

## Установка зависимостей
npm install

при необходимости
npm install --legacy-peer-deps



## Запуск в режиме разработки
npx expo start



## Доступные режимы:

- Expo Go
- Android Emulator
- iOS Simulator
- Development Build

## Запуск с очисткой кеша
npx expo start -c


## Тестирование

### Unit-тесты (Jest)
npm run test



### E2E-тесты (Detox)

#### Подготовка сборки:
npm run detox:build
