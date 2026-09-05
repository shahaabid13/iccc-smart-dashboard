import { Component, OnInit, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Channel } from '../../../../shared/models';
import { ChannelService } from '../../../../shared/services/channel.service';
import { environment } from '../../../../../environments/environment';

declare var L: any; // Leaflet library

@Component({
  selector: 'app-channels-map',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './channels-map.component.html',
  styleUrl: './channels-map.component.scss'
})
export class ChannelsMapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  loading = signal(false);
  channels = signal<Channel[]>([]);
  map: any = null;
  markers: any[] = [];

  cameraTypeColors: Record<string, string> = {
    ANPR: '#ff6b6b',
    Evidence: '#4ecdc4',
    GENERAL: '#95e1d3'
  };

  constructor(
    private channelService: ChannelService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadChannels();
  }

  ngAfterViewInit(): void {
    if (this.mapContainer) {
      this.initializeMap();
    }
  }

  private loadChannels(): void {
    this.loading.set(true);
    this.channelService.getChannels().subscribe({
      next: (channelList: Channel[]) => {
        const withCoords = (channelList ?? []).filter(
          (ch: Channel) => ch.latitude && ch.longitude
        );
        this.channels.set(withCoords);
        this.plotChannelsOnMap();
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load channels for map:', error);
        this.snackBar.open('Failed to load channels', 'Close', { duration: 5000 });
        this.channels.set([]);
        this.loading.set(false);
      }
    });
  }

  private initializeMap(): void {
    const config = environment.trafficDashboard.map;

    this.map = L.map(this.mapContainer.nativeElement).setView(config.defaultCenter, config.defaultZoom);

    L.tileLayer(config.tileUrl, {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);
  }

  private plotChannelsOnMap(): void {
    if (!this.map) return;

    // Clear existing markers
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];

    this.channels().forEach((channel) => {
      if (channel.latitude && channel.longitude) {
        const color = this.cameraTypeColors[channel.type] || '#999';

        // Create custom icon with color
        const icon = L.divIcon({
          html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">📷</div>`,
          iconSize: [30, 30],
          className: 'custom-marker'
        });

        const marker = L.marker([channel.latitude, channel.longitude], { icon }).addTo(this.map);

        // Add popup on click
        marker.bindPopup(`
          <div class="marker-popup">
            <strong>${channel.name}</strong><br/>
            Type: ${channel.type}<br/>
            Location: ${channel.location}<br/>
            Status: ${channel.status || 'UNKNOWN'}<br/>
          </div>
        `);

        this.markers.push(marker);
      }
    });

    if (this.channels().length > 0) {
      this.fitMapToMarkers();
    }
  }

  private fitMapToMarkers(): void {
    if (this.markers.length === 0) return;

    const group = L.featureGroup(this.markers);
    this.map.fitBounds(group.getBounds(), { padding: [50, 50] });
  }

  resetMapView(): void {
    if (this.map) {
      const config = environment.trafficDashboard.map;
      this.map.setView(config.defaultCenter, config.defaultZoom);
    }
  }
}