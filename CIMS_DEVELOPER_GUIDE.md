# CIMS Quick Start Guide for Developers

## File Structure Overview

```
src/
├── app/
│   ├── models/
│   │   └── cims.models.ts              # All CIMS data types
│   │
│   ├── services/
│   │   └── cims.service.ts             # API integration
│   │
│   ├── guards/
│   │   └── cims.guards.ts              # Role-based route protection
│   │
│   ├── components/admin/
│   │   ├── cims-support-engineer-create-ticket.component.ts
│   │   ├── cims-my-tickets.component.ts
│   │   ├── cims-coordinator-queue.component.ts
│   │   ├── cims-reviewer-queue.component.ts
│   │   ├── cims-admin-dashboard.component.ts
│   │   ├── cims-all-tickets.component.ts
│   │   └── cims-ticket-detail.component.ts
│   │
│   ├── app.routes.ts                   # Updated with CIMS routes
│   └── components/shared/header/
│       └── header.component.ts         # Updated with CIMS nav
```

## Folder Paths

| Component | Path |
|-----------|------|
| Models | `src/app/models/cims.models.ts` |
| Service | `src/app/services/cims.service.ts` |
| Guards | `src/app/guards/cims.guards.ts` |
| Support Engineer | `src/app/components/admin/cims-*.component.ts` |
| Coordinator | `src/app/components/admin/cims-coordinator-queue.component.ts` |
| Reviewer | `src/app/components/admin/cims-reviewer-queue.component.ts` |
| Admin | `src/app/components/admin/cims-admin-*.component.ts` |

## Quick API Usage Examples

### 1. Create a Ticket (Support Engineer)
```typescript
import { CimsService } from '../services/cims.service';
import { CreateTicketRequest } from '../models/cims.models';

constructor(private cimsService: CimsService) {}

createTicket() {
  const payload: CreateTicketRequest = {
    incidentTypeId: 1,
    locationId: 1,
    approachRoadId: 1,
    deviceTypeId: 1,
    fieldPersonId: 1,
    priority: 'HIGH',
    description: 'Camera not recording'
  };
  
  this.cimsService.createTicket(payload).subscribe(
    (response) => console.log('Ticket created:', response),
    (error) => console.error('Error:', error)
  );
}
```

### 2. Get My Tickets (Support Engineer)
```typescript
this.cimsService.getMyTickets(0, 10).subscribe(
  (response) => {
    console.log('Tickets:', response.content);
    console.log('Total:', response.totalElements);
  }
);
```

### 3. Acknowledge Ticket (Coordinator)
```typescript
this.cimsService.acknowledgeTicket(ticketId, 'Field person confirmed').subscribe(
  () => console.log('Acknowledged'),
  (error) => this.showError(error)
);
```

### 4. Resolve Ticket (Reviewer)
```typescript
this.cimsService.resolveTicket(ticketId, 'Issue fixed, camera online').subscribe(
  () => console.log('Resolved'),
  (error) => this.showError(error)
);
```

### 5. Get Dashboard Stats (Admin)
```typescript
this.cimsService.getDashboardStats().subscribe(
  (stats) => {
    console.log('Total tickets:', stats.totalTickets);
    console.log('By priority:', stats.byPriority);
  }
);
```

## Component Import Examples

### Using Support Engineer Component
```typescript
import { CimsCreateTicketComponent } from './cims-support-engineer-create-ticket.component';
import { CimsMyTicketsComponent } from './cims-my-tickets.component';
```

### Using Coordinator Component
```typescript
import { CimsCoordinatorQueueComponent } from './cims-coordinator-queue.component';
```

### Using Reviewer Component
```typescript
import { CimsReviewerQueueComponent } from './cims-reviewer-queue.component';
```

### Using Admin Components
```typescript
import { CimsAdminDashboardComponent } from './cims-admin-dashboard.component';
import { CimsAllTicketsComponent } from './cims-all-tickets.component';
```

## Route Navigation Patterns

### Navigate to Support Engineer Screens
```typescript
this.router.navigate(['/cims/support-engineer/my-tickets']);
this.router.navigate(['/cims/support-engineer/create-ticket']);
this.router.navigate(['/cims/support-engineer/tickets', ticketId]);
```

### Navigate to Coordinator Screens
```typescript
this.router.navigate(['/cims/coordinator/queue']);
this.router.navigate(['/cims/coordinator/tickets', ticketId]);
```

### Navigate to Reviewer Screens
```typescript
this.router.navigate(['/cims/reviewer/queue']);
this.router.navigate(['/cims/reviewer/tickets', ticketId]);
```

