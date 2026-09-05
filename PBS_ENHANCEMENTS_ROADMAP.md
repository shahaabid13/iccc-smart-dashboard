# PBS Dashboard Enhancements - Future Vision

## Overview

This document outlines advanced features and enhancements for the Chartered Bike Srinagar dashboard, including map visualization, analytics, and real-time features.

---

## Phase 2: Map Integration

### 1. Interactive Map Display

#### Implementation Options

**Option A: Leaflet (Recommended)**
- Lightweight, open-source
- Great community support
- Works well with Angular

**Option B: Google Maps**
- More features out of box
- Requires API key
- Better mobile experience

#### Installation (Leaflet)

```bash
npm install leaflet
npm install ngx-leaflet
npm install ngx-leaflet-markercluster
npm install @types/leaflet --save-dev
```

#### Basic Component Structure

```typescript
// pbs-map.component.ts
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CharteredBikeService } from '../../../services/chartered-bike.service';
import { CharteredBikeStation } from '../../../models/chartered-bike';

@Component({
  selector: 'app-pbs-map',
  standalone: true,
  template: `
    <div class="map-container">
      <div id="leaflet-map" class="map"></div>
      <div class="map-controls">
        <button (click)="centerOnSrinagar()">Center</button>
        <button (click)="toggleClustering()">Toggle Clusters</button>
      </div>
    </div>
  `,
  styles: [`
    .map { height: 600px; }
    .map-container { position: relative; }
  `]
})
export class PbsMapComponent implements OnInit {
  private map!: L.Map;
  private markers: L.MarkerClusterGroup | null = null;
  private stations: CharteredBikeStation[] = [];

  constructor(private cbService: CharteredBikeService) {}

  ngOnInit() {
    this.initializeMap();
    this.loadStationsAndMarkThem();
  }

  private initializeMap(): void {
    // Initialize Leaflet map centered on Srinagar
    this.map = L.map('leaflet-map').setView([34.0837, 74.7973], 12);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);
  }

  private loadStationsAndMarkThem(): void {
    this.cbService.getStations().subscribe({
      next: (response) => {
        response.data.forEach(company => {
          this.stations = company.mapStationDTOs;
          this.plotStations(this.stations, company.primaryColor);
        });
      }
    });
  }

  private plotStations(stations: CharteredBikeStation[], color: string): void {
    stations.forEach(station => {
      const lat = parseFloat(station.latitude);
      const lng = parseFloat(station.longitude);
      
      // Determine marker color based on availability
      const markerColor = this.getMarkerColor(station.bikesAvailable, station.bikesTotal);
      
      // Create custom marker
      const marker = L.circleMarker([lat, lng], {
        radius: 8,
        fillColor: markerColor,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(this.map);

      // Add popup
      const popupContent = `
        <div class="station-popup">
          <h4>${station.stationName}</h4>
          <p>Available: ${station.bikesAvailable}/${station.bikesTotal}</p>
          <p>On Trip: ${station.reportOnTripBikes}</p>
          <button onclick="console.log('View details')">Details</button>
        </div>
      `;
      
      marker.bindPopup(popupContent);
    });
  }

  private getMarkerColor(available: number, total: number): string {
    const percentage = (available / total) * 100;
    if (percentage === 0) return '#F44336'; // Red
    if (percentage < 25) return '#FF9800'; // Orange
    if (percentage < 75) return '#FFC107'; // Amber
    return '#4CAF50'; // Green
  }

  centerOnSrinagar(): void {
    this.map.setView([34.0837, 74.7973], 12);
  }

  toggleClustering(): void {
    // Toggle marker clustering on/off
  }
}
```

#### Styling

```scss
// pbs-map.component.scss
.map-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .map {
    height: 600px;
    z-index: 1;
  }

  .map-controls {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    gap: 10px;

    button {
      padding: 8px 12px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}

// Leaflet map legend
.leaflet-legend {
  background: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 4px 0;
    font-size: 12px;

    .legend-color {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }
  }
}
```

