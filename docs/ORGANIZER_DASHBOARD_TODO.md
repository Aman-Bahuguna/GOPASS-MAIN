# 📋 Organizer Dashboard - Section-Wise Functionality TODO

> **Project**: GoPass - Event Management Platform  
> **Module**: Organizer Dashboard  
> **Created**: February 5, 2026  
> **Last Updated**: February 5, 2026

---

## 📁 Folder Structure

```
src/pages/dashboards/organizer/
├── OrganizerDashboard.jsx          # Main dashboard container
├── components/
│   ├── index.js                    # Central exports
│   │
│   ├── dashboard/                  # 🏠 Home Dashboard Section
│   │   ├── DashboardHome.jsx       # Main home view component
│   │   ├── WelcomeSection.jsx      # Welcome greeting with user info
│   │   └── index.js
│   │
│   ├── stats/                      # 📊 Statistics Section
│   │   ├── StatsGrid.jsx           # Stats container grid
│   │   ├── StatCard.jsx            # Individual stat card (existing)
│   │   ├── AnimatedCounter.jsx     # Counter animation (existing)
│   │   └── index.js
│   │
│   ├── events/                     # 🎪 Events Management Section
│   │   ├── EventsSection.jsx       # Events list container
│   │   ├── OrganizerEventCard.jsx  # Event card (existing)
│   │   ├── EventFilters.jsx        # Filter/search for events
│   │   ├── EventActions.jsx        # Bulk actions for events
│   │   ├── EmptyEventsState.jsx    # Empty state (existing)
│   │   └── index.js
│   │
│   ├── analytics/                  # 📈 Analytics Section
│   │   ├── AnalyticsSection.jsx    # Main analytics view
│   │   ├── RegistrationChart.jsx   # Registration trends chart
│   │   ├── RevenueChart.jsx        # Revenue analytics
│   │   ├── AttendanceChart.jsx     # Event attendance chart
│   │   └── index.js
│   │
│   ├── attendees/                  # 👥 Attendee Management Section
│   │   ├── AttendeeSection.jsx     # Attendee list container
│   │   ├── AttendeeCard.jsx        # Individual attendee card
│   │   ├── AttendeeFilters.jsx     # Search/filter attendees
│   │   ├── AttendeeExport.jsx      # Export attendee list
│   │   └── index.js
│   │
│   ├── tickets/                    # 🎟️ Ticket Management Section
│   │   ├── TicketsSection.jsx      # Tickets overview
│   │   ├── TicketScanner.jsx       # QR code scanner
│   │   ├── TicketStats.jsx         # Ticket statistics
│   │   └── index.js
│   │
│   ├── sidebar/                    # 📱 Sidebar Components
│   │   ├── AccountStatus.jsx       # Account verification status
│   │   ├── ProTips.jsx             # Pro tips card
│   │   ├── QuickActions.jsx        # Quick action buttons
│   │   └── index.js
│   │
│   ├── status/                     # ✅ Status & Verification Section
│   │   ├── ApprovalStatusBanner.jsx # Approval banner (existing)
│   │   ├── VerificationProgress.jsx # Verification steps
│   │   ├── LockedEventCreation.jsx  # Locked state (existing)
│   │   └── index.js
│   │
│   └── common/                     # 🔧 Common/Shared Components
│       ├── SectionHeader.jsx       # Reusable section header
│       ├── LoadingState.jsx        # Loading skeleton
│       ├── ErrorState.jsx          # Error display
│       └── index.js
```

---

## 🚀 Implementation Phases

### Phase 1: Core Structure Setup ✅ 
**Priority**: High | **Complexity**: Low

- [x] Create folder structure for components
- [x] Set up index.js exports for each folder
- [x] Migrate existing components to new structure

### Phase 2: Dashboard Home Section
**Priority**: High | **Complexity**: Medium

#### 2.1 Welcome Section
- [ ] Create `WelcomeSection.jsx`
  - Display personalized greeting (Good Morning/Afternoon/Evening)
  - Show user name and avatar
  - Display last login info
  - Quick motivation/tip of the day

#### 2.2 Dashboard Home
- [ ] Create `DashboardHome.jsx`
  - Integration point for all home sections
  - Responsive layout grid
  - Smooth animations on load

