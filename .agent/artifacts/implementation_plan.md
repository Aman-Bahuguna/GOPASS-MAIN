# GoPass - College Event Management Platform Implementation Plan

## 📋 Overview
A modern, secure, role-based college event management platform with three distinct roles:
- **User (Student)**: Browse and register for events
- **Organizer (Teacher/Student)**: Create and manage events (requires Admin approval)
- **Admin (Professor/HOD/Dean)**: Manage organizers, approve events, oversee college activities

---

## 🏗️ Architecture

### Directory Structure
```
src/
├── components/
│   ├── auth/
│   │   ├── CollegeVerificationStep.jsx    # Step 3 for Admin/Organizer
│   │   └── FileUpload.jsx                 # ID card upload component
│   ├── dashboard/
│   │   ├── DashboardLayout.jsx            # Shared dashboard wrapper
│   │   ├── DashboardSidebar.jsx           # Navigation sidebar
│   │   ├── DashboardHeader.jsx            # Top header with user info
│   │   ├── StatsCard.jsx                  # Animated stat cards
│   │   └── StatusBadge.jsx                # Approval status indicators
│   ├── events/
│   │   ├── EventCard.jsx                  # Event display card
│   │   ├── EventForm.jsx                  # Create/Edit event form
│   │   ├── EventList.jsx                  # Events grid/list
│   │   └── EventRegistration.jsx          # Event registration modal
│   ├── modals/
│   │   ├── ApprovalModal.jsx              # Approve/Reject modal
│   │   ├── ConfirmationModal.jsx          # Generic confirmation
│   │   └── PaymentModal.jsx               # Payment processing
│   └── ui/
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Select.jsx
│       └── LoadingSpinner.jsx
├── context/
│   ├── AuthContext.jsx                    # Authentication state
│   └── NotificationContext.jsx            # Toast notifications
├── hooks/
│   ├── useAuth.js                         # Auth hook
│   ├── useRole.js                         # Role-based access
│   └── useProtectedRoute.js               # Route protection
├── pages/
│   ├── LandingPage.jsx                    # (existing)
│   ├── AuthPage.jsx                       # (existing)
│   ├── LoginPage.jsx                      # (existing)
│   ├── SignupPage.jsx                     # (modify for 3-step flow)
│   ├── dashboards/
│   │   ├── UserDashboard.jsx              # Student dashboard
│   │   ├── OrganizerDashboard.jsx         # Organizer dashboard
│   │   └── AdminDashboard.jsx             # Admin dashboard
│   └── PendingVerification.jsx            # Waiting for approval page
├── services/
│   ├── authService.js                     # Auth API calls
│   ├── eventService.js                    # Event API calls
│   └── verificationService.js             # Verification API calls
├── utils/
│   ├── roleConfig.js                      # Role permissions
│   ├── validators.js                      # Form validation
│   └── constants.js                       # App constants
└── data/
    └── mockData.js                        # Mock data for development
```

---

## 🔐 Role-Based Access Control

### Role Hierarchy
```
ADMIN (Highest)
  └── Can approve/reject Organizers
  └── Can view all events in college
  └── Can manage college details
  └── Requires platform verification

ORGANIZER
  └── Can create events (after Admin approval)
  └── Can manage own events
  └── Requires Admin approval from same college
  └── Requires platform verification

USER (Student)
  └── Can browse events
  └── Can register for events
  └── Can view registered events
  └── Standard email verification
```

### Protected Routes
```javascript
const routePermissions = {
  '/dashboard/admin': ['ADMIN'],
  '/dashboard/organizer': ['ORGANIZER'],
  '/dashboard/user': ['USER'],
  '/events/create': ['ORGANIZER'], // + approval check
  '/admin/organizers': ['ADMIN'],
  '/events': ['USER', 'ORGANIZER', 'ADMIN'],
};
```

---

## 📝 Registration Flow

### Step 1: Basic Information (All Roles)
- Full Name
- Email
- Password / Confirm Password

### Step 2: Role Selection & Security
- Account Type (User/Organizer/Admin)
- Terms acceptance

