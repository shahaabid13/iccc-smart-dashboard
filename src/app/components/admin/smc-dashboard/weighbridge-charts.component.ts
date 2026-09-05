import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmcService } from '../../../services/smc.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { TimeFrameDataDTO } from '../../../services/timeframe.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  selector: 'app-weighbridge-charts',
  template: `
    <div class="charts-container">
      <h2>Weighbridge Analytics Dashboard</h2>

      <div class="controls">
        <div class="control-group">
          <label for="wbId">Weighbridge:</label>
          <ng-container *ngIf="(weighbridgeOptions?.length ?? 0) > 0; else wbTextInput">
            <select
              id="wbId"
              [(ngModel)]="selectedWbId"
              (change)="onWeighbridgeChange()"
              class="input-field"
            >
              <option *ngFor="let option of weighbridgeOptions" [value]="option.id">
                {{ option.label }}
              </option>
            </select>
          </ng-container>
          <ng-template #wbTextInput>
            <input
              id="wbId"
              type="text"
              [(ngModel)]="wbId"
              placeholder="Enter WB ID"
              class="input-field"
            >
          </ng-template>

          <div class="filter-actions">
            <button (click)="loadCharts()" class="load-btn">Apply</button>
            <button type="button" (click)="resetFilters()" class="reset-btn">Reset</button>
          </div>
        </div>
        
        <div class="date-controls">
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
        <button (click)="loadCharts()" class="retry-btn">Retry</button>
      </div>

      <div *ngIf="summaryData" class="summary-cards">
       <div class="summary-card">
          <div class="card-icon">📊</div>
          <div class="card-content">
            <h3>Total Net Weight (All Time)</h3>
            <div class="card-value">{{ formatWeight(allTimeNetWeight) }}</div>
            <div class="card-label">Cumulative weight since data start</div>
            <div class="card-period">Nov 21, 2025 to Current</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="card-icon">⚖️</div>
          <div class="card-content">
            <h3>Net Weight</h3>
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
          <h3>Monthly Net Weight Trend</h3>
          <div class="chart-container">
            <div *ngIf="!netTrendChartData.labels || netTrendChartData.labels.length === 0" class="no-data-message">
              No data available for the selected period
            </div>
            <canvas 
              *ngIf="netTrendChartData.labels && netTrendChartData.labels.length > 0"
              baseChart
              [data]="netTrendChartData"
              [options]="getWeightTrendChartOptions('Month')"
              [type]="barChartType"
            >
            </canvas>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-card-header">
            <h3>Last 24 Hours Trend</h3>
            <span class="chart-badge" *ngIf="last24IsAggregated">
              Hourly totals · {{ last24TripsCount }} trips
            </span>
          </div>
          <div class="chart-container">
            <div *ngIf="!last24ChartData.labels || last24ChartData.labels.length === 0" class="no-data-message">
              No data available for the selected period
            </div>
            <canvas 
              *ngIf="last24ChartData.labels && last24ChartData.labels.length > 0"
              baseChart
              [data]="last24ChartData"
              [options]="getLast24ChartOptions()"
              [type]="barChartType"
            >
            </canvas>
          </div>
        </div>

        <!-- Enhanced Timeframe Analysis Chart -->
        <div class="chart-card timeframe-chart">
          <div class="timeframe-header">
            <h3>Timeframe Analysis</h3>
            <div class="timeframe-controls">
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
              <div class="timeframe-dropdown" *ngIf="secondaryFilterOptions.length > 0">
                <label for="secondary-filter">
                  {{ selectedTimeframe === 'WEEKLY' ? 'Month' : 'Year' }}:
                </label>
                <select 
                  id="secondary-filter" 
                  [(ngModel)]="selectedSecondaryFilter" 
                  (change)="onSecondaryFilterChange()"
                  class="timeframe-select"
                >
                  <option *ngFor="let option of secondaryFilterOptions" [value]="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
              <div class="timeframe-date-range">
                <span class="date-range-label">{{ getTimeframeDateRange() }}</span>
              </div>
              <div class="timeframe-actions">
                <button (click)="openPdfExportDialog()" class="export-btn" [disabled]="!timeframeChartData.labels?.length">
                  📄 Export to PDF
                </button>
              </div>
            </div>
          </div>
          
          <!-- PDF Export Dialog -->
          <div *ngIf="showPdfExportDialog" class="pdf-export-dialog-overlay" (click)="closePdfExportDialog($event)">
            <div class="pdf-export-dialog" (click)="$event.stopPropagation()">
              <div class="dialog-header">
                <h3>Export to PDF</h3>
                <button class="close-btn" (click)="closePdfExportDialog()">×</button>
              </div>
              <div class="dialog-content">
                <div class="date-input-group">
                  <label for="pdf-start-date">From Date:</label>
                  <input 
                    id="pdf-start-date"
                    type="date" 
                    [(ngModel)]="pdfExportStartDate"
                    class="input-field"
                  >
                </div>
                <div class="date-input-group">
                  <label for="pdf-end-date">To Date:</label>
                  <input 
                    id="pdf-end-date"
                    type="date" 
                    [(ngModel)]="pdfExportEndDate"
                    class="input-field"
                  >
                </div>
              </div>
              <div class="dialog-footer">
                <button (click)="closePdfExportDialog()" class="cancel-btn">Cancel</button>
                <button (click)="generateAndExportPDF()" class="export-pdf-btn">Generate PDF</button>
              </div>
            </div>
          </div>
          
          <!-- Timeframe-scoped loading state (does NOT affect upper charts) -->
          <div *ngIf="timeframeLoading" class="timeframe-loading">
            Loading timeframe data...
          </div>

          <!-- Timeframe-scoped error state (does NOT affect upper charts) -->
          <div *ngIf="!timeframeLoading && timeframeError" class="timeframe-error">
            <h3>Failed to load timeframe data</h3>
            <p>{{ timeframeErrorMessage }}</p>
            <button (click)="computeTimeframeData()" class="retry-btn">Retry</button>
          </div>

          <!-- Timeframe Data Tabs -->
          <div class="timeframe-tabs" *ngIf="!timeframeLoading && !timeframeError && timeframeData?.length">
            <div class="tab-buttons">
              <button 
                (click)="activeTab = 'chart'" 
                [class.active]="activeTab === 'chart'"
                class="tab-btn"
              >
                📈 Chart View
              </button>
              <button 
                (click)="activeTab = 'table'" 
                [class.active]="activeTab === 'table'"
                class="tab-btn"
              >
                📋 Data Table
              </button>
              <button 
                (click)="activeTab = 'details'" 
                [class.active]="activeTab === 'details'"
                class="tab-btn"
              >
                🔍 Details
              </button>
            </div>
            
            <!-- Chart Tab -->
            <div class="tab-content" *ngIf="activeTab === 'chart'">
              <div class="chart-container">
                <div *ngIf="!timeframeChartData.labels || timeframeChartData.labels.length === 0" class="no-data-message">
                  No data available for the selected timeframe
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
            </div>
            
            <!-- Table Tab -->
            <div class="tab-content" *ngIf="activeTab === 'table'">
              <div class="data-table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Period</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Total Trips</th>
                      <th>Total Net Weight</th>
                      <th>Total Gross Weight</th>
                      <th>Avg Net Weight</th>
                      <th>Avg Gross Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of timeframeData" [class.highlight]="item.totalNetWeight === maxWeight">
                      <td>{{ item.periodName }}</td>
                      <td>{{ formatDate(item.startDate) }}</td>
                      <td>{{ formatDate(item.endDate) }}</td>
                      <td>{{ item.totalEntries }}</td>
                      <td>{{ formatWeight(item.totalNetWeight) }}</td>
                      <td>{{ formatWeight(item.totalGrossWeight) }}</td>
                      <td>{{ formatWeight(item.averageNetWeight) }}</td>
                      <td>{{ formatWeight(item.averageGrossWeight) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <!-- Details Tab -->
            <div class="tab-content" *ngIf="activeTab === 'details'">
              <div class="details-container">
                <div class="details-grid">
                  <div class="detail-item">
                    <div class="detail-label">Total Periods Analyzed</div>
                    <div class="detail-value">{{ timeframeData.length || 0 }}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Date Range Covered</div>
                    <div class="detail-value">{{ getDateRangeCovered() }}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Highest Weight Period</div>
                    <div class="detail-value">{{ highestWeightPeriod?.periodName || 'N/A' }}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Highest Weight Value</div>
                    <div class="detail-value">{{ formatWeight(highestWeightPeriod?.totalNetWeight || 0) }}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Average Period Duration</div>
                    <div class="detail-value">{{ calculateAverageDuration() }} days</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Data Consistency</div>
                    <div class="detail-value">{{ calculateDataConsistency() }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Timeframe Summary -->
          <div class="timeframe-summary" *ngIf="!timeframeLoading && !timeframeError && timeframeData?.length">
            <div class="timeframe-summary-item">
              <span class="summary-label">Total Periods</span>
              <span class="summary-value">{{ timeframeData.length }}</span>
            </div>
            <div class="timeframe-summary-item">
              <span class="summary-label">Total Net Weight</span>
              <span class="summary-value">{{ formatWeight(calculateTotalNetWeight()) }}</span>
            </div>
            <div class="timeframe-summary-item">
              <span class="summary-label">Total Gross Weight</span>
              <span class="summary-value">{{ formatWeight(calculateTotalGrossWeight()) }}</span>
            </div>
            <div class="timeframe-summary-item">
              <span class="summary-label">Total Trips</span>
              <span class="summary-value">{{ calculateTotalTrips() }}</span>
            </div>
            <div class="timeframe-summary-item">
              <span class="summary-label">Avg Net Weight/Trip</span>
              <span class="summary-value">{{ formatWeight(calculateAvgNetWeightPerTrip()) }}</span>
            </div>
            <div class="timeframe-summary-item">
              <span class="summary-label">Period with Max Weight</span>
              <span class="summary-value">{{ (highestWeightPeriod?.periodName || '').split(':')[0] || 'N/A' }}</span>
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

    .filter-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 8px;
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

    .load-btn, .retry-btn, .reset-btn {
      background: #007bff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .reset-btn {
      background: #6c757d;
    }

    .load-btn:hover, .retry-btn:hover {
      background: #0056b3;
    }

    .reset-btn:hover {
      background: #5a6268;
    }

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
      color: #010508;
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

    .chart-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 15px;
    }

    .chart-card-header h3 {
      margin: 0;
    }

    .chart-badge {
      font-size: 11px;
      font-weight: 600;
      color: #856404;
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      padding: 3px 10px;
      border-radius: 12px;
      white-space: nowrap;
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

    .timeframe-actions {
      display: flex;
      gap: 10px;
    }

    .export-btn {
      padding: 6px 12px;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }

    .export-btn:disabled {
      background: #6c757d;
      cursor: not-allowed;
    }

    .pdf-export-dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .pdf-export-dialog {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      max-width: 500px;
      width: 90%;
      overflow: hidden;
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #e0e0e0;
      background: #f8f9fa;
    }

    .dialog-header h3 {
      margin: 0;
      color: #333;
      font-size: 18px;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn:hover {
      color: #333;
    }

    .dialog-content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .dialog-content .date-input-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .dialog-content .date-input-group label {
      font-weight: 600;
      color: #333;
      font-size: 14px;
    }

    .dialog-content .input-field {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .dialog-footer {
      display: flex;
      gap: 10px;
      padding: 15px 20px;
      border-top: 1px solid #e0e0e0;
      background: #f8f9fa;
      justify-content: flex-end;
    }

    .cancel-btn, .export-pdf-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
    }

    .cancel-btn {
      background: #e0e0e0;
      color: #333;
    }

    .cancel-btn:hover {
      background: #d0d0d0;
    }

    .export-pdf-btn {
      background: #007bff;
      color: white;
    }

    .export-pdf-btn:hover {
      background: #0056b3;
    }

    .timeframe-tabs {
      margin-bottom: 20px;
    }

    .tab-buttons {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
      flex-wrap: wrap;
    }

    .tab-btn {
      padding: 8px 16px;
      border: 1px solid #ddd;
      background: #f8f9fa;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .tab-btn.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }

    .tab-content {
      background: #f8f9fa;
      border-radius: 4px;
      padding: 15px;
    }

    .data-table-container {
      overflow-x: auto;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }

    .data-table th {
      background: #007bff;
      color: white;
      padding: 8px;
      text-align: left;
      font-weight: bold;
    }

    .data-table td {
      padding: 8px;
      border-bottom: 1px solid #ddd;
    }

    .data-table tbody tr:hover {
      background: #f0f8ff;
    }

    .data-table tr.highlight {
      background: #fff3cd;
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }

    .detail-item {
      background: white;
      padding: 15px;
      border-radius: 4px;
      border-left: 4px solid #17a2b8;
    }

    .detail-label {
      font-size: 11px;
      color: #666;
      text-transform: uppercase;
      margin-bottom: 5px;
    }

    .detail-value {
      font-size: 14px;
      font-weight: bold;
      color: #333;
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

    .timeframe-loading {
      color: #007bff;
      padding: 20px;
      text-align: center;
      background: #f8f9fa;
      border-radius: 8px;
      margin: 10px 0 20px;
    }

    .timeframe-error {
      color: #dc3545;
      padding: 20px;
      background: #f8d7da;
      border: 1px solid #f5c6cb;
      border-radius: 8px;
      margin: 10px 0 20px;
      text-align: center;
    }

    .timeframe-error h3 {
      margin: 0 0 8px 0;
      font-size: 15px;
    }

    .timeframe-error p {
      margin: 0 0 10px 0;
      font-size: 13px;
      word-break: break-word;
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

      .tab-buttons {
        flex-direction: column;
      }

      .tab-btn {
        width: 100%;
      }

      .data-table {
        font-size: 10px;
      }

      .details-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class WeighbridgeChartsComponent implements OnInit, OnChanges {
  wbId = 'SRNGR_LANDFILL_WB1';
  @Input() selectedWbId: string = '';
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  @Input() weighbridgeOptions: { id: string; label: string }[] = [];

  loading = false;
  error = false;
  errorMessage = '';

  selectedPeriod: string = 'all';
  private readonly allTimeStartDate: string = '2025-11-21';

  /**
   * SINGLE SOURCE OF TRUTH.
   *
   * All charts, summary cards, and the Timeframe Analysis section on this
   * page are computed on the frontend from this one raw dataset (fetched
   * once per weighbridge via GET /report/data/all/{wbId} — the same
   * endpoint the SMC Dashboard table uses, which is known to be correct).
   *
   * We deliberately do NOT use these backend endpoints, per the "Known
   * Issues" in the architecture doc:
   *  - POST /api/weighbridge/timeframe/data does not exist on the backend
   *    at all, so calling it always fell through to hardcoded mock data
   *    (this is why the "Timeframe Analysis" chart showed a flat 0 kg
   *    line regardless of which month/year was selected).
   *  - GET /report/summary compares the `edate` string column with
   *    BETWEEN/>=, which is unreliable when the stored date format
   *    varies, and produced numbers that didn't match the raw table
   *    (e.g. 779.2 tons / 86 trips vs. the correct 537,001 kg / 58 trips
   *    for the same day, shown correctly on the SMC Dashboard).
   *
   * Computing everything from the raw records client-side guarantees the
   * charts always agree with the raw data table.
   */
  allWeighbridgeData: any[] = [];
  filteredRecords: any[] = [];

  selectedTimeframe: string = 'WEEKLY';
  timeframeChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  timeframeData: TimeFrameDataDTO[] = [];

  timeframeLoading: boolean = false;
  timeframeError: boolean = false;
  timeframeErrorMessage: string = '';

  get effectiveWbId(): string {
    return this.selectedWbId || this.wbId;
  }
  maxWeight: number = 0;
  highestWeightPeriod: TimeFrameDataDTO | null = null;
  activeTab: 'chart' | 'table' | 'details' = 'chart';

  showPdfExportDialog = false;
  pdfExportStartDate: string = '';
  pdfExportEndDate: string = '';

  selectedSecondaryFilter: string = '';
  secondaryFilterOptions: { label: string; value: string }[] = [];

  netTrendChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  last24ChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };

  /**
   * Above this many individual trips in the last 24 hours, one-bar-per-trip
   * becomes unreadable (labels overlap into a jumbled mess). Past this
   * threshold we switch to a fixed 24-bar hourly-totals view instead.
   */
  private readonly LAST24_TRIP_THRESHOLD = 50;
  last24IsAggregated = false;
  last24TripsCount = 0;
  /** Trip count per bar, only populated when last24IsAggregated is true — used by the tooltip. */
  private last24TripCounts: number[] = [];

  summaryData: any = null;
  allTimeNetWeight: number = 0;

  barChartType: ChartType = 'bar';

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
    this.endDate = this.endDate || today.toISOString().split('T')[0];
    this.startDate = this.startDate || this.allTimeStartDate;
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    if (!hex) return null;
    const h = hex.replace('#', '').trim();
    if (h.length === 3) {
      const r = parseInt(h[0] + h[0], 16);
      const g = parseInt(h[1] + h[1], 16);
      const b = parseInt(h[2] + h[2], 16);
      return { r, g, b };
    }
    if (h.length === 6) {
      const r = parseInt(h.substring(0, 2), 16);
      const g = parseInt(h.substring(2, 4), 16);
      const b = parseInt(h.substring(4, 6), 16);
      return { r, g, b };
    }
    return null;
  }

  private darkenHex(hex: string, percent: number): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;
    const factor = (100 - percent) / 100;
    const r = Math.max(0, Math.min(255, Math.round(rgb.r * factor)));
    const g = Math.max(0, Math.min(255, Math.round(rgb.g * factor)));
    const b = Math.max(0, Math.min(255, Math.round(rgb.b * factor)));
    return `rgb(${r}, ${g}, ${b})`;
  }

  ngOnInit(): void {
    if (this.selectedWbId) {
      this.wbId = this.selectedWbId;
    }

    this.generateSecondaryFilterOptions();
    this.selectedSecondaryFilter = this.secondaryFilterOptions.length > 0
      ? this.secondaryFilterOptions[0].value
      : '';

    this.loadCharts();
  }

  private initializeDates(): void {
    const today = new Date();
    this.endDate = today.toISOString().split('T')[0];
    this.startDate = this.allTimeStartDate;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const selectedWbIdChange = changes['selectedWbId'];
    const startDateChange = changes['startDate'];
    const endDateChange = changes['endDate'];

    if (selectedWbIdChange && selectedWbIdChange.currentValue) {
      this.wbId = selectedWbIdChange.currentValue;
    }

    if (startDateChange || endDateChange || selectedWbIdChange) {
      if (startDateChange && startDateChange.currentValue) {
        this.startDate = startDateChange.currentValue;
      }
      if (endDateChange && endDateChange.currentValue) {
        this.endDate = endDateChange.currentValue;
      }
      if (
        (startDateChange && !startDateChange.firstChange) ||
        (endDateChange && !endDateChange.firstChange) ||
        (selectedWbIdChange && !selectedWbIdChange.firstChange)
      ) {
        if (selectedWbIdChange && !selectedWbIdChange.firstChange) {
          this.loadCharts();
        } else {
          this.filterRecordsByDateRange();
          this.computeSummary();
        }
      }
    }
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
      case 'all':
        this.startDate = this.allTimeStartDate;
        this.endDate = today.toISOString().split('T')[0];
        break;
      case 'custom':
        break;
    }

    // Period buttons only affect the summary cards' date range. The
    // Monthly Net Weight Trend intentionally always shows the rolling
    // 12-month history regardless of this filter, and the Timeframe
    // Analysis section is driven entirely by its own selectors.
    if (this.allWeighbridgeData.length) {
      this.filterRecordsByDateRange();
      this.computeSummary();
    }
  }

  onDateChange(): void {
    this.selectedPeriod = 'custom';

    if (this.allWeighbridgeData.length) {
      this.filterRecordsByDateRange();
      this.computeSummary();
    }
  }

  onWeighbridgeChange(): void {
    if (this.selectedWbId) {
      this.wbId = this.selectedWbId;
    }
    this.loadCharts();
  }

  resetFilters(): void {
    this.selectedPeriod = 'all';
    this.initializeDates();
    if (this.allWeighbridgeData.length) {
      this.filterRecordsByDateRange();
      this.computeSummary();
    } else {
      this.loadCharts();
    }
  }

  onTimeframeChange(): void {
    this.generateSecondaryFilterOptions();
    this.selectedSecondaryFilter = this.secondaryFilterOptions.length > 0
      ? this.secondaryFilterOptions[0].value
      : '';
    this.computeTimeframeData();
  }

  private generateSecondaryFilterOptions(): void {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const dataStartDate = new Date(this.allTimeStartDate + 'T00:00:00');
    const dataStartYear = dataStartDate.getFullYear();
    const dataStartMonth = dataStartDate.getMonth();

    this.secondaryFilterOptions = [];

    if (this.selectedTimeframe === 'WEEKLY') {
      for (let year = currentYear; year >= dataStartYear; year--) {
        const firstMonth = year === dataStartYear ? dataStartMonth : 0;
        const lastMonth = year === currentYear ? currentMonth : 11;

        for (let month = lastMonth; month >= firstMonth; month--) {
          const monthDate = new Date(year, month, 1);
          this.secondaryFilterOptions.push({
            label: monthDate.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric'
            }),
            value: `${year}-${String(month + 1).padStart(2, '0')}`
          });
        }
      }
      return;
    }

    if (
      this.selectedTimeframe === 'MONTHLY' ||
      this.selectedTimeframe === 'QUARTERLY' ||
      this.selectedTimeframe === 'HALF_YEARLY'
    ) {
      for (let year = currentYear; year >= dataStartYear; year--) {
        this.secondaryFilterOptions.push({
          label: String(year),
          value: String(year)
        });
      }
      return;
    }
  }

  onSecondaryFilterChange(): void {
    this.computeTimeframeData();
  }

  getTimeframeDateRange(): string {
    const today = new Date();

    if (this.selectedTimeframe === 'WEEKLY' && this.selectedSecondaryFilter) {
      const [yearString, monthString] = this.selectedSecondaryFilter.split('-');
      const year = Number(yearString);
      const month = Number(monthString) - 1;

      const firstDay = new Date(year, month, 1);
      let lastDay = new Date(year, month + 1, 0);

      if (year === today.getFullYear() && month === today.getMonth()) {
        lastDay = today;
      }

      return `${this.formatDate(this.toDateString(firstDay))} to ${this.formatDate(this.toDateString(lastDay))}`;
    }

    if (
      (this.selectedTimeframe === 'MONTHLY' ||
       this.selectedTimeframe === 'QUARTERLY' ||
       this.selectedTimeframe === 'HALF_YEARLY') &&
      this.selectedSecondaryFilter
    ) {
      const year = Number(this.selectedSecondaryFilter);
      const firstDay = new Date(year, 0, 1);
      let lastDay = new Date(year, 11, 31);

      if (year === today.getFullYear()) {
        lastDay = today;
      }

      return `${this.formatDate(this.toDateString(firstDay))} to ${this.formatDate(this.toDateString(lastDay))}`;
    }

    if (this.selectedTimeframe === 'YEARLY') {
      return `${this.formatDate(this.allTimeStartDate)} to ${this.formatDate(this.toDateString(today))}`;
    }

    if (this.startDate === this.endDate) {
      return `Date: ${this.formatDate(this.startDate)}`;
    }

    return `Date Range: ${this.formatDate(this.startDate)} to ${this.formatDate(this.endDate)}`;
  }

  private toDateString(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  loadCharts(): void {
    const wbId = this.effectiveWbId;
    if (!wbId) {
      this.error = true;
      this.errorMessage = 'Please enter a Weighbridge ID';
      return;
    }

    this.loading = true;
    this.error = false;

    this.loadAllWeighbridgeRecords()
      .then(() => {
        this.filterRecordsByDateRange();
        this.computeSummary();
        this.computeAllTimeSummary();
        this.computeMonthlyTrend();
        this.computeLast24Trend();
        this.computeTimeframeData();
      })
      .catch((err) => {
        console.error('Error loading weighbridge data:', err);
        this.error = true;
        this.errorMessage = 'Failed to load weighbridge data.';
      })
      .finally(() => {
        this.loading = false;
      });
  }

  loadAllWeighbridgeRecords(): Promise<void> {
    const wbId = this.effectiveWbId;
    return new Promise((resolve, reject) => {
      this.smcService.getAllWeighbridgeData(wbId).subscribe({
        next: (data: any[]) => {
          this.allWeighbridgeData = data || [];
          resolve();
        },
        error: (err) => {
          this.allWeighbridgeData = [];
          this.filteredRecords = [];
          reject(err);
        }
      });
    });
  }

  filterRecordsByDateRange(): void {
    if (!this.allWeighbridgeData || this.allWeighbridgeData.length === 0) {
      this.filteredRecords = [];
      return;
    }

    this.filteredRecords = this.allWeighbridgeData.filter((record) => {
      const recordDate = this.getRecordDate(record);
      if (!recordDate) return false;

      if (this.startDate && recordDate < new Date(this.startDate)) {
        return false;
      }
      if (this.endDate && recordDate > new Date(this.endDate + 'T23:59:59')) {
        return false;
      }
      return true;
    });
  }

  getRecordDate(record: any): Date | null {
    const dateStr = record.edate || record.gdate || record.entryDate || record.date;
    if (!dateStr) return null;

    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return null;
      return date;
    } catch {
      return null;
    }
  }

  computeSummary(): void {
    const totalNetWeight = this.filteredRecords.reduce(
      (sum, r) => sum + (Number(r.nweight) || 0),
      0
    );
    this.summaryData = {
      totalNetWeight,
      totalTrips: this.filteredRecords.length
    };
  }

  computeAllTimeSummary(): void {
    this.allTimeNetWeight = this.allWeighbridgeData.reduce(
      (sum, r) => sum + (Number(r.nweight) || 0),
      0
    );
  }

  computeMonthlyTrend(): void {
    const mapped = this.allWeighbridgeData.map((r) => ({
      dateTime: r.edate || r.gdate,
      weight: Number(r.nweight) || 0
    }));

    this.netTrendChartData = this.createMonthlyNetWeightChartData(
      mapped,
      'Net Weight (kg)',
      '#007bff'
    );
  }

  private createMonthlyNetWeightChartData(
    apiData: any[],
    label: string,
    backgroundColor: string
  ): ChartConfiguration['data'] {

    if (!apiData || apiData.length === 0) {
      return {
        labels: [],
        datasets: []
      };
    }

    const today = new Date();

    const currentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    const dataStartMonth = new Date(2025, 10, 1);

    let chartStartMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 11,
      1
    );

    if (chartStartMonth < dataStartMonth) {
      chartStartMonth = new Date(dataStartMonth);
    }

    const monthlyTotals = new Map<string, number>();

    const monthCursor = new Date(chartStartMonth);

    while (monthCursor <= currentMonth) {
      const key =
        `${monthCursor.getFullYear()}-${String(monthCursor.getMonth() + 1).padStart(2, '0')}`;

      monthlyTotals.set(key, 0);
      monthCursor.setMonth(monthCursor.getMonth() + 1);
    }

    apiData.forEach((item: any) => {
      const dateValue = item.dateTime;

      if (!dateValue) {
        return;
      }

      const date = new Date(dateValue);

      if (isNaN(date.getTime())) {
        return;
      }

      const key =
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!monthlyTotals.has(key)) {
        return;
      }

      const weight = Number(item.weight ?? 0);

      if (weight > 0) {
        monthlyTotals.set(
          key,
          (monthlyTotals.get(key) || 0) + weight
        );
      }
    });

    const labels: string[] = [];
    const data: number[] = [];

    monthlyTotals.forEach((totalWeight, key) => {
      const [yearString, monthString] = key.split('-');

      const date = new Date(
        Number(yearString),
        Number(monthString) - 1,
        1
      );

      labels.push(
        date.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        })
      );

      data.push(totalWeight);
    });

    return {
      labels,
      datasets: [
        {
          label,
          data,
          backgroundColor,
          borderColor: this.darkenHex(backgroundColor, 30),
          borderWidth: 2,
          hoverBackgroundColor: this.darkenHex(backgroundColor, 15),
          barPercentage: 0.70,
          categoryPercentage: 0.80,
          maxBarThickness: 55
        }
      ]
    };
  }

  computeLast24Trend(): void {
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;

    const recent = this.allWeighbridgeData
      .map((r) => ({
        date: this.getRecordDate(r),
        weight: Number(r.nweight) || 0
      }))
      .filter((x): x is { date: Date; weight: number } => !!x.date && x.date.getTime() >= cutoff)
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    this.last24TripsCount = recent.length;

    if (recent.length > this.LAST24_TRIP_THRESHOLD) {
      // Too many individual trips to show as separate bars without the
      // x-axis turning into an unreadable jumble — switch to a fixed
      // 24-bar hourly-totals view instead.
      this.last24IsAggregated = true;
      this.last24ChartData = this.createHourlyAggregatedChartData(recent);
    } else {
      this.last24IsAggregated = false;
      this.last24TripCounts = [];
      const mapped = recent.map((x) => ({ dateTime: x.date.toISOString(), weight: x.weight }));
      this.last24ChartData = this.createBarChartData(
        mapped,
        'Net Weight (kg)',
        '#dc3545',
        'hourly'
      );
    }
  }

  /**
   * Buckets the last 24 hours into 24 fixed one-hour slots (regardless of
   * how many trips fall inside each), summing net weight and counting
   * trips per hour. This keeps the chart readable no matter how much
   * traffic there was, since it's always exactly 24 bars.
   */
  private createHourlyAggregatedChartData(
    records: { date: Date; weight: number }[]
  ): ChartConfiguration['data'] {
    const now = new Date();
    const startBucket = new Date(now);
    startBucket.setMinutes(0, 0, 0);
    startBucket.setHours(startBucket.getHours() - 23);

    const buckets: { label: string; weight: number; trips: number }[] = [];

    for (let i = 0; i < 24; i++) {
      const bucketStart = new Date(startBucket);
      bucketStart.setHours(bucketStart.getHours() + i);
      const bucketEnd = new Date(bucketStart);
      bucketEnd.setHours(bucketEnd.getHours() + 1);

      const label = bucketStart.toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true
      });

      const inBucket = records.filter(
        (r) => r.date >= bucketStart && r.date < bucketEnd
      );

      buckets.push({
        label,
        weight: inBucket.reduce((sum, r) => sum + r.weight, 0),
        trips: inBucket.length
      });
    }

    this.last24TripCounts = buckets.map((b) => b.trips);

    const backgroundColor = '#dc3545';

    return {
      labels: buckets.map((b) => b.label),
      datasets: [
        {
          label: 'Net Weight (kg)',
          data: buckets.map((b) => b.weight),
          backgroundColor,
          borderColor: this.darkenHex(backgroundColor, 30),
          borderWidth: 2,
          hoverBackgroundColor: this.darkenHex(backgroundColor, 15),
          barPercentage: 0.85,
          categoryPercentage: 0.9,
          maxBarThickness: 48
        }
      ]
    };
  }

  /**
   * Chart options for the Last 24 Hours card. When aggregated, the
   * tooltip shows the trip count alongside the hourly total weight.
   */
  getLast24ChartOptions(): ChartConfiguration['options'] {
    const isAggregated = this.last24IsAggregated;

    return {
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
        },
        x: {
          title: {
            display: true,
            text: isAggregated ? 'Hour (24 totals)' : 'Hour'
          },
          ticks: {
            autoSkip: false,
            maxRotation: 45,
            minRotation: 45
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = Number(context.parsed.y);
              const weightLabel = value >= 1000
                ? (value / 1000).toFixed(2) + ' tons'
                : value + ' kg';

              if (isAggregated) {
                const trips = this.last24TripCounts[context.dataIndex] || 0;
                return `Net Weight: ${weightLabel} (${trips} trip${trips === 1 ? '' : 's'})`;
              }

              return `Net Weight: ${weightLabel}`;
            }
          }
        }
      }
    };
  }

  computeTimeframeData(): void {
    this.timeframeLoading = true;
    this.timeframeError = false;
    this.timeframeErrorMessage = '';

    try {
      const periods = this.getCanonicalPeriods();

      if (periods.length === 0) {
        this.timeframeData = [];
        this.timeframeChartData = { labels: [], datasets: [] };
        return;
      }

      const parsed = this.allWeighbridgeData
        .map((r) => ({
          date: this.getRecordDate(r),
          net: Number(r.nweight) || 0,
          gross: Number(r.gweight) || 0
        }))
        .filter((x): x is { date: Date; net: number; gross: number } => !!x.date);

      const result: TimeFrameDataDTO[] = periods.map((period) => {
        const periodEnd = this.endOfDay(period.end);
        const matches = parsed.filter(
          (x) => x.date >= period.start && x.date <= periodEnd
        );

        const totalEntries = matches.length;
        const totalNetWeight = matches.reduce((sum, m) => sum + m.net, 0);
        const totalGrossWeight = matches.reduce((sum, m) => sum + m.gross, 0);

        return {
          periodName: period.label,
          startDate: this.toDateString(period.start),
          endDate: this.toDateString(period.end),
          totalEntries,
          totalNetWeight,
          totalGrossWeight,
          averageNetWeight: totalEntries > 0 ? totalNetWeight / totalEntries : 0,
          averageGrossWeight: totalEntries > 0 ? totalGrossWeight / totalEntries : 0
        } as TimeFrameDataDTO;
      });

      this.timeframeData = result;
      this.prepareTimeframeChartData(result);
      this.calculateTimeframeMetrics();
    } catch (err) {
      console.error('Error computing timeframe data:', err);
      this.timeframeError = true;
      this.timeframeErrorMessage = 'Failed to compute timeframe data.';
      this.timeframeData = [];
      this.timeframeChartData = { labels: [], datasets: [] };
    } finally {
      this.timeframeLoading = false;
    }
  }

  private endOfDay(d: Date): Date {
    const x = new Date(d);
    x.setHours(23, 59, 59, 999);
    return x;
  }

  private getCanonicalPeriods(): { label: string; start: Date; end: Date }[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dataStart = new Date(this.allTimeStartDate + 'T00:00:00');
    const periods: { label: string; start: Date; end: Date }[] = [];

    if (this.selectedTimeframe === 'WEEKLY') {
      if (!this.selectedSecondaryFilter) return periods;

      const [yearString, monthString] = this.selectedSecondaryFilter.split('-');
      const year = Number(yearString);
      const month = Number(monthString) - 1;

      let monthStart = new Date(year, month, 1);
      const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();
      const monthEnd = isCurrentMonth ? new Date(today) : new Date(year, month + 1, 0);

      if (monthStart < dataStart) {
        monthStart = new Date(dataStart);
      }
      if (monthStart > monthEnd) return periods;

      let weekStart = new Date(monthStart);
      let weekNumber = 1;

      while (weekStart <= monthEnd) {
        let weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        if (weekEnd > monthEnd) {
          weekEnd = new Date(monthEnd);
        }

        const days = Math.round((weekEnd.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        periods.push({
          label: `Week ${weekNumber} (${days}d)`,
          start: new Date(weekStart),
          end: new Date(weekEnd)
        });

        weekStart = new Date(weekEnd);
        weekStart.setDate(weekStart.getDate() + 1);
        weekNumber++;
      }

      return periods;
    }

    if (this.selectedTimeframe === 'MONTHLY') {
      if (!this.selectedSecondaryFilter) return periods;
      const year = Number(this.selectedSecondaryFilter);

      const firstMonth = year === dataStart.getFullYear() ? dataStart.getMonth() : 0;
      const lastMonth = year === today.getFullYear() ? today.getMonth() : 11;

      for (let m = firstMonth; m <= lastMonth; m++) {
        let start = new Date(year, m, 1);
        let end = (year === today.getFullYear() && m === today.getMonth())
          ? new Date(today)
          : new Date(year, m + 1, 0);

        if (start < dataStart) start = new Date(dataStart);

        const label = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        periods.push({ label, start, end });
      }

      return periods;
    }

    if (this.selectedTimeframe === 'QUARTERLY') {
      if (!this.selectedSecondaryFilter) return periods;
      const year = Number(this.selectedSecondaryFilter);

      for (let q = 0; q < 4; q++) {
        const startMonth = q * 3;
        const rawStart = new Date(year, startMonth, 1);
        let end = new Date(year, startMonth + 3, 0);

        if (rawStart > today) break;
        if (end > today) end = new Date(today);
        if (end < dataStart) continue;

        const start = rawStart < dataStart ? new Date(dataStart) : rawStart;

        periods.push({
          label: `Q${q + 1} ${year}`,
          start,
          end
        });
      }

      return periods;
    }

    if (this.selectedTimeframe === 'HALF_YEARLY') {
      if (!this.selectedSecondaryFilter) return periods;
      const year = Number(this.selectedSecondaryFilter);

      for (let h = 0; h < 2; h++) {
        const startMonth = h * 6;
        const rawStart = new Date(year, startMonth, 1);
        let end = new Date(year, startMonth + 6, 0);

        if (rawStart > today) break;
        if (end > today) end = new Date(today);
        if (end < dataStart) continue;

        const start = rawStart < dataStart ? new Date(dataStart) : rawStart;

        periods.push({
          label: `H${h + 1} ${year}`,
          start,
          end
        });
      }

      return periods;
    }

    if (this.selectedTimeframe === 'YEARLY') {
      const startYear = dataStart.getFullYear();
      const endYear = today.getFullYear();

      for (let y = startYear; y <= endYear; y++) {
        const start = y === startYear ? new Date(dataStart) : new Date(y, 0, 1);
        const end = y === endYear ? new Date(today) : new Date(y, 11, 31);
        periods.push({ label: String(y), start, end });
      }

      return periods;
    }

    return periods;
  }

  private prepareTimeframeChartData(data: TimeFrameDataDTO[]): void {
    if (!data || data.length === 0) {
      this.timeframeChartData = { labels: [], datasets: [] };
      return;
    }

    const labels = data.map(period => period.periodName);
    const netWeights = data.map(period => Number(period.totalNetWeight || 0));
    const tripCounts = data.map(period => Number(period.totalEntries || 0));

    const backgroundColor = this.getTimeframeColor(this.selectedTimeframe);

    this.timeframeChartData = {
      labels,
      datasets: [
        {
          label: 'Net Weight',
          data: netWeights,
          backgroundColor,
          borderColor: this.darkenHex(backgroundColor, 30),
          borderWidth: 2,
          hoverBackgroundColor: this.darkenHex(backgroundColor, 18),
          barPercentage: 0.75,
          categoryPercentage: 0.85,
          maxBarThickness: 70,
          yAxisID: 'y'
        },
        {
          label: 'Number of Trips',
          data: tripCounts,
          backgroundColor: 'rgba(108, 117, 125, 0.3)',
          borderColor: 'rgba(108, 117, 125, 1)',
          borderWidth: 1,
          type: 'line',
          yAxisID: 'y1',
          tension: 0.4,
          fill: false
        }
      ]
    };
  }

  private calculateTimeframeMetrics(): void {
    if (!this.timeframeData || this.timeframeData.length === 0) {
      this.maxWeight = 0;
      this.highestWeightPeriod = null;
      return;
    }

    this.maxWeight = Math.max(...this.timeframeData.map(p => p.totalNetWeight || 0));
    this.highestWeightPeriod = this.timeframeData.find(p => p.totalNetWeight === this.maxWeight) || null;
  }

  private getTimeframeColor(timeframe: string): string {
    switch (timeframe) {
      case 'WEEKLY': return '#28a745';
      case 'MONTHLY': return '#007bff';
      case 'QUARTERLY': return '#ffc107';
      case 'HALF_YEARLY': return '#fd7e14';
      case 'YEARLY': return '#6f42c1';
      default: return '#28a745';
    }
  }

  calculateTotalNetWeight(): number {
    if (!this.timeframeData) return 0;
    return this.timeframeData.reduce((sum, period) => sum + (period.totalNetWeight || 0), 0);
  }

  calculateTotalGrossWeight(): number {
    if (!this.timeframeData) return 0;
    return this.timeframeData.reduce((sum, period) => sum + (period.totalGrossWeight || 0), 0);
  }

  calculateTotalTrips(): number {
    if (!this.timeframeData) return 0;
    return this.timeframeData.reduce((sum, period) => sum + (period.totalEntries || 0), 0);
  }

  calculateAvgNetWeightPerTrip(): number {
    const totalTrips = this.calculateTotalTrips();
    if (totalTrips === 0) return 0;
    return this.calculateTotalNetWeight() / totalTrips;
  }

  getDateRangeCovered(): string {
    if (!this.timeframeData || this.timeframeData.length === 0) {
      return 'No data';
    }
    
    const firstPeriod = this.timeframeData[0];
    const lastPeriod = this.timeframeData[this.timeframeData.length - 1];
    
    return `${this.formatDate(firstPeriod.startDate)} to ${this.formatDate(lastPeriod.endDate)}`;
  }

  calculateAverageDuration(): number {
    if (!this.timeframeData || this.timeframeData.length === 0) return 0;
    
    const totalDays = this.timeframeData.reduce((sum, period) => {
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return sum + diffDays;
    }, 0);
    
    return Math.round(totalDays / this.timeframeData.length);
  }

  calculateDataConsistency(): string {
    if (!this.timeframeData || this.timeframeData.length === 0) return 'No data';
    
    const periodsWithData = this.timeframeData.filter(p => p.totalEntries > 0).length;
    const percentage = (periodsWithData / this.timeframeData.length) * 100;
    
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 70) return 'Good';
    if (percentage >= 50) return 'Fair';
    return 'Poor';
  }

  openPdfExportDialog(): void {
    this.pdfExportStartDate = this.startDate;
    this.pdfExportEndDate = this.endDate;
    this.showPdfExportDialog = true;
  }

  closePdfExportDialog(event?: any): void {
    if (event && event.target !== event.currentTarget) {
      return;
    }
    this.showPdfExportDialog = false;
  }

  generateAndExportPDF(): void {
    if (!this.pdfExportStartDate || !this.pdfExportEndDate) {
      alert('Please select both from and to dates');
      return;
    }

    if (new Date(this.pdfExportStartDate) > new Date(this.pdfExportEndDate)) {
      alert('From date must be before to date');
      return;
    }

    const rangeStart = new Date(this.pdfExportStartDate);
    const rangeEnd = new Date(this.pdfExportEndDate);
    
    const weeklyData = this.generateWeeklyDataForRange(rangeStart, rangeEnd);

    if (weeklyData.length === 0) {
      alert('No data available for the selected date range');
      return;
    }

    this.exportTimeframeDataToPdf(weeklyData);
    this.closePdfExportDialog();
  }

  private generateWeeklyDataForRange(startDate: Date, endDate: Date): TimeFrameDataDTO[] {
    const weeks: TimeFrameDataDTO[] = [];
    let currentWeekStart = new Date(startDate);
    let weekNumber = 1;
    
    while (currentWeekStart < endDate) {
      let currentWeekEnd = new Date(currentWeekStart);
      currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);
      
      if (currentWeekEnd > endDate) {
        currentWeekEnd = new Date(endDate);
      }
      
      const daysInWeek = Math.floor((currentWeekEnd.getTime() - currentWeekStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      const weekData = this.timeframeData.filter(item => {
        const itemStart = new Date(item.startDate);
        const itemEnd = new Date(item.endDate);
        return itemStart <= currentWeekEnd && itemEnd >= currentWeekStart;
      });
      
      const aggregatedWeek: TimeFrameDataDTO = {
        periodName: `Week ${weekNumber} (${daysInWeek} days)`,
        startDate: currentWeekStart.toISOString().split('T')[0],
        endDate: currentWeekEnd.toISOString().split('T')[0],
        totalEntries: weekData.reduce((sum, item) => sum + item.totalEntries, 0),
        totalNetWeight: weekData.reduce((sum, item) => sum + item.totalNetWeight, 0),
        totalGrossWeight: weekData.reduce((sum, item) => sum + item.totalGrossWeight, 0),
        averageNetWeight: 0,
        averageGrossWeight: 0
      };
      
      if (aggregatedWeek.totalEntries > 0) {
        aggregatedWeek.averageNetWeight = aggregatedWeek.totalNetWeight / aggregatedWeek.totalEntries;
        aggregatedWeek.averageGrossWeight = aggregatedWeek.totalGrossWeight / aggregatedWeek.totalEntries;
      }
      
      weeks.push(aggregatedWeek);
      
      currentWeekStart = new Date(currentWeekEnd);
      currentWeekStart.setDate(currentWeekStart.getDate() + 1);
      weekNumber++;
    }
    
    return weeks;
  }

  private exportTimeframeDataToPdf(data: TimeFrameDataDTO[]): void {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPosition = 15;

      doc.setFontSize(18);
      doc.setTextColor(33, 37, 41);
      doc.text('Timeframe Analysis Report', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;

      doc.setFontSize(11);
      doc.setTextColor(100, 100, 100);
      const dateRange = `From: ${this.formatDate(this.pdfExportStartDate)} to ${this.formatDate(this.pdfExportEndDate)}`;
      doc.text(dateRange, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 5;

      const timeframeType = `Timeframe: ${this.selectedTimeframe}`;
      doc.text(timeframeType, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 5;

      const reportDate = `Report Generated: ${new Date().toLocaleString()}`;
      doc.text(reportDate, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 8;

      doc.setFontSize(12);
      doc.setTextColor(33, 37, 41);
      doc.text('Summary', 15, yPosition);
      yPosition += 5;

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      const totalTrips = data.reduce((sum, item) => sum + item.totalEntries, 0);
      const totalNetWeight = data.reduce((sum, item) => sum + item.totalNetWeight, 0);
      const totalGrossWeight = data.reduce((sum, item) => sum + item.totalGrossWeight, 0);
      const avgNetWeight = totalTrips > 0 ? totalNetWeight / totalTrips : 0;

      doc.text(`Total Periods: ${data.length}`, 20, yPosition);
      yPosition += 4;
      doc.text(`Total Trips: ${totalTrips}`, 20, yPosition);
      yPosition += 4;
      doc.text(`Total Net Weight: ${this.formatWeight(totalNetWeight)}`, 20, yPosition);
      yPosition += 4;
      doc.text(`Total Gross Weight: ${this.formatWeight(totalGrossWeight)}`, 20, yPosition);
      yPosition += 4;
      doc.text(`Average Net Weight per Trip: ${this.formatWeight(avgNetWeight)}`, 20, yPosition);
      yPosition += 8;

      const tableColumns = [
        'Period',
        'Start Date',
        'End Date',
        'Trips',
        'Net Weight',
        'Gross Weight',
        'Avg Net Wt',
        'Avg Gross Wt'
      ];

      const tableData = data.map(item => [
        item.periodName || 'N/A',
        this.formatDate(item.startDate),
        this.formatDate(item.endDate),
        item.totalEntries.toString(),
        this.formatWeight(item.totalNetWeight),
        this.formatWeight(item.totalGrossWeight),
        this.formatWeight(item.averageNetWeight),
        this.formatWeight(item.averageGrossWeight)
      ]);

      autoTable(doc, {
        head: [tableColumns],
        body: tableData,
        startY: yPosition,
        margin: { top: 10, right: 15, bottom: 15, left: 15 },
        styles: {
          fontSize: 9,
          textColor: [33, 37, 41],
          fillColor: [247, 248, 249],
          halign: 'center',
          valign: 'middle'
        },
        headStyles: {
          fillColor: [0, 123, 255],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        columnStyles: {
          3: { halign: 'right' },
          4: { halign: 'right' },
          5: { halign: 'right' },
          6: { halign: 'right' },
          7: { halign: 'right' }
        }
      });

      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      }

      const fileName = `timeframe_analysis_${this.selectedTimeframe.toLowerCase()}_${this.pdfExportStartDate}_to_${this.pdfExportEndDate}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please check the console for details.');
    }
  }

  private createBarChartData(
    apiData: any[], 
    label: string, 
    backgroundColor: string,
    dataType: 'daily' | 'hourly'
  ): ChartConfiguration['data'] {
    
    const filteredData = apiData.filter(item => {
      const weight = item.weight || item.netWeight || item.value || item.totalWeight || 0;
      return weight > 0;
    });

    const labels = filteredData.map((item) => {
      const dateValue = item.dateTime || item.date || item.time || item.day || item.hour || item.label || item.period;
      return this.formatLabel(dateValue, dataType);
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
          borderColor: this.darkenHex(backgroundColor, 30),
          borderWidth: 2,
          hoverBackgroundColor: this.darkenHex(backgroundColor, 15),
          barPercentage: 0.95,
          categoryPercentage: 0.95,
          maxBarThickness: dataType === 'hourly' ? 28 : 48,
        }
      ]
    };
  }
  
  private formatLabel(labelString: any, dataType: 'daily' | 'hourly'): string {
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

  getWeightTrendChartOptions(xAxisLabel: 'Day' | 'Hour' | 'Month'): ChartConfiguration['options'] {
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
            autoSkip: false,
            maxRotation: 45,
            minRotation: 45
          }
        }
      }
    };
  }

  getTimeframeChartOptions(): ChartConfiguration['options'] {
    const isWeekly = this.selectedTimeframe === 'WEEKLY';

    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
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
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: 'Number of Trips'
          },
          grid: {
            drawOnChartArea: false
          },
          beginAtZero: true
        },
        x: {
          title: {
            display: true,
            text: this.getTimeframeXAxisLabel()
          },
          ticks: {
            autoSkip: false,
            maxRotation: isWeekly ? 45 : 0,
            minRotation: isWeekly ? 45 : 0,
            padding: 8
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              let label = context.dataset.label || '';
              if (label) label += ': ';

              const value = Number(context.parsed.y);

              if (context.datasetIndex === 0) {
                label += value >= 1000
                  ? (value / 1000).toFixed(2) + ' tons'
                  : value.toFixed(0) + ' kg';
              } else {
                label += value.toFixed(0) + ' trips';
              }

              return label;
            }
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

  formatWeight(weight: number): string {
    if (!weight && weight !== 0) return '0 kg';
    if (weight >= 1000) {
      return (weight / 1000).toFixed(1) + ' tons';
    }
    return Math.round(weight) + ' kg';
  }

  formatDate(dateString: string | Date): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  getPeriodLabel(): string {
    if (this.startDate === this.endDate) {
      return this.startDate;
    }
    return `${this.startDate} to ${this.endDate}`;
  }

  exportReportToExcel(): void {
    if (!this.filteredRecords.length) {
      alert('No data to export. Please load data first.');
      return;
    }

    try {
      const header = ['Slip No', 'Vehicle No', 'Date', 'Net Weight (kg)', 'Gross Weight (kg)'];

      const body = this.filteredRecords.map(r => [
        r.id?.slipno ?? 'N/A',
        r.vno ?? 'N/A',
        this.formatDate(r.edate || r.gdate),
        this.formatWeightSimple(r.nweight),
        this.formatWeightSimple(r.gweight)
      ]);

      const sumNetWeight = this.filteredRecords.reduce((s, r) => s + (Number(r.nweight) || 0), 0);
      const sumGrossWeight = this.filteredRecords.reduce((s, r) => s + (Number(r.gweight) || 0), 0);

      body.push(['', '', '', '', '']);
      body.push(['', '', 'TOTALS',
        this.formatNumberWithUnits(sumNetWeight),
        this.formatNumberWithUnits(sumGrossWeight)
      ]);
      body.push(['', '', 'Total Records', this.filteredRecords.length.toString(), '']);

      const aoa = [header, ...body];
      const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

      worksheet['!cols'] = [
        { wch: 12 },
        { wch: 15 },
        { wch: 15 },
        { wch: 18 },
        { wch: 18 }
      ];

      const workbook: XLSX.WorkBook = {
        Sheets: { 'Report': worksheet },
        SheetNames: ['Report']
      };

      const fileName = `Weighbridge_Report_${this.getDateRangeLabel().replace(/ /g, '_')}_${new Date().getTime()}.xlsx`;
      XLSX.writeFile(workbook, fileName);
    } catch (err) {
      console.error('Error exporting report to Excel', err);
      alert('Error exporting report to Excel');
    }
  }

  exportReportToPDF(): void {
    if (!this.filteredRecords.length) {
      alert('No data to export. Please load data first.');
      return;
    }

    try {
      const doc = new jsPDF();

      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.text('Weighbridge Analytics Report', 14, 15);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Weighbridge ID: ${this.wbId}`, 14, 22);
      doc.text(`Date Range: ${this.getDateRangeLabel()}`, 14, 28);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 34);

      let sumNetWeight = 0;
      let sumGrossWeight = 0;

      const rows = this.filteredRecords.map(r => {
        const netWt = Number(r.nweight) || 0;
        const grossWt = Number(r.gweight) || 0;
        sumNetWeight += netWt;
        sumGrossWeight += grossWt;

        return [
          r.id?.slipno ?? 'N/A',
          r.vno ?? 'N/A',
          this.formatDate(r.edate || r.gdate),
          this.formatNumberForPDF(netWt),
          this.formatNumberForPDF(grossWt)
        ];
      });

      rows.push(['', '', 'TOTALS',
        this.formatNumberForPDF(sumNetWeight),
        this.formatNumberForPDF(sumGrossWeight)
      ]);
      rows.push(['', '', 'Total Records', this.filteredRecords.length.toString(), '']);

      autoTable(doc, {
        head: [['Slip No', 'Vehicle No', 'Date', 'Net Weight (kg)', 'Gross Weight (kg)']],
        body: rows,
        startY: 40,
        margin: { left: 10, right: 10 },
        tableWidth: 'auto',
        styles: {
          fontSize: 8,
          cellPadding: 4,
          font: 'helvetica',
          lineWidth: 0.1,
          overflow: 'linebreak',
          halign: 'center'
        },
        columnStyles: {
          0: { cellWidth: 25, halign: 'center' },
          1: { cellWidth: 30, halign: 'center' },
          2: { cellWidth: 30, halign: 'center' },
          3: { cellWidth: 30, halign: 'right' },
          4: { cellWidth: 30, halign: 'right' }
        },
        headStyles: {
          fillColor: [18, 46, 82],
          textColor: 255,
          fontStyle: 'bold',
          halign: 'center'
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        }
      });

      const fileName = `Weighbridge_Report_${this.getDateRangeLabel().replace(/ /g, '_')}_${new Date().getTime()}.pdf`;
      doc.save(fileName);
    } catch (err) {
      console.error('Error exporting report to PDF', err);
      alert('Error exporting report to PDF');
    }
  }

  formatNumberWithUnits(num: number | string): string {
    const cleanNum = num.toString()
      .replace(/\./g, '')
      .replace(/,/g, '.')
      .replace(/[^\d.-]/g, '');

    const numberValue = parseFloat(cleanNum);

    if (isNaN(numberValue)) return '0';

    if (Math.abs(numberValue) >= 1000000) {
      const millions = numberValue / 1000000;
      const formatted = millions % 1 === 0 ?
        Math.floor(millions).toString() :
        millions.toFixed(2).replace('.', ',');

      const parts = formatted.split(',');
      if (parts[0].length > 3) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }

      return parts.join(',') + ' M';
    }

    if (Math.abs(numberValue) >= 1000) {
      const formatted = numberValue % 1 === 0 ?
        Math.floor(numberValue).toString() :
        numberValue.toFixed(2).replace('.', ',');

      const parts = formatted.split(',');
      if (parts[0].length > 3) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }

      return parts.join(',') + ' K';
    }

    if (numberValue % 1 === 0) {
      return Math.floor(numberValue).toString();
    } else {
      return numberValue.toFixed(2).replace('.', ',');
    }
  }

  formatWeightSimple(weight: string | number): string {
    if (!weight && weight !== 0) return '0';

    const cleanWeight = weight.toString()
      .replace(/\./g, '')
      .replace(/,/g, '.')
      .replace(/[^\d.-]/g, '');

    const weightNum = parseFloat(cleanWeight);

    if (isNaN(weightNum)) return '0';

    if (weightNum % 1 === 0) {
      const intPart = Math.floor(Math.abs(weightNum)).toString();
      const sign = weightNum < 0 ? '-' : '';

      if (intPart.length > 3) {
        return sign + intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }
      return sign + intPart;
    }

    const formatted = weightNum.toFixed(2).replace('.', ',');
    const parts = formatted.split(',');

    if (parts[0].replace('-', '').length > 3) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    return parts.join(',');
  }

  private formatNumberForPDF(num: number): string {
    return num.toLocaleString('en-US', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      useGrouping: true
    });
  }

  private getDateRangeLabel(): string {
    if (!this.startDate && !this.endDate) return 'AllDates';
    if (this.startDate === this.endDate) return this.startDate;
    return `${this.startDate}_to_${this.endDate}`;
  }
}