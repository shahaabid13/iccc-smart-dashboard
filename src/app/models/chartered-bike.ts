/**
 * Chartered Bike Srinagar API Models/Interfaces
 * Defines the structure for API responses and data models
 */

// ==================== Login Response ====================
export interface CharteredBikeLoginData {
  userId: number;
  firstName: string;
  emailId: string;
  token: string;
  refreshToken: string;
  cityId: number;
  userRole: string;
  tokenExpiryTime: number;
}

export interface CharteredBikeLoginResponse {
  data: CharteredBikeLoginData;
  status: number;
  message: string;
}

// ==================== Station & Map Data ====================
export interface CharteredBikeStation {
  stationName: string;
  stationNumber: number;
  latitude: string;
  longitude: string;
  active: boolean;
  bikesAvailable: number;
  bikesTotal: number;
  bikesRack: number;
  bikesFree: number;
  ebikesAvailable: number;
  reportActiveBikes: number;
  reportInactiveBikes: number;
  reportOnTripBikes: number;
  stolenBikes: number;
  missingBikes: number;
  bikeNumberList: number[];
  ecoBikeNumberList: number[];
  ebikeNumberList: number[];
  cityName: string;
  cityId: number;
}

export interface CharteredBikeStationCompany {
  companyName: string;
  primaryColor: string;
  mapStationDTOs: CharteredBikeStation[];
}

export interface CharteredBikeStationResponse {
  data: CharteredBikeStationCompany[];
  status: number;
  message: string;
}

// ==================== Error Response ====================
export interface ApiErrorResponse {
  status: number;
  message: string;
  error?: any;
}

// ==================== UI Model for Station (with convenience properties) ====================
export interface CharteredBikeStationUI extends CharteredBikeStation {
  availabilityPercentage?: number;
  statusColor?: string;
  statusLabel?: string;
}
