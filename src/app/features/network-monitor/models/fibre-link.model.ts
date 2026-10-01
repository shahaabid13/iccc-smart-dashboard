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
  tier?: 'MAIN_TRUNK' | 'BRANCH' | null;
  diagramConfirmed: boolean;
  currentStatus: DeviceStatus;
  fieldVerifiedStatus?: DeviceStatus | null;
  fieldVerifiedNotes?: string | null;
  fieldVerifiedAt?: string | null;
  effectiveStatus?: DeviceStatus;
  lastStatusChange: string | null;
  topologyRole?: string | null;
  path: number[][];
}