---

### Phase 3: Statistics Section
**Priority**: High | **Complexity**: Medium

#### 3.1 Stats Grid Enhancement
- [ ] Create `StatsGrid.jsx`
  - Responsive grid container
  - Animation stagger effect
  - Pull-to-refresh capability

#### 3.2 StatCard Enhancement (Existing)
- [ ] Enhance current `StatCard.jsx`
  - Add trend indicators (up/down arrows)
  - Sparkline mini-charts
  - Click to view detailed analytics
  - Tooltip with additional info

#### Stats to Display:
| Stat Name | Icon | Description |
|-----------|------|-------------|
| Active Events | Calendar | Currently running events |
| Pending Events | Clock | Scheduled for later |
| Completed Events | CheckCircle | Successfully completed |
| Total Registrations | Users | All time registrations |
| Revenue | DollarSign | Total earnings |
| Avg. Attendance | TrendingUp | Average attendance rate |

---

### Phase 4: Events Management Section
**Priority**: High | **Complexity**: High

#### 4.1 Events Section Container
- [ ] Create `EventsSection.jsx`
  - Tab navigation (All, Active, Pending, Completed, Draft)
  - Search functionality
  - Sort options (Date, Registrations, Revenue)
  - Grid/List view toggle

#### 4.2 Event Filters
- [ ] Create `EventFilters.jsx`
  - Date range filter
  - Status filter dropdown
  - Category filter
  - Clear all filters button

#### 4.3 Event Card Enhancement
- [ ] Enhance `OrganizerEventCard.jsx`
  - Add quick action menu (Edit, Duplicate, Delete, View)
  - Registration progress bar
  - Status badge (Live, Upcoming, Completed, Draft)
  - Revenue display
  - Click to expand details

#### 4.4 Event Actions
- [ ] Create `EventActions.jsx`
  - Select all/none
  - Bulk delete
  - Bulk status change
  - Export selected events

#### 4.5 Event List Features
| Feature | Description | Priority |
|---------|-------------|----------|
| Search | Search by event name/description | High |
| Filter by Status | Active, Pending, Completed, Draft | High |
| Sort | By date, registrations, revenue | Medium |
| Pagination | Load more / infinite scroll | Medium |
| Quick Edit | Inline editing for quick changes | Low |

---

### Phase 5: Analytics Section
**Priority**: Medium | **Complexity**: High

#### 5.1 Analytics Overview
- [ ] Create `AnalyticsSection.jsx`
  - Date range selector (7d, 30d, 90d, Custom)
  - Key metrics summary
  - Export analytics report

#### 5.2 Registration Chart
- [ ] Create `RegistrationChart.jsx`
  - Line chart for registration trends
  - Compare with previous period
  - Event-wise breakdown

#### 5.3 Revenue Chart
- [ ] Create `RevenueChart.jsx`
  - Bar chart for revenue by event
  - Total revenue trend line
  - Payment method breakdown

#### 5.4 Attendance Chart
- [ ] Create `AttendanceChart.jsx`
  - Pie/Doughnut chart for attendance rate
  - Show-up vs No-show ratio
  - Event comparison

#### Charts Requirements:
- Use **Recharts** or **Chart.js** library
- Responsive design
- Animated transitions
- Interactive tooltips
- Download as image option

---

### Phase 6: Attendee Management Section
**Priority**: Medium | **Complexity**: High

#### 6.1 Attendee Section
- [ ] Create `AttendeeSection.jsx`
  - Attendee list by event
  - Search by name/email
  - Filter by check-in status
  - Bulk actions

#### 6.2 Attendee Card
- [ ] Create `AttendeeCard.jsx`
  - User avatar and info
  - Registration date
  - Check-in status
  - Ticket type
  - Payment status

#### 6.3 Attendee Filters
- [ ] Create `AttendeeFilters.jsx`
  - Event selector dropdown
  - Check-in status filter
  - Ticket type filter
  - Date range filter

#### 6.4 Attendee Export
- [ ] Create `AttendeeExport.jsx`
  - Export to CSV
  - Export to Excel
  - Export to PDF
  - Select columns to export

