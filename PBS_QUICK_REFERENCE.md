# PBS Integration - Quick Reference Guide

## File Locations

```
Models & Interfaces
├── src/app/models/chartered-bike.ts

Services
├── src/app/services/chartered-bike.service.ts
├── src/app/services/chartered-bike.service.spec.ts

Components
├── src/app/components/admin/pbs-stations/
│   ├── pbs-stations.component.ts
│   ├── pbs-stations.component.html
│   ├── pbs-stations.component.scss
│   └── pbs-stations.component.spec.ts

Configuration
├── src/environments/environment.ts
├── src/environments/environment.prod.ts

Routing
├── src/app/app.routes.ts

UI Integration
├── src/app/components/shared/header/header.component.ts

Documentation
├── PBS_INTEGRATION_GUIDE.md (Main guide)
├── PBS_ENHANCEMENTS_ROADMAP.md (Future features)
├── PBS_QUICK_REFERENCE.md (This file)
```

## Common Tasks

### 1. Navigate to PBS Stations

**Via Sidebar:**
- Click "PBS" in left sidebar
- Click "Bike Stations"

**Via URL:**
```
http://localhost:4200/pbs/stations
```

**Programmatically:**
```typescript
import { Router } from '@angular/router';

constructor(private router: Router) {}

navigateToPBS() {
  this.router.navigate(['/pbs/stations']);
}
```

### 2. Change Refresh Interval

**Current:** 30 seconds (auto-refresh disabled)

**To Enable Auto-Refresh:**
```typescript
// In pbs-stations.component.ts
private startAutoRefresh(): void {
  this.autoRefreshInterval = setInterval(() => {
    if (this.isAuthenticated && !this.isLoading) {
      this.fetchStations();
    }
  }, this.refreshInterval);
}

ngOnInit() {
  // ... existing code ...
  this.startAutoRefresh(); // Add this line
}
```

**To Change Interval:**
```typescript
// 60 seconds
this.refreshInterval = 60000;

// 5 minutes
this.refreshInterval = 300000;
```

### 3. Update API Credentials

⚠️ **Security Warning:** Hardcoded credentials should be replaced with secure backend proxy in production.

**Location:** `src/environments/environment.ts` & `environment.prod.ts`

```typescript
environment = {
  charteredBike: {
    credentials: {
      userName: 'SSCL',        // ← Change here
      password: '209107'       // ← Change here
    }
  }
}
```

**Note:** Changes require server restart
```bash
npm start
```

### 4. Customize Station Filters

**Minimum Bikes Filter:**
```typescript
// In pbs-stations.component.ts
applyFilters(): void {
  this.filteredStations = this.allStations.filter((station) => {
    const meetsMinBikes = station.bikesAvailable >= this.minBikesFilter;
    // ... rest of filter logic
  });
}
```

**Add Custom Filter:**
```typescript
// Example: Only show active stations
const onlyActive = station.active === true;

// Example: Only show specific city
const cityFilter = station.cityId === 14;

// Combine filters
return meetsMinBikes && matchesSearch && onlyActive && cityFilter;
```

### 5. Modify Status Color Coding

**Location:** `pbs-stations.component.ts` method `enrichStation()`

```typescript
private enrichStation(station: CharteredBikeStation): CharteredBikeStationUI {
  const availabilityPercentage = (station.bikesAvailable / station.bikesTotal) * 100;
  
  let statusColor = '#4CAF50';
  let statusLabel = 'Available';

  // Customize thresholds and colors here:
  if (availabilityPercentage === 0) {
    statusColor = '#F44336'; // Red - empty
  } else if (availabilityPercentage < 25) {
    statusColor = '#FF9800'; // Orange - low
  } else if (availabilityPercentage < 75) {
    statusColor = '#FFC107'; // Amber - moderate
  }
  // else: Green - good availability (default)

  return { ...station, availabilityPercentage, statusColor, statusLabel };
}
```

### 6. Change Display Columns

**Location:** `pbs-stations.component.ts`

```typescript
// Current columns
displayedColumns: string[] = [
  'stationName',
  'bikesAvailable',
  'bikesTotal',
  'reportOnTripBikes',
  'location',
  'status',
  'actions',
];

// To add a column:
// 1. Add column name to array
// 2. Add ng-container in HTML template
// 3. Add column definition

// Example: Add 'bikesRack' column
displayedColumns: string[] = [
  'stationName',
  'bikesAvailable',
  'bikesRack',      // ← New
  'bikesTotal',
  // ... rest
];
```

### 7. Style Customization

**Theme Color:**
```scss
// File: pbs-stations.component.scss

// Change primary color (currently #00844a)
.header-icon { color: #1976D2; }
.stat-card .stat-number { color: #1976D2; }
```

**Stats Card Layout:**
```scss
.stats-container {
  // Change grid to 2 columns on mobile
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### 8. Add Error Notification Toast

**Install Toast Library:**
```bash
npm install ngx-toastr
```

**Usage:**
```typescript
import { ToastrService } from 'ngx-toastr';

constructor(private toastr: ToastrService) {}

