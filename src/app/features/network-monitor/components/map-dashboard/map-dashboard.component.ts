import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { forkJoin, interval, Subscription } from 'rxjs';
import { SdnetJunctionService } from '../../services/junction.service';
import { SdnetFibreLinkService } from '../../services/fibre-link.service';
import { SdnetDeviceService } from '../../services/device.service';
import { Junction } from '../../models/junction.model';
import { FibreLink } from '../../models/fibre-link.model';
import { Device, DeviceStatus } from '../../models/device.model';

interface LinkLayers {
  casing: L.Polyline;
  main: L.Polyline;
}

/** Below this zoom level, 1177 device markers all at once is noise rather
 *  than signal -- they only render once someone's zoomed in to roughly
 *  neighbourhood scale. Junctions and fibre links stay visible throughout. */
const DEVICE_MARKER_MIN_ZOOM = 13;

@Component({
  selector: 'app-sdnet-map-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './map-dashboard.component.html',
  styleUrl: './map-dashboard.component.scss'
})
export class MapDashboardComponent implements AfterViewInit, OnDestroy {
  private map!: L.Map;
  private linkLayers = new Map<string, LinkLayers>();
  private linksById = new Map<string, FibreLink>();
  private deviceMarkers = new Map<number, L.Marker>();
  private devicesById = new Map<number, Device>();
  private deviceLayer = L.layerGroup();
  private junctionCoords = new Map<string, [number, number]>();
  private decommissionedJunctionIds = new Set<string>();
  private refreshSub?: Subscription;

  loading = true;
  loadError = false;
  unresolvedCount = 0;
  showDevices = true;

  constructor(
    private junctionService: SdnetJunctionService,
    private fibreLinkService: SdnetFibreLinkService,
    private deviceService: SdnetDeviceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.loadAndRender();

    // Refresh link/device/marker status colours every 20s without rebuilding the map.
    this.refreshSub = interval(20000).subscribe(() => this.refreshStatuses());
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
    this.map?.remove();
  }

  toggleDevices(): void {
    this.showDevices = !this.showDevices;
    this.syncDeviceLayerVisibility();
  }

  private syncDeviceLayerVisibility(): void {
    const shouldShow = this.showDevices && this.map.getZoom() >= DEVICE_MARKER_MIN_ZOOM;
    const isShown = this.map.hasLayer(this.deviceLayer);
    if (shouldShow && !isShown) this.deviceLayer.addTo(this.map);
    if (!shouldShow && isShown) this.map.removeLayer(this.deviceLayer);
  }

  private initMap(): void {
    this.map = L.map('sdnet-map', { zoomControl: true, minZoom: 11, maxZoom: 19 })
      .setView([34.1088, 74.8067], 13);

    // CARTO's keyless basemaps.cartocdn.com raster tiles started requiring
    // an API key on 2026-08-28, watermarking every unauthenticated request
    // regardless of style -- light_all would have broken here just as much
    // as light_nolabels did. Esri's classic Canvas/World_Light_Gray_Base is
    // still a genuinely keyless legacy REST service (same server.
    // arcgisonline.com family the satellite layer below already relies on,
    // not the newer token-gated basemapstyles-api.arcgis.com), and it's
    // deliberately sparse on labels by design rather than needing a
    // separate "nolabels" variant -- exactly what the original text-overlap
    // fix was going for anyway.
    const streetsLight = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      { attribution: 'Esri, HERE, Garmin, &copy; OpenStreetMap contributors', maxZoom: 16 }
    ).addTo(this.map);

