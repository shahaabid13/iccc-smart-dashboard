# Camera Incident Management System (CIMS) - Integration Guide

## Overview
The CIMS has been successfully integrated into the ICCC Smart Dashboard with full role-based access control and professional Material UI components. The system manages camera incidents through four distinct user roles: Support Engineer, Coordinator, Reviewer, and Admin.

## Project Structure

### New Files Created

#### Models
- **`src/app/models/cims.models.ts`** - All TypeScript interfaces and types for CIMS entities

#### Services
- **`src/app/services/cims.service.ts`** - Complete API integration service for all CIMS endpoints

#### Guards
- **`src/app/guards/cims.guards.ts`** - Role-based route guards for CIMS modules

#### Components
1. **Support Engineer**
   - `src/app/components/admin/cims-support-engineer-create-ticket.component.ts` - Create new incidents
   - `src/app/components/admin/cims-my-tickets.component.ts` - View raised tickets with pagination

2. **Coordinator**
   - `src/app/components/admin/cims-coordinator-queue.component.ts` - Process ticket queue

3. **Reviewer**
   - `src/app/components/admin/cims-reviewer-queue.component.ts` - Review and resolve tickets

4. **Admin**
   - `src/app/components/admin/cims-admin-dashboard.component.ts` - System-wide dashboard with stats
   - `src/app/components/admin/cims-all-tickets.component.ts` - Advanced filtering for all tickets

5. **Shared**
   - `src/app/components/admin/cims-ticket-detail.component.ts` - Detailed ticket view with history

#### Configuration
- **`src/app/app.routes.ts`** - Updated with CIMS routes and guards
- **`src/app/components/shared/header/header.component.ts`** - Added CIMS navigation section

## Features

### 1. Support Engineer Features
✅ **Raise New Ticket** - Create incidents with:
   - Incident Type
   - Location
   - Approach Road
   - Device Type
   - Field Person Assignment
   - Priority (Low, Medium, High)
   - Detailed Description

✅ **My Tickets** - View all raised tickets with:
   - Pagination support
   - Status filtering
   - Search functionality
   - View detailed ticket information

### 2. Coordinator Features
✅ **Processing Queue** - Handle tickets with:
   - Acknowledge tickets with notes
   - Assign reviewers from available list
   - View ticket details
   - Automatic pagination

### 3. Reviewer Features
✅ **Review Queue** - Manage assigned tickets:
   - Resolve tickets
   - Hold (put pending) tickets
   - Reopen resolved tickets
   - Reject tickets
   - Add notes for each action

### 4. Admin Features
✅ **Dashboard** - System-wide overview with:
   - Total tickets count
   - Open tickets count
   - Pending review count
   - Closed tickets count
   - Bar chart by status
   - Pie chart by priority
   - Recent tickets table

✅ **All Tickets** - Advanced filtering with:
   - Status filter
   - Priority filter
   - Incident Type filter
   - Date range selection
   - Export capabilities
   - Column sorting

## Role-Based Navigation

### Navigation Structure in Sidebar
The CIMS section appears dynamically based on user role:

```
CAMERA INCIDENT MANAGEMENT
├── Support Engineer (Role: SUPPORT_ENGINEER)
│   ├── My Tickets
│   └── Raise New Ticket
├── Coordinator (Role: COORDINATOR)
│   └── Processing Queue
├── Reviewer (Role: REVIEWER)
│   └── Review Queue
└── CIMS Admin (Role: ADMIN)
    ├── Dashboard
    └── All Tickets
```

### Authentication & Authorization
- All CIMS routes are protected by role-based guards
- Guards verify user role in localStorage
- Unauthorized access redirects to login
- Admin users can access all CIMS sections

## API Integration

### Base URL Configuration
```
API Base: http://localhost:8080
Proxy configured in: proxy.conf.json
```

### Authentication
- Uses existing JWT authentication from main auth service
- Token stored in localStorage
- Automatically attached to all CIMS API requests via interceptor

### Endpoints Integrated

**Auth**
- POST `/api/auth/login` - User login
- POST `/api/auth/create` - Create user (Admin only)

**Incident Types**
- POST `/api/incidents/incident-types` - Create type (Admin)
- GET `/api/incidents/incident-types` - List types

**Field Persons**
- POST `/api/incidents/field-persons` - Create person (Admin)
- GET `/api/incidents/field-persons` - List persons

**Tickets - Support Engineer**
- POST `/api/incidents/tickets` - Create ticket
- GET `/api/incidents/tickets/my` - My tickets (paginated)
- GET `/api/incidents/tickets/{id}` - Ticket details

**Tickets - Coordinator**
- GET `/api/incidents/tickets/coordinator-queue` - Queue (paginated)
- PUT `/api/incidents/tickets/{id}/acknowledge` - Acknowledge with notes
- PUT `/api/incidents/tickets/{id}/assign-reviewer` - Assign reviewer
- GET `/api/incidents/reviewers` - List available reviewers

