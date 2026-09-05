import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

interface AvailabilityData {
  date: string;
  totalRegistered: number;
  present: number;
  absent: number;
}

interface ShiftSummary {
  date: string;
  morningOnly: number;
  eveningOnly: number;
  bothShifts: number;
  absent: number;
}

interface BusHistory {
  date: string;
  outTime: string;
  inTime: string;
  morningRoute: string;
  eveningRoute: string;
}

interface FrequentAbsentee {
  busNo: string;
  absentCount: number;
}

// Excel Data Interfaces
interface ExcelBusRecord {
  date: string;
  busNo: string;
  busRoute: string;
  shift: 'Morning' | 'Evening' | 'Both';
  status: 'Present' | 'Absent';
  outTime?: string;
  inTime?: string;
  driverName?: string;
  conductorName?: string;
}

interface ExcelUploadSummary {
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
  dateRange: {
    start: string;
    end: string;
  };
  busCount: number;
  routeCount: number;
}

interface AnalyticsFromExcel {
  dailyData: Map<string, { total: number; present: number; absent: number }>;
  busPerformance: Map<string, { totalDays: number; absentDays: number }>;
  shiftDistribution: {
    morning: number;
    evening: number;
    both: number;
    absent: number;
  };
  routePerformance: Map<string, { totalTrips: number; completedTrips: number }>;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  selector: 'app-bus-analytics',
  template: `
    <div class="analytics-container">
      <h2>🚌 Bus Analytics Dashboard</h2>

      <!-- Mode Toggle -->
      <div class="mode-toggle">
        <button 
          class="mode-btn" 
          [class.active]="!useExcelMode"
          (click)="toggleMode(false)"
        >
          📡 Live API Mode
        </button>
        <button 
          class="mode-btn" 
          [class.active]="useExcelMode"
          (click)="toggleMode(true)"
        >
          📊 Excel Upload Mode
        </button>
      </div>

      <!-- Live API Mode Controls -->
      <div class="controls" *ngIf="!useExcelMode">
        <div class="date-input-group">
          <label>Select Date:</label>
          <input 
            type="date" 
            [(ngModel)]="selectedDate" 
            (change)="onDateChange()"
            class="input-field"
            [disabled]="loading"
          >
        </div>
        <div class="date-input-group">
          <label>Frequent Absentees (Days):</label>
          <input 
            type="number" 
            [(ngModel)]="frequentAbsenteeDays" 
            (change)="onDaysChange()"
            class="input-field"
            [disabled]="loading"
            min="1"
            max="90"
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

      <!-- Excel Upload Mode Controls -->
      <div class="excel-upload-section" *ngIf="useExcelMode">
        <div class="upload-container">
          <div class="upload-area" 
               (drop)="onFileDrop($event)"
               (dragover)="onDragOver($event)"
               (click)="fileInput.click()"
               [class.dragover]="isDragging">
            <div class="upload-icon">📊</div>
            <h4>Upload Excel File</h4>
            <p class="upload-hint">Drag & drop your Excel file here or click to browse</p>
            <p class="upload-format">Supported formats: .xlsx, .xls</p>
            
            <input 
              #fileInput
              type="file" 
              accept=".xlsx,.xls"
              (change)="onFileSelected($event)"
              style="display: none"
            />
          </div>

          <!-- File Info & Progress -->
          <div class="file-info" *ngIf="selectedFile">
            <div class="file-details">
              <span class="file-name">📄 {{ selectedFile.name }}</span>
              <span class="file-size">{{ getFileSize(selectedFile.size) }}</span>
              <button class="remove-btn" (click)="removeFile()">✕</button>
            </div>
            
            <div class="progress-container" *ngIf="uploadProgress > 0">
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="uploadProgress"></div>
              </div>
              <span class="progress-text">{{ uploadProgress }}%</span>
            </div>

            <div class="upload-actions">
                <div class="upload-target">
                  <label>
                    <input type="radio" name="uploadTarget" [(ngModel)]="uploadTarget" value="master" />
                    Upload as Bus Master
                  </label>
                  <label>
                    <input type="radio" name="uploadTarget" [(ngModel)]="uploadTarget" value="outshedding" />
                    Upload as Outshedding
                  </label>
                </div>

                <button 
                  class="upload-btn"
                  (click)="uploadExcel()"
                  [disabled]="uploading || !selectedFile"
                >
                  {{ uploading ? 'Uploading...' : (uploadTarget === 'master' ? 'Upload Bus Master' : 'Upload Outshedding') }}
                </button>
                <button 
                  class="sample-btn"
                  (click)="downloadSample()"
                >
                  📥 Download Sample Excel
                </button>
            </div>
          </div>

          <!-- Upload Summary -->
          <div class="upload-summary" *ngIf="excelSummary">
            <h4>📋 Upload Summary</h4>
            <div class="summary-grid">
              <div class="summary-card">
                <span class="summary-label">Total Records</span>
                <span class="summary-value total">{{ excelSummary.totalRecords }}</span>
              </div>
              <div class="summary-card">
                <span class="summary-label">Valid Records</span>
                <span class="summary-value valid">{{ excelSummary.validRecords }}</span>
              </div>
              <div class="summary-card">
                <span class="summary-label">Invalid Records</span>
                <span class="summary-value invalid">{{ excelSummary.invalidRecords }}</span>
              </div>
              <div class="summary-card">
                <span class="summary-label">Unique Buses</span>
                <span class="summary-value">{{ excelSummary.busCount }}</span>
              </div>
            </div>
            <div class="date-range">
              <span>Date Range: {{ excelSummary.dateRange.start }} to {{ excelSummary.dateRange.end }}</span>
            </div>
          </div>
        </div>

        <!-- Excel Analytics Controls -->
        <div class="excel-controls" *ngIf="excelDataAvailable">
          <div class="control-group">
            <label>Analysis Period:</label>
            <select [(ngModel)]="selectedPeriod" (change)="updateExcelCharts()" class="period-select">
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="all">All Data</option>
            </select>
          </div>
          <div class="control-group">
            <label>View Type:</label>
            <select [(ngModel)]="selectedView" (change)="updateExcelCharts()" class="view-select">
              <option value="daily">Daily Overview</option>
              <option value="buses">Bus Performance</option>
              <option value="shifts">Shift Analysis</option>
              <option value="routes">Route Performance</option>
            </select>
          </div>
          <button class="export-btn" (click)="exportToExcel()">
            📊 Export Analytics
          </button>
        </div>
      </div>

      <!-- Loading/Error States -->
      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        <p>{{ useExcelMode ? 'Processing Excel data...' : 'Loading bus analytics data...' }}</p>
      </div>
      
      <div *ngIf="error" class="error">
        <p>{{ errorMessage }}</p>
        <button (click)="useExcelMode ? retryExcel() : loadData()" class="retry-btn">
          Retry
        </button>
      </div>

      <!-- Main Content -->
      <div *ngIf="!loading && !error" class="content">
        <!-- Excel Mode Charts -->
        <div *ngIf="useExcelMode && excelDataAvailable" class="excel-charts">
          
          <!-- Daily Attendance Trend -->
          <div class="section chart-section" *ngIf="selectedView === 'daily'">
            <h3>📈 Daily Attendance Trend</h3>
            <div class="chart-container">
              <canvas 
                baseChart
                [data]="dailyTrendChartData"
                [options]="dailyTrendChartOptions"
                [type]="'line'"
              ></canvas>
            </div>
          </div>

          <!-- Bus Performance -->
          <div class="section chart-section" *ngIf="selectedView === 'buses'">
            <h3>🚌 Top 10 Bus Performance</h3>
            <div class="chart-container">
              <canvas 
                baseChart
                [data]="busPerformanceChartData"
                [options]="busPerformanceChartOptions"
                [type]="'bar'"
              ></canvas>
            </div>
          </div>

          <!-- Shift Distribution -->
          <div class="section chart-section" *ngIf="selectedView === 'shifts'">
            <h3>🕐 Shift Distribution Analysis</h3>
            <div class="chart-row">
              <div class="chart-container half">
                <canvas 
                  baseChart
                  [data]="shiftDistributionChartData"
                  [options]="shiftDistributionChartOptions"
                  [type]="'doughnut'"
                ></canvas>
              </div>
              <div class="chart-container half">
                <canvas 
                  baseChart
                  [data]="shiftTrendChartData"
                  [options]="shiftTrendChartOptions"
                  [type]="'line'"
                ></canvas>
              </div>
            </div>
          </div>

          <!-- Route Performance -->
          <div class="section chart-section" *ngIf="selectedView === 'routes'">
            <h3>🗺️ Route Performance</h3>
            <div class="chart-container">
              <canvas 
                baseChart
                [data]="routePerformanceChartData"
                [options]="routePerformanceChartOptions"
                [type]="'bar'"
              ></canvas>
            </div>
          </div>

          <!-- Excel Data Tables -->
          <div class="section" *ngIf="excelAnalytics">
            <h3>📊 Detailed Analytics</h3>
            
            <!-- Bus Performance Table -->
            <div class="table-section" *ngIf="selectedView === 'buses'">
              <h4>Bus Performance Details</h4>
              <div class="table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Bus No</th>
                      <th>Total Days</th>
                      <th>Present Days</th>
                      <th>Absent Days</th>
                      <th>Attendance %</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let bus of getTopBuses(15); let i = index">
                      <td>{{ i + 1 }}</td>
                      <td class="bus-number">{{ bus.busNo }}</td>
                      <td>{{ bus.totalDays }}</td>
                      <td>{{ bus.presentDays }}</td>
                      <td>{{ bus.absentDays }}</td>
                      <td>
                        <span [class]="getAttendanceClass(bus.attendanceRate)">
                          {{ bus.attendanceRate }}%
                        </span>
                      </td>
                      <td>
                        <span [class]="getStatusClass(bus.attendanceRate)">
                          {{ getStatusLabel(bus.attendanceRate) }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Daily Summary Table -->
            <div class="table-section" *ngIf="selectedView === 'daily'">
              <h4>Daily Attendance Summary</h4>
              <div class="table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Total Buses</th>
                      <th>Present</th>
                      <th>Absent</th>
                      <th>Attendance %</th>
                      <th>Shift Coverage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let day of getDailySummary()">
                      <td>{{ day.date }}</td>
                      <td>{{ day.total }}</td>
                      <td>{{ day.present }}</td>
                      <td>{{ day.absent }}</td>
                      <td>{{ day.attendanceRate }}%</td>
                      <td>
                        <div class="shift-indicator">
                          <span class="shift-dot morning" [style.opacity]="day.morningCoverage"></span>
                          <span class="shift-dot evening" [style.opacity]="day.eveningCoverage"></span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Live API Mode Content (Existing) -->
        <div *ngIf="!useExcelMode && !loading && !error" class="content">
          <!-- Your existing Live API content here -->
          <!-- Daily Availability Overview -->
          <div class="section">
            <h3>📊 Daily Availability Summary</h3>
            <div class="overview-cards">
              <div class="card total">
                <div class="card-icon">📋</div>
                <div class="card-content">
                  <div class="card-label">Total Registered</div>
                  <div class="card-value">{{ availability?.totalRegistered || 0 }}</div>
                </div>
              </div>
              <div class="card present">
                <div class="card-icon">✅</div>
                <div class="card-content">
                  <div class="card-label">Present</div>
                  <div class="card-value">{{ availability?.present || 0 }}</div>
                  <div class="card-percentage" *ngIf="availability">
                    {{ getPercentage(availability.present, availability.totalRegistered) }}%
                  </div>
                </div>
              </div>
              <div class="card absent">
                <div class="card-icon">❌</div>
                <div class="card-content">
                  <div class="card-label">Absent</div>
                  <div class="card-value">{{ availability?.absent || 0 }}</div>
                  <div class="card-percentage" *ngIf="availability">
                    {{ getPercentage(availability.absent, availability.totalRegistered) }}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Shift Summary -->
          <div class="section" *ngIf="shiftSummary">
            <h3>🕐 Shift-wise Summary</h3>
            <div class="shift-cards">
              <div class="shift-card morning">
                <span class="shift-icon">🌅</span>
                <span class="shift-label">Morning Only</span>
                <span class="shift-value">{{ shiftSummary.morningOnly }}</span>
              </div>
              <div class="shift-card evening">
                <span class="shift-icon">🌆</span>
                <span class="shift-label">Evening Only</span>
                <span class="shift-value">{{ shiftSummary.eveningOnly }}</span>
              </div>
              <div class="shift-card both">
                <span class="shift-icon">🔄</span>
                <span class="shift-label">Both Shifts</span>
                <span class="shift-value">{{ shiftSummary.bothShifts }}</span>
              </div>
              <div class="shift-card absent">
                <span class="shift-icon">🚫</span>
                <span class="shift-label">Absent</span>
                <span class="shift-value">{{ shiftSummary.absent }}</span>
              </div>
            </div>

            <!-- Shift Distribution Chart -->
            <div class="chart-container" *ngIf="shiftChartData.labels">
              <canvas 
                baseChart
                [data]="shiftChartData"
                [options]="getShiftChartOptions()"
                [type]="'doughnut'"
              ></canvas>
            </div>
          </div>

          <!-- Missing Buses -->
          <div class="section" *ngIf="missingBuses">
            <h3>🔍 Missing Buses on {{ selectedDate }}</h3>
            <div *ngIf="missingBuses.length === 0" class="no-data">
              <p>✅ All buses are accounted for!</p>
            </div>
            <div *ngIf="missingBuses.length > 0" class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Bus Number</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let bus of missingBuses; let i = index">
                    <td>{{ i + 1 }}</td>
                    <td class="bus-number">{{ bus }}</td>
                    <td><span class="status-badge absent">Absent</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Frequent Absentees -->
          <div class="section" *ngIf="frequentAbsentees">
            <h3>📈 Frequent Absentees (Last {{ frequentAbsenteeDays }} Days)</h3>
            <div *ngIf="frequentAbsentees.length === 0" class="no-data">
              <p>✅ No frequent absentees found!</p>
            </div>
            <div *ngIf="frequentAbsentees.length > 0" class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Bus Number</th>
                    <th>Absent Days</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let absentee of frequentAbsentees; let i = index" 
                      (click)="viewBusHistory(absentee.busNo)"
                      class="clickable">
                    <td>{{ i + 1 }}</td>
                    <td class="bus-number">{{ absentee.busNo }}</td>
                    <td><span class="badge-red">{{ absentee.absentCount }} days</span></td>
                    <td>
                      <button class="action-btn" (click)="viewBusHistory(absentee.busNo); $event.stopPropagation()">
                        View History
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Bus History Modal/Section -->
          <div class="section" *ngIf="selectedBusHistory && selectedBusNo">
            <div class="history-header">
              <h3>📋 Bus History - {{ selectedBusNo }}</h3>
              <button class="close-btn" (click)="clearBusHistory()">✕</button>
            </div>
            <div *ngIf="selectedBusHistory.length === 0" class="no-data">
              <p>No history records found for this bus.</p>
            </div>
            <div *ngIf="selectedBusHistory.length > 0" class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Morning Route</th>
                    <th>Out Time</th>
                    <th>Evening Route</th>
                    <th>In Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let record of selectedBusHistory">
                    <td>{{ record.date }}</td>
                    <td>{{ record.morningRoute }}</td>
                    <td>{{ record.outTime }}</td>
                    <td>{{ record.eveningRoute }}</td>
                    <td>{{ record.inTime }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Existing styles remain the same, adding new styles for Excel upload */

    .mode-toggle {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .mode-btn {
      padding: 12px 24px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      background: white;
      color: #666;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      flex: 1;
    }

    .mode-btn:hover {
      border-color: #007bff;
      color: #007bff;
    }

    .mode-btn.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }

    .excel-upload-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 25px;
    }

    .upload-container {
      border: 2px dashed #ddd;
      border-radius: 8px;
      padding: 40px 20px;
      text-align: center;
      transition: border-color 0.3s;
      margin-bottom: 20px;
    }

    .upload-container.dragover {
      border-color: #007bff;
      background-color: #f0f8ff;
    }

    .upload-area {
      cursor: pointer;
    }

    .upload-icon {
      font-size: 48px;
      margin-bottom: 15px;
    }

    .upload-hint {
      color: #666;
      margin-bottom: 5px;
    }

    .upload-format {
      color: #999;
      font-size: 14px;
    }

    .file-info {
      margin-top: 20px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
    }

    .file-details {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
    }

    .file-name {
      flex: 1;
      font-weight: 600;
      color: #333;
    }

    .file-size {
      color: #666;
      font-size: 14px;
    }

    .remove-btn {
      background: none;
      border: none;
      color: #dc3545;
      cursor: pointer;
      font-size: 18px;
      padding: 0 5px;
    }

    .progress-container {
      margin: 15px 0;
    }

    .progress-bar {
      height: 8px;
      background: #e9ecef;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 5px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #28a745, #20c997);
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 14px;
      color: #28a745;
      font-weight: 600;
    }

    .upload-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    .upload-btn, .sample-btn, .export-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .upload-btn {
      background: #28a745;
      color: white;
      flex: 1;
    }

    .upload-btn:hover:not(:disabled) {
      background: #218838;
    }

    .upload-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .sample-btn, .export-btn {
      background: #6c757d;
      color: white;
    }

    .sample-btn:hover, .export-btn:hover {
      background: #5a6268;
    }

    .upload-summary {
      margin-top: 20px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #007bff;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin: 15px 0;
    }

    .summary-card {
      background: white;
      padding: 15px;
      border-radius: 6px;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .summary-label {
      display: block;
      font-size: 12px;
      color: #666;
      margin-bottom: 5px;
      text-transform: uppercase;
    }

    .summary-value {
      display: block;
      font-size: 24px;
      font-weight: 700;
    }

    .summary-value.total {
      color: #007bff;
    }

    .summary-value.valid {
      color: #28a745;
    }

    .summary-value.invalid {
      color: #dc3545;
    }

    .date-range {
      font-size: 14px;
      color: #666;
      text-align: center;
    }

    .excel-controls {
      display: flex;
      gap: 15px;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 20px;
      padding: 15px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .control-group label {
      font-weight: 600;
      font-size: 14px;
    }

    .period-select, .view-select {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      min-width: 150px;
    }

    .excel-charts {
      display: flex;
      flex-direction: column;
      gap: 25px;
    }

    .chart-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .chart-row {
      display: flex;
      gap: 20px;
    }

    .chart-container.half {
      flex: 1;
    }

    .table-section {
      margin-top: 20px;
    }

    .table-section h4 {
      color: #495057;
      margin-bottom: 15px;
      font-size: 16px;
    }

    .shift-indicator {
      display: flex;
      gap: 3px;
    }

    .shift-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      display: inline-block;
    }

    .shift-dot.morning {
      background: #ffa751;
    }

    .shift-dot.evening {
      background: #667eea;
    }

    .attendance-high {
      color: #28a745;
      font-weight: 600;
    }

    .attendance-medium {
      color: #ffc107;
      font-weight: 600;
    }

    .attendance-low {
      color: #dc3545;
      font-weight: 600;
    }

    .status-good {
      background: #d4edda;
      color: #155724;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }

    .status-warning {
      background: #fff3cd;
      color: #856404;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }

    .status-critical {
      background: #f8d7da;
      color: #721c24;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .mode-toggle {
        flex-direction: column;
      }

      .excel-controls {
        flex-direction: column;
        align-items: stretch;
      }

      .chart-row {
        flex-direction: column;
      }

      .upload-actions {
        flex-direction: column;
      }

      .summary-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class BusAnalyticsComponent implements OnInit {
  // Live API Mode Properties
  selectedDate: string;
  frequentAbsenteeDays: number = 7;
  loading = false;
  error = false;
  errorMessage = '';

  availability: AvailabilityData | null = null;
  shiftSummary: ShiftSummary | null = null;
  missingBuses: string[] = [];
  frequentAbsentees: FrequentAbsentee[] = [];
  selectedBusHistory: BusHistory[] = [];
  selectedBusNo: string = '';

  shiftChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };

  // Excel Upload Mode Properties
  useExcelMode: boolean = false;
  selectedFile: File | null = null;
  isDragging: boolean = false;
  uploading: boolean = false;
  uploadProgress: number = 0;
  uploadTarget: 'master' | 'outshedding' = 'master';
  
  excelSummary: ExcelUploadSummary | null = null;
  excelAnalytics: AnalyticsFromExcel | null = null;
  excelDataAvailable: boolean = false;
  
  selectedPeriod: string = '30';
  selectedView: string = 'daily';
  
  // Excel Chart Data
  dailyTrendChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  busPerformanceChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  shiftDistributionChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  shiftTrendChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  routePerformanceChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };

  // Chart Options
  dailyTrendChartOptions: ChartConfiguration['options'] = {};
  busPerformanceChartOptions: ChartConfiguration['options'] = {};
  shiftDistributionChartOptions: ChartConfiguration['options'] = {};
  shiftTrendChartOptions: ChartConfiguration['options'] = {};
  routePerformanceChartOptions: ChartConfiguration['options'] = {};

  private http = inject(HttpClient);
  private baseUrl = '/api';

  constructor() {
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0];
    this.initializeChartOptions();
  }

  ngOnInit(): void {
    this.loadData();
  }

  // Mode Toggle
  toggleMode(useExcel: boolean): void {
    this.useExcelMode = useExcel;
    if (!useExcel) {
      this.loadData();
    }
  }

  // Excel Upload Methods
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File): void {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];
    
    if (!validTypes.includes(file.type)) {
      this.error = true;
      this.errorMessage = 'Please upload a valid Excel file (.xlsx or .xls)';
      return;
    }

    this.selectedFile = file;
    this.error = false;
  }

  removeFile(): void {
    this.selectedFile = null;
    this.excelSummary = null;
    this.excelAnalytics = null;
    this.excelDataAvailable = false;
    this.uploadProgress = 0;
  }

  getFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  uploadExcel(): void {
    if (!this.selectedFile) return;

    this.uploading = true;
    this.loading = true;
    this.error = false;
    this.uploadProgress = 0;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    const uploadUrl = this.uploadTarget === 'master'
      ? `${this.baseUrl}/bus/upload-master`
      : `${this.baseUrl}/outshedding/upload`;

    this.http.post(uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((100 * event.loaded) / (event.total || 1));
        } else if (event.type === HttpEventType.Response) {
          const response = event.body as any;
          // Normalize response into excelSummary where possible
          this.excelSummary = {
            totalRecords: response.total_rows ?? response.totalRecords ?? response.total ?? 0,
            validRecords: response.inserted ?? response.validRecords ?? 0,
            invalidRecords: response.duplicates ?? response.skipped_invalid_bus ?? response.invalidRecords ?? 0,
            dateRange: response.dateRange ?? { start: this.selectedDate, end: this.selectedDate },
            busCount: response.busCount ?? 0,
            routeCount: response.routeCount ?? 0
          } as ExcelUploadSummary;

          // If backend returned processed data rows (for excel processing endpoint), process them
          if (response.data && Array.isArray(response.data)) {
            this.processExcelData(response.data as ExcelBusRecord[]);
          }

          this.uploading = false;
          this.loading = false;

          // Refresh live data after successful upload so analytics reflect latest uploads
          this.loadData();
        }
      },
      error: (err) => {
        console.error('Excel upload error:', err);
        this.error = true;
        this.errorMessage = err.error?.message || 'Failed to upload Excel file';
        this.uploading = false;
        this.loading = false;
      }
    });
  }

  private processExcelData(data: ExcelBusRecord[]): void {
    this.excelAnalytics = this.analyzeExcelData(data);
    this.excelDataAvailable = true;
    this.updateExcelCharts();
  }

  private analyzeExcelData(data: ExcelBusRecord[]): AnalyticsFromExcel {
    const dailyData = new Map<string, { total: number; present: number; absent: number }>();
    const busPerformance = new Map<string, { totalDays: number; absentDays: number }>();
    const routePerformance = new Map<string, { totalTrips: number; completedTrips: number }>();
    
    let shiftDistribution = {
      morning: 0,
      evening: 0,
      both: 0,
      absent: 0
    };

    // Process each record
    data.forEach(record => {
      // Update daily data
      const daily = dailyData.get(record.date) || { total: 0, present: 0, absent: 0 };
      daily.total++;
      if (record.status === 'Present') {
        daily.present++;
      } else {
        daily.absent++;
      }
      dailyData.set(record.date, daily);

      // Update bus performance
      const bus = busPerformance.get(record.busNo) || { totalDays: 0, absentDays: 0 };
      bus.totalDays++;
      if (record.status === 'Absent') {
        bus.absentDays++;
      }
      busPerformance.set(record.busNo, bus);

      // Update shift distribution
      if (record.status === 'Present') {
        switch (record.shift) {
          case 'Morning': shiftDistribution.morning++; break;
          case 'Evening': shiftDistribution.evening++; break;
          case 'Both': shiftDistribution.both++; break;
        }
      } else {
        shiftDistribution.absent++;
      }

      // Update route performance
      if (record.busRoute) {
        const route = routePerformance.get(record.busRoute) || { totalTrips: 0, completedTrips: 0 };
        route.totalTrips++;
        if (record.status === 'Present') {
          route.completedTrips++;
        }
        routePerformance.set(record.busRoute, route);
      }
    });

    return {
      dailyData,
      busPerformance,
      shiftDistribution,
      routePerformance
    };
  }

  downloadSample(): void {
    // Create sample Excel data
    const sampleData = [
      ['Date', 'BusNo', 'BusRoute', 'Shift', 'Status', 'OutTime', 'InTime', 'DriverName', 'ConductorName'],
      ['2024-01-01', 'BUS-001', 'Route A', 'Morning', 'Present', '08:00', '10:00', 'John Doe', 'Jane Smith'],
      ['2024-01-01', 'BUS-002', 'Route B', 'Evening', 'Present', '16:00', '18:00', 'Mike Johnson', 'Sarah Wilson'],
      ['2024-01-01', 'BUS-003', 'Route C', 'Both', 'Absent', '', '', '', ''],
      ['2024-01-02', 'BUS-001', 'Route A', 'Morning', 'Present', '08:00', '10:00', 'John Doe', 'Jane Smith'],
      ['2024-01-02', 'BUS-002', 'Route B', 'Evening', 'Absent', '', '', '', ''],
      ['2024-01-02', 'BUS-003', 'Route C', 'Both', 'Present', '08:00', '18:00', 'Robert Brown', 'Lisa Taylor']
    ];

    const csvContent = sampleData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bus_analytics_sample.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  updateExcelCharts(): void {
    if (!this.excelAnalytics) return;

    this.updateDailyTrendChart();
    this.updateBusPerformanceChart();
    this.updateShiftDistributionChart();
    this.updateRoutePerformanceChart();
  }

  private updateDailyTrendChart(): void {
    const sortedDates = Array.from(this.excelAnalytics!.dailyData.keys()).sort();
    const labels = sortedDates.slice(-parseInt(this.selectedPeriod));
    
    const presentData: number[] = [];
    const absentData: number[] = [];
    const attendanceRate: number[] = [];

    labels.forEach(date => {
      const data = this.excelAnalytics!.dailyData.get(date)!;
      presentData.push(data.present);
      absentData.push(data.absent);
      attendanceRate.push(Math.round((data.present / data.total) * 100));
    });

    this.dailyTrendChartData = {
      labels,
      datasets: [
        {
          label: 'Present',
          data: presentData,
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Absent',
          data: absentData,
          borderColor: '#dc3545',
          backgroundColor: 'rgba(220, 53, 69, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    };
  }

  private updateBusPerformanceChart(): void {
    const busData = Array.from(this.excelAnalytics!.busPerformance.entries())
      .map(([busNo, data]) => ({
        busNo,
        attendanceRate: Math.round(((data.totalDays - data.absentDays) / data.totalDays) * 100),
        absentDays: data.absentDays
      }))
      .sort((a, b) => b.absentDays - a.absentDays)
      .slice(0, 10);

    this.busPerformanceChartData = {
      labels: busData.map(d => d.busNo),
      datasets: [
        {
          label: 'Absent Days',
          data: busData.map(d => d.absentDays),
          backgroundColor: busData.map(d => 
            d.attendanceRate >= 90 ? '#dc3545' : 
            d.attendanceRate >= 80 ? '#ffc107' : '#28a745'
          ),
          borderColor: '#fff',
          borderWidth: 1
        }
      ]
    };
  }

  private updateShiftDistributionChart(): void {
    const shiftData = this.excelAnalytics!.shiftDistribution;
    this.shiftDistributionChartData = {
      labels: ['Morning', 'Evening', 'Both Shifts', 'Absent'],
      datasets: [{
        data: [shiftData.morning, shiftData.evening, shiftData.both, shiftData.absent],
        backgroundColor: [
          '#ffa751',
          '#667eea',
          '#11998e',
          '#eb3349'
        ],
        borderColor: '#fff',
        borderWidth: 2
      }]
    };
  }

  private updateRoutePerformanceChart(): void {
    const routeData = Array.from(this.excelAnalytics!.routePerformance.entries())
      .map(([route, data]) => ({
        route,
        completionRate: Math.round((data.completedTrips / data.totalTrips) * 100),
        totalTrips: data.totalTrips
      }))
      .sort((a, b) => a.completionRate - b.completionRate)
      .slice(0, 10);

    this.routePerformanceChartData = {
      labels: routeData.map(d => d.route),
      datasets: [{
        label: 'Completion Rate %',
        data: routeData.map(d => d.completionRate),
        backgroundColor: routeData.map(d => 
          d.completionRate >= 90 ? '#28a745' : 
          d.completionRate >= 70 ? '#ffc107' : '#dc3545'
        ),
        borderColor: '#fff',
        borderWidth: 1
      }]
    };
  }

  private initializeChartOptions(): void {
    this.dailyTrendChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Number of Buses' }
        },
        x: {
          title: { display: true, text: 'Date' }
        }
      }
    };

    this.busPerformanceChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const busNo = context.label;
              const absentDays = context.raw as number;
              const busData = this.getBusData(busNo);
              return [
                `Bus: ${busNo}`,
                `Absent Days: ${absentDays}`,
                `Attendance Rate: ${busData?.attendanceRate || 0}%`
              ];
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Absent Days' }
        },
        x: {
          title: { display: true, text: 'Bus Number' }
        }
      }
    };

    this.shiftDistributionChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { padding: 20 }
        }
      }
    };

    this.routePerformanceChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          title: { display: true, text: 'Completion Rate (%)' }
        }
      }
    };
  }

  // Helper methods for data tables
  getTopBuses(limit: number): any[] {
    if (!this.excelAnalytics) return [];
    
    return Array.from(this.excelAnalytics.busPerformance.entries())
      .map(([busNo, data]) => ({
        busNo,
        totalDays: data.totalDays,
        presentDays: data.totalDays - data.absentDays,
        absentDays: data.absentDays,
        attendanceRate: Math.round(((data.totalDays - data.absentDays) / data.totalDays) * 100)
      }))
      .sort((a, b) => b.absentDays - a.absentDays)
      .slice(0, limit);
  }

  getDailySummary(): any[] {
    if (!this.excelAnalytics) return [];
    
    return Array.from(this.excelAnalytics.dailyData.entries())
      .map(([date, data]) => ({
        date,
        total: data.total,
        present: data.present,
        absent: data.absent,
        attendanceRate: Math.round((data.present / data.total) * 100),
        morningCoverage: 0.8, // These would be calculated from shift data
        eveningCoverage: 0.7
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-parseInt(this.selectedPeriod));
  }

  getBusData(busNo: string): any {
    const data = this.excelAnalytics?.busPerformance.get(busNo);
    if (!data) return null;
    
    return {
      attendanceRate: Math.round(((data.totalDays - data.absentDays) / data.totalDays) * 100),
      ...data
    };
  }

  getAttendanceClass(rate: number): string {
    if (rate >= 90) return 'attendance-high';
    if (rate >= 80) return 'attendance-medium';
    return 'attendance-low';
  }

  getStatusClass(rate: number): string {
    if (rate >= 90) return 'status-good';
    if (rate >= 80) return 'status-warning';
    return 'status-critical';
  }

  getStatusLabel(rate: number): string {
    if (rate >= 90) return 'Good';
    if (rate >= 80) return 'Warning';
    return 'Critical';
  }

  exportToExcel(): void {
    // Implement Excel export functionality
    alert('Export to Excel feature would be implemented here');
  }

  retryExcel(): void {
    this.error = false;
    if (this.selectedFile) {
      this.uploadExcel();
    }
  }

  // Existing Live API methods
  loadData(): void {
    if (this.useExcelMode || this.loading) return;

    this.loading = true;
    this.error = false;
    this.errorMessage = '';

    Promise.all([
      this.loadAvailability(),
      this.loadShiftSummary(),
      this.loadMissingBuses(),
      this.loadFrequentAbsentees()
    ]).catch((err) => {
      this.error = true;
      this.errorMessage = err.message || 'Failed to load bus analytics data';
      console.error('Error loading data:', err);
    }).finally(() => {
      this.loading = false;
    });
  }

  onDateChange(): void {
    this.clearBusHistory();
    this.loadData();
  }

  onDaysChange(): void {
    this.loadFrequentAbsentees();
  }

  private loadAvailability(): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/outshedding/availability?date=${this.selectedDate}`;
      console.log('🔵 GET Availability:', url);
      this.http.get<AvailabilityData>(url).subscribe({
        next: (data) => {
          console.log('✅ Availability Response:', data);
          this.availability = data;
          resolve();
        },
        error: (err: any) => {
          console.error('❌ Availability Error:', err);
          reject(err);
        }
      });
    });
  }

  private loadShiftSummary(): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/outshedding/shift-summary?date=${this.selectedDate}`;
      console.log('🔵 GET Shift Summary:', url);
      this.http.get<ShiftSummary>(url).subscribe({
        next: (data) => {
          console.log('✅ Shift Summary Response:', data);
          this.shiftSummary = data;
          this.updateShiftChart(data);
          resolve();
        },
        error: (err: any) => {
          console.error('❌ Shift Summary Error:', err);
          reject(err);
        }
      });
    });
  }

  private loadMissingBuses(): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/outshedding/missing?date=${this.selectedDate}`;
      console.log('🔵 GET Missing Buses:', url);
      this.http.get<string[]>(url).subscribe({
        next: (data) => {
          console.log('✅ Missing Buses Response:', data);
          this.missingBuses = data || [];
          resolve();
        },
        error: (err: any) => {
          console.error('❌ Missing Buses Error:', err);
          reject(err);
        }
      });
    });
  }

  private loadFrequentAbsentees(): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/outshedding/missing/frequent?days=${this.frequentAbsenteeDays}`;
      console.log('🔵 GET Frequent Absentees:', url);
      this.http.get<FrequentAbsentee[]>(url).subscribe({
        next: (data) => {
          console.log('✅ Frequent Absentees Response:', data);
          this.frequentAbsentees = data || [];
          resolve();
        },
        error: (err: any) => {
          console.error('❌ Frequent Absentees Error:', err);
          reject(err);
        }
      });
    });
  }

  viewBusHistory(busNo: string): void {
    this.selectedBusNo = busNo;
    const url = `${this.baseUrl}/outshedding/bus/${busNo}`;
    console.log('🔵 GET Bus History:', url);
    this.http.get<BusHistory[]>(url).subscribe({
      next: (data) => {
        console.log('✅ Bus History Response:', data);
        this.selectedBusHistory = data || [];
      },
      error: (err: any) => {
        console.error('❌ Bus History Error:', err);
        this.errorMessage = 'Failed to load bus history';
      }
    });
  }

  clearBusHistory(): void {
    this.selectedBusNo = '';
    this.selectedBusHistory = [];
  }

  private updateShiftChart(data: ShiftSummary): void {
    this.shiftChartData = {
      labels: ['Morning Only', 'Evening Only', 'Both Shifts', 'Absent'],
      datasets: [{
        label: 'Bus Distribution',
        data: [data.morningOnly, data.eveningOnly, data.bothShifts, data.absent],
        backgroundColor: [
          '#ffa751',
          '#667eea',
          '#11998e',
          '#eb3345'
        ],
        borderColor: '#fff',
        borderWidth: 2,
        hoverOffset: 10
      }]
    };
  }

  getShiftChartOptions(): ChartConfiguration['options'] {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: { size: 13 }
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.raw as number;
              const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    };
  }

  getPercentage(value: number, total: number): number {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  }
}