---

## Phase 2.5: Analytics Dashboard

### Availability Trends Chart

```typescript
// pbs-analytics.component.ts
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CharteredBikeService } from '../../../services/chartered-bike.service';

@Component({
  selector: 'app-pbs-analytics',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  template: `
    <div class="analytics-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Availability Over Time</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <canvas 
            baseChart 
            [data]="lineChartData" 
            [options]="lineChartOptions"
            type="line">
          </canvas>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Station Distribution</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <canvas 
            baseChart 
            [data]="pieChartData"
            [options]="pieChartOptions"
            type="pie">
          </canvas>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Peak Hours Analysis</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <canvas 
            baseChart 
            [data]="barChartData"
            [options]="barChartOptions"
            type="bar">
          </canvas>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .analytics-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
      padding: 20px;

      mat-card {
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }
  `]
})
export class PbsAnalyticsComponent implements OnInit {
  // Line Chart: Availability Trend
  lineChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: []
  };

  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Bike Availability Trend (24 Hours)'
      },
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100
      }
    }
  };

  // Pie Chart: Station Status Distribution
  pieChartData: ChartConfiguration['data'] = {
    labels: ['Available', 'Low Stock', 'Empty'],
    datasets: []
  };

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  // Bar Chart: Peak Hours
  barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: []
  };

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    indexAxis: 'x',
    plugins: {
      title: {
        display: true,
        text: 'Bikes On Trip by Hour'
      }
    }
  };

  constructor(private cbService: CharteredBikeService) {}

  ngOnInit() {
    this.loadAnalyticsData();
  }

  private loadAnalyticsData(): void {
    // Fetch historical data (if API supports)
    // Generate charts based on current and historical data
    this.generateTrendChart();
    this.generateDistributionChart();
    this.generatePeakHoursChart();
  }

  private generateTrendChart(): void {
    // Simulate 24-hour trend data
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const availability = Array.from({ length: 24 }, 
      () => Math.random() * 100
    );

    this.lineChartData = {
      labels: hours,
      datasets: [
        {
          label: 'Average Availability %',
          data: availability,
          borderColor: '#00844A',
          backgroundColor: 'rgba(0, 132, 74, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    };
  }

  private generateDistributionChart(): void {
    const data = [65, 25, 10]; // Available, Low, Empty percentages

    this.pieChartData = {
      labels: ['Available (≥75%)', 'Low Stock (25-75%)', 'Empty (0%)'],
      datasets: [
        {
          data,
          backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
          borderColor: '#fff',
          borderWidth: 2
        }
      ]
    };
  }

  private generatePeakHoursChart(): void {
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const tripCounts = Array.from({ length: 24 }, 
      () => Math.floor(Math.random() * 50)
    );

    this.barChartData = {
      labels: hours,
      datasets: [
        {
          label: 'Bikes On Trip',
          data: tripCounts,
          backgroundColor: '#1976D2',
          borderColor: '#0D47A1',
          borderWidth: 1
        }
      ]
    };
  }
}
```

---

## Phase 3: Real-time Updates

### WebSocket Integration

```typescript
// pbs-realtime.service.ts
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject, Observable } from 'rxjs';
import { CharteredBikeStation } from '../models/chartered-bike';

@Injectable({ providedIn: 'root' })
export class PbsRealtimeService {
  private wsUrl = 'wss://api.charteredbike.in/ws/stations'; // Example
  private socket$: WebSocketSubject<any> | null = null;
  private stationsUpdates$ = new BehaviorSubject<CharteredBikeStation[]>([]);

  connect(): Observable<CharteredBikeStation[]> {
    if (!this.socket$) {
      this.socket$ = webSocket(this.wsUrl);
      
      this.socket$.subscribe({
        next: (data: any) => {
          this.stationsUpdates$.next(data.stations);
        },
        error: (err) => {
          console.error('WebSocket error:', err);
          this.reconnect();
        },
        complete: () => {
          this.socket$ = null;
        }
      });
    }

    return this.stationsUpdates$.asObservable();
  }

  private reconnect(): void {
    // Attempt to reconnect after 5 seconds
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  disconnect(): void {
    if (this.socket$) {
      this.socket$.complete();
      this.socket$ = null;
    }
  }
}
```

