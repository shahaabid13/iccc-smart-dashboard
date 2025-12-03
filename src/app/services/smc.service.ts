import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SmcService {
  getMonthlyNetTrend: any;
  getMonthlyGrossWeight: any;
  getMonthlyGrossTrend(wbId: string) {
    throw new Error('Method not implemented.');
  }
  // Updated API base URL for the new endpoint
  private readonly baseUrl = 'http://localhost:8080/api/weighbridge';

  constructor(private http: HttpClient) {}

  /**
   * Get all weighbridge data for a specific WB ID
   */
  getAllWeighbridgeData(wbId: string): Observable<any[]> {
    const url = `${this.baseUrl}/report/data/all/${wbId}`;
    
    return this.http.get<any[]>(url).pipe(
      map(response => {
        // Handle different response formats
        if (Array.isArray(response)) {
          return response;
        } else if (response && typeof response === 'object') {
          // If it's a single object, wrap in array
          return [response];
        } else {
          // If response format is unexpected, return empty array
          console.warn('Unexpected API response format:', response);
          return [];
        }
      }),
      catchError(error => {
        console.error('API Error:', error);
        // Return fallback data for development
        return of(this.getFallbackData());
      })
    );
  }
// Add these methods to your SmcService class

getNetTrend(wbId: string, startDate: string, endDate: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/report/trend/net/${wbId}`).pipe(
    map(data => {
      // Transform backend response to chart-friendly format
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

getGrossTrend(wbId: string, startDate: string, endDate: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/report/trend/gross/${wbId}`).pipe(
    map(data => {
      // Transform backend response to chart-friendly format
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

getLast24Trend(wbId: string): Observable<any[]> {
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
  return this.http.get<any>(`${this.baseUrl}/report/summary/day`, { params }).pipe(
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
      console.error('Error fetching summary:', error);
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
}