# React Native Expo App

This is a React Native application built with Expo 53 and TypeScript.

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Android Studio (for Android development)
- Android SDK
- Expo Go app on your Android device (for testing)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. To run on Android:
```bash
npm run android
```

## Project Structure

```
src/
  ├── assets/      # Images, fonts, and other static files
  ├── components/  # Reusable components
  ├── navigation/  # Navigation configuration
  ├── screens/     # Screen components
  └── utils/       # Utility functions and helpers
```

## Development

- Use `npm start` to start the Expo development server
- Press 'a' to open on Android emulator
- Scan the QR code with Expo Go app on your Android device

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser

## Dependencies

- @react-navigation/native
- @react-navigation/native-stack
- react-native-screens
- react-native-safe-area-context

## TypeScript

This project uses TypeScript for better type safety and developer experience. The TypeScript configuration is in `tsconfig.json`.

Key TypeScript features:
- Strict type checking
- Path aliases configured
- React Native specific TypeScript configuration
- Type definitions for all major dependencies 