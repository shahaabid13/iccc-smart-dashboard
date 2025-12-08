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

      <div class="charts-grid" *ngIf="!loading && !error">
        <div class="chart-card">
          <h3>Monthly/Daily Net Weight Trend</h3>
          <div class="chart-container">
            <div *ngIf="!netTrendChartData.labels || netTrendChartData.labels.length === 0" class="no-data-message">
              No data available for the selected period
            </div>
            <canvas 
              *ngIf="netTrendChartData.labels && netTrendChartData.labels.length > 0"
              baseChart
              [data]="netTrendChartData"
              [options]="getWeightTrendChartOptions('Day')"
              [type]="barChartType"
            >
            </canvas>
          </div>
        </div>

        <div class="chart-card">
          <h3>Last 24 Hours Trend</h3>
          <div class="chart-container">
            <div *ngIf="!last24ChartData.labels || last24ChartData.labels.length === 0" class="no-data-message">
              No data available for the selected period
            </div>
            <canvas 
              *ngIf="last24ChartData.labels && last24ChartData.labels.length > 0"
              baseChart
              [data]="last24ChartData"
              [options]="getWeightTrendChartOptions('Hour')"
              [type]="barChartType"
            >
            </canvas>
          </div>
        </div>

        <!-- New Weekly/Monthly Timeframe Chart -->
        <div class="chart-card timeframe-chart">
          <div class="timeframe-header">
            <h3>Timeframe Analysis</h3>
            <div class="timeframe-controls">
              <div class="timeframe-date-inputs">
                <div class="timeframe-date-input-group">
                  <label>From Date:</label>
                  <input 
                    type="date" 
                    [(ngModel)]="startDate" 
                    (change)="onDateChange()"
                    class="input-field"
                  >
                </div>
                <div class="timeframe-date-input-group">
                  <label>To Date:</label>
                  <input 
                    type="date" 
                    [(ngModel)]="endDate" 
                    (change)="onDateChange()"
                    class="input-field"
                  >
                </div>
              </div>
              <div class="timeframe-dropdown">
                <label for="timeframe">Timeframe:</label>
                <select 
                  id="timeframe" 
                  [(ngModel)]="selectedTimeframe" 
                  (change)="onTimeframeChange()"
                  class="timeframe-select"
                >
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="QUARTERLY">Quarterly</option>
                  <option value="HALF_YEARLY">Half-Yearly</option>
                  <option value="YEARLY">Yearly</option>
                </select>
              </div>
              <div class="timeframe-date-range">
                <span class="date-range-label">{{ getTimeframeDateRange() }}</span>
              </div>
            </div>
          </div>
          <div class="chart-container">
            <div *ngIf="!timeframeChartData.labels || timeframeChartData.labels.length === 0" class="no-data-message">
              No data available for the selected period
            </div>
            <canvas 
              *ngIf="timeframeChartData.labels && timeframeChartData.labels.length > 0"
              baseChart
              [data]="timeframeChartData"
              [options]="getTimeframeChartOptions()"
              [type]="barChartType"
            >
            </canvas>
          </div>
          <div class="timeframe-summary" *ngIf="timeframeSummary">
            <div class="timeframe-summary-item">
              <span class="summary-label">Total Periods:</span>
              <span class="summary-value">{{ timeframeSummary.totalPeriods }}</span>
            </div>
            <div class="timeframe-summary-item">
              <span class="summary-label">Total Weight:</span>
              <span class="summary-value">{{ formatWeight(timeframeSummary.totalWeight) }}</span>
            </div>
            <div class="timeframe-summary-item">
              <span class="summary-label">Avg per Period:</span>
              <span class="summary-value">{{ formatWeight(timeframeSummary.averagePerPeriod) }}</span>
            </div>
            <div class="timeframe-summary-item">
              <span class="summary-label">Total Trips:</span>
              <span class="summary-value">{{ timeframeSummary.totalTrips }}</span>
            </div>
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
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .no-data-message {
      color: #999;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      padding: 40px 20px;
    }

    /* Timeframe Chart Styles */
    .timeframe-chart {
      grid-column: span 2;
    }

    .timeframe-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      flex-wrap: wrap;
      gap: 10px;
    }

    .timeframe-controls {
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .timeframe-date-inputs {
      display: flex;
      gap: 15px;
      align-items: center;
    }

    .timeframe-date-input-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .timeframe-date-input-group label {
      font-size: 12px;
      font-weight: bold;
      color: #555;
    }

    .timeframe-date-input-group input {
      padding: 6px 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 13px;
      min-width: 130px;
    }

    .timeframe-dropdown {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .timeframe-dropdown label {
      font-size: 14px;
      font-weight: bold;
      color: #555;
    }

    .timeframe-select {
      padding: 6px 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      background: white;
      min-width: 120px;
    }

    .timeframe-date-range {
      padding: 6px 12px;
      background: #e9ecef;
      border-radius: 4px;
      border: 1px solid #dee2e6;
    }

    .date-range-label {
      font-size: 12px;
      color: #495057;
      font-weight: 500;
    }

    .timeframe-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin-top: 20px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
      border-left: 4px solid #28a745;
    }

    .timeframe-summary-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .summary-label {
      font-size: 11px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .summary-value {
      font-size: 14px;
      font-weight: bold;
      color: #333;
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
      
      .timeframe-chart {
        grid-column: span 1;
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

      .timeframe-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .timeframe-controls {
        width: 100%;
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
      }

      .timeframe-dropdown {
        width: 100%;
      }

      .timeframe-select {
        flex: 1;
      }

      .timeframe-date-range {
        width: 100%;
        text-align: center;
      }

      .timeframe-summary {
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
  debugInfo = true;
  
  // Date range properties
  startDate: string;
  endDate: string;
  selectedPeriod: string = 'week';

  // Timeframe properties
  selectedTimeframe: string = 'WEEKLY';
  timeframeChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  timeframeSummary: any = null;

  // Chart data
  netTrendChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  last24ChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };

  // Summary data
  summaryData: any = null;

  // Chart types
  barChartType: ChartType = 'bar';

  // Base chart options
  baseChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Weight (kg)'
        },
        ticks: {
          callback: (value) => {
            const numValue = Number(value);
            if (numValue >= 1000) {
              return (numValue / 1000).toFixed(1) + ' tons';
            }
            return numValue + ' kg';
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            const value = Number(context.parsed.y);
            if (value >= 1000) {
              label += (value / 1000).toFixed(2) + ' tons';
            } else {
              label += value + ' kg';
            }
            return label;
          }
        }
      }
    }
  };

  constructor(private smcService: SmcService) {
    const today = new Date();
    this.endDate = today.toISOString().split('T')[0];
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    this.startDate = weekAgo.toISOString().split('T')[0];
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
        break;
    }
    
    this.loadSummary();
    this.loadNetTrend();
    this.loadTimeframeData();
  }

  onDateChange(): void {
    this.selectedPeriod = 'custom';
    this.loadSummary();
    this.loadNetTrend();
    this.loadTimeframeData();
  }

  onTimeframeChange(): void {
    this.loadTimeframeData();
  }

  getTimeframeDateRange(): string {
    if (this.startDate === this.endDate) {
      return `Date: ${this.formatDateDisplay(this.startDate)}`;
    }
    return `Date Range: ${this.formatDateDisplay(this.startDate)} to ${this.formatDateDisplay(this.endDate)}`;
  }

  private formatDateDisplay(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  }

  loadAllCharts(): void {
    if (!this.wbId) {
      this.error = true;
      this.errorMessage = 'Please enter a Weighbridge ID';
      return;
    }

    this.loading = true;
    this.error = false;

    Promise.all([
      this.loadNetTrend(),
      this.loadLast24Trend(),
      this.loadSummary(),
      this.loadTimeframeData()
    ]).finally(() => {
      this.loading = false;
    });
  }

  loadNetTrend(): Promise<void> {
    return new Promise((resolve) => {
      this.smcService.getNetTrend(this.wbId, this.startDate, this.endDate).subscribe({
        next: (data: any[]) => {
          console.log('Net Trend Data:', data);
          this.netTrendChartData = this.createBarChartData(
            data, 
            'Net Weight (kg)', 
            '#007bff',
            'daily'
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

  loadLast24Trend(): Promise<void> {
    return new Promise((resolve) => {
      this.smcService.getLast24Trend(this.wbId).subscribe({
        next: (data: any[]) => {
          console.log('Last 24 Trend Data:', data);
          this.last24ChartData = this.createBarChartData(
            data,
            'Net Weight (kg)',
            '#dc3545',
            'hourly'
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

  loadTimeframeData(): Promise<void> {
    return new Promise((resolve) => {
      this.smcService.getTimeframeData(
        this.wbId, 
        this.startDate, 
        this.endDate, 
        this.selectedTimeframe
      ).subscribe({
        next: (data: any[]) => {
          console.log('Timeframe Data:', data);
          this.timeframeChartData = this.createTimeframeChartData(data);
          this.calculateTimeframeSummary(data);
          resolve();
        },
        error: (err: any) => {
          console.error('Error loading timeframe data:', err);
          this.handleTimeframeError(err);
          resolve();
        }
      });
    });
  }

  private createTimeframeChartData(data: any[]): ChartConfiguration['data'] {
    console.log('Creating timeframe chart data:', data);
    
    if (!data || data.length === 0) {
      return { labels: [], datasets: [] };
    }

    // Log what we're receiving for debugging
    console.log('Raw timeframe data items:', data.map(item => ({
      periodName: item.periodName,
      totalNetWeight: item.totalNetWeight,
      weight: item.weight,
      netWeight: item.netWeight,
      value: item.value
    })));

    // Filter out entries with no weight data (but allow 0 values that are explicitly set)
    // Only filter if the item has no weight properties at all
    const filteredData = data.filter(item => {
      const weight = item.totalNetWeight || item.weight || item.netWeight || item.value;
      // Include items that have a weight property, even if it's 0
      return weight !== null && weight !== undefined;
    });

    console.log(`Filtered timeframe data: ${filteredData.length} periods with data from ${data.length} total`);

    if (filteredData.length === 0) {
      console.warn('No data found after filtering. Raw data:', data);
      return { labels: [], datasets: [] };
    }

    const labels = filteredData.map(item => {
      if (item.periodName) {
        return this.formatTimeframeLabel(item.periodName, this.selectedTimeframe);
      } else if (item.period) {
        return item.period;
      } else if (item.date) {
        return this.formatDateForTimeframe(item.date, this.selectedTimeframe);
      }
      return 'Unknown';
    });
    
    const weights = filteredData.map(item => {
      const weight = item.totalNetWeight || item.weight || item.netWeight || item.value || 0;
      return weight;
    });
    
    const backgroundColor = this.getTimeframeColor(this.selectedTimeframe);

    return {
      labels,
      datasets: [
        {
          label: this.getTimeframeLabel(),
          data: weights,
          backgroundColor,
          borderColor: backgroundColor,
          borderWidth: 1,
          barPercentage: 0.6,
          categoryPercentage: 0.8,
        }
      ]
    };
  }

  private formatTimeframeLabel(label: string, timeframe: string): string {
    switch (timeframe) {
      case 'WEEKLY':
        // Format: "Week 1: 02 Dec to 08 Dec (7 days)" -> "Week 1"
        const weekMatch = label.match(/Week (\d+):/);
        return weekMatch ? `Week ${weekMatch[1]}` : label;
      
      case 'MONTHLY':
        // Format: "December 2024" -> "Dec 2024"
        return label;
      
      case 'QUARTERLY':
        // Format: "Quarter 1, 2024" -> "Q1 2024"
        const quarterMatch = label.match(/Quarter (\d+), (\d+)/);
        return quarterMatch ? `Q${quarterMatch[1]} ${quarterMatch[2]}` : label;
      
      case 'HALF_YEARLY':
        // Format: "First Half, 2024" -> "H1 2024"
        if (label.includes('First Half')) {
          return `H1 ${label.match(/\d+/)?.[0] || ''}`;
        } else if (label.includes('Second Half')) {
          return `H2 ${label.match(/\d+/)?.[0] || ''}`;
        }
        return label;
      
      case 'YEARLY':
        // Format: "Year 2024" -> "2024"
        const yearMatch = label.match(/\d+/);
        return yearMatch ? yearMatch[0] : label;
      
      default:
        return label;
    }
  }

  private formatDateForTimeframe(dateString: string, timeframe: string): string {
    const date = new Date(dateString);
    
    switch (timeframe) {
      case 'WEEKLY':
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
      
      case 'MONTHLY':
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          year: 'numeric' 
        });
      
      case 'QUARTERLY':
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        return `Q${quarter} ${date.getFullYear()}`;
      
      case 'HALF_YEARLY':
        const half = date.getMonth() < 6 ? 'H1' : 'H2';
        return `${half} ${date.getFullYear()}`;
      
      case 'YEARLY':
        return date.getFullYear().toString();
      
      default:
        return dateString;
    }
  }

  private getTimeframeLabel(): string {
    switch (this.selectedTimeframe) {
      case 'WEEKLY': return 'Weekly Net Weight';
      case 'MONTHLY': return 'Monthly Net Weight';
      case 'QUARTERLY': return 'Quarterly Net Weight';
      case 'HALF_YEARLY': return 'Half-Yearly Net Weight';
      case 'YEARLY': return 'Yearly Net Weight';
      default: return 'Net Weight';
    }
  }

  private getTimeframeColor(timeframe: string): string {
    switch (timeframe) {
      case 'WEEKLY': return '#28a745';
      case 'MONTHLY': return '#17a2b8';
      case 'QUARTERLY': return '#ffc107';
      case 'HALF_YEARLY': return '#fd7e14';
      case 'YEARLY': return '#6f42c1';
      default: return '#28a745';
    }
  }

  private calculateTimeframeSummary(data: any[]): void {
    if (!data || data.length === 0) {
      this.timeframeSummary = {
        totalPeriods: 0,
        totalWeight: 0,
        averagePerPeriod: 0,
        totalTrips: 0
      };
      return;
    }

    // Include all periods that have weight data (including 0)
    const dataWithValues = data.filter(item => {
      const weight = item.totalNetWeight || item.weight || item.netWeight || item.value;
      return weight !== null && weight !== undefined;
    });

    console.log('Data with values for summary:', dataWithValues);

    const totalWeight = dataWithValues.reduce((sum, item) => 
      sum + (item.totalNetWeight || item.weight || item.netWeight || item.value || 0), 0
    );
    
    const totalTrips = dataWithValues.reduce((sum, item) => 
      sum + (item.totalEntries || item.trips || 0), 0
    );

    this.timeframeSummary = {
      totalPeriods: dataWithValues.length,
      totalWeight,
      averagePerPeriod: dataWithValues.length > 0 ? totalWeight / dataWithValues.length : 0,
      totalTrips
    };
  }

  private handleTimeframeError(error: any): void {
    console.warn('Could not load timeframe data, showing empty state');
    
    // Show empty chart instead of fake data
    this.timeframeChartData = { labels: [], datasets: [] };
    this.timeframeSummary = {
      totalPeriods: 0,
      totalWeight: 0,
      averagePerPeriod: 0,
      totalTrips: 0
    };
  }

  private createBarChartData(
    apiData: any[], 
    label: string, 
    backgroundColor: string,
    dataType: 'daily' | 'hourly'
  ): ChartConfiguration['data'] {
    
    console.log(`Creating ${dataType} chart data:`, apiData);
    
    // Filter out entries with zero or no weight data
    const filteredData = apiData.filter(item => {
      const weight = item.weight || item.netWeight || item.value || item.totalWeight || 0;
      return weight > 0;
    });

    console.log(`Filtered data (only non-zero): ${filteredData.length} entries from ${apiData.length}`);
    
    const labels = filteredData.map((item, index) => {
      const dateValue = item.dateTime || item.date || item.time || item.day || item.hour || item.label || item.period;
      const formattedLabel = this.formatLabel(dateValue, dataType);
      return formattedLabel;
    });
    
    const data = filteredData.map(item => {
      return item.weight || item.netWeight || item.value || item.totalWeight || 0;
    });

    return {
      labels,
      datasets: [
        {
          label,
          data,
          backgroundColor,
          borderColor: backgroundColor,
          borderWidth: 1,
          barPercentage: 0.8,
          categoryPercentage: 0.8,
        }
      ]
    };
  }
  
  private formatLabel(labelString: any, dataType: 'daily' | 'hourly'): string {
    console.log(`Formatting label for ${dataType}:`, labelString, 'Type:', typeof labelString);
    
    if (!labelString) return 'Unknown';
    
    if (typeof labelString === 'string') {
      if (labelString.includes('T')) {
        const date = new Date(labelString);
        if (!isNaN(date.getTime())) {
          if (dataType === 'hourly') {
            return date.toLocaleTimeString('en-US', { 
              hour: 'numeric',
              hour12: true,
              minute: '2-digit'
            });
          } else {
            return date.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            });
          }
        }
      }
      else if (/^\d{4}-\d{2}-\d{2}$/.test(labelString)) {
        const date = new Date(labelString + 'T00:00:00');
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          });
        }
      }
      else if (/^\d{2}:\d{2}/.test(labelString)) {
        const timeParts = labelString.split(':');
        const hour = parseInt(timeParts[0], 10);
        if (hour === 0) return '12 AM';
        if (hour === 12) return '12 PM';
        return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
      }
      else if (/^\d+$/.test(labelString)) {
        const dayNum = parseInt(labelString, 10);
        return `Day ${dayNum}`;
      }
    }
    
    if (typeof labelString === 'number') {
      if (dataType === 'hourly') {
        const hour = labelString % 24;
        if (hour === 0) return '12 AM';
        if (hour === 12) return '12 PM';
        return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
      } else {
        return `Day ${labelString}`;
      }
    }
    
    return String(labelString);
  }

  getWeightTrendChartOptions(xAxisLabel: 'Day' | 'Hour'): ChartConfiguration['options'] {
    return {
      ...this.baseChartOptions,
      scales: {
        ...(this.baseChartOptions?.scales as any || {}),
        x: {
          title: {
            display: true,
            text: xAxisLabel
          },
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        }
      }
    };
  }

  getTimeframeChartOptions(): ChartConfiguration['options'] {
    return {
      ...this.baseChartOptions,
      scales: {
        ...(this.baseChartOptions?.scales as any || {}),
        x: {
          title: {
            display: true,
            text: this.getTimeframeXAxisLabel()
          },
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        }
      }
    };
  }

  private getTimeframeXAxisLabel(): string {
    switch (this.selectedTimeframe) {
      case 'WEEKLY': return 'Week';
      case 'MONTHLY': return 'Month';
      case 'QUARTERLY': return 'Quarter';
      case 'HALF_YEARLY': return 'Half Year';
      case 'YEARLY': return 'Year';
      default: return 'Period';
    }
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