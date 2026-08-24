import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription, interval, startWith, switchMap, of, from, mergeMap, toArray, catchError } from 'rxjs';
import { TrammService } from '../../services/Tramm.service';
import { JunctionDetails } from '../../models/Tramm.models';

interface JunctionCard {
  name: string;
  details: JunctionDetails | null;
  loadError: boolean;
}

/**
 * Fleet-health overview: pick a corridor, see every junction in it as a
 * status card at a glance (ON / ERR / stale), instead of drilling into
 * one junction at a time.
 *
 * NOTE: this fires one getJunctionDetails call per junction in the corridor.
 * Requests are throttled (CONCURRENCY) since the backend is a legacy
 * SOAP-over-HTTP service and shouldn't be hit with unbounded parallel calls.
 *
 * Route suggestion: /tramm/junction-monitor
 */
@Component({
  standalone: true,
  selector: 'app-tramm-junction-monitor',
  imports: [CommonModule, DatePipe],
  template: `
    <div class="jm-panel">
      <div class="jm-header">
        <h3>Junction Monitor</h3>
        <span class="jm-updated" *ngIf="lastRefreshed">
          Refreshed {{ lastRefreshed | date:'mediumTime' }}
        </span>
      </div>

      <div class="jm-selectors">
        <div class="selector-group">
          <label>Corridor</label>
          <select
            [disabled]="loadingCorridors"
            (change)="onCorridorChange($any($event.target).value)">
            <option value="">-- Select corridor --</option>
            <option *ngFor="let c of corridors" [value]="c">{{ c }}</option>
          </select>
        </div>

        <label class="auto-refresh-toggle" *ngIf="selectedCorridor">
          <input type="checkbox" [checked]="autoRefresh" (change)="toggleAutoRefresh($any($event.target).checked)" />
          Auto-refresh every 30s
        </label>
      </div>

      <div *ngIf="errorMessage" class="jm-error">{{ errorMessage }}</div>

      <div *ngIf="!selectedCorridor" class="empty-hint">
        Select a corridor to see the health of every junction on it.
      </div>

      <div *ngIf="selectedCorridor && loadingJunctions" class="empty-hint">
        Loading junctions...
      </div>

      <div class="jm-summary-row" *ngIf="cards.length">
        <span class="summary-pill pill-ok">{{ okCount }} ON</span>
        <span class="summary-pill pill-err">{{ errCount }} ERR</span>
        <span class="summary-pill pill-unknown" *ngIf="unknownCount">{{ unknownCount }} unreachable</span>
      </div>

      <div class="jm-grid" *ngIf="cards.length">
        <div
          class="jm-card"
          *ngFor="let card of cards"
          [class.card-err]="card.loadError || card.details?.sMode === 'ERR'"
          [class.card-ok]="card.details && !card.loadError && card.details.sMode !== 'ERR'">

          <div class="card-top">
            <span class="card-name">{{ card.name }}</span>
            <span
              class="card-dot"
              [class.dot-err]="card.loadError || card.details?.sMode === 'ERR'"
              [class.dot-ok]="card.details && !card.loadError && card.details.sMode !== 'ERR'">
            </span>
          </div>

          <div *ngIf="card.loadError" class="card-error-text">Could not reach junction.</div>

          <ng-container *ngIf="card.details as d">
            <div class="card-row">
              <span class="card-label">Status</span>
              <span class="card-value">{{ d.sStatus }}</span>
            </div>
            <div class="card-row">
              <span class="card-label">Mode</span>
              <span class="card-value" [class.err-text]="d.sMode === 'ERR'">{{ d.sMode }}</span>
            </div>
            <div class="card-row">
              <span class="card-label">Cycle</span>
              <span class="card-value">{{ d.nCurrentCycleNo }}</span>
            </div>
            <div class="card-row">
              <span class="card-label">Violations</span>
              <span class="card-value" [class.warn-text]="d.nCumulativeViolations > 0">
                {{ d.nCumulativeViolations }}
              </span>
            </div>
            <div class="card-time">{{ d.tSystemTime }}</div>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .jm-panel {
      border: 1px solid #dcdcdc;
      border-radius: 8px;
      padding: 20px;
      background: #fff;
    }

    .jm-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 16px;
    }

    .jm-updated {
      font-size: 12px;
      color: #888;
    }

    .jm-selectors {
      display: flex;
      gap: 24px;
      align-items: flex-end;
      margin-bottom: 16px;
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

    .auto-refresh-toggle {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: #555;
      cursor: pointer;
      padding-bottom: 8px;
    }

    .empty-hint {
      color: #999;
      font-size: 13px;
      padding: 24px 0;
      text-align: center;
    }

    .jm-error {
      background: #fdecea;
      color: #b02a37;
      padding: 8px 12px;
      border-radius: 4px;
      margin-bottom: 12px;
      font-size: 13px;
    }

    .jm-summary-row {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    .summary-pill {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }

    .pill-ok { background: #e6f4ea; color: #1e7e34; }
    .pill-err { background: #fdecea; color: #b02a37; }
    .pill-unknown { background: #f1f1f1; color: #666; }

    .jm-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 14px;
    }

    .jm-card {
      border: 1px solid #e5e5e5;
      border-left: 4px solid #ccc;
      border-radius: 8px;
      padding: 14px;
      background: #fafafa;
    }

    .jm-card.card-ok {
      border-left-color: #43a047;
    }

    .jm-card.card-err {
      border-left-color: #e53935;
      background: #fff8f7;
    }

    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .card-name {
      font-weight: 700;
      font-size: 14px;
      color: #222;
    }

    .card-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #bbb;
      flex-shrink: 0;
    }

    .dot-ok { background: #43a047; box-shadow: 0 0 6px #43a047; }
    .dot-err { background: #e53935; box-shadow: 0 0 6px #e53935; }

    .card-error-text {
      font-size: 12px;
      color: #b02a37;
    }

    .card-row {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      padding: 2px 0;
    }

    .card-label {
      color: #888;
      text-transform: uppercase;
      font-size: 10px;
      letter-spacing: 0.4px;
      align-self: center;
    }

    .card-value {
      font-weight: 600;
      color: #222;
    }

    .err-text { color: #b02a37; }
    .warn-text { color: #b26a00; }

    .card-time {
      margin-top: 8px;
      font-size: 10px;
      color: #999;
      border-top: 1px solid #eee;
      padding-top: 6px;
    }
  `]
})
export class JunctionMonitorComponent implements OnInit, OnDestroy {
  corridors: string[] = [];
  selectedCorridor: string | null = null;
  loadingCorridors = false;
  loadingJunctions = false;
  errorMessage: string | null = null;

