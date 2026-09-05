import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, tap } from 'rxjs';
import { TimeFrameDataDTO, TimeFrameRequest } from './timeframe.service';
import { environment } from '../../environments/environment';
import {
  CharteredBikeStation,
  CharteredBikeStationHistoryDto,
  CharteredBikeStationStatsDto,
  CharteredBikeReportDto,
  CharteredBikeStationNamesDto,
  CharteredBikeHistoryResponse,
  CharteredBikeStatsResponse,
  CharteredBikeReportResponse,
} from '../models/chartered-bike';

@Injectable({ providedIn: 'root' })
export class SmcService {
  getMonthlyNetTrend: any;
  getMonthlyGrossWeight: any;
  getMonthlyGrossTrend(wbId: string) {
    throw new Error('Method not implemented.');
  }
  // Updated API base URL for the new endpoint
  // private readonly baseUrl = '/api/weighbridge';
  private baseUrl = environment.swmApiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get all weighbridge data for a specific WB ID
   */
  getAllWeighbridgeData(wbId: string): Observable<any[]> {
    const url = `${this.baseUrl}/report/data/all/${wbId}`;

    return this.http.get<any>(url).pipe(
      tap(response => console.log('🔵 Raw API Response:', response)),
      map(response => {
        let dataArray: any[] = [];

        // Handle different response formats from backend
        if (Array.isArray(response)) {
          // Response is already an array
          dataArray = response;
        } else if (response && typeof response === 'object') {
          // Response might be wrapped in an object with data/records/result property
          if (Array.isArray(response.data)) {
            dataArray = response.data;
          } else if (Array.isArray(response.records)) {
            dataArray = response.records;
          } else if (Array.isArray(response.result)) {
            dataArray = response.result;
          } else if (Array.isArray(response.items)) {
            dataArray = response.items;
          } else if (response && typeof response === 'object' && !Array.isArray(response)) {
            // Single object response, wrap in array
            dataArray = [response];
          }
        }

        // Log the parsed data
        console.log('✅ Parsed Data Array:', dataArray?.length || 0, 'records');
        if (dataArray.length > 0) {
          console.log('📊 Sample record:', dataArray[0]);
        }

        return dataArray || [];
      }),
      catchError(error => {
        console.error('❌ API Error:', error);
        console.warn('⚠️ Using fallback data');
        return of(this.getFallbackData());
      })
    );
  }
// Add these methods to your SmcService class

getNetTrend(wbId: string, startDate?: string, endDate?: string): Observable<any[]> {
  if (startDate && endDate) {
    // Prefer calling the trend endpoint with date range params so we get per-day data
    const params = { start: startDate, end: endDate };
    return this.http.get<any[]>(`${this.baseUrl}/report/trend/net/${wbId}`, { params }).pipe(
      map(data => {
        return Array.isArray(data) ? data.map((item: any) => ({
          dateTime: item.dateTime || item.date || item.timestamp,
          netWeight: item.netWeight || item.weight || item.value || 0
        })) : [];
      }),
      catchError(error => {
        console.error('Error fetching net trend with range, falling back to summary:', error);
        // Fallback to the summary endpoint if trend by range fails
        const summaryParams = { start: startDate, end: endDate, wbId };
        return this.http.get<any>(`${this.baseUrl}/report/summary`, { params: summaryParams }).pipe(
          map(data => {
            const weight = data?.totalNetWeight ?? data?.totalWeight ?? 0;
            return [{ dateTime: `${startDate} to ${endDate}`, weight }];
          }),
          catchError(err => {
            console.error('Error fetching custom-range net trend via summary fallback:', err);
            return of([{ dateTime: `${startDate} to ${endDate}`, weight: 0 }]);
          })
        );
      })
    );
  }

  return this.http.get<any[]>(`${this.baseUrl}/report/trend/net/${wbId}`).pipe(
    map(data => {
      return Array.isArray(data) ? data.map((item: any) => ({
        dateTime: item.dateTime || item.date || item.timestamp,
        netWeight: item.netWeight || item.weight || 0
      })) : [];
    }),
    catchError(error => {
      console.error('Error fetching net trend:', error);
      return of(this.getMockTrendData('Net Weight'));
    })
  );
}

getGrossTrend(wbId: string, startDate?: string, endDate?: string): Observable<any[]> {
  if (startDate && endDate) {
    const params = { start: startDate, end: endDate, wbId };
    return this.http.get<any>(`${this.baseUrl}/report/summary`, { params }).pipe(
      map(data => {
        const weight = data?.totalGrossWeight ?? data?.totalWeight ?? 0;
        return [{
          dateTime: `${startDate} to ${endDate}`,
          weight
        }];
      }),
      catchError(error => {
        console.error('Error fetching custom-range gross trend via summary:', error);
        return of([{ dateTime: `${startDate} to ${endDate}`, weight: 0 }]);
      })
    );
  }

  return this.http.get<any[]>(`${this.baseUrl}/report/trend/gross/${wbId}`).pipe(
    map(data => {
      return Array.isArray(data) ? data.map((item: any) => ({
        dateTime: item.dateTime || item.date || item.timestamp,
        grossWeight: item.grossWeight || item.weight || 0
      })) : [];
    }),
    catchError(error => {
      console.error('Error fetching gross trend:', error);
      return of(this.getMockTrendData('Gross Weight'));
    })
  );
}

getVehicleTrend(wbId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/report/trend/vehicle/${wbId}`).pipe(
    map(data => {
      // Transform backend response to chart-friendly format
      // Expected format: [{ vehicleNo: 'JK123', data: [{dateTime, netWeight}, ...] }, ...]
      return Array.isArray(data) ? data.map((vehicle: any) => ({
        vehicleNo: vehicle.vehicleNo || vehicle.vno || 'Vehicle',
        data: Array.isArray(vehicle.data) ? vehicle.data.map((item: any) => ({
          dateTime: item.dateTime || item.date || item.timestamp,
          netWeight: item.netWeight || item.weight || 0
        })) : []
      })) : [];
    }),
    catchError(error => {
      console.error('Error fetching vehicle trend:', error);
      return of(this.getMockVehicleData());
    })
  );
}

getLast24Trend(wbId: string, startDate?: string, endDate?: string): Observable<any[]> {
  if (startDate && endDate) {
    // If a custom range is requested, try fetching hourly trend for the given range
    const params = { start: startDate, end: endDate };
    return this.http.get<any[]>(`${this.baseUrl}/report/trend/last24/${wbId}`, { params }).pipe(
      map(data => {
        return Array.isArray(data) ? data.map((item: any) => ({
          dateTime: item.dateTime || item.date || item.timestamp,
          weight: item.netWeight || item.weight || item.value || 0
        })) : [];
      }),
      catchError(error => {
        console.error('Error fetching last24 trend with range, falling back to summary:', error);
        const summaryParams = { start: startDate, end: endDate, wbId };
        return this.http.get<any>(`${this.baseUrl}/report/summary`, { params: summaryParams }).pipe(
          map(data => {
            const weight = data?.totalNetWeight ?? data?.totalWeight ?? 0;
            return [{ dateTime: `${startDate} to ${endDate}`, weight }];
          }),
          catchError(err => {
            console.error('Error fetching custom-range last24 via summary fallback:', err);
            return of([{ dateTime: `${startDate} to ${endDate}`, weight: 0 }]);
          })
        );
      })
    );
  }

  return this.http.get<any[]>(`${this.baseUrl}/report/trend/last24/${wbId}`).pipe(
    map(data => {
      return Array.isArray(data) ? data.map((item: any) => ({
        dateTime: item.dateTime || item.date || item.timestamp,
        weight: item.netWeight || item.weight || 0
      })) : [];
    }),
    catchError(error => {
      console.error('Error fetching last 24 trend:', error);
      return of(this.getMockTrendData('Last 24 Hours'));
    })
  );
}

getTimeframeData(request: TimeFrameRequest): Observable<TimeFrameDataDTO[]> {
    return this.http.post<TimeFrameDataDTO[]>(
      `${this.baseUrl}/timeframe/data`,
      request
    ).pipe(
      catchError(error => {
        console.error('Error fetching timeframe data:', error);
        // Return fallback/mock data instead of failing
        return of(this.getMockTimeframeData());
      })
    );
  }

getMonthlyWeightData(wbId: string, type: string, startDate: string, endDate: string): Observable<any[]> {
  const params = { wbId, type, startDate, endDate };
  return this.http.get<any[]>(`${this.baseUrl}/report/monthly/${type}`, { params }).pipe(
    map(data => {
      return Array.isArray(data) ? data : [];
    }),
    catchError(error => {
      console.error(`Error fetching monthly ${type} weight:`, error);
      return of([]);
    })
  );
}

getLast24HoursData(wbId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/report/last24/${wbId}`).pipe(
    map(data => {
      return Array.isArray(data) ? data : [];
    }),
    catchError(error => {
      console.error('Error fetching last 24 hours data:', error);
      return of([]);
    })
  );
}

