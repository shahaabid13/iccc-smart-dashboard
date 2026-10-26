import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { environment, getApiBaseUrl } from '../../environments/environment';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static readonly SESSION_INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;
  private inactivityTimer: ReturnType<typeof setTimeout> | null = null;
  private lastActivityAt = 0;
  private sessionActive = false;
  private expiryHandled = false;
  private readonly activityEvents = ['mousedown', 'mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
  private readonly activityHandler = () => this.recordActivity();

  constructor(private http: HttpClient, private router: Router) {
    if (typeof document !== 'undefined') {
      this.activityEvents.forEach(event => document.addEventListener(event, this.activityHandler, { passive: true }));
    }
    void this.getToken().then(token => {
      if (token) {
        this.sessionActive = true;
        this.recordActivity();
      }
    });
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const apiUrl = getApiBaseUrl();
    const loginUrl = `${apiUrl}/api/auth/login`;
    console.log('[AuthService] Attempting login for user:', username, 'at:', loginUrl);
    return this.http
      .post<LoginResponse>(loginUrl, {
        username,
        password
      })
      .pipe(
        tap(response => {
          console.log('[AuthService] Login successful, received token');
          this.expiryHandled = false;
        }),
        switchMap(response =>
          from(this.persistToken(response.token, username)).pipe(
            tap(() => {
              console.log('[AuthService] Token saved to browser and native storage');
            }),
            map(() => response)
          )
        )
      );
  }

  async logout(): Promise<void> {
    await this.clearToken();
    await this.router.navigate(['/login']);
  }

  async expireSession(): Promise<void> {
    if (this.expiryHandled) return;
    this.expiryHandled = true;
    await this.clearToken();
    await this.router.navigate(['/login'], { queryParams: { sessionExpired: 'true' } });
  }

  async getToken(): Promise<string | null> {
    try {
      if (this.isBrowser()) {
        const token = window.sessionStorage.getItem('token');
        if (token) this.sessionActive = true;
        return token;
      }
      const { value } = await Preferences.get({ key: 'auth_token' });
      if (value) this.sessionActive = true;
      return value ?? null;
    } catch {
      return this.isBrowser() ? window.sessionStorage.getItem('token') : null;
    }
  }

  private async persistToken(token: string, username?: string): Promise<void> {
    const session = this.decodeSessionClaims(token);
    const resolvedUsername = session.username || username;
    this.sessionActive = true;
    if (this.isBrowser()) {
      window.sessionStorage.setItem('token', token);
      if (resolvedUsername) window.sessionStorage.setItem('username', resolvedUsername);
      if (session.role) window.sessionStorage.setItem('role', session.role);
      if (session.permissions) window.sessionStorage.setItem('permissions', JSON.stringify(session.permissions));
    } else {
      await Preferences.set({ key: 'auth_token', value: token });
    }
    this.expiryHandled = false;
    this.recordActivity();
  }

  private async clearToken(): Promise<void> {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    this.inactivityTimer = null;
    this.lastActivityAt = 0;
    if (typeof window !== 'undefined') window.sessionStorage.clear();
    this.sessionActive = false;
    if (this.isBrowser()) {
      return;
    }
    await Preferences.remove({ key: 'auth_token' });
  }

  recordActivity(): void {
    if (!this.sessionActive) return;
    this.lastActivityAt = Date.now();
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      const remaining = AuthService.SESSION_INACTIVITY_TIMEOUT_MS - (Date.now() - this.lastActivityAt);
      if (remaining > 0) {
        this.inactivityTimer = setTimeout(() => void this.expireSession(), remaining);
      } else {
        void this.expireSession();
      }
    }, AuthService.SESSION_INACTIVITY_TIMEOUT_MS);
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !Capacitor.isNativePlatform();
  }

  private decodeSessionClaims(token: string): { username?: string; role?: string; permissions?: unknown } {
    try {
      const payload = token.split('.')[1];
      if (!payload) return {};
      const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(normalized));
      return {
        username: decoded.username || decoded.preferred_username || decoded.sub,
        role: decoded.role || decoded.authorities?.[0],
        permissions: decoded.permissions
      };
    } catch {
      return {};
    }
  }

  /**
   * Return a best-effort username extracted from the stored JWT or null.
   */
  async getUsername(): Promise<string | null> {
    try {
      const token = await this.getToken();
      if (!token) return null;
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const payload = parts[1];
      const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
      return json.username || json.preferred_username || json.sub || null;
    } catch (e) {
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }
}
