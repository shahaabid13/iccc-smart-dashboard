import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Interfaces based on Data Contract
export interface OverviewResponse {
  totalEvents: number;
  uniqueVehicles: number;
  statusCounts: StatusCount[];
}

export interface StatusCount {
  name: string;
  count: number;
}

export interface TrendData {
  time: string;
  count: number;
}

export interface LocationData {
  junctionName?: string;
  name?: string;
  count: number;
}

export interface VehicleColor {
  name: string;
  count: number;
}

export interface SpeedData {
  name: string;
  count: number;
}

export interface RepeatOffender {
  plateNumber: string;
  count: number;
  // Note: lastSeen is NOT in contract, remove if not available
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnprService {
  private baseUrl = '/api/analytics';

  constructor(private http: HttpClient) { }

  // Helper method to build params
  private buildParams(startDate: string, endDate: string, additionalParams?: any): HttpParams {
    let params = new HttpParams()
      .set('start', startDate)
      .set('end', endDate);

    if (additionalParams) {
      Object.keys(additionalParams).forEach(key => {
        if (additionalParams[key] !== undefined && additionalParams[key] !== null) {
          params = params.set(key, additionalParams[key].toString());
        }
      });
    }

    return params;
  }

  /**
   * Get analytics overview
   */
  getOverview(startDate: string, endDate: string): Observable<OverviewResponse> {
    const params = this.buildParams(startDate, endDate);
    return this.http.get<OverviewResponse>(`${this.baseUrl}/overview`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get hourly trend data
   */
  getHourlyTrend(startDate: string, endDate: string): Observable<TrendData[]> {
    const params = this.buildParams(startDate, endDate);
    return this.http.get<TrendData[]>(`${this.baseUrl}/trend/hourly`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get daily trend data
   */
  getDailyTrend(startDate: string, endDate: string): Observable<TrendData[]> {
    const params = this.buildParams(startDate, endDate);
    return this.http.get<TrendData[]>(`${this.baseUrl}/trend/daily`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get top junctions
   */
  getTopJunctions(startDate: string, endDate: string, limit?: number): Observable<LocationData[]> {
    const params = this.buildParams(startDate, endDate, { limit });
    return this.http.get<LocationData[]>(`${this.baseUrl}/junctions/top`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get top cameras
   */
  getTopCameras(startDate: string, endDate: string, limit?: number): Observable<LocationData[]> {
    const params = this.buildParams(startDate, endDate, { limit });
    return this.http.get<LocationData[]>(`${this.baseUrl}/cameras/top`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get repeat offenders
   */
  getRepeatOffenders(startDate: string, endDate: string, minViolations: number = 3): Observable<RepeatOffender[]> {
    const params = this.buildParams(startDate, endDate, { min: minViolations });
    return this.http.get<RepeatOffender[]>(`${this.baseUrl}/vehicles/repeat`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get violations by vehicle color
   */
  getViolationsByColor(startDate: string, endDate: string): Observable<VehicleColor[]> {
    const params = this.buildParams(startDate, endDate);
    return this.http.get<VehicleColor[]>(`${this.baseUrl}/vehicles/colors`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get speed distribution data
   */
  getSpeedDistribution(startDate: string, endDate: string): Observable<SpeedData[]> {
    const params = this.buildParams(startDate, endDate);
    return this.http.get<SpeedData[]>(`${this.baseUrl}/vehicles/speed`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.status === 0) {
      errorMessage = 'Network error: Unable to connect to the server';
    } else if (error.status === 400) {
      errorMessage = 'Invalid request: Please check your parameters';
    } else if (error.status === 500) {
      errorMessage = 'Server error: Please try again later';
    } else if (error.error?.error) {
      errorMessage = error.error.error;
    }
    
    console.error('API Error:', error);
    throw new Error(errorMessage);
  }
}