  cards: JunctionCard[] = [];
  lastRefreshed: Date | null = null;
  autoRefresh = false;

  /** how many getJunctionDetails calls run in parallel */
  private readonly CONCURRENCY = 4;
  private readonly REFRESH_MS = 30000;
  private refreshSub?: Subscription;

  constructor(private trammService: TrammService) {}

  ngOnInit(): void {
    this.loadCorridors();
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
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
    this.cards = [];
    this.errorMessage = null;
    this.stopAutoRefresh();

    if (!corridorName) return;

    this.loadingJunctions = true;
    this.trammService.getJunctions(corridorName).subscribe({
      next: (res) => {
        const names = res?.alJunctions ?? [];
        this.loadingJunctions = false;
        this.cards = names.map(name => ({ name, details: null, loadError: false }));
        this.refreshAll(corridorName, names);
        if (this.autoRefresh) this.startAutoRefresh(corridorName, names);
      },
      error: () => {
        this.errorMessage = 'Could not load junctions for this corridor.';
        this.loadingJunctions = false;
      }
    });
  }

  toggleAutoRefresh(checked: boolean): void {
    this.autoRefresh = checked;
    if (!this.selectedCorridor) return;

    const names = this.cards.map(c => c.name);
    if (checked) {
      this.startAutoRefresh(this.selectedCorridor, names);
    } else {
      this.stopAutoRefresh();
    }
  }

  private startAutoRefresh(corridorName: string, junctionNames: string[]): void {
    this.stopAutoRefresh();
    this.refreshSub = interval(this.REFRESH_MS)
      .pipe(startWith(0))
      .subscribe(() => this.refreshAll(corridorName, junctionNames));
  }

  private stopAutoRefresh(): void {
    this.refreshSub?.unsubscribe();
    this.refreshSub = undefined;
  }

  private refreshAll(corridorName: string, junctionNames: string[]): void {
    from(junctionNames)
      .pipe(
        mergeMap(
          (junctionName) =>
            this.trammService.getJunctionDetails(corridorName, junctionName).pipe(
              switchMap((details) => of({ name: junctionName, details, loadError: false } as JunctionCard)),
              catchError(() => of({ name: junctionName, details: null, loadError: true } as JunctionCard))
            ),
          this.CONCURRENCY
        ),
        toArray()
      )
      .subscribe((results) => {
        // keep a stable order matching the original junction list
        const byName = new Map(results.map(r => [r.name, r]));
        this.cards = junctionNames.map(name => byName.get(name) ?? { name, details: null, loadError: true });
        this.lastRefreshed = new Date();
      });
  }

  get okCount(): number {
    return this.cards.filter(c => c.details && !c.loadError && c.details.sMode !== 'ERR').length;
  }

  get errCount(): number {
    return this.cards.filter(c => !c.loadError && c.details?.sMode === 'ERR').length;
  }

  get unknownCount(): number {
    return this.cards.filter(c => c.loadError).length;
  }
}