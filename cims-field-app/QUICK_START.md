# CIMS Field App - Quick Start

## 1. Installation

```bash
cd cims-field-app
npm install
```

## 2. Development

### Web Development
```bash
npm start
```

Opens at `http://localhost:4200`. Use for rapid development and testing.

**Login credentials**: Use your CIMS backend credentials (username/password).

### Build for Capacitor
```bash
npm run build
```

Outputs to `www/` directory.

## 3. Native Development

### Android
```bash
npm run cap:open:android
```

Opens Android Studio. Build and run via Android Studio IDE or:
```bash
cd android && ./gradlew assembleDebug && cd ..
```

APK: `android/app/build/outputs/apk/debug/app-debug.apk`

### iOS
```bash
npm run cap:open:ios
```

Opens Xcode. Build and run via Xcode or:
```bash
cd ios/App && xcodebuild -scheme App -configuration Debug
```

## 4. First Run Checklist

- [ ] Install dependencies: `npm install`
- [ ] Configure backend URL in `src/environments/environment.ts`
- [ ] Run dev server: `npm start`
- [ ] Test login with backend credentials
- [ ] Navigate to Tickets tab — should load active queue
- [ ] Navigate to Tasks tab — should load assigned tasks
- [ ] Test offline mode (DevTools → Network → Offline)
- [ ] Test pull-to-refresh on both tabs

## 5. Environment Configuration

Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080'  // Your backend URL
};
```

For production builds, also update `src/environments/environment.prod.ts`.

## 6. Building for Distribution

### Android (Debug APK for Testing)
```bash
npm run build
npm run cap:copy
cd android
./gradlew assembleDebug
```

APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Android (Release APK)
```bash
npm run build -- --configuration=production
npm run cap:copy
cd android
./gradlew assembleRelease
```

Requires signing keystore. See Android Studio docs for keystore setup.

### iOS
```bash
npm run build -- --configuration=production
npm run cap:copy
```

Then in Xcode → Product → Archive for TestFlight/App Store upload.

## 7. Key Features to Test

### Tickets
1. See active queue from `/api/incidents/tickets/my-queue`
2. Pull-to-refresh updates list
3. Tap ticket to see detail
4. If status is OPEN/REOPENED:
   - Acknowledge button appears
   - After acknowledge, reviewer picker shows
   - Select reviewer and submit
5. Offline: actions are queued and retried on reconnect

### Tasks
1. See assigned tasks from `/api/tasks/my`
2. Pull-to-refresh updates list
3. Tap task to see detail
4. If status is OPEN/HOLD:
   - Take Action form shows
   - Select action (Resolved, Hold, Rejected)
   - Enter summary (required)
   - Submit
5. Offline: actions are queued and retried on reconnect

### Authentication
1. Login screen on app start if not authenticated
2. JWT stored in Capacitor Preferences
3. Auto-attach to all API requests
4. 401 response clears token and redirects to login

### Offline
1. Disable network (DevTools or actual network)
2. Yellow warning banner appears
3. Existing lists show from cache
4. Actions are queued
5. Reconnect network
6. Queued actions auto-retry
7. Banner disappears

## 8. Troubleshooting

### "Cannot find module '@capacitor/network'"
```bash
npm install @capacitor/network@^8.0.1
npm run cap:copy
```

### Backend connection fails
- Verify `environment.ts` URL is correct
- Check backend is running: `curl http://localhost:8080/actuator/health`
- For Android emulator, use `10.0.2.2:8080` instead of `localhost`

### APK won't install
- Ensure previous version is uninstalled: `adb uninstall com.iccc.cimsfieldapp`
- Clear Android Studio cache: `Build` → `Clean Project`

### iOS build fails
```bash
cd ios/App && pod install && cd ..
```

### Offline banner not showing
- Check Network plugin is installed: `npm list @capacitor/network`
- Grant CHANGE_NETWORK_STATE permission (Android)

## 9. Debugging

### Chrome DevTools (Web)
- Open `http://localhost:4200`
- Press F12 to open DevTools
- Network tab shows API calls
- Console tab shows logs

### Android Device/Emulator
```bash
# Via Android Studio: Logcat window
# Or via CLI:
adb logcat | grep chromium
```

### iOS Simulator
- Xcode → Debug → Console (shows console logs)
- Safari → Develop → Simulator → [App Name] (web inspector)

## 10. Production Deployment

1. Update backend URL in `environment.prod.ts`
2. Build production:
   ```bash
   npm run build -- --configuration=production
   npm run cap:copy
   ```
3. Android:
   - Android Studio → Build → Generate Signed Bundle / APK
   - Upload to Google Play Console
4. iOS:
   - Xcode → Product → Archive
   - Upload to App Store Connect via Organizer

See [NATIVE_BUILD_GUIDE.md](./NATIVE_BUILD_GUIDE.md) for detailed steps.

## Next Steps

- Review [README.md](./README.md) for full feature overview
- Check [NATIVE_BUILD_GUIDE.md](./NATIVE_BUILD_GUIDE.md) for detailed build instructions
- Read [ASSETS_GUIDE.md](./ASSETS_GUIDE.md) for app icon/splash setup
