import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface OverviewData {
  totalEvents: number;
  uniqueVehicles: number;
  statusCounts: Array<{ name: string; count: number }>;
}

interface StatusCount {
  name: string;
  count: number;
}

interface RepeatOffender {
  plateNumber: string;
  count: number;
}

interface JunctionData {
  junctionName: string;
  count: number;
}

interface CameraData {
  name: string;
  count: number;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-anpr-analytics-table',
  template: `
    <div class="analytics-container">
      <h2>ANPR Analytics - Data Table</h2>

      <!-- Date Range Controls -->
      <div class="controls">
        <div class="date-input-group">
          <label>From Date:</label>
          <input 
            type="date" 
            [(ngModel)]="startDate" 
            (change)="onDateChange()"
            class="input-field"
            [disabled]="loading"
          >
        </div>
        <div class="date-input-group">
          <label>To Date:</label>
          <input 
            type="date" 
            [(ngModel)]="endDate" 
            (change)="onDateChange()"
            class="input-field"
            [disabled]="loading"
          >
        </div>
        <button 
          (click)="loadData()" 
          class="load-btn"
          [disabled]="loading"
        >
          {{ loading ? 'Loading...' : 'Load Data' }}
        </button>
      </div>

      <!-- Loading/Error States -->
      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading data...</p>
      </div>
      
      <div *ngIf="error" class="error">
        <p>{{ errorMessage }}</p>
        <button (click)="loadData()" class="retry-btn">Retry</button>
      </div>

      <!-- Overview Cards -->
      <div *ngIf="overview && !loading && !error" class="overview-cards">
        <div class="overview-card">
          <div class="card-icon">⚠️</div>
          <div class="card-content">
            <div class="card-label">Total Events</div>
            <div class="card-value">{{ overview.totalEvents | number }}</div>
          </div>
        </div>
        <div class="overview-card">
          <div class="card-icon">🚗</div>
          <div class="card-content">
            <div class="card-label">Unique Vehicles</div>
            <div class="card-value">{{ overview.uniqueVehicles | number }}</div>
          </div>
        </div>
      </div>

      <!-- Status Distribution -->
      <div *ngIf="overview && overview.statusCounts && !loading && !error" class="status-distribution">
        <h3>Event Status Breakdown</h3>
        <div class="status-items">
          <div *ngFor="let status of overview.statusCounts" class="status-item">
            <span class="status-name">{{ status.name }}</span>
            <span class="status-count">{{ status.count }}</span>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tab-container" *ngIf="!loading && !error">
        <div class="tab-buttons">
          <button 
            (click)="activeTab = 'repeat'" 
            [class.active]="activeTab === 'repeat'"
            class="tab-btn"
          >
            🔁 Repeat Offenders
          </button>
          <button 
            (click)="activeTab = 'junctions'" 
            [class.active]="activeTab === 'junctions'"
            class="tab-btn"
          >
            📍 Top Junctions
          </button>
          <button 
            (click)="activeTab = 'cameras'" 
            [class.active]="activeTab === 'cameras'"
            class="tab-btn"
          >
            📹 Top Cameras
          </button>
        </div>

        <!-- Repeat Offenders Table -->
        <div class="tab-content" *ngIf="activeTab === 'repeat'">
          <div class="table-header">
            <h3>Repeat Offenders (Most Wanted List)</h3>
            <span class="record-count">{{ repeatOffenders.length }} records</span>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Plate Number</th>
                  <th>Violation Count</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of repeatOffenders; let i = index">
                  <td class="index">{{ i + 1 }}</td>
                  <td><strong class="plate-number">{{ item.plateNumber }}</strong></td>
                  <td>
                    <span class="violation-count" [class.high-violations]="item.count > 10">
                      {{ item.count }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div *ngIf="repeatOffenders.length === 0" class="no-data">
              <p>No repeat offenders found for the selected date range</p>
              <p class="sub-text">Try adjusting the date range or check if data exists</p>
            </div>
          </div>
        </div>

        <!-- Top Junctions Table -->
        <div class="tab-content" *ngIf="activeTab === 'junctions'">
          <div class="table-header">
            <h3>Top Junctions by Events</h3>
            <span class="record-count">{{ topJunctions.length }} records</span>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Junction Name</th>
                  <th>Events</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of topJunctions; let i = index">
                  <td class="rank">
                    <span [class]="'rank-badge rank-' + (i + 1)">
                      {{ i + 1 }}
                    </span>
                  </td>
                  <td><strong>{{ item.junctionName || 'Unknown Junction' }}</strong></td>
                  <td>{{ item.count | number }}</td>
                </tr>
              </tbody>
            </table>
            <div *ngIf="topJunctions.length === 0" class="no-data">
              <p>No junction data available for the selected date range</p>
            </div>
          </div>
        </div>

        <!-- Top Cameras Table -->
        <div class="tab-content" *ngIf="activeTab === 'cameras'">
          <div class="table-header">
            <h3>Top Cameras by Events</h3>
            <span class="record-count">{{ topCameras.length }} records</span>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Camera Name</th>
                  <th>Events</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of topCameras; let i = index">
                  <td class="rank">
                    <span [class]="'rank-badge rank-' + (i + 1)">
                      {{ i + 1 }}
                    </span>
                  </td>
                  <td><strong>{{ item.name || 'Unknown Camera' }}</strong></td>
                  <td>{{ item.count | number }}</td>
                </tr>
              </tbody>
            </table>
            <div *ngIf="topCameras.length === 0" class="no-data">
              <p>No camera data available for the selected date range</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .analytics-container {
      padding: 20px;
      background: #f8f9fa;
      min-height: 100vh;
    }

    h2 {
      color: #122e52;
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 600;
    }

    .controls {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      align-items: end;
      flex-wrap: wrap;
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .date-input-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
      flex: 1;
      min-width: 200px;
    }

    .date-input-group label {
      font-weight: bold;
      font-size: 14px;
      color: #333;
    }

    .input-field {
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color 0.3s;
    }

    .input-field:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    .input-field:disabled {
      background: #f5f5f5;
      cursor: not-allowed;
    }

    .load-btn {
      padding: 10px 24px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.3s;
      height: fit-content;
    }

    .load-btn:hover:not(:disabled) {
      background: #0056b3;
      transform: translateY(-1px);
    }

    .load-btn:disabled {
      background: #cccccc;
      cursor: not-allowed;
      transform: none;
    }

    /* Loading/Error */
    .loading {
      text-align: center;
      padding: 40px;
      color: #007bff;
      font-size: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error {
      background: #f8d7da;
      color: #721c24;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #f5c6cb;
      margin-bottom: 20px;
      text-align: center;
    }

    .retry-btn {
      margin-top: 10px;
      padding: 8px 20px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.3s;
    }

    .retry-btn:hover {
      background: #c82333;
    }

    /* Overview Cards */
    .overview-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .overview-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border-left: 4px solid #007bff;
      display: flex;
      gap: 15px;
      align-items: center;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .overview-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .card-icon {
      font-size: 2.5rem;
      opacity: 0.8;
    }

    .card-content {
      flex: 1;
    }

    .card-label {
      font-size: 13px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
      font-weight: 600;
    }

    .card-value {
      font-size: 24px;
      font-weight: 700;
      color: #007bff;
      line-height: 1.2;
    }

    /* Tabs */
    .tab-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
      margin-top: 20px;
    }

    .tab-buttons {
      display: flex;
      gap: 0;
      border-bottom: 2px solid #e0e0e0;
      background: #f8f9fa;
      padding: 0 20px;
    }

    .tab-btn {
      padding: 16px 24px;
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 15px;
      font-weight: 600;
      color: #666;
      transition: all 0.3s;
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;
      white-space: nowrap;
    }

    .tab-btn:hover {
      background: #e9ecef;
      color: #333;
    }

    .tab-btn.active {
      color: #007bff;
      border-bottom-color: #007bff;
      background: white;
    }

    .tab-content {
      padding: 24px;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #f0f0f0;
    }

    .table-header h3 {
      margin: 0;
      color: #122e52;
      font-size: 18px;
    }

    .record-count {
      background: #e9ecef;
      color: #666;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 600;
    }

    /* Tables */
    .table-container {
      overflow-x: auto;
      border-radius: 6px;
      border: 1px solid #e0e0e0;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
      min-width: 800px;
    }

    .data-table th {
      background: #007bff;
      color: white;
      padding: 16px;
      text-align: left;
      font-weight: 600;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .data-table th:first-child {
      border-top-left-radius: 6px;
    }

    .data-table th:last-child {
      border-top-right-radius: 6px;
    }

    .data-table td {
      padding: 16px;
      border-bottom: 1px solid #e0e0e0;
      vertical-align: middle;
    }

    .data-table tbody tr {
      transition: background-color 0.2s;
    }

    .data-table tbody tr:hover {
      background: #f0f8ff;
    }

    .data-table tbody tr:last-child td {
      border-bottom: none;
    }

    /* Table specific styles */
    .index, .rank {
      text-align: center;
      font-weight: 600;
      color: #666;
      width: 60px;
    }

    .rank-badge {
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      font-weight: 700;
      font-size: 13px;
      color: white;
    }

    .rank-1 { background: #ffc107; }
    .rank-2 { background: #6c757d; }
    .rank-3 { background: #fd7e14; }
    .rank-4, .rank-5, .rank-6, .rank-7, .rank-8, .rank-9, .rank-10 {
      background: #6f42c1;
    }

    .plate-number {
      font-family: 'Courier New', monospace;
      font-size: 15px;
      letter-spacing: 1px;
      background: #f8f9fa;
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
    }

    .color-badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 4px;
      color: white;
      font-size: 12px;
      font-weight: 600;
      text-transform: capitalize;
      min-width: 80px;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }

    .violation-count {
      font-weight: 700;
      font-size: 15px;
      color: #007bff;
    }

    .violation-count.high-violations {
      color: #dc3545;
      background: #f8d7da;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .id {
      font-family: 'Courier New', monospace;
      color: #666;
      font-size: 13px;
    }

    /* Progress Bar */
    .progress-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .progress-bar {
      flex: 1;
      height: 20px;
      background: #f0f0f0;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    }

    .progress {
      background: linear-gradient(90deg, #28a745, #20c997);
      height: 100%;
      border-radius: 10px;
      transition: width 0.5s ease;
      min-width: 4px;
    }

    .percentage-text {
      font-size: 13px;
      font-weight: 600;
      color: #333;
      min-width: 50px;
      text-align: right;
    }

    /* No Data */
    .no-data {
      text-align: center;
      padding: 60px 20px;
      color: #999;
      font-size: 16px;
      border: 2px dashed #ddd;
      border-radius: 8px;
      margin: 20px 0;
    }

    .no-data p {
      margin: 0 0 10px 0;
    }

    .sub-text {
      font-size: 14px;
      color: #ccc;
    }

    /* Responsive */
    @media (max-width: 992px) {
      .controls {
        flex-direction: column;
        align-items: stretch;
      }

      .date-input-group {
        min-width: auto;
      }

      .overview-cards {
        grid-template-columns: repeat(2, 1fr);
      }

      .tab-buttons {
        overflow-x: auto;
        flex-wrap: nowrap;
        padding: 0;
      }

      .tab-btn {
        padding: 16px;
        font-size: 14px;
        flex: 1;
        min-width: 120px;
      }
    }

    @media (max-width: 768px) {
      .analytics-container {
        padding: 15px;
      }

      .overview-cards {
        grid-template-columns: 1fr;
        gap: 15px;
      }

      .card-value {
        font-size: 20px;
      }

      .tab-content {
        padding: 16px;
      }

      .data-table {
        font-size: 13px;
      }

      .data-table td,
      .data-table th {
        padding: 12px 8px;
      }
    }
  `]
})
export class AnprAnalyticsTableComponent implements OnInit {
  private http = inject(HttpClient);
  private baseUrl = '/api/analytics';

