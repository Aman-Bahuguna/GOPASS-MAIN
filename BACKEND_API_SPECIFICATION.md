# GoPass Backend API Specification

> **Version:** 1.0.0  
> **Backend:** Java Spring Boot  
> **Database:** PostgreSQL  
> **Last Updated:** February 4, 2026

This document contains all the APIs and database structures required to build the backend for GoPass - a college event management platform.

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [User Roles & Permissions](#2-user-roles--permissions)
3. [Database Schema (PostgreSQL)](#3-database-schema-postgresql)
4. [API Endpoints](#4-api-endpoints)
   - [Authentication APIs](#41-authentication-apis)
   - [User Management APIs](#42-user-management-apis)
   - [Organizer Management APIs](#43-organizer-management-apis)
   - [Event APIs](#44-event-apis)
   - [Registration & Ticket APIs](#45-registration--ticket-apis)
   - [College APIs](#46-college-apis)
   - [Analytics & Reports APIs](#47-analytics--reports-apis)
   - [Notification APIs](#48-notification-apis)
   - [Activity Log APIs](#49-activity-log-apis)
   - [File Upload APIs](#410-file-upload-apis)
5. [Enums & Constants](#5-enums--constants)
6. [Error Handling](#6-error-handling)
7. [Security Requirements](#7-security-requirements)
8. [Email Templates Required](#8-email-templates-required)

---

## 1. System Overview

GoPass is a platform for managing college events with three user types:
- **Users** - Can browse and register for events
- **Organizers** - Can create and manage events (after admin approval)
- **Admins** - Can manage organizers and events for their college

### Verification Flow
```
ADMIN: Signup → Platform Verification (24-48hrs) → Active
ORGANIZER: Signup → Active → Needs Admin Approval to CREATE events
USER: Signup → Active (immediate)
```

---

## 2. User Roles & Permissions

### Role Definitions

| Permission | USER | ORGANIZER | ADMIN |
|------------|------|-----------|-------|
| Browse Events | ✅ | ✅ | ✅ |
| Register for Events | ✅ | ✅ | ✅ |
| View Registered Events | ✅ | ✅ | ✅ |
| Create Events | ❌ | ✅ (after approval) | ✅ |
| Manage Own Events | ❌ | ✅ | ✅ |
| Manage College Events | ❌ | ❌ | ✅ |
| Approve Organizers | ❌ | ❌ | ✅ |
| View Organizers | ❌ | ❌ | ✅ |
| Manage College Details | ❌ | ❌ | ✅ |
| Requires Platform Verification | ❌ | ❌ | ✅ |
| Requires Admin Approval (for events) | ❌ | ✅ | ❌ |

---

## 3. Database Schema (PostgreSQL)

### 3.1 Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('USER', 'ORGANIZER', 'ADMIN')),
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE' 
        CHECK (status IN ('ACTIVE', 'PENDING_PLATFORM_VERIFICATION', 'REJECTED', 'SUSPENDED')),
    position VARCHAR(50), -- For ADMIN: PROFESSOR, HOD, DEAN | For ORGANIZER: TEACHER, STUDENT
    avatar_url VARCHAR(500),
    id_card_url VARCHAR(500), -- Required for ADMIN and ORGANIZER
    
    -- For Organizers only
    is_admin_approved BOOLEAN DEFAULT FALSE,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    
    -- College association (for ADMIN and ORGANIZER)
    college_id UUID REFERENCES colleges(id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT valid_admin_position CHECK (
        role != 'ADMIN' OR position IN ('PROFESSOR', 'HOD', 'DEAN')
    ),
    CONSTRAINT valid_organizer_position CHECK (
        role != 'ORGANIZER' OR position IN ('TEACHER', 'STUDENT')
    )
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_college ON users(college_id);
```

### 3.2 Colleges Table

```sql
CREATE TABLE colleges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    state VARCHAR(50) NOT NULL,
    pincode VARCHAR(6) NOT NULL,
    address TEXT,
    website_url VARCHAR(500),
    logo_url VARCHAR(500),
    description TEXT,
    established_year INTEGER,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(name, state) -- Same college name can exist in different states
);

CREATE INDEX idx_colleges_name ON colleges(name);
CREATE INDEX idx_colleges_state ON colleges(state);
```

### 3.3 Events Table

```sql
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(300),
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    venue VARCHAR(300) NOT NULL,
    fee DECIMAL(10, 2) DEFAULT 0,
    capacity INTEGER NOT NULL,
    registered_count INTEGER DEFAULT 0,
    
    organizer_id UUID NOT NULL REFERENCES users(id),
    college_id UUID NOT NULL REFERENCES colleges(id),
    
    status VARCHAR(20) NOT NULL DEFAULT 'UPCOMING' 
        CHECK (status IN ('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED')),
    category VARCHAR(50) NOT NULL,
    image_url VARCHAR(500),
    
    is_featured BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE, -- Can be viewed by all users
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT valid_dates CHECK (end_date >= date),
    CONSTRAINT valid_capacity CHECK (capacity > 0)
);

CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_college ON events(college_id);
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_events_category ON events(category);
```

### 3.4 Event Tags Table (Many-to-Many)

```sql
CREATE TABLE event_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    tag VARCHAR(50) NOT NULL,
    
    UNIQUE(event_id, tag)
);

CREATE INDEX idx_event_tags_event ON event_tags(event_id);
CREATE INDEX idx_event_tags_tag ON event_tags(tag);
```

### 3.5 Registrations Table

```sql
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    event_id UUID NOT NULL REFERENCES events(id),
    
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    amount DECIMAL(10, 2) DEFAULT 0,
    payment_status VARCHAR(20) NOT NULL DEFAULT 'PENDING' 
        CHECK (payment_status IN ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED')),
    payment_id VARCHAR(100), -- External payment gateway ID
    payment_method VARCHAR(50),
    
    registration_status VARCHAR(20) DEFAULT 'CONFIRMED' 
        CHECK (registration_status IN ('CONFIRMED', 'CANCELLED', 'ATTENDED', 'NO_SHOW')),
    attended_at TIMESTAMP WITH TIME ZONE,
    
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    cancelled_at TIMESTAMP WITH TIME ZONE,
    
    UNIQUE(user_id, event_id)
);

CREATE INDEX idx_registrations_user ON registrations(user_id);
CREATE INDEX idx_registrations_event ON registrations(event_id);
CREATE INDEX idx_registrations_ticket ON registrations(ticket_number);
CREATE INDEX idx_registrations_payment_status ON registrations(payment_status);
```

### 3.6 Notifications Table

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    
    type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    
    is_read BOOLEAN DEFAULT FALSE,
    is_actionable BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500),
    action_data JSONB, -- Additional data for actions
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
```

### 3.7 Activity Logs Table

```sql
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id), -- Who performed the action
    
    action_type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    
    target_user_id UUID REFERENCES users(id), -- If action involves another user
    target_event_id UUID REFERENCES events(id), -- If action involves an event
    
    metadata JSONB, -- Additional context
    ip_address INET,
    user_agent VARCHAR(500),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_action_type ON activity_logs(action_type);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);
```

### 3.8 Notification Settings Table

```sql
CREATE TABLE notification_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id),
    
    email_new_event BOOLEAN DEFAULT TRUE,
    email_registration_confirm BOOLEAN DEFAULT TRUE,
    email_event_reminder BOOLEAN DEFAULT TRUE,
    email_event_update BOOLEAN DEFAULT TRUE,
    
    push_new_event BOOLEAN DEFAULT TRUE,
    push_registration_confirm BOOLEAN DEFAULT TRUE,
    push_event_reminder BOOLEAN DEFAULT TRUE,
    push_event_update BOOLEAN DEFAULT TRUE,
    
    -- Admin/Organizer specific
    email_new_organizer_request BOOLEAN DEFAULT TRUE,
    email_organizer_approved BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3.9 Refresh Tokens Table

```sql
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    device_info VARCHAR(500),
    ip_address INET,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    revoked_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
```

---

## 4. API Endpoints

> **Base URL:** `/api/v1`  
> **Content-Type:** `application/json`  
> **Authentication:** JWT Bearer Token (unless marked as Public)

---

### 4.1 Authentication APIs

#### 4.1.1 User Signup

```http
POST /auth/signup
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123",
  "fullName": "John Doe",
  "role": "USER | ORGANIZER | ADMIN",
  
  // Required for ORGANIZER and ADMIN
  "position": "TEACHER | STUDENT | PROFESSOR | HOD | DEAN",
  "collegeName": "XYZ Engineering College",
  "collegeState": "Maharashtra",
  "pincode": "400001",
  "idCardFile": "<multipart file>"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "ORGANIZER",
      "status": "ACTIVE",
      "isAdminApproved": false,
      "college": {
        "id": "uuid",
        "name": "XYZ Engineering College",
        "state": "Maharashtra"
      }
    },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "requiresVerification": false,
    "redirectTo": "/dashboard/organizer"
  }
}
```

**Business Logic:**
- USER: Status = ACTIVE immediately
- ORGANIZER: Status = ACTIVE, isAdminApproved = false
- ADMIN: Status = PENDING_PLATFORM_VERIFICATION

---

#### 4.1.2 User Login

```http
POST /auth/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "ORGANIZER",
      "status": "ACTIVE",
      "isAdminApproved": true,
      "college": { ... }
    },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "redirectTo": "/dashboard/organizer"
  }
}
```

---

#### 4.1.3 Refresh Token

```http
POST /auth/refresh
```

**Request Body:**

```json
{
  "refreshToken": "refresh_token"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_token",
    "refreshToken": "new_refresh_token"
  }
}
```

---

#### 4.1.4 Logout

```http
POST /auth/logout
🔒 Authenticated
```

**Request Body:**

```json
{
  "refreshToken": "refresh_token"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### 4.1.5 Verify Email (Optional)

```http
POST /auth/verify-email
```

**Request Body:**

```json
{
  "token": "verification_token"
}
```

---

#### 4.1.6 Forgot Password

```http
POST /auth/forgot-password
```

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

---

#### 4.1.7 Reset Password

```http
POST /auth/reset-password
```

**Request Body:**

```json
{
  "token": "reset_token",
  "newPassword": "NewSecurePass123"
}
```

---

### 4.2 User Management APIs

#### 4.2.1 Get Current User Profile

```http
GET /users/profile
🔒 Authenticated
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "ORGANIZER",
    "status": "ACTIVE",
    "position": "TEACHER",
    "avatarUrl": "https://...",
    "idCardUrl": "https://...",
    "isAdminApproved": true,
    "approvedBy": "uuid",
    "approvedAt": "2026-01-20T10:00:00Z",
    "college": {
      "id": "uuid",
      "name": "XYZ Engineering College",
      "state": "Maharashtra",
      "pincode": "400001"
    },
    "createdAt": "2026-01-15T10:00:00Z"
  }
}
```

---

#### 4.2.2 Update User Profile

```http
PUT /users/profile
🔒 Authenticated
```

**Request Body:**

```json
{
  "fullName": "John Doe Updated",
  "avatarUrl": "https://..."
}
```

---

#### 4.2.3 Update Password

```http
PUT /users/password
🔒 Authenticated
```

**Request Body:**

```json
{
  "currentPassword": "OldPassword123",
  "newPassword": "NewPassword123"
}
```

---

#### 4.2.4 Get User by ID (Admin only)

```http
GET /users/{userId}
🔒 Admin Only
```

---

### 4.3 Organizer Management APIs

> **Note:** These APIs are for Admin only

#### 4.3.1 Get Pending Organizers

```http
GET /organizers/pending
🔒 Admin Only
```

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)

**Business Logic:**
- Return organizers from the same college as the admin
- Filter: status = ACTIVE AND isAdminApproved = false

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "organizers": [
      {
        "id": "uuid",
        "fullName": "Rahul Verma",
        "email": "rahul.verma@xyz.edu.in",
        "position": "STUDENT",
        "status": "ACTIVE",
        "isAdminApproved": false,
        "idCardUrl": "https://...",
        "createdAt": "2026-01-25T15:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "totalPages": 1
    }
  }
}
```

---

#### 4.3.2 Get All Organizers (Same College)

```http
GET /organizers
🔒 Admin Only
```

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `status` (optional): APPROVED | PENDING | ALL
- `search` (optional): Search by name or email

---

#### 4.3.3 Approve Organizer

```http
POST /organizers/{organizerId}/approve
🔒 Admin Only
```

**Business Logic:**
- Set isAdminApproved = true
- Set approvedBy = current admin's ID
- Set approvedAt = now()
- Create activity log
- Send notification to organizer
- Send email to organizer

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Organizer approved successfully",
  "data": {
    "id": "uuid",
    "fullName": "Rahul Verma",
    "isAdminApproved": true,
    "approvedBy": "admin_uuid",
    "approvedAt": "2026-01-27T10:00:00Z"
  }
}
```

---

#### 4.3.4 Reject Organizer

```http
POST /organizers/{organizerId}/reject
🔒 Admin Only
```

**Request Body:**

```json
{
  "reason": "Invalid ID card provided"
}
```

**Business Logic:**
- Set status = REJECTED (or keep as ACTIVE but mark as rejected in separate field)
- Create activity log
- Send notification & email to organizer

---

#### 4.3.5 Get Organizer Details

```http
GET /organizers/{organizerId}
🔒 Admin Only
```

---

### 4.4 Event APIs

#### 4.4.1 Get All Public Events

```http
GET /events
🌐 Public
```

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `status` (optional): UPCOMING | ONGOING | COMPLETED | CANCELLED
- `category` (optional): Technology, Cultural, Sports, Workshop, etc.
- `college` (optional): Filter by college name
- `search` (optional): Search in title, description
- `startDate` (optional): Filter events starting after this date
- `endDate` (optional): Filter events ending before this date
- `featured` (optional): true/false
- `free` (optional): true/false (filter by fee = 0)
- `sortBy` (optional): date, registeredCount, title
- `sortOrder` (optional): asc, desc

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "uuid",
        "title": "Tech Fest 2026",
        "shortDescription": "Annual technology festival...",
        "date": "2026-02-15T10:00:00Z",
        "endDate": "2026-02-17T18:00:00Z",
        "venue": "Main Auditorium, XYZ Engineering College",
        "fee": 299,
        "capacity": 500,
        "registeredCount": 245,
        "spotsRemaining": 255,
        "status": "UPCOMING",
        "category": "Technology",
        "imageUrl": "https://...",
        "tags": ["hackathon", "workshop", "technology"],
        "college": {
          "id": "uuid",
          "name": "XYZ Engineering College"
        },
        "organizer": {
          "id": "uuid",
          "fullName": "Priya Patel"
        }
      }
    ],
    "pagination": { ... }
  }
}
```

---

#### 4.4.2 Get Event Details

```http
GET /events/{eventId}
🌐 Public
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Tech Fest 2026",
    "description": "Full description...",
    "shortDescription": "Short description...",
    "date": "2026-02-15T10:00:00Z",
    "endDate": "2026-02-17T18:00:00Z",
    "venue": "Main Auditorium, XYZ Engineering College",
    "fee": 299,
    "capacity": 500,
    "registeredCount": 245,
    "spotsRemaining": 255,
    "status": "UPCOMING",
    "category": "Technology",
    "imageUrl": "https://...",
    "isFeatured": true,
    "tags": ["hackathon", "workshop", "technology"],
    "college": {
      "id": "uuid",
      "name": "XYZ Engineering College",
      "state": "Maharashtra"
    },
    "organizer": {
      "id": "uuid",
      "fullName": "Priya Patel",
      "position": "TEACHER"
    },
    "createdAt": "2026-01-10T09:00:00Z"
  }
}
```

---

#### 4.4.3 Create Event

```http
POST /events
🔒 Organizer (approved) or Admin
```

**Request Body:**

```json
{
  "title": "AI/ML Workshop",
  "description": "Full description of the event...",
  "shortDescription": "Short summary",
  "date": "2026-03-01T09:00:00Z",
  "endDate": "2026-03-01T17:00:00Z",
  "venue": "Computer Science Lab",
  "fee": 499,
  "capacity": 50,
  "category": "Workshop",
  "imageUrl": "https://...",
  "tags": ["AI", "machine learning", "hands-on"],
  "isPublic": true
}
```

**Business Logic:**
- Organizer must have isAdminApproved = true
- Set college_id from the organizer's college
- Create activity log

---

#### 4.4.4 Update Event

```http
PUT /events/{eventId}
🔒 Organizer (owner) or Admin
```

**Request Body:**

```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "fee": 399,
  "capacity": 60
}
```

**Business Logic:**
- Organizer can only update their own events
- Admin can update any event in their college

---

#### 4.4.5 Cancel Event

```http
POST /events/{eventId}/cancel
🔒 Organizer (owner) or Admin
```

**Request Body:**

```json
{
  "reason": "Venue unavailable"
}
```

**Business Logic:**
- Set status = CANCELLED
- Notify all registered users
- Process refunds if applicable

---

#### 4.4.6 Delete Event

```http
DELETE /events/{eventId}
🔒 Admin Only
```

---

#### 4.4.7 Get My Events (Organizer)

```http
GET /events/my-events
🔒 Organizer Only
```

**Query Parameters:**
- `status` (optional): UPCOMING | ONGOING | COMPLETED | CANCELLED

---

#### 4.4.8 Get College Events (Admin)

```http
GET /events/college
🔒 Admin Only
```

Returns all events for the admin's college.

---

#### 4.4.9 Get Event Registrations

```http
GET /events/{eventId}/registrations
🔒 Organizer (owner) or Admin
```

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 20)
- `status` (optional): CONFIRMED | CANCELLED | ATTENDED | NO_SHOW

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "registrations": [
      {
        "id": "uuid",
        "ticketNumber": "TF2026-0001",
        "amount": 299,
        "paymentStatus": "COMPLETED",
        "registrationStatus": "CONFIRMED",
        "registeredAt": "2026-01-15T10:30:00Z",
        "user": {
          "id": "uuid",
          "fullName": "Amit Kumar",
          "email": "amit.kumar@gmail.com"
        }
      }
    ],
    "pagination": { ... }
  }
}
```

