import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription, interval, startWith, switchMap, catchError, of, Subject } from 'rxjs';
import { TrammService } from '../../services/Tramm.service';
import { JunctionDetails } from '../../models/Tramm.models';

/**
 * Focused, single-junction "control room" view.
 * Bigger signal heads, a loud fault banner when sMode === 'ERR',
 * and a live countdown to the next poll instead of just a timestamp.
 *
 * Route suggestion: /tramm/live-signal-status
 */
@Component({
  standalone: true,
  selector: 'app-tramm-live-signal-status',
  imports: [CommonModule, DatePipe],
  template: `
    <div class="lss-panel">
      <div class="lss-header">
        <h3>Live Signal Status</h3>
        <span class="countdown" *ngIf="selectedJunction && !errorMessage">
          Next refresh in {{ secondsToNextPoll }}s
        </span>
      </div>

      <div class="lss-selectors">
        <div class="selector-group">
          <label>Corridor</label>
          <select
            [disabled]="loadingCorridors"
            (change)="onCorridorChange($any($event.target).value)">
            <option value="">-- Select corridor --</option>
            <option *ngFor="let c of corridors" [value]="c">{{ c }}</option>
          </select>
        </div>

        <div class="selector-group">
          <label>Junction</label>
          <select
            [disabled]="!selectedCorridor || loadingJunctions"
            (change)="onJunctionChange($any($event.target).value)">
            <option value="">-- Select junction --</option>
            <option *ngFor="let j of junctions" [value]="j">{{ j }}</option>
          </select>
        </div>
      </div>

      <div *ngIf="!selectedJunction" class="empty-hint">
        Select a corridor and junction to see its live signal heads.
      </div>

      <div *ngIf="errorMessage" class="lss-error">{{ errorMessage }}</div>

      <ng-container *ngIf="junctionDetails as jd">
        <div class="fault-banner" *ngIf="jd.sMode === 'ERR'">
          ⚠ Controller fault detected — mode reporting <strong>ERR</strong>.
          Last update {{ jd.tSystemTime }}. This junction is not actively cycling.
        </div>

        <div class="lss-summary">
          <div class="summary-name">
            <h2>{{ jd.sName }}</h2>
            <span class="status-badge" [class.status-off]="jd.sMode === 'ERR'">
              {{ jd.sStatus }}
            </span>
          </div>
          <div class="summary-stats">
            <div class="stat">
              <span class="stat-label">Mode</span>
              <span class="stat-value" [class.err-text]="jd.sMode === 'ERR'">{{ jd.sMode }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Stage</span>
              <span class="stat-value">{{ jd.nCurrentStageNo }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Cycle</span>
              <span class="stat-value">{{ jd.nCurrentCycleNo }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Violations</span>
              <span class="stat-value" [class.warn-text]="jd.nCumulativeViolations > 0">
                {{ jd.nCumulativeViolations }}
              </span>
            </div>
          </div>
        </div>

        <div class="poles-grid-big" *ngIf="jd.alPoleJSON?.length">
          <div class="pole-card-big" *ngFor="let pole of jd.alPoleJSON">
            <div class="pole-title-big">Pole {{ pole.nPoleNo }}</div>
            <div class="lamp-row-big">
              <span
                class="lamp-big"
                *ngFor="let lamp of pole.alLinkedLampJSON"
                [ngClass]="lampClasses(lamp)"
                [title]="'Lamp ' + lamp.nLampNo + ': ' + lamp.sLampColor + ' (' + (lamp.bLampStatus === 1 ? 'ON' : 'OFF') + ')'">
              </span>
            </div>
          </div>
        </div>

        <div class="lss-footer" *ngIf="lastUpdated">
          Last polled {{ lastUpdated | date:'mediumTime' }} · source time {{ jd.tSystemTime }}
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .lss-panel {
      border: 1px solid #dcdcdc;
      border-radius: 8px;
      padding: 20px;
      background: #fff;
    }

    .lss-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 16px;
    }

    .countdown {
      font-size: 12px;
      color: #888;
      font-variant-numeric: tabular-nums;
    }

    .lss-selectors {
      display: flex;
      gap: 24px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .selector-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 220px;
    }

    .selector-group label {
      font-size: 12px;
      font-weight: 600;
      color: #555;
    }

    .selector-group select {
      padding: 8px 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }

    .empty-hint {
      color: #999;
      font-size: 13px;
      padding: 24px 0;
      text-align: center;
    }

    .lss-error {
      background: #fdecea;
      color: #b02a37;
      padding: 8px 12px;
      border-radius: 4px;
      margin-bottom: 12px;
      font-size: 13px;
    }

    .fault-banner {
      background: #fdecea;
      border: 1px solid #f1b0b7;
      color: #7a1f28;
      padding: 12px 16px;
      border-radius: 6px;
      margin-bottom: 16px;
      font-size: 14px;
    }

    .lss-summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 20px;
    }

    .summary-name {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .summary-name h2 {
      margin: 0;
      font-size: 22px;
    }

    .status-badge {
      padding: 3px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      background: #e6f4ea;
      color: #1e7e34;
    }

    .status-badge.status-off {
      background: #fdecea;
      color: #b02a37;
    }

    .summary-stats {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }

    .stat {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 80px;
    }

    .stat-label {
      font-size: 11px;
      color: #888;
      text-transform: uppercase;
    }

    .stat-value {
      font-size: 18px;
      font-weight: 700;
      color: #222;
    }

    .err-text {
      color: #b02a37;
    }

    .warn-text {
      color: #b26a00;
    }

    .poles-grid-big {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 16px;
    }

    .pole-card-big {
      background: #141414;
      border-radius: 10px;
      padding: 16px 20px;
      min-width: 180px;
    }

    .pole-title-big {
      color: #ccc;
      font-size: 12px;
      margin-bottom: 10px;
      letter-spacing: 0.5px;
    }

    .lamp-row-big {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      max-width: 220px;
    }

    .lamp-big {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: inline-block;
      background: #333;
      border: 1px solid #000;
    }

    .lamp-red { background: #e53935; box-shadow: 0 0 10px #e53935; }
    .lamp-amber { background: #fbc02d; box-shadow: 0 0 10px #fbc02d; }
    .lamp-green { background: #43a047; box-shadow: 0 0 10px #43a047; }
    .lamp-off { background: #3a3a3a; box-shadow: none; opacity: 0.6; }

    .lss-footer {
      font-size: 12px;
      color: #999;
      border-top: 1px solid #eee;
      padding-top: 10px;
    }
  `]
})
export class LiveSignalStatusComponent implements OnInit, OnDestroy {
  corridors: string[] = [];
  junctions: string[] = [];