    const satellite = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { attribution: 'Tiles &copy; Esri', maxZoom: 19 }
    );

    L.control.layers({ 'Streets (light)': streetsLight, 'Satellite': satellite }, undefined, { position: 'topright' })
      .addTo(this.map);

    L.control.scale({ position: 'bottomleft', imperial: false }).addTo(this.map);

    this.map.on('zoomend', () => this.syncDeviceLayerVisibility());
  }

  private loadAndRender(): void {
    forkJoin({
      junctions: this.junctionService.findAll(),
      links: this.fibreLinkService.findAll(),
      devices: this.deviceService.findAll(),
    }).subscribe({
      next: ({ junctions, links, devices }) => {
        this.decommissionedJunctionIds = new Set(
          junctions.filter((junction) => junction.decommissioned).map((junction) => junction.id)
        );
        this.renderJunctions(junctions);
        this.renderLinks(links);
        this.renderDevices(devices);
        this.fitToData(junctions);
        this.focusRequestedJunction();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.loadError = true;
      },
    });
  }

  /** Supports device-detail's "View on map" button (?junction=<id>), which
   *  needs the map zoomed in far enough for device markers to actually show. */
  private focusRequestedJunction(): void {
    const junctionId = this.route.snapshot.queryParamMap.get('junction');
    if (!junctionId) return;
    const coords = this.junctionCoords.get(junctionId);
    if (coords) {
      this.map.setView(coords, Math.max(DEVICE_MARKER_MIN_ZOOM, this.map.getZoom()));
    }
  }

  private renderJunctions(junctions: Junction[]): void {
    for (const j of junctions) {
      if (j.decommissioned) continue;
      if (!j.hasCoordinates || j.latitude == null || j.longitude == null) {
        this.unresolvedCount++;
        continue;
      }
      this.junctionCoords.set(j.id, [j.latitude, j.longitude]);

      const marker = j.type === 'ROUTER' || j.type === 'SWITCH'
        ? L.marker([j.latitude, j.longitude], { icon: this.switchDivIcon(j.reachable !== false) })
        : L.circleMarker([j.latitude, j.longitude], {
            radius: j.type === 'DATA_CENTER' ? 8 : 6,
            color: j.reachable === false ? this.cssVar('--sdnet-down') : '#1c3350',
            weight: j.reachable === false ? 3 : 1.5,
            fillColor: j.type === 'DATA_CENTER' ? '#ff6a4f' : '#4fb3ff',
            fillOpacity: 0.95,
          });

      marker.bindPopup(this.junctionPopup(j));
      marker.bindTooltip(j.name, {
        permanent: true,
        interactive: false,
        direction: 'top',
        offset: [0, -8],
        className: 'junction-label'
      });
      marker.addTo(this.map);
    }
  }

  private renderLinks(links: FibreLink[]): void {
    for (const link of links) {
      if (
        (link.fromJunctionId && this.decommissionedJunctionIds.has(link.fromJunctionId)) ||
        (link.toJunctionId && this.decommissionedJunctionIds.has(link.toJunctionId)) ||
        ['UNKNOWN', 'DUPLICATE', 'INVALID'].includes((link.topologyRole || '').toUpperCase())
      ) continue;

      this.linksById.set(link.id, link);
      if (!link.path || link.path.length < 2) continue;

      const latlngs = link.path.map(([lat, lon]) => [lat, lon] as [number, number]);
      const casing = L.polyline(latlngs, {
        color: '#ffffff',
        weight: link.topologyRole === 'PRIMARY_BRANCH' ? 7 : 6,
        opacity: 0.35
      }).addTo(this.map);
      const main = L.polyline(latlngs, this.styleFor(link)).addTo(this.map);
      main.getElement()?.classList.toggle('flow-down', this.linkStatus(link) === 'DOWN');

      main.on('click', () => this.openLinkPopup(link.id));
      casing.on('click', () => this.openLinkPopup(link.id));
      main.on('popupopen', (event) => this.wireLinkPopupActions(event.popup.getElement() ?? null, link.id));

      this.linkLayers.set(link.id, { casing, main });
    }
  }

  /** Devices don't have their own lat/lon -- only their junction does -- so
   *  every device at a junction gets fanned out on a small circle around
   *  that junction's point rather than stacking exactly on top of each
   *  other (a junction here has 13 devices on average, some as many as 20+). */
  private renderDevices(devices: Device[]): void {
    const byJunction = new Map<string, Device[]>();
    for (const d of devices) {
      this.devicesById.set(d.id, d);
      if (!d.junctionId || !d.junctionHasCoordinates) continue;
      if (this.decommissionedJunctionIds.has(d.junctionId)) continue;
      const list = byJunction.get(d.junctionId) ?? [];
      list.push(d);
      byJunction.set(d.junctionId, list);
    }

    for (const [junctionId, group] of byJunction) {
      const center = this.junctionCoords.get(junctionId);
      if (!center) continue;
      const offsets = this.fanOutOffsets(group.length);

      group.forEach((device, i) => {
        const [dLat, dLon] = offsets[i];
        const marker = L.marker([center[0] + dLat, center[1] + dLon], {
          icon: this.deviceDivIcon(device.category, device.currentStatus)
        });
        marker.bindPopup(this.devicePopup(device));
        marker.on('popupopen', (e) => {
          const el = (e.popup.getElement() as HTMLElement | null)?.querySelector('.pp-view-device');
          el?.addEventListener('click', () => this.router.navigate(['/network-monitor/devices', device.id]));
        });
        marker.addTo(this.deviceLayer);
        this.deviceMarkers.set(device.id, marker);
      });
    }

    this.syncDeviceLayerVisibility();
  }

  private fanOutOffsets(count: number): [number, number][] {
    if (count <= 1) return [[0, 0]];
    const radiusDeg = 0.00006 + count * 0.0000025;
    const offsets: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      const angle = (2 * Math.PI * i) / count;
      offsets.push([radiusDeg * Math.sin(angle), radiusDeg * Math.cos(angle)]);
    }
    return offsets;
  }

  private deviceColorVar(status: DeviceStatus): string {
    return status === 'UP' ? '--sdnet-up' : status === 'DOWN' ? '--sdnet-down' : '--sdnet-unknown';
  }

  private categoryGlyph(category: string): string {
    switch (category.toUpperCase()) {
      case 'CCTV':
      case 'PTZ':
        return '<rect x="3" y="7" width="12" height="8" rx="1.5"/><circle cx="9" cy="11" r="2.5" fill="#0a1420"/><rect x="15" y="9" width="4" height="4" rx="1"/>';
      case 'ANPR':
        return '<rect x="3" y="7" width="12" height="8" rx="1.5"/><circle cx="9" cy="11" r="2.5" fill="#0a1420"/><rect x="4" y="16" width="10" height="3" rx="0.5"/>';
      case 'PA':
        return '<polygon points="3,9 8,9 13,5 13,17 8,13 3,13"/><path d="M15 8a5 5 0 0 1 0 8" stroke="currentColor" stroke-width="1.5" fill="none"/>';
      case 'ECB':
        return '<circle cx="11" cy="11" r="8"/><rect x="9" y="6" width="4" height="10" rx="1" fill="#0a1420"/>';
      case 'UPS':
        return '<rect x="4" y="6" width="12" height="10" rx="1.5"/><rect x="16" y="9" width="2" height="4"/><polygon points="10,8 8,12 10,12 9,15 13,10 11,10" fill="#0a1420"/>';
      case 'SWITCH':
      case 'ROUTER':
        return '<rect x="3" y="8" width="16" height="7" rx="1"/><path d="M5 8V6m3 2V6m3 2V6m3 2V6m3 2V6" stroke="currentColor" stroke-width="1.5"/>';
      case 'SERVER':
      case 'APPLICATION':
      case 'LINUX':
        return '<rect x="3" y="4" width="16" height="4.5" rx="1"/><rect x="3" y="9.5" width="16" height="4.5" rx="1"/><rect x="3" y="15" width="16" height="4" rx="1"/>';
      case 'STORAGE':
        return '<ellipse cx="11" cy="6" rx="8" ry="2.5"/><path d="M3 6v10c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V6M3 11c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5" stroke="currentColor" stroke-width="1" fill="none"/>';
      default:
        return '<circle cx="11" cy="11" r="7"/>';
    }
  }

  private deviceDivIcon(category: string, status: DeviceStatus): L.DivIcon {
    const color = this.cssVar(this.deviceColorVar(status));
    const html = `<div class="dev-icon" style="background:${color}"><svg viewBox="0 0 22 22" width="14" height="14" fill="#fff" color="#fff">${this.categoryGlyph(category)}</svg></div>`;
    return L.divIcon({ className: '', html, iconSize: [20, 20], iconAnchor: [10, 10] });
  }

  private switchDivIcon(reachable: boolean): L.DivIcon {
    const color = this.cssVar(reachable ? '--sdnet-up' : '--sdnet-down');
    const html = `<div class="dev-icon switch-icon" style="background:${color}"><svg viewBox="0 0 22 22" width="16" height="16" fill="#fff" color="#fff">${this.categoryGlyph('SWITCH')}</svg></div>`;
    return L.divIcon({ className: '', html, iconSize: [22, 22], iconAnchor: [11, 11] });
  }

  private devicePopup(device: Device): string {
    return `
      <div class="pp">
        <div class="pp-head"><span class="pp-id">${this.escapeHtml(device.deviceLabel)}</span>${this.badge(device.currentStatus)}</div>
        <div class="pp-row"><span>Category</span><span>${this.escapeHtml(device.category)}</span></div>
        <div class="pp-row"><span>IP</span><span>${this.escapeHtml(device.ipAddress)}</span></div>
        <div class="pp-row"><span>Junction</span><span>${this.escapeHtml(device.junctionName ?? '—')}</span></div>
        <div class="pp-view-device" style="margin-top:8px;text-decoration:underline;cursor:pointer;">View full details &rarr;</div>
      </div>`;
  }

  private openLinkPopup(id: string): void {
    const link = this.linksById.get(id);
    const layers = this.linkLayers.get(id);
    if (!link || !layers) return;
    layers.main.bindPopup(this.linkPopup(link), { maxWidth: 280 }).openPopup();
  }

  private fitToData(junctions: Junction[]): void {
    const pts = junctions
      .filter((j) => !j.decommissioned && j.hasCoordinates && j.latitude != null && j.longitude != null)
      .map((j) => [j.latitude as number, j.longitude as number] as [number, number]);
    if (pts.length) {
      this.map.fitBounds(L.latLngBounds(pts), { padding: [30, 30] });
    }
  }

  /** Re-fetches fibre links and devices, updating colours/popups in place -- no full re-render. */
  private refreshStatuses(): void {
    this.fibreLinkService.findAll().subscribe((links) => {
      for (const link of links) {
        this.linksById.set(link.id, link);
        const layers = this.linkLayers.get(link.id);
        if (!layers) continue;
        layers.main.setStyle(this.styleFor(link));
        const el = layers.main.getElement();
        if (el) el.classList.toggle('flow-down', this.linkStatus(link) === 'DOWN');
        if (layers.main.isPopupOpen()) {
          layers.main.setPopupContent(this.linkPopup(link));
        }
      }
    });

    this.deviceService.findAll().subscribe((devices) => {
      for (const device of devices) {
        this.devicesById.set(device.id, device);
        const marker = this.deviceMarkers.get(device.id);
        if (!marker) continue;
        marker.setIcon(this.deviceDivIcon(device.category, device.currentStatus));
        if (marker.isPopupOpen()) {
          marker.setPopupContent(this.devicePopup(device));
        }
      }
    });
  }

  /** Reads the live value of a CSS custom property (e.g. '--up') off :root,
   *  so the map never hardcodes a colour that can drift out of sync with
   *  styles.scss (which is exactly what happened before: --down was red
   *  in one place conceptually but the map itself painted DOWN links pure
   *  black, hardcoded here, ignoring the variable entirely). */
  private cssVar(name: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  private linkStatus(link: FibreLink): DeviceStatus {
    return link.effectiveStatus || link.currentStatus;
  }

  private timeAgo(iso: string | null): string {
    return iso ? new Date(iso).toLocaleString() : '';
  }

  private styleFor(link: FibreLink): L.PolylineOptions {
    const status = this.linkStatus(link);
    const isTrunk = link.tier === 'MAIN_TRUNK';
    if (status === 'DOWN') return { color: this.cssVar('--sdnet-down'), weight: isTrunk ? 6 : 5, opacity: 1, dashArray: '6 6' };
    if (status === 'UNKNOWN') return { color: this.cssVar('--sdnet-unknown'), weight: isTrunk ? 4 : 3, opacity: 0.8, dashArray: '2 7' };
    if (link.topologyRole === 'CROSS_LINK') return { color: this.cssVar('--sdnet-accent'), weight: 4, opacity: 0.95 };
    return { color: isTrunk ? this.cssVar('--sdnet-accent') : this.cssVar('--sdnet-up'), weight: isTrunk ? 5 : 4, opacity: 0.95 };
  }

  private badge(status: DeviceStatus): string {
    return `<span class="sdnet-badge sdnet-badge-${status.toLowerCase()}">${status}</span>`;
  }

  private linkPopup(link: FibreLink): string {
    const from = link.fromJunctionName ?? 'unresolved';
    const to = link.toJunctionName ?? 'unresolved';
    const lengthLabel = link.lengthMeters
      ? (link.lengthMeters >= 1000 ? (link.lengthMeters / 1000).toFixed(2) + ' km' : Math.round(link.lengthMeters) + ' m')
      : '—';
    return `
      <div class="pp">
        <div class="pp-head"><span class="pp-id">${this.escapeHtml(link.id)}</span>${this.badge(this.linkStatus(link))}</div>
        ${link.displayName && link.displayName !== link.id ? `<div class="pp-name">${this.escapeHtml(link.displayName)}</div>` : ''}
        <div class="pp-row"><span>From</span><span>${this.escapeHtml(from)}${!link.fromConfident ? ' <i>approx</i>' : ''}</span></div>
        <div class="pp-row"><span>To</span><span>${this.escapeHtml(to)}${!link.toConfident ? ' <i>approx</i>' : ''}</span></div>
        <div class="pp-row"><span>Length</span><span>${lengthLabel}</span></div>
        <div class="pp-row"><span>Source</span><span>${link.diagramConfirmed ? 'diagram-confirmed' : (link.confirmed ? 'geometry-confirmed' : 'needs verification')}</span></div>
        <div class="pp-row"><span>Topology</span><span>${this.escapeHtml(link.topologyRole || link.tier || 'Unclassified')}</span></div>
        ${link.fieldVerifiedStatus ? `
          <div class="pp-row"><span>Field-verified</span><span>${link.fieldVerifiedStatus} &middot; ${this.timeAgo(link.fieldVerifiedAt ?? null)}</span></div>
          <div class="pp-row verification-notes">${this.escapeHtml(link.fieldVerifiedNotes ?? '')}</div>
        ` : ''}
        <div class="pp-field-actions">
          <label>Verification reason<textarea class="pp-notes-input" rows="2" placeholder="Add a short reason"></textarea></label>
          <div class="pp-field-buttons">
            <button type="button" data-action="mark-down">Mark Down</button>
            <button type="button" data-action="mark-up">Mark Up</button>
            ${link.fieldVerifiedStatus ? '<button type="button" data-action="clear-override">Clear override</button>' : ''}
          </div>
        </div>
      </div>`;
  }

  private wireLinkPopupActions(popupElement: HTMLElement | null, linkId: string): void {
    if (!popupElement || (popupElement as HTMLElement & { sdnetWired?: boolean }).sdnetWired) return;
    (popupElement as HTMLElement & { sdnetWired?: boolean }).sdnetWired = true;
    popupElement.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const action = target.closest<HTMLButtonElement>('[data-action]')?.dataset['action'];
      if (!action) return;

      const notes = popupElement.querySelector<HTMLTextAreaElement>('.pp-notes-input')?.value.trim() || '';
      const buttons = popupElement.querySelectorAll<HTMLButtonElement>('.pp-field-buttons button');
      const setBusy = (busy: boolean) => buttons.forEach((button) => button.disabled = busy);
      const applyResult = (updated: FibreLink) => {
        this.linksById.set(linkId, updated);
        const layers = this.linkLayers.get(linkId);
        if (!layers) return;
        layers.main.setStyle(this.styleFor(updated));
        layers.main.getElement()?.classList.toggle('flow-down', this.linkStatus(updated) === 'DOWN');
        layers.main.setPopupContent(this.linkPopup(updated));
      };

      if (action === 'clear-override') {
        setBusy(true);
        this.fibreLinkService.clearFieldStatus(linkId).subscribe({
          next: applyResult,
          error: () => setBusy(false)
        });
        return;
      }

      if (!notes) {
        alert('Add a short reason before changing the field-verified status.');
        return;
      }
      setBusy(true);
      this.fibreLinkService.updateFieldStatus(linkId, action === 'mark-down' ? 'DOWN' : 'UP', notes).subscribe({
        next: applyResult,
        error: () => setBusy(false)
      });
    });
  }

  private escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character] || character);
  }

  private junctionPopup(j: Junction): string {
    return `
      <div class="pp">
        <div class="pp-head"><span class="pp-id">${this.escapeHtml(j.name)}</span><span class="sdnet-badge">${j.type}</span></div>
        <div class="pp-row"><span>Devices</span><span>${j.deviceCount}</span></div>
        <div class="pp-row"><span>Fibre segments</span><span>${j.linkCount}</span></div>
        ${j.reachable == null ? '' : `<div class="pp-row"><span>Network</span><span>${j.reachable ? 'Reachable' : 'Cut off — no live path to ICCC'}</span></div>`}
      </div>`;
  }
}
