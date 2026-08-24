import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { Subscription, interval, startWith, from, mergeMap, toArray, of, catchError, switchMap } from 'rxjs';
import { TrammService } from '../../services/Tramm.service';
import { JunctionDetails } from '../../models/Tramm.models';

interface JunctionPoint {
  name: string;
  details: JunctionDetails | null;
  loadError: boolean;
}

type JunctionHealth = 'on' | 'err' | 'isolated' | 'unknown';

/**
 * Integrated map view: plots every junction in a selected corridor as a
 * color-coded marker (green = on, red = ERR, orange = isolated, gray =
 * unreachable), using the dLatitude/dLongitude already present in each
 * junction's getJunctionDetails response.
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

        <div class="map-summary-row" *ngIf="points.length">
          <span class="summary-pill pill-on">{{ counts.on }} ON</span>
          <span class="summary-pill pill-err">{{ counts.err }} ERR</span>
          <span class="summary-pill pill-isolated" *ngIf="counts.isolated">{{ counts.isolated }} Isolated</span>
          <span class="summary-pill pill-unknown" *ngIf="counts.unknown">{{ counts.unknown }} Unreachable</span>
        </div>
      </div>

      <div *ngIf="errorMessage" class="map-error">{{ errorMessage }}</div>

      <div class="map-container" #mapContainer></div>

      <div class="map-legend">
        <span class="legend-item"><span class="dot dot-on"></span> Active / On</span>
        <span class="legend-item"><span class="dot dot-err"></span> Fault (ERR)</span>
        <span class="legend-item"><span class="dot dot-isolated"></span> Isolated</span>
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
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 12px;
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
    }

    .map-summary-row {
      display: flex;
      gap: 8px;
      margin-left: auto;
    }

    .summary-pill {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }

    .pill-on { background: #e6f4ea; color: #1e7e34; }
    .pill-err { background: #fdecea; color: #b02a37; }
    .pill-isolated { background: #fff4e5; color: #b26a00; }
    .pill-unknown { background: #f1f1f1; color: #666; }

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
    .dot-err { background: #e53935; }
    .dot-isolated { background: #fb8c00; }
    .dot-unknown { background: #9e9e9e; }
  `]
})
export class JunctionMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainerRef!: ElementRef<HTMLDivElement>;

  corridors: string[] = [];
  selectedCorridor: string | null = null;
  loadingCorridors = false;
  errorMessage: string | null = null;

  points: JunctionPoint[] = [];
  lastRefreshed: Date | null = null;
  autoRefresh = false;

  counts = { on: 0, err: 0, isolated: 0, unknown: 0 };

  private map!: L.Map;
  private markers = new Map<string, L.CircleMarker>();

  private readonly CONCURRENCY = 4;
  private readonly REFRESH_MS = 30000;
  private refreshSub?: Subscription;

  /** Default center: Srinagar. Adjust if your junctions cluster elsewhere. */
  private readonly DEFAULT_CENTER: L.LatLngExpression = [34.0837, 74.7973];
  private readonly DEFAULT_ZOOM = 13;

  constructor(private trammService: TrammService) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.loadCorridors();
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
    this.clearMarkers();
    this.points = [];
    this.errorMessage = null;
    this.stopAutoRefresh();

    if (!corridorName) return;

    this.trammService.getJunctions(corridorName).subscribe({
      next: (res) => {
        const names = res?.alJunctions ?? [];
        this.refreshAll(corridorName, names);
        if (this.autoRefresh) this.startAutoRefresh(corridorName, names);
      },
      error: () => {
        this.errorMessage = 'Could not load junctions for this corridor.';
      }
    });
  }

  toggleAutoRefresh(checked: boolean): void {
    this.autoRefresh = checked;
    if (!this.selectedCorridor) return;

    const names = this.points.map(p => p.name);
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
              switchMap((details) => of({ name: junctionName, details, loadError: false } as JunctionPoint)),
              catchError(() => of({ name: junctionName, details: null, loadError: true } as JunctionPoint))
            ),
          this.CONCURRENCY
        ),
        toArray()
      )
      .subscribe((results) => {
        const byName = new Map(results.map(r => [r.name, r]));
        this.points = junctionNames.map(name => byName.get(name) ?? { name, details: null, loadError: true });
        this.lastRefreshed = new Date();
        this.updateMarkers();
        this.updateCounts();
      });
  }

  private updateCounts(): void {
    this.counts = { on: 0, err: 0, isolated: 0, unknown: 0 };
    for (const p of this.points) {
      switch (this.getHealth(p)) {
        case 'on': this.counts.on++; break;
        case 'err': this.counts.err++; break;
        case 'isolated': this.counts.isolated++; break;
        default: this.counts.unknown++;
      }
    }
  }

  private getHealth(point: JunctionPoint): JunctionHealth {
    if (point.loadError || !point.details) return 'unknown';
    const d = point.details;
    if (d.sMode === 'ERR') return 'err';
    if (d.sJunctionStateInCorridor === 'ISOLATED') return 'isolated';
    if (d.sStatus === 'JUNCTION-ON') return 'on';
    return 'unknown';
  }

  private getColor(health: JunctionHealth): string {
    switch (health) {
      case 'on': return '#2e7d32';
      case 'err': return '#e53935';
      case 'isolated': return '#fb8c00';
      default: return '#9e9e9e';
    }
  }

  private updateMarkers(): void {
    const seen = new Set<string>();
    const bounds: L.LatLngExpression[] = [];

    for (const point of this.points) {
      const lat = point.details?.dLatitude;
      const lng = point.details?.dLongitude;
      if (!lat || !lng) continue; // skip junctions with no usable coordinates

      seen.add(point.name);
      const health = this.getHealth(point);
      const color = this.getColor(health);
      bounds.push([lat, lng]);

      const existing = this.markers.get(point.name);
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
        this.markers.set(point.name, marker);
      }
    }

    // remove markers for junctions no longer in the list
    for (const [name, marker] of this.markers.entries()) {
      if (!seen.has(name)) {
        this.map.removeLayer(marker);
        this.markers.delete(name);
      }
    }

    if (bounds.length) {
      this.map.fitBounds(bounds as L.LatLngBoundsExpression, { padding: [30, 30], maxZoom: 15 });
    }
  }

  private popupHtml(point: JunctionPoint, health: JunctionHealth): string {
    if (point.loadError || !point.details) {
      return `<strong>${point.name}</strong><br/>Unreachable`;
    }
    const d = point.details;
    const healthLabel = health === 'on' ? 'Active'
      : health === 'err' ? 'Fault (ERR)'
      : health === 'isolated' ? 'Isolated'
      : 'Unknown';
    return `
      <strong>${d.sName}</strong><br/>
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