---

### 4.5 Registration & Ticket APIs

#### 4.5.1 Register for Event

```http
POST /events/{eventId}/register
🔒 Authenticated
```

**Request Body (for paid events):**

```json
{
  "paymentId": "payment_gateway_id",
  "paymentMethod": "UPI | CARD | NETBANKING"
}
```

**Business Logic:**
- Check if spots available (registeredCount < capacity)
- Check if user not already registered
- Generate unique ticket number (format: `EVENT_PREFIX-XXXX`)
- Increment registeredCount
- Create notification
- Send confirmation email

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "registration": {
      "id": "uuid",
      "ticketNumber": "TF2026-0246",
      "amount": 299,
      "paymentStatus": "COMPLETED",
      "registeredAt": "2026-01-27T10:00:00Z",
      "event": {
        "id": "uuid",
        "title": "Tech Fest 2026"
      }
    }
  }
}
```

---

#### 4.5.2 Get My Registrations

```http
GET /registrations/my-registrations
🔒 Authenticated
```

**Query Parameters:**
- `status` (optional): upcoming | past | cancelled

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "registrations": [
      {
        "id": "uuid",
        "ticketNumber": "TF2026-0246",
        "amount": 299,
        "paymentStatus": "COMPLETED",
        "registrationStatus": "CONFIRMED",
        "registeredAt": "2026-01-27T10:00:00Z",
        "event": {
          "id": "uuid",
          "title": "Tech Fest 2026",
          "date": "2026-02-15T10:00:00Z",
          "venue": "Main Auditorium",
          "imageUrl": "https://..."
        }
      }
    ]
  }
}
```

