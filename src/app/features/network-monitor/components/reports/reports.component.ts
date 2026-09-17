import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SdnetDeviceService } from '../../services/device.service';
import { SdnetReportService } from '../../services/report.service';
import { DowntimeIncident, CategorySla } from '../../models/report.model';

@Component({
  selector: 'app-sdnet-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  categories: string[] = [];
  categoryFilter = '';
  fromDate = this.isoDate(new Date(Date.now() - 30 * 24 * 3600 * 1000));
  toDate = this.isoDate(new Date());
  slaSummary: CategorySla[] = [];
  incidents: DowntimeIncident[] = [];
  loading = true;
  loadError = false;

  constructor(
    private deviceService: SdnetDeviceService,
    private reportService: SdnetReportService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.deviceService.categories().subscribe((cats) => {
      this.categories = cats;
      this.cdr.markForCheck();
    });
    this.runReport();
  }

  runReport(): void {
    this.loading = true;
    this.loadError = false;
    const from = new Date(this.fromDate + 'T00:00:00');
    const to = new Date(this.toDate + 'T23:59:59');
    const filter = { category: this.categoryFilter || null };
    forkJoin({
      sla: this.reportService.slaSummary(from, to, filter),
      incidents: this.reportService.downtime(from, to, filter),
    }).subscribe({
      next: ({ sla, incidents }) => {
        this.slaSummary = sla;
        this.incidents = incidents;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.loadError = true;
        this.cdr.markForCheck();
      },
    });
  }

  downloadPdf(): void {
    const from = new Date(this.fromDate + 'T00:00:00');
    const to = new Date(this.toDate + 'T23:59:59');
    this.reportService.downloadPdf(from, to, { category: this.categoryFilter || null }).subscribe((blob) => {
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'sdnet-downtime-report.pdf';
      anchor.click();
      URL.revokeObjectURL(url);
    });
  }

  formatDuration(totalSeconds: number): string {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  }

  private isoDate(d: Date): string {
    return d.toISOString().slice(0, 10);
  }
}