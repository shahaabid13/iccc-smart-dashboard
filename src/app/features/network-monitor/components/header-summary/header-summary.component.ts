import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, interval, startWith, switchMap, catchError, of } from 'rxjs';
import { SdnetDashboardService } from '../../services/dashboard.service';
import { DashboardSummary } from '../../models/dashboard-summary.model';

@Component({
  selector: 'app-sdnet-header-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-summary.component.html',
  styleUrl: './header-summary.component.scss'
})
export class HeaderSummaryComponent implements OnInit, OnDestroy {
  summary: DashboardSummary | null = null;
  lastError: string | null = null;
  private sub?: Subscription;

  constructor(private dashboardService: SdnetDashboardService) {}

  ngOnInit(): void {
    // Poll every 30s. catchError sits INSIDE switchMap deliberately -- an
    // uncaught error here would terminate the whole outer interval, not
    // just this one tick, which is exactly what silently killed polling
    // after the first failed request.
    this.sub = interval(30000).pipe(
      startWith(0),
      switchMap(() => this.dashboardService.summary().pipe(
        catchError((err: HttpErrorResponse) => {
          this.summary = null;
          // status 0 is what the browser reports for a CORS block or a
          // connection it couldn't make at all -- a real 4xx/5xx means the
          // request reached the backend and it responded with an error.
          this.lastError = err.status === 0
            ? 'Cannot reach API (connection refused, or blocked by CORS)'
            : `API returned ${err.status} ${err.statusText}`;
          return of(null);
        })
      ))
    ).subscribe((s) => {
      if (s) {
        this.summary = s;
        this.lastError = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
