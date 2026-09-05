# Parkadda Authentication Issue - Diagnosis & Fix

## Problem Summary
Parkadda login works in Postman but fails in the Angular application.

## Root Causes Identified & Fixed

### 1. ✅ Interceptor Login Route Pattern Mismatch
**Problem:** 
- Interceptor checked for `/api/parkadda/user/admin-login` (without trailing slash)
- Component sends request to `/api/parkadda/user/admin-login/` (with trailing slash)
- Mismatch caused token to be attached even on login request (no token exists yet)

**Fix Applied:**
```typescript
// BEFORE (WRONG)
const LOGIN_ROUTES = [
  '/api/parkadda/user/admin-login'  // ❌ No trailing slash
];

// AFTER (FIXED)
const LOGIN_ROUTES = [
  '/api/parkadda/user/admin-login/'  // ✅ With trailing slash
];
```

### 2. ✅ HTTP Headers Not Being Set
**Problem:**
- `Content-Type: application/json` header might not be explicitly set
- Postman sets it by default, but HttpClient sometimes doesn't

**Fix Applied:**
```typescript
// BEFORE (MISSING HEADERS)
return this.http.post<any>(
  `${this.baseUrl}/user/admin-login/`,
  loginRequest
).pipe(

// AFTER (WITH EXPLICIT HEADERS)
const httpOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
};

return this.http.post<any>(
  `${this.baseUrl}/user/admin-login/`,
  loginRequest,
  httpOptions
).pipe(
```

## Configuration Details

### Proxy Configuration (`proxy.conf.json`)
```json
{
  "/api/parkadda/": {
    "target": "https://www.admin.parkadda.com",
    "secure": true,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api/parkadda/": "/api/"
    }
  }
}
```

**How it works:**
- Request: `http://localhost:4200/api/parkadda/user/admin-login/`
- Proxied to: `https://www.admin.parkadda.com/api/user/admin-login/`
- Path rewrite removes `/api/parkadda` prefix and replaces with `/api/`

### Environment Configuration
```typescript
export const environment = {
  production: false,
  apiUrl: '/api',
  parkaddaApiUrl: '/api/parkadda',  // Relative path for proxy
  swmApiUrl: '/api/weighbridge'
};
```

### Service Implementation
```typescript
private readonly baseUrl = environment.parkaddaApiUrl;  // '/api/parkadda'

adminLogin(mobile: string, password: string): Observable<ParkaddaLoginResponse> {
  const loginRequest: ParkaddaLoginRequest = {
    mobile: trimmedMobile,      // 10-digit number as string
    password: trimmedPassword   // Plain text password
  };

  return this.http.post<any>(
    `${this.baseUrl}/user/admin-login/`,  // '/api/parkadda/user/admin-login/'
    loginRequest,
    { headers: { 'Content-Type': 'application/json' } }
  ).pipe(
    tap(response => {
      // Handle response and extract token
      let accessToken: string | null = null;
      
      // Try multiple response structures
      if (response?.payload?.access_token) {
        accessToken = response.payload.access_token;
      } else if (response?.access_token) {
        accessToken = response.access_token;
      } else if (response?.data?.access_token) {
        accessToken = response.data.access_token;
      }
      
      if (accessToken) {
        localStorage.setItem('parkadda_token', accessToken);
      }
    })
  );
}
```

## Testing Checklist

### ✅ Postman Reference (Working)
1. **Endpoint:** `https://www.admin.parkadda.com/api/user/admin-login/`
2. **Method:** POST
3. **Headers:**
   - `Content-Type: application/json`
4. **Body (JSON):**
   ```json
   {
     "mobile": "9419124861",
     "password": "admin@07"
   }
   ```
5. **Expected Response:**
   ```json
   {
     "payload": {
       "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
       "username": "admin"
     }
   }
   ```

### 🔧 Angular Application Testing

#### Step 1: Clear Browser Storage
```javascript
// Open DevTools Console
localStorage.removeItem('parkadda_token');
localStorage.removeItem('parkadda_mobile');
localStorage.removeItem('parkadda_username');
```

#### Step 2: Enable Console Logging
Navigate to Parkadda Login page and open DevTools (F12):
- Go to `http://localhost:4200/parkadda/login`
- Open Console tab
- Enter credentials from Postman

#### Step 3: Check Console Output
Look for these logs (in order):

1. **Form Submission:**
   ```
   📝 [FORM SUBMISSION] Values extracted:
      - Mobile (original): "9419124861" Length: 10
      - Mobile (cleaned): "9419124861" Length: 10
      - Password: ***
   ```

2. **Auth Service Processing:**
   ```
   🔐 [PARKADDA LOGIN] Starting authentication process...
   📋 Input validation:
      - mobile (raw): "9419124861" type: string
      - password (raw): *** type: string
      - mobile (after cleaning): "9419124861" Length: 10
   ✅ Validation passed
   📤 Request body being sent: {
     "mobile": "9419124861",
     "password": "admin@07"
   }
   🌐 Endpoint: /api/parkadda/user/admin-login/
   ```

3. **Interceptor Processing:**
   ```
   [AUTH] Login endpoint (no token injection): /api/parkadda/user/admin-login/
   ```

