import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import {  HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule, HttpClientModule],
  selector: 'app-anpr-analytics-charts',
  template: `
    <div class="analytics-container">
      <h2>ANPR Analytics - Charts</h2>

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
        <button (click)="loadData()" class="load-btn" [disabled]="loading">
          {{ loading ? 'Loading...' : 'Load Data' }}
        </button>
      </div>

      <!-- Loading/Error States -->
      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading charts...</p>
      </div>
      <div *ngIf="error" class="error">
        <p>{{ errorMessage }}</p>
        <button (click)="loadData()" class="retry-btn">Retry</button>
      </div>

      <!-- Charts Grid -->
      <div class="charts-grid" *ngIf="!loading && !error">
        <!-- Hourly Trend Chart -->
        <div class="chart-card">
          <h3>Events - Hourly Trend</h3>
          <div class="chart-container">
            <div *ngIf="!hourlyTrendData.labels || hourlyTrendData.labels.length === 0" class="no-data-message">
              No data available for the selected date range
            </div>
            <canvas 
              *ngIf="hourlyTrendData.labels && hourlyTrendData.labels.length > 0"
              baseChart
              [data]="hourlyTrendData"
              [options]="getLineChartOptions('Hour')"
              [type]="'line'"
            >
            </canvas>
          </div>
        </div>

        <!-- Daily Trend Chart -->
        <div class="chart-card">
          <h3>Events - Daily Trend</h3>
          <div class="chart-container">
            <div *ngIf="!dailyTrendData.labels || dailyTrendData.labels.length === 0" class="no-data-message">
              No data available for the selected date range
            </div>
            <canvas 
              *ngIf="dailyTrendData.labels && dailyTrendData.labels.length > 0"
              baseChart
              [data]="dailyTrendData"
              [options]="getLineChartOptions('Day')"
              [type]="'line'"
            >
            </canvas>
          </div>
        </div>

        <!-- Top Junctions Chart -->
        <div class="chart-card">
          <h3>Events by Top Junctions</h3>
          <div class="chart-container">
            <div *ngIf="!topJunctionsData.labels || topJunctionsData.labels.length === 0" class="no-data-message">
              No data available for the selected date range
            </div>
            <canvas 
              *ngIf="topJunctionsData.labels && topJunctionsData.labels.length > 0"
              baseChart
              [data]="topJunctionsData"
              [options]="getBarChartOptions('Junctions')"
              [type]="'bar'"
            >
            </canvas>
          </div>
        </div>

        <!-- Top Cameras Chart -->
        <div class="chart-card">
          <h3>Events by Top Cameras</h3>
          <div class="chart-container">
            <div *ngIf="!topCamerasData.labels || topCamerasData.labels.length === 0" class="no-data-message">
              No data available for the selected date range
            </div>
            <canvas 
              *ngIf="topCamerasData.labels && topCamerasData.labels.length > 0"
              baseChart
              [data]="topCamerasData"
              [options]="getBarChartOptions('Cameras')"
              [type]="'bar'"
            >
            </canvas>
          </div>
        </div>

        <!-- Vehicle Color Distribution Chart -->
        <div class="chart-card">
          <h3>Events by Vehicle Color</h3>
          <div class="chart-container">
            <div *ngIf="!vehicleColorData.labels || vehicleColorData.labels.length === 0" class="no-data-message">
              No data available for the selected date range
            </div>
            <canvas 
              *ngIf="vehicleColorData.labels && vehicleColorData.labels.length > 0"
              baseChart
              [data]="vehicleColorData"
              [options]="getPieChartOptions()"
              [type]="'pie'"
            >
            </canvas>
          </div>
        </div>

        <!-- Speed Distribution Chart -->
        <div class="chart-card">
          <h3>Speed Distribution</h3>
          <div class="chart-container">
            <div *ngIf="!speedDistributionData.labels || speedDistributionData.labels.length === 0" class="no-data-message">
              No data available for the selected date range
            </div>
            <canvas 
              *ngIf="speedDistributionData.labels && speedDistributionData.labels.length > 0"
              baseChart
              [data]="speedDistributionData"
              [options]="getBarChartOptions('Speed Range')"
              [type]="'bar'"
            >
            </canvas>
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
    }

    .date-input-group label {
      font-weight: bold;
      font-size: 14px;
      color: #333;
    }

    .input-field {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      width: 200px;
    }

    .input-field:disabled {
      background: #f5f5f5;
      cursor: not-allowed;
    }

    .load-btn {
      padding: 8px 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: background-color 0.3s;
    }

    .load-btn:hover:not(:disabled) {
      background: #0056b3;
    }

    .load-btn:disabled {
      background: #cccccc;
      cursor: not-allowed;
    }

    .retry-btn {
      margin-top: 10px;
      padding: 8px 15px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    }

    .retry-btn:hover {
      background: #c82333;
    }

    /* Charts Grid */
    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 20px;
    }

    .chart-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      height: fit-content;
    }

    .chart-card h3 {
      margin: 0 0 15px 0;
      color: #122e52;
      font-size: 16px;
    }

    .chart-container {
      position: relative;
      height: 300px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .no-data-message {
      color: #999;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      padding: 20px;
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

    @media (max-width: 768px) {
      .controls {
        flex-direction: column;
        align-items: stretch;
      }

      .input-field {
        width: 100%;
      }

      .charts-grid {
        grid-template-columns: 1fr;
      }

      .chart-container {
        height: 250px;
      }
    }
  `]
})
export class AnprAnalyticsChartsComponent implements OnInit {
  // Properties
  startDate: string;
  endDate: string;
  loading = false;
  error = false;
  errorMessage = '';

