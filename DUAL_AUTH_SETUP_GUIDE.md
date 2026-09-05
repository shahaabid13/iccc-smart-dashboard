# Dual Authentication Setup Guide

**Project:** ICCC Smart Dashboard  
**Purpose:** Implement separate authentication contexts for Inventory Admin and Parkadda Admin  
**Status:** Complete

---

## Architecture Overview

The application now supports **two independent authentication systems**:

```
┌─────────────────────────────────────────────────────────────┐
│                 ICCC Smart Dashboard                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────┐    ┌──────────────────────┐      │
│  │  INVENTORY ADMIN     │    │   PARKADDA ADMIN     │      │
│  │  LOGIN (/login)      │    │ LOGIN (/parkadda/    │      │
│  │                      │    │       login)         │      │
│  ├──────────────────────┤    ├──────────────────────┤      │
│  │  Token: admin_token  │    │  Token:              │      │
│  │  Storage: localStorage│    │  parkadda_token      │      │
│  │  Key: token          │    │  Storage: localStorage│      │
│  │                      │    │  Key: parkadda_token │      │
│  ├──────────────────────┤    ├──────────────────────┤      │
│  │ Protected Routes:    │    │ Protected Routes:    │      │
│  │ • /inventory         │    │ • /parkadda/         │      │
│  │ • /devices           │    │   dashboard          │      │
│  │ • /admin/dashboard   │    │ • /parkadda/parking- │      │
│  │ • /admin/items       │    │   list               │      │
│  │ • /maintenance       │    │ • /parkadda/vehicle- │      │
│  │ • /smc               │    │   reports            │      │
│  │ • /anpr              │    │ • /parkadda/         │      │
│  │                      │    │   transaction-       │      │
│  │ Guard: AdminGuard    │    │   reports            │      │
│  │                      │    │                      │      │
│  │ Backend: localhost   │    │ Guard: ParkaddaGuard │      │
│  │           :8080      │    │                      │      │
│  │                      │    │ Backend: Parkadda    │      │
│  │                      │    │ (https://www.admin   │      │
│  │                      │    │  .parkadda.com)      │      │
│  └──────────────────────┘    └──────────────────────┘      │
│          ▼                              ▼                   │
│   HTTP requests with              HTTP requests with      │
│   admin_token                     parkadda_token          │
│          │                              │                  │
└──────────┼──────────────────────────────┼──────────────────┘
           │                              │
      ┌────▼────────────────────────────────▼────┐
      │    HTTP Interceptor                      │
      ├──────────────────────────────────────────┤
      │ • Checks URL against route patterns      │
      │ • Attaches appropriate token             │
      │ • Prevents cross-authentication issues   │
      └──────────────────────────────────────────┘
           │                              │
      ┌────▼────┐                  ┌────▼────────────────┐
      │ Local   │                  │ Parkadda External   │
      │ Backend │                  │ API                 │
      │ :8080   │                  │ (https://www.       │
      │         │                  │  admin.parkadda.com)│
      └─────────┘                  └─────────────────────┘
```

---

## Authentication Flow

### 1. Inventory Admin Login

```
User enters credentials (username, password)
           ↓
LoginComponent calls AuthService.login()
           ↓
HTTP POST /api/auth/login
           ↓
Interceptor: isLoginRoute() = true
✓ NO TOKEN ATTACHED (public endpoint)
           ↓
Backend validates credentials
           ↓
Returns access_token
           ↓
AuthService stores token:
- localStorage.setItem('token', access_token)
- authToken$ BehaviorSubject updated
           ↓
User redirected to /inventory
           ↓
AdminGuard checks: AuthService.isLoggedIn() ✓
```

### 2. Parkadda Admin Login