private handleError(message: string, error?: any): void {
  console.error(message, error);
  this.toastr.error(message, 'Error');
  this.errorSubject.next(message);
}

// Success notification
this.toastr.success('Stations refreshed', 'Success');
```

### 9. Export Stations Data to Excel

**Install Package:**
```bash
# Already installed in your project
npm install xlsx
```

**Add Export Method:**
```typescript
import * as XLSX from 'xlsx';

exportToExcel(): void {
  const data = this.filteredStations.map(station => ({
    'Station Name': station.stationName,
    'Station #': station.stationNumber,
    'Available': station.bikesAvailable,
    'Total': station.bikesTotal,
    'On Trip': station.reportOnTripBikes,
    'Latitude': station.latitude,
    'Longitude': station.longitude,
    'Status': station.statusLabel
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Stations');
  XLSX.writeFile(wb, 'pbs-stations.xlsx');
}
```

### 10. Add Authentication Guard

**Create Guard:**
```typescript
// pbs.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CharteredBikeService } from '../services/chartered-bike.service';

@Injectable({ providedIn: 'root' })
export class PbsGuard implements CanActivate {
  constructor(
    private cbService: CharteredBikeService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.cbService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
```

**Apply Guard to Route:**
```typescript
// app.routes.ts
{
  path: 'pbs/stations',
  loadComponent: () => import('./components/admin/pbs-stations/pbs-stations.component')
    .then((m) => m.PbsStationsComponent),
  canActivate: [PbsGuard]  // ← Add this
}
```

## Testing Commands

### Run All Tests
```bash
npm test
```

### Run PBS Tests Only
```bash
npm test -- --include='**/chartered-bike.service.spec.ts'
npm test -- --include='**/pbs-stations.component.spec.ts'
```

### Run Tests with Coverage
```bash
npm test -- --code-coverage
```

### Run Tests in Headless Mode (CI/CD)
```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

## Debugging

### Enable Console Logs

```typescript
// In pbs-stations.component.ts or service

// Add debug flag
private debug = true;

private log(message: string, data?: any): void {
  if (this.debug) {
    console.log('[PBS]', message, data);
  }
}

// Use in methods
this.log('Stations loaded', this.filteredStations);
this.log('Error occurred', error);
```

### Check Authentication Status
```typescript
// In browser console
localStorage.getItem('chartered_bike_token')
localStorage.getItem('chartered_bike_login')
```

### Network Debugging
```
Browser DevTools → Network tab → Filter: "auth-login" or "show-stations"
```

### Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Blank table | No stations data | Check API response in Network tab |
| "Not authenticated" | Token missing | Check localStorage, try logout/login |
| CORS error | API blocked | Use CORS proxy or backend |
| Styles not loading | SCSS not compiled | Rebuild: `ng build` |
| Routes not working | Route not registered | Check app.routes.ts |

## Performance Tips

### Optimization Opportunities

1. **Virtual Scrolling** (for large lists)
```typescript
import { ScrollingModule } from '@angular/cdk/scrolling';

// In component imports
imports: [ScrollingModule, ...]

// In template
<cdk-virtual-scroll-viewport itemSize="60" class="pbs-scroll">
  <tr *cdkVirtualFor="let row of filteredStations">
    <!-- row content -->
  </tr>
</cdk-virtual-scroll-viewport>
```

2. **OnPush Change Detection**
```typescript
@Component({
  // ... config
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PbsStationsComponent {}
```

3. **Unsubscribe Management** ✅ (Already implemented)
```typescript
// Uses takeUntil pattern
private destroy$ = new Subject<void>();

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

## API Reference

### CharteredBikeService Methods

```typescript
// Authentication
login(): Observable<CharteredBikeLoginResponse>
logout(): void
getToken(): string | null
getLoginData(): CharteredBikeLoginData | null
isAuthenticated(): boolean

// Stations
getStations(): Observable<CharteredBikeStationResponse>

// Error Handling
clearError(): void

// Observables
isAuthenticated$: Observable<boolean>
loading$: Observable<boolean>
error$: Observable<string | null>
```

### Component Methods (Public)

```typescript
// Data Loading
refreshData(): void

// Filtering
applyFilters(): void

// Authentication
logout(): void

// Styling
getStatusStyle(station: CharteredBikeStationUI): object
getCoordinates(station: CharteredBikeStation): string
getAvailabilityColor(percentage: number): string

// Stats
getTotalBikesAvailable(): number
getTotalBikes(): number
getActiveStationsCount(): number
```

## Useful Links

- **API Endpoint:** https://api.charteredbike.in/api/v1
- **Angular Material:** https://material.angular.io
- **RxJS Documentation:** https://rxjs.dev
- **Angular Docs:** https://angular.io/docs
- **Leaflet (Maps):** https://leafletjs.com

## Support

- **Documentation:** See PBS_INTEGRATION_GUIDE.md
- **Roadmap:** See PBS_ENHANCEMENTS_ROADMAP.md
- **Unit Tests:** See *.spec.ts files
- **Issues:** Check browser console for errors

---

**Last Updated:** April 29, 2026
**Version:** 1.0
**Status:** Ready for Development ✅
