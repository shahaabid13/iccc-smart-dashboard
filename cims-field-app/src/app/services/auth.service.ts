import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { environment, getApiBaseUrl } from '../../environments/environment';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

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
    this.clearToken();
    await this.router.navigate(['/login']);
  }

  async getToken(): Promise<string | null> {
    try {
      const browserToken = typeof window !== 'undefined' ? localStorage.getItem('token') || localStorage.getItem('auth_token') : null;
      if (browserToken) {
        return browserToken;
      }

      const { value } = await Preferences.get({ key: 'auth_token' });
      if (value) {
        localStorage.setItem('token', value);
        localStorage.setItem('auth_token', value);
      }
      return value ?? null;
    } catch {
      return typeof window !== 'undefined' ? localStorage.getItem('token') || localStorage.getItem('auth_token') : null;
    }
  }

  private async persistToken(token: string, username?: string): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('auth_token', token);
      if (username) {
        localStorage.setItem('username', username);
      }

      try {
        const parts = token.split('.');
        if (parts.length >= 2) {
          const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
          const decoded = JSON.parse(atob(payload));
          const resolvedUsername = decoded.username || decoded.preferred_username || decoded.sub;
          if (resolvedUsername) {
            localStorage.setItem('username', resolvedUsername);
          }
        }
      } catch {
        // Ignore decode errors; username remains as entered.
      }
    }

    try {
      await Preferences.set({ key: 'auth_token', value: token });
    } catch {
      // Native storage may be unavailable in browser builds; browser localStorage is the fallback.
    }
  }

  private clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('currentUser');
    }

    void Preferences.remove({ key: 'auth_token' });
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
