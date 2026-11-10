import { Capacitor } from '@capacitor/core';

const backendHost = '172.30.0.111';
const backendPort = '8080';

export const environment = {
  production: false,
  apiBaseUrl: '',
  mobileApiBaseUrl: `http://${backendHost}:${backendPort}`,
};

export const getApiBaseUrl = (): string => {
  return Capacitor.isNativePlatform() ? environment.mobileApiBaseUrl : environment.apiBaseUrl;
};