#### Attendee Features:
| Feature | Description |
|---------|-------------|
| View All | List all attendees across events |
| By Event | Filter attendees by specific event |
| Check-in | Manual check-in/check-out |
| Communication | Send email to attendees |
| Export | Download attendee list |

---

### Phase 7: Ticket Management Section
**Priority**: Medium | **Complexity**: Medium

#### 7.1 Tickets Overview
- [ ] Create `TicketsSection.jsx`
  - Ticket sale statistics
  - By event breakdown
  - Recent ticket sales

#### 7.2 Ticket Scanner
- [ ] Create `TicketScanner.jsx`
  - QR code scanner integration
  - Manual ticket ID entry
  - Check-in confirmation
  - Invalid ticket handling

#### 7.3 Ticket Statistics
- [ ] Create `TicketStats.jsx`
  - Sold vs Available
  - Ticket type breakdown
  - Early bird vs Regular sales

---

### Phase 8: Sidebar Components
**Priority**: High | **Complexity**: Low

#### 8.1 Account Status (Existing - Enhance)
- [ ] Create `AccountStatus.jsx`
  - Verification progress bar
  - Step-by-step status
  - Action buttons for pending steps

#### 8.2 Pro Tips (Existing - Enhance)
- [ ] Create `ProTips.jsx`
  - Dynamic tips based on user activity
  - Tip dismissal with animation
  - "Show me how" links

#### 8.3 Quick Actions
- [ ] Create `QuickActions.jsx`
  - Create Event button
  - View Analytics shortcut
  - Revenue Report quick link
  - Attendee List shortcut
  - Settings link

---

### Phase 9: Status & Verification Section
**Priority**: High | **Complexity**: Low

#### 9.1 Approval Status Banner (Existing - Enhance)
- [ ] Enhance `ApprovalStatusBanner.jsx`
  - Progress indicator
  - Expected time remaining
  - Contact support option

#### 9.2 Verification Progress
- [ ] Create `VerificationProgress.jsx`
  - Step-by-step progress display
  - Current step highlight
  - Completed steps with checkmarks
  - Pending steps indication

---

### Phase 10: Common Components
**Priority**: High | **Complexity**: Low

#### 10.1 Section Header
- [ ] Create `SectionHeader.jsx`
  - Title with icon
  - Optional subtitle
  - Action button slot
  - View all link

#### 10.2 Loading State
- [ ] Create `LoadingState.jsx`
  - Skeleton loaders
  - Shimmer effect
  - Different variants (card, list, chart)

#### 10.3 Error State
- [ ] Create `ErrorState.jsx`
  - Error icon and message
  - Retry button
  - Contact support link

---

## 🎨 Design System

### Colors
```css
/* Primary Brand Colors */
--brand-100: #6366f1;  /* Indigo */
--brand-200: #8b5cf6;  /* Purple */

/* Status Colors */
--success: #10b981;    /* Emerald */
--warning: #f59e0b;    /* Amber */
--error: #ef4444;      /* Red */
--info: #3b82f6;       /* Blue */

/* Neutral Colors */
--slate-50: #f8fafc;
--slate-100: #f1f5f9;
--slate-500: #64748b;
--slate-900: #0f172a;
```

### Component Styling Guidelines
- Use `rounded-2xl` for cards
- Use `shadow-sm` with `border border-slate-200/60`
- Glassmorphism for premium feel: `bg-white/80 backdrop-blur-sm`
- Animation delays for stagger effects
- Framer Motion for all animations

---

