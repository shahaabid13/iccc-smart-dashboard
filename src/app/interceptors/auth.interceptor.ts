import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

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
  '/api/tasks',
  '/api/locations',
  '/api/approach-roads',
  '/api/device-types'
];

function isLoginRoute(url: string): boolean {
  return LOGIN_ROUTES.some(route => url.includes(route));
}

function isProtectedRoute(url: string): boolean {
  try {
    // Resolve the URL relative to the current origin so both absolute and relative URLs work
    const req = new URL(url, window.location.origin);

    // Only attach tokens for same-origin requests to our backend
    if (req.origin !== window.location.origin) return false;

    // Match against the pathname to avoid false matches on external hosts
    return PROTECTED_ROUTES.some(route => req.pathname.startsWith(route));
  } catch (e) {
    // Fallback: for unexpected formats, only treat relative /api/ paths as protected
    return url.startsWith('/api/') && PROTECTED_ROUTES.some(route => url.startsWith(route));
  }
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("REQUEST URL =", req.url);

  const authService = inject(AuthService);

  if (isLoginRoute(req.url)) {
    console.log("LOGIN REQUEST DETECTED");
    return next(req);
  }

  // ============================================
  // PROTECTED REQUESTS - attach currently authenticated user's token
  // ============================================
  if (isProtectedRoute(req.url)) {
    // Only attach token if user is authenticated
    if (!authService.isAuthenticated()) {
      console.warn('[AUTH] Request to protected route without token:', req.url);
      return next(req);
    }

    const token = authService.getToken();
    const role = authService.getRole();
    if (token) {
      const label = role && role.toLowerCase() === 'admin' ? 'Admin' : 'User';
      console.log(`[AUTH] Attaching ${label} token for:`, req.url);
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(cloned);
    }

    console.warn('[AUTH] No token found for protected route:', req.url);
    return next(req);
  }

  // ============================================
  // PUBLIC ROUTES - NO TOKEN
  // ============================================
  console.log('[AUTH] Public route - no token:', req.url);
  return next(req);
};