getSummary(start: string, end: string, wbId: string): Observable<any> {
  // backend summary/day endpoint expects full ISO datetimes for start/end
  const params = { start, end, wbId };
  const url = `${this.baseUrl}/report/summary`;
  console.log('🔵 API Request - getSummary:', { url, params });

  return this.http.get<any>(url, { params }).pipe(
    tap(data => {
      console.log('✅ API Response - getSummary:', data);
    }),
    map(data => {
      // Expected response shape: { totalTrips, totalNetWeight }
      const totalTrips = data?.totalTrips ?? data?.totalVehicles ?? 0;
      const totalNetWeight = data?.totalNetWeight ?? data?.totalWeight ?? 0;

      const average = totalTrips ? Math.round(totalNetWeight / totalTrips) : 0;

      return {
        totalNetWeight: totalNetWeight,
        totalTrips: totalTrips,
      };
    }),
    catchError(error => {
      console.error('❌ API Error - getSummary:', error);
      console.log('⚠️ Returning mock data instead');
      return of(this.getMockSummaryData());
    })
  );
}

// Mock data methods for development
private getMockTrendData(label: string): any[] {
  const data = [];
  const baseDate = new Date();
  for (let i = 0; i < 10; i++) {
    data.push({
      date: new Date(baseDate.getTime() - (i * 24 * 60 * 60 * 1000)).toISOString(),
      weight: Math.floor(Math.random() * 1000) + 500,
      label: label
    });
  }
  return data;
}

