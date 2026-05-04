export const environment = {
  production: true,
  apiBaseUrl: '',
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
  }
};