### Step 3: College Verification (Admin/Organizer Only)
- College Name
- College State
- College Pincode
- College ID Card Upload (500KB - 4MB)
- Position (Professor/HOD/Dean for Admin | Teacher/Student for Organizer)

### Post-Registration States
| Role | Email Verification | Platform Verification | Admin Approval |
|------|-------------------|----------------------|----------------|
| User | ✅ Required | ❌ Not needed | ❌ Not needed |
| Organizer | ❌ Not needed | ✅ Required | ✅ Required |
| Admin | ✅ Required | ✅ Required | ❌ Not needed |

---

## 🎨 Dashboard Designs

### User Dashboard
```
┌─────────────────────────────────────────────────────────────┐
│  🎫 GoPass                      🔔  👤 John Doe  ▼          │
├──────────┬──────────────────────────────────────────────────┤
│          │                                                  │
│ 📊 Home  │   Welcome, John! 👋                              │
│          │                                                  │
│ 🎪 Events│   ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│          │   │ 5        │ │ 3        │ │ 12       │        │
│ 📝 My    │   │ Upcoming │ │ Registered│ │ Attended │        │
│  Tickets │   └──────────┘ └──────────┘ └──────────┘        │
│          │                                                  │
│ 👤 Profile│   Upcoming Events                               │
│          │   ┌────────────────────────────────────────┐     │
│ 🚪 Logout│   │ 🎭 Tech Fest 2026                      │     │
│          │   │ Jan 30 | XYZ College | ₹299            │     │
│          │   │                    [Register Now]      │     │
│          │   └────────────────────────────────────────┘     │
└──────────┴──────────────────────────────────────────────────┘
```

### Organizer Dashboard
```
┌─────────────────────────────────────────────────────────────┐
│  🎫 GoPass                      🔔  👤 Sarah (Organizer) ▼  │
├──────────┬──────────────────────────────────────────────────┤
│          │                                                  │
│ 📊 Home  │   ┌─────────────────────────────────────────┐   │
│          │   │ ⏳ Approval Status: PENDING              │   │
│ ➕ Create │   │ Waiting for admin approval...           │   │
│   Event  │   │ Admin: Dr. Smith (XYZ College)          │   │
│          │   └─────────────────────────────────────────┘   │
│ 📋 My    │                                                  │
│  Events  │   ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│          │   │ 0        │ │ 0        │ │ 0        │        │
│ 👤 Profile│   │ Active   │ │ Pending  │ │ Completed│        │
│          │   └──────────┘ └──────────┘ └──────────┘        │
│ 🚪 Logout│                                                  │
│          │   🔒 Event creation locked until approved        │
└──────────┴──────────────────────────────────────────────────┘
```

### Admin Dashboard
```
┌─────────────────────────────────────────────────────────────┐
│  🎫 GoPass                    🔔  👤 Dr. Smith (Admin) ▼    │
├──────────┬──────────────────────────────────────────────────┤
│          │                                                  │
│ 📊 Home  │   ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│          │   │ 5        │ │ 12       │ │ 3        │        │
│ 👥 Manage │   │ Pending  │ │ Organizers│ │ Events   │        │
│ Organizers│  └──────────┘ └──────────┘ └──────────┘        │
│          │                                                  │
│ 🎪 College│   Pending Approvals                             │
│   Events │   ┌────────────────────────────────────────┐     │
│          │   │ 👤 Sarah Williams                      │     │
│ 🏫 College│   │ Student | Applied: Jan 25, 2026       │     │
│   Details│   │           [✓ Approve] [✗ Reject]       │     │
│          │   └────────────────────────────────────────┘     │
│ 🚪 Logout│                                                  │
└──────────┴──────────────────────────────────────────────────┘
```

---

## 🔄 Verification Flows

### Admin/Organizer Platform Verification
```
1. User submits registration with college details + ID card
2. System stores data with status: "PENDING_PLATFORM_VERIFICATION"
3. Email sent to platform team with:
   - User details
   - College information
   - ID card image attachment
4. User sees "PendingVerification" page
5. Platform team reviews and approves/rejects
6. User receives email notification
7. Account activated or registration rejected
```

