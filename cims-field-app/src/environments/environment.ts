const runtimeHost = typeof window !== 'undefined' ? window.location.hostname : '10.0.2.2';
const normalizedHost = runtimeHost === '10.0.2.2' || runtimeHost === '127.0.0.1' || runtimeHost === '0.0.0.0'
  ? '10.0.2.2'
  : runtimeHost;

// IMPORTANT: For mobile builds, replace 'localhost:8080' with your actual backend server URL
// e.g., 'https://your-api.example.com' or 'http://192.168.1.100:8080'
export const environment = {
  production: false,
  apiBaseUrl: `http://${normalizedHost}:8080`,
  // Fallback for native mobile apps that don't have window.location set correctly
  mobileApiBaseUrl: 'http://localhost:8080' // Development mobile backend server
};

// Detect if running in Capacitor native environment
const isNativeMobile = () => {
  try {
    return typeof (window as any).cordova !== 'undefined' || (window as any).ionic !== undefined;
  } catch {
    return false;
  }
};

// Use mobile-specific URL if running on native, otherwise use the dynamic URL
export const getApiBaseUrl = (): string => {
  return isNativeMobile() ? environment.mobileApiBaseUrl : environment.apiBaseUrl;
};
