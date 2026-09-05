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

// ==================== Historical Data DTOs ====================
export interface CharteredBikeStationHistoryDto {
  stationName: string;
  stationNumber: number;
  timestamp: string; // LocalDateTime format: 2024-01-15T10:30:00
  bikesAvailable: number;
  bikesTotal: number;
  bikeRackAvailable: number;
  bikeRackTotal: number;
  latitude: string;
  longitude: string;
}

export interface CharteredBikeHistoryResponse {
  data: CharteredBikeStationHistoryDto[];
  status: number;
  message: string;
}

// ==================== Statistics DTOs ====================
export interface CharteredBikeStationStatsDto {
  stationName: string;
  stationNumber: number;
  startDate: string; // LocalDateTime
  endDate: string;   // LocalDateTime
  minBikes: number;
  maxBikes: number;
  avgBikes: number;
  minRackAvailable: number;
  maxRackAvailable: number;
  avgRackAvailable: number;
  dataPoints: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
}

export interface CharteredBikeStatsResponse {
  data: CharteredBikeStationStatsDto[];
  status: number;
  message: string;
}

// ==================== Report DTOs ====================
export interface CharteredBikeReportDto {
  stationName: string;
  stationNumber: number;
  totalBikes: number;
  activeBikes: number;
  inactiveBikes: number;
  bikesOnTrip: number;
  availabilityPercentage: number;
  reportDate: string;
  avgAvailability: number;
  minAvailability: number;
  maxAvailability: number;
}

export interface CharteredBikeReportResponse {
  data: CharteredBikeReportDto[];
  status: number;
  message: string;
}

// ==================== Station Names DTO ====================
export interface CharteredBikeStationNamesDto {
  stationName: string;
  stationNumber: number;
  latitude: string;
  longitude: string;
}
