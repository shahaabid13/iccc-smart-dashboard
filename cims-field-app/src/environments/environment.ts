const runtimeHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const normalizedHost = runtimeHost === 'localhost' || runtimeHost === '127.0.0.1' || runtimeHost === '0.0.0.0'
  ? 'localhost'
  : runtimeHost;

export const environment = {
  production: false,
  apiBaseUrl: `http://${normalizedHost}:8080`
};
