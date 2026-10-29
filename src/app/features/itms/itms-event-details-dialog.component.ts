import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ItmsEvent } from './itms.service';

@Component({
  selector: 'app-itms-event-details-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './itms-event-details-dialog.component.html',
  styleUrl: './itms-event-details-dialog.component.scss'
})
export class ItmsEventDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) readonly data: ItmsEvent) {}

  get fields(): { label: string; value: string | number | null }[] {
    return [
      { label: 'ID', value: this.data.id },
      { label: 'Serial number', value: this.data.slNo },
      { label: 'Junction', value: this.data.junction },
      { label: 'Camera name', value: this.data.cameraName },
      { label: 'Event type', value: this.data.eventType },
      { label: 'Event time', value: this.data.eventTime },
      { label: 'Vehicle number', value: this.data.vehicleNumber },
      { label: 'Speed (km/h)', value: this.data.speedKmph },
      { label: 'Status', value: this.data.status },
      { label: 'Priority', value: this.data.priority },
      { label: 'Message', value: this.data.message },
      { label: 'Action taken', value: this.data.actionTaken },
      { label: 'Acknowledged by', value: this.data.acknowledgedBy },
      { label: 'Vehicle color', value: this.data.vehicleColor },
      { label: 'Snapshot path', value: this.data.snapPath }
    ];
  }
}
