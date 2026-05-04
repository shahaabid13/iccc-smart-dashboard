import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  CharteredBikeLoginResponse,
  CharteredBikeLoginData,
  CharteredBikeStationResponse,
  ApiErrorResponse,
} from '../models/chartered-bike';

@Injectable({ providedIn: 'root' })
export class CharteredBikeService {
  private readonly baseUrl = 'https://api.charteredbike.in/api/v1';
  private readonly tokenKey = 'chartered_bike_token';
  private readonly loginDataKey = 'chartered_bike_login';

  // BehaviorSubjects for reactive state management
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isTokenValid());
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkTokenOnInit();
  }

  /**
   * Check if token is valid on service initialization
   */
  private checkTokenOnInit(): void {
    const token = this.getToken();
    const loginData = this.getLoginData();
    if (token && loginData) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  /**
   * Authenticate with Chartered Bike API
   * Credentials are hardcoded as per API spec (SSCL / 209107)
   */
  login(): Observable<CharteredBikeLoginResponse> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    const params = new HttpParams()
      .set('userName', 'SSCL')
      .set('password', '209107');

    return this.http
      .get<CharteredBikeLoginResponse>(`${this.baseUrl}/auth/admin-login`, { params })
      .pipe(
        tap((response) => {
          if (response.status === 200 && response.data?.token) {
            this.storeToken(response.data.token);
            this.storeLoginData(response.data);
            this.isAuthenticatedSubject.next(true);
            this.loadingSubject.next(false);
          }
        }),
        catchError((error) => {
          this.handleError('Authentication failed. Please try again.', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Fetch all bike stations from the API
   * Requires valid JWT token
   */
  getStations(): Observable<CharteredBikeStationResponse> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    const token = this.getToken();
    if (!token) {
      this.handleError('Not authenticated. Please login first.');
      return throwError(() => new Error('No token available'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const params = new HttpParams()
      .set('domain', 'asia')
      .set('companyregionid', '16');

    return this.http
      .get<CharteredBikeStationResponse>(
        `${this.baseUrl}/stations/show-stations-on-map/open`,
        { headers, params }
      )
      .pipe(
        retry(1), // Retry once on failure
        tap((response) => {
          if (response.status === 200) {
            this.loadingSubject.next(false);
          }
        }),
        catchError((error) => {
          // If 401, token might be expired
          if (error.status === 401) {
            this.logout();
            this.handleError('Session expired. Please login again.');
          } else {
            this.handleError('Failed to fetch stations. Please try again.', error);
          }
          this.loadingSubject.next(false);
          return throwError(() => error);
        })
      );
  }

  /**
   * Store JWT token in localStorage
   */
  private storeToken(token: string): void {
    try {
      localStorage.setItem(this.tokenKey, token);
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  }

  /**
   * Retrieve JWT token from localStorage
   */
  getToken(): string | null {
    try {
      return localStorage.getItem(this.tokenKey);
    } catch (error) {
      console.error('Failed to retrieve token:', error);
      return null;
    }
  }

  /**
   * Store login data (user info) in localStorage
   */
  private storeLoginData(data: CharteredBikeLoginData): void {
    try {
      localStorage.setItem(this.loginDataKey, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to store login data:', error);
    }
  }

  /**
   * Retrieve login data from localStorage
   */
  getLoginData(): CharteredBikeLoginData | null {
    try {
      const data = localStorage.getItem(this.loginDataKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to retrieve login data:', error);
      return null;
    }
  }

  /**
   * Check if token exists and is valid
   */
  private isTokenValid(): boolean {
    return !!this.getToken();
  }

  /**
   * Logout: Clear all stored data
   */
  logout(): void {
    try {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.loginDataKey);
      this.isAuthenticatedSubject.next(false);
      this.errorSubject.next(null);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }

  /**
   * Handle errors and emit to error subject
   */
  private handleError(message: string, error?: any): void {
    console.error(message, error);
    this.errorSubject.next(message);
    this.loadingSubject.next(false);
  }

  /**
   * Clear error message
   */
  clearError(): void {
    this.errorSubject.next(null);
  }

  /**
   * Get current authentication status synchronously
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
