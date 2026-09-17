export interface Junction {
  id: string;
  name: string;
  type: 'JUNCTION' | 'ROUTER' | 'DATA_CENTER';
  latitude: number | null;
  longitude: number | null;
  hasCoordinates: boolean;
  source: string | null;
  deviceCount: number;
  linkCount: number;
}