---

#### 4.5.3 Get Registration/Ticket Details

```http
GET /registrations/{registrationId}
🔒 Authenticated (owner)
```

---

#### 4.5.4 Cancel Registration

```http
POST /registrations/{registrationId}/cancel
🔒 Authenticated (owner)
```

**Business Logic:**
- Check if event hasn't started
- Process refund if applicable
- Decrement event's registeredCount
- Send cancellation email

---

#### 4.5.5 Mark Attendance (Organizer/Admin)

```http
POST /registrations/{registrationId}/attend
🔒 Organizer (event owner) or Admin
```

**Business Logic:**
- Set registrationStatus = ATTENDED
- Set attendedAt = now()

---

#### 4.5.6 Get Ticket QR Code

```http
GET /registrations/{registrationId}/qr
🔒 Authenticated (owner)
```

**Response:** Returns QR code image or data for ticket verification

---

### 4.6 College APIs

#### 4.6.1 Get Colleges List

```http
GET /colleges
🌐 Public
```

**Query Parameters:**
- `state` (optional)
- `search` (optional)

---

#### 4.6.2 Get College Details

```http
GET /colleges/{collegeId}
🌐 Public
```

---

#### 4.6.3 Update College Details

```http
PUT /colleges/{collegeId}
🔒 Admin (same college)
```

