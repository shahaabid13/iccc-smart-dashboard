import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.iccc.cimsfieldapp',
  appName: 'CIMS Field App',
  webDir: 'www',
  server: {
    androidScheme: 'http'
  },
  ios: {
    scheme: 'App'
  },
  android: {
    minWebViewVersion: 100
  }
};

export default config;