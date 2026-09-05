# Proxy Configuration Fix - Testing Guide

## Problem
The Parkadda login endpoint was returning HTML (the UI) instead of JSON API response. This happened because the proxy path rewrite was incorrect.

## Root Cause
```
Request: POST http://localhost:4200/api/parkadda/user/admin-login/

WRONG CONFIG:
target: "https://www.admin.parkadda.com/api"
pathRewrite: "^/api/parkadda/" → "/"
Result: https://www.admin.parkadda.com/ (HOME PAGE - returns HTML!)

CORRECT CONFIG:
target: "https://www.admin.parkadda.com"
pathRewrite: "^/api/parkadda/" → "/api/"
Result: https://www.admin.parkadda.com/api/user/admin-login/ (API endpoint - returns JSON!)
```

## Solution Applied
Updated `proxy.conf.json`:
```json
{
  "/api/parkadda/": {
    "target": "https://www.admin.parkadda.com",
    "pathRewrite": {
      "^/api/parkadda/": "/api/"
    }
  }
}
```

## How It Works
```
Step 1: Browser sends request
  POST http://localhost:4200/api/parkadda/user/admin-login/
  Body: { mobile: "9419124861", password: "admin007" }

Step 2: ng serve proxy intercepts
  Pattern: /api/parkadda/
  Matches: YES
  
Step 3: Apply target
  Replace target host: https://www.admin.parkadda.com

Step 4: Apply pathRewrite
  Original path: /api/parkadda/user/admin-login/
  Pattern: ^/api/parkadda/
  Replacement: /api/
  New path: /api/user/admin-login/

Step 5: Final proxied request
  POST https://www.admin.parkadda.com/api/user/admin-login/
  Body: { mobile: "9419124861", password: "admin007" }

Step 6: Parkadda API responds
  Response: { access_token: "...", token_type: "Bearer" }
  Content-Type: application/json

Step 7: Proxy returns to browser
  POST http://localhost:4200/api/parkadda/user/admin-login/ → JSON response ✓
```

## Testing Steps

### 1. Restart Development Server
```powershell
# Kill existing server
Get-Process | Where-Object { $_.ProcessName -eq "node" } | Stop-Process -Force

# Start fresh
ng serve --proxy-config proxy.conf.json

# Should show:
# ✔ Compiled successfully
# ✔ Accepting connections at http://localhost:4200
```

### 2. Test Parkadda Login

**In Browser Console:**
```javascript
// Check the request URL
// Should be: http://localhost:4200/api/parkadda/user/admin-login/

// If proxy working correctly:
// Network tab will show:
// - Status: 200
// - Response: JSON { access_token: "...", ... }
// - NOT HTML
```

**In Network Tab (F12 → Network):**
```
Method: POST
URL: http://localhost:4200/api/parkadda/user/admin-login/
Status: 200 ✓
Content-Type: application/json ✓
Response preview: { "access_token": "..." } ✓
```

### 3. Verify Console Logs

Should show (in order):
```
[AUTH] Login endpoint (no token injection): /api/parkadda/user/admin-login/
🔐 [PARKADDA LOGIN] Starting authentication process...
📤 Request body being sent: { "mobile": "9419124861", "password": "admin007" }
🌐 Endpoint: /api/parkadda/user/admin-login/

✅ [PARKADDA LOGIN] Authentication successful!
📥 Response: { "access_token": "eyJ0...", "token_type": "Bearer" }
✅ Token stored successfully
```

### 4. Verify Token Storage
```javascript
// In browser console
localStorage.getItem('parkadda_token')
// Should return: "eyJ0eXAiOiJKV1QiLC..."
```

### 5. Login & Access Dashboard

1. Navigate to http://localhost:4200/parkadda/login
2. Enter credentials:
   - Mobile: 9419124861
   - Password: admin007
3. Click login
4. Should redirect to /parkadda/dashboard ✓
5. Should load parking list and analytics ✓

## Troubleshooting

### Still Getting HTML Response?

**Check 1: Verify proxy config**
```bash
cat proxy.conf.json | grep -A 10 "parkadda"
```
Should show:
- `"target": "https://www.admin.parkadda.com"` (NOT `/api`)
- `"pathRewrite": { "^/api/parkadda/": "/api/" }` (rewrites to `/api/`)

**Check 2: Restart server**
```powershell
# Kill all node processes
Get-Process node | Stop-Process -Force

# Start fresh
ng serve --proxy-config proxy.conf.json
```

**Check 3: Check network request**
- Open DevTools (F12)
- Go to Network tab
- Filter by Fetch/XHR
- Look for request to `/api/parkadda/user/admin-login/`
- Check response tab - should be JSON, not HTML

### CORS Errors?

**Symptoms:**
```
Access to XMLHttpRequest at 'https://www.admin.parkadda.com/api/...' 
from origin 'http://localhost:4200' has been blocked by CORS policy
```

**Reason:** Proxy not being used

**Solution:**
1. Ensure ng serve is running with proxy: `ng serve --proxy-config proxy.conf.json`
2. Request URL should be: `http://localhost:4200/api/parkadda/...` (localhost, not admin.parkadda.com)
3. Check DevTools Network tab shows request to localhost (not external domain)

### 401 Unauthorized on Other Parkadda Endpoints?

**After login, if accessing parkadda routes returns 401:**

1. Verify token was stored:
   ```javascript
   localStorage.getItem('parkadda_token')  // Should have value
   ```

2. Verify token is attached:
   - DevTools → Network tab
   - Look for parkadda API request
   - Headers section should show:
     ```
     Authorization: Bearer eyJ0eXAi...
     ```

3. If token not attached:
   - Check auth.interceptor.ts isParkaddaProtectedRoute()
   - Verify URL pattern matches
   - Check no other interceptors removing auth header

## Proxy Configuration Summary

**Parkadda API:**
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

**How pathRewrite works:**
- Input: `/api/parkadda/user/admin-login/`
- Match: `^/api/parkadda/` matches the beginning
- Replace with: `/api/`
- Output: `/api/user/admin-login/`
- Full URL: `https://www.admin.parkadda.com` + `/api/user/admin-login/`

**Local Backend APIs** (no special rewrite needed):
```json
{
  "/api/auth/": {
    "target": "http://localhost:8080"
  },
  "/api/devices/": {
    "target": "http://localhost:8080"
  }
}
```

## Verification Checklist

- [ ] Development server restarted
- [ ] `proxy.conf.json` has correct pathRewrite
- [ ] Network tab shows JSON response (not HTML)
- [ ] Console shows ✅ Authentication successful!
- [ ] `localStorage.parkadda_token` has value
- [ ] Can access /parkadda/dashboard
- [ ] Dashboard loads parking data
- [ ] Can navigate between Parkadda pages

## Production Note

In production, the backend should handle proxying at the server level (e.g., nginx, Apache) or the Angular app should be served from the same domain as the API endpoints.
