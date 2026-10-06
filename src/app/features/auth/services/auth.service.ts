import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoginRequest, LoginResponse, AuthUser, ApiResponse } from '../../../shared/models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiBaseUrl}/api/auth`;
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  /**
   * Login with username and password
   */
  login(username: string, password: string): Observable<ApiResponse<LoginResponse>> {
    const request: LoginRequest = { username, password };

    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/login`, request).pipe(
      tap((response) => {
        if (response.data?.token) {
          this.setToken(response.data.token);
          this.setCurrentUser({
            id: username,
            username,
            roles: []
          });
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }

  /**
   * Logout user
   */
  logout(): void {
    this.clearAuth();
    this.currentUserSubject.next(null);
  }

  /**
   * Get current logged-in user
   */
  getCurrentUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Get stored JWT token
   */
  getToken(): string | null {
    const config = environment.trafficDashboard.auth;
    return sessionStorage.getItem(config.tokenStorageKey);
  }

  /**
   * Store JWT token
   */
  private setToken(token: string): void {
    const config = environment.trafficDashboard.auth;
    sessionStorage.setItem(config.tokenStorageKey, token);
  }

  /**
   * Store user information
   */
  private setCurrentUser(user: AuthUser): void {
    const config = environment.trafficDashboard.auth;
    sessionStorage.setItem(config.userStorageKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  /**
  * Load the user stored by this browser tab.
   */
  private loadStoredUser(): void {
    const config = environment.trafficDashboard.auth;
    const stored = sessionStorage.getItem(config.userStorageKey);
    if (stored) {
      try {
        const user: AuthUser = JSON.parse(stored);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
      }
    }
  }

  /**
   * Clear authentication data
   */
  private clearAuth(): void {
    const config = environment.trafficDashboard.auth;
    sessionStorage.removeItem(config.tokenStorageKey);
    sessionStorage.removeItem(config.userStorageKey);
    sessionStorage.removeItem(config.tokenStorageKey);
  }
}
