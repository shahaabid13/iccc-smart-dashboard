import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { SmcService } from '../../../services/smc.service';
import { CharteredBikeReportDto } from '../../../models/chartered-bike';
import { ReducePipe } from '../../../pipes/reduce.pipe';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-chartered-bike-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatTableModule,
    ReducePipe,
  ],
  templateUrl: './chartered-bike-reports.component.html',
  styleUrls: ['./chartered-bike-reports.component.scss'],
})
export class CharteredBikeReportsComponent implements OnInit, OnDestroy {
  lastWeekReport: CharteredBikeReportDto[] = [];
  lastMonthReport: CharteredBikeReportDto[] = [];
  loading = false;
  loadingWeek = false;
  loadingMonth = false;
  error: string | null = null;
  selectedTab = 0;

  displayedColumns: string[] = [
    'stationName',
    'totalBikes',
    'activeBikes',
    'inactiveBikes',
    'bikesOnTrip',
    'availabilityPercentage',
  ];

  private destroy$ = new Subject<void>();

  constructor(private smcService: SmcService) {}

  ngOnInit(): void {
    this.loadLastWeekReport();
    this.loadLastMonthReport();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadLastWeekReport(): void {
    this.loadingWeek = true;
    this.error = null;

    this.smcService
      .getCharteredBikeLastWeekReport()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.lastWeekReport = data;
          this.loadingWeek = false;
        },
        error: (err) => {
          console.error('Error loading last week report:', err);
          this.error = 'Failed to load last week report. Please try again.';
          this.loadingWeek = false;
        },
      });
  }

  loadLastMonthReport(): void {
    this.loadingMonth = true;
    this.error = null;

    this.smcService
      .getCharteredBikeLastMonthReport()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.lastMonthReport = data;
          this.loadingMonth = false;
        },
        error: (err) => {
          console.error('Error loading last month report:', err);
          this.error = 'Failed to load last month report. Please try again.';
          this.loadingMonth = false;
        },
      });
  }

  getAvailabilityColor(percentage: number): string {
    if (percentage >= 60) return 'status-good';
    if (percentage >= 30) return 'status-warning';
    return 'status-critical';
  }

  getAvailabilityLabel(percentage: number): string {
    if (percentage >= 60) return 'Good';
    if (percentage >= 30) return 'Low';
    return 'Critical';
  }

  exportToPDF(reportName: string, reportData: CharteredBikeReportDto[]): void {
    const element = document.getElementById(`${reportName.toLowerCase()}-table`);
    if (!element) {
      this.error = 'Could not find report element to export.';
      return;
    }

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF('l', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 10;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 5;

      // Add title
      pdf.setFontSize(16);
      pdf.text(`Chartered Bike ${reportName} Report`, 10, 15);
      pdf.setFontSize(10);
      pdf.text(`Generated on: ${new Date().toLocaleString()}`, 10, 22);

      position = 30;
      pdf.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 40;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`chartered-bike-${reportName.toLowerCase()}-report-${Date.now()}.pdf`);
    });
  }

  exportToCSV(reportName: string, reportData: CharteredBikeReportDto[]): void {
    if (reportData.length === 0) {
      this.error = 'No data to export.';
      return;
    }

    const headers = [
      'Station Name',
      'Total Bikes',
      'Active Bikes',
      'Inactive Bikes',
      'Bikes On Trip',
      'Availability %',
      'Report Date',
      'Min Availability %',
      'Max Availability %',
    ];

    const rows = reportData.map((report) => [
      report.stationName,
      report.totalBikes,
      report.activeBikes,
      report.inactiveBikes,
      report.bikesOnTrip,
      report.availabilityPercentage,
      report.reportDate,
      report.minAvailability,
      report.maxAvailability,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chartered-bike-${reportName.toLowerCase()}-report-${Date.now()}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  refreshReports(): void {
    this.loadLastWeekReport();
    this.loadLastMonthReport();
  }

  dismissError(): void {
    this.error = null;
  }
}
