import { Capacitor } from '@capacitor/core';

const runtimeHost = typeof window !== 'undefined' ? window.location.hostname : '10.0.2.2';
const normalizedHost = runtimeHost === '10.0.2.2' || runtimeHost === '127.0.0.1' || runtimeHost === '0.0.0.0'
  ? '10.0.2.2'
  : runtimeHost;

export const environment = {
  production: true,
  apiBaseUrl: `http://${normalizedHost}:8080`,
  // Real LAN IP for local device testing over Wi-Fi. Change to your HTTPS domain before real production release.
  mobileApiBaseUrl: 'http://localhost:8080'
};

// Reliable native-platform check using Capacitor's own API
const isNativeMobile = (): boolean => {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
};

export const getApiBaseUrl = (): string => {
  return isNativeMobile() ? environment.mobileApiBaseUrl : environment.apiBaseUrl;
};