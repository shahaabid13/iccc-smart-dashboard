import { DeviceStatus } from './device.model';

export interface FibreLink {
  id: string;
  displayName: string | null;
  fromJunctionId: string | null;
  fromJunctionName: string | null;
  fromConfident: boolean;
  toJunctionId: string | null;
  toJunctionName: string | null;
  toConfident: boolean;
  lengthMeters: number | null;
  confirmed: boolean;
  diagramConfirmed: boolean;
  currentStatus: DeviceStatus;
  lastStatusChange: string | null;
  path: number[][];
}
