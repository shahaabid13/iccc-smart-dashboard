# API Logging Guide - ANPR Analytics Components

## Enhanced Console Logging for Data Format Debugging

Both the **ANPR Analytics Table** and **ANPR Analytics Charts** components now include comprehensive API logging to help debug data format mismatches between frontend and backend.

---

## Table Component API Calls

### 1. Overview Data
**URL:** `/api/analytics/overview?start=2025-11-17T00:00:00&end=2025-12-17T23:59:59`

**Console Output:**
```
🔗 API Call - Overview: /api/analytics/overview?start=...
✅ Overview Response: {totalEvents: 1926, uniqueVehicles: 1868, statusCounts: Array(1)}
🔍 Expected Fields: totalEvents (number), uniqueVehicles (number), statusCounts (array)
   ✓ totalEvents: 1926 number
   ✓ uniqueVehicles: 1868 number
   ✓ statusCounts: [{name: "Valid Event", count: 1926}]
     Sample status: {name: "Valid Event", count: 1926}
```

**Expected Response Format:**
```json
{
  "totalEvents": 1926,
  "uniqueVehicles": 1868,
  "statusCounts": [
    {"name": "Valid Event", "count": 1926}
  ]
}
```

---

### 2. Repeat Offenders
**URL:** `/api/analytics/vehicles/repeat?start=2025-11-17T00:00:00&end=2025-12-17T23:59:59&min=3`

**Console Output:**
```
🔗 API Call - Repeat Offenders: /api/analytics/vehicles/repeat?start=...
✅ Repeat Offenders Response: [{plateNumber: "ABC123", count: 5}, ...]
📊 Record Count: 10
📋 Sample Record: {plateNumber: "ABC123", count: 5}
🔍 Expected Fields: plateNumber (string), count (number)
   ✓ plateNumber: ABC123 string
   ✓ count: 5 number
```

**Expected Response Format:**
```json
[
  {"plateNumber": "ABC123", "count": 5},
  {"plateNumber": "XYZ789", "count": 3},
  ...
]
```

---

### 3. Top Junctions
**URL:** `/api/analytics/junctions/top?start=2025-11-17T00:00:00&end=2025-12-17T23:59:59&limit=10`

**Console Output:**
```
🔗 API Call - Top Junctions: /api/analytics/junctions/top?start=...
✅ Top Junctions Response: [{junctionName: "Main St & 5th", count: 45}, ...]
📊 Record Count: 5
📋 Sample Record: {junctionName: "Main St & 5th", count: 45}
🔍 Expected Fields: junctionName (string), count (number)
   ✓ junctionName: Main St & 5th string
   ✓ count: 45 number
```

**Expected Response Format:**
```json
[
  {"junctionName": "Main St & 5th", "count": 45},
  {"junctionName": "Oak Ave & Park", "count": 38},
  ...
]
```

---

### 4. Top Cameras
**URL:** `/api/analytics/cameras/top?start=2025-11-17T00:00:00&end=2025-12-17T23:59:59&limit=10`

**Console Output:**
```
🔗 API Call - Top Cameras: /api/analytics/cameras/top?start=...
✅ Top Cameras Response: [{name: "Camera-001", count: 120}, ...]
📊 Record Count: 8
📋 Sample Record: {name: "Camera-001", count: 120}
🔍 Expected Fields: name (string), count (number)
   ✓ name: Camera-001 string
   ✓ count: 120 number
```

**Expected Response Format:**
```json
[
  {"name": "Camera-001", "count": 120},
  {"name": "Camera-002", "count": 95},
  ...
]
```

---

## Charts Component API Calls

### 1. Hourly Trend
**URL:** `/api/analytics/trend/hourly?start=2025-11-17T00:00:00&end=2025-12-17T23:59:59`

**Console Output:**
```
🔗 API Call - Hourly Trend: /api/analytics/trend/hourly?start=...
✅ Hourly Trend Response: [{time: "2025-12-17T14:00:00", count: 5}, ...]
📊 Record Count: 24
📋 Sample Record: {time: "2025-12-17T14:00:00", count: 5}
🔍 Expected Fields: time (ISO string), count (number)
   ✓ time: 2025-12-17T14:00:00 string
   ✓ count: 5 number
```

**Expected Response Format:**
```json
[
  {"time": "2025-12-17T14:00:00", "count": 5},
  {"time": "2025-12-17T15:00:00", "count": 8},
  ...
]
```

