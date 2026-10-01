export interface Junction {
  id: string;
  name: string;
  type: 'JUNCTION' | 'ROUTER' | 'SWITCH' | 'DATA_CENTER';
  latitude: number | null;
  longitude: number | null;
  hasCoordinates: boolean;
  source: string | null;
  decommissioned?: boolean;
  decommissionedReason?: string | null;
  deviceCount: number;
  linkCount: number;
  reachable?: boolean;
}