  selectedCorridor: string | null = null;
  selectedJunction: string | null = null;

  junctionDetails: JunctionDetails | null = null;
  lastUpdated: Date | null = null;
  errorMessage: string | null = null;
  loadingCorridors = false;
  loadingJunctions = false;

  secondsToNextPoll = 0;

  private readonly POLL_MS = 10000;
  private pollSub?: Subscription;
  private countdownSub?: Subscription;

  constructor(private trammService: TrammService) {}

  ngOnInit(): void {
    this.loadCorridors();
  }

  ngOnDestroy(): void {
    this.pollSub?.unsubscribe();
    this.countdownSub?.unsubscribe();
  }

  loadCorridors(): void {
    this.loadingCorridors = true;
    this.trammService.getCorridors().subscribe({
      next: (res) => {
        this.corridors = res?.alCorridors ?? [];
        this.loadingCorridors = false;
      },
      error: () => {
        this.errorMessage = 'Could not load corridor list.';
        this.loadingCorridors = false;
      }
    });
  }

  onCorridorChange(corridorName: string): void {
    this.selectedCorridor = corridorName;
    this.selectedJunction = null;
    this.junctions = [];
    this.junctionDetails = null;
    this.stopPolling();

    if (!corridorName) return;

    this.loadingJunctions = true;
    this.trammService.getJunctions(corridorName).subscribe({
      next: (res) => {
        this.junctions = res?.alJunctions ?? [];
        this.loadingJunctions = false;
      },
      error: () => {
        this.errorMessage = 'Could not load junctions for this corridor.';
        this.loadingJunctions = false;
      }
    });
  }

  onJunctionChange(junctionName: string): void {
    this.selectedJunction = junctionName;
    this.junctionDetails = null;
    this.stopPolling();

    if (!junctionName || !this.selectedCorridor) return;

    this.startPolling(this.selectedCorridor, junctionName);
  }

  private startPolling(corridorName: string, junctionName: string): void {
    this.pollSub = interval(this.POLL_MS)
      .pipe(
        startWith(0),
        switchMap(() =>
          this.trammService.getJunctionDetails(corridorName, junctionName).pipe(
            catchError(() => {
              this.errorMessage = 'Could not reach junction details endpoint.';
              return of(null);
            })
          )
        )
      )
      .subscribe((data) => {
        if (data) {
          this.junctionDetails = data;
          this.errorMessage = null;
          this.lastUpdated = new Date();
          this.resetCountdown();
        }
      });
  }

  private resetCountdown(): void {
    this.countdownSub?.unsubscribe();
    this.secondsToNextPoll = this.POLL_MS / 1000;
    this.countdownSub = interval(1000).subscribe(() => {
      if (this.secondsToNextPoll > 0) this.secondsToNextPoll--;
    });
  }

  private stopPolling(): void {
    this.pollSub?.unsubscribe();
    this.pollSub = undefined;
    this.countdownSub?.unsubscribe();
    this.countdownSub = undefined;
  }

  lampClasses(lamp: { sLampColor: string; bLampStatus: number }): string[] {
    const isOn = lamp.bLampStatus === 1;
    return [isOn ? this.lampColorClass(lamp.sLampColor) : 'lamp-off'];
  }

  private lampColorClass(color: string): string {
    switch ((color || '').toUpperCase()) {
      case 'RED': return 'lamp-red';
      case 'AMBER': return 'lamp-amber';
      case 'GREEN': return 'lamp-green';
      default: return 'lamp-off';
    }
  }
}