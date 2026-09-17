import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SdnetDeviceService } from '../../services/device.service';
import { SdnetReportService } from '../../services/report.service';
import { Device } from '../../models/device.model';
import { UptimeSummary } from '../../models/uptime-summary.model';
import { DowntimeIncident } from '../../models/report.model';

type RangePreset = '24h' | '7d' | '30d';

@Component({
  selector: 'app-sdnet-device-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.scss'
})
export class DeviceDetailComponent implements OnInit {
  device: Device | null = null;
  uptime: UptimeSummary | null = null;
  incidents: DowntimeIncident[] = [];

  loading = true;
  loadError = false;
  rangePreset: RangePreset = '7d';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: SdnetDeviceService,
    private reportService: SdnetReportService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.loadError = true;
      this.loading = false;
      return;
    }
    this.deviceService.findById(id).subscribe({
      next: (device) => {
        this.device = device;
        this.loading = false;
        this.loadRangeData();
      },
      error: () => {
        this.loading = false;
        this.loadError = true;
      },
    });
  }

  setRange(preset: RangePreset): void {
    this.rangePreset = preset;
    this.loadRangeData();
  }

  private rangeStart(): Date {
    const now = new Date();
    const hours = this.rangePreset === '24h' ? 24 : this.rangePreset === '7d' ? 24 * 7 : 24 * 30;
    return new Date(now.getTime() - hours * 3600 * 1000);
  }

  private loadRangeData(): void {
    if (!this.device) return;
    const from = this.rangeStart();
    const to = new Date();

    this.deviceService.uptime(this.device.id, from, to).subscribe((summary) => (this.uptime = summary));
    this.reportService.downtime(from, to, { deviceId: this.device.id }).subscribe((incidents) => (this.incidents = incidents));
  }

  downloadPdf(): void {
    if (!this.device) return;
    this.reportService.downloadPdf(this.rangeStart(), new Date(), { deviceId: this.device.id }).subscribe((blob) => {
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `${this.device?.deviceLabel ?? 'device'}-downtime.pdf`;
      anchor.click();
      URL.revokeObjectURL(url);
    });
  }

  viewOnMap(): void {
    if (!this.device?.junctionId) return;
    this.router.navigate(['/network-monitor/dashboard'], { queryParams: { junction: this.device.junctionId } });
  }

  formatDuration(totalSeconds: number): string {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  }
}