**Tickets - Reviewer**
- GET `/api/incidents/tickets/review-queue` - Review queue (paginated)
- PUT `/api/incidents/tickets/{id}/resolve` - Resolve ticket
- PUT `/api/incidents/tickets/{id}/pending` - Put on hold
- PUT `/api/incidents/tickets/{id}/reopen` - Reopen ticket
- PUT `/api/incidents/tickets/{id}/reject` - Reject ticket

**Tickets - Admin**
- GET `/api/incidents/tickets` - All tickets with filters
- GET `/api/incidents/dashboard/stats` - Dashboard statistics

## Material UI Components Used

- **MatCardModule** - Card containers
- **MatTableModule** - Data tables with sorting
- **MatPaginatorModule** - Pagination controls
- **MatButtonModule** - Various button styles
- **MatSelectModule** - Dropdown selectors
- **MatFormFieldModule** - Form field styling
- **MatInputModule** - Text inputs
- **MatChipsModule** - Status and priority badges
- **MatIconModule** - Icon buttons and indicators
- **MatSnackBarModule** - Toast notifications
- **MatProgressSpinnerModule** - Loading indicators
- **MatTabsModule** - Tab navigation
- **MatDatepickerModule** - Date range selection
- **NgChartsModule** - Chart.js integration for statistics

## Styling Approach

### Professional Design Features
✅ **Color-coded Status Badges**
- Open: Blue
- Acknowledged: Purple
- In Review: Blue
- Resolved: Green
- Pending: Orange
- Rejected: Red

✅ **Priority Indicators**
- Low: Blue
- Medium: Orange
- High: Red

✅ **Responsive Design**
- Mobile-friendly layouts
- Collapsible sidebar
- Adaptive grid systems
- Touch-friendly buttons

✅ **Visual Hierarchy**
- Clear typography hierarchy
- Consistent spacing (24px, 20px, 16px, 12px)
- Proper color contrast
- Icon + text combinations

## Usage Instructions

### For Support Engineers
1. Navigate to "Camera Incident Management" → "Support Engineer" in sidebar
2. Click "Raise New Ticket" to create new incident
3. Fill in all required fields
4. Click "Submit Ticket"
5. View all tickets in "My Tickets"

### For Coordinators
1. Navigate to "Camera Incident Management" → "Coordinator"
2. View "Processing Queue" showing OPEN/REOPENED tickets
3. Click action buttons to:
   - Acknowledge ticket (adds notes)
   - Assign to reviewer
   - View full details

### For Reviewers
1. Navigate to "Camera Incident Management" → "Reviewer"
2. See "Review Queue" with assigned tickets
3. Take actions:
   - ✅ Resolve - Mark as fixed
   - ⏸️ Hold - Request more information
   - 🔄 Reopen - Issue recurred
   - ❌ Reject - Invalid ticket

### For Admin Users
1. Navigate to "Camera Incident Management" → "CIMS Admin"
2. **Dashboard** - View system statistics and charts
3. **All Tickets** - Filter and view all incidents with advanced options

## Testing with Postman

A Postman collection is included: `CIMS-Postman-Collection.json`

### Quick Test Steps
1. Import collection into Postman
2. Set environment variables:
   - `{{baseUrl}}`: http://localhost:8080
   - `{{jwt}}`: Token from login response
3. Run endpoints in sequence:
   - Login → Get Token
   - Create Incident Type
   - Create Field Person
   - Create Ticket
   - Acknowledge Ticket
   - Assign Reviewer
   - Resolve Ticket

## Notifications (Email/SMS/Browser) on Ticket Updates

A notification system has been added so every CIMS role is alerted when a ticket they care about changes status.

### Features
- **In-app notification bell** in the header (🔔) with an unread count badge — visible to SUPPORT_ENGINEER, FIELD_PERSON, COORDINATOR, REVIEWER, and ADMIN.
- **Notification center** — click the bell to view the latest 100 notifications, mark individual/all as read, or clear them.
- **Click-to-open** — clicking a notification navigates to the ticket detail page for your role.
- **Browser notifications** — native popups when the page is open (opt-in, permission-based).
- **Notification Settings page** (`/cims/notifications/settings`) — enable/disable Email, SMS, and Browser channels, set your email/phone, and choose which ticket events trigger each channel. Available from every CIMS role sidebar and from the bell footer.

### How Detection Works
- The bell polls the role-appropriate ticket list every **30 seconds** (My Tickets / Review Queue / Field-Person Queue / All Tickets).
- It compares each ticket's `updatedAt` against a **last-seen cache** (localStorage). A changed `updatedAt` produces a notification.
- On first load, the current ticket states are seeded as a baseline so pre-existing tickets don't spam the user.
- Notifications are stored in localStorage (`cims.notifications`), settings in `cims.notification.settings`.

