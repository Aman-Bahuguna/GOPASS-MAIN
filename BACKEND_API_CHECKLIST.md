# GoPass Backend Checklist
> **Simple guide for backend development**  
> **Tech Stack:** Java Spring Boot + PostgreSQL

---

## 🎯 What is GoPass?

A college event management platform where:
- **Users** can browse and register for events
- **Organizers** can create and manage events (after admin approval)
- **Admins** can approve organizers and manage college events

---

## 👥 User Roles

| Role | What they can do |
|------|------------------|
| **USER** | Browse events, register for events, view tickets |
| **ORGANIZER** | Everything User can do + Create & manage their own events |
| **ADMIN** | Everything + Approve organizers, manage all college events |

---

## 🔐 Account Verification Flow

| Role | After Signup |
|------|--------------|
| **USER** | Active immediately ✅ |
| **ORGANIZER** | Active immediately, BUT needs Admin approval to CREATE events |
| **ADMIN** | Needs Platform Team verification (24-48 hrs) → then Active |

---

## 📊 Database Tables Needed (9 Tables)

### 1. `users`
Stores all users (Users, Organizers, Admins)

| Field | What it stores |
|-------|----------------|
| id | Unique identifier |
| email | User's email (unique) |
| password | Encrypted password |
| full_name | User's name |
| role | USER / ORGANIZER / ADMIN |
| status | ACTIVE / PENDING_PLATFORM_VERIFICATION / REJECTED / SUSPENDED |
| position | For Admin: PROFESSOR/HOD/DEAN, For Organizer: TEACHER/STUDENT |
| avatar_url | Profile picture |
| id_card_url | College ID card image |
| is_admin_approved | For organizers - can they create events? |
| approved_by | Which admin approved them |
| college_id | Link to their college |
| created_at | When account was created |

### 2. `colleges`
Stores college information

| Field | What it stores |
|-------|----------------|
| id | Unique identifier |
| name | College name |
| state | State (Maharashtra, Karnataka, etc.) |
| pincode | 6-digit pincode |
| address | Full address |
| logo_url | College logo |

### 3. `events`
Stores all events

| Field | What it stores |
|-------|----------------|
| id | Unique identifier |
| title | Event name |
| description | Full details |
| date | Start date & time |
| end_date | End date & time |
| venue | Location |
| fee | Ticket price (0 for free) |
| capacity | Max attendees |
| registered_count | Current registrations |
| organizer_id | Who created it |
| college_id | Which college |
| status | UPCOMING / ONGOING / COMPLETED / CANCELLED |
| category | Technology / Cultural / Sports / Workshop |
| image_url | Event poster |
| template_type | Which template was used (optional) |
| template_data | JSON field for template-specific data |

### NEW: Event Templates System

The frontend has **pre-built templates** for easy event creation. Backend should:
- Store `template_type` (optional) - which template was used
- Store `template_data` (JSON) - template-specific fields

**Available Templates:**

| Template | Category | Specific Fields |
|----------|----------|-----------------|
| **hackathon** | Technology | teamSize, maxTeams, duration, themes, prizePools, mentors, judgingCriteria, techStack |
| **workshop** | Workshop | instructor, instructorBio, skillLevel, prerequisites, topics, materials, laptopRequired |
| **tech_talk** | Technology | speaker, speakerTitle, speakerBio, topic, agenda, qnaSession |
| **cultural_fest** | Cultural | eventTypes, performances, judges, prizes, dressCode, foodStalls, schedule |
| **sports_event** | Sports | sportType, teamSize, maxTeams, format, prizes, eligibility, equipment |
| **competition** | Competition | competitionType, rounds, roundDetails, prizes, rules, judgingCriteria |
| **networking** | Networking | focus, companies, activities, resumeRequired, dressCode |
| **bootcamp** | Workshop | duration, dailyHours, curriculum, instructors, projects, certification |
| **custom** | Any | No pre-filled data |