```
User navigates to /parkadda/login
           ↓
ParkaddaLoginComponent renders
           ↓
User enters mobile & password
           ↓
Component calls ParkaddaAuthService.adminLogin()
           ↓
HTTP POST /api/parkadda/user/admin-login/
           ↓
Proxy intercepts: /api/parkadda/* → pathRewrite
Routes to: https://www.admin.parkadda.com/api/user/admin-login/
           ↓
Interceptor: isParkaddaProtectedRoute() = false (login route)
Interceptor: isLoginRoute() = true
✓ NO TOKEN ATTACHED (login endpoint excluded)
           ↓
Parkadda backend validates credentials
           ↓
Returns access_token
           ↓
ParkaddaAuthService stores token:
- localStorage.setItem('parkadda_token', access_token)
- parkaddaToken$ BehaviorSubject updated
           ↓
User redirected to /parkadda/dashboard
           ↓
ParkaddaGuard checks: ParkaddaAuthService.isParkaddaLoggedIn() ✓
```

### 3. Protected Route Access (Inventory)

```
User clicks on /admin/dashboard
           ↓
AdminGuard.canActivate() checks:
AuthService.isLoggedIn() ?
           ↓
If ✓: Allow access
If ✗: Redirect to /login
           ↓
Component loads, calls DevicesService.getDevices()
           ↓
HTTP GET /api/devices
           ↓
Interceptor: isAdminProtectedRoute() = true
Gets adminToken = AuthService.getToken()
Attaches header: Authorization: Bearer {admin_token}
           ↓
Proxy routes to: http://localhost:8080/api/devices
           ↓
Backend validates token, returns data
```

### 4. Protected Route Access (Parkadda)

```
User (with parkadda_token) navigates to /parkadda/vehicle-reports
           ↓
ParkaddaGuard.canActivate() checks:
ParkaddaAuthService.isParkaddaLoggedIn() ?
           ↓
If ✓: Allow access
If ✗: Redirect to /parkadda/login
           ↓
Component loads, calls ParkaddaService.searchAdminVehicleInReports()
           ↓
HTTP POST /api/parkadda/trooper/searchAdminVehicleInReports
           ↓
Interceptor: isParkaddaProtectedRoute() = true
Gets parkaddaToken = ParkaddaAuthService.getParkaddaToken()
Attaches header: Authorization: Bearer {parkadda_token}
           ↓
Proxy pathRewrite: /api/parkadda/* → /
Routes to: https://www.admin.parkadda.com/api/trooper/searchAdminVehicleInReports
           ↓
Parkadda backend validates parkadda_token, returns report data
```

---

## Key Configuration Files

### 1. `src/app/interceptors/auth.interceptor.ts`

**Purpose:** Route requests to appropriate token and authentication context

**Key Logic:**
```typescript
// STEP 1: Check if this is a LOGIN endpoint
if (isLoginRoute(req.url)) {
  // NO TOKEN - let it pass through
  return next(req);
}

// STEP 2: Check if this is PARKADDA PROTECTED
if (isParkaddaProtectedRoute(req.url)) {
  // Attach parkadda_token
  const token = parkaddaAuthService.getParkaddaToken();
  return next(req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  }));
}

// STEP 3: Check if this is ADMIN PROTECTED
if (isAdminProtectedRoute(req.url)) {
  // Attach admin_token
  const token = authService.getToken();
  return next(req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  }));
}

// STEP 4: PUBLIC routes - no token
return next(req);
```

**Login Routes (No Token):**
- `/api/auth/login` - Inventory admin login
- `/api/parkadda/user/admin-login` - Parkadda admin login

**Parkadda Protected Routes (Parkadda Token):**
- `/api/parkadda/*` - All Parkadda API endpoints
- `/api/user/*` - Parkadda user endpoints

**Admin Protected Routes (Admin Token):**
- `/api/auth/*` - Auth-related endpoints
- `/api/inventory` - Inventory management
- `/api/devices` - Device management
- `/api/report/` - Report endpoints
- `/api/weighbridge/` - Weighbridge/SMC endpoints
- etc.

### 2. `proxy.conf.json`

**Purpose:** Route API calls through proxy during development

