import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';

// ============================================
// LOGIN ENDPOINTS (PUBLIC - NO TOKEN INJECTION)
// ============================================
const LOGIN_ROUTES = [
  '/api/auth/login'
];

// ============================================
// PROTECTED ROUTES (require an auth token)
// ============================================
const PROTECTED_ROUTES = [
  '/api/inventory',
  '/api/devices',
  '/api/admin',
  '/api/maintenance',
  '/api/history',
  '/api/dashboard',
  '/api/excel-upload',
  '/api/report/',
  '/api/weighbridge/',
  '/api/timeframe/',
  '/api/w_',
  '/api/smc',
  '/api/chartered-bike',
  '/api/incidents', // include incidents under protected list
  '/api/attachments',
  '/api/tasks',
  '/api/locations',
  '/api/approach-roads',
  '/api/device-types',
   '/api/tramm',
   // Traffic/Video Management Dashboard
   '/api/servers',
   '/api/channels',
   '/api/events',
  '/api/sdnet-monitor',
];

function isLoginRoute(url: string): boolean {
  return LOGIN_ROUTES.some(route => url.includes(route));
}

function isProtectedRoute(url: string): boolean {
  try {
    // Resolve the URL relative to the current origin so both absolute and relative URLs work
    const req = new URL(url, window.location.origin);

    // The Angular dev server and backend commonly use different origins.
    // Only trust the configured backend origin, never arbitrary external APIs.
    const backendOrigin = new URL(environment.apiBaseUrl, window.location.origin).origin;
    if (req.origin !== window.location.origin && req.origin !== backendOrigin) return false;

    // Match against the pathname to avoid false matches on external hosts
    return PROTECTED_ROUTES.some(route => req.pathname.startsWith(route));
  } catch (e) {
    // Fallback: for unexpected formats, only treat relative /api/ paths as protected
    return url.startsWith('/api/') && PROTECTED_ROUTES.some(route => url.startsWith(route));
  }
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (authService.isAuthenticated()) authService.recordActivity();

  if (isLoginRoute(req.url)) {
    return next(req).pipe(
      catchError((error) => {
        if (error?.status === 401 && authService.isAuthenticated()) authService.expireSession();
        return throwError(() => error);
      })
    );
  }

  // ============================================
  // PROTECTED REQUESTS - attach currently authenticated user's token
  // ============================================
  if (isProtectedRoute(req.url)) {
    authService.recordActivity();
    // Only attach token if user is authenticated
    if (!authService.isAuthenticated()) {
      console.warn('[AUTH] Request to protected route without token:', req.url);
      return next(req);
    }

    const token = authService.getToken();
    if (token) {
      const authenticatedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(authenticatedRequest).pipe(
        catchError((error) => {
          if (error?.status === 401) authService.expireSession();
          return throwError(() => error);
        })
      );
    }

    return next(req).pipe(
      catchError((error) => {
        if (error?.status === 401 && authService.isAuthenticated()) authService.expireSession();
        return throwError(() => error);
      })
    );
  }

  return next(req).pipe(
    catchError((error) => {
      if (error?.status === 401 && authService.isAuthenticated()) authService.expireSession();
      return throwError(() => error);
    })
  );
};
