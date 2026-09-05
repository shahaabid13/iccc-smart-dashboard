# Traffic Dashboard - Quick Reference Guide

## File Structure

```
src/app/
├── core/
│   ├── guards/auth.guard.ts                              # Auth & admin guards
│   ├── interceptors/token.interceptor.ts                 # JWT injection
│   └── layout/dashboard-layout/                          # Main layout
│       ├── dashboard-layout.component.ts
│       ├── dashboard-layout.component.html
│       └── dashboard-layout.component.scss
├── features/
│   ├── auth/
│   │   ├── auth.routes.ts
│   │   ├── components/login/
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   └── login.component.scss
│   │   └── services/auth.service.ts
│   ├── channels/
│   │   ├── channels.routes.ts
│   │   └── components/
│   │       ├── channels-list/
│   │       │   ├── channels-list.component.ts
│   │       │   ├── channels-list.component.html
│   │       │   └── channels-list.component.scss
│   │       └── channels-map/
│   │           ├── channels-map.component.ts
│   │           ├── channels-map.component.html
│   │           └── channels-map.component.scss
│   └── events/
│       ├── events.routes.ts
│       └── components/
│           ├── event-search/
│           │   ├── event-search.component.ts
│           │   ├── event-search.component.html
│           │   └── event-search.component.scss
│           └── event-results/
│               ├── event-results.component.ts
│               ├── event-results.component.html
│               └── event-results.component.scss
└── shared/
    ├── models/
    │   ├── traffic-dashboard.dtos.ts
    │   └── index.ts
    └── services/
        ├── channel.service.ts
        ├── event.service.ts
        ├── server.service.ts
        ├── admin.service.ts
        └── index.ts
```

## URL Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/traffic-dashboard/auth/login` | LoginComponent | User login |
| `/traffic-dashboard/dashboard/channels/list` | ChannelsListComponent | Channel list with filters |
| `/traffic-dashboard/dashboard/channels/map` | ChannelsMapComponent | Channel location map |
| `/traffic-dashboard/dashboard/events/search` | EventSearchComponent | Event search form |
| `/traffic-dashboard/dashboard/events/results` | EventResultsComponent | Search results table |

## Key TypeScript Interfaces

### DTOs (from traffic-dashboard.dtos.ts)
- `LoginRequest` / `LoginResponse`
- `AuthUser`
- `Server`
- `Channel` (with type: ANPR | Evidence | GENERAL)
- `Event` / `EventSearchRequest` / `EventSearchResponse`
- `EventCountRequest` / `EventCountResponse`
- `ApiResponse<T>` / `PaginatedResponse<T>`

## Service Methods

### AuthService
```typescript
login(username, password): Observable<ApiResponse<LoginResponse>>
logout(): void
getCurrentUser(): AuthUser | null
isAuthenticated(): boolean
getToken(): string | null
```

### ChannelService
```typescript
getChannels(filters?): Observable<ApiResponse<ChannelResponse>>
getChannelsByServer(serverId): Observable<ApiResponse<ChannelResponse>>
getChannelsFromCache(): Channel[]
filterChannelsByType(type): Channel[]
searchChannels(searchTerm): Channel[]
```

### EventService
```typescript
searchEvents(request): Observable<ApiResponse<EventSearchResponse>>
countEvents(request): Observable<ApiResponse<EventCountResponse>>
isValidDateRange(startDate, endDate, maxDays): { valid: boolean, error?: string }
formatEventTimestamp(timestamp): string
dateToEpochMs(date): number
epochMsToDate(ms): Date
```

### ServerService
```typescript
getServers(): Observable<ApiResponse<Server[]>>
getServerById(serverId): Observable<ApiResponse<Server>>
```

### AdminService
```typescript
syncChannels(serverId?): Observable<ApiResponse<SyncChannelsResponse>>
```

## Environment Configuration

### Development
```typescript
environment.trafficDashboard.apiBaseUrl = 'http://localhost:8080'
environment.trafficDashboard.auth.useHttpOnly = false
environment.trafficDashboard.features.eventSearchMaxDays = 90
environment.trafficDashboard.map.defaultCenter = [40.7128, -74.0060]
```

### Production
Update `apiBaseUrl` to your backend domain and set `useHttpOnly = true`

## Common Tasks

### Add a new API endpoint
1. Add DTO to `traffic-dashboard.dtos.ts`
2. Create method in appropriate service
3. Ensure route is in `PROTECTED_ROUTES` in `auth.interceptor.ts`
4. Use service in component via dependency injection

### Add a new filter to channels list
1. Update form in `channels-list.component.ts`
2. Add field to `ChannelFilterRequest` in DTOs
3. Update `applyFilters()` method
4. Add UI control in template

### Customize map markers
Edit `channels-map.component.ts` in `plotChannelsOnMap()`:
```typescript
const color = this.cameraTypeColors[channel.type];
const icon = L.divIcon({
  html: `<div style="background-color: ${color}; ...">📷</div>`
});
```

### Change date range limit
1. Update `eventSearchMaxDays` in environment files
2. Update max attribute in date picker (if added)
3. Validation happens automatically in `EventService.isValidDateRange()`

### Add new Material components
1. Import module in component (`MatXxxModule`)
2. Module is already installed in `package.json`
3. Add to component's `imports` array

## Debugging Tips

### Check API requests
1. Open DevTools > Network tab
2. Filter by XHR
3. Check request/response headers
4. Verify Authorization header is present

### Check token storage
```javascript
// In browser console
localStorage.getItem('token')
sessionStorage.getItem('token')
// For httpOnly cookies, check Application > Cookies
```

### View logged-in user
```typescript
// In component
this.authService.getCurrentUser()
```

### Test date range validation
```typescript
const service = new EventService();
const result = service.isValidDateRange(startDate, endDate, 90);
console.log(result);
```

## Performance Tips

1. **Pagination**: Adjust `defaultEventLimit` in environment (default 50)
2. **Caching**: Channels are cached in ChannelService after first load
3. **Lazy Loading**: Feature modules load only when accessed
4. **Leaflet Map**: Consider disabling clustering for better performance

## Styling

### Breakpoints
- Desktop: > 768px
- Tablet: 600px - 768px
- Mobile: < 600px

### Color Scheme (Camera Types)
- ANPR: Red (#ff6b6b)
- Evidence: Teal (#4ecdc4)
- GENERAL: Green (#95e1d3)

### Status Colors
- ACTIVE: Primary (blue)
- INACTIVE: Accent (orange)
- OFFLINE: Warn (red)

## Testing Commands

```bash
# Start dev server
ng serve --proxy-config proxy.conf.json --port 4200

# Build for production
ng build --configuration production

# Run tests
ng test

# Run e2e tests
ng e2e
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Check token in storage, try login again |
| CORS errors | Verify backend CORS headers, check API base URL |
| Map not showing | Ensure map container has height, check tile URL |
| Images not loading | Verify image URLs, check CORS for image endpoints |
| Form validation errors | Check required fields marked with * |
| Date picker closed | Try importing MatNativeDateModule |

## API Response Structure

All responses follow this structure:
```typescript
{
  success: boolean,
  data?: T,
  error?: string,
  message?: string,
  timestamp?: number
}
```

Check `response.data` for actual payload after `.subscribe()`.

## Next Steps

1. Update `environment.trafficDashboard.apiBaseUrl` to your backend
2. Test login at `/traffic-dashboard/auth/login`
3. Browse channels at `/traffic-dashboard/dashboard/channels/list`
4. Search events at `/traffic-dashboard/dashboard/events/search`
5. Configure Leaflet map or switch to Google Maps
6. Customize colors, filters, and features as needed
