export interface DowntimeIncident {
  entityType: 'DEVICE' | 'FIBRE_LINK';
  entityId: string;
  entityLabel: string;
  category: string | null;
  downAt: string;
  upAt: string | null;
  durationSeconds: number;
  source: string;
}

export interface CategorySla {
  category: string;
  deviceCount: number;
  totalUpSeconds: number;
  totalDownSeconds: number;
  totalUnknownSeconds: number;
  uptimePercent: number;
  currentlyDownCount: number;
}
