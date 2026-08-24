// Force the field app to the same backend host as the dashboard to avoid
// resolving to a different auth/session context when running in the browser.
const backendHost = '172.30.0.111';
const backendPort = '8080';

export const environment = {
  production: false,
  apiBaseUrl: `http://${backendHost}:${backendPort}`,
  mobileApiBaseUrl: `http://${backendHost}:${backendPort}`,
};

// Use the same backend host regardless of browser or native environment.
export const getApiBaseUrl = (): string => {
  return environment.apiBaseUrl;
};