  startDate: string;
  endDate: string;
  loading = false;
  error = false;
  errorMessage = '';
  activeTab: 'repeat' | 'junctions' | 'cameras' = 'repeat';

  overview: OverviewData | null = null;
  repeatOffenders: RepeatOffender[] = [];
  topJunctions: JunctionData[] = [];
  topCameras: CameraData[] = [];

  constructor() {
    const today = new Date();
    this.endDate = today.toISOString().split('T')[0];
    const monthAgo = new Date(today);
    monthAgo.setDate(monthAgo.getDate() - 30);
    this.startDate = monthAgo.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    if (this.loading) return;

    this.loading = true;
    this.error = false;
    this.errorMessage = '';

    const startIso = `${this.startDate}T00:00:00`;
    const endIso = `${this.endDate}T23:59:59`;

    // Validate date range
    if (new Date(startIso) > new Date(endIso)) {
      this.error = true;
      this.errorMessage = 'Start date cannot be after end date';
      this.loading = false;
      return;
    }

    // Clear previous data
    this.overview = null;
    this.repeatOffenders = [];
    this.topJunctions = [];
    this.topCameras = [];

    Promise.all([
      this.loadOverview(startIso, endIso),
      this.loadRepeatOffenders(startIso, endIso),
      this.loadTopJunctions(startIso, endIso),
      this.loadTopCameras(startIso, endIso)
    ]).catch((err) => {
      this.error = true;
      this.errorMessage = err.message || 'Failed to load analytics data. Please try again.';
      console.error('Error loading data:', err);
    }).finally(() => {
      this.loading = false;
    });
  }