---

### 2. Daily Trend
**URL:** `/api/analytics/trend/daily?start=2025-11-17T00:00:00&end=2025-12-17T23:59:59`

**Console Output:**
```
🔗 API Call - Daily Trend: /api/analytics/trend/daily?start=...
✅ Daily Trend Response: [{time: "2025-12-17T00:00:00", count: 45}, ...]
📊 Record Count: 31
📋 Sample Record: {time: "2025-12-17T00:00:00", count: 45}
🔍 Expected Fields: time (ISO string), count (number)
   ✓ time: 2025-12-17T00:00:00 string
   ✓ count: 45 number
```

**Expected Response Format:**
```json
[
  {"time": "2025-12-17T00:00:00", "count": 45},
  {"time": "2025-12-16T00:00:00", "count": 52},
  ...
]
```

---

### 3. Vehicle Colors
**URL:** `/api/analytics/vehicles/colors?start=2025-11-17T00:00:00&end=2025-12-17T23:59:59`

**Console Output:**
```
🔗 API Call - Vehicle Colors: /api/analytics/vehicles/colors?start=...
✅ Vehicle Colors Response: [{name: "black", count: 450}, {name: "white", count: 380}, ...]
📊 Record Count: 5
📋 Sample Record: {name: "black", count: 450}
🔍 Expected Fields: name (string), count (number)
   ✓ name: black string
   ✓ count: 450 number
```

**Expected Response Format:**
```json
[
  {"name": "black", "count": 450},
  {"name": "white", "count": 380},
  {"name": "red", "count": 250},
  ...
]
```

---

### 4. Speed Distribution
**URL:** `/api/analytics/vehicles/speed?start=2025-11-17T00:00:00&end=2025-12-17T23:59:59`

**Console Output:**
```
🔗 API Call - Speed Distribution: /api/analytics/vehicles/speed?start=...
✅ Speed Distribution Response: [{name: "40-50 km/h", count: 120}, ...]
📊 Record Count: 4
📋 Sample Record: {name: "40-50 km/h", count: 120}
🔍 Expected Fields: name (string), count (number)
   ✓ name: 40-50 km/h string
   ✓ count: 120 number
```

**Expected Response Format:**
```json
[
  {"name": "40-50 km/h", "count": 120},
  {"name": "50-60 km/h", "count": 95},
  {"name": "60-70 km/h", "count": 75},
  ...
]
```

---

## Error Logging

If an API call fails, you'll see detailed error information:

```
❌ Error loading [endpoint]: Error: Network error or [error details]
📋 Failed URL: /api/analytics/[endpoint]?...
📊 Error Status: 404 (or other HTTP status)
💬 Error Message: [specific error message]
```

### Common Issues:

| Status | Issue | Solution |
|--------|-------|----------|
| **0** | Network error / Cannot reach backend | Verify backend is running on `http://localhost:8081` |
| **404** | Endpoint not found | Check API route spelling and backend route definition |
| **500** | Server error | Check backend logs for application errors |
| **400** | Bad request | Check date format (should be ISO 8601: `YYYY-MM-DDTHH:MM:SS`) |

---

## How to Check Console Logs

1. Open your browser (Chrome, Firefox, Edge, etc.)
2. Right-click → **Inspect** or press **F12**
3. Go to the **Console** tab
4. Click **"Load Data"** button in the ANPR Analytics component
5. Observe the console output for API calls and responses

---

## Data Format Checklist

When debugging, verify:

- ✅ All API calls are reaching the backend (check URL logs)
- ✅ Response HTTP status is 200 (not 404, 500, etc.)
- ✅ Response fields match expected names (case-sensitive!)
- ✅ Data types are correct (number vs string)
- ✅ Arrays are not empty (or handle empty gracefully)
- ✅ Date fields are in ISO 8601 format

---

## Example Mismatch Detection

**Scenario:** Backend returns `violation_count` but frontend expects `count`

**Console Would Show:**
```
✅ Repeat Offenders Response: [{plateNumber: "ABC123", violation_count: 5}]
🔍 Expected Fields: plateNumber (string), count (number)
   ✗ count: undefined (undefined)
   ⚠️ MISMATCH DETECTED: Backend has 'violation_count' not 'count'
```

This makes it easy to spot and fix data format mismatches!
