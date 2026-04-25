# Parkadda Module - Comprehensive Documentation

**Last Updated:** March 11, 2026  
**Project:** ICCC Smart Dashboard  
**Module:** Parkadda Integration

---

## Table of Contents
1. [Module Overview](#module-overview)
2. [Configuration Files](#configuration-files)
3. [Port Numbers & Connection Details](#port-numbers--connection-details)
4. [Module Structure](#module-structure)
5. [Services Architecture](#services-architecture)
6. [Authentication Flow](#authentication-flow)
7. [API Endpoints](#api-endpoints)
8. [Data Models](#data-models)
9. [Routing & Protection](#routing--protection)
10. [Interceptors & Guards](#interceptors--guards)
11. [Module Interactions](#module-interactions)

---

## Module Overview

The **Parkadda Module** is a parking management system integration within the ICCC Smart Dashboard. It provides:

- **Parking Location Management** - View and manage parking locations with rangers
- **Vehicle Reports** - Track vehicle entry/exit and booking reports
- **Transaction Reports** - Monitor cash, card, UPI, Fastag, and payment gateway transactions
- **Occupancy Management** - Track and reset parking occupancy
- **Pricing Management** - View vehicle types and pricing reports
- **Monthly Passes & Exemptions** - Manage exempt vehicles and passes

### Key Features
- **Token-Based Authentication** - Bearer token authentication with Parkadda API
- **Admin-Only Access** - Parkadda features require admin login
- **Real-time Data** - Reports pulled from Parkadda external API
- **Separated Auth Context** - Independent authentication from main dashboard

---

## Configuration Files

### 1. `src/app/config/parkadda.config.ts`

```typescript
/**
 * Parkadda API Configuration
 * Centralized configuration for Parkadda API integration
 */

export const PARKADDA_CONFIG = {
  // Base API URL for Parkadda
  baseUrl: 'http://localhost:8081/api',

  // Authentication endpoint
  auth: {
    adminLogin: '/user/admin-login/'
  },

  // Parking management endpoints
  parking: {
    getParkingListForHost: '/parking/getParkingListForHost/',
    getRangersByParking: '/trooper/getRangersByParking',
    getMasterParkingSizeData: '/trooper/getMasterParkingSizeData'
  },

  // Vehicle reports endpoints
  vehicleReports: {
    searchAdminVehicleInReports: '/trooper/searchAdminVehicleInReports',
    searchAdminVehicleOutReports: '/trooper/searchAdminVehicleOutReports',
    searchAdminVehicleReports: '/trooper/searchAdminVehicleReports',
    getAllBookingsReport: '/trooper/getAllBookingsReport'
  },

  // Transaction reports endpoints
  transactionReports: {
    getCashTransactions: '/trooper/getCashTransactions',
    getCardTransactions: '/trooper/getCardTransactions',
    getUPITransactions: '/trooper/getUPITransactions',
    getFastagTransactions: '/trooper/getFastagTransactions',
    getPaymentGatewayTransactions: '/trooper/getPaymentGatewayTransactions'
  },

  // Monthly passes & exemptions endpoints
  passes: {
    getMonthlyPassesForAdmin: '/trooper/getMonthlyPassesForAdmin',
    getExemptedVehicles: '/trooper/getExemptedVehicles'
  },

  // Occupancy endpoints
  occupancy: {
    getParkingOccupancy: '/trooper/getParkingOccupancy',
    resetParkingOccupancy: '/trooper/resetParkingOccupancy',
    resetVehicleTypeOccupancy: '/trooper/resetVehicleTypeOccupancy'
  },

  // Pricing endpoints
  pricing: {
    getVehicleTypesFromPricing: '/trooper/getVehicleTypesFromPricing',
    getAllPricingReport: '/trooper/getAllPricingReport',
    getPricingReport: '/trooper/getPricingReport'
  },

  // Storage keys for tokens and credentials
  storageKeys: {
    token: 'parkadda_token',
    mobile: 'parkadda_mobile',
    lastLoginTime: 'parkadda_last_login'
  },

  // Default pagination
  pagination: {
    defaultPage: 1,
    defaultPageSize: 10
  }
};
```

### 2. `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: '/api',
  parkaddaApiUrl: '/api/parkadda',
  swmApiUrl: '/api/weighbridge'
};
```

**Key Variables:**
- `production`: Indicates environment mode
- `apiUrl`: Base API endpoint (`/api`)
- `parkaddaApiUrl`: Parkadda API prefix (`/api/parkadda`)
- `swmApiUrl`: Weighbridge/SMC API prefix (`/api/weighbridge`)

### 3. `proxy.conf.json` (Root Directory)

```json
{
  "/api/user/": {
    "target": "https://www.admin.parkadda.com",
    "secure": true,
    "changeOrigin": true,
    "logLevel": "debug",
    "followRedirects": true
  },
  "/api/parkadda/": {
    "target": "https://www.admin.parkadda.com",
    "secure": true,
    "changeOrigin": true,
    "logLevel": "debug",
    "followRedirects": true
  },
  "/api/admin-login/": {
    "target": "https://www.admin.parkadda.com",
    "secure": true,
    "changeOrigin": true,
    "logLevel": "debug",
    "followRedirects": true
  },
  "/api/auth/": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/report/": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/weighbridge/": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/timeframe/": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/w_": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/locations/": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/devices/": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/inventory/": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/maintenance/": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/excel/": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/anpr/": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/roads/": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

**Proxy Configuration Details:**
- **Parkadda Routes** (`/api/user/`, `/api/parkadda/`, `/api/admin-login/`):
  - Target: `https://www.admin.parkadda.com` (external Parkadda API)
  - Secure: `true` (HTTPS)
  - Change Origin: `true` (modifies host header)

- **Other API Routes**:
  - Target: `http://localhost:8080` (local backend)
  - Secure: `false` (HTTP)

---

## Port Numbers & Connection Details

### External Connections

| Service | URL | Port | Protocol | Purpose |
|---------|-----|------|----------|---------|
| **Parkadda API** | `https://www.admin.parkadda.com` | 443 | HTTPS | Parkadda parking management system |
| **Local Backend** | `http://localhost:8080` | 8080 | HTTP | Main application backend (Auth, Reports, Inventory, etc.) |
| **Development Server** | `http://localhost:4200` | 4200 | HTTP | Angular dev server (ng serve) |

### Parkadda Configuration Details

**API Base URL:** `http://localhost:8081/api`  
**Proxy Target:** `https://www.admin.parkadda.com`

**Authentication:**
- **Endpoint:** `/api/user/admin-login/` or `/api/admin-login/`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "mobile": "10-digit-number",
    "password": "admin-password"
  }
  ```
- **Response:**
  ```json
  {
    "access_token": "Bearer token string",
    "token_type": "Bearer",
    "expires_in": 3600,
    "refresh_token": "optional-refresh-token"
  }
  ```

---

## Module Structure

```
src/app/
├── components/
│   ├── admin/
│   │   └── parkadda/
│   │       ├── analytics-dashboard/
│   │       │   └── analytics-dashboard.component.ts
│   │       ├── parking-list/
│   │       │   └── parking-list.component.ts
│   │       ├── vehicle-reports/
│   │       │   └── vehicle-reports.component.ts
│   │       └── transaction-reports/
│   │           └── transaction-reports.component.ts
│   └── auth/
│       └── parkadda-login/
│           └── parkadda-login.component.ts
├── config/
│   └── parkadda.config.ts
├── guards/
│   └── parkadda.guard.ts
├── interceptors/
│   └── parkadda.interceptor.ts
├── models/
│   ├── parkadda.models.ts
│   └── parkadda-models.ts
└── services/
    ├── parkadda-auth.service.ts
    └── parkadda.service.ts
```

---

## Services Architecture

### 1. ParkaddaAuthService

**Location:** `src/app/services/parkadda-auth.service.ts`

**Purpose:** Manages Parkadda authentication and token lifecycle

**Key Methods:**

```typescript
// Admin login - obtains Bearer token
adminLogin(mobile: string, password: string): Observable<ParkaddaLoginResponse>

// Check if user is logged in
isParkaddaLoggedIn(): boolean

// Get stored token
getParkaddaToken(): string | null

// Get stored mobile
getParkaddaMobile(): string | null

// Get stored username
getParkaddaUsername(): string | null

// Logout - clear stored tokens
logout(): void

// Validate token format
isValidParkaddaToken(token: string): boolean
```

**Token Storage:**
- **Key:** `parkadda_token` (localStorage)
- **Format:** Bearer token string
- **Lifecycle:** Stored on login, cleared on logout

### 2. ParkaddaService

**Location:** `src/app/services/parkadda.service.ts`

**Purpose:** API client for all Parkadda endpoints

**Dependencies:**
- `HttpClient` - HTTP requests
- `ParkaddaAuthService` - Token management

**Key Endpoints:**

#### Parking Management
```typescript
// Get all parking locations for the admin
getParkingList(): Observable<ParkingListResponse>

// Get rangers assigned to a parking
getRangersByParking(parkingTableId: number): Observable<Ranger[]>

// Get parking capacity data
getMasterParkingSizeData(parkingTableId: number): Observable<MasterParkingSizeData>
```

#### Vehicle Reports
```typescript
// Vehicle entry reports
searchAdminVehicleInReports(filters: ReportFilters): Observable<PaginatedResponse<VehicleInReport>>

// Vehicle exit reports
searchAdminVehicleOutReports(filters: ReportFilters): Observable<PaginatedResponse<VehicleOutReport>>

// All vehicle reports
searchAdminVehicleReports(filters: ReportFilters): Observable<PaginatedResponse<VehicleReport>>

// Booking reports
getAllBookingsReport(filters: ReportFilters): Observable<PaginatedResponse<BookingReport>>
```

#### Transaction Reports
```typescript
getCashTransactions(filters: ReportFilters): Observable<PaginatedResponse<CashTransaction>>
getCardTransactions(filters: ReportFilters): Observable<PaginatedResponse<CardTransaction>>
getUPITransactions(filters: ReportFilters): Observable<PaginatedResponse<UPITransaction>>
getFastagTransactions(filters: ReportFilters): Observable<PaginatedResponse<FastagTransaction>>
getPaymentGatewayTransactions(filters: ReportFilters): Observable<PaginatedResponse<PaymentGatewayTransaction>>
```

#### Passes & Exemptions
```typescript
getMonthlyPassesForAdmin(filters: ReportFilters): Observable<PaginatedResponse<MonthlyPass>>
getExemptedVehicles(filters: ReportFilters): Observable<PaginatedResponse<ExemptedVehicle>>
```

#### Occupancy Management
```typescript
getParkingOccupancy(parkingTableId: number): Observable<ParkingOccupancy>
resetParkingOccupancy(request: OccupancyResetRequest): Observable<any>
resetVehicleTypeOccupancy(request: VehicleTypeOccupancyResetRequest): Observable<any>
```

#### Pricing Management
```typescript
getVehicleTypesFromPricing(): Observable<VehicleType[]>
getAllPricingReport(filters: ReportFilters): Observable<PaginatedResponse<PricingReport>>
getPricingReport(filters: ReportFilters): Observable<PaginatedResponse<PricingReport>>
```

---

## Authentication Flow

### Login Flow Diagram

```
1. User navigates to /parkadda/login
   ↓
2. ParkaddaLoginComponent renders
   ↓
3. User enters mobile & password
   ↓
4. Component calls ParkaddaAuthService.adminLogin(mobile, password)
   ↓
5. Service validates inputs:
   - Trim whitespace
   - Remove non-digit characters from mobile
   - Validate 10-digit format
   ↓
6. HTTP POST to /api/user/admin-login/
   - Proxy routes to: https://www.admin.parkadda.com/user/admin-login/
   ↓
7. Backend returns access_token
   ↓
8. Token stored in localStorage with key: 'parkadda_token'
   ↓
9. User redirected to /parkadda/dashboard
   ↓
10. ParkaddaGuard checks token on protected routes
    - If valid: Access granted
    - If invalid: Redirect to /parkadda/login
```

### Session Management

**Token Storage:**
```typescript
localStorage.setItem('parkadda_token', response.access_token);
localStorage.setItem('parkadda_mobile', mobile);
localStorage.setItem('parkadda_last_login', new Date().toISOString());
```

**Token Retrieval:**
```typescript
const token = localStorage.getItem('parkadda_token');
const mobile = localStorage.getItem('parkadda_mobile');
const lastLogin = localStorage.getItem('parkadda_last_login');
```

**Token Validation:**
- Token must be a non-empty string
- Used in Authorization header: `Authorization: Bearer {token}`

---

## API Endpoints

### Complete Endpoint List

**Base URLs:**
- Development: `http://localhost:4200/api` (proxied through ng serve)
- Production: `/api` (relative path, served from backend)

**Parkadda Endpoints (proxied to https://www.admin.parkadda.com):**

| Endpoint | Method | Purpose | Protected |
|----------|--------|---------|-----------|
| `/api/user/admin-login/` | POST | Admin login | No |
| `/api/parking/getParkingListForHost/` | POST | Get parking locations | Yes |
| `/api/trooper/getRangersByParking` | GET | Get rangers by parking | Yes |
| `/api/trooper/getMasterParkingSizeData` | GET | Get parking capacity | Yes |
| `/api/trooper/searchAdminVehicleInReports` | POST | Vehicle entry reports | Yes |
| `/api/trooper/searchAdminVehicleOutReports` | POST | Vehicle exit reports | Yes |
| `/api/trooper/searchAdminVehicleReports` | POST | All vehicle reports | Yes |
| `/api/trooper/getAllBookingsReport` | POST | Booking reports | Yes |
| `/api/trooper/getCashTransactions` | POST | Cash transactions | Yes |
| `/api/trooper/getCardTransactions` | POST | Card transactions | Yes |
| `/api/trooper/getUPITransactions` | POST | UPI transactions | Yes |
| `/api/trooper/getFastagTransactions` | POST | Fastag transactions | Yes |
| `/api/trooper/getPaymentGatewayTransactions` | POST | Payment gateway transactions | Yes |
| `/api/trooper/getMonthlyPassesForAdmin` | POST | Monthly passes | Yes |
| `/api/trooper/getExemptedVehicles` | POST | Exempt vehicles | Yes |
| `/api/trooper/getParkingOccupancy` | GET | Parking occupancy | Yes |
| `/api/trooper/resetParkingOccupancy` | POST | Reset occupancy | Yes |
| `/api/trooper/resetVehicleTypeOccupancy` | POST | Reset type occupancy | Yes |
| `/api/trooper/getVehicleTypesFromPricing` | GET | Vehicle types | Yes |
| `/api/trooper/getAllPricingReport` | POST | All pricing | Yes |
| `/api/trooper/getPricingReport` | POST | Pricing report | Yes |

---

## Data Models

### Authentication Models

```typescript
export interface ParkaddaLoginRequest {
  mobile: string;      // 10-digit phone number
  password: string;    // Admin password
}

export interface ParkaddaLoginResponse {
  access_token: string;
  token_type?: string;        // Usually "Bearer"
  expires_in?: number;        // Seconds until expiration
  refresh_token?: string;     // Optional refresh token
}
```

### Parking Management Models

```typescript
export interface ParkingLocation {
  parking_table_id: number;
  parking_name: string;
  location?: string;
  capacity?: number;
  available_slots?: number;
  occupancy_percentage?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Ranger {
  ranger_id: number;
  ranger_name: string;
  mobile?: string;
  email?: string;
  status?: string;
  parking_table_id: number;
}

export interface MasterParkingSizeData {
  parking_table_id: number;
  two_wheeler_capacity?: number;
  three_wheeler_capacity?: number;
  four_wheeler_capacity?: number;
  commercial_capacity?: number;
  total_capacity?: number;
  available_slots?: Record<string, number>;
}
```

### Vehicle Report Models

```typescript
export interface VehicleInReport {
  report_id?: number;
  parking_table_id: number;
  vehicle_number: string;
  vehicle_type: string;
  in_time: string;
}

export interface VehicleOutReport {
  report_id?: number;
  parking_table_id: number;
  vehicle_number: string;
  vehicle_type: string;
  out_time: string;
  duration?: string;
  amount_paid?: number;
}

export interface BookingReport {
  booking_id?: number;
  parking_table_id: number;
  vehicle_number: string;
  booking_date: string;
  from_time: string;
  to_time: string;
  status: string;
  amount: number;
}
```

### Transaction Models

```typescript
export interface CashTransaction {
  transaction_id?: number;
  parking_table_id: number;
  vehicle_number: string;
  amount: number;
  transaction_date: string;
  status: string;
}

export interface CardTransaction {
  transaction_id?: number;
  parking_table_id: number;
  vehicle_number: string;
  amount: number;
  card_number?: string;
  transaction_date: string;
  status: string;
}

export interface UPITransaction {
  transaction_id?: number;
  parking_table_id: number;
  amount: number;
  transaction_date: string;
  status: string;
}

export interface FastagTransaction {
  transaction_id?: number;
  amount: number;
  transaction_date: string;
  status: string;
}
```

### Pagination & Response Models

```typescript
export interface PaginatedResponse<T> {
  data: T[];
  total_count: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface ReportFilters {
  parking_table_id?: number;
  from_date?: string;
  to_date?: string;
  page?: number;
  page_size?: number;
  vehicle_number?: string;
  status?: string;
  [key: string]: any;
}
```

---

## Routing & Protection

### Parkadda Routes

**Base Path:** `/parkadda`

```typescript
{
  path: 'parkadda',
  children: [
    {
      path: 'login',
      loadComponent: () => import('./components/auth/parkadda-login/parkadda-login.component')
        .then((m) => m.ParkaddaLoginComponent),
      // Public route - no guard
    },
    {
      path: 'dashboard',
      loadComponent: () => import('./components/admin/parkadda/analytics-dashboard/analytics-dashboard.component')
        .then((m) => m.AnalyticsDashboardComponent),
      canActivate: [ParkaddaGuard],
      // Protected - requires valid Parkadda token
    },
    {
      path: 'parking-list',
      loadComponent: () => import('./components/admin/parkadda/parking-list/parking-list.component')
        .then((m) => m.ParkingListComponent),
      canActivate: [ParkaddaGuard],
      // Protected - requires valid Parkadda token
    },
    {
      path: 'vehicle-reports',
      loadComponent: () => import('./components/admin/parkadda/vehicle-reports/vehicle-reports.component')
        .then((m) => m.VehicleReportsComponent),
      canActivate: [ParkaddaGuard],
      // Protected - requires valid Parkadda token
    },
    {
      path: 'transaction-reports',
      loadComponent: () => import('./components/admin/parkadda/transaction-reports/transaction-reports.component')
        .then((m) => m.TransactionReportsComponent),
      canActivate: [ParkaddaGuard],
      // Protected - requires valid Parkadda token
    }
  ]
}
```

### Route Access Control

| Route | Protected | Guard | Purpose |
|-------|-----------|-------|---------|
| `/parkadda/login` | No | None | Parkadda login page |
| `/parkadda/dashboard` | Yes | ParkaddaGuard | Analytics dashboard |
| `/parkadda/parking-list` | Yes | ParkaddaGuard | Parking locations |
| `/parkadda/vehicle-reports` | Yes | ParkaddaGuard | Vehicle entry/exit reports |
| `/parkadda/transaction-reports` | Yes | ParkaddaGuard | Payment transactions |

---

## Interceptors & Guards

### ParkaddaGuard

**Location:** `src/app/guards/parkadda.guard.ts`

**Purpose:** Protects Parkadda routes - ensures user is authenticated before access

**Logic:**
```typescript
canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree {
  
  // Check if user has valid Parkadda token
  if (this.parkaddaAuthService.isParkaddaLoggedIn()) {
    console.log('✅ Parkadda authentication verified - Access granted');
    return true;
  }

  // No valid token - redirect to Parkadda login
  console.warn('🔐 Parkadda authentication required - Redirecting to login');
  this.router.navigate(['/parkadda/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
}
```

**Behavior:**
- ✅ If token exists: Allow access
- ❌ If no token: Redirect to `/parkadda/login` with return URL

### ParkaddaInterceptor

**Location:** `src/app/interceptors/parkadda.interceptor.ts`

**Purpose:** Logs Parkadda API requests for debugging

**Key Features:**
- Logs login requests with detailed debugging info
- Logs other Parkadda API requests
- Includes Authorization header status
- Masks sensitive data (passwords, tokens)
- No request modification (tokens handled by auth service)

**Parkadda Route Patterns:**
- `/api/user/`
- `/api/parkadda/`
- `/api/admin-login/`

---

## Module Interactions

### Integration with Other Modules

#### 1. With Main Dashboard

```
Main Dashboard (Login)
     ↓
     ├─→ Standard Dashboard Routes
     └─→ /parkadda/login (Separate Authentication)
         ↓
         Parkadda Module
         ├─→ Analytics Dashboard
         ├─→ Parking List
         ├─→ Vehicle Reports
         └─→ Transaction Reports
```

**Key Points:**
- Parkadda has independent authentication
- Separate login flow from main dashboard
- Separate token storage

#### 2. API Communication Hierarchy

```
Angular App (Port 4200)
     ↓ (Development: ng serve with proxy)
     ├─→ /api/parkadda/* 
     │   └─→ Proxy to: https://www.admin.parkadda.com
     │
     └─→ /api/auth/*
         └─→ Proxy to: http://localhost:8080
```

#### 3. Service Dependencies

```
ParkaddaLoginComponent
     ↓ (uses)
ParkaddaAuthService
     ↓ (manages)
Token Storage (localStorage)
     ↓ (used by)
ParkaddaService
     ↓ (uses)
HttpClient + Parkadda Endpoints
```

#### 4. Other Module Connections

| Module | Connection | Purpose |
|--------|-----------|---------|
| **Auth Module** | Separate login | Independent authentication context |
| **Inventory Module** | None | No direct interaction |
| **Admin Dashboard** | Sidebar access | Link to Parkadda dashboard |
| **SMC Module** | None | Different API backend |
| **ANPR Module** | None | Different functionality |

---

## Development Server Setup

### Running with Parkadda Integration

```bash
# Start development server with proxy
ng serve --proxy-config proxy.conf.json

# Or with specific port
ng serve --port 4200 --proxy-config proxy.conf.json
```

### Testing Parkadda Authentication

```powershell
# Test login endpoint
$loginBody = @{ 
  mobile = "1234567890"; 
  password = "password" 
} | ConvertTo-Json

Invoke-WebRequest `
  -Uri "https://www.admin.parkadda.com/api/user/admin-login/" `
  -Method Post `
  -ContentType "application/json" `
  -Body $loginBody
```

---

## Summary

The **Parkadda Module** provides:

✅ **Independent Authentication** - Separate login from main dashboard  
✅ **Token-Based Access** - Bearer token from Parkadda API  
✅ **Protected Routes** - ParkaddaGuard ensures authentication  
✅ **Comprehensive API** - 20+ endpoints for parking management  
✅ **Transaction Tracking** - Cash, card, UPI, Fastag payments  
✅ **Report Generation** - Vehicle, occupancy, and pricing reports  
✅ **Data Management** - Monthly passes and exempt vehicle management  

**Key Files:**
- Config: `src/app/config/parkadda.config.ts`
- Services: `src/app/services/parkadda-*.service.ts`
- Guards: `src/app/guards/parkadda.guard.ts`
- Models: `src/app/models/parkadda.models.ts`
- Proxy: `proxy.conf.json`
- Environment: `src/environments/environment.ts`

**External API:** `https://www.admin.parkadda.com` (Port 443, HTTPS)  
**Local Backend:** `http://localhost:8080` (Port 8080, HTTP)  
**Dev Server:** `http://localhost:4200` (Port 4200, HTTP)
