export const environment = {
  production: true,

  apiBaseUrl: '',
  apiUrl: '/api',
  swmApiUrl: '/api/weighbridge',
  emailjs: {
    serviceId: 'service_654leop',
    publicKey: 's5Rl1UDf_tba2Zita',
    maintenanceTemplateId: 'template_ybf7q51',
    followUpTemplateId: 'template_ejmzqug'
  },

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