### Organizer Admin Approval (After Platform Verification)
```
1. Organizer account activated by platform team
2. System identifies Admin(s) from same college (matching college name + state)
3. Approval request sent to matching Admin(s)
4. Admin receives notification in dashboard
5. Admin can view organizer details and approve/reject
6. Organizer receives notification of decision
7. If approved: Event creation unlocked
8. If rejected: Can reapply or contact support
```

---

## 📦 Implementation Phases

### Phase 1: Core Infrastructure ✅ Current
- [x] Project setup
- [x] Landing page
- [x] Basic auth pages
- [ ] Auth context & state management
- [ ] Protected route components
- [ ] Role configuration

### Phase 2: Enhanced Registration
- [ ] Update SignupPage with 3-step flow
- [ ] Create CollegeVerificationStep component
- [ ] Implement file upload with size validation
- [ ] Add position selection (Professor/HOD/Dean/Teacher/Student)
- [ ] Create PendingVerification page

### Phase 3: Dashboard Framework
- [ ] Create DashboardLayout component
- [ ] Build responsive sidebar
- [ ] Implement dashboard header
- [ ] Create animated stat cards
- [ ] Build status badge components

### Phase 4: User Dashboard
- [ ] Event browsing grid
- [ ] Event search & filters
- [ ] Event registration flow
- [ ] Payment integration
- [ ] Registered events view

### Phase 5: Organizer Dashboard
- [ ] Approval status display
- [ ] Event creation form (locked/unlocked states)
- [ ] My events management
- [ ] Event analytics

### Phase 6: Admin Dashboard
- [ ] Pending organizers list
- [ ] Approve/Reject functionality
- [ ] All organizers view
- [ ] College events overview
- [ ] College details management

### Phase 7: Animations & Polish
- [ ] Page transitions
- [ ] Dashboard card animations
- [ ] Modal animations
- [ ] Micro-interactions
- [ ] Loading states

---

## 🎬 Animation Specifications

### Page Transitions
```javascript
const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3, ease: 'easeInOut' }
};
```

### Dashboard Cards
```javascript
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.4 }
  }),
  hover: { y: -5, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }
};
```

### Status Changes
```javascript
const statusVariants = {
  pending: { backgroundColor: '#FEF3C7', color: '#92400E' },
  approved: { backgroundColor: '#D1FAE5', color: '#065F46' },
  rejected: { backgroundColor: '#FEE2E2', color: '#991B1B' }
};
```

---

## 📊 Mock Data Structure

### User Schema
```javascript
{
  id: 'usr_001',
  fullName: 'John Doe',
  email: 'john@example.com',
  role: 'USER' | 'ORGANIZER' | 'ADMIN',
  status: 'ACTIVE' | 'PENDING_PLATFORM_VERIFICATION' | 'PENDING_ADMIN_APPROVAL' | 'REJECTED',
  college: {
    name: 'XYZ Engineering College',
    state: 'Maharashtra',
    pincode: '400001'
  },
  position: 'Student' | 'Teacher' | 'Professor' | 'HOD' | 'Dean',
  idCardUrl: 'https://...',
  createdAt: '2026-01-27T00:00:00Z',
  approvedBy: 'admin_001' // For organizers
}
```

### Event Schema
```javascript
{
  id: 'evt_001',
  title: 'Tech Fest 2026',
  description: '...',
  date: '2026-01-30T10:00:00Z',
  venue: 'Main Auditorium',
  fee: 299,
  capacity: 500,
  registeredCount: 245,
  organizer: 'org_001',
  college: 'XYZ Engineering College',
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED',
  createdAt: '2026-01-20T00:00:00Z'
}
```

---

## 🚀 Getting Started

After implementation, the app will support:
1. Navigate to `/signup` for registration
2. Select role and complete multi-step form
3. Admin/Organizer: Wait for platform verification
4. Organizer: After platform approval, wait for college admin approval
5. Access role-specific dashboard
6. Full event management based on role permissions

---

*Last Updated: January 27, 2026*