  onDateChange(): void {
    // Optional: Add debounce or throttle here
    this.loadData();
  }

  private loadOverview(startDate: string, endDate: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/overview?start=${startDate}&end=${endDate}`;
      console.log('🔗 API Call - Overview:', url);
      this.http.get<OverviewData>(url).subscribe({
        next: (data: OverviewData) => {
          console.log('✅ Overview Response:', data);
          console.log('🔍 Expected Fields: totalEvents (number), uniqueVehicles (number), statusCounts (array)');
          console.log('   ✓ totalEvents:', data?.totalEvents, typeof data?.totalEvents);
          console.log('   ✓ uniqueVehicles:', data?.uniqueVehicles, typeof data?.uniqueVehicles);
          console.log('   ✓ statusCounts:', data?.statusCounts);
          if (data?.statusCounts && data.statusCounts.length > 0) {
            console.log('     Sample status:', data.statusCounts[0]);
          }
          this.overview = data;
          resolve();
        },
        error: (err: any) => {
          console.error('❌ Error loading overview:', err);
          console.error('📋 Failed URL:', url);
          console.error('📊 Error Status:', err.status);
          console.error('💬 Error Message:', err.message);
          if (err.status === 0) {
            console.error('🌐 Network error: Cannot reach backend server at', this.baseUrl);
            this.errorMessage = `Cannot connect to backend server. Please verify the server at ${this.baseUrl} is running and accessible.`;
          } else if (err.status === 404) {
            this.errorMessage = `API endpoint not found: ${url}`;
          }
          reject(err);
        }
      });
    });
  }

  private loadRepeatOffenders(startDate: string, endDate: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/vehicles/repeat?start=${startDate}&end=${endDate}&min=3`;
      console.log('🔗 API Call - Repeat Offenders:', url);
      this.http.get<RepeatOffender[]>(url).subscribe({
        next: (data: RepeatOffender[]) => {
          console.log('✅ Repeat Offenders Response:', data);
          console.log('📊 Record Count:', data?.length || 0);
          if (data && data.length > 0) {
            console.log('📋 Sample Record:', data[0]);
            console.log('🔍 Expected Fields: plateNumber (string), count (number)');
            if (data[0]) {
              console.log('   ✓ plateNumber:', data[0].plateNumber, typeof data[0].plateNumber);
              console.log('   ✓ count:', data[0].count, typeof data[0].count);
            }
          }
          this.repeatOffenders = data;
          resolve();
        },
        error: (err: any) => {
          console.error('❌ Error loading repeat offenders:', err);
          console.error('📋 Failed URL:', url);
          console.error('📊 Error Status:', err.status);
          console.error('💬 Error Message:', err.message);
          reject(err);
        }
      });
    });
  }

  private loadTopJunctions(startDate: string, endDate: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/junctions/top?start=${startDate}&end=${endDate}&limit=10`;
      console.log('🔗 API Call - Top Junctions:', url);
      this.http.get<JunctionData[]>(url).subscribe({
        next: (data: JunctionData[]) => {
          console.log('✅ Top Junctions Response:', data);
          console.log('📊 Record Count:', data?.length || 0);
          if (data && data.length > 0) {
            console.log('📋 Sample Record:', data[0]);
            console.log('🔍 Expected Fields: junctionName (string), count (number)');
            if (data[0]) {
              console.log('   ✓ junctionName:', data[0].junctionName, typeof data[0].junctionName);
              console.log('   ✓ count:', data[0].count, typeof data[0].count);
            }
          }
          this.topJunctions = data || [];
          resolve();
        },
        error: (err: any) => {
          console.error('❌ Error loading top junctions:', err);
          console.error('📋 Failed URL:', url);
          console.error('📊 Error Status:', err.status);
          console.error('💬 Error Message:', err.message);
          reject(err);
        }
      });
    });
  }

  private loadTopCameras(startDate: string, endDate: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/cameras/top?start=${startDate}&end=${endDate}&limit=10`;
      console.log('🔗 API Call - Top Cameras:', url);
      this.http.get<CameraData[]>(url).subscribe({
        next: (data: CameraData[]) => {
          console.log('✅ Top Cameras Response:', data);
          console.log('📊 Record Count:', data?.length || 0);
          if (data && data.length > 0) {
            console.log('📋 Sample Record:', data[0]);
            console.log('🔍 Expected Fields: name (string), count (number)');
            if (data[0]) {
              console.log('   ✓ name:', data[0].name, typeof data[0].name);
              console.log('   ✓ count:', data[0].count, typeof data[0].count);
            }
          }
          this.topCameras = data || [];
          resolve();
        },
        error: (err: any) => {
          console.error('❌ Error loading top cameras:', err);
          console.error('📋 Failed URL:', url);
          console.error('📊 Error Status:', err.status);
          console.error('💬 Error Message:', err.message);
          reject(err);
        }
      });
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Never';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        return 'Today, ' + date.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
      } else if (diffDays === 1) {
        return 'Yesterday, ' + date.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else {
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
      }
    } catch (e) {
      console.error('Error formatting date:', e);
      return 'Invalid Date';
    }
  }

  getColorValue(colorName: string): string {
    const colors: { [key: string]: string } = {
      'red': '#dc3545',
      'blue': '#0066cc',
      'black': '#333333',
      'white': '#ffffff',
      'silver': '#c0c0c0',
      'gray': '#808080',
      'grey': '#808080',
      'green': '#28a745',
      'yellow': '#ffc107',
      'orange': '#fd7e14',
      'brown': '#8b4513',
      'gold': '#ffd700',
      'purple': '#6f42c1',
      'pink': '#e83e8c',
      'cyan': '#17a2b8',
      'maroon': '#800000',
      'navy': '#000080',
      'teal': '#008080',
      'olive': '#808000',
      'lime': '#00ff00',
      'aqua': '#00ffff',
      'magenta': '#ff00ff'
    };
    return colors[colorName?.toLowerCase()] || '#999999';
  }
}