import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.iccc.cimsfieldapp',
  appName: 'CIMS Field App',
  webDir: 'www',
  bundledWebRuntime: false,
  ios: {
    scheme: 'App'
  },
  android: {
    minWebViewVersion: 100,
    permissions: ['INTERNET', 'CHANGE_NETWORK_STATE']
  }
};

export default config;
