/**
 * Traffic/Video Management Dashboard DTOs
 * Matches Spring Boot backend contracts
 */

// ============================================================================
// AUTH DTOs
// ============================================================================

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresIn?: number;
  tokenType?: string;
  refreshToken?: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email?: string;
  roles?: string[];
}

// ============================================================================
// SERVER DTOs
// ============================================================================

export interface Server {
  serverId: number;
  serverName: string;
  baseUrl: string;
  description?: string;
  isActive: boolean;
}

// ============================================================================
// CHANNEL DTOs
// ============================================================================

export type CameraInstallationType = 'ANPR' | 'Evidence' | 'GENERAL';

export interface Channel {
  id: string;
  serverId: string;
  serverName?: string;
  name: string;
  type: CameraInstallationType;
  location: string;
  latitude?: number;
  longitude?: number;
  status?: 'ACTIVE' | 'INACTIVE' | 'OFFLINE';
  resolution?: string;
  frameRate?: number;
  lastSeen?: number;
  createdAt?: number;
  updatedAt?: number;
  description?: string;
}

export interface ChannelFilterRequest {
  serverId?: string;
  type?: CameraInstallationType;
  location?: string;
  status?: string;
}

export interface ChannelResponse {
  channels: Channel[];
  total: number;
  page?: number;
  limit?: number;
}

// ============================================================================
// EVENT/DETECTION DTOs
// ============================================================================

export interface Event {
  id: string;
  serverId: string;
  channelId: string;
  channelName?: string;
  timestamp: number; // epoch millis
  plateNumber?: string;
  applicationId?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  confidence?: number;
  direction?: string;
  speed?: number;
  vehicleClass?: string;
  additionalData?: Record<string, any>;
  createdAt?: number;
}

export interface EventSearchRequest {
  serverId?: number;
  channelId?: string;
  startTimestamp: number; // epoch millis
  endTimestamp: number; // epoch millis
  lpNumber?: string;
  applicationId?: string;
  page?: number;
  limit?: number;
  persist?: boolean;
}

export interface EventCountRequest {
  serverId?: number;
  channelId?: string;
  startTimestamp: number;
  endTimestamp: number;
  lpNumber?: string;
  applicationId?: string;
}

export interface EventSearchResponse {
  events: Event[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ExternalEventItem {
  eventid: number;
  alerttype: number;
  alertname?: string;
  channelid: number;
  channelname: string;
  eventlocation: string;
  eventtime: string;
  message: string;
  action: string;
  clipurl: string;
  latitude: number;
  longitude: number;
  sender: string;
}

export interface ExternalEventSearchResponse {
  totalrecords: number;
  totalpages: number;
  currentpage: number;
  eventlist: ExternalEventItem[];
  partial?: boolean;
  failedServers?: string[];
  failedServerIds?: number[];
  warning?: string;
}

export interface EventCountResponse {
  count: number;
  serverId: string;
  timestamp: number;
}

// ============================================================================
// SYNC DTOs
// ============================================================================

export interface SyncChannelsRequest {
  serverId?: string;
}

export interface SyncChannelsResponse {
  synced: number;
  failed: number;
  timestamp: number;
  message: string;
}

// ============================================================================
// API Response Wrapper
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
