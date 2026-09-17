export interface UptimeSummary {
  entityId: string;
  entityLabel: string;
  from: string;
  to: string;
  upMillis: number;
  downMillis: number;
  unknownMillis: number;
  uptimePercent: number;
  stateChangeCount: number;
}