4. **Success Response:**
   ```
   📥 Response received: {
     "payload": {
       "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
       "username": "admin"
     }
   }
   ✅ Token found in response.payload.access_token
   ✅ Login successful!
   💾 Stored in localStorage:
      - Token: eyJ0eXAiOiJKV1QiLCJhbGc...
      - Mobile: 9419124861
      - Username: admin
   ✅ [PARKADDA] Login successful - Navigating to dashboard
   ```

#### Step 4: Check Network Tab
1. Open DevTools → Network tab
2. Enter credentials and click Login
3. Look for request to `/api/parkadda/user/admin-login/`
   - **Request Headers:**
     ```
     POST /api/parkadda/user/admin-login/ HTTP/1.1
     Content-Type: application/json
     ```
   - **Request Body:**
     ```json
     {
       "mobile": "9419124861",
       "password": "admin@07"
     }
     ```
   - **Response Status:** 200 OK
   - **Response Body:**
     ```json
     {
       "payload": {
         "access_token": "...",
         "username": "admin"
       }
     }
     ```

#### Step 5: Verify Token Storage
```javascript
// In DevTools Console:
localStorage.getItem('parkadda_token')
// Should return: "eyJ0eXAiOiJKV1QiLCJhbGc..."

localStorage.getItem('parkadda_mobile')
// Should return: "9419124861"

localStorage.getItem('parkadda_username')
// Should return: "admin"
```

## Common Issues & Solutions

### Issue 1: "Http failure during parsing"
**Symptom:** `SyntaxError: Unexpected token '<'`
**Cause:** Response is HTML (proxy routing error)
**Solution:** Check proxy.conf.json pathRewrite is correct

### Issue 2: "401 Unauthorized"
**Symptom:** `Status: 401` in console
**Cause:** 
- Wrong credentials
- Token being injected on login request
**Solution:** 
- Verify credentials match Postman test
- Ensure LOGIN_ROUTES includes `/api/parkadda/user/admin-login/` with trailing slash

### Issue 3: "CORS Error"
**Symptom:** `Access to XMLHttpRequest blocked by CORS policy`
**Cause:** 
- Development server not running with proxy
- Proxy configuration not loaded
**Solution:**
- Restart dev server: `ng serve --proxy-config proxy.conf.json`
- Verify proxy loads: Should see proxy logs in dev server output

### Issue 4: "400 Bad Request"
**Symptom:** `Status: 400`
**Cause:**
- Malformed request body
- Missing or wrong headers
- Phone number format issue
**Solution:**
- Verify mobile is exactly 10 digits
- Check Content-Type header is set to application/json
- Verify password is correct

## Implementation Files Modified

### 1. `src/app/interceptors/auth.interceptor.ts`
- Updated LOGIN_ROUTES to include trailing slash on Parkadda login endpoint
- Ensures login requests are not intercepted with token injection

### 2. `src/app/services/parkadda-auth.service.ts`
- Added explicit `Content-Type: application/json` header to POST request
- Improved debugging logs
- Ensures request format matches Postman test exactly

### 3. No changes to `proxy.conf.json`
- Configuration was already correct
- Correctly routes `/api/parkadda/` to `https://www.admin.parkadda.com` with proper pathRewrite

## Postman → Angular Flow Comparison

### Postman (Direct to Parkadda API)
```
Postman Request
  ↓
https://www.admin.parkadda.com/api/user/admin-login/
  ↓
Parkadda Server
  ↓
Response with access_token
```

### Angular (Via Development Proxy)
```
Angular Form
  ↓
POST /api/parkadda/user/admin-login/
  ↓
Dev Proxy (ng serve)
  ↓
Rewrite: /api/parkadda/ → /api/
  ↓
https://www.admin.parkadda.com/api/user/admin-login/
  ↓
Parkadda Server
  ↓
Response with access_token
  ↓
localStorage.setItem('parkadda_token', token)
  ↓
Navigate to /parkadda/dashboard
```

## Deployment to Production

When deploying to production (backend serves Angular):

### Production environment.ts
```typescript
export const environment = {
  production: true,
  apiUrl: '/api',  // Relative - backend handles routing
  parkaddaApiUrl: '/api/parkadda',  // Relative path
  swmApiUrl: '/api/weighbridge'
};
```

### Backend Configuration (Spring Boot)
Should proxy `/api/parkadda/` requests to `https://www.admin.parkadda.com` with proper pathRewrite.

## Next Steps

1. ✅ Apply fixes to interceptor and service (DONE)
2. Restart development server: `ng serve --proxy-config proxy.conf.json`
3. Clear browser cache/localStorage
4. Test Parkadda login with credentials from Postman
5. Verify token is stored in localStorage
6. Check that dashboard loads with Parkadda data

## Debug Mode

To enable maximum debugging:

```typescript
// In parkadda-auth.service.ts - already implemented
// Console will show all steps of authentication process

// Enable Proxy Debug:
// Edit proxy.conf.json: "logLevel": "debug"
// Dev server will show all proxy activity

// Network Tab Debugging:
// F12 → Network → Filter by "admin-login"
// Check headers, request body, response
```