**Request Body:**

```json
{
  "name": "Updated College Name",
  "address": "Full Address",
  "websiteUrl": "https://...",
  "logoUrl": "https://...",
  "description": "About the college"
}
```

---

#### 4.6.4 Get College Stats

```http
GET /colleges/{collegeId}/stats
🔒 Admin (same college)
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "totalOrganizers": 15,
    "pendingApprovals": 3,
    "totalEvents": 25,
    "activeEvents": 5,
    "completedEvents": 18,
    "totalRegistrations": 1250,
    "thisMonthEvents": 4,
    "thisMonthRegistrations": 180
  }
}
```

---

### 4.7 Analytics & Reports APIs

#### 4.7.1 Get Dashboard Stats

```http
GET /analytics/dashboard
🔒 Authenticated
```

**Response varies by role:**

**For USER:**
```json
{
  "success": true,
  "data": {
    "upcomingEvents": 12,
    "registeredEvents": 5,
    "attendedEvents": 3
  }
}
```

**For ORGANIZER:**
```json
{
  "success": true,
  "data": {
    "activeEvents": 2,
    "pendingEvents": 1,
    "completedEvents": 5,
    "totalRegistrations": 450,
    "thisMonthRegistrations": 120,
    "totalRevenue": 45000,
    "thisMonthRevenue": 12000
  }
}
```

