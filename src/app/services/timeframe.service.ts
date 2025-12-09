export enum TimeFrame {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  HALF_YEARLY = 'HALF_YEARLY',
  YEARLY = 'YEARLY'
}

export interface TimeFrameRequest {
  wbId: string;
  startDate: string;
  endDate: string;
  timeframe: TimeFrame;
}

export interface TimeFrameDataDTO {
  periodName: string;
  startDate: string | Date;
  endDate: string | Date;
  totalEntries: number;
  totalNetWeight: number;
  totalGrossWeight: number;
  averageNetWeight: number;
  averageGrossWeight: number;
}