**Parkadda Proxy:**
```json
{
  "/api/parkadda/": {
    "target": "https://www.admin.parkadda.com/api",
    "pathRewrite": { "^/api/parkadda/": "/" },
    "changeOrigin": true,
    "secure": true
  }
}
```

**How it works:**
- Request: `POST http://localhost:4200/api/parkadda/user/admin-login/`
- Proxy intercepts `/api/parkadda/` pattern
- Applies pathRewrite: `/user/admin-login/` remains
- Routes to: `https://www.admin.parkadda.com/api/user/admin-login/`

**Admin Backend Proxy:**
```json
{
  "/api/auth/": { "target": "http://localhost:8080" },
  "/api/devices/": { "target": "http://localhost:8080" },
  ...
}
```

### 3. `src/app/config/parkadda.config.ts`

**Purpose:** Centralized configuration for Parkadda API

```typescript
export const PARKADDA_CONFIG = {
  baseUrl: 'http://localhost:8081/api',  // Development URL
  auth: {
    adminLogin: '/user/admin-login/'
  },
  parking: {
    getParkingListForHost: '/parking/getParkingListForHost/',
    getRangersByParking: '/trooper/getRangersByParking',
    // ... other endpoints
  }
};
```

### 4. `src/environments/environment.ts`

**Purpose:** Environment-specific URLs

```typescript
export const environment = {
  production: false,
  apiUrl: '/api',
  parkaddaApiUrl: '/api/parkadda',
  swmApiUrl: '/api/weighbridge'
};
```

---

## Services

### AuthService (Inventory Admin)

**Location:** `src/app/services/auth.service.ts`

**Manages:**
- Inventory admin login/logout
- Admin token storage & retrieval
- Admin authentication state

**Key Methods:**
```typescript
login(username: string, password: string): Observable<any>
logout(): void
getToken(): string | null
isLoggedIn(): boolean
```

**Storage:**
- Key: `token`
- Type: Bearer token string
- Context: Inventory admin only

### ParkaddaAuthService (Parkadda Admin)

**Location:** `src/app/services/parkadda-auth.service.ts`

**Manages:**
- Parkadda admin login/logout
- Parkadda token storage & retrieval
- Parkadda authentication state

**Key Methods:**
```typescript
adminLogin(mobile: string, password: string): Observable<ParkaddaLoginResponse>
logout(): void
getParkaddaToken(): string | null
isParkaddaLoggedIn(): boolean
getParkaddaMobile(): string | null
```

**Storage:**
- Key: `parkadda_token`
- Type: Bearer token string
- Context: Parkadda admin only

---

## Guards

### AdminGuard

**Location:** `src/app/guards/admin.guard.ts`

**Purpose:** Protect inventory admin routes

**Logic:**
```typescript
canActivate(): boolean {
  if (authService.isLoggedIn()) {
    return true;  // Allow access
  } else {
    router.navigate(['/login']);
    return false;
  }
}
```

**Protected Routes:**
- `/admin/dashboard`
- `/admin/items`
- `/admin/excel-upload`
- etc.

### ParkaddaGuard

**Location:** `src/app/guards/parkadda.guard.ts`

**Purpose:** Protect Parkadda admin routes

**Logic:**
```typescript
canActivate(): boolean {
  if (parkaddaAuthService.isParkaddaLoggedIn()) {
    return true;  // Allow access
  } else {
    router.navigate(['/parkadda/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
```

**Protected Routes:**
- `/parkadda/dashboard`
- `/parkadda/parking-list`
- `/parkadda/vehicle-reports`
- `/parkadda/transaction-reports`

---

## Token Storage

### Inventory Admin Token

```
localStorage.setItem('token', access_token);
localStorage.getItem('token');
localStorage.removeItem('token');  // On logout
```

### Parkadda Admin Token

```
localStorage.setItem('parkadda_token', access_token);
localStorage.getItem('parkadda_token');
localStorage.removeItem('parkadda_token');  // On logout
```

