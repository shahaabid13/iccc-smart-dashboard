import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Channel, Server, ChannelFilterRequest } from '../../../../shared/models';
import { ChannelService } from '../../../../shared/services/channel.service';
import { ServerService } from '../../../../shared/services/server.service';

@Component({
  selector: 'app-channels-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  templateUrl: './channels-list.component.html',
  styleUrl: './channels-list.component.scss'
})
export class ChannelsListComponent implements OnInit {
  loading = signal(false);
  channels = signal<Channel[]>([]);
  servers = signal<Server[]>([]);
  filteredChannels = signal<Channel[]>([]);

  displayedColumns = ['name', 'type', 'location', 'status', 'actions'];
  pageSize = 20;
  pageIndex = 0;

  cameraTypes = ['ANPR', 'Evidence', 'GENERAL'];

  filterForm: any;

  constructor(
    private fb: FormBuilder,
    private channelService: ChannelService,
    private serverService: ServerService,
    private snackBar: MatSnackBar
  ) {
    this.filterForm = this.fb.group({
      serverId: [''],
      type: [''],
      location: ['']
    });

    effect(() => {
      this.applyFilters();
    });
  }

  ngOnInit(): void {
    this.loadServers();
    this.loadChannels();
  }

  private loadServers(): void {
    this.loading.set(true);
    this.serverService.getServers().subscribe({
      next: (serverList) => {
        this.servers.set(serverList ?? []);
        console.log('Loaded servers:', serverList);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load servers from API:', error);
        this.servers.set([]);
        this.loading.set(false);
      }
    });
  }

  private loadChannels(): void {
    this.loading.set(true);

    const filters: ChannelFilterRequest = {
      serverId: this.filterForm.value.serverId || undefined,
      type: (this.filterForm.value.type as any) || undefined,
      location: this.filterForm.value.location || undefined
    };

    this.channelService.getChannels(filters).subscribe({
      next: (channelList) => {
        this.channels.set(channelList ?? []);
        console.log('Loaded channels:', channelList);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load channels from API:', error);
        this.channels.set([]);
        this.loading.set(false);
      }
    });
  }

  private applyFilters(): void {
    const channels = this.channels();
    const searchTerm = this.filterForm.value.location?.toLowerCase() || '';

    const filtered = channels.filter((ch) => {
      const typeMatch =
        !this.filterForm.value.type || ch.type === this.filterForm.value.type;
      const locationMatch =
        !searchTerm ||
        ch.location.toLowerCase().includes(searchTerm) ||
        ch.name.toLowerCase().includes(searchTerm);

      return typeMatch && locationMatch;
    });

    this.filteredChannels.set(filtered);
  }

  onFilterChange(): void {
    this.loadChannels();
  }

  getStatusColor(status?: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'primary';
      case 'INACTIVE':
        return 'accent';
      case 'OFFLINE':
        return 'warn';
      default:
        return '';
    }
  }

  viewChannelDetails(channel: Channel): void {
    this.snackBar.open(`Viewing channel: ${channel.name}`, 'Close', { duration: 3000 });
    // TODO: Navigate to channel details view
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedChannels(): Channel[] {
    const start = this.pageIndex * this.pageSize;
    return this.filteredChannels().slice(start, start + this.pageSize);
  }
}