### Navigate to Admin Screens
```typescript
this.router.navigate(['/cims/admin/dashboard']);
this.router.navigate(['/cims/admin/all-tickets']);
this.router.navigate(['/cims/admin/tickets', ticketId]);
```

## Adding New CIMS Feature

### Step 1: Define Models (cims.models.ts)
```typescript
export interface NewFeature {
  id: number;
  name: string;
  // ... fields
}
```

### Step 2: Add Service Method (cims.service.ts)
```typescript
getNewFeature(): Observable<NewFeature[]> {
  return this.http.get<NewFeature[]>(`${this.apiUrl}/new-endpoint`);
}
```

### Step 3: Create Component
```typescript
import { Component, OnInit } from '@angular/core';
import { CimsService } from '../services/cims.service';
import { NewFeature } from '../models/cims.models';

@Component({
  selector: 'app-cims-feature',
  standalone: true,
  imports: [/* Material modules */],
  template: `<!-- template -->`
})
export class CimsFeatureComponent implements OnInit {
  features: NewFeature[] = [];
  
  constructor(private cimsService: CimsService) {}
  
  ngOnInit() {
    this.loadFeatures();
  }
  
  loadFeatures() {
    this.cimsService.getNewFeature().subscribe(
      (data) => this.features = data
    );
  }
}
```

### Step 4: Add Route (app.routes.ts)
```typescript
{
  path: 'cims/feature',
  canActivate: [CimsAdminGuard],
  loadComponent: () => import('./components/admin/cims-feature.component')
    .then(m => m.CimsFeatureComponent)
}
```

### Step 5: Update Navigation (header.component.ts)
```typescript
<!-- Add to template -->
<a routerLink="/cims/feature" class="dropdown-item">
  <span class="item-icon">🆕</span>
  <span>New Feature</span>
</a>
```

## Material UI Commonly Used

```typescript
// Form Controls
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Data Display
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';

// Layout
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

// Actions
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Feedback
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Dates
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
```

## Role-Based Access Quick Reference

| Role | Endpoints Accessible |
|------|---------------------|
| SUPPORT_ENGINEER | POST create ticket, GET my tickets |
| COORDINATOR | GET coordinator queue, PUT acknowledge, PUT assign-reviewer |
| REVIEWER | GET review queue, PUT resolve/pending/reopen/reject |
| ADMIN | GET all tickets, GET dashboard stats + all other endpoints |

## Authentication in CIMS

```typescript
// Role stored in localStorage
const role = localStorage.getItem('role'); // 'SUPPORT_ENGINEER', 'COORDINATOR', 'REVIEWER', 'ADMIN'
const token = localStorage.getItem('token'); // JWT token
const username = localStorage.getItem('username');

// Check role in component
if (role === 'COORDINATOR') {
  // Show coordinator features
}
```

## Error Handling Pattern

```typescript
loadData() {
  this.isLoading = true;
  this.service.getData().subscribe({
    next: (data) => {
      this.items = data;
      this.isLoading = false;
    },
    error: (err) => {
      const errorMsg = err.error?.message || 'Failed to load data';
      this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
      this.isLoading = false;
    }
  });
}
```

## Testing a New Feature

### 1. Test with Postman
- Use provided Postman collection
- Set JWT token in collection variables
- Test endpoint before integrating

### 2. Test in Component
```typescript
// In component ngOnInit
console.log('Testing CIMS feature...');
this.cimsService.getFeature().subscribe(
  (response) => console.log('Success:', response),
  (error) => console.error('Error:', error)
);
```

### 3. Test Role-Based Access
- Login as SUPPORT_ENGINEER, test access
- Login as COORDINATOR, test access
- Login as ADMIN, test all access
- Try accessing with unauthorized role

## Deployment Checklist

- [ ] All CIMS components standalone
- [ ] All routes protected with guards
- [ ] API URLs configured correctly
- [ ] JWT token handling verified
- [ ] Error messages user-friendly
- [ ] Responsive design tested on mobile
- [ ] Pagination tested with large datasets
- [ ] Charts render correctly
- [ ] Form validation working
- [ ] All role-based features tested

## Common Commands

```bash
# Start dev server with proxy
npm start

# Build for production
npm run build

# Run tests
npm test

# Serve production build
npm run serve
```

## Helpful Links

- Material Design: https://material.angular.io/
- Angular Docs: https://angular.io/docs
- RxJS: https://rxjs.dev/
- TypeScript: https://www.typescriptlang.org/
