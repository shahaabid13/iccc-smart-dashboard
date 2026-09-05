# Traffic Dashboard - Components Overview

## Authentication & Layout Components

### LoginComponent
**Path**: `src/app/features/auth/components/login/`
**Purpose**: User authentication form
**Key Features**:
- Reactive form with email/password validation
- Material design form fields
- Loading spinner during submission
- Error toast notifications
- Auto-redirect on successful login

**Usage**:
```typescript
import { LoginComponent } from './features/auth/components/login/login.component';

// Already included in auth.routes.ts
```

### DashboardLayoutComponent
**Path**: `src/app/core/layout/dashboard-layout/`
**Purpose**: Main application shell with sidebar navigation
**Key Features**:
- Material toolbar with app title
- Responsive sidebar (hidden on mobile)
- User menu with logout
- Navigation items for Channels and Events
- Active route highlighting

**Usage**:
```typescript
// Automatically loaded when accessing /traffic-dashboard/dashboard/*
```

---

## Channels Feature Components

### ChannelsListComponent
**Path**: `src/app/features/channels/components/channels-list/`
**Purpose**: Display channels in table format with filters
**Key Features**:
- Material table with sortable columns
- Dynamic filters:
  - Server dropdown (populated from API)
  - Camera type filter (ANPR/Evidence/GENERAL)
  - Location search box
- Pagination (20 items per page)
- Status chips with color coding
- Click to view details
- Responsive design

**Inputs**: None
**Outputs**: None
**Services Used**: `ChannelService`, `ServerService`

**Example Usage**:
```html
<app-channels-list></app-channels-list>
```

**API Calls**:
- `GET /api/servers` - Load server list
- `GET /api/channels?serverId=&type=&location=` - Load/filter channels

---

### ChannelsMapComponent
**Path**: `src/app/features/channels/components/channels-map/`
**Purpose**: Display channels on interactive Leaflet map
**Key Features**:
- Leaflet map with OpenStreetMap tiles
- Color-coded markers by camera type:
  - 🔴 ANPR (Red)
  - 🔵 Evidence (Teal)
  - 🟢 GENERAL (Green)
- Popup with channel details on marker click
- Auto-zoom to fit all markers
- Reset view button
- Legend showing camera types
- Responsive map container

**Inputs**: None
**Outputs**: None
**Services Used**: `ChannelService`

**Example Usage**:
```html
<app-channels-map></app-channels-map>
```

**Dependencies**:
- Leaflet library (already in package.json)

---

## Events Feature Components

### EventSearchComponent
**Path**: `src/app/features/events/components/event-search/`
**Purpose**: Search form for events/detections
**Key Features**:
- Reactive form with validation:
  - Server selection (required)
  - Channel dropdown (auto-populated)
  - Date range picker
  - Optional license plate input
  - Optional application ID input
- Date range validation:
  - End date must be after start date
  - Max 90-day range (configurable)
- "Get Total Count" button (independent API call)
- "Search Events" button
- Result count chip display
- Form field tooltips

**Inputs**: None
**Outputs**: None
**Services Used**: `EventService`, `ServerService`, `ChannelService`

**Example Usage**:
```html
<app-event-search></app-event-search>
```

**API Calls**:
- `GET /api/servers` - Load servers
- `GET /api/channels?serverId=` - Load channels for selected server
- `POST /api/events/count` - Get total event count
- `POST /api/events/search` - Search events (TODO: implement)

---

### EventResultsComponent
**Path**: `src/app/features/events/components/event-results/`
**Purpose**: Display event search results in table
**Key Features**:
- Material table displaying:
  - Timestamp (formatted to local timezone)
  - Channel name
  - License plate (highlighted if available)
  - Confidence percentage with color coding
  - Event thumbnail image (clickable)
- Actions:
  - View details button
  - Download image button (if image available)
- Server-side pagination (default 50 items/page)
- Responsive design
- Loading spinner
- "No data" message when empty

