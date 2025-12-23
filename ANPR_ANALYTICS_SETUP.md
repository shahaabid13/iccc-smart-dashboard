# ANPR Analytics Setup Guide

## Components Created

### 1. ANPR Service (`anpr.service.ts`)
Located at: `src/app/services/anpr.service.ts`

Provides methods to call all ANPR analytics APIs:
- `getOverview()` - Get analytics overview
- `getHourlyTrend()` - Get hourly violation trends
- `getDailyTrend()` - Get daily violation trends
- `getTopJunctions()` - Get top junctions by violations
- `getTopCameras()` - Get top cameras by violations
- `getRepeatOffenders()` - Get repeat offender vehicles
- `getViolationsByColor()` - Get violations grouped by vehicle color
- `getSpeedDistribution()` - Get speed distribution data

### 2. ANPR Analytics Table Component (`anpr-analytics-table.component.ts`)
Located at: `src/app/components/admin/anpr-analytics-table.component.ts`

Features:
- Overview cards showing key metrics
- Tabbed interface with three sections:
  - **Repeat Offenders** - Table of vehicles with multiple violations
  - **Top Junctions** - Junctions with highest violations
  - **Top Cameras** - Cameras with highest violations
- Date range selector
- Responsive design

### 3. ANPR Analytics Charts Component (`anpr-analytics-charts.component.ts`)
Located at: `src/app/components/admin/anpr-analytics-charts.component.ts`

Features:
- **Hourly Trend Chart** - Line chart showing hourly violations
- **Daily Trend Chart** - Line chart showing daily violations
- **Top Junctions Chart** - Bar chart of top junctions
- **Top Cameras Chart** - Bar chart of top cameras
- **Vehicle Color Distribution** - Pie chart of violations by color
- **Speed Distribution** - Bar chart of speed distribution
- Date range selector
- Responsive design

## Setup Instructions

### 1. Update Routes
Add these routes to your routing module (`app.routes.ts`):

```typescript
import { AnprAnalyticsTableComponent } from './components/admin/anpr-analytics-table.component';
import { AnprAnalyticsChartsComponent } from './components/admin/anpr-analytics-charts.component';

export const routes = [
  // ... other routes
  {
    path: 'anpr',
    children: [
      {
        path: 'analytics-table',
        component: AnprAnalyticsTableComponent
      },
      {
        path: 'analytics-charts',
        component: AnprAnalyticsChartsComponent
      }
    ]
  }
];
```

### 2. Ensure HttpClientModule is Imported
In your `main.ts` or app configuration, make sure HttpClientModule is provided:

```typescript
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    // ... other providers
  ]
});
```

### 3. API Configuration
The service uses `http://localhost:8080/api/analytics` as the base URL. 

To change it, update the `baseUrl` property in `anpr.service.ts`:

```typescript
private baseUrl = 'http://your-api-url/api/analytics';
```

## API Endpoints Expected

The service expects the following API endpoints:

```
GET /api/analytics/overview?start={date}&end={date}
GET /api/analytics/trend/hourly?start={date}&end={date}
GET /api/analytics/trend/daily?start={date}&end={date}
GET /api/analytics/junctions/top?start={date}&end={date}
GET /api/analytics/cameras/top?start={date}&end={date}
GET /api/analytics/vehicles/repeat?start={date}&end={date}&min={minViolations}
GET /api/analytics/vehicles/colors?start={date}&end={date}
GET /api/analytics/vehicles/speed?start={date}&end={date}
POST /api/excel/upload-events (multipart/form-data)
```

## Data Format Examples

### Overview Response
```json
{
  "totalViolations": 1234,
  "totalVehicles": 456,
  "totalCameras": 12,
  "totalJunctions": 8,
  "averageSpeedExceeding": 15.5
}
```

### Trend Data Response
```json
[
  {
    "timestamp": "2025-04-01T10:00:00",
    "count": 45,
    "violations": 45
  }
]
```

### Top Junctions Response
```json
[
  {
    "junctionId": "JNC001",
    "junctionName": "Main Street Junction",
    "violations": 234,
    "percentage": 18.9
  }
]
```

### Repeat Offenders Response
```json
[
  {
    "plateNumber": "ABC1234",
    "vehicleColor": "red",
    "violationCount": 5,
    "lastSeen": "2025-04-15T14:30:00"
  }
]
```

## Features

### Analytics Table Component
- ✅ Overview cards with key metrics
- ✅ Tabbed interface (Repeat Offenders, Junctions, Cameras)
- ✅ Sortable/searchable tables
- ✅ Color-coded vehicle colors
- ✅ Progress bars for percentages
- ✅ Date range filtering
- ✅ Responsive design

### Analytics Charts Component
- ✅ Hourly trend line chart
- ✅ Daily trend line chart
- ✅ Top junctions bar chart
- ✅ Top cameras bar chart
- ✅ Vehicle color pie chart
- ✅ Speed distribution bar chart
- ✅ Date range filtering
- ✅ Responsive grid layout

## Browser Compatibility
- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers

## Dependencies
- Angular 20.2.0+
- ng2-charts 4.1.1+
- Chart.js 3.9.1+
- HttpClientModule
