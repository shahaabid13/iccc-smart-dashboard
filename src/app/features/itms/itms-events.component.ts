import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { EMPTY, expand, reduce } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import {
  ItmsEvent,
  ItmsEventQuery,
  ItmsFilterOptions,
  ItmsService
} from './itms.service';
import { ItmsEventDetailsDialogComponent } from './itms-event-details-dialog.component';

@Component({
  selector: 'app-itms-events',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule
  ],
  templateUrl: './itms-events.component.html',
  styleUrl: './itms-events.component.scss'
})
export class ItmsEventsComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly displayedColumns = [
    'eventTime',
    'eventType',
    'cameraName',
    'junction',
    'message',
    'vehicleNumber',
    'priority',
    'status',
    'speedKmph',
    'vehicleColor'
  ];

  events: ItmsEvent[] = [];
  filters: ItmsFilterOptions = { eventTypes: [], junctions: [], priorities: [] };
  fromDate = '';
  toDate = '';
  eventType = '';
  junction = '';
  priority = '';
  vehicleNumber = '';
  pageIndex = 0;
  pageSize = 20;
  totalElements = 0;
  sortBy = 'eventTime';
  sortDirection: Sort['direction'] = 'desc';
  loading = false;
  exporting = false;
  errorMessage = '';
  filtersLoading = true;

  get isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  constructor(
    private readonly itms: ItmsService,
    private readonly auth: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.vehicleNumber = this.route.snapshot.queryParamMap.get('vehicleNumber') ?? '';
    this.itms.getFilters()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: filters => {
          this.filters = filters;
          this.filtersLoading = false;
        },
        error: error => {
          this.filtersLoading = false;
          this.snackBar.open(this.getErrorMessage(error, 'Could not load filter options.'), 'Close', { duration: 5000 });
        }
      });
    this.loadEvents();
  }

  applyFilters(): void {
    if (this.fromDate && this.toDate && this.fromDate > this.toDate) {
      this.errorMessage = 'The start date must be on or before the end date.';
      return;
    }
    this.pageIndex = 0;
    this.errorMessage = '';
    this.loadEvents();
  }

  clearFilters(): void {
    this.fromDate = '';
    this.toDate = '';
    this.eventType = '';
    this.junction = '';
    this.priority = '';
    this.vehicleNumber = '';
    this.applyFilters();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEvents();
  }

  onSortChange(sort: Sort): void {
    this.sortBy = sort.active || 'eventTime';
    this.sortDirection = sort.direction || 'desc';
    this.pageIndex = 0;
    this.loadEvents();
  }

  openDetails(event: ItmsEvent): void {
    this.dialog.open(ItmsEventDetailsDialogComponent, {
      data: event,
      width: '780px',
      maxWidth: '96vw',
      autoFocus: false
    });
  }

  goToUpload(): void {
    void this.router.navigate(['/itms/upload']);
  }

  exportExcel(): void {
    this.exporting = true;
    this.itms.exportEvents(this.queryFilters())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: blob => {
          const url = URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = `ITMS-events-${new Date().toISOString().slice(0, 10)}.xlsx`;
          anchor.click();
          URL.revokeObjectURL(url);
          this.exporting = false;
        },
        error: error => {
          this.exporting = false;
          this.snackBar.open(this.getErrorMessage(error, 'Could not export events.'), 'Close', { duration: 5000 });
        }
      });
  }

  exportPdf(): void {
    this.exporting = true;
    const query = { ...this.queryFilters(), page: 0, size: 100, sort: `${this.sortBy},${this.sortDirection || 'desc'}` };
    this.itms.getEvents(query).pipe(
      expand(response => response.number + 1 < response.totalPages
        ? this.itms.getEvents({ ...query, page: response.number + 1 })
        : EMPTY),
      reduce((allEvents, response) => allEvents.concat(response.content), [] as ItmsEvent[]),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: events => {
        this.loadPdfLogo()
          .catch(error => {
            console.error('[ItmsEventsComponent] Could not load the PDF logo:', error);
            this.snackBar.open('The report was exported without the logo.', 'Close', { duration: 5000 });
            return null;
          })
          .then(logo => this.generateEventsPdf(events, logo))
          .catch(error => {
            console.error('[ItmsEventsComponent] Could not generate the PDF report:', error);
            this.snackBar.open('Could not generate the PDF report.', 'Close', { duration: 5000 });
          })
          .finally(() => this.exporting = false);
      },
      error: error => {
        this.exporting = false;
        this.snackBar.open(this.getErrorMessage(error, 'Could not export events to PDF.'), 'Close', { duration: 5000 });
      }
    });
  }

  private loadPdfLogo(): Promise<string> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext('2d');
        if (!context) {
          reject(new Error('Could not prepare the report logo.'));
          return;
        }
        context.drawImage(image, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.92));
      };
      image.onerror = () => reject(new Error('Could not load the report logo.'));
      image.src = '/download.jpg';
    });
  }

  private generateEventsPdf(events: ItmsEvent[], logo: string | null): void {
    const doc = new jsPDF({ orientation: 'landscape', format: 'a3' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 12;
    const generatedAt = new Date();
    const dateRange = this.fromDate || this.toDate
      ? `${this.fromDate || 'Any date'} to ${this.toDate || 'Any date'}`
      : 'All dates';
    const activeFilters = [
      `Period: ${dateRange}`,
      this.eventType ? `Event type: ${this.eventType}` : '',
      this.junction ? `Junction: ${this.junction}` : '',
      this.priority ? `Priority: ${this.priority}` : '',
      this.vehicleNumber.trim() ? `Vehicle: ${this.vehicleNumber.trim()}` : ''
    ].filter(Boolean).join('  |  ');

    const drawWatermark = (): void => {
      if (!logo) return;
      doc.saveGraphicsState();
      (doc as any).setGState(new (doc as any).GState({ opacity: 0.08 }));
      doc.addImage(logo, 'JPEG', pageWidth / 2 - 48, pageHeight / 2 - 28, 96, 56);
      doc.restoreGraphicsState();
    };

    const drawHeader = (): void => {
      doc.setFillColor(248, 250, 253);
      doc.rect(0, 0, pageWidth, 34, 'F');
      doc.setDrawColor(49, 93, 143);
      doc.setLineWidth(0.7);
      doc.line(margin, 34, pageWidth - margin, 34);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(34, 67, 103);
      doc.text('ITMS Srinagar — Event Report', margin, 13);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(91, 105, 121);
      doc.text(`Generated: ${generatedAt.toLocaleString()}  |  Records: ${events.length}`, margin, 20);
      const filterLines = doc.splitTextToSize(activeFilters || 'Filters: none', pageWidth - margin * 2 - (logo ? 40 : 0));
      doc.text(filterLines.slice(0, 2), margin, 27);
      if (logo) doc.addImage(logo, 'JPEG', pageWidth - margin - 35, 3, 35, 27);
    };

    autoTable(doc, {
      head: [[
        'Time', 'Alert', 'Channel', 'Location', 'Message', 'Vehicle Number',
        'Priority', 'Status', 'Speed', 'Color'
      ]],
      body: events.map(event => [
        this.formatEventTime(event.eventTime),
        event.eventType || '—',
        event.cameraName || '—',
        event.junction || '—',
        event.message || '—',
        event.vehicleNumber || '—',
        event.priority || '—',
        event.status || '—',
        event.speedKmph == null ? '—' : `${event.speedKmph} km/h`,
        event.vehicleColor || '—'
      ]),
      startY: 38,
      margin: { top: 38, left: margin, right: margin, bottom: 13 },
      styles: {
        font: 'helvetica',
        fontSize: 8,
        cellPadding: 2.2,
        overflow: 'linebreak',
        valign: 'middle',
        textColor: [45, 55, 68],
        lineColor: [222, 230, 239],
        lineWidth: 0.15
      },
      headStyles: {
        fillColor: [49, 93, 143],
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 8,
        cellPadding: 2.7
      },
      alternateRowStyles: { fillColor: [246, 249, 253] },
      columnStyles: {
        0: { cellWidth: 34 },
        1: { cellWidth: 28 },
        2: { cellWidth: 48 },
        3: { cellWidth: 35 },
        4: { cellWidth: 127 },
        5: { cellWidth: 30 },
        6: { cellWidth: 22 },
        7: { cellWidth: 24 },
        8: { cellWidth: 23 },
        9: { cellWidth: 23 }
      },
      willDrawPage: () => {
        drawWatermark();
        drawHeader();
      },
      didDrawPage: () => {
        const pageNumber = (doc.internal as any).getCurrentPageInfo().pageNumber;
        doc.setDrawColor(220, 228, 238);
        doc.setLineWidth(0.3);
        doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(125, 137, 151);
        doc.text('ICCC Srinagar Smart City  •  ITMS Events', margin, pageHeight - 5);
        doc.text(
          `Confidential  •  Page ${pageNumber}  •  ${generatedAt.toLocaleDateString()}`,
          pageWidth - margin,
          pageHeight - 5,
          { align: 'right' }
        );
      }
    });

    doc.save(`ITMS-events-${generatedAt.toISOString().slice(0, 10)}.pdf`);
    this.snackBar.open('PDF report exported successfully.', 'Close', { duration: 3000 });
  }

  private formatEventTime(value: string): string {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value || '—' : date.toLocaleString();
  }

  private loadEvents(): void {
    this.loading = true;
    this.errorMessage = '';
    const query: ItmsEventQuery = {
      ...this.queryFilters(),
      page: this.pageIndex,
      size: this.pageSize,
      sort: `${this.sortBy},${this.sortDirection}`
    };
    this.itms.getEvents(query)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: response => {
          this.events = response.content;
          this.totalElements = response.totalElements;
          this.loading = false;
        },
        error: error => {
          this.events = [];
          this.totalElements = 0;
          this.loading = false;
          this.errorMessage = this.getErrorMessage(error, 'Could not load ITMS events.');
        }
      });
  }

  private queryFilters(): Omit<ItmsEventQuery, 'page' | 'size' | 'sort'> {
    return {
      from: this.fromDate || undefined,
      to: this.toDate || undefined,
      eventType: this.eventType || undefined,
      junction: this.junction || undefined,
      priority: this.priority || undefined,
      vehicleNumber: this.vehicleNumber.trim() || undefined
    };
  }

  private getErrorMessage(error: HttpErrorResponse, fallback: string): string {
    if (error.status === 401 || error.status === 403) return 'You are not authorized to view ITMS events.';
    if (error.status === 0) return 'Could not reach the ITMS API. Check the network or proxy configuration.';
    const message = error.error?.message ?? error.error?.error;
    return message ? `${fallback} ${message}` : fallback;
  }
}