**Inputs**:
```typescript
@Input() events: Event[] = [];
@Input() totalEvents: number = 0;
@Input() loading = signal(false);
```

**Example Usage**:
```html
<app-event-results 
  [events]="events"
  [totalEvents]="totalCount"
  [loading]="isLoading"
></app-event-results>
```

**Features**:
- Client-side pagination (receives pre-loaded events)
- Timestamp formatting with EventService
- Confidence color coding
- Image download functionality
- Detail view navigation (TODO)

---

## Services

### AuthService
**Path**: `src/app/features/auth/services/auth.service.ts`

**Methods**:
```typescript
// Authentication
login(username: string, password: string): Observable<ApiResponse<LoginResponse>>
logout(): void

// User state
getCurrentUser(): AuthUser | null
isAuthenticated(): boolean
getToken(): string | null

// Private helpers
private setToken(token: string): void
private setCurrentUser(user: AuthUser): void
private loadStoredUser(): void
private clearAuth(): void
```

**Observable**:
```typescript
currentUser$: Observable<AuthUser | null>
```

---

### ChannelService
**Path**: `src/app/shared/services/channel.service.ts`

**Methods**:
```typescript
// Main API methods
getChannels(filters?: ChannelFilterRequest): Observable<ApiResponse<ChannelResponse>>
getChannelsByServer(serverId: string): Observable<ApiResponse<ChannelResponse>>

// Local operations
getChannelsFromCache(): Channel[]
filterChannelsByType(type: string): Channel[]
searchChannels(searchTerm: string): Channel[]
```

**Observable**:
```typescript
channels$: Observable<Channel[]>
```

---

### EventService
**Path**: `src/app/shared/services/event.service.ts`

**Methods**:
```typescript
// Main API methods
searchEvents(request: EventSearchRequest): Observable<ApiResponse<EventSearchResponse>>
countEvents(request: EventCountRequest): Observable<ApiResponse<EventCountResponse>>

// Date utilities
dateToEpochMs(date: Date): number
epochMsToDate(ms: number): Date
formatEventTimestamp(timestamp: number, locale?: string): string

// Validation
isValidDateRange(
  startDate: Date,
  endDate: Date,
  maxDaysRange?: number
): { valid: boolean; error?: string }
```

---

### ServerService
**Path**: `src/app/shared/services/server.service.ts`

**Methods**:
```typescript
getServers(): Observable<ApiResponse<Server[]>>
getServerById(serverId: string): Observable<ApiResponse<Server>>
```

---

### AdminService
**Path**: `src/app/shared/services/admin.service.ts`

**Methods**:
```typescript
syncChannels(serverId?: string): Observable<ApiResponse<SyncChannelsResponse>>
```

---

## Routing Structure

### Auth Routes (`features/auth/auth.routes.ts`)
```
auth/login               → LoginComponent
auth/                    → redirect to login
```

### Channels Routes (`features/channels/channels.routes.ts`)
```
channels/list            → ChannelsListComponent
channels/map             → ChannelsMapComponent
channels/                → redirect to list
```

### Events Routes (`features/events/events.routes.ts`)
```
events/search            → EventSearchComponent
events/results           → EventResultsComponent
events/                  → redirect to search
```

### Main Routes (`app/app.routes.ts`)
```
traffic-dashboard/auth/*
  ├── login              → LoginComponent
  └── (default)          → redirect to login

traffic-dashboard/dashboard/*
  ├── channels/*         → Channels routes
  ├── events/*           → Events routes
  └── (default)          → redirect to channels/list
```

---

## Data Models (DTOs)

All DTOs defined in `shared/models/traffic-dashboard.dtos.ts`:

### Authentication
- `LoginRequest` { username, password }
- `LoginResponse` { token, expiresIn?, tokenType?, refreshToken? }
- `AuthUser` { id, username, email?, roles? }

### Servers
- `Server` { id, name, ipAddress, port?, status?, location?, ... }