## 🔌 API Integration Points

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/organizer/stats` | GET | Dashboard statistics |
| `/api/organizer/events` | GET | List all events |
| `/api/organizer/events/:id` | GET | Single event details |
| `/api/organizer/events` | POST | Create new event |
| `/api/organizer/events/:id` | PUT | Update event |
| `/api/organizer/events/:id` | DELETE | Delete event |
| `/api/organizer/attendees` | GET | List attendees |
| `/api/organizer/tickets/scan` | POST | Scan ticket |
| `/api/organizer/analytics` | GET | Analytics data |
| `/api/organizer/revenue` | GET | Revenue report |

---

## 📝 Implementation Order

### Sprint 1 (Current) - Foundation
1. ✅ Create folder structure
2. 🔄 Create common components (SectionHeader, LoadingState, ErrorState)
3. 🔄 Reorganize existing components into new structure
4. 🔄 Create index.js exports

### Sprint 2 - Core Features
5. 📋 Enhance Stats Section with StatsGrid
6. 📋 Build Events Section with filters
7. 📋 Update sidebar components

### Sprint 3 - Advanced Features
8. 📋 Build Analytics Section with charts
9. 📋 Implement Attendee Management
10. 📋 Add Ticket Management with scanner

### Sprint 4 - Polish & Enhancement
11. 📋 Add loading states everywhere
12. 📋 Implement error handling
13. 📋 Add animations and micro-interactions
14. 📋 Performance optimization

---

## ✅ Acceptance Criteria

### Per Component:
- [ ] Responsive on all screen sizes
- [ ] Smooth animations (Framer Motion)
- [ ] Loading states implemented
- [ ] Error handling in place
- [ ] Accessible (keyboard navigation, ARIA labels)
- [ ] Consistent with design system
- [ ] PropTypes or TypeScript interfaces

### Overall Dashboard:
- [ ] Fast initial load (< 2s)
- [ ] Smooth navigation between sections
- [ ] Data persists during navigation
- [ ] Real-time updates where applicable
- [ ] Export functionality works

---

## 🔧 Dependencies

```json
{
  "framer-motion": "^10.x",
  "recharts": "^2.x",
  "lucide-react": "^0.x",
  "date-fns": "^2.x",
  "react-hot-toast": "^2.x"
}
```

---

## 📌 Notes

1. **Mock Data**: Use `src/data/mockData.js` for development
2. **Auth Context**: Use `useAuth()` for user data
3. **Constants**: Status enums in `src/utils/constants.js`
4. **Role Config**: Check permissions via `src/utils/roleConfig.js`

---

## 🚦 Current Status

| Section | Status | Progress |
|---------|--------|----------|
| Folder Structure | ✅ Complete | 100% |
| Dashboard Home | ✅ Complete | 100% |
| Stats Section | ✅ Complete | 100% |
| Events Section | ✅ Complete | 100% |
| Analytics Section | 📋 Planned | 0% |
| Attendees Section | 📋 Planned | 0% |
| Tickets Section | 📋 Planned | 0% |
| Sidebar Components | ✅ Complete | 100% |
| Status Section | ✅ Complete | 100% |
| Common Components | ✅ Complete | 100% |

---

## ✅ Completed Components

### Phase 1: Core Structure ✅
- [x] Created folder structure for all components
- [x] Set up index.js exports for each folder
- [x] Organized components into logical sections

### Phase 2: Common Components ✅
- [x] `SectionHeader.jsx` - Reusable section headers with icons
- [x] `LoadingState.jsx` - Skeleton loaders with shimmer effect
- [x] `ErrorState.jsx` - Error display with retry options

### Phase 3: Stats Section ✅
- [x] `StatsGrid.jsx` - Grid container with refresh capability
- [x] `StatCard.jsx` - Enhanced stat cards with tooltips
- [x] `AnimatedCounter.jsx` - Smooth number animations

### Phase 4: Events Section ✅
- [x] `EventsSection.jsx` - Full events management with filtering
- [x] `OrganizerEventCard.jsx` - Enhanced event cards with actions
- [x] `EventFilters.jsx` - Search, filter, and sort functionality
- [x] `EventActions.jsx` - Bulk action toolbar
- [x] `EmptyEventsState.jsx` - Empty state with CTA

### Phase 5: Sidebar Components ✅
- [x] `AccountStatus.jsx` - Verification progress display
- [x] `ProTips.jsx` - Rotating tips carousel
- [x] `QuickActions.jsx` - Quick action buttons

### Phase 6: Status Section ✅
- [x] `ApprovalStatusBanner.jsx` - Dynamic approval status
- [x] `VerificationProgress.jsx` - Step-by-step progress
- [x] `LockedEventCreation.jsx` - Locked state display

### Phase 7: Dashboard Integration ✅
- [x] `WelcomeSection.jsx` - Personalized greeting
- [x] `DashboardHome.jsx` - Main home view integration
- [x] Updated `OrganizerDashboard.jsx` with new structure

---

*Last Updated: February 5, 2026*