### Additional Parkadda Storage

```
localStorage.setItem('parkadda_mobile', mobile_number);
localStorage.setItem('parkadda_last_login', timestamp);
```

---

## Troubleshooting

### Issue: Parkadda Login Returns HTML

**Cause:** Proxy is routing to the UI instead of the API

**Solution:** Ensure proxy configuration has correct `pathRewrite`:
```json
{
  "/api/parkadda/": {
    "target": "https://www.admin.parkadda.com/api",
    "pathRewrite": { "^/api/parkadda/": "/" }
  }
}
```

### Issue: Admin Token Attached to Parkadda Requests

**Cause:** Login routes not properly excluded from token injection

**Solution:** Check `isLoginRoute()` in interceptor includes all login endpoints:
```typescript
const LOGIN_ROUTES = [
  '/api/auth/login',
  '/api/parkadda/user/admin-login',
  '/api/admin-login/'
];
```

### Issue: 401 Unauthorized on Parkadda Requests

**Cause:** Parkadda token not found or admin token attached instead

**Solution:**
1. Verify user completed Parkadda login
2. Check `localStorage.getItem('parkadda_token')` exists
3. Verify token is valid and not expired
4. Check interceptor attaches parkadda_token, not admin token

### Issue: Inventory Routes Return 401

**Cause:** Admin token not attached or Parkadda token attached instead

**Solution:**
1. Verify user completed admin login
2. Check `localStorage.getItem('token')` exists
3. Verify token is valid and not expired
4. Check interceptor attaches admin token for admin routes

---

## Development Workflow

### 1. Start Development Server

```bash
ng serve --proxy-config proxy.conf.json
```

Browser: `http://localhost:4200`

### 2. Login as Inventory Admin

- Navigate to `/login`
- Enter inventory admin credentials
- Token stored: `localStorage.token`
- Access inventory features

### 3. Login as Parkadda Admin

- Navigate to `/parkadda/login`
- Enter Parkadda mobile & password
- Token stored: `localStorage.parkadda_token`
- Access Parkadda features

### 4. Test Multiple Logins

- Login as inventory admin → access inventory
- Navigate to `/parkadda/login` → login with different credentials
- Both tokens maintained separately
- Can switch between contexts

---

## Security Considerations

✅ **Implemented:**
- Separate token storage for each context
- Token-specific interceptor routing
- Login endpoints excluded from token injection
- CORS headers properly configured in proxy
- Tokens only attached to appropriate API calls

⚠️ **Best Practices:**
- Use HTTPS in production
- Set token expiration times
- Implement token refresh logic
- Clear tokens on logout
- Validate tokens on backend
- Use HTTP-only cookies if possible (instead of localStorage)

---

## Production Deployment

### Environment Configuration

**`src/environments/environment.prod.ts`:**
```typescript
export const environment = {
  production: true,
  apiUrl: '/api',  // Relative path - backend serves Angular app
  parkaddaApiUrl: '/api/parkadda',
  swmApiUrl: '/api/weighbridge'
};
```

### Backend API Routes

The backend should implement:

**Inventory Admin:**
- `POST /api/auth/login` - Authenticate inventory admin
- `GET /api/inventory/*` - Require admin token
- `GET /api/devices/*` - Require admin token
- etc.

**Parkadda:**
- Proxy route `/api/parkadda/*` to Parkadda external API
- Parkadda handles its own authentication

### Build & Deploy

```bash
# Production build
ng build --configuration production

# Output in: src/main/resources/static (for Spring Boot)

# Deploy backend JAR containing Angular app
```

---

## Summary

This dual authentication system allows:

✅ Two separate admin contexts (Inventory & Parkadda)  
✅ Independent token management  
✅ Proper route-based token injection  
✅ Automatic switching between authentication contexts  
✅ Clear separation of concerns  
✅ Scalable to additional authentication systems

Both admins can remain logged in simultaneously and access their respective features without interfering with each other's authentication state.