### Auto-Refresh Component

```typescript
// Add to pbs-stations.component.ts
private autoRefreshInterval: any;
private refreshInterval = 30000; // 30 seconds

ngOnInit() {
  this.subscribeToServiceStates();
  this.loadData();
  this.startAutoRefresh();
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
  this.stopAutoRefresh();
}

private startAutoRefresh(): void {
  this.autoRefreshInterval = setInterval(() => {
    if (this.isAuthenticated && !this.isLoading) {
      this.fetchStations();
    }
  }, this.refreshInterval);
}

private stopAutoRefresh(): void {
  if (this.autoRefreshInterval) {
    clearInterval(this.autoRefreshInterval);
  }
}

// Make interval configurable
setRefreshInterval(interval: number): void {
  this.refreshInterval = interval;
  this.stopAutoRefresh();
  this.startAutoRefresh();
}
```

---

## Phase 4: User Features

### Favorite Stations

```typescript
// pbs-favorites.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PbsFavoritesService {
  private favorites$ = new BehaviorSubject<number[]>([]);
  private readonly storageKey = 'pbs_favorites';

  constructor() {
    this.loadFavorites();
  }

  addFavorite(stationNumber: number): void {
    const current = this.favorites$.value;
    if (!current.includes(stationNumber)) {
      const updated = [...current, stationNumber];
      this.favorites$.next(updated);
      this.saveFavorites(updated);
    }
  }

  removeFavorite(stationNumber: number): void {
    const updated = this.favorites$.value.filter(s => s !== stationNumber);
    this.favorites$.next(updated);
    this.saveFavorites(updated);
  }

  isFavorite(stationNumber: number): boolean {
    return this.favorites$.value.includes(stationNumber);
  }

  getFavorites(): number[] {
    return this.favorites$.value;
  }

  getFavorites$(): Observable<number[]> {
    return this.favorites$.asObservable();
  }

  private saveFavorites(favorites: number[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  private loadFavorites(): void {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.favorites$.next(JSON.parse(stored));
    }
  }
}
```

### Bike Reservation (API-dependent)

```typescript
// pbs-reservation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharteredBikeService } from './chartered-bike.service';

@Injectable({ providedIn: 'root' })
export class PbsReservationService {
  private baseUrl = 'https://api.charteredbike.in/api/v1';

  constructor(
    private http: HttpClient,
    private cbService: CharteredBikeService
  ) {}

  // Reserve a bike (if API supports)
  reserveBike(
    stationNumber: number,
    bikeNumber: number
  ): Observable<any> {
    const token = this.cbService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(
      `${this.baseUrl}/bikes/reserve`,
      {
        stationNumber,
        bikeNumber,
        duration: 30 // minutes
      },
      { headers }
    );
  }

  // End trip (if API supports)
  endTrip(tripId: string): Observable<any> {
    const token = this.cbService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(
      `${this.baseUrl}/trips/${tripId}/end`,
      {},
      { headers }
    );
  }
}
```

---

## Phase 5: Admin Features

### Station Management Dashboard

