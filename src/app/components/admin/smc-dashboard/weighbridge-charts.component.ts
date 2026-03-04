import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmcService } from '../../../services/smc.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { TimeFrame, TimeFrameDataDTO, TimeFrameRequest } from '../../../services/timeframe.service';
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

          <!-- Report Buttons -->
          <div class="report-buttons">
            <button (click)="exportReportToExcel()" class="report-btn excel-btn" title="Download report as Excel">
              <span class="btn-icon">📊</span> Export Excel Report
            </button>
            <button (click)="exportReportToPDF()" class="report-btn pdf-btn" title="Download report as PDF">
              <span class="btn-icon">📄</span> Export PDF Report
            </button>
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
                  {{ selectedTimeframe === 'WEEKLY' ? 'Month' : selectedTimeframe === 'YEARLY' ? 'Fiscal Year' : 'Year' }}:
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
          
          <!-- Timeframe Data Tabs -->
          <div class="timeframe-tabs" *ngIf="timeframeData?.length">
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
          <div class="timeframe-summary" *ngIf="timeframeData?.length">
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

    /* PDF Export Dialog */
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

    /* Tabs */
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

    /* Data Table */
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

    /* Details Grid */
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

    /* Timeframe Summary */
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

  // Weighbridge data properties (for report generation)
  allWeighbridgeData: any[] = [];
  filteredRecords: any[] = [];

  // Timeframe properties
  selectedTimeframe: string = 'WEEKLY';
  timeframeChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  timeframeData: TimeFrameDataDTO[] = [];
  maxWeight: number = 0;
  highestWeightPeriod: TimeFrameDataDTO | null = null;
  activeTab: 'chart' | 'table' | 'details' = 'chart';

  // PDF Export properties
  showPdfExportDialog = false;
  pdfExportStartDate: string = '';
  pdfExportEndDate: string = '';

  // Secondary Filter properties (Month/Year based on timeframe)
  selectedSecondaryFilter: string = '';
  secondaryFilterOptions: { label: string; value: string }[] = [];

  // Chart data
  netTrendChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  last24ChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };

  // Summary data
  summaryData: any = null;
  allTimeNetWeight: number = 0;

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
            
            // Add additional information for timeframe chart
            if (context.datasetIndex === 0 && context.dataIndex !== undefined) {
              const period = this.timeframeData?.[context.dataIndex];
              if (period) {
                label += ` (${period.totalEntries} trips)`;
              }
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
    weekAgo.setDate(weekAgo.getDate() - 30); // Changed to 30 days for better initial view
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
    
    // Filter records if data is already loaded
    if (this.allWeighbridgeData && this.allWeighbridgeData.length > 0) {
      console.log('\n📌 Period changed to:', period);
      console.log('New date range:', this.startDate, 'to', this.endDate);
      this.filterRecordsByDateRange();
    }
    
    this.loadSummary();
    this.loadNetTrend();
    this.loadTimeframeData();
  }

  onDateChange(): void {
    this.selectedPeriod = 'custom';
    
    // Filter records if data is already loaded
    if (this.allWeighbridgeData && this.allWeighbridgeData.length > 0) {
      console.log('\n📌 Custom dates changed');
      console.log('New date range:', this.startDate, 'to', this.endDate);
      this.filterRecordsByDateRange();
    }
    
    this.loadSummary();
    this.loadNetTrend();
    this.loadTimeframeData();
  }

  onTimeframeChange(): void {
    this.generateSecondaryFilterOptions();
    this.selectedSecondaryFilter = this.secondaryFilterOptions.length > 0 ? this.secondaryFilterOptions[0].value : '';
    this.loadTimeframeData();
  }

  private generateSecondaryFilterOptions(): void {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    this.secondaryFilterOptions = [];

    if (this.selectedTimeframe === 'WEEKLY') {
      // Generate months from November 2025 to current month
      const startMonth = 10; // November (0-indexed)
      const startYear = 2025;
      
      for (let year = startYear; year <= currentYear; year++) {
        const endMonth = year === currentYear ? currentMonth : 11;
        const start = year === startYear ? startMonth : 0;
        
        for (let month = start; month <= endMonth; month++) {
          const monthName = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
          this.secondaryFilterOptions.push({
            label: monthName,
            value: `${year}-${String(month + 1).padStart(2, '0')}`
          });
        }
      }
    } else if (this.selectedTimeframe === 'MONTHLY' || this.selectedTimeframe === 'QUARTERLY' || this.selectedTimeframe === 'HALF_YEARLY') {
      // Generate years from 2025 to current year
      for (let year = 2025; year <= currentYear; year++) {
        this.secondaryFilterOptions.push({
          label: year.toString(),
          value: year.toString()
        });
      }
    } else if (this.selectedTimeframe === 'YEARLY') {
      // Generate fiscal year ranges (e.g., 2025-2026)
      for (let year = 2025; year <= currentYear; year++) {
        const fiscalYear = `${year}-${year + 1}`;
        this.secondaryFilterOptions.push({
          label: fiscalYear,
          value: fiscalYear
        });
      }
    }
  }

  onSecondaryFilterChange(): void {
    this.loadTimeframeData();
  }

  getTimeframeDateRange(): string {
    // If secondary filter is selected, show the range for that selection
    if (this.selectedSecondaryFilter && this.secondaryFilterOptions.length > 0) {
      if (this.selectedTimeframe === 'WEEKLY') {
        // For weekly: show the month range
        const [year, month] = this.selectedSecondaryFilter.split('-');
        const monthDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        const monthName = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        const firstDay = new Date(parseInt(year), parseInt(month) - 1, 1);
        const lastDay = new Date(parseInt(year), parseInt(month), 0);
        return `${firstDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} to ${lastDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      } else if (this.selectedTimeframe === 'YEARLY') {
        // For yearly: show the fiscal year range
        const [startYear, endYear] = this.selectedSecondaryFilter.split('-');
        return `${startYear}-${endYear}`;
      } else {
        // For monthly, quarterly, half-yearly: show the year
        return `Year: ${this.selectedSecondaryFilter}`;
      }
    }
    
    // Fallback to the original date range
    if (this.startDate === this.endDate) {
      return `Date: ${this.formatDate(this.startDate)}`;
    }
    return `Date Range: ${this.formatDate(this.startDate)} to ${this.formatDate(this.endDate)}`;
  }



  loadAllCharts(): void {
    if (!this.wbId) {
      this.error = true;
      this.errorMessage = 'Please enter a Weighbridge ID';
      return;
    }

    console.log('\n========== LOADING DATA ==========');
    console.log('🔵 WB ID:', this.wbId);
    console.log('📅 Date Range:', this.startDate, 'to', this.endDate);
    console.log('================================\n');

    this.loading = true;
    this.error = false;

    Promise.all([
      this.loadNetTrend(),
      this.loadLast24Trend(),
      this.loadSummary(),
      this.loadTimeframeData(),
      this.loadAllTimeSummary(),
      this.loadAllWeighbridgeRecords()
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
          // Don't set global error flag, just resolve
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
          // Don't set global error flag, just resolve
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
          // Don't set global error flag, just resolve
          resolve();
        }
      });
    });
  }

  loadAllTimeSummary(): Promise<void> {
    return new Promise((resolve) => {
      // Load data from Nov 21, 2025 to current date
      const allTimeStartDate = '2025-11-21';
      const today = new Date();
      const allTimeEndDate = today.toISOString().split('T')[0];
      
      const startIso = `${allTimeStartDate}T00:00:00`;
      const endIso = `${allTimeEndDate}T23:59:59`;

      this.smcService.getSummary(startIso, endIso, this.wbId).subscribe({
        next: (data: any) => {
          this.allTimeNetWeight = data?.totalNetWeight || 0;
          console.log('All-time net weight loaded:', this.allTimeNetWeight);
          resolve();
        },
        error: (err) => {
          console.error('Error loading all-time summary:', err);
          // Set to 0 if there's an error, don't fail the whole load
          this.allTimeNetWeight = 0;
          resolve();
        }
      });
    });
  }

  /**
   * Load all weighbridge records for report generation
   */
  loadAllWeighbridgeRecords(): Promise<void> {
    return new Promise((resolve) => {
      console.log('\n📊 === LOADING ALL WEIGHBRIDGE RECORDS ===');
      console.log('WB ID:', this.wbId);
      
      this.smcService.getAllWeighbridgeData(this.wbId).subscribe({
        next: (data: any[]) => {
          this.allWeighbridgeData = data || [];
          console.log('✅ Total records loaded:', this.allWeighbridgeData.length);
          
          if (this.allWeighbridgeData.length > 0) {
            console.log('\n📋 FIRST RECORD STRUCTURE:');
            const firstRecord = this.allWeighbridgeData[0];
            console.log('Full first record:', JSON.stringify(firstRecord, null, 2));
            console.log('\n🗂️ AVAILABLE FIELDS:');
            console.log(Object.keys(firstRecord));
            
            // Log specific fields
            console.log('\n🔍 KEY FIELDS IN FIRST RECORD:');
            console.log('  id:', firstRecord.id);
            console.log('  vno:', firstRecord.vno);
            console.log('  edate:', firstRecord.edate);
            console.log('  gdate:', firstRecord.gdate);
            console.log('  gweight:', firstRecord.gweight);
            console.log('  nweight:', firstRecord.nweight);
          }
          
          console.log('\n=== STARTING DATE FILTER ===\n');
          // Apply current date filter to filteredRecords
          this.filterRecordsByDateRange();
          resolve();
        },
        error: (err) => {
          console.error('❌ Error loading all weighbridge data:', err);
          this.allWeighbridgeData = [];
          this.filteredRecords = [];
          resolve();
        }
      });
    });
  }

  /**
   * Filter records by date range (for report generation)
   */
  filterRecordsByDateRange(): void {
    console.log('\n🔍 === FILTERING BY DATE RANGE ===');
    console.log('Filter Date Range:', this.startDate, 'to', this.endDate);
    console.log('Total records to filter:', this.allWeighbridgeData?.length || 0);
    
    if (!this.allWeighbridgeData || this.allWeighbridgeData.length === 0) {
      console.warn('⚠️  No data available for filtering');
      this.filteredRecords = [];
      return;
    }

    // Filter records by date range (matching SMC Dashboard approach)
    this.filteredRecords = this.allWeighbridgeData.filter((record, index) => {
      const recordDate = this.getRecordDate(record);
      
      if (!recordDate) {
        console.log(`Record ${index}: ❌ NO VALID DATE - Skipping`);
        return false;
      }

      // Check if date is within range
      if (this.startDate && recordDate < new Date(this.startDate)) {
        return false;
      }
      if (this.endDate && recordDate > new Date(this.endDate + 'T23:59:59')) {
        return false;
      }
      
      console.log(`Record ${index}: ✅ INCLUDED`);
      console.log('  Slip No:', record.id?.slipno);
      console.log('  VNo:', record.vno);
      console.log('  Record Date:', recordDate.toISOString());
      console.log('  GWeight:', record.gweight);
      console.log('  NWeight:', record.nweight);
      
      return true;
    });

    console.log('\n✅ === FILTER COMPLETE ===');
    console.log('Total filtered records:', this.filteredRecords.length);
    console.log('=========================\n');
  }

  /**
   * Extract date from record (handles multiple possible date fields)
   */
  getRecordDate(record: any): Date | null {
    // Try multiple possible date field names
    const dateStr = record.edate || record.gdate || record.entryDate || record.date;
    
    if (!dateStr) {
      return null;
    }

    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return null;
      return date;
    } catch {
      return null;
    }
  }

  loadTimeframeData(): Promise<void> {
    return new Promise((resolve) => {
      this.loading = true;
      
      // Create TimeFrameRequest object
      const request: TimeFrameRequest = {
        wbId: this.wbId,
        startDate: this.startDate,
        endDate: this.endDate,
        timeframe: this.selectedTimeframe as TimeFrame
      };

      // Call the timeframe service
      this.smcService.getTimeframeData(request).subscribe({
        next: (data: TimeFrameDataDTO[]) => {
          console.log('Timeframe Data from API:', data);
          
          // Filter data based on secondary filter selection
          const filteredData = this.filterDataBySecondarySelection(data);
          this.timeframeData = filteredData;
          
          // Prepare chart data
          this.prepareTimeframeChartData(filteredData);
          
          // Calculate max weight and highest period
          this.calculateTimeframeMetrics();
          
          resolve();
        },
        error: (err) => {
          console.error('Error loading timeframe data:', err);
          // Don't set global error flag, just resolve
          this.timeframeData = [];
          this.timeframeChartData = { labels: [], datasets: [] };
          resolve();
        },
        complete: () => {
          this.loading = false;
        }
      });
    });
  }

  private filterDataBySecondarySelection(data: TimeFrameDataDTO[]): TimeFrameDataDTO[] {
    if (!this.selectedSecondaryFilter || this.selectedTimeframe !== 'WEEKLY') {
      return data;
    }

    // For WEEKLY timeframe, filter by selected month
    const [year, month] = this.selectedSecondaryFilter.split('-');
    const selectedYear = parseInt(year);
    const selectedMonth = parseInt(month);

    // Get the first and last day of the selected month
    const monthStart = new Date(selectedYear, selectedMonth - 1, 1);
    const monthEnd = new Date(selectedYear, selectedMonth, 0);
    monthEnd.setHours(23, 59, 59, 999);

    return data.filter(item => {
      const itemStart = new Date(item.startDate);
      const itemEnd = new Date(item.endDate);
      
      // Check if period overlaps with the selected month
      // Period overlaps if: itemStart <= monthEnd AND itemEnd >= monthStart
      return itemStart <= monthEnd && itemEnd >= monthStart;
    });
  }

  private prepareTimeframeChartData(data: TimeFrameDataDTO[]): void {
    if (!data || data.length === 0) {
      this.timeframeChartData = { labels: [], datasets: [] };
      return;
    }

    // Include ALL periods, even those with zero trips (don't filter them out)
    const allData = data.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return dateA - dateB;
    });

    const labels = allData.map(period => {
      // Extract short label and calculate days
      const shortLabel = this.extractShortLabel(period.periodName);
      const daysInPeriod = this.calculateDaysInPeriod(period.startDate, period.endDate);
      return `${shortLabel}\n(${daysInPeriod}d)`;
    });

    const netWeights = allData.map(period => period.totalNetWeight || 0);
    const grossWeights = allData.map(period => period.totalGrossWeight || 0);
    const tripCounts = allData.map(period => period.totalEntries || 0);

    const backgroundColor = this.getTimeframeColor(this.selectedTimeframe);

    // Create datasets for the chart
    this.timeframeChartData = {
      labels,
      datasets: [
        {
          label: 'Net Weight',
          data: netWeights,
          backgroundColor,
          borderColor: backgroundColor,
          borderWidth: 2,
          barPercentage: 0.7,
          categoryPercentage: 0.8,
          yAxisID: 'y',
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

  private calculateDaysInPeriod(startDate: any, endDate: any): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
    return diffDays;
  }

  private extractShortLabel(periodName: string): string {
    if (!periodName) return 'Unknown';
    
    switch (this.selectedTimeframe) {
      case 'WEEKLY':
        // Format: "Week 1: 02 Dec to 08 Dec (7 days)" -> "W1"
        const weekMatch = periodName.match(/Week (\d+)/);
        return weekMatch ? `W${weekMatch[1]}` : periodName;
      
      case 'MONTHLY':
        // Format: "December 2024" -> "Dec'24"
        const monthMatch = periodName.match(/(\w+) (\d+)/);
        if (monthMatch) {
          const month = monthMatch[1].substring(0, 3);
          const year = monthMatch[2].substring(2);
          return `${month}'${year}`;
        }
        return periodName;
      
      case 'QUARTERLY':
        // Format: "Quarter 1, 2024" -> "Q1'24"
        const quarterMatch = periodName.match(/Quarter (\d+), (\d+)/);
        if (quarterMatch) {
          const quarter = quarterMatch[1];
          const year = quarterMatch[2].substring(2);
          return `Q${quarter}'${year}`;
        }
        return periodName;
      
      case 'HALF_YEARLY':
        // Format: "First Half, 2024" -> "H1'24"
        if (periodName.includes('First Half')) {
          const yearMatch = periodName.match(/\d+/);
          const year = yearMatch ? yearMatch[0].substring(2) : '';
          return `H1'${year}`;
        } else if (periodName.includes('Second Half')) {
          const yearMatch = periodName.match(/\d+/);
          const year = yearMatch ? yearMatch[0].substring(2) : '';
          return `H2'${year}`;
        }
        return periodName;
      
      case 'YEARLY':
        // Format: "Year 2024" -> "2024"
        const yearMatch = periodName.match(/\d+/);
        return yearMatch ? yearMatch[0] : periodName;
      
      default:
        return periodName;
    }
  }

  private calculateTimeframeMetrics(): void {
    if (!this.timeframeData || this.timeframeData.length === 0) {
      this.maxWeight = 0;
      this.highestWeightPeriod = null;
      return;
    }

    // Find period with maximum net weight
    this.maxWeight = Math.max(...this.timeframeData.map(p => p.totalNetWeight || 0));
    this.highestWeightPeriod = this.timeframeData.find(p => p.totalNetWeight === this.maxWeight) || null;
  }

  private getTimeframeColor(timeframe: string): string {
    switch (timeframe) {
      case 'WEEKLY': return '#28a745'; // Green
      case 'MONTHLY': return '#007bff'; // Blue
      case 'QUARTERLY': return '#ffc107'; // Yellow
      case 'HALF_YEARLY': return '#fd7e14'; // Orange
      case 'YEARLY': return '#6f42c1'; // Purple
      default: return '#28a745';
    }
  }

  // Helper methods for calculations
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
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive
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

    // Filter data based on selected date range
    const rangeStart = new Date(this.pdfExportStartDate);
    const rangeEnd = new Date(this.pdfExportEndDate);
    
    // Generate weekly breakdown for the selected date range
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
      // Calculate the end of this week (7 days later or end date, whichever is earlier)
      let currentWeekEnd = new Date(currentWeekStart);
      currentWeekEnd.setDate(currentWeekEnd.getDate() + 6); // 6 days to get 7 day week
      
      if (currentWeekEnd > endDate) {
        currentWeekEnd = new Date(endDate);
      }
      
      // Calculate number of days in this week
      const daysInWeek = Math.floor((currentWeekEnd.getTime() - currentWeekStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      // Find data that falls within this week
      const weekData = this.timeframeData.filter(item => {
        const itemStart = new Date(item.startDate);
        const itemEnd = new Date(item.endDate);
        
        // Check if the item overlaps with this week
        return itemStart <= currentWeekEnd && itemEnd >= currentWeekStart;
      });
      
      // Aggregate data for this week
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
      
      // Calculate averages
      if (aggregatedWeek.totalEntries > 0) {
        aggregatedWeek.averageNetWeight = aggregatedWeek.totalNetWeight / aggregatedWeek.totalEntries;
        aggregatedWeek.averageGrossWeight = aggregatedWeek.totalGrossWeight / aggregatedWeek.totalEntries;
      }
      
      weeks.push(aggregatedWeek);
      
      // Move to next week
      currentWeekStart = new Date(currentWeekEnd);
      currentWeekStart.setDate(currentWeekStart.getDate() + 1);
      weekNumber++;
    }
    
    return weeks;
  }

  private exportTimeframeDataToPdf(data: TimeFrameDataDTO[]): void {
    try {
      // Create PDF using jsPDF
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPosition = 15;

      // Title
      doc.setFontSize(18);
      doc.setTextColor(33, 37, 41);
      doc.text('Timeframe Analysis Report', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;

      // Report info
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

      // Summary section
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

      // Data table
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

      // Use autoTable plugin with proper typing
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

      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      }

      // Save the PDF
      const fileName = `timeframe_analysis_${this.selectedTimeframe.toLowerCase()}_${this.pdfExportStartDate}_to_${this.pdfExportEndDate}.pdf`;
      doc.save(fileName);
      console.log('PDF exported successfully:', fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please check the console for details.');
    }
  }



  exportTimeframeData(): void {
    if (!this.timeframeData || this.timeframeData.length === 0) {
      alert('No data to export');
      return;
    }

    const csvContent = this.convertToCSV(this.timeframeData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `timeframe_data_${this.selectedTimeframe.toLowerCase()}_${this.startDate}_${this.endDate}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private convertToCSV(data: TimeFrameDataDTO[]): string {
    const headers = ['Period', 'Start Date', 'End Date', 'Total Trips', 'Total Net Weight', 'Total Gross Weight', 'Avg Net Weight', 'Avg Gross Weight'];
    const rows = data.map(item => [
      item.periodName,
      item.startDate,
      item.endDate,
      item.totalEntries,
      item.totalNetWeight,
      item.totalGrossWeight,
      item.averageNetWeight,
      item.averageGrossWeight
    ]);
    
    return [headers, ...rows].map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
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
            drawOnChartArea: false,
          },
          beginAtZero: true
        },
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
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              const value = Number(context.parsed.y);
              
              if (context.datasetIndex === 0) {
                // Weight dataset
                if (value >= 1000) {
                  label += (value / 1000).toFixed(2) + ' tons';
                } else {
                  label += value + ' kg';
                }
              } else {
                // Trip count dataset
                label += value + ' trips';
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

  private handleError(error: any): void {
    this.error = true;
    this.errorMessage = error?.message || 'Failed to load chart data';
    this.loading = false;
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

  // ==================== REPORT GENERATION METHODS ====================

  /**
   * Export weighbridge data as an Excel report with totals
   */
  exportReportToExcel(): void {
    if (!this.summaryData) {
      alert('No data to export. Please load data first.');
      return;
    }

    try {
      const reportRows = this.getReportRows();
      
      if (reportRows.length === 0) {
        alert('No data available for export');
        return;
      }

      // Build array-of-arrays: header + data rows
      const header = ['WB ID', 'Date', 'Time', 'Net Weight (kg)', 'Gross Weight (kg)'];
      
      // Format rows
      const body = reportRows.map(r => [
        r['wbId'] || 'N/A',
        r['date'] || 'N/A',
        r['time'] || 'N/A',
        this.formatWeightSimple(r['netWeight']),
        this.formatWeightSimple(r['grossWeight'])
      ]);

      // Calculate totals
      const sumNetWeight = reportRows.reduce((s, x) => {
        const value = parseFloat(x['netWeight'].toString().replace(/\./g, '').replace(/,/g, '.'));
        return s + (isNaN(value) ? 0 : value);
      }, 0);
      
      const sumGrossWeight = reportRows.reduce((s, x) => {
        const value = parseFloat(x['grossWeight'].toString().replace(/\./g, '').replace(/,/g, '.'));
        return s + (isNaN(value) ? 0 : value);
      }, 0);

      // Add summary rows
      body.push(['', '', '', '', '']);
      body.push(['', '', 'TOTALS', 
        this.formatNumberWithUnits(sumNetWeight),
        this.formatNumberWithUnits(sumGrossWeight)
      ]);
      body.push(['', '', 'Total Records', reportRows.length.toString(), '']);

      const aoa = [header, ...body];
      const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

      // Set column widths
      worksheet['!cols'] = [
        { wch: 20 },  // WB ID
        { wch: 15 },  // Date
        { wch: 12 },  // Time
        { wch: 18 },  // Net Weight
        { wch: 18 }   // Gross Weight
      ];

      const workbook: XLSX.WorkBook = { 
        Sheets: { 'Report': worksheet }, 
        SheetNames: ['Report'] 
      };
      
      const fileName = `Weighbridge_Report_${this.getDateRangeLabel().replace(/ /g, '_')}_${new Date().getTime()}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      
      console.log('✅ Report exported to Excel successfully');
    } catch (err) {
      console.error('❌ Error exporting report to Excel', err);
      alert('Error exporting report to Excel');
    }
  }

  /**
   * Export weighbridge data as a PDF report with totals
   */
  exportReportToPDF(): void {
    if (!this.summaryData) {
      alert('No data to export. Please load data first.');
      return;
    }

    try {
      const reportRows = this.getReportRows();
      
      if (reportRows.length === 0) {
        alert('No data available for export');
        return;
      }

      const doc = new jsPDF();

      // Add title and header info
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.text('Weighbridge Analytics Report', 14, 15);
      
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Weighbridge ID: ${this.wbId}`, 14, 22);
      doc.text(`Date Range: ${this.getDateRangeLabel()}`, 14, 28);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 34);

      // Calculate totals
      let sumNetWeight = 0;
      let sumGrossWeight = 0;
      
      const formattedRows = reportRows.map(row => {
        const netWt = parseFloat(row['netWeight'].toString().replace(/\./g, '').replace(/,/g, '.')) || 0;
        const grossWt = parseFloat(row['grossWeight'].toString().replace(/\./g, '').replace(/,/g, '.')) || 0;
        
        sumNetWeight += netWt;
        sumGrossWeight += grossWt;
        
        return [
          row['wbId'] || 'N/A',
          row['date'] || 'N/A',
          row['time'] || 'N/A',
          this.formatNumberForPDF(netWt),
          this.formatNumberForPDF(grossWt)
        ];
      });

      // Add totals row
      formattedRows.push(['', '', 'TOTALS', 
        this.formatNumberForPDF(sumNetWeight),
        this.formatNumberForPDF(sumGrossWeight)
      ]);
      formattedRows.push(['', '', 'Total Records', reportRows.length.toString(), '']);

      // Create table
      autoTable(doc, {
        head: [['WB ID', 'Date', 'Time', 'Net Weight (kg)', 'Gross Weight (kg)']],
        body: formattedRows,
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
          1: { cellWidth: 25, halign: 'center' },
          2: { cellWidth: 20, halign: 'center' },
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
      
      console.log('✅ Report exported to PDF successfully');
    } catch (err) {
      console.error('❌ Error exporting report to PDF', err);
      alert('Error exporting report to PDF');
    }
  }

  /**
   * Get report rows from trend data
   */
  private getReportRows(): any[] {
    // Extract data from netTrendChartData if available
    const reportRows: any[] = [];
    
    // This would ideally come from the raw API data, but for now we'll construct from available data
    if (this.netTrendChartData.labels && this.netTrendChartData.datasets.length > 0) {
      const labels = this.netTrendChartData.labels as string[];
      const netWeightData = this.netTrendChartData.datasets[0].data as number[];
      
      labels.forEach((label, index) => {
        reportRows.push({
          'wbId': this.wbId,
          'date': label,
          'time': '',
          'netWeight': netWeightData[index] || 0,
          'grossWeight': 0 // We don't have gross weight in the current implementation
        });
      });
    }
    
    return reportRows;
  }

  /**
   * Helper method to format numbers with dots for thousands and optional decimals
   */
  formatNumberWithUnits(num: number | string): string {
    const cleanNum = num.toString()
      .replace(/\./g, '')
      .replace(/,/g, '.')
      .replace(/[^\d.-]/g, '');
    
    const numberValue = parseFloat(cleanNum);
    
    if (isNaN(numberValue)) return '0';
    
    // For millions (1,000,000 and above)
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
    
    // For thousands (1,000 and above, below 1,000,000)
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
    
    // For numbers below 1000
    if (numberValue % 1 === 0) {
      return Math.floor(numberValue).toString();
    } else {
      return numberValue.toFixed(2).replace('.', ',');
    }
  }

  /**
   * Helper method to format individual weight values (no units for individual rows)
   */
  formatWeightSimple(weight: string | number): string {
    if (!weight && weight !== 0) return '0';
    
    const cleanWeight = weight.toString()
      .replace(/\./g, '')
      .replace(/,/g, '.')
      .replace(/[^\d.-]/g, '');
    
    const weightNum = parseFloat(cleanWeight);
    
    if (isNaN(weightNum)) return '0';
    
    // No decimal places for whole numbers
    if (weightNum % 1 === 0) {
      const intPart = Math.floor(Math.abs(weightNum)).toString();
      const sign = weightNum < 0 ? '-' : '';
      
      // Add thousand separators
      if (intPart.length > 3) {
        return sign + intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }
      return sign + intPart;
    }
    
    // With decimal places
    const formatted = weightNum.toFixed(2).replace('.', ',');
    const parts = formatted.split(',');
    
    // Add thousand separators to integer part
    if (parts[0].replace('-', '').length > 3) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    
    return parts.join(',');
  }

  /**
   * Helper method to format numbers for PDF display
   */
  private formatNumberForPDF(num: number): string {
    return num.toLocaleString('en-US', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      useGrouping: true
    });
  }

  /**
   * Get date range label for file names and reports
   */
  private getDateRangeLabel(): string {
    if (!this.startDate && !this.endDate) return 'AllDates';
    if (this.startDate === this.endDate) return this.startDate;
    return `${this.startDate}_to_${this.endDate}`;
  }
}