**For ADMIN:**
```json
{
  "success": true,
  "data": {
    "pendingApprovals": 3,
    "totalOrganizers": 15,
    "activeEvents": 5,
    "totalEvents": 25,
    "totalRegistrations": 1250,
    "thisMonthOrganizers": 4
  }
}
```

---

#### 4.7.2 Get Events Analytics

```http
GET /analytics/events
🔒 Organizer or Admin
```

**Query Parameters:**
- `period` (optional): week | month | quarter | year | all
- `groupBy` (optional): day | week | month

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "eventsOverTime": [
      { "label": "Jan", "value": 12 },
      { "label": "Feb", "value": 19 },
      { "label": "Mar", "value": 15 }
    ],
    "eventsByCategory": [
      { "label": "Technology", "value": 35 },
      { "label": "Cultural", "value": 25 },
      { "label": "Sports", "value": 20 }
    ]
  }
}
```

---

#### 4.7.3 Get Registrations Analytics

```http
GET /analytics/registrations
🔒 Organizer or Admin
```

**Query Parameters:**
- `period` (optional): week | month | quarter | year
- `eventId` (optional): Filter by specific event

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "registrationsOverTime": [
      { "label": "Week 1", "value": 120 },
      { "label": "Week 2", "value": 180 }
    ],
    "totalRegistrations": 450,
    "averageRegistrationsPerEvent": 45
  }
}
```

