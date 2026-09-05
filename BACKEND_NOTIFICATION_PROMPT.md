# Backend AI Assistant Prompt — CIMS Email/SMS Notification Delivery

> Copy everything between the `--- PROMPT START ---` and `--- PROMPT END ---` markers and paste it into your backend AI assistant (or use it as the context for a new backend coding task). This is a self-contained spec; the assistant does not need the frontend repo to implement it.

---

--- PROMPT START ---

You are working on a Spring Boot backend (`src/main/java/com/inventory/msp`) for the ICCC Smart Dashboard — Camera Incident Management System (CIMS).

## Background

A frontend Angular app lets CIMS users (SUPPORT_ENGINEER, FIELD_PERSON, COORDINATOR, REVIEWER, ADMIN) choose notification settings: email and/or SMS per event type (TICKET_CREATED, TICKET_ACKNOWLEDGED, TICKET_ASSIGNED, TICKET_RESOLVED, TICKET_ON_HOLD, TICKET_REOPENED, TICKET_REJECTED). The frontend already knows each user's chosen settings (stored in localStorage) and their email/phone. It sends delivery requests to two endpoints that your backend MUST implement, and your backend MUST ALSO auto-send emails/SMS directly from the ticket action endpoints so users who are not currently on the dashboard still get notified.

## Contracts the frontend expects (implement these EXACTLY)

### POST /api/incidents/notifications/email
Request body:
```json
{
  "to": "user@example.com",
  "subject": "Ticket Created #42",
  "body": "Camera failure at Sector 5. Status: OPEN.",
  "ticketId": 42,
  "eventType": "TICKET_CREATED"
}
```
Behavior:
- Validate: `to` must be a valid email, `ticketId` > 0, `eventType` one of the 7 values. Return `400 Bad Request` with a JSON `{ "message": "..." }` on invalid input.
- Attempt delivery and return `202 Accepted` when queued/accepted by the provider.
- Return `500` with `{ "message": "..." }` on provider failure (do NOT throw uncaught exceptions).

### POST /api/incidents/notifications/sms
Request body:
```json
{
  "to": "+919876543210",
  "message": "Ticket Created #42. Camera failure at Sector 5. Status: OPEN.",
  "ticketId": 42,
  "eventType": "TICKET_CREATED"
}
```
Behavior: same validation and status-code rules as email (`to` must be a valid phone number).

### IMPORTANT: The frontend POSTs to these two endpoints with a delay after each event, so the endpoints should be idempotent — dedupe by `ticketId` + `eventType` + `to` within a short window (e.g., 2 minutes) to avoid double sends.

## Auto-send from ticket action endpoints (this is the critical part)

Users who are NOT looking at the dashboard will never fire the frontend notification calls. So YOUR backend must also send email/SMS automatically every time a ticket changes state. For each relevant ticket action, notify the right people:

| Event | Endpoint | Who should be notified |
|---|---|---|
| TICKET_CREATED | POST /api/incidents/tickets | The assigned FIELD_PERSON and the COORDINATOR (and ADMINs if enabled) |
| TICKET_ACKNOWLEDGED | PUT /api/incidents/tickets/{id}/acknowledge | The SUPPORT_ENGINEER who raised the ticket (`raisedByUserId`) and ADMINs |
| TICKET_ASSIGNED | PUT /api/incidents/tickets/{id}/assign-reviewer | The REVIEWER being assigned, the SUPPORT_ENGINEER who raised it, and ADMINs |
| TICKET_RESOLVED | PUT /api/incidents/tickets/{id}/resolve | The SUPPORT_ENGINEER who raised it, the assigned FIELD_PERSON, and ADMINs |
| TICKET_ON_HOLD | PUT /api/incidents/tickets/{id}/pending | The SUPPORT_ENGINEER who raised it and the assigned FIELD_PERSON |
| TICKET_REOPENED | PUT /api/incidents/tickets/{id}/reopen | The REVIEWER who resolved it, the COORDINATOR, and ADMINs |
| TICKET_REJECTED | PUT /api/incidents/tickets/{id}/reject | The SUPPORT_ENGINEER who raised it and ADMINs |