  // Chart data properties
  hourlyTrendData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  dailyTrendData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  topJunctionsData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  topCamerasData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  vehicleColorData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  speedDistributionData: ChartConfiguration['data'] = { datasets: [], labels: [] };

  // Inject HTTP client
  private http = inject(HttpClient);
  private baseUrl = '/api/analytics';

  constructor() {
    // Initialize date range (last 30 days)
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
    this.resetChartData();

    Promise.all([
      this.loadHourlyTrend(startIso, endIso),
      this.loadDailyTrend(startIso, endIso),
      this.loadTopJunctions(startIso, endIso),
      this.loadTopCameras(startIso, endIso),
      this.loadVehicleColors(startIso, endIso),
      this.loadSpeedDistribution(startIso, endIso)
    ]).catch((err) => {
      this.error = true;
      this.errorMessage = err.message || 'Failed to load analytics data';
      console.error('Error loading data:', err);
    }).finally(() => {
      this.loading = false;
    });
  }

  onDateChange(): void {
    // Optional: Add debounce here for better UX
    this.loadData();
  }

  private resetChartData(): void {
    this.hourlyTrendData = { datasets: [], labels: [] };
    this.dailyTrendData = { datasets: [], labels: [] };
    this.topJunctionsData = { datasets: [], labels: [] };
    this.topCamerasData = { datasets: [], labels: [] };
    this.vehicleColorData = { datasets: [], labels: [] };
    this.speedDistributionData = { datasets: [], labels: [] };
  }

