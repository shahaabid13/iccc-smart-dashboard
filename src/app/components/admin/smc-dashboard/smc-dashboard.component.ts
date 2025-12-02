import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SmcService } from '../../../services/smc.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-smc-dashboard',
  template: `
    <div class="smc-dashboard">
      <h2>Solid Waste Management Dashboard</h2>

      <!-- Filters Section -->
      <div class="filters-section">
        <div class="filter-group">
          <label for="periodFilter">Time Period:</label>
          <select 
            id="periodFilter" 
            [(ngModel)]="selectedPeriod" 
            (change)="onPeriodChange()"
            class="filter-select"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Data</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="fromDate">From Date:</label>
          <input 
            id="fromDate" 
            type="date" 
            [(ngModel)]="fromDate" 
            (change)="onCustomDateChange()"
            class="filter-input"
          >
        </div>

        <div class="filter-group">
          <label for="toDate">To Date:</label>
          <input 
            id="toDate" 
            type="date" 
            [(ngModel)]="toDate" 
            (change)="onCustomDateChange()"
            class="filter-input"
          >
        </div>

        <div class="filter-group">
          <label for="itemsPerPage">Items per page:</label>
          <select 
            id="itemsPerPage" 
            [(ngModel)]="itemsPerPage" 
            (change)="onPageSizeChange()"
            class="filter-select"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div class="action-buttons">
          <button (click)="applyFilters()" class="btn btn-primary">Apply Filters</button>

          <!-- Export dropdown -->
          <div class="dropdown" [class.open]="exportDropdownOpen">
            <button (click)="toggleExportDropdown()" class="btn btn-secondary" [disabled]="!filteredRecords.length">
              <span class="export-icon">📤</span> Export
            </button>
            <ul class="dropdown-menu" *ngIf="exportDropdownOpen">
              <li><button class="dropdown-item" (click)="exportToExcel(); toggleExportDropdown(false)">Export as Excel</button></li>
              <li><button class="dropdown-item" (click)="exportToPDF(); toggleExportDropdown(false)">Export as PDF</button></li>
            </ul>
          </div>

          <!-- Report dropdown (limited columns + totals) -->
          <div class="dropdown" [class.open]="reportDropdownOpen">
            <button (click)="toggleReportDropdown()" class="btn btn-secondary" [disabled]="!filteredRecords.length">
              <span class="export-icon">📑</span> Report
            </button>
            <ul class="dropdown-menu" *ngIf="reportDropdownOpen">
              <li><button class="dropdown-item" (click)="exportReportToExcel(); toggleReportDropdown(false)">Report as Excel</button></li>
              <li><button class="dropdown-item" (click)="exportReportToPDF(); toggleReportDropdown(false)">Report as PDF</button></li>
            </ul>
          </div>

          <button (click)="resetFilters()" class="btn btn-outline">Reset</button>
        </div>
      </div>

      <!-- Summary Stats -->
      <div *ngIf="filteredRecords.length > 0" class="summary-stats">
        <div class="stat-card">
          <span class="stat-label">Total Records:</span>
          <span class="stat-value">{{ filteredRecords.length }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Total Weight:</span>
          <span class="stat-value">{{ getTotalWeight() | number }} kg</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Date Range:</span>
          <span class="stat-value">{{ getDateRangeLabel() }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Average Weight:</span>
          <span class="stat-value">{{ getAverageWeight() | number }} kg</span>
        </div>
      </div>

      <div *ngIf="loading" class="loading">Loading SMC data...</div>
      
      <div *ngIf="error" class="error">
        <h3>Failed to load data</h3>
        <p>{{ errorMessage }}</p>
        <button (click)="load()" class="retry-btn">Retry</button>
      </div>

      <div *ngIf="apiUnavailable" class="warning">
        <h3>⚠️ API Connection Issue</h3>
        <p>Showing fallback data. The live API might be unavailable.</p>
        <button (click)="load()" class="retry-btn">Retry Connection</button>
      </div>

      <!-- Data Table -->
      <div *ngIf="!loading && !error && paginatedRecords.length" class="table-container">
        <table class="smc-table">
          <thead>
            <tr>
              <th>Slip No</th>
              <th>VNo</th>
              <th>VName</th>
              <th>SName</th>
              <th>TWeight</th>
              <th>GWeight</th>
              <th>GDate</th>
              <th>NWeight</th>
              <th>Driver</th>
              <th>EDate</th>
              <th>WB_ID</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of paginatedRecords">
              <td>{{ r.id?.slipno || '-' }}</td>
              <td>{{ r.vno || '-' }}</td>
              <td>{{ r.vname || '-' }}</td>
              <td>{{ r.sname || '-' }}</td>
              <td>{{ r.tweight || '0' }}</td>
              <td>{{ r.gweight || '0' }}</td>
              <td>{{ formatDate(r.gdate) }}</td>
              <td>{{ r.nweight || '0' }}</td>
              <td>{{ r.driver || '-' }}</td>
              <td>{{ formatDate(r.edate) }}</td>
              <td>{{ r.id?.wbId || '-' }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="pagination" *ngIf="totalPages > 1">
          <button 
            (click)="previousPage()" 
            [disabled]="currentPage === 1"
            class="pagination-btn"
          >
            Previous
          </button>
          
          <span class="pagination-info">
            Page {{ currentPage }} of {{ totalPages }} 
            ({{ filteredRecords.length }} total records)
          </span>

          <button 
            (click)="nextPage()" 
            [disabled]="currentPage === totalPages"
            class="pagination-btn"
          >
            Next
          </button>
        </div>
      </div>

      <div *ngIf="!loading && !filteredRecords.length && !error" class="no-data">
        No records found for the selected filters.
      </div>
    </div>
  `,
  styles: [
    `
      .smc-dashboard { 
        padding: 20px; 
        background: #f8f9fa;
        min-height: 100vh;
      }

      .filters-section {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        margin-bottom: 20px;
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        align-items: end;
      }

      .filter-group {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .filter-group label {
        font-weight: bold;
        font-size: 12px;
        color: #555;
      }

      .filter-select, .filter-input {
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        min-width: 120px;
      }

      .action-buttons {
        display: flex;
        gap: 10px;
        margin-left: auto;
        flex-wrap: wrap;
      }

      .btn {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s;
      }

      .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .btn-primary {
        background: #007bff;
        color: white;
      }

      .btn-primary:hover:not(:disabled) {
        background: #0056b3;
      }

      .btn-secondary {
        background: #6c757d;
        color: white;
      }

      .btn-secondary:hover:not(:disabled) {
        background: #545b62;
      }

      .btn-outline {
        background: white;
        color: #007bff;
        border: 1px solid #007bff;
      }

      .btn-outline:hover:not(:disabled) {
        background: #007bff;
        color: white;
      }

      .export-icon {
        margin-right: 5px;
      }

      /* Dropdown styles for Export and Report buttons */
      .dropdown { position: relative; display: inline-block; }
      .dropdown .dropdown-menu { display: none; position: absolute; right: 0; top: calc(100% + 6px); background: white; min-width: 180px; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 6px 12px rgba(0,0,0,0.08); z-index: 2000; padding: 6px 0; }
      .dropdown.open .dropdown-menu { display: block; }
      .dropdown .dropdown-item { background: transparent; border: none; width: 100%; text-align: left; padding: 8px 12px; cursor: pointer; font-size: 14px; color: #333; }
      .dropdown .dropdown-item:hover { background: #f1f1f1; }

      .summary-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-bottom: 20px;
      }

      .stat-card {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .stat-label {
        font-size: 12px;
        color: #666;
        margin-bottom: 8px;
        text-transform: uppercase;
        font-weight: bold;
      }

      .stat-value {
        font-size: 18px;
        font-weight: bold;
        color: #122e52;
      }

      .table-container {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        overflow: hidden;
      }

      .smc-table { 
        width: 100%; 
        border-collapse: collapse; 
        font-size: 14px;
      }
      .smc-table th, .smc-table td { 
        border: 1px solid #ddd; 
        padding: 12px; 
        text-align: left; 
      }
      .smc-table th { 
        background: #122e52; 
        color: #fff; 
        position: sticky;
        top: 0;
        font-weight: 600;
      }
      .smc-table tr:nth-child(even) {
        background: #f8f9fa;
      }
      .smc-table tr:hover {
        background: #e9ecef;
      }

      .pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        background: #f8f9fa;
        border-top: 1px solid #ddd;
      }

      .pagination-btn {
        padding: 8px 16px;
        border: 1px solid #ddd;
        background: white;
        border-radius: 4px;
        cursor: pointer;
      }

      .pagination-btn:disabled {
        background: #f8f9fa;
        color: #6c757d;
        cursor: not-allowed;
      }

      .pagination-btn:not(:disabled):hover {
        background: #007bff;
        color: white;
        border-color: #007bff;
      }

      .pagination-info {
        color: #666;
        font-size: 14px;
      }

      .loading {
        color: #007bff;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 4px;
        text-align: center;
        margin: 20px 0;
      }
      .error {
        color: #dc3545;
        padding: 20px;
        background: #f8d7da;
        border: 1px solid #f5c6cb;
        border-radius: 4px;
        margin: 20px 0;
        text-align: center;
      }
      .warning {
        color: #856404;
        padding: 20px;
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: 4px;
        margin: 20px 0;
        text-align: center;
      }
      .retry-btn {
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
      }
      .retry-btn:hover {
        background: #0056b3;
      }
      .no-data {
        padding: 40px;
        text-align: center;
        color: #6c757d;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        margin: 20px 0;
      }

      @media (max-width: 768px) {
        .filters-section {
          flex-direction: column;
          align-items: stretch;
        }
        
        .action-buttons {
          margin-left: 0;
          justify-content: center;
        }
        
        .pagination {
          flex-direction: column;
          gap: 10px;
          text-align: center;
        }
        
        .summary-stats {
          grid-template-columns: 1fr;
        }
        
        .filter-select, .filter-input {
          min-width: unset;
        }
      }
    `,
  ],
})
export class SmcDashboardComponent implements OnInit {
  records: any[] = [];
  filteredRecords: any[] = [];
  paginatedRecords: any[] = [];
  loading = false;
  error = false;
  errorMessage = '';
  apiUnavailable = false;

