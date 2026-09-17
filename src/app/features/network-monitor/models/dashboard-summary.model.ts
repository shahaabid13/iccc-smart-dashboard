export interface DashboardSummary {
  junctionCount: number;
  routerCount: number;
  deviceCount: number;
  devicesUp: number;
  devicesDown: number;
  devicesUnknown: number;
  linkCount: number;
  linksUp: number;
  linksDown: number;
  linksUnknown: number;
  totalLengthKm: number;
  lastSweepAt: string | null;
}