**Banner Upload Rules:**
- A4 aspect ratio (210:297) = 0.707 width/height ratio
- Min: 595x842 pixels (72 DPI)
- Max: 2480x3508 pixels (300 DPI)
- Max file size: 5MB
- Allowed types: JPEG, PNG, WebP

### 4. `event_tags`
Tags for events (hackathon, workshop, etc.)

### 5. `registrations`
Event registrations & tickets

| Field | What it stores |
|-------|----------------|
| id | Unique identifier |
| user_id | Who registered |
| event_id | For which event |
| ticket_number | Unique ticket code (e.g., TF2026-0001) |
| amount | Amount paid |
| payment_status | PENDING / COMPLETED / FAILED / REFUNDED |
| registration_status | CONFIRMED / CANCELLED / ATTENDED |
| registered_at | When they registered |

### 6. `notifications`
User notifications

| Field | What it stores |
|-------|----------------|
| id | Unique identifier |
| user_id | For whom |
| type | Type of notification |
| title | Notification title |
| message | Full message |
| is_read | Has user seen it? |
| created_at | When created |

### 7. `activity_logs`
Admin activity tracking (who approved whom, etc.)

### 8. `notification_settings`
User preferences for email/push notifications

### 9. `refresh_tokens`
For JWT authentication token management

---

## 🔌 APIs Needed (52 Total)

### Authentication (7 APIs)

| API | Purpose |
|-----|---------|
| POST `/auth/signup` | Create new account |
| POST `/auth/login` | Login user |
| POST `/auth/logout` | Logout user |
| POST `/auth/refresh` | Refresh JWT token |
| POST `/auth/forgot-password` | Request password reset |
| POST `/auth/reset-password` | Reset password with token |
| POST `/auth/verify-email` | Verify email (optional) |

### User Profile (4 APIs)

| API | Purpose |
|-----|---------|
| GET `/users/profile` | Get current user's profile |
| PUT `/users/profile` | Update profile |
| PUT `/users/password` | Change password |
| GET `/users/{id}` | Get user by ID (Admin only) |

### Organizer Management - Admin Only (5 APIs)

| API | Purpose |
|-----|---------|
| GET `/organizers/pending` | List pending approval requests |
| GET `/organizers` | List all organizers of college |
| GET `/organizers/{id}` | Get organizer details |
| POST `/organizers/{id}/approve` | Approve an organizer |
| POST `/organizers/{id}/reject` | Reject an organizer |

### Events (9 APIs)

| API | Purpose |
|-----|---------|
| GET `/events` | List all public events (with filtering) |
| GET `/events/{id}` | Get event details |
| POST `/events` | Create new event |
| PUT `/events/{id}` | Update event |
| DELETE `/events/{id}` | Delete event (Admin only) |
| POST `/events/{id}/cancel` | Cancel event |
| GET `/events/my-events` | Get organizer's events |
| GET `/events/college` | Get all college events (Admin) |
| GET `/events/{id}/registrations` | Get event's registrations |

### Registrations & Tickets (6 APIs)

| API | Purpose |
|-----|---------|
| POST `/events/{id}/register` | Register for event |
| GET `/registrations/my-registrations` | Get user's registrations |
| GET `/registrations/{id}` | Get ticket details |
| POST `/registrations/{id}/cancel` | Cancel registration |
| POST `/registrations/{id}/attend` | Mark attendance |
| GET `/registrations/{id}/qr` | Get ticket QR code |

### Colleges (4 APIs)

| API | Purpose |
|-----|---------|
| GET `/colleges` | List all colleges |
| GET `/colleges/{id}` | Get college details |
| PUT `/colleges/{id}` | Update college (Admin only) |
| GET `/colleges/{id}/stats` | Get college statistics |

### Analytics & Reports (6 APIs)

| API | Purpose |
|-----|---------|
| GET `/analytics/dashboard` | Get dashboard stats |
| GET `/analytics/events` | Get events analytics (charts) |
| GET `/analytics/registrations` | Get registration analytics |
| GET `/analytics/revenue` | Get revenue analytics |
| POST `/reports/generate` | Generate report |
| GET `/export/{type}` | Export data (CSV/Excel/PDF) |

