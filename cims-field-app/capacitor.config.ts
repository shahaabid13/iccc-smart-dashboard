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
  },
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_cims_notification',
      iconColor: '#1457b7',
      presentationOptions: ['badge', 'sound', 'banner', 'list']
    }
  }
};

export default config;