  // Filter properties
  selectedPeriod: string = 'week';
  fromDate: string = '';
  toDate: string = '';

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 25;
  totalPages: number = 1;

  // UI dropdown states
  exportDropdownOpen = false;
  reportDropdownOpen = false;

  constructor(private smc: SmcService) {
    this.initializeDates();
  }

  ngOnInit(): void {
    this.load();
  }

  initializeDates(): void {
    const today = new Date();
    this.toDate = today.toISOString().split('T')[0];
    
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    this.fromDate = weekAgo.toISOString().split('T')[0];
  }

  load() {
    this.loading = true;
    this.error = false;
    this.apiUnavailable = false;
    this.errorMessage = '';

    this.smc.getAllWeighbridgeData('SRNGR_LANDFILL_WB1').subscribe({
      next: (res: any[]) => {
        this.records = res || [];
        this.applyFilters();
        this.loading = false;
        
        // Check if we're using fallback data
        if (this.records.length === 1 && this.records[0].id?.slipno === 1) {
          this.apiUnavailable = true;
        }
      },
      error: (err: any) => {
        console.error('SMC load error', err);
        this.error = true;
        this.loading = false;
        this.errorMessage = err?.message || 'Unknown error occurred';
        
        // Show fallback data even on error
        this.records = this.smc['getFallbackData'] ? this.smc['getFallbackData']() : [];
        this.applyFilters();
      },
    });
  }

