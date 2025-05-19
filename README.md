# Spectrum

## Overview
Spectrum is a monorepo containing both the mobile application and backend services. The project uses pnpm workspaces for package management.

## Project Structure
```
packages/
  ├── mobile/     # React Native mobile application
  └── backend/    # Rust-based backend services
      ├── api-docs/      # API documentation
      ├── backend/       # Main API service
      ├── core_engine/   # Core business logic
      └── onchain_puller/# Blockchain data service
```

## Prerequisites

### Mobile App
- Node.js (v14 or later)
- npx (comes with npm)
- Expo Go app installed on your mobile device

### Backend
- Rust (latest stable version)
- Cargo (Rust's package manager)
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Setup Instructions

### Mobile App Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Spectrum.git
   cd Spectrum
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the mobile app:**
   ```bash
   cd packages/mobile
   npx expo start
   ```

4. **Open the mobile app:**
   - Scan the QR code displayed in the terminal with the Expo Go app on your mobile device.
   - Alternatively, you can run the app on an emulator by pressing `a` for Android or `i` for iOS in the terminal.

### Backend Setup
1. **Install Rust:**
   ```bash
   # For macOS/Linux
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   
   # For Windows
   # Download and run rustup-init.exe from https://rustup.rs
   ```

2. **Setup the backend:**
   ```bash
   cd packages/backend
   
   # Install dependencies
   cargo build
   
   # Start services using Docker Compose
   docker-compose up -d
   ```

3. **Build and run individual services:**
   ```bash
   # Build all services
   cargo build --workspace
   
   # Run specific service
   cargo run -p backend
   cargo run -p core_engine
   cargo run -p onchain_puller
   ```

## Development

### Mobile App
- Located in `packages/mobile`
- Built with React Native and Expo
- Use `npx expo start` to start the Expo development server
- Press 'a' to open on Android emulator
- Scan the QR code with Expo Go app on your Android device

### Backend
- Located in `packages/backend`
- Built with Rust
- Uses Docker Compose for service orchestration
- Key services:
  - `backend`: Main API service
  - `core_engine`: Core business logic
  - `onchain_puller`: Blockchain data service
- API documentation available in `api-docs/`

## Available Scripts

### Root
- `pnpm install` - Install all dependencies across packages

### Mobile
- `npx expo start` - Start the Expo development server
- `npx expo start --clear` - Start with a clean cache

### Backend
- `cargo build` - Build all Rust services
- `cargo test` - Run all tests
- `cargo run -p <service>` - Run a specific service
- `docker-compose up -d` - Start all services using Docker
- `docker-compose down` - Stop all services

## Dependencies

### Mobile
- @react-navigation/native
- @react-navigation/native-stack
- react-native-screens
- react-native-safe-area-context

### Backend
- Rust (latest stable)
- PostgreSQL
- Docker & Docker Compose
- Additional dependencies are managed through Cargo.toml in each service

## TypeScript

This project uses TypeScript for better type safety and developer experience. TypeScript configurations are available in each package's `tsconfig.json`.

Key TypeScript features:
- Strict type checking
- Path aliases configured
- React Native specific TypeScript configuration
- Type definitions for all major dependencies 

# Demo Video

You can watch a demo of the app below:

[![Watch the demo](demo/Simulator_Screen_Recording_iPhone15Pro.mp4)](demo/Simulator_Screen_Recording_iPhone15Pro.mp4)

> **Note:** GitHub may not play MP4 files inline. If so, [download the video here](demo/Simulator_Screen_Recording_iPhone15Pro.mp4) and play it locally.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
