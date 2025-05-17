# Spectrum-FE

## Overview
Spectrum-FE is a React Native app built with Expo, featuring a modern, dark-themed UI with a custom tab bar and several feature screens.

## Prerequisites
- Node.js (v14 or later)
- npm
- Expo Go app installed on your mobile device

## Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Spectrum-FE.git
   cd Spectrum-FE
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Expo development server:**
   ```bash
   npm start
   ```

4. **Open the app on your device:**
   - Scan the QR code displayed in the terminal with the Expo Go app on your mobile device.
   - Alternatively, you can run the app on an emulator by pressing `a` for Android or `i` for iOS in the terminal.

## Contributing
1. **Fork the repository:**
   - Go to the [Spectrum-FE repository](https://github.com/yourusername/Spectrum-FE) and click the "Fork" button.

2. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes:**
   - Implement your feature or fix a bug.

4. **Commit your changes:**
   ```bash
   git commit -m "Add your feature or fix"
   ```

5. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request:**
   - Go to your fork on GitHub and click the "New Pull Request" button.
   - Select the main branch of the original repository as the base and your feature branch as the compare.
   - Submit the pull request.

## Additional Information
- The app uses Expo Go for development, which allows you to run the app on your physical device without needing to set up a development environment.
- For more information on Expo, visit the [Expo documentation](https://docs.expo.dev/).

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

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

- `npx expo start --clear` - Start the Expo development server with a clean cache

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

# Demo Video

You can watch a demo of the app below:

[![Watch the demo](demo/Simulator_Screen_Recording_iPhone15Pro.mp4)](demo/Simulator_Screen_Recording_iPhone15Pro.mp4)

> **Note:** GitHub may not play MP4 files inline. If so, [download the video here](demo/Simulator_Screen_Recording_iPhone15Pro.mp4) and play it locally.

--- 