  onPeriodChange(): void {
    const today = new Date();
    
    switch (this.selectedPeriod) {
      case 'today':
        this.fromDate = today.toISOString().split('T')[0];
        this.toDate = today.toISOString().split('T')[0];
        break;
      case 'week':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        this.fromDate = weekAgo.toISOString().split('T')[0];
        this.toDate = today.toISOString().split('T')[0];
        break;
      case 'month':
        const monthAgo = new Date(today);
        monthAgo.setDate(monthAgo.getDate() - 30);
        this.fromDate = monthAgo.toISOString().split('T')[0];
        this.toDate = today.toISOString().split('T')[0];
        break;
      case 'all':
        this.fromDate = '';
        this.toDate = '';
        break;
    }
    
    this.applyFilters();
  }

  onCustomDateChange(): void {
    this.selectedPeriod = 'custom';
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  applyFilters(): void {
    this.currentPage = 1;
    
    if (!this.records.length) {
      this.filteredRecords = [];
      this.updatePagination();
      return;
    }

    // Filter by date range
    this.filteredRecords = this.records.filter(record => {
      const recordDate = this.getRecordDate(record);
      if (!recordDate) return true;

      if (this.fromDate && recordDate < new Date(this.fromDate)) {
        return false;
      }
      if (this.toDate && recordDate > new Date(this.toDate + 'T23:59:59')) {
        return false;
      }
      return true;
    });

    this.updatePagination();
  }

  resetFilters(): void {
    this.selectedPeriod = 'week';
    this.initializeDates();
    this.applyFilters();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRecords.length / this.itemsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
    
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    
    this.paginatedRecords = this.filteredRecords.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  getRecordDate(record: any): Date | null {
    const dateStr = record.edate || record.gdate;
    if (!dateStr) return null;
    
    try {
      return new Date(dateStr);
    } catch {
      return null;
    }
  }

  getTotalWeight(): number {
    return this.filteredRecords.reduce((total, record) => {
      return total + (parseFloat(record.nweight) || 0);
    }, 0);
  }

  getAverageWeight(): number {
    if (this.filteredRecords.length === 0) return 0;
    return this.getTotalWeight() / this.filteredRecords.length;
  }

  getDateRangeLabel(): string {
    if (!this.fromDate && !this.toDate) return 'All Dates';
    if (this.fromDate === this.toDate) return this.fromDate;
    return `${this.fromDate} to ${this.toDate}`;
  }

  exportToExcel(): void {
    if (!this.filteredRecords.length) {
      alert('No data to export');
      return;
    }

    try {
      // Prepare data for Excel
      const excelData = this.filteredRecords.map(record => ({
        'Slip No': record.id?.slipno || '-',
        'Vehicle No': record.vno || '-',
        'Vehicle Name': record.vname || '-',
        'Supplier Name': record.sname || '-',
        'Tare Weight (kg)': record.tweight || '0',
        'Gross Weight (kg)': record.gweight || '0',
        'Gross Date': this.formatDateForExport(record.gdate),
        'Net Weight (kg)': record.nweight || '0',
        'Driver': record.driver || '-',
        'Entry Date': this.formatDateForExport(record.edate),
        'Weighbridge ID': record.id?.wbId || '-'
      }));

      // Create worksheet
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
      
      // Set column widths
      const colWidths = [
        { wch: 10 }, // Slip No
        { wch: 15 }, // Vehicle No
        { wch: 20 }, // Vehicle Name
        { wch: 20 }, // Supplier Name
        { wch: 15 }, // Tare Weight
        { wch: 15 }, // Gross Weight
        { wch: 20 }, // Gross Date
        { wch: 15 }, // Net Weight
        { wch: 15 }, // Driver
        { wch: 20 }, // Entry Date
        { wch: 15 }  // Weighbridge ID
      ];
      worksheet['!cols'] = colWidths;

      // Create workbook
      const workbook: XLSX.WorkBook = {
        Sheets: { 'Weighbridge Data': worksheet },
        SheetNames: ['Weighbridge Data']
      };

      // Generate file name
      const fileName = `Weighbridge_Data_${this.getDateRangeLabel().replace(/ /g, '_')}_${new Date().getTime()}.xlsx`;

      // Export to Excel
      XLSX.writeFile(workbook, fileName);
      
      console.log('Excel export completed successfully');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Error exporting to Excel. Please try again.');
    }
  }

  exportToPDF(): void {
    if (!this.filteredRecords.length) {
      alert('No data to export');
      return;
    }

    try {
      // Create new PDF document
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(16);
      doc.setTextColor(40);
      doc.text('Weighbridge Data Report', 14, 15);
      
      // Add date range and summary
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Date Range: ${this.getDateRangeLabel()}`, 14, 22);
      doc.text(`Total Records: ${this.filteredRecords.length}`, 14, 28);
      doc.text(`Total Net Weight: ${this.getTotalWeight().toLocaleString()} kg`, 14, 34);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 40);
      
      // Prepare table data
      const tableData = this.filteredRecords.map(record => [
        record.id?.slipno || '-',
        record.vno || '-',
        record.vname || '-',
        record.sname || '-',
        record.tweight || '0',
        record.gweight || '0',
        this.formatDateForExport(record.gdate),
        record.nweight || '0',
        record.driver || '-',
        this.formatDateForExport(record.edate),
        record.id?.wbId || '-'
      ]);

      // Define table columns
      const tableColumns = [
        'Slip No',
        'VNo',
        'VName',
        'SName',
        'TWeight',
        'GWeight',
        'GDate',
        'NWeight',
        'Driver',
        'EDate',
        'WB_ID'
      ];

      // Add table to PDF
      autoTable(doc, {
        head: [tableColumns],
        body: tableData,
        startY: 45,
        styles: {
          fontSize: 7,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [18, 46, 82],
          textColor: 255,
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        },
        margin: { top: 45 }
      });

      // Generate file name
      const fileName = `Weighbridge_Report_${this.getDateRangeLabel().replace(/ /g, '_')}_${new Date().getTime()}.pdf`;

      // Save PDF
      doc.save(fileName);
      
      console.log('PDF export completed successfully');
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      alert('Error exporting to PDF. Please try again.');
    }
  }

  // Toggle export dropdown
  toggleExportDropdown(force?: boolean) {
    if (typeof force === 'boolean') {
      this.exportDropdownOpen = force;
    } else {
      this.exportDropdownOpen = !this.exportDropdownOpen;
    }
    // close report dropdown when opening export
    if (this.exportDropdownOpen) this.reportDropdownOpen = false;
  }

  // Toggle report dropdown
  toggleReportDropdown(force?: boolean) {
    if (typeof force === 'boolean') {
      this.reportDropdownOpen = force;
    } else {
      this.reportDropdownOpen = !this.reportDropdownOpen;
    }
    if (this.reportDropdownOpen) this.exportDropdownOpen = false;
  }

  // Generate report rows (limited columns)
  private getReportRows() {
    return this.filteredRecords.map(r => ({
      'Slip No': r.id?.slipno || '-',
      'VNo': r.vno || '-',
      'EDate': this.formatDateForExport(r.edate),
      'GWeight': parseFloat(r.gweight) || 0,
      'NWeight': parseFloat(r.nweight) || 0,
    }));
  }

  // Export the limited report to Excel with totals
  exportReportToExcel(): void {
    if (!this.filteredRecords.length) { alert('No data to export'); return; }

    try {
      const rows = this.getReportRows();

      // Build array-of-arrays: header + data rows
      const header = ['Slip No', 'VNo', 'EDate', 'GWeight', 'NWeight'];
      const body = rows.map(r => [r['Slip No'], r['VNo'], r['EDate'], r['GWeight'], r['NWeight']]);

      // Totals
      const sumG = rows.reduce((s, x) => s + (Number(x['GWeight']) || 0), 0);
      const sumN = rows.reduce((s, x) => s + (Number(x['NWeight']) || 0), 0);
      const trips = rows.length;

      // Add an empty row then totals rows
      body.push(['', '', '', '', '']);
      body.push(['', '', 'Totals', sumG, sumN]);
      body.push(['', '', 'Total Trips', trips, '']);

      const aoa = [header, ...body];
      const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

      // set column widths
      worksheet['!cols'] = [ {wch:12},{wch:12},{wch:20},{wch:12},{wch:12} ];

      const workbook: XLSX.WorkBook = { Sheets: { 'Report': worksheet }, SheetNames: ['Report'] };
      const fileName = `SMC_Report_${this.getDateRangeLabel().replace(/ /g,'_')}_${new Date().getTime()}.xlsx`;
      XLSX.writeFile(workbook, fileName);
    } catch (err) {
      console.error('Error exporting report to Excel', err);
      alert('Error exporting report to Excel');
    }
  }

  // Export the limited report to PDF with totals
  exportReportToPDF(): void {
    if (!this.filteredRecords.length) { alert('No data to export'); return; }

    try {
      const rows = this.getReportRows();
      const doc = new jsPDF();

      doc.setFontSize(14);
      doc.text('SMC Report', 14, 15);
      doc.setFontSize(10);
      doc.text(`Date Range: ${this.getDateRangeLabel()}`, 14, 22);

      const tableBody = rows.map(r => [ r['Slip No'], r['VNo'], r['EDate'], (r['GWeight']).toString(), (r['NWeight']).toString() ]);

      // totals
      const sumG = rows.reduce((s, x) => s + (Number(x['GWeight']) || 0), 0);
      const sumN = rows.reduce((s, x) => s + (Number(x['NWeight']) || 0), 0);
      const trips = rows.length;

      // Add an empty row then totals rows
      tableBody.push(['', '', '', '', '']);
      tableBody.push(['', '', 'Totals', sumG.toString(), sumN.toString()]);
      tableBody.push(['', '', 'Total Trips', trips.toString(), '']);

      autoTable(doc, {
        head: [['Slip No','VNo','EDate','GWeight','NWeight']],
        body: tableBody,
        startY: 30,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [18,46,82], textColor: 255 }
      });

      const fileName = `SMC_Report_${this.getDateRangeLabel().replace(/ /g,'_')}_${new Date().getTime()}.pdf`;
      doc.save(fileName);
    } catch (err) {
      console.error('Error exporting report to PDF', err);
      alert('Error exporting report to PDF');
    }
  }

  // Helper method to format dates for export
  private formatDateForExport(dateString: string): string {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(',', '');
    } catch {
      return dateString;
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    } catch {
      return dateString;
    }
  }
}