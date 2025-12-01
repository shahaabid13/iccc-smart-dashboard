import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmcService } from '../../../services/smc.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  selector: 'app-weighbridge-charts',
  template: `
    <div class="charts-container">
      <h2>Weighbridge Analytics Dashboard</h2>

      <div class="controls">
        <div class="control-group">
          <label for="wbId">Weighbridge ID:</label>
          <input 
            id="wbId" 
            type="text" 
            [(ngModel)]="wbId" 
            placeholder="Enter WB ID"
            class="input-field"
          >
          <button (click)="loadAllCharts()" class="load-btn">Load Data</button>
        </div>
        
        <!-- Date Range Controls -->
        <div class="date-controls" *ngIf="summaryData">
          <div class="date-input-group">
            <label>From Date:</label>
            <input 
              type="date" 
              [(ngModel)]="startDate" 
              (change)="onDateChange()"
              class="input-field"
            >
          </div>
          <div class="date-input-group">
            <label>To Date:</label>
            <input 
              type="date" 
              [(ngModel)]="endDate" 
              (change)="onDateChange()"
              class="input-field"
            >
          </div>
          <div class="period-buttons">
            <button (click)="setPeriod('today')" [class.active]="selectedPeriod === 'today'">Today</button>
            <button (click)="setPeriod('yesterday')" [class.active]="selectedPeriod === 'yesterday'">Yesterday</button>
            <button (click)="setPeriod('week')" [class.active]="selectedPeriod === 'week'">This Week</button>
            <button (click)="setPeriod('month')" [class.active]="selectedPeriod === 'month'">This Month</button>
            <button (click)="setPeriod('custom')" [class.active]="selectedPeriod === 'custom'">Custom</button>
          </div>
        </div>
      </div>

      <div *ngIf="loading" class="loading">Loading chart data...</div>
      
      <div *ngIf="error" class="error">
        <h3>Failed to load chart data</h3>
        <p>{{ errorMessage }}</p>
        <button (click)="loadAllCharts()" class="retry-btn">Retry</button>
      </div>

      <!-- Summary: daily total weight & trips -->
      <div *ngIf="summaryData" class="summary-cards">
        <div class="summary-card">
          <div class="card-icon">⚖️</div>
          <div class="card-content">
            <h3>Total Net Weight</h3>
            <div class="card-value">{{ formatWeight(summaryData.totalNetWeight) }}</div>
            <div class="card-label">Weight for selected period</div>
            <div class="card-period">{{ getPeriodLabel() }}</div>
          </div>
        </div>

        <div class="summary-card">
          <div class="card-icon">🛣️</div>
          <div class="card-content">
            <h3>Total Trips</h3>
            <div class="card-value">{{ summaryData.totalTrips || 0 }}</div>
            <div class="card-label">Number of trips</div>
            <div class="card-period">{{ getPeriodLabel() }}</div>
          </div>
        </div>
      </div>

      <!-- Charts Grid -->
      <div class="charts-grid" *ngIf="!loading && !error">
        
        <!-- Net Weight Trend -->
        <div class="chart-card">
          <h3>Net Weight Trend</h3>
          <div class="chart-container">
            <canvas 
              baseChart
              [data]="netTrendChartData"
              [options]="lineChartOptions"
              [type]="lineChartType"
            >
            </canvas>
          </div>
        </div>

        <!-- Gross Weight Trend -->
        <div class="chart-card">
          <h3>Gross Weight Trend</h3>
          <div class="chart-container">
            <canvas 
              baseChart
              [data]="grossTrendChartData"
              [options]="lineChartOptions"
              [type]="lineChartType"
            >
            </canvas>
          </div>
        </div>


        <!-- Last 24 Hours -->
        <div class="chart-card">
          <h3>Last 24 Hours Trend</h3>
          <div class="chart-container">
            <canvas 
              baseChart
              [data]="last24ChartData"
              [options]="lineChartOptions"
              [type]="lineChartType"
            >
            </canvas>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .charts-container {
      padding: 20px;
      background: #f8f9fa;
      min-height: 100vh;
    }

    .controls {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      flex-wrap: wrap;
      align-items: end;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .date-controls {
      display: flex;
      gap: 15px;
      align-items: end;
      flex-wrap: wrap;
    }

    .date-input-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .date-input-group label {
      font-weight: bold;
      font-size: 14px;
    }

    .period-buttons {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .period-buttons button {
      padding: 6px 12px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }

    .period-buttons button.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }

    .input-field {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .load-btn, .retry-btn {
      background: #007bff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .load-btn:hover, .retry-btn:hover {
      background: #0056b3;
    }

    /* Enhanced Summary Cards */
    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .summary-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      border-left: 4px solid #007bff;
      display: flex;
      gap: 15px;
    }

    .card-icon {
      font-size: 2rem;
    }

    .card-content h3 {
      margin: 0 0 10px 0;
      color: #333;
      font-size: 16px;
    }

    .card-value {
      font-size: 2rem;
      font-weight: bold;
      color: #007bff;
      margin-bottom: 5px;
    }

    .card-label {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
    }

    .card-subvalue {
      font-size: 1.2rem;
      font-weight: bold;
      color: #28a745;
    }

    .card-sublabel {
      font-size: 12px;
      color: #888;
    }

    .card-period {
      font-size: 12px;
      color: #666;
      margin-top: 5px;
      font-style: italic;
    }

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
    }

    .loading {
      color: #007bff;
      padding: 20px;
      text-align: center;
      background: white;
      border-radius: 8px;
      margin: 20px 0;
    }

    .error {
      color: #dc3545;
      padding: 20px;
      background: #f8d7da;
      border: 1px solid #f5c6cb;
      border-radius: 8px;
      margin: 20px 0;
      text-align: center;
    }

    @media (max-width: 768px) {
      .charts-grid {
        grid-template-columns: 1fr;
      }
      
      .chart-card {
        min-width: unset;
      }
      
      .controls {
        flex-direction: column;
        align-items: stretch;
      }

      .date-controls {
        flex-direction: column;
        align-items: stretch;
      }

      .period-buttons {
        justify-content: center;
      }

      .summary-cards {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class WeighbridgeChartsComponent implements OnInit {
  wbId = 'SRNGR_LANDFILL_WB1';
  loading = false;
  error = false;
  errorMessage = '';
  
  // Date range properties
  startDate: string;
  endDate: string;
  selectedPeriod: string = 'week';

  // Chart data
  netTrendChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  grossTrendChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  vehicleTrendChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  last24ChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };

  // Summary data
  summaryData: any = null;

  // Chart types
  lineChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';

  // Chart options
  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Weight (kg)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      }
    }
  };

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Weight (kg)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Vehicles'
        }
      }
    }
  };

  constructor(private smcService: SmcService) {
    // Initialize with current date
    const today = new Date();
    this.endDate = today.toISOString().split('T')[0];
    this.startDate = new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.loadAllCharts();
  }

  setPeriod(period: string): void {
    this.selectedPeriod = period;
    const today = new Date();
    
    switch (period) {
      case 'today':
        this.startDate = today.toISOString().split('T')[0];
        this.endDate = today.toISOString().split('T')[0];
        break;
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        this.startDate = yesterday.toISOString().split('T')[0];
        this.endDate = yesterday.toISOString().split('T')[0];
        break;
      case 'week':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        this.startDate = weekAgo.toISOString().split('T')[0];
        this.endDate = new Date().toISOString().split('T')[0];
        break;
      case 'month':
        const monthAgo = new Date(today);
        monthAgo.setDate(monthAgo.getDate() - 30);
        this.startDate = monthAgo.toISOString().split('T')[0];
        this.endDate = new Date().toISOString().split('T')[0];
        break;
      case 'custom':
        // Keep current dates for custom selection
        break;
    }
    
    this.loadSummary();
  }

  onDateChange(): void {
    this.selectedPeriod = 'custom';
    this.loadSummary();
  }

  loadAllCharts(): void {
    if (!this.wbId) {
      this.error = true;
      this.errorMessage = 'Please enter a Weighbridge ID';
      return;
    }

    this.loading = true;
    this.error = false;

    // Load all charts and summary
    Promise.all([
      this.loadNetTrend(),
      this.loadGrossTrend(),
      this.loadVehicleTrend(),
      this.loadLast24Trend(),
      this.loadSummary()
    ]).finally(() => {
      this.loading = false;
    });
  }

  loadNetTrend(): Promise<void> {
    return new Promise((resolve) => {
      this.smcService.getNetTrend(this.wbId).subscribe({
        next: (data: any[]) => {
          this.netTrendChartData = this.createLineChartData(
            data, 
            'Net Weight Trend', 
            '#007bff'
          );
          resolve();
        },
        error: (err) => {
          console.error('Error loading net trend:', err);
          this.handleError(err);
          resolve();
        }
      });
    });
  }

  loadGrossTrend(): Promise<void> {
    return new Promise((resolve) => {
      this.smcService.getGrossTrend(this.wbId).subscribe({
        next: (data: any[]) => {
          this.grossTrendChartData = this.createLineChartData(
            data, 
            'Gross Weight Trend', 
            '#28a745'
          );
          resolve();
        },
        error: (err) => {
          console.error('Error loading gross trend:', err);
          this.handleError(err);
          resolve();
        }
      });
    });
  }

  loadVehicleTrend(): Promise<void> {
    return new Promise((resolve) => {
      this.smcService.getVehicleTrend(this.wbId).subscribe({
        next: (data: any[]) => {
          this.vehicleTrendChartData = this.createBarChartData(
            data,
            'Weight by Vehicle',
            '#ffc107'
          );
          resolve();
        },
        error: (err) => {
          console.error('Error loading vehicle trend:', err);
          this.handleError(err);
          resolve();
        }
      });
    });
  }

  loadLast24Trend(): Promise<void> {
    return new Promise((resolve) => {
      this.smcService.getLast24Trend(this.wbId).subscribe({
        next: (data: any[]) => {
          this.last24ChartData = this.createLineChartData(
            data,
            'Last 24 Hours',
            '#dc3545'
          );
          resolve();
        },
        error: (err) => {
          console.error('Error loading last 24 trend:', err);
          this.handleError(err);
          resolve();
        }
      });
    });
  }

  loadSummary(): Promise<void> {
    return new Promise((resolve) => {
      // API expects full ISO datetimes; append start-of-day and end-of-day times
      const startIso = this.startDate.includes('T') ? this.startDate : `${this.startDate}T00:00:00`;
      const endIso = this.endDate.includes('T') ? this.endDate : `${this.endDate}T23:59:59`;

      this.smcService.getSummary(startIso, endIso, this.wbId).subscribe({
        next: (data: any) => {
          this.summaryData = data;
          resolve();
        },
        error: (err) => {
          console.error('Error loading summary:', err);
          this.handleError(err);
          resolve();
        }
      });
    });
  }

  private createLineChartData(apiData: any[], label: string, borderColor: string): ChartConfiguration['data'] {
    const labels = apiData.map(item => this.formatDate(item.date || item.time));
    const data = apiData.map(item => item.weight || item.netWeight || item.grossWeight || 0);

    return {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor,
          backgroundColor: this.hexToRgba(borderColor, 0.1),
          tension: 0.4,
          fill: true
        }
      ]
    };
  }

  private createBarChartData(apiData: any[], label: string, backgroundColor: string): ChartConfiguration['data'] {
    const labels = apiData.map(item => item.vehicleNumber || item.vehicle || 'Unknown');
    const data = apiData.map(item => item.weight || item.netWeight || 0);

    return {
      labels,
      datasets: [
        {
          label,
          data,
          backgroundColor,
          borderColor: backgroundColor,
          borderWidth: 1
        }
      ]
    };
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private handleError(error: any): void {
    this.error = true;
    this.errorMessage = error?.message || 'Failed to load chart data';
  }

  formatWeight(weight: number): string {
    if (!weight) return '0 kg';
    if (weight >= 1000) {
      return (weight / 1000).toFixed(1) + ' tons';
    }
    return weight + ' kg';
  }

  getPeriodLabel(): string {
    if (this.startDate === this.endDate) {
      return this.startDate;
    }
    return `${this.startDate} to ${this.endDate}`;
  }
}