  private loadHourlyTrend(startDate: string, endDate: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/trend/hourly?start=${startDate}&end=${endDate}`;
      console.log('🔗 API Call - Hourly Trend:', url);
      this.http.get<any[]>(url).subscribe({
        next: (data) => {
          console.log('✅ Hourly Trend Response:', data);
          console.log('📊 Record Count:', data?.length || 0);
          if (data && data.length > 0) {
            console.log('📋 Sample Record:', data[0]);
            console.log('🔍 Expected Fields: time (ISO string), count (number)');
            console.log('   ✓ time:', data[0].time, typeof data[0].time);
            console.log('   ✓ count:', data[0].count, typeof data[0].count);
          }
          this.hourlyTrendData = this.createLineChartData(data, 'Events', '#007bff', 'hour');
          resolve();
        },
        error: (err: any) => {
          console.error('❌ Error loading hourly trend:', err);
          console.error('📋 Failed URL:', url);
          console.error('📊 Error Status:', err.status);
          console.error('💬 Error Message:', err.message);
          reject(err);
        }
      });
    });
  }

  private loadDailyTrend(startDate: string, endDate: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/trend/daily?start=${startDate}&end=${endDate}`;
      console.log('🔗 API Call - Daily Trend:', url);
      this.http.get<any[]>(url).subscribe({
        next: (data) => {
          console.log('✅ Daily Trend Response:', data);
          console.log('📊 Record Count:', data?.length || 0);
          if (data && data.length > 0) {
            console.log('📋 Sample Record:', data[0]);
            console.log('🔍 Expected Fields: time (ISO string), count (number)');
            console.log('   ✓ time:', data[0].time, typeof data[0].time);
            console.log('   ✓ count:', data[0].count, typeof data[0].count);
          }
          this.dailyTrendData = this.createLineChartData(data, 'Events', '#28a745', 'day');
          resolve();
        },
        error: (err: any) => {
          console.error('❌ Error loading daily trend:', err);
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
      this.http.get<any[]>(url).subscribe({
        next: (data) => {
          console.log('✅ Top Junctions Response:', data);
          console.log('📊 Record Count:', data?.length || 0);
          if (data && data.length > 0) {
            console.log('📋 Sample Record:', data[0]);
            console.log('🔍 Expected Fields: junctionName (string), count (number)');
            console.log('   ✓ junctionName:', data[0].junctionName, typeof data[0].junctionName);
            console.log('   ✓ count:', data[0].count, typeof data[0].count);
          }
          const labels = data.map((d: any) => 
            d.junctionName || 'Unknown Junction'
          );
          const values = data.map((d: any) => d.count || 0);
          
          this.topJunctionsData = {
            labels,
            datasets: [{
              label: 'Events',
              data: values,
              backgroundColor: '#fd7e14',
              borderColor: '#fd7e14',
              borderWidth: 1,
              borderRadius: 4
            }]
          };
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
      this.http.get<any[]>(url).subscribe({
        next: (data) => {
          console.log('✅ Top Cameras Response:', data);
          console.log('📊 Record Count:', data?.length || 0);
          if (data && data.length > 0) {
            console.log('📋 Sample Record:', data[0]);
            console.log('🔍 Expected Fields: name (string), count (number)');
            console.log('   ✓ name:', data[0].name, typeof data[0].name);
            console.log('   ✓ count:', data[0].count, typeof data[0].count);
          }
          const labels = data.map((d: any) => 
            d.name || 'Unknown Camera'
          );
          const values = data.map((d: any) => d.count || 0);
          
          this.topCamerasData = {
            labels,
            datasets: [{
              label: 'Events',
              data: values,
              backgroundColor: '#6f42c1',
              borderColor: '#6f42c1',
              borderWidth: 1,
              borderRadius: 4
            }]
          };
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

  private loadVehicleColors(startDate: string, endDate: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/vehicles/colors?start=${startDate}&end=${endDate}`;
      console.log('🔗 API Call - Vehicle Colors:', url);
      this.http.get<any[]>(url).subscribe({
        next: (data) => {
          console.log('✅ Vehicle Colors Response:', data);
          console.log('📊 Record Count:', data?.length || 0);
          if (data && data.length > 0) {
            console.log('📋 Sample Record:', data[0]);
            console.log('🔍 Expected Fields: name (string), count (number)');
            console.log('   ✓ name:', data[0].name, typeof data[0].name);
            console.log('   ✓ count:', data[0].count, typeof data[0].count);
          }
          const labels = data.map((d: any) => d.name || 'Unknown');
          const values = data.map((d: any) => d.count || 0);
          const colors = labels.map((colorName: string) => this.getColorCode(colorName));
          
          this.vehicleColorData = {
            labels,
            datasets: [{
              label: 'Events',
              data: values,
              backgroundColor: colors,
              borderColor: '#fff',
              borderWidth: 2,
              hoverOffset: 10
            }]
          };
          resolve();
        },
        error: (err: any) => {
          console.error('❌ Error loading vehicle colors:', err);
          console.error('📋 Failed URL:', url);
          console.error('📊 Error Status:', err.status);
          console.error('💬 Error Message:', err.message);
          reject(err);
        }
      });
    });
  }

  private loadSpeedDistribution(startDate: string, endDate: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/vehicles/speed?start=${startDate}&end=${endDate}`;
      console.log('🔗 API Call - Speed Distribution:', url);
      this.http.get<any[]>(url).subscribe({
        next: (data) => {
          console.log('✅ Speed Distribution Response:', data);
          console.log('📊 Record Count:', data?.length || 0);
          if (data && data.length > 0) {
            console.log('📋 Sample Record:', data[0]);
            console.log('🔍 Expected Fields: name (string), count (number)');
            console.log('   ✓ name:', data[0].name, typeof data[0].name);
            console.log('   ✓ count:', data[0].count, typeof data[0].count);
          }
          const labels = data.map((d: any) => d.name || 'Unknown');
          const values = data.map((d: any) => d.count || 0);
          
          this.speedDistributionData = {
            labels,
            datasets: [{
              label: 'Events',
              data: values,
              backgroundColor: '#17a2b8',
              borderColor: '#17a2b8',
              borderWidth: 1,
              borderRadius: 4
            }]
          };
          resolve();
        },
        error: (err: any) => {
          console.error('❌ Error loading speed distribution:', err);
          console.error('📋 Failed URL:', url);
          console.error('📊 Error Status:', err.status);
          console.error('💬 Error Message:', err.message);
          reject(err);
        }
      });
    });
  }

  private createLineChartData(data: any[], label: string, color: string, type: 'hour' | 'day'): ChartConfiguration['data'] {
    if (!data || data.length === 0) {
      return { labels: [], datasets: [] };
    }

    // Sort data by time
    const sortedData = [...data].sort((a, b) => 
      new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    const labels = sortedData.map(item => {
      try {
        const date = new Date(item.time);
        if (type === 'hour') {
          return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          });
        } else {
          return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          });
        }
      } catch (e) {
        return 'Invalid Date';
      }
    });

    const values = sortedData.map(item => item.count || 0);

    return {
      labels,
      datasets: [{
        label,
        data: values,
        borderColor: color,
        backgroundColor: color + '20',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: color,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    };
  }

  getLineChartOptions(xLabel: string): ChartConfiguration['options'] {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Events',
            font: {
              weight: 'bold'
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          title: {
            display: true,
            text: xLabel,
            font: {
              weight: 'bold'
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'nearest'
      }
    };
  }

  getBarChartOptions(xLabel: string): ChartConfiguration['options'] {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Events',
            font: {
              weight: 'bold'
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          title: {
            display: true,
            text: xLabel,
            font: {
              weight: 'bold'
            }
          },
          grid: {
            display: false
          },
          ticks: {
            maxRotation: 45,
            minRotation: 0,
            autoSkip: true,
            maxTicksLimit: 10
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          }
        }
      }
    };
  }

  getPieChartOptions(): ChartConfiguration['options'] {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.raw as number;
              const datasetData = context.dataset.data;
              const total = datasetData.reduce((acc: number, curr: any) => {
                const num = typeof curr === 'number' ? curr : (curr?.y || 0);
                return acc + num;
              }, 0);
              const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
              return `${label}: ${value} (${percentage}%)`;
            }
          },
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }
      }
    };
  }

  private getColorCode(colorName: string): string {
    const colors: { [key: string]: string } = {
      'red': '#dc3545',
      'blue': '#0066cc',
      'black': '#333333',
      'white': '#e9ecef',
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