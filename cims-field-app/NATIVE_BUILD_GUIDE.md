# CIMS Field App - Native Build Guide

## Setup

### Prerequisites
- Node.js 18+ and npm
- Android Studio (for Android) or Xcode (for iOS)
- Java Development Kit (JDK) 11+ (for Android)

### Install Dependencies
```bash
cd cims-field-app
npm install
```

## Building the Web App

Build the Angular web app for Capacitor:
```bash
npm run build
```

This outputs to `www/` directory.

## Android Setup

### Initial Setup (one-time)
```bash
npx cap add android
```

This creates an `android/` directory with Android Studio project files.

### Configuration
The app is configured with:
- **App ID**: `com.iccc.cimsfieldapp`
- **App Name**: `CIMS Field App`
- **Minimum SDK**: 22
- **Target SDK**: 34

Edit `capacitor.config.ts` to change these values if needed.

### Build Debug APK
```bash
# Copy the latest web build to Android project
npm run cap:copy

# Open Android Studio
npm run cap:open:android
```

Then in Android Studio:
1. Select `Build` → `Build Bundles / APK` → `Build APK`
2. Debug APK will be in `android/app/build/outputs/apk/debug/`

Or use the command line:
```bash
cd android
./gradlew assembleDebug
```

The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Deploy to Device/Emulator
```bash
# Using Android Studio, or via CLI:
cd android
./gradlew installDebug
```

## iOS Setup

### Initial Setup (one-time)
```bash
npx cap add ios
```

This creates an `ios/` directory with Xcode project files.

### Build and Run
```bash
# Copy the latest web build to iOS project
npm run cap:copy

# Open Xcode
npm run cap:open:ios
```

Then in Xcode:
1. Select the simulator or device
2. Press `Cmd + R` to build and run
3. Or use `Product` → `Build` to create an archive for distribution

## Development Workflow

### Live Reload (Web)
For development without rebuilding the app:
```bash
npm start
```

Opens the app in a browser at `http://localhost:4200`. Use Chrome DevTools for debugging.

### Sync Changes to Native
After making code changes:
```bash
npm run build
npm run cap:copy
```

Then rebuild in Android Studio or Xcode.

## Capacitor Plugins Used

- `@capacitor/preferences` — Store JWT and cache data
- `@capacitor/network` — Detect online/offline status
- `@capacitor/core` — Base Capacitor runtime

## Environment Variables

Configure the backend API URL in:
- **Dev**: `src/environments/environment.ts` (default: `http://localhost:8080`)
- **Prod**: `src/environments/environment.prod.ts` (update before building for production)

Build production app:
```bash
npm run build -- --configuration=production
npm run cap:copy
```

## Troubleshooting

### APK not signing in Android Studio
- Ensure you have a keystore and it's configured in `android/app/build.gradle`
- Use `gradlew assemble` to build unsigned APK for testing

### iOS build fails
- Run `pod install` in `ios/App/` directory
- Ensure Xcode and iOS SDK are up to date
- Check deployment target matches minimum iOS version (11.0+)

### Network requests failing
- Check `environment.ts` has correct backend URL
- Ensure backend is running and accessible
- For Android emulator: use `10.0.2.2` instead of `localhost` for the host machine

### Offline mode not working
- Grant `CHANGE_NETWORK_STATE` permission in Android manifest
- Ensure `@capacitor/network` is properly installed

## Production Build

1. Update environment URLs in `src/environments/environment.prod.ts`
2. Build production bundle:
   ```bash
   npm run build -- --configuration=production
   npm run cap:copy
   ```
3. Sign APK in Android Studio: `Build` → `Generate Signed Bundle / APK`
4. For iOS, create an App Store Connect upload via Xcode `Organizer`