---

#### 4.7.4 Get Revenue Analytics (Organizer/Admin)

```http
GET /analytics/revenue
🔒 Organizer or Admin
```

**Query Parameters:**
- `period` (optional): week | month | quarter | year

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "totalRevenue": 125000,
    "thisMonthRevenue": 35000,
    "revenueByEvent": [
      { "eventId": "uuid", "eventTitle": "Tech Fest", "revenue": 73255 }
    ],
    "revenueOverTime": [
      { "label": "Jan", "value": 45000 },
      { "label": "Feb", "value": 80000 }
    ]
  }
}
```

---

#### 4.7.5 Generate Report

```http
POST /reports/generate
🔒 Admin Only
```

**Request Body:**

```json
{
  "reportType": "events | organizers | registrations | revenue",
  "startDate": "2026-01-01",
  "endDate": "2026-01-31",
  "format": "PDF | CSV | EXCEL"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "reportId": "uuid",
    "downloadUrl": "https://...",
    "expiresAt": "2026-02-04T12:00:00Z"
  }
}
```

---

#### 4.7.6 Export Data

```http
GET /export/{type}
🔒 Admin Only
```

**Path Parameters:**
- `type`: events | organizers | registrations

**Query Parameters:**
- `format`: csv | json | excel | pdf
- `startDate` (optional)
- `endDate` (optional)

---

### 4.8 Notification APIs

#### 4.8.1 Get Notifications

```http
GET /notifications
🔒 Authenticated
```

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 20)
- `unreadOnly` (optional): true/false

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "uuid",
        "type": "new_organizer",
        "title": "New Organizer Request",
        "message": "John Doe has requested to become an organizer",
        "isRead": false,
        "isActionable": true,
        "actionUrl": "/dashboard/admin?tab=organizers",
        "createdAt": "2026-01-27T10:00:00Z"
      }
    ],
    "unreadCount": 5,
    "pagination": { ... }
  }
}
```

---

#### 4.8.2 Get Unread Count

```http
GET /notifications/unread-count
🔒 Authenticated
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "unreadCount": 5
  }
}
```

---

#### 4.8.3 Mark Notification as Read

```http
POST /notifications/{notificationId}/read
🔒 Authenticated
```

---

#### 4.8.4 Mark All as Read

```http
POST /notifications/mark-all-read
🔒 Authenticated
```

---

#### 4.8.5 Delete Notification

```http
DELETE /notifications/{notificationId}
🔒 Authenticated
```

---

#### 4.8.6 Get Notification Settings

```http
GET /notifications/settings
🔒 Authenticated
```

---

#### 4.8.7 Update Notification Settings

```http
PUT /notifications/settings
🔒 Authenticated
```

**Request Body:**

```json
{
  "emailNewEvent": true,
  "emailRegistrationConfirm": true,
  "emailEventReminder": true,
  "pushNewEvent": false,
  "pushEventReminder": true
}
```

---

### 4.9 Activity Log APIs

#### 4.9.1 Get Activity Logs

```http
GET /activity-logs
🔒 Admin Only
```

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 20)
- `actionType` (optional): organizer_approved | organizer_rejected | event_created | etc.
- `startDate` (optional)
- `endDate` (optional)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "uuid",
        "actionType": "organizer_approved",
        "title": "Approved Organizer",
        "description": "You approved Rahul Verma as organizer",
        "targetUser": {
          "id": "uuid",
          "fullName": "Rahul Verma"
        },
        "createdAt": "2026-01-27T10:00:00Z"
      }
    ],
    "pagination": { ... }
  }
}
```

---

### 4.10 File Upload APIs

#### 4.10.1 Upload ID Card

```http
POST /upload/id-card
🔒 Authenticated
Content-Type: multipart/form-data
```

**Request:**
- `file`: Image file (JPEG, PNG, WebP)
- Min size: 500KB
- Max size: 4MB

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "url": "https://storage.gopass.com/id-cards/uuid.jpg",
    "filename": "id_card_xyz.jpg"
  }
}
```

