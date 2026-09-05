import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription, interval, startWith, from, mergeMap, toArray, of, catchError, switchMap } from 'rxjs';
import { TrammService } from '../../services/Tramm.service';
import { JunctionDetails } from '../../models/Tramm.models';

interface JunctionFeed {
  name: string;
  details: JunctionDetails | null;
  loadError: boolean;
}

type FeedStatus = 'on' | 'off' | 'err' | 'unknown';

/**
 * "Control room wall" view: pick a corridor (CR1..CR9 as tabs, CR1 selected
 * by default) and see every junction on it at once, each rendered as its
 * own camera-style feed with the live pole/lamp heads plus a status strip
 * underneath — instead of drilling into a single junction at a time.
 *
 * NOTE: this fires one getJunctionDetails call per junction in the corridor.
 * Requests are throttled (CONCURRENCY) since the backend is a legacy
 * SOAP-over-HTTP service and shouldn't be hit with unbounded parallel calls.
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
        <span class="lss-updated" *ngIf="lastRefreshed">
          Refreshed {{ lastRefreshed | date:'mediumTime' }}
        </span>
      </div>

      <div class="lss-tabs" [class.disabled]="loadingCorridors">
        <button
          type="button"
          class="lss-tab"
          *ngFor="let c of corridors"
          [class.active]="c === selectedCorridor"
          (click)="onCorridorChange(c)">
          {{ c }}
        </button>
      </div>

      <div class="lss-toolbar">
        <div class="lss-summary-row" *ngIf="feeds.length">
          <span class="summary-pill pill-on">{{ onCount }} ON</span>
          <span class="summary-pill pill-off" *ngIf="offCount">{{ offCount }} OFF</span>
          <span class="summary-pill pill-err">{{ errCount }} ERR</span>
          <span class="summary-pill pill-unknown" *ngIf="unknownCount">{{ unknownCount }} unreachable</span>
        </div>

        <label class="auto-refresh-toggle" *ngIf="selectedCorridor">
          <input type="checkbox" [checked]="autoRefresh" (change)="toggleAutoRefresh($any($event.target).checked)" />
          Auto-refresh every 15s
        </label>
      </div>

      <div *ngIf="errorMessage" class="lss-error">{{ errorMessage }}</div>

      <div *ngIf="selectedCorridor && loadingJunctions" class="empty-hint">
        Loading junctions...
      </div>

      <div class="cam-grid" *ngIf="feeds.length">
        <div
          class="cam-card"
          *ngFor="let feed of feeds"
          [ngClass]="'cam-' + status(feed)">

          <div class="cam-head">
            <span class="cam-name">{{ feed.name }}</span>
            <span class="live-badge" *ngIf="status(feed) === 'on'">
              <span class="live-dot"></span> LIVE
            </span>
            <span class="status-chip" [ngClass]="'chip-' + status(feed)">
              {{ statusLabel(feed) }}
            </span>
          </div>

          <div class="cam-body">
            <div class="cam-scanlines"></div>

            <ng-container *ngIf="feed.details as d; else noSignal">
              <div class="poles-mini" *ngIf="d.alPoleJSON?.length; else noPoles">
                <div class="pole-mini" *ngFor="let pole of d.alPoleJSON">
                  <div class="pole-mini-label">P{{ pole.nPoleNo }}</div>
                  <div class="lamp-row-mini">
                    <span
                      class="lamp-mini"
                      *ngFor="let lamp of pole.alLinkedLampJSON"
                      [ngClass]="lampClasses(lamp)"
                      [title]="'Lamp ' + lamp.nLampNo + ': ' + lamp.sLampColor + ' (' + (lamp.bLampStatus === 1 ? 'ON' : 'OFF') + ')'">
                    </span>
                  </div>
                </div>
              </div>
              <ng-template #noPoles>
                <div class="no-signal-text">No signal head data</div>
              </ng-template>
            </ng-container>

            <ng-template #noSignal>
              <div class="no-signal-text">
                {{ feed.loadError ? 'NO SIGNAL' : 'AWAITING DATA' }}
              </div>
            </ng-template>

            <div class="cam-corner-tag">CAM · {{ feed.name }}</div>
          </div>

          <div class="cam-footer">
            <div class="cam-error-text" *ngIf="feed.loadError">Could not reach junction.</div>

            <ng-container *ngIf="feed.details as d">
              <div class="footer-row">
                <span class="footer-label">Status</span>
                <span class="footer-value">{{ d.sStatus }}</span>
              </div>
              <div class="footer-row">
                <span class="footer-label">Mode</span>
                <span class="footer-value" [class.err-text]="d.sMode === 'ERR'">{{ d.sMode }}</span>
              </div>
              <div class="footer-row">
                <span class="footer-label">Cycle</span>
                <span class="footer-value">{{ d.nCurrentCycleNo }}</span>
              </div>
              <div class="footer-row">
                <span class="footer-label">Violations</span>
                <span class="footer-value" [class.warn-text]="d.nCumulativeViolations > 0">
                  {{ d.nCumulativeViolations }}
                </span>
              </div>
              <div class="footer-time">{{ d.tSystemTime }}</div>
            </ng-container>
          </div>
        </div>
      </div>
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

    .lss-updated {
      font-size: 12px;
      color: #888;
    }

    .lss-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }

    .lss-tabs.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .lss-tab {
      border: 1px solid #d5d5d5;
      background: #f5f5f5;
      color: #444;
      font-size: 13px;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.1s;
    }

    .lss-tab:hover {
      background: #ebebeb;
      transform: translateY(-1px);
    }

    .lss-tab.active {
      background: linear-gradient(135deg, #1565c0, #0d47a1);
      border-color: #0d47a1;
      color: #fff;
      box-shadow: 0 2px 8px rgba(13, 71, 161, 0.35);
    }

    .lss-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 16px;
    }

    .lss-summary-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .summary-pill {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }

    .pill-on { background: #e6f4ea; color: #1e7e34; }
    .pill-off { background: #f1f1f1; color: #666; }
    .pill-err { background: #fdecea; color: #b02a37; }
    .pill-unknown { background: #f1f1f1; color: #666; }

    .auto-refresh-toggle {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: #555;
      cursor: pointer;
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

    /* ---- camera grid ---- */

    .cam-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 18px;
    }

    .cam-card {
      border-radius: 12px;
      background: #fff;
      border: 1px solid #e2e2e2;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
      overflow: hidden;
      transition: transform 0.15s, box-shadow 0.15s;
    }

    .cam-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.12);
    }

    .cam-card.cam-err {
      border-color: #e57373;
      animation: cam-err-pulse 1.8s ease-in-out infinite;
    }

    @keyframes cam-err-pulse {
      0%, 100% { box-shadow: 0 2px 6px rgba(229, 57, 53, 0.15); }
      50% { box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.25); }
    }

    .cam-head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: #fafafa;
      border-bottom: 1px solid #eee;
    }

    .cam-name {
      font-weight: 700;
      font-size: 13px;
      color: #222;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .live-badge {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 10px;
      font-weight: 700;
      color: #e53935;
      letter-spacing: 0.5px;
    }

    .live-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #e53935;
      animation: live-blink 1.4s ease-in-out infinite;
    }

    @keyframes live-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.25; }
    }

    .status-chip {
      font-size: 10px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 10px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .chip-on { background: #e6f4ea; color: #1e7e34; }
    .chip-off { background: #eeeeee; color: #666; }
    .chip-err { background: #fdecea; color: #b02a37; }
    .chip-unknown { background: #eeeeee; color: #888; }

    .cam-body {
      position: relative;
      background: radial-gradient(ellipse at center, #1c1c1c 0%, #0a0a0a 100%);
      min-height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      overflow: hidden;
    }

    .cam-scanlines {
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        to bottom,
        rgba(255,255,255,0.03) 0px,
        rgba(255,255,255,0.03) 1px,
        transparent 1px,
        transparent 3px
      );
      pointer-events: none;
    }

    .cam-corner-tag {
      position: absolute;
      bottom: 6px;
      left: 8px;
      font-size: 9px;
      color: rgba(255,255,255,0.35);
      letter-spacing: 0.5px;
      font-family: 'Courier New', monospace;
    }

    .no-signal-text {
      color: rgba(255,255,255,0.4);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      z-index: 1;
    }

    .poles-mini {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
      justify-content: center;
      z-index: 1;
    }

    .pole-mini {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 8px;
      padding: 8px 10px;
    }

    .pole-mini-label {
      color: rgba(255,255,255,0.5);
      font-size: 10px;
      margin-bottom: 6px;
      text-align: center;
      letter-spacing: 0.5px;
    }

    .lamp-row-mini {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      max-width: 90px;
      justify-content: center;
    }

    .lamp-mini {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      display: inline-block;
      background: #333;
      border: 1px solid rgba(0,0,0,0.4);
    }

    .lamp-red { background: #e53935; box-shadow: 0 0 8px #e53935; }
    .lamp-amber { background: #fbc02d; box-shadow: 0 0 8px #fbc02d; }
    .lamp-green { background: #43a047; box-shadow: 0 0 8px #43a047; }
    .lamp-off { background: #333; box-shadow: none; opacity: 0.5; }

    .cam-footer {
      padding: 10px 12px;
      background: #fff;
    }

    .cam-error-text {
      font-size: 12px;
      color: #b02a37;
      font-weight: 600;
    }

    .footer-row {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      padding: 2px 0;
    }

    .footer-label {
      color: #888;
      text-transform: uppercase;
      font-size: 10px;
      letter-spacing: 0.4px;
      align-self: center;
    }

    .footer-value {
      font-weight: 600;
      color: #222;
    }

    .err-text { color: #b02a37; }
    .warn-text { color: #b26a00; }

    .footer-time {
      margin-top: 6px;
      font-size: 10px;
      color: #999;
      border-top: 1px solid #f0f0f0;
      padding-top: 6px;
    }
  `]
})
export class LiveSignalStatusComponent implements OnInit, OnDestroy {
  corridors: string[] = [];
  selectedCorridor: string | null = null;
  loadingCorridors = false;
  loadingJunctions = false;
  errorMessage: string | null = null;

  feeds: JunctionFeed[] = [];
  lastRefreshed: Date | null = null;
  autoRefresh = false;

  /** Which corridor to auto-select on first load, if present in the corridor list. */
  private readonly DEFAULT_CORRIDOR = 'CR1';

  /** how many getJunctionDetails calls run in parallel */
  private readonly CONCURRENCY = 4;
  private readonly REFRESH_MS = 15000;
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

        // Auto-select CR1 (or the first corridor if CR1 isn't present).
        const defaultCorridor = this.corridors.includes(this.DEFAULT_CORRIDOR)
          ? this.DEFAULT_CORRIDOR
          : this.corridors[0];

        if (defaultCorridor) {
          this.onCorridorChange(defaultCorridor);
        }
      },
      error: () => {
        this.errorMessage = 'Could not load corridor list.';
        this.loadingCorridors = false;
      }
    });
  }

  onCorridorChange(corridorName: string): void {
    if (corridorName === this.selectedCorridor) return;

    this.selectedCorridor = corridorName;
    this.feeds = [];
    this.errorMessage = null;
    this.stopAutoRefresh();

    if (!corridorName) return;

    this.loadingJunctions = true;
    this.trammService.getJunctions(corridorName).subscribe({
      next: (res) => {
        const names = res?.alJunctions ?? [];
        this.loadingJunctions = false;
        this.feeds = names.map(name => ({ name, details: null, loadError: false }));
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

    const names = this.feeds.map(f => f.name);
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
              switchMap((details) => of({ name: junctionName, details, loadError: false } as JunctionFeed)),
              catchError(() => of({ name: junctionName, details: null, loadError: true } as JunctionFeed))
            ),
          this.CONCURRENCY
        ),
        toArray()
      )
      .subscribe((results) => {
        // keep a stable order matching the original junction list
        const byName = new Map(results.map(r => [r.name, r]));
        this.feeds = junctionNames.map(name => byName.get(name) ?? { name, details: null, loadError: true });
        this.lastRefreshed = new Date();
      });
  }

  /** Single source of truth for a feed's status bucket. ERR takes priority, then OFF, otherwise ON. */
  status(feed: JunctionFeed): FeedStatus {
    if (feed.loadError || !feed.details) return 'unknown';
    const d = feed.details;
    if (d.sMode === 'ERR') return 'err';
    if (d.sStatus === 'JUNCTION OFF' || d.sStatus === 'JUNCTION-OFF') return 'off';
    return 'on';
  }

  statusLabel(feed: JunctionFeed): string {
    switch (this.status(feed)) {
      case 'on': return 'On';
      case 'off': return 'Off';
      case 'err': return 'Fault';
      default: return 'No Signal';
    }
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

  get onCount(): number {
    return this.feeds.filter(f => this.status(f) === 'on').length;
  }

  get offCount(): number {
    return this.feeds.filter(f => this.status(f) === 'off').length;
  }

  get errCount(): number {
    return this.feeds.filter(f => this.status(f) === 'err').length;
  }

  get unknownCount(): number {
    return this.feeds.filter(f => this.status(f) === 'unknown').length;
  }
}