### Channels
- `Channel` { id, serverId, name, type, location, latitude?, longitude?, status?, ... }
- `ChannelFilterRequest` { serverId?, type?, location?, status? }
- `ChannelResponse` { channels[], total, page?, limit? }

### Events
- `Event` { id, serverId, channelId, timestamp, plateNumber?, applicationId?, imageUrl?, ... }
- `EventSearchRequest` { serverId, channelId?, startTimestamp, endTimestamp, lpNumber?, applicationId?, page?, limit? }
- `EventCountRequest` { serverId, channelId?, startTimestamp, endTimestamp, lpNumber?, applicationId? }
- `EventSearchResponse` { events[], total, page, limit, hasMore }
- `EventCountResponse` { count, serverId, timestamp }

### Admin
- `SyncChannelsResponse` { synced, failed, timestamp, message }

### Generic
- `ApiResponse<T>` { success, data?, error?, message?, timestamp? }
- `PaginatedResponse<T>` { content[], totalElements, totalPages, currentPage, pageSize, hasNext, hasPrevious }

---

## Component Hierarchy

```
App (root)
└── DashboardLayoutComponent
    ├── MatToolbar (header)
    ├── MatSidenav (navigation)
    └── MatSidenavContent (router outlet)
        └── Feature Components:
            ├── ChannelsListComponent
            ├── ChannelsMapComponent
            ├── EventSearchComponent
            └── EventResultsComponent
```

---

## Material Modules Used

Per Component:

**LoginComponent**:
- MatFormFieldModule
- MatInputModule
- MatButtonModule
- MatCardModule
- MatProgressSpinnerModule
- MatSnackBarModule

**ChannelsListComponent**:
- MatTableModule
- MatFormFieldModule
- MatInputModule
- MatSelectModule
- MatCardModule
- MatPaginatorModule
- MatProgressSpinnerModule
- MatIconModule
- MatChipsModule

**ChannelsMapComponent**:
- MatCardModule
- MatProgressSpinnerModule
- MatButtonModule
- MatIconModule

**EventSearchComponent**:
- MatFormFieldModule
- MatInputModule
- MatSelectModule
- MatButtonModule
- MatCardModule
- MatDatepickerModule
- MatNativeDateModule
- MatChipsModule
- MatProgressSpinnerModule

**EventResultsComponent**:
- MatTableModule
- MatCardModule
- MatPaginatorModule
- MatProgressSpinnerModule
- MatIconModule
- MatChipsModule
- MatTooltipModule

**DashboardLayoutComponent**:
- MatToolbarModule
- MatSidenavModule
- MatListModule
- MatIconModule
- MatButtonModule
- MatMenuModule
- MatSnackBarModule

---

## Best Practices

1. **Always check response.data** after API calls
2. **Use signals** for reactive state management
3. **Unsubscribe** from observables (use `takeUntilDestroyed` or OnDestroy)
4. **Validate dates** before API calls
5. **Use environment config** for dynamic values
6. **Handle errors** with snackbars for UX
7. **Test with various screen sizes**
8. **Cache when possible** (channels are cached)
9. **Lazy load** features to reduce bundle
10. **Type everything** with DTOs for safety

---

## Common Integration Points

### Adding a New Feature
1. Create feature folder in `src/app/features/`
2. Create components folder
3. Create services in `src/app/shared/services/`
4. Add DTOs to `shared/models/traffic-dashboard.dtos.ts`
5. Create `.routes.ts` for feature routing
6. Export routes in main `app.routes.ts`
7. Add navigation item in `DashboardLayoutComponent`

### Adding an API Endpoint
1. Add DTO to traffic-dashboard.dtos.ts
2. Create service method
3. Add route to PROTECTED_ROUTES in auth.interceptor.ts
4. Use in component via dependency injection

### Handling Loading States
```typescript
loading = signal(false);

loadData() {
  this.loading.set(true);
  this.service.getData().subscribe({
    next: (data) => { /* process */ },
    error: (err) => { this.loading.set(false); },
    complete: () => { this.loading.set(false); }
  });
}
```
