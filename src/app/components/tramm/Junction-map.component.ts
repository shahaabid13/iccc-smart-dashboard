import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { Subscription, interval, startWith, from, mergeMap, toArray, of, catchError, switchMap, forkJoin } from 'rxjs';
import { TrammService } from '../../services/Tramm.service';
import { JunctionDetails } from '../../models/Tramm.models';

interface JunctionPoint {
  name: string;
  corridor: string;
  details: JunctionDetails | null;
  loadError: boolean;
}

/** Fine-grained health used for marker color / popup content. */
type JunctionHealth = 'on' | 'off' | 'err' | 'isolated' | 'dismantled' | 'unknown';

/** Coarse bucket used for the 4 filter toggles the user controls. */
type FilterBucket = 'on' | 'off' | 'err' | 'dismantled';

/**
 * Integrated map view: plots every junction across ALL corridors (selected
 * corridors default to "all") as a color-coded marker, using the
 * dLatitude/dLongitude already present in each junction's getJunctionDetails
 * response. Supports filtering by status: On, Off, Faulty (ERR), Dismantled.
 *
 * Route suggestion: /tramm/junction-map
 *
 * Requires: npm install leaflet @types/leaflet
 * Also add "node_modules/leaflet/dist/leaflet.css" to angular.json > styles.
 */
