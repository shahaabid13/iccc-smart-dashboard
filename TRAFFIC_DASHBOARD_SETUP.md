# Traffic & Video Management Dashboard - Implementation Guide

## Overview

This document provides a comprehensive guide for the Traffic & Video Management Dashboard Angular frontend that consumes a Spring Boot backend with JWT authentication.

## Architecture Overview

```
src/app/
├── core/
│   ├── guards/
│   │   └── auth.guard.ts              # Authentication guards
│   ├── interceptors/
│   │   └── token.interceptor.ts       # JWT token injection interceptor
│   └── layout/
│       └── dashboard-layout/          # Main dashboard layout with sidebar
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   └── login/                 # Login form component
│   │   ├── services/
│   │   │   └── auth.service.ts        # Authentication service
│   │   └── auth.routes.ts             # Auth feature routes
│   ├── channels/
│   │   ├── components/
│   │   │   ├── channels-list/         # Channel list/grid view
│   │   │   └── channels-map/          # Leaflet map view
│   │   └── channels.routes.ts         # Channels feature routes
│   └── events/
│       ├── components/
│       │   ├── event-search/          # Event search form
│       │   └── event-results/         # Event results table
│       └── events.routes.ts           # Events feature routes
└── shared/
    ├── models/
    │   └── traffic-dashboard.dtos.ts  # TypeScript interfaces (DTOs)
    └── services/
        ├── channel.service.ts         # Channel API service
        ├── event.service.ts           # Event/Detection API service
        ├── server.service.ts          # Server management service
        └── admin.service.ts           # Admin operations service
```

## Backend API Contracts

### Authentication
```
POST /api/auth/login
Request: { username, password }
Response: { token, expiresIn?, tokenType?, refreshToken? }
```

### Servers
```
GET /api/servers
Response: { servers: Server[], total: number }
```

### Channels
```
GET /api/channels?serverId=&type=&location=
Response: { channels: Channel[], total: number }

POST /api/admin/channels/sync
Body: { serverId?: string }
Response: { synced: number, failed: number, timestamp: number }
```

### Events/Detections
```
POST /api/events/search
Body: {
  serverId,
  channelId?,
  startTimestamp,    // epoch millis
  endTimestamp,      // epoch millis
  lpNumber?,
  applicationId?,
  page?,
  limit?
}
Response: {
  events: Event[],
  total: number,
  page: number,
  limit: number,
  hasMore: boolean
}

POST /api/events/count
Body: {
  serverId,
  channelId?,
  startTimestamp,
  endTimestamp,
  lpNumber?,
  applicationId?
}
Response: { count: number, serverId, timestamp }
```

## Key Features Implemented

### 1. Authentication Module
- **Login Component**: Material-based login form with validation
- **AuthService**: Manages JWT tokens (localStorage/sessionStorage/httpOnly cookies)
- **Token Interceptor**: Automatically attaches Bearer token to API requests
- **Auth Guard**: Protects routes requiring authentication

**Usage**:
```typescript
// Navigate to login
/traffic-dashboard/auth/login

// Automatic redirect on 401
// Token stored in environment-configurable storage
```

### 2. Channels Feature
#### List View Component
- Material table with sortable/filterable columns
- Filter by Server, Camera Type (ANPR/Evidence/GENERAL), Location
- Server-side pagination (20 items per page)
- Status indicators (ACTIVE/INACTIVE/OFFLINE)
- Click to view details

