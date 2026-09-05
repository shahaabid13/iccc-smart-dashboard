# CIMS Field App

A mobile app for field-person users of the Camera Incident Management System (CIMS). Built with Ionic + Angular (standalone components) and Capacitor for iOS and Android.

## Features

- **Authentication**: Secure JWT-based login, stored in Capacitor Preferences
- **Tickets**: View active ticket queue, acknowledge incidents, assign reviewers
- **Tasks**: View assigned tasks, take action (resolve, hold, reject) with required summaries
- **Offline Support**: Cached lists and queued actions for offline submission
- **Pull-to-Refresh**: Update tickets and tasks on demand
- **Responsive UI**: Touch-optimized Ionic components with SCSS styling

## Quick Start

### Web Development
```bash
npm install
npm start
```

Runs on `http://localhost:4200` with live reload.

### Mobile Testing
```bash
npm run build
npm run cap:open:android   # or cap:open:ios
```

See [NATIVE_BUILD_GUIDE.md](./NATIVE_BUILD_GUIDE.md) for detailed native build steps.

## Project Structure

```
src/
  app/
    components/
      offline-banner.component.ts   # Offline status indicator
    guards/
      auth.guard.ts                  # Protects authenticated routes
    interceptors/
      auth.interceptor.ts            # Attaches JWT to requests, handles 401
    models/
      ticket.ts                      # Ticket interface
      task.ts                        # Task interface
    pages/
      login/                         # Authentication page
      tabs/                          # Tab layout container
      tickets/                       # Ticket list and detail pages
      tasks/                         # Task list and detail pages
    services/
      auth.service.ts                # Login, JWT management
      ticket.service.ts              # Ticket API + caching
      task.service.ts                # Task API + caching
      offline.service.ts             # Network status detection
      cache.service.ts               # Local Preferences caching
      action-queue.service.ts        # Offline action queueing
    app.routes.ts                    # Routing configuration
  environments/
    environment.ts                   # Dev config (localhost:8080)
    environment.prod.ts              # Prod config

package.json                         # Dependencies and scripts
capacitor.config.ts                  # iOS/Android configuration
angular.json, tsconfig.json          # Build configuration
```

## Backend API

The app expects a Spring Boot backend at `http://localhost:8080` (configurable via `environment.ts`).

### Auth
- `POST /api/auth/login` — Login with username/password, returns JWT

### Tickets (field-person role)
- `GET /api/incidents/tickets/my-queue` — Active ticket queue
- `GET /api/incidents/tickets/{id}` — Ticket detail
- `PUT /api/incidents/tickets/{id}/acknowledge` — Acknowledge ticket (body: `{ notes: string }`)
- `GET /api/incidents/tickets/reviewers` — List available reviewers
- `PUT /api/incidents/tickets/{id}/assign-reviewer` — Assign reviewer (body: `{ reviewerId: number }`)

### Tasks
- `GET /api/tasks/my` — Assigned open tasks
- `GET /api/tasks/{id}` — Task detail
- `PUT /api/tasks/{id}/action` — Submit action (body: `{ status: 'RESOLVED'|'HOLD'|'REJECTED', summary: string }`)

## Key Implementation Details

### Auth Flow
1. User logs in on `/login` page
2. JWT is stored in Capacitor Preferences (never localStorage)
3. `AuthInterceptor` attaches token to every request as `Authorization: Bearer <token>`
4. `AuthGuard` protects the `/tabs` route
5. On 401 response, token is cleared and user is redirected to login

### Offline Resilience
- **List Caching**: Ticket and task lists are cached in Preferences on successful fetch
- **Fallback**: If a list fetch fails, cached data is returned
- **Action Queueing**: When offline or on error, acknowledgements, reviewer assignments, and task actions are queued
- **Auto-Retry**: When network reconnects, queued actions are retried automatically
- **Offline Banner**: Red warning banner shown when offline

### Ticket Acknowledgement Flow
1. User sees "Acknowledge" button only if ticket status is `OPEN` or `REOPENED`
2. Form shows required notes field
3. On submit:
   - If online and successful: reviewer picker appears
   - If offline or error: action is queued, reviewer picker still appears
4. User can then select a reviewer from the `/reviewers` list
5. Reviewer assignment is also queued if offline

### Task Action Flow
1. User sees "Take Action" form only if task status is `OPEN` or `HOLD`
2. Form shows dropdown (Resolved, Hold, Rejected) and required summary
3. `HOLD` option is hidden if current status is already `HOLD`
4. On submit:
   - If online and successful: task is refreshed
   - If offline or error: action is queued, form remains
5. All actions require a non-blank summary

## Scripts

```bash
npm start              # Dev server with live reload
npm run build          # Build Angular app to www/
npm run cap:copy       # Copy build to Capacitor
npm run cap:open:android  # Open Android Studio
npm run cap:open:ios      # Open Xcode
```

## Capacitor Configuration

App ID: `com.iccc.cimsfieldapp`
App Name: `CIMS Field App`
Web Directory: `www/`

Edit `capacitor.config.ts` to customize for your deployment.

## Environment Setup

Create or update environment files for your backend:

**src/environments/environment.ts** (dev):
```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080'
};
```

**src/environments/environment.prod.ts** (prod):
```typescript
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.example.com'
};
```

## Dependencies

- **@angular/core**: Framework
- **@ionic/angular**: UI components
- **@capacitor/core, @capacitor/preferences, @capacitor/network**: Mobile APIs
- **rxjs**: Reactive programming

## Development

The app uses Angular's standalone components (no NgModule). All components, services, and routes are tree-shakeable.

### Adding a New Service

```typescript
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MyService {
  // ...
}
```

### Adding a New Page

```typescript
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './my-page.html',
  styleUrls: ['./my-page.scss']
})
export class MyPage {}
```

## Troubleshooting

### JWT Token Not Persisting
- Ensure `Preferences` is being used, not `localStorage`
- Clear Preferences in dev tools: `Preferences.clear()`

### Offline Mode Not Detecting
- Check `@capacitor/network` is installed
- Grant network state permissions on Android

### Backend Connection Issues
- Verify `environment.ts` URL is correct
- Ensure backend is running and CORS is configured
- For Android emulator, use `10.0.2.2` instead of `localhost`

## Future Enhancements

- [ ] Biometric authentication
- [ ] Push notifications for new tickets
- [ ] Ticket history pagination
- [ ] App icon and splash screen branding
- [ ] Dark mode support
- [ ] Internationalization (i18n)

## License

Proprietary — Camera Incident Management System