To know each user's contact details: add a `notification_settings` table (or reuse an existing user-profile table) storing per user: `username`, `email`, `phone`, `email_enabled`, `sms_enabled`, and per-event booleans (e.g., `notify_EMAIL_TICKET_CREATED`, `notify_SMS_TICKET_RESOLVED`, ...). If a user has no row, treat all channels as disabled (except for the frontend-initiated POSTs, which the frontend has already pre-filtered by the user's settings).

Notification recipients must be resolved by the ticket's own data: `raisedByUserId` → SUPPORT_ENGINEER's email/phone; `fieldPersonId` → FIELD_PERSON; `assignedToReviewerId` → REVIEWER; plus any ADMIN users.

Message formats (keep consistent so the frontend bell and email/SMS match):
- Subject/Title: `Ticket Created #42`, `Ticket Acknowledged #42`, `Reviewer Assigned #42`, `Ticket Resolved #42`, `Ticket On Hold #42`, `Ticket Reopened #42`, `Ticket Rejected #42`
- Body/Message: `<IncidentTypeName> at <LocationName> (<PRIORITY> priority). Status: <STATUS>.`

## Implementation requirements

1. Use `spring-boot-starter-mail` for email (SMTP config in `application.properties` via env vars: `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_FROM`). If those env vars are missing, log a clear warning and skip silently — do not break ticket creation.
2. For SMS, use an HTTP-based gateway abstraction (interface `SmsGateway`) with a stub implementation that logs the message to console when no provider config is set (env vars: `SMS_GATEWAY_URL`, `SMS_GATEWAY_API_KEY`). Do not hard-code a vendor; the agency will wire their gateway.
3. Structure: follow the existing package layout —
   - `controller/` → `IncidentNotificationController` (the two endpoints above)
   - `service/` → `NotificationService` (resolve recipients from ticket + settings, dedupe, dispatch to `EmailSender` + `SmsSender`), plus an `EmailSender` and `SmsSender` service class
   - `dto/` → `EmailNotificationRequest`, `SmsNotificationRequest`, `NotificationSettingsRequest`
   - `exception/` → reuse or add `BadRequestException`/`NotificationDeliveryException` returning proper HTTP codes
4. Send these emails/SMS asynchronously (e.g., `@Async` on the send methods or a `TaskExecutor`) so ticket actions never wait on the mail/SMS provider.
5. Add `@Valid` Bean Validation on the DTOs (`@Email`, `@Pattern` for phone, `@NotNull`, `@Min(1)` for ticketId).
6. Log every notification attempt: recipient, ticket id, event type, channel, success/failure. Never throw from inside the notification flow in a way that rolls back the ticket action.

## Verification you must do before finishing

- `mvn clean package` compiles.
- Use curl (or a REST client) against each new endpoint: valid request → 202; missing `to` → 400; bad `eventType` → 400.
- Create a ticket as SUPPORT_ENGINEER and confirm the assigned FIELD_PERSON (with settings row + email_enabled=true) receives an email log entry automatically.
- Confirm a ticket action (e.g., resolve) still succeeds even when MAIL env vars are unset (graceful skip).

--- PROMPT END ---

---

## Quick reference for the assistant

- **API base:** `/api/incidents` (proxied to the backend)
- **Frontend already sends:** the two POST endpoints above; your backend must also auto-send on ticket actions
- **7 event types:** `TICKET_CREATED`, `TICKET_ACKNOWLEDGED`, `TICKET_ASSIGNED`, `TICKET_RESOLVED`, `TICKET_ON_HOLD`, `TICKET_REOPENED`, `TICKET_REJECTED`
- **Channels:** `EMAIL`, `SMS`
- **Graceful failure is mandatory:** never block ticket creation/actions on notification delivery

## Also: no notification for ticket creation was a frontend bug too

The frontend has been fixed so that creating a ticket now raises an in-app/browser notification immediately, and new tickets detected by polling generate notifications. Those changes are already applied in this repo (`cims-notification.service.ts`, `cims-support-engineer-create-ticket.component.ts`). What remains for actual email/SMS delivery is exactly what the prompt above builds on the backend.