#### Map View Component
- Leaflet-based map integration
- Markers colored by camera type:
  - 🔴 ANPR: Red (#ff6b6b)
  - 🔵 Evidence: Teal (#4ecdc4)
  - 🟢 GENERAL: Green (#95e1d3)
- Popup with channel details on click
- Zoom to fit all markers
- Reset map view button
- Legend showing camera types

**Usage**:
```
/traffic-dashboard/dashboard/channels/list   # List view
/traffic-dashboard/dashboard/channels/map    # Map view
```

### 3. Event Search & Results Feature

#### Search Form
- Server selection (required)
- Channel dropdown (auto-populated based on server)
- Date range picker with validation:
  - End date must be after start date
  - Max range: 90 days (configurable in environment)
- Optional filters:
  - License plate number (ANPR events)
  - Application ID
- "Get Total Count" button (calls `/api/events/count` independently)
- "Search Events" button (calls `/api/events/search`)

#### Results Table
- Displays: Timestamp, Channel Name, License Plate, Confidence, Image
- Server-side pagination (configurable, default 50 items)
- Image thumbnails with click-to-expand
- Download image button
- View details button
- Timestamp formatted in local timezone
- Confidence displayed as percentage with color coding

**Usage**:
```
/traffic-dashboard/dashboard/events/search   # Search form
/traffic-dashboard/dashboard/events/results  # Results view
```

## Configuration

### Environment Setup

**Development** (`src/environments/environment.ts`):
```typescript
trafficDashboard: {
  apiBaseUrl: 'http://localhost:8080',
  auth: {
    tokenStorageKey: 'token',
    userStorageKey: 'currentUser',
    useHttpOnly: false,        // localStorage in dev
    useRefreshToken: true
  },
  map: {
    provider: 'leaflet',
    tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    defaultZoom: 12,
    defaultCenter: [40.7128, -74.0060]  // New York
  },
  features: {
    eventSearchMaxDays: 90,
    defaultPageSize: 20,
    defaultEventLimit: 50
  }
}
```

**Production** (`src/environments/environment.prod.ts`):
```typescript
trafficDashboard: {
  apiBaseUrl: 'https://your-api-domain.com',
  auth: {
    useHttpOnly: true,  // httpOnly cookies
    // ... other settings
  }
}
```

### Material Dependencies

Required Material modules (already configured):
- MatToolbarModule
- MatSidenavModule
- MatTableModule
- MatFormFieldModule
- MatInputModule
- MatSelectModule
- MatButtonModule
- MatCardModule
- MatDatepickerModule
- MatPaginatorModule
- MatProgressSpinnerModule
- MatSnackBarModule
- MatChipsModule
- MatIconModule
- MatMenuModule

### Map Setup

Leaflet is already included in `package.json`. For Google Maps (optional):
```bash
npm install @angular/google-maps
# Then update channels-map.component.ts to use Google Maps provider
```

## Service Usage Examples

### ChannelService
```typescript
// Get all channels
this.channelService.getChannels().subscribe(response => {
  console.log(response.data.channels);
});

// Get channels with filters
this.channelService.getChannels({
  serverId: 'server-1',
  type: 'ANPR',
  location: 'downtown'
}).subscribe(response => {
  console.log(response.data.channels);
});

// Get cached channels
const channels = this.channelService.getChannelsFromCache();
```

### EventService
```typescript
// Search events
const request: EventSearchRequest = {
  serverId: 'server-1',
  startTimestamp: new Date('2024-01-01').getTime(),
  endTimestamp: new Date('2024-01-02').getTime(),
  page: 0,
  limit: 50
};

this.eventService.searchEvents(request).subscribe(response => {
  console.log(response.data.events);
});

// Count events
this.eventService.countEvents(request).subscribe(response => {
  console.log('Total events:', response.data.count);
});

// Validate date range
const validation = this.eventService.isValidDateRange(startDate, endDate, 90);
if (!validation.valid) {
  console.error(validation.error);
}

// Format timestamp to local timezone
const formatted = this.eventService.formatEventTimestamp(timestamp);
```

### AdminService
```typescript
// Sync channels
this.adminService.syncChannels('server-1').subscribe(response => {
  console.log(`Synced ${response.data.synced} channels`);
});
```

## Routing Structure

```
/traffic-dashboard/
  ├── auth/
  │   └── login
  └── dashboard/
      ├── channels/
      │   ├── list
      │   └── map
      └── events/
          ├── search
          └── results
```

## Authentication Flow

1. User navigates to `/traffic-dashboard/auth/login`
2. Enters credentials (username, password)
3. AuthService sends POST to `/api/auth/login`
4. Token is stored (based on `useHttpOnly` config):
   - Development: localStorage
   - Production: httpOnly cookie (backend sets)
5. User redirected to `/traffic-dashboard/dashboard/channels/list`
6. All subsequent API requests include `Authorization: Bearer <token>` header
7. On 401, user is redirected back to login

## Error Handling

All components have error handling via MatSnackBar:
- API failures display toast messages
- Form validation shows inline errors
- Loading spinners indicate async operations
- Network errors are caught and user-friendly messages shown

## Performance Considerations

### Pagination
- Server-side pagination for events (default 50 items/page)
- Channels list paginated client-side (default 20 items/page)
- Adjustable in environment config

### Caching
- Channel list cached in ChannelService
- Refresh on filter change or manual reload
- Consider implementing HTTP caching headers from backend

### Lazy Loading
- Features loaded on demand via `loadChildren`
- Reduces initial bundle size
- Improves initial load time

### Date Range Validation
- Max 90-day search range to prevent backend overload
- Configurable in environment

## Security Best Practices

### JWT Token Storage
- **In-Memory (Recommended for SPAs)**:
  ```typescript
  useHttpOnly: false,  // User manages in-memory
  // Token lost on page refresh
  ```

- **localStorage (Balance)**:
  ```typescript
  useHttpOnly: false,
  // Vulnerable to XSS but persistent
  // Clear on logout
  ```

- **httpOnly Cookies (Best)**:
  ```typescript
  useHttpOnly: true,
  // Backend sets via Set-Cookie header
  // Immune to XSS
  // Requires CORS configuration
  ```

### CORS & CSRF
- Ensure backend sets appropriate CORS headers
- Include credentials in requests if using httpOnly cookies:
  ```typescript
  withCredentials: true  // In HttpClient configuration
  ```

### Input Validation
- All forms use Reactive Forms with validators
- Date ranges validated before API calls
- User inputs sanitized (Angular handles by default)

## Testing Checklist

- [ ] Login redirects to dashboard on success
- [ ] 401 errors redirect to login
- [ ] Channels list loads and filters work
- [ ] Map displays markers correctly
- [ ] Event count returns accurate number
- [ ] Event search with various filter combinations
- [ ] Date range validation (end after start, max 90 days)
- [ ] Pagination works correctly
- [ ] Images load from thumbnailUrl
- [ ] Download image button downloads file
- [ ] Logout clears token and redirects

## Common Issues & Solutions

### Issue: Token not being sent
**Solution**: Ensure API route is in `PROTECTED_ROUTES` in `interceptors/auth.interceptor.ts`

### Issue: Map not displaying
**Solution**: Verify Leaflet library is loaded, check map container height is set, tiles URL is accessible

### Issue: Date picker not showing
**Solution**: Ensure `MatNativeDateModule` is imported and `MatDatepickerModule` is included

### Issue: CORS errors
**Solution**: Configure backend CORS policy to allow requests from frontend origin

### Issue: Images not loading
**Solution**: Verify image URLs are accessible from browser, check CORS policy for image endpoints

## Future Enhancements

1. **Refresh Token Support**: Implement automatic token refresh on expiry
2. **Advanced Search**: Add event type filters, speed/direction filters
3. **Real-time Updates**: WebSocket integration for live event stream
4. **Event Timeline**: Visual timeline view of events
5. **Multi-select**: Bulk operations on events/channels
6. **Export**: Export search results to CSV/PDF
7. **Analytics**: Charts and statistics dashboards
8. **Notifications**: Real-time alerts for specific event types
9. **User Management**: User role-based access control
10. **Dark Mode**: Theme switching support

## Troubleshooting

Run the development server:
```bash
ng serve --proxy-config proxy.conf.json --port 4200
```

Watch for console errors and check:
1. Network tab in DevTools for API calls
2. Application tab for token storage
3. Console for Angular compilation errors

## Contributing

When adding new features:
1. Create service interfaces in `shared/models/`
2. Implement API service in `shared/services/`
3. Create feature components in `features/`
4. Add routing in feature `.routes.ts`
5. Update environment config if needed
6. Test with various screen sizes (responsive design)