@Component({
  standalone: true,
  selector: 'app-junction-map',
  imports: [CommonModule],
  template: `
    <div class="map-panel">
      <div class="map-header">
        <h3>Junction Network Map</h3>
        <span class="map-updated" *ngIf="lastRefreshed">
          Refreshed {{ lastRefreshed | date:'mediumTime' }}
        </span>
      </div>

      <div class="map-controls">
        <div class="selector-group corridor-group">
          <div class="corridor-group-header">
            <label>Corridors</label>
            <button type="button" class="link-btn" (click)="toggleSelectAllCorridors()">
              {{ allCorridorsSelected ? 'Clear all' : 'Select all' }}
            </button>
          </div>
          <div class="corridor-checklist" [class.disabled]="loadingCorridors">
            <label class="corridor-chip" *ngFor="let c of corridors">
              <input
                type="checkbox"
                [checked]="selectedCorridors.has(c)"
                (change)="onCorridorToggle(c, $any($event.target).checked)" />
              {{ c }}
            </label>
          </div>
        </div>

        <label class="auto-refresh-toggle" *ngIf="selectedCorridors.size">
          <input type="checkbox" [checked]="autoRefresh" (change)="toggleAutoRefresh($any($event.target).checked)" />
          Auto-refresh every 30s
        </label>
      </div>

      <div class="map-controls filter-row" *ngIf="points.length">
        <div class="selector-group">
          <label>Status filters</label>
          <div class="filter-checklist">
            <label class="filter-pill pill-on" [class.pill-off-state]="!filters.on">
              <input type="checkbox" [checked]="filters.on" (change)="toggleFilter('on', $any($event.target).checked)" />
              On ({{ counts.on }})
            </label>
            <label class="filter-pill pill-off" [class.pill-off-state]="!filters.off">
              <input type="checkbox" [checked]="filters.off" (change)="toggleFilter('off', $any($event.target).checked)" />
              Off ({{ counts.off }})
            </label>
            <label class="filter-pill pill-err" [class.pill-off-state]="!filters.err">
              <input type="checkbox" [checked]="filters.err" (change)="toggleFilter('err', $any($event.target).checked)" />
              Faulty / ERR ({{ counts.err }})
            </label>
            <label class="filter-pill pill-dismantled" [class.pill-off-state]="!filters.dismantled">
              <input type="checkbox" [checked]="filters.dismantled" (change)="toggleFilter('dismantled', $any($event.target).checked)" />
              Dismantled ({{ counts.dismantled }})
            </label>
          </div>
        </div>
      </div>

      <div *ngIf="errorMessage" class="map-error">{{ errorMessage }}</div>

      <div class="map-container" #mapContainer></div>

      <div class="map-legend">
        <span class="legend-item"><span class="dot dot-on"></span> Active / On</span>
        <span class="legend-item"><span class="dot dot-off"></span> Off</span>
        <span class="legend-item"><span class="dot dot-err"></span> Fault (ERR)</span>
        <span class="legend-item"><span class="dot dot-isolated"></span> Isolated</span>
        <span class="legend-item"><span class="dot dot-dismantled"></span> Dismantled</span>
        <span class="legend-item"><span class="dot dot-unknown"></span> Unreachable</span>
      </div>
    </div>
  `,
  styles: [`
    .map-panel {
      border: 1px solid #dcdcdc;
      border-radius: 8px;
      padding: 20px;
      background: #fff;
    }

    .map-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 12px;
    }

    .map-updated {
      font-size: 12px;
      color: #888;
    }

    .map-controls {
      display: flex;
      align-items: flex-start;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }

    .filter-row {
      margin-bottom: 16px;
    }

    .selector-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 220px;
    }

    .selector-group label {
      font-size: 12px;
      font-weight: 600;
      color: #555;
    }

    .corridor-group {
      flex: 1;
      min-width: 280px;
    }

    .corridor-group-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .link-btn {
      background: none;
      border: none;
      color: #1565c0;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      padding: 0;
    }

    .link-btn:hover {
      text-decoration: underline;
    }

    .corridor-checklist {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      max-height: 90px;
      overflow-y: auto;
      padding: 6px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
    }

    .corridor-checklist.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .corridor-chip {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 500;
      color: #444;
      background: #f5f5f5;
      border-radius: 12px;
      padding: 4px 10px 4px 8px;
      cursor: pointer;
    }

    .auto-refresh-toggle {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: #555;
      cursor: pointer;
      margin-top: 20px;
    }

    .filter-checklist {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .filter-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.15s;
    }

    .filter-pill.pill-off-state {
      opacity: 0.4;
    }

    .pill-on { background: #e6f4ea; color: #1e7e34; }
    .pill-off { background: #f1f1f1; color: #666; }
    .pill-err { background: #fdecea; color: #b02a37; }
    .pill-dismantled { background: #ede7f6; color: #5e35b1; }

    .map-error {
      background: #fdecea;
      color: #b02a37;
      padding: 8px 12px;
      border-radius: 4px;
      margin-bottom: 12px;
      font-size: 13px;
    }

    .map-container {
      height: 600px;
      width: 100%;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      z-index: 0;
    }

    .map-legend {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      margin-top: 12px;
      font-size: 12px;
      color: #444;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      display: inline-block;
      border: 1px solid rgba(0,0,0,0.2);
    }

    .dot-on { background: #2e7d32; }
    .dot-off { background: #9e9e9e; }
    .dot-err { background: #e53935; }
    .dot-isolated { background: #fb8c00; }
    .dot-dismantled { background: #5e35b1; }
    .dot-unknown { background: #bdbdbd; }
  `]
})
export class JunctionMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainerRef!: ElementRef<HTMLDivElement>;

  // ---- Corridors ----
  corridors: string[] = [];
  selectedCorridors = new Set<string>();
  loadingCorridors = false;
  errorMessage: string | null = null;

  // ---- Junction data ----
  points: JunctionPoint[] = [];
  lastRefreshed: Date | null = null;
  autoRefresh = false;

  // ---- Filters ----
  filters: Record<FilterBucket, boolean> = { on: true, off: true, err: true, dismantled: true };
  counts: Record<FilterBucket, number> = { on: 0, off: 0, err: 0, dismantled: 0 };

  /**
   * TODO: paste the actual list of dismantled junction names here.
   * Any junction whose name appears in this list is always shown as
   * "dismantled" regardless of what the API reports for it.
   */
  private readonly DISMANTLED_JUNCTIONS: string[] = [
    // 'Junction-Name-1',
    // 'Junction-Name-2',
    // ... 8 total
  ];

  private map!: L.Map;
  private markers = new Map<string, L.CircleMarker>();

  private readonly CONCURRENCY = 4;
  private readonly REFRESH_MS = 30000;
  private refreshSub?: Subscription;

  /** Default center: Srinagar. Adjust if your junctions cluster elsewhere. */
  private readonly DEFAULT_CENTER: L.LatLngExpression = [34.0837, 74.7973];
  private readonly DEFAULT_ZOOM = 13;

  constructor(private trammService: TrammService) {}

  get allCorridorsSelected(): boolean {
    return this.corridors.length > 0 && this.selectedCorridors.size === this.corridors.length;
  }

  ngAfterViewInit(): void {
    this.initMap();
    setTimeout(() => this.loadCorridors());
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
    this.map?.remove();
  }

  private initMap(): void {
    this.map = L.map(this.mapContainerRef.nativeElement).setView(this.DEFAULT_CENTER, this.DEFAULT_ZOOM);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  loadCorridors(): void {
    this.loadingCorridors = true;
    this.trammService.getCorridors().subscribe({
      next: (res) => {
        this.corridors = res?.alCorridors ?? [];
        // Default: every corridor selected.
        this.selectedCorridors = new Set(this.corridors);
        this.loadingCorridors = false;
        this.loadSelectedCorridors();
      },
      error: () => {
        this.errorMessage = 'Could not load corridor list.';
        this.loadingCorridors = false;
      }
    });
  }

  toggleSelectAllCorridors(): void {
    if (this.allCorridorsSelected) {
      this.selectedCorridors.clear();
    } else {
      this.selectedCorridors = new Set(this.corridors);
    }
    this.loadSelectedCorridors();
  }

  onCorridorToggle(corridor: string, checked: boolean): void {
    if (checked) {
      this.selectedCorridors.add(corridor);
    } else {
      this.selectedCorridors.delete(corridor);
    }
    this.loadSelectedCorridors();
  }

  toggleFilter(bucket: FilterBucket, checked: boolean): void {
    this.filters = { ...this.filters, [bucket]: checked };
    this.updateMarkers();
  }

  toggleAutoRefresh(checked: boolean): void {
    this.autoRefresh = checked;
    if (checked) {
      this.startAutoRefresh();
    } else {
      this.stopAutoRefresh();
    }
  }

  /** Loads junction lists for every currently-selected corridor, then fetches details for all of them. */
  private loadSelectedCorridors(): void {
    this.stopAutoRefresh();
    this.errorMessage = null;

    const corridorNames = Array.from(this.selectedCorridors);
    if (!corridorNames.length) {
      this.points = [];
      this.clearMarkers();
      this.updateCounts();
      return;
    }

    const requests = corridorNames.map((corridor) =>
      this.trammService.getJunctions(corridor).pipe(
        switchMap((res) => of({ corridor, names: res?.alJunctions ?? [] })),
        catchError(() => of({ corridor, names: [] as string[] }))
      )
    );

    forkJoin(requests).subscribe((results) => {
      const corridorJunctionMap = new Map<string, string[]>();
      for (const r of results) {
        corridorJunctionMap.set(r.corridor, r.names);
      }
      this.refreshAll(corridorJunctionMap);
      if (this.autoRefresh) this.startAutoRefresh();
    });
  }

  private startAutoRefresh(): void {
    this.stopAutoRefresh();
    this.refreshSub = interval(this.REFRESH_MS)
      .pipe(startWith(0))
      .subscribe(() => {
        const corridorNames = Array.from(this.selectedCorridors);
        if (!corridorNames.length) return;
        const map = new Map<string, string[]>();
        for (const c of corridorNames) {
          map.set(c, this.points.filter(p => p.corridor === c).map(p => p.name));
        }
        this.refreshAll(map);
      });
  }

  private stopAutoRefresh(): void {
    this.refreshSub?.unsubscribe();
    this.refreshSub = undefined;
  }

  private refreshAll(corridorJunctionMap: Map<string, string[]>): void {
    const jobs: { corridor: string; name: string }[] = [];
    for (const [corridor, names] of corridorJunctionMap.entries()) {
      for (const name of names) jobs.push({ corridor, name });
    }

    if (!jobs.length) {
      this.points = [];
      this.clearMarkers();
      this.updateCounts();
      this.lastRefreshed = new Date();
      return;
    }

    from(jobs)
      .pipe(
        mergeMap(
          (job) =>
            this.trammService.getJunctionDetails(job.corridor, job.name).pipe(
              switchMap((details) => of({ name: job.name, corridor: job.corridor, details, loadError: false } as JunctionPoint)),
              catchError(() => of({ name: job.name, corridor: job.corridor, details: null, loadError: true } as JunctionPoint))
            ),
          this.CONCURRENCY
        ),
        toArray()
      )
      .subscribe((results) => {
        this.points = results;
        this.lastRefreshed = new Date();
        this.updateMarkers();
      });
  }

  /** Fine-grained health, used for marker color and popup text. */
  private getHealth(point: JunctionPoint): JunctionHealth {
    if (this.DISMANTLED_JUNCTIONS.includes(point.name)) return 'dismantled';
    if (point.loadError || !point.details) return 'unknown';
    const d = point.details;
    if (d.sMode === 'ERR') return 'err';
    if (d.sJunctionStateInCorridor === 'ISOLATED') return 'isolated';
    if (d.sStatus === 'JUNCTION-ON') return 'on';
    if (d.sStatus === 'JUNCTION-OFF') return 'off';
    return 'unknown';
  }

  /** Coarse bucket that the 4 filter toggles operate on. */
  private getFilterBucket(health: JunctionHealth): FilterBucket {
    switch (health) {
      case 'on': return 'on';
      case 'err': return 'err';
      case 'dismantled': return 'dismantled';
      // isolated, off, and unreachable/unknown all count as "Off" for filtering purposes.
      default: return 'off';
    }
  }

  private getColor(health: JunctionHealth): string {
    switch (health) {
      case 'on': return '#2e7d32';
      case 'off': return '#9e9e9e';
      case 'err': return '#e53935';
      case 'isolated': return '#fb8c00';
      case 'dismantled': return '#5e35b1';
      default: return '#bdbdbd';
    }
  }

  private updateCounts(): void {
    this.counts = { on: 0, off: 0, err: 0, dismantled: 0 };
    for (const p of this.points) {
      const bucket = this.getFilterBucket(this.getHealth(p));
      this.counts[bucket]++;
    }
  }

  private updateMarkers(): void {
    this.updateCounts();

    const seen = new Set<string>();
    const bounds: L.LatLngExpression[] = [];

    for (const point of this.points) {
      const health = this.getHealth(point);
      const bucket = this.getFilterBucket(health);
      const key = `${point.corridor}::${point.name}`;

      // Respect the active status filters.
      if (!this.filters[bucket]) continue;

      const lat = point.details?.dLatitude;
      const lng = point.details?.dLongitude;
      if (!lat || !lng) continue; // skip junctions with no usable coordinates

      seen.add(key);
      const color = this.getColor(health);
      bounds.push([lat, lng]);

      const existing = this.markers.get(key);
      if (existing) {
        existing.setStyle({ color, fillColor: color });
        existing.setLatLng([lat, lng]);
        existing.setPopupContent(this.popupHtml(point, health));
      } else {
        const marker = L.circleMarker([lat, lng], {
          radius: 10,
          color,
          fillColor: color,
          fillOpacity: 0.85,
          weight: 2
        }).addTo(this.map);
        marker.bindPopup(this.popupHtml(point, health));
        this.markers.set(key, marker);
      }
    }

    // remove markers that are filtered out or no longer present
    for (const [key, marker] of this.markers.entries()) {
      if (!seen.has(key)) {
        this.map.removeLayer(marker);
        this.markers.delete(key);
      }
    }

    if (bounds.length) {
      this.map.fitBounds(bounds as L.LatLngBoundsExpression, { padding: [30, 30], maxZoom: 15 });
    }
  }

  private popupHtml(point: JunctionPoint, health: JunctionHealth): string {
    const healthLabel = health === 'on' ? 'Active'
      : health === 'off' ? 'Off'
      : health === 'err' ? 'Fault (ERR)'
      : health === 'isolated' ? 'Isolated'
      : health === 'dismantled' ? 'Dismantled'
      : 'Unknown / Unreachable';

    if (health === 'dismantled') {
      return `<strong>${point.name}</strong><br/>Corridor: ${point.corridor}<br/>Status: Dismantled`;
    }
    if (point.loadError || !point.details) {
      return `<strong>${point.name}</strong><br/>Corridor: ${point.corridor}<br/>Unreachable`;
    }
    const d = point.details;
    return `
      <strong>${d.sName}</strong><br/>
      Corridor: ${point.corridor}<br/>
      Status: ${healthLabel}<br/>
      Mode: ${d.sMode}<br/>
      Cycle: ${d.nCurrentCycleNo}<br/>
      Violations: ${d.nCumulativeViolations}<br/>
      <span style="color:#888;font-size:11px;">${d.tSystemTime}</span>
    `;
  }

  private clearMarkers(): void {
    for (const marker of this.markers.values()) {
      this.map.removeLayer(marker);
    }
    this.markers.clear();
  }
}