---

#### 4.10.2 Upload Event Image

```http
POST /upload/event-image
🔒 Organizer or Admin
Content-Type: multipart/form-data
```

---

#### 4.10.3 Upload Avatar

```http
POST /upload/avatar
🔒 Authenticated
Content-Type: multipart/form-data
```

---

## 5. Enums & Constants

### 5.1 User Roles

```java
public enum Role {
    USER,
    ORGANIZER,
    ADMIN
}
```

### 5.2 User Status

```java
public enum UserStatus {
    ACTIVE,
    PENDING_PLATFORM_VERIFICATION,
    REJECTED,
    SUSPENDED
}
```

### 5.3 Event Status

```java
public enum EventStatus {
    UPCOMING,
    ONGOING,
    COMPLETED,
    CANCELLED
}
```

### 5.4 Payment Status

```java
public enum PaymentStatus {
    PENDING,
    COMPLETED,
    FAILED,
    REFUNDED
}
```

### 5.5 Registration Status

```java
public enum RegistrationStatus {
    CONFIRMED,
    CANCELLED,
    ATTENDED,
    NO_SHOW
}
```

### 5.6 Admin Positions

```java
public enum AdminPosition {
    PROFESSOR,
    HOD,
    DEAN
}
```

### 5.7 Organizer Positions

```java
public enum OrganizerPosition {
    TEACHER,
    STUDENT
}
```

### 5.8 Event Categories

```java
public enum EventCategory {
    TECHNOLOGY,
    CULTURAL,
    SPORTS,
    WORKSHOP,
    SEMINAR,
    COMPETITION,
    NETWORKING,
    OTHER
}
```

### 5.9 Notification Types

```java
public enum NotificationType {
    // User notifications
    REGISTRATION_CONFIRMED,
    EVENT_REMINDER,
    EVENT_CANCELLED,
    EVENT_UPDATED,
    
    // Organizer notifications
    NEW_REGISTRATION,
    EVENT_APPROVED,  // Future: if events need approval
    
    // Admin notifications
    NEW_ORGANIZER_REQUEST,
    ORGANIZER_APPROVED,
    NEW_EVENT_CREATED,
    
    // System notifications
    SYSTEM_UPDATE,
    ACCOUNT_VERIFIED
}
```

### 5.10 Activity Types

```java
public enum ActivityType {
    // Organizer actions
    ORGANIZER_APPROVED,
    ORGANIZER_REJECTED,
    
    // Event actions
    EVENT_CREATED,
    EVENT_UPDATED,
    EVENT_CANCELLED,
    EVENT_DELETED,
    
    // Registration actions
    REGISTRATION_CREATED,
    REGISTRATION_CANCELLED,
    ATTENDANCE_MARKED,
    
    // Profile actions
    PROFILE_UPDATED,
    PASSWORD_CHANGED,
    
    // Authentication
    LOGIN,
    LOGOUT
}
```

### 5.11 Indian States (for validation)

```java
public static final List<String> INDIAN_STATES = Arrays.asList(
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh"
);
```

---

## 6. Error Handling

### 6.1 Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": { ... }  // Optional additional info
  }
}
```

### 6.2 HTTP Status Codes

| Status Code | Usage |
|-------------|-------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Validation error |
| 401 | Unauthorized - Not authenticated |
| 403 | Forbidden - Not authorized |
| 404 | Not Found |
| 409 | Conflict - Duplicate resource |
| 422 | Unprocessable Entity |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

### 6.3 Error Codes

```java
public enum ErrorCode {
    // Authentication
    INVALID_CREDENTIALS,
    TOKEN_EXPIRED,
    TOKEN_INVALID,
    ACCOUNT_SUSPENDED,
    ACCOUNT_PENDING_VERIFICATION,
    
    // Validation
    VALIDATION_ERROR,
    INVALID_EMAIL,
    WEAK_PASSWORD,
    INVALID_FILE_TYPE,
    FILE_SIZE_EXCEEDED,
    
    // User
    USER_NOT_FOUND,
    EMAIL_ALREADY_EXISTS,
    ORGANIZER_NOT_APPROVED,
    
    // Event
    EVENT_NOT_FOUND,
    EVENT_FULL,
    EVENT_CANCELLED,
    ALREADY_REGISTERED,
    REGISTRATION_CLOSED,
    
