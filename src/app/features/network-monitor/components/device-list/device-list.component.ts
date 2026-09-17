import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SdnetDeviceService } from '../../services/device.service';
import { Device } from '../../models/device.model';

type StatusFilter = 'ALL' | 'UP' | 'DOWN' | 'UNKNOWN';

@Component({
  selector: 'app-sdnet-device-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DeviceListComponent implements OnInit {
  allDevices: Device[] = [];
  filtered: Device[] = [];
  categories: string[] = [];
  searchTerm = '';
  categoryFilter = 'ALL';
  statusFilter: StatusFilter = 'ALL';
  loading = true;
  loadError = false;

  constructor(private deviceService: SdnetDeviceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('DeviceListComponent ngOnInit RUNNING');
    this.deviceService.findAll().subscribe({
      next: (devices) => {
        this.allDevices = devices;
        this.categories = Array.from(new Set(devices.map((d) => d.category))).sort();
        this.applyFilters();
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.loadError = true;
        this.cdr.markForCheck();
      },
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filtered = this.allDevices.filter((d) => {
      if (this.categoryFilter !== 'ALL' && d.category !== this.categoryFilter) return false;
      if (this.statusFilter !== 'ALL' && d.currentStatus !== this.statusFilter) return false;
      if (!term) return true;
      const haystack = `${d.deviceLabel} ${d.ipAddress} ${d.junctionName ?? ''} ${d.category}`.toLowerCase();
      return haystack.includes(term);
    });
  }

  statusCounts() {
    return {
      up: this.allDevices.filter((d) => d.currentStatus === 'UP').length,
      down: this.allDevices.filter((d) => d.currentStatus === 'DOWN').length,
      unknown: this.allDevices.filter((d) => d.currentStatus === 'UNKNOWN').length,
    };
  }

  setStatusFilter(status: StatusFilter): void {
    this.statusFilter = status;
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.categoryFilter = 'ALL';
    this.statusFilter = 'ALL';
    this.applyFilters();
  }
}