```typescript
// pbs-admin.component.ts
@Component({
  selector: 'app-pbs-admin',
  standalone: true,
  template: `
    <div class="admin-dashboard">
      <h2>Station Management</h2>
      
      <mat-card>
        <mat-card-title>Add/Edit Station</mat-card-title>
        <mat-card-content>
          <form [formGroup]="stationForm">
            <mat-form-field>
              <mat-label>Station Name</mat-label>
              <input matInput formControlName="stationName" />
            </mat-form-field>

            <mat-form-field>
              <mat-label>Capacity</mat-label>
              <input matInput type="number" formControlName="bikesTotal" />
            </mat-form-field>

            <mat-form-field>
              <mat-label>Latitude</mat-label>
              <input matInput type="number" formControlName="latitude" />
            </mat-form-field>

            <mat-form-field>
              <mat-label>Longitude</mat-label>
              <input matInput type="number" formControlName="longitude" />
            </mat-form-field>

            <button mat-raised-button color="primary" (click)="saveStation()">
              Save Station
            </button>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-title>Maintenance Alerts</mat-card-title>
        <mat-card-content>
          <table mat-table [dataSource]="maintenanceAlerts">
            <!-- Define columns here -->
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class PbsAdminComponent {
  stationForm: FormGroup;
  maintenanceAlerts: any[] = [];

  constructor(private fb: FormBuilder) {
    this.stationForm = this.fb.group({
      stationName: ['', Validators.required],
      bikesTotal: [0, Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, Validators.required]
    });
  }

  saveStation(): void {
    if (this.stationForm.valid) {
      // Call API to save station
    }
  }
}
```

---

## Recommendations by Priority

### High Priority (Months 1-2)
1. ✅ Basic stations display (DONE)
2. ✅ Filtering & search (DONE)
3. 📍 **Map visualization** - Provides immediate visual value
4. 📊 **Analytics dashboard** - Shows trends and patterns

### Medium Priority (Months 2-3)
1. 🔄 **Real-time updates** - Auto-refresh every 30s
2. ⭐ **Favorite stations** - Improves user experience
3. 📱 **Mobile app** - Extend to native (if needed)

### Low Priority (Months 3+)
1. 🚲 **Bike reservation** - Depends on API support
2. 🛠️ **Admin features** - Internal tool
3. 📲 **Push notifications** - Engagement feature

---

## Technology Stack Recommendations

| Feature | Library | Reason |
|---------|---------|--------|
| Map | Leaflet + ngx-leaflet | Lightweight, proven |
| Charts | ng2-charts | Already in project |
| Real-time | Socket.io | Scalable WebSocket |
| Testing | Jasmine + Karma | Already in project |
| UI | Angular Material | Consistent design |

---

## API Integration Notes

Before implementing Phase 2-5, verify with Chartered Bike API:

- [ ] Map endpoint available?
- [ ] Historical data available?
- [ ] WebSocket support?
- [ ] Reservation capability?
- [ ] Admin endpoints available?

---

## Implementation Checklist

### Phase 2: Map
- [ ] Install Leaflet packages
- [ ] Create PbsMapComponent
- [ ] Plot stations on map
- [ ] Add popup info for stations
- [ ] Style map markers by availability
- [ ] Test map rendering

### Phase 2.5: Analytics
- [ ] Create PbsAnalyticsComponent
- [ ] Add availability trend chart
- [ ] Add station distribution pie chart
- [ ] Add peak hours bar chart
- [ ] Generate sample data
- [ ] Add date range picker (optional)

### Phase 3: Real-time
- [ ] Create PbsRealtimeService
- [ ] Implement WebSocket connection
- [ ] Add auto-refresh logic
- [ ] Handle reconnection
- [ ] Add loading indicators
- [ ] Test connection reliability

### Phase 4: User Features
- [ ] Create PbsFavoritesService
- [ ] Add heart icon to stations
- [ ] Implement favorite filter
- [ ] Create PbsReservationService
- [ ] Add reservation UI
- [ ] Handle reservation errors

### Phase 5: Admin
- [ ] Create PbsAdminComponent
- [ ] Add station CRUD forms
- [ ] Implement maintenance alerts
- [ ] Add analytics for admins
- [ ] Create bike tracking
- [ ] Add reports export

---

**Next Steps:** Start with Phase 2 (Map Integration) for maximum user impact.