### Notifications (7 APIs)

| API | Purpose |
|-----|---------|
| GET `/notifications` | Get user's notifications |
| GET `/notifications/unread-count` | Get unread count |
| POST `/notifications/{id}/read` | Mark as read |
| POST `/notifications/mark-all-read` | Mark all as read |
| DELETE `/notifications/{id}` | Delete notification |
| GET `/notifications/settings` | Get notification settings |
| PUT `/notifications/settings` | Update notification settings |

### Activity Logs - Admin Only (1 API)

| API | Purpose |
|-----|---------|
| GET `/activity-logs` | Get admin activity logs |

### File Upload (3 APIs)

| API | Purpose |
|-----|---------|
| POST `/upload/id-card` | Upload college ID card |
| POST `/upload/event-image` | Upload event poster |
| POST `/upload/avatar` | Upload profile picture |

---

## 📧 Email Templates Needed (9 Templates)

1. **Platform Verification Request** - When admin signs up (sent to platform team)
2. **Welcome Email** - After signup
3. **Account Approved** - When admin account is approved
4. **Organizer Approved** - When organizer can create events
5. **Organizer Rejected** - When organizer request is rejected
6. **Event Registration Confirmation** - With ticket details
7. **Event Reminder** - Day before event
8. **Event Cancelled** - If event is cancelled
9. **Password Reset** - Reset password link

---

## ⏰ Background Jobs (Cron Jobs)

| Job | When | What it does |
|-----|------|--------------|
| Update Event Status | Every hour | Change UPCOMING → ONGOING → COMPLETED based on date |
| Send Event Reminders | Daily | Email users about events happening tomorrow |
| Clean Expired Tokens | Daily | Delete old refresh tokens |

---

## 🛡️ Security Rules

1. **Password Requirements:**
   - Minimum 8 characters
   - At least 1 uppercase letter
   - At least 1 lowercase letter
   - At least 1 number

2. **File Upload Rules:**
   - Types: JPEG, PNG, WebP only
   - Size: 500KB - 4MB

3. **Rate Limiting:**
   - Login: 5 attempts/minute
   - Signup: 3 attempts/minute
   - General API: 100 requests/minute

4. **College Scope:**
   - Admin can ONLY manage organizers from their own college
   - Admin can ONLY see events from their own college

---

## 🔧 Third-Party Services to Consider

| Service Type | Options |
|--------------|---------|
| **Payment Gateway** | Razorpay, PayU, Stripe |
| **File Storage** | AWS S3, Cloudinary |
| **Email Service** | SendGrid, AWS SES |
| **Push Notifications** | Firebase FCM |

---

## 📝 Quick Reference - Status Values

### User Status
- `ACTIVE` - Normal active user
- `PENDING_PLATFORM_VERIFICATION` - Admin waiting for platform approval
- `REJECTED` - Verification rejected
- `SUSPENDED` - Account suspended

### Event Status
- `UPCOMING` - Event hasn't started
- `ONGOING` - Event is happening now
- `COMPLETED` - Event finished
- `CANCELLED` - Event was cancelled

### Payment Status
- `PENDING` - Payment not completed
- `COMPLETED` - Payment successful
- `FAILED` - Payment failed
- `REFUNDED` - Money returned

### Registration Status
- `CONFIRMED` - Registration confirmed
- `CANCELLED` - User cancelled
- `ATTENDED` - User attended the event
- `NO_SHOW` - User didn't attend

---

## ✅ Development Priority

### Phase 1 - Core (Must Have)
1. Authentication (signup, login, logout)
2. User profile management
3. Events CRUD
4. Event registration
5. Basic notifications

### Phase 2 - Admin Features
1. Organizer approval/rejection
2. College management
3. Activity logs

### Phase 3 - Advanced
1. Analytics & reports
2. Export functionality
3. Email notifications
4. Payment integration

---

**Questions?** Coordinate with the frontend developer!