    // Permission
    ACCESS_DENIED,
    NOT_OWNER,
    WRONG_COLLEGE,
    
    // General
    RESOURCE_NOT_FOUND,
    INTERNAL_ERROR
}
```

---

## 7. Security Requirements

### 7.1 Authentication

- Use JWT tokens for authentication
- Access token expiry: 15 minutes
- Refresh token expiry: 7 days
- Store refresh tokens in database (for revocation)
- Use secure HTTP-only cookies for refresh token (optional)

### 7.2 Password Requirements

```java
// Minimum 8 characters
// At least one uppercase letter
// At least one lowercase letter
// At least one number
// Pattern: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$
```

### 7.3 Rate Limiting

| Endpoint | Rate Limit |
|----------|------------|
| `/auth/login` | 5 requests/minute |
| `/auth/signup` | 3 requests/minute |
| `/auth/forgot-password` | 3 requests/hour |
| General API | 100 requests/minute |

### 7.4 CORS Configuration

Allow origins from frontend domains only.

### 7.5 Input Validation

- Validate all inputs (email format, lengths, etc.)
- Sanitize HTML in text fields
- Validate file types and sizes for uploads

### 7.6 College Scope Enforcement

- Admin can only manage organizers from their college
- Admin can only view/manage events from their college
- Organizer's events are automatically associated with their college

---

## 8. Email Templates Required

### 8.1 Platform Verification Request (ADMIN signup)

**To:** Platform Admin Team  
**Subject:** 🔔 New Platform Verification Request - GoPass

**Data needed:**
- User's full name
- Email
- Role
- Position
- College name
- State
- Pincode
- ID Card URL

---

### 8.2 Registration Confirmation

**To:** User  
**Subject:** ✅ Welcome to GoPass! Your Account is Being Verified

---

### 8.3 Account Approved

**To:** User  
**Subject:** 🎊 Congratulations! Your GoPass Account is Now Active

---

### 8.4 Organizer Approval (Admin → Organizer)

**To:** Organizer  
**Subject:** ✅ You can now create events on GoPass!

---

### 8.5 Organizer Rejection

**To:** Organizer  
**Subject:** Your GoPass organizer request status

---

### 8.6 Event Registration Confirmation

**To:** User  
**Subject:** 🎫 Ticket Confirmed - {Event Name}

**Data needed:**
- Event title
- Date & Time
- Venue
- Ticket number
- Amount paid
- QR Code for ticket

---

### 8.7 Event Reminder

**To:** Registered Users  
**Subject:** ⏰ Reminder: {Event Name} starts tomorrow!

---

### 8.8 Event Cancelled

**To:** Registered Users  
**Subject:** ❌ Event Cancelled - {Event Name}

---

### 8.9 Password Reset

**To:** User  
**Subject:** Reset your GoPass password

---

## 9. Scheduled Tasks (Cron Jobs)

1. **Update Event Status**
   - When: Every hour
   - Action: Update UPCOMING → ONGOING when event starts
   - Action: Update ONGOING → COMPLETED when event ends

2. **Send Event Reminders**
   - When: Once daily
   - Action: Send reminder emails for events happening next day

3. **Clean Up Expired Tokens**
   - When: Once daily
   - Action: Delete expired refresh tokens

4. **Generate Daily Reports (Optional)**
   - When: Daily at midnight
   - Action: Generate and store daily analytics

---

## 10. Additional Considerations

### 10.1 Payment Integration

Consider integrating with:
- Razorpay
- PayU
- Stripe

### 10.2 File Storage

Options:
- AWS S3
- Google Cloud Storage
- Cloudinary (for images)

### 10.3 Email Service

Options:
- SendGrid
- AWS SES
- Mailgun

### 10.4 Push Notifications

Options:
- Firebase Cloud Messaging (FCM)
- OneSignal

### 10.5 Search (Future Enhancement)

- Elasticsearch for advanced event search

---

## API Summary Table

| Category | Endpoint Count | Auth Required |
|----------|----------------|---------------|
| Authentication | 7 | Partial |
| User Management | 4 | Yes |
| Organizer Management | 5 | Admin Only |
| Events | 9 | Partial |
| Registrations | 6 | Yes |
| Colleges | 4 | Partial |
| Analytics & Reports | 6 | Yes |
| Notifications | 7 | Yes |
| Activity Logs | 1 | Admin Only |
| File Upload | 3 | Yes |
| **Total** | **52** | - |

---

**Document prepared for:** GoPass Frontend-Backend Integration  
**Frontend Stack:** React + Vite + Tailwind CSS  
**Backend Stack:** Java Spring Boot + PostgreSQL

---
