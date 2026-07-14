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
// ADMIN PROTECTED ROUTES (NEED ADMIN TOKEN)
// ============================================
const ADMIN_PROTECTED_ROUTES = [
  '/api/',
  '/api/auth/',
  '/api/inventory',
  '/api/devices',
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
];

function isLoginRoute(url: string): boolean {
  return LOGIN_ROUTES.some(route => url.includes(route));
}

function isAdminProtectedRoute(url: string): boolean {
  try {
    // Resolve the URL relative to the current origin so both absolute and relative URLs work
    const req = new URL(url, window.location.origin);

    // Only attach tokens for same-origin requests to our backend
    if (req.origin !== window.location.origin) return false;

    // Match against the pathname to avoid false matches on external hosts
    return ADMIN_PROTECTED_ROUTES.some(route => req.pathname.startsWith(route));
  } catch (e) {
    // Fallback: for unexpected formats, only treat relative /api/ paths as protected
    return url.startsWith('/api/') && ADMIN_PROTECTED_ROUTES.some(route => url.startsWith(route));
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
  // ADMIN PROTECTED REQUESTS
  // ============================================
  if (isAdminProtectedRoute(req.url)) {
    const adminToken = authService.getToken();
    if (adminToken) {
      console.log('[AUTH] Attaching Admin token for:', req.url);
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${adminToken}`)
      });
      return next(cloned);
    }
    console.warn('[AUTH] No Admin token found for:', req.url);
    return next(req);
  }

  // ============================================
  // PUBLIC ROUTES - NO TOKEN
  // ============================================
  console.log('[AUTH] Public route - no token:', req.url);
  return next(req);
};
