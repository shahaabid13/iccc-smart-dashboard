export const environment = {
  production: true,

  apiBaseUrl: '',
  apiUrl: '/api',
  swmApiUrl: '/api/weighbridge',

  trafficDashboard: {
    apiBaseUrl: '',
    apiTimeout: 30000,

    auth: {
      tokenStorageKey: 'token',
      userStorageKey: 'currentUser',
      useHttpOnly: true,
      useRefreshToken: true
    },

    map: {
      provider: 'leaflet',
      tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      defaultZoom: 12,
      defaultCenter: [34.0837, 74.7973]
    },

    features: {
      eventSearchMaxDays: 90,
      defaultPageSize: 20,
      defaultEventLimit: 50
    }
  }
};