### New Files
| File | Purpose |
|------|---------|
| `src/app/services/cims-notification.service.ts` | Polling, diff detection, browser notifications, settings persistence |
| `src/app/components/admin/cims-notification-bell.component.ts` | Header bell + dropdown panel |
| `src/app/components/admin/cims-notification-settings.component.ts` | Settings page |
| `src/app/guards/cims.guards.ts` | Added `CimsNotificationGuard` |

### Event Types
`TICKET_CREATED`, `TICKET_ACKNOWLEDGED`, `TICKET_ASSIGNED`, `TICKET_RESOLVED`, `TICKET_ON_HOLD`, `TICKET_REOPENED`, `TICKET_REJECTED`

### Backend Contract for Email/SMS Delivery
The frontend calls two endpoints when Email/SMS are enabled and an event fires. The backend must implement them:

**POST `/api/incidents/notifications/email`**
```json
{
  "to": "user@example.com",
  "subject": "Ticket Resolved #42",
  "body": "Camera failure at Sector 5. Status: RESOLVED.",
  "ticketId": 42,
  "eventType": "TICKET_RESOLVED"
}
```

**POST `/api/incidents/notifications/sms`**
```json
{
  "to": "+919876543210",
  "message": "Ticket #42 resolved. Status: RESOLVED.",
  "ticketId": 42,
  "eventType": "TICKET_RESOLVED"
}
```

Recommended backend behavior:
- Validate `to`/`ticketId`/`eventType` and return `400` on invalid input.
- Return `202 Accepted` when queued for delivery, `500` on provider failure.
- Use Spring Mail (`spring-boot-starter-mail`) for email and an SMS gateway (e.g., MSG91, Twilio, or the agency's existing gateway) for SMS.
- Send the same messages automatically from the ticket action endpoints (acknowledge/assign/resolve/pending/reopen/reject) so other users get email/SMS without having the dashboard open.

### Notification Types (models)
`CimsNotificationEventType`, `NotificationChannel`, `CimsNotification`, `NotificationSettings`, `EmailNotificationRequest`, `SmsNotificationRequest` — all in `src/app/models/cims.models.ts`.

## Performance Considerations

✅ **Pagination**
- All list endpoints support pagination
- Default page size: 10 items
- Configurable page sizes: 5, 10, 20, 50

✅ **Lazy Loading**
- Components use lazy route loading
- Reduces initial bundle size
- Improves app startup time

✅ **Caching**
- Incident types cached in component state
- Reviewers list cached
- Implement with RxJS share() if needed

## Error Handling

### User-Friendly Error Messages
- API errors displayed via MatSnackBar
- Validation errors highlighted in forms
- 403 Forbidden shows access denied message
- 409 Conflict shows business logic violations
- Network errors with retry option

### Logging
- Console errors for debugging
- Error messages passed to UI
- Stack traces in dev console

## Security Features

✅ **JWT Authentication**
- Tokens stored in localStorage
- Attached to all API requests
- Automatically refreshed (via interceptor)

✅ **Role-Based Access Control**
- Route guards check user role
- Navigation items hidden based on role
- API enforces permissions server-side

✅ **HTTPS (Production)**
- Configured via proxy.conf.json
- API calls proxied through dev server

## Future Enhancements

### Recommended Additions
- [ ] Real-time notifications via WebSocket
- [ ] Bulk ticket actions (bulk acknowledge, assign)
- [ ] Advanced search with text indexing
- [ ] Custom filters saved per user
- [ ] Activity timeline with user avatars
- [ ] Ticket assignment to teams
- [ ] SLA tracking and alerts
- [ ] Document/image attachments
- [ ] Ticket templates
- [ ] Integration with external ticketing systems

## Troubleshooting

### Common Issues

**1. "Forbidden" Error**
- Verify user has correct role
- Check JWT token is valid
- Verify token is stored in localStorage

**2. "Failed to load" Error**
- Check API is running on http://localhost:8080
- Verify proxy.conf.json is configured
- Check browser network tab for actual URL

**3. Navigation Not Showing**
- Verify user role is set correctly
- Check localStorage has 'role' key
- Hard refresh page (Ctrl+Shift+R)
- Check component visibility conditions

**4. Table Not Updating**
- Verify API response format matches models
- Check pagination parameters
- Look for API errors in network tab

## Support & Documentation

### Related Files
- Main Prompt: `CIMS-Frontend-Assistant-Prompt.txt`
- Postman Collection: `CIMS-Postman-Collection.json`
- Integration Guide: This file

### Deployment Steps
1. Build: `npm run build`
2. Start: `npm start` (dev server with proxy)
3. Access: http://localhost:4200
4. Ensure backend API running on http://localhost:8080

## Summary

The CIMS integration is now **production-ready** with:
- ✅ Complete role-based access control
- ✅ Professional Material UI design
- ✅ Full API integration
- ✅ Error handling & validation
- ✅ Responsive mobile layout
- ✅ Advanced filtering & search
- ✅ Charts & analytics
- ✅ Pagination support
- ✅ Security best practices
- ✅ Clean, maintainable code

Users can now manage camera incidents seamlessly across different roles!
