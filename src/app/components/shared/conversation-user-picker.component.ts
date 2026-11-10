import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { CimsService } from '../../services/cims.service';

interface DirectoryUser {
  id: number;
  username: string;
  fullName?: string;
  name?: string;
  role?: string;
}

@Component({
  selector: 'app-conversation-user-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, MatChipsModule],
  template: `
    <section class="user-picker" aria-label="Select conversation participants">
      <ng-container *ngIf="loadDirectory; else directoryUnavailable">
        <label for="conversation-user-search">{{ label }}</label>
        <input id="conversation-user-search" type="search" [(ngModel)]="query"
          [ngModelOptions]="{standalone:true}" (ngModelChange)="filterUsers()"
          placeholder="@Start typing a name or username" autocomplete="off">
        <div class="user-results" *ngIf="filteredUsers.length" role="listbox" aria-label="Users">
          <button type="button" role="option" *ngFor="let user of filteredUsers"
            [attr.aria-selected]="isSelected(user)" (click)="toggle(user)">
            <span class="user-avatar" aria-hidden="true">{{ initials(user.fullName || user.name || user.username) }}</span>
            <span class="user-name">{{ user.fullName || user.name || user.username }}
              <small>@{{ user.username }}<span *ngIf="user.role"> · {{ user.role }}</span></small>
            </span>
            <span class="select-mark">{{ isSelected(user) ? 'Selected' : 'Select' }}</span>
          </button>
        </div>
        <p *ngIf="loaded && !filteredUsers.length" class="picker-note">No matching users.</p>
      </ng-container>
      <ng-template #directoryUnavailable>
        <p class="picker-note">{{ unavailableMessage }}</p>
      </ng-template>
      <p *ngIf="loadError" class="picker-error" role="alert">{{ loadError }}</p>
      <mat-chip-set *ngIf="selected.length" aria-label="Selected conversation participants">
        <mat-chip *ngFor="let user of selected" (removed)="remove(user)">
          @{{ user.username }}
          <button matChipRemove [attr.aria-label]="'Remove @' + user.username">×</button>
        </mat-chip>
      </mat-chip-set>
      <p *ngIf="loadDirectory" class="picker-note">Selected people will be tagged when the item is created.</p>
    </section>
  `,
  styles: [`
    :host { display:block; }
    .user-picker label { display:block; margin-bottom:6px; font-weight:600; }
    .user-picker input { width:100%; min-height:42px; padding:8px 10px; border:1px solid #64748b; border-radius:7px; color:#172033; }
    .user-picker input:focus-visible { outline:3px solid #93c5fd; outline-offset:1px; border-color:#1d4ed8; }
    .user-results { max-height:220px; overflow:auto; margin:6px 0 10px; border:1px solid #dbe3ee; border-radius:8px; }
    .user-results button { display:flex; align-items:center; gap:9px; width:100%; min-height:48px; padding:7px 10px; border:0; border-bottom:1px solid #e2e8f0; background:#fff; color:#172033; text-align:left; cursor:pointer; }
    .user-results button:hover,.user-results button[aria-selected="true"] { background:#eff6ff; }
    .user-avatar { display:grid; place-items:center; width:30px; height:30px; border-radius:50%; background:#dbeafe; color:#1e40af; font-weight:700; font-size:11px; }
    .user-name { display:grid; }
    .user-name small,.picker-note { color:#475569; font-size:12px; }
    .select-mark { margin-left:auto; color:#1d4ed8; font-size:12px; }
    .picker-error { color:#991b1b; }
  `]
})
export class ConversationUserPickerComponent implements OnInit {
  @Input() label = 'Tag people';
  @Input() loadDirectory = true;
  @Input() unavailableMessage = 'Create the item first, then tag eligible people from its Conversation tab.';
  @Output() selectedIdsChange = new EventEmitter<number[]>();
  query = '';
  users: DirectoryUser[] = [];
  filteredUsers: DirectoryUser[] = [];
  selected: DirectoryUser[] = [];
  loaded = false;
  loadError = '';

  constructor(private cimsService: CimsService) {}

  ngOnInit(): void {
    if (!this.loadDirectory) return;
    this.cimsService.getUsers().subscribe({
      next: response => {
        const rows: DirectoryUser[] = Array.isArray(response) ? response : [];
        this.users = rows.filter((user: DirectoryUser) => Number.isSafeInteger(Number(user.id)) && !!user.username)
          .map((user: DirectoryUser) => ({ ...user, id: Number(user.id) }))
          .sort((a: DirectoryUser, b: DirectoryUser) =>
            (a.fullName || a.name || a.username).localeCompare(b.fullName || b.name || b.username)
          );
        this.filterUsers();
        this.loaded = true;
      },
      error: () => {
        this.loaded = true;
        this.loadError = 'Could not load users. You can still create the item and tag people in its conversation.';
      }
    });
  }

  filterUsers(): void {
    const term = this.query.trim().replace(/^@/, '').toLocaleLowerCase();
    this.filteredUsers = this.users.filter(user =>
      !term ||
      user.username.toLocaleLowerCase().includes(term) ||
      (user.fullName || user.name || '').toLocaleLowerCase().includes(term)
    );
  }

  isSelected(user: DirectoryUser): boolean {
    return this.selected.some(item => item.id === user.id);
  }

  toggle(user: DirectoryUser): void {
    this.selected = this.isSelected(user)
      ? this.selected.filter(item => item.id !== user.id)
      : [...this.selected, user];
    this.selectedIdsChange.emit(this.selected.map(item => item.id));
  }

  remove(user: DirectoryUser): void {
    this.selected = this.selected.filter(item => item.id !== user.id);
    this.selectedIdsChange.emit(this.selected.map(item => item.id));
  }

  clearSelection(): void {
    this.selected = [];
    this.query = '';
    this.filterUsers();
    this.selectedIdsChange.emit([]);
  }

  initials(value: string): string {
    return value.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0].toUpperCase()).join('');
  }
}