private getMockVehicleData(): any[] {
  const vehicles = ['JK13E4846', 'JK13E4847', 'JK13E4848', 'JK13E4849', 'JK13E4850'];
  return vehicles.map(vehicle => ({
    vehicleNumber: vehicle,
    weight: Math.floor(Math.random() * 2000) + 1000
  }));
}

private getMockSummaryData(): any {
  return {
    totalWeight: 15420,
    totalVehicles: 25,
    averageWeight: 616.8,
    maxWeight: 1250
  };
}

private getMockTimeframeData(): TimeFrameDataDTO[] {
  return [
    {
      periodName: 'Week 1: 01 Nov to 07 Nov (7 days)',
      startDate: '2025-11-01',
      endDate: '2025-11-07',
      totalEntries: 0,
      totalNetWeight: 0.0,
      totalGrossWeight: 0.0,
      averageNetWeight: 0.0,
      averageGrossWeight: 0.0
    },
    {
      periodName: 'Week 2: 08 Nov to 14 Nov (7 days)',
      startDate: '2025-11-08',
      endDate: '2025-11-14',
      totalEntries: 0,
      totalNetWeight: 0.0,
      totalGrossWeight: 0.0,
      averageNetWeight: 0.0,
      averageGrossWeight: 0.0
    },
    {
      periodName: 'Week 3: 15 Nov to 21 Nov (7 days)',
      startDate: '2025-11-15',
      endDate: '2025-11-21',
      totalEntries: 4,
      totalNetWeight: 37415.0,
      totalGrossWeight: 76915.0,
      averageNetWeight: 9353.75,
      averageGrossWeight: 19228.75
    },
    {
      periodName: 'Week 4: 22 Nov to 28 Nov (7 days)',
      startDate: '2025-11-22',
      endDate: '2025-11-28',
      totalEntries: 186,
      totalNetWeight: 1708915.0,
      totalGrossWeight: 3442870.0,
      averageNetWeight: 9187.71505376344,
      averageGrossWeight: 18510.05376344086
    },
    {
      periodName: 'Week 5: 29 Nov to 05 Dec (7 days)',
      startDate: '2025-11-29',
      endDate: '2025-12-05',
      totalEntries: 322,
      totalNetWeight: 2958585.0,
      totalGrossWeight: 5957000.0,
      averageNetWeight: 9188.152173913044,
      averageGrossWeight: 18500.0
    },
    {
      periodName: 'Week 6: 06 Dec to 08 Dec (3 days)',
      startDate: '2025-12-06',
      endDate: '2025-12-08',
      totalEntries: 138,
      totalNetWeight: 1390075.0,
      totalGrossWeight: 2675440.0,
      averageNetWeight: 10073.007246376812,
      averageGrossWeight: 19387.246376811596
    }
  ];
}
  // Keep your existing trend methods


  /**
   * Updated fallback mock data to match the new API response structure
   */
  private getFallbackData(): any[] {
    console.warn('Using fallback data - API might be unavailable');
    return [
      {
        id: {
          slipno: 1,
          wbId: "SRNGR_LANDFILL_WB1"
        },
        vno: "TESTING",
        vname: "TATA 407",
        sname: "abd",
        tweight: 0,
        gweight: 95,
        gdate: "2025-11-21T14:39:37",
        tdate: "2025-11-21T14:40:06",
        nweight: 95,
        driver: "ttt",
        edate: "2025-11-21T14:40:06",
        zone: "kjhkjlh",
        mts: "kjhkj",
        ward: "lkjlk"
      },
      {
        id: {
          slipno: 2,
          wbId: "SRNGR_LANDFILL_WB1"
        },
        vno: "JK13E4846",
        vname: "TOYOTA",
        sname: "SMC Srinagar",
        tweight: 24000,
        gweight: 44000,
        gdate: "2025-11-21T12:34:12",
        tdate: "2025-11-21T12:34:01",
        nweight: 20000,
        driver: "A. Khan",
        edate: "2025-11-21T12:34:12",
        zone: "Zone A",
        mts: "MTS-1",
        ward: "Ward 5"
      }
    ];
  }

  // ========================== CHARTERED BIKE API METHODS ==========================
  
  private readonly charteredBikeBaseUrl = '/api/chartered-bike';

  /**
   * Get live station data (real-time, saves to DB)
   */
  getCharteredBikeStations(): Observable<CharteredBikeStation[]> {
    return this.http.get<any>(`${this.charteredBikeBaseUrl}/stations`).pipe(
      map(response => response.data || response || []),
      catchError(error => {
        console.error('Error fetching chartered bike stations:', error);
        return of([]);
      })
    );
  }

  /**
   * Get filtered station data (minimum bikes threshold)
   */
  getCharteredBikeStationsFiltered(minBikes: number): Observable<CharteredBikeStation[]> {
    return this.http.get<any>(
      `${this.charteredBikeBaseUrl}/stations/filtered`,
      { params: { minBikes: minBikes.toString() } }
    ).pipe(
      map(response => response.data || response || []),
      catchError(error => {
        console.error('Error fetching filtered chartered bike stations:', error);
        return of([]);
      })
    );
  }

  /**
   * Get latest station data from database
   */
  getCharteredBikeLatest(): Observable<CharteredBikeStation[]> {
    return this.http.get<any>(`${this.charteredBikeBaseUrl}/latest`).pipe(
      map(response => response.data || response || []),
      catchError(error => {
        console.error('Error fetching latest chartered bike data:', error);
        return of([]);
      })
    );
  }

  /**
   * Get available station names for historical data
   */
  getCharteredBikeStationNames(): Observable<CharteredBikeStationNamesDto[]> {
    return this.http.get<any>(
      `${this.charteredBikeBaseUrl}/history/stations`
    ).pipe(
      map(response => response.data || response || []),
      catchError(error => {
        console.error('Error fetching station names:', error);
        return of([]);
      })
    );
  }

  /**
   * Get historical data for a specific station
   * @param stationName Station name
   * @param startDate Start date in format: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss
   * @param endDate End date in format: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss
   */
  getCharteredBikeStationHistory(
    stationName: string,
    startDate: string,
    endDate: string
  ): Observable<CharteredBikeStationHistoryDto[]> {
    return this.http.get<CharteredBikeHistoryResponse>(
      `${this.charteredBikeBaseUrl}/history/${encodeURIComponent(stationName)}`,
      { params: { start: startDate, end: endDate } }
    ).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error fetching station history:', error);
        return of([]);
      })
    );
  }

  /**
   * Get historical data for all stations
   * @param startDate Start date
   * @param endDate End date
   */
  getCharteredBikeAllHistory(startDate: string, endDate: string): Observable<CharteredBikeStationHistoryDto[]> {
    return this.http.get<CharteredBikeHistoryResponse>(
      `${this.charteredBikeBaseUrl}/history/all`,
      { params: { start: startDate, end: endDate } }
    ).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error fetching all history:', error);
        return of([]);
      })
    );
  }

  /**
   * Get recent historical data for a station (last N days)
   * @param stationName Station name
   * @param days Number of days to retrieve
   */
  getCharteredBikeStationRecentHistory(stationName: string, days: number): Observable<CharteredBikeStationHistoryDto[]> {
    return this.http.get<CharteredBikeHistoryResponse>(
      `${this.charteredBikeBaseUrl}/history/${encodeURIComponent(stationName)}/recent`,
      { params: { days: days.toString() } }
    ).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error fetching recent history:', error);
        return of([]);
      })
    );
  }

  /**
   * Get statistics for a station
   * @param stationName Station name
   * @param startDate Start date
   * @param endDate End date
   */
  getCharteredBikeStationStats(
    stationName: string,
    startDate: string,
    endDate: string
  ): Observable<CharteredBikeStationStatsDto[]> {
    return this.http.get<CharteredBikeStatsResponse>(
      `${this.charteredBikeBaseUrl}/history/${encodeURIComponent(stationName)}/stats`,
      { params: { start: startDate, end: endDate } }
    ).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error fetching station stats:', error);
        return of([]);
      })
    );
  }

  /**
   * Get last week report
   */
  getCharteredBikeLastWeekReport(): Observable<CharteredBikeReportDto[]> {
    return this.http.get<CharteredBikeReportResponse>(
      `${this.charteredBikeBaseUrl}/reports/last-week`
    ).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error fetching last week report:', error);
        return of([]);
      })
    );
  }

  /**
   * Get last month report
   */
  getCharteredBikeLastMonthReport(): Observable<CharteredBikeReportDto[]> {
    return this.http.get<CharteredBikeReportResponse>(
      `${this.charteredBikeBaseUrl}/reports/last-month`
    ).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error fetching last month report:', error);
        return of([]);
      })
    );
  }

  /**
   * Manually trigger sync with Chartered Bike API
   */
  syncCharteredBikeData(): Observable<any> {
    return this.http.post(`${this.charteredBikeBaseUrl}/sync`, {}).pipe(
      catchError(error => {
        console.error('Error syncing chartered bike data:', error);
        return of({ success: false, message: 'Sync failed' });
      })
    );
  }
}

