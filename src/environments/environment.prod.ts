export const environment = {
  production: true,
  apiBaseUrl: 'https://your-api-domain.com',  // Update with actual production URL
  apiUrl: '/api',
  swmApiUrl: '/api/weighbridge',
  // Chartered Bike API Configuration
  charteredBike: {
    baseUrl: 'https://api.charteredbike.in/api/v1',
    // Credentials (hardcoded as per API spec)
    credentials: {
      userName: 'SSCL',
      password: '209107'
    },
    // Query parameters for stations
    stationsQuery: {
      domain: 'asia',
      companyregionid: '16'
    }
  },
  // Traffic/Video Management Dashboard Configuration
  trafficDashboard: {
    apiBaseUrl: 'https://your-api-domain.com',
    apiTimeout: 30000,
    auth: {
      tokenStorageKey: 'token',
      userStorageKey: 'currentUser',
      useHttpOnly: true, // Use httpOnly cookies in production
      useRefreshToken: true
    },
    map: {
      provider: 'leaflet',
      tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      defaultZoom: 12,
      defaultCenter: [40.7128, -74.0060]
    },
    features: {
      eventSearchMaxDays: 90,
      defaultPageSize: 20,
      defaultEventLimit: 50
    }
  }
};
