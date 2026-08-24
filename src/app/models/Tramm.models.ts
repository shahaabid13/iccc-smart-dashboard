// Shapes returned by the Spring Boot /api/tramm/* proxy endpoints,
// mirrored from the real TraMM SOAP service responses.

export interface CorridorListResponse {
  alCorridors: string[];
}

export interface JunctionListResponse {
  alJunctions: string[];
}

export interface LampInfo {
  nLampNo: number;
  bLampStatus: number;
  sLampColor: string; // "RED" | "AMBER" | "GREEN"
}

export interface PoleInfo {
  nPoleNo: number;
  alLinkedLampJSON: LampInfo[];
}

export interface DetectorInfo {
  nDetectorNo: number;
  bDetectorStatus: number;
}

export interface JunctionDetails {
  sJunctionStateInCorridor: string;
  sName: string;
  sIntersectionName: string;
  nDistanceFromRefJn: number;
  tSystemTime: string;
  nICT: number;
  nCCT: number;
  nACT: number;
  nCycledos: number;
  dLatitude: number;
  dLongitude: number;
  alLinkedDetectorJSON: DetectorInfo[];
  alLinkedPhaseJSON: any[];
  sMode: string;
  sStatus: string; // e.g. "JUNCTION OFF"
  nStatus: number;
  nCurrentSequenceNo: number;
  nCurrentStageNo: number;
  nCurrentCycleNo: number;
  alPoleJSON: PoleInfo[];
  nPriorityStageSequence: number;
  nUpStreamStageSequence: number;
  nDownStreamStageSequence: number;
  nPriorityEnabled: number;
  nCumulativeVolume: number;
  nCumulativeViolations: number;
  nOSCycleDOS: number;
  nUSCycleDOS: number;
  nOffsetWaitingDelayTime: number;
  alAllPhaseJSON: number[];
  nMaxCCT: number;
}