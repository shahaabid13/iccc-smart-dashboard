export type DeviceStatus = 'UP' | 'DOWN' | 'UNKNOWN';

export type DeviceCategory =
  | 'SWITCH' | 'CCTV' | 'PTZ' | 'ANPR' | 'ECB' | 'PA'
  | 'UPS' | 'SERVER' | 'STORAGE' | 'LINUX' | 'APPLICATION';

export interface Device {
  id: number;
  junctionId: string | null;
  junctionName: string | null;
  junctionLatitude: number | null;
  junctionLongitude: number | null;
  junctionHasCoordinates: boolean;
  deviceLabel: string;
  ipAddress: string;
  category: string;
  networkSwitch: boolean;
  currentStatus: DeviceStatus;
  lastStatusChange: string | null;
  lastCheckedAt: string | null;
  lastUpAt: string | null;
  snmpEnabled: boolean;
  lldpEnabled: boolean | null;
}
