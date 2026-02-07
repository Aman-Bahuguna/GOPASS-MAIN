# Admin Dashboard - Section-wise Functionality TODO

> **Project**: GoPass Admin Panel
> **Last Updated**: February 4, 2026
> **Status**: In Progress

---

## 📋 Overview

The Admin Dashboard provides college administrators with tools to manage organizers, events, and college-related activities. This document outlines all the sections and their functionalities to be implemented in a component-wise manner.

---

## 🗂️ Folder Structure

```
src/pages/dashboards/admin/
├── AdminDashboard.jsx              # Main dashboard container
├── components/
│   ├── index.js                    # ✅ Component barrel export
│   │
│   ├── common/                     # ✅ Shared/Common Components
│   │   ├── SectionHeader.jsx       # ✅ Reusable section headers
│   │   ├── EmptyState.jsx          # ✅ Reusable empty states
│   │   ├── StatusBadge.jsx         # ✅ Status indicator badges
│   │   ├── ActionButton.jsx        # ✅ Reusable action buttons
│   │   ├── ConfirmationModal.jsx   # ✅ Confirmation dialog modal
│   │   ├── SearchInput.jsx         # ✅ Search input with clear button
│   │   ├── FilterDropdown.jsx      # ✅ Animated filter dropdown
│   │   └── index.js                # ✅ Barrel export
│   │
│   ├── stats/                      # ✅ Statistics Components
│   │   ├── StatCard.jsx            # ✅ Individual stat card (enhanced)
│   │   ├── StatsGrid.jsx           # ✅ Stats container grid
│   │   ├── AnimatedCounter.jsx     # ✅ Animated number counter (enhanced)
│   │   └── index.js                # ✅ Barrel export
│   │
│   ├── organizers/                 # ✅ Organizer Management
│   │   ├── PendingOrganizersSection.jsx    # ✅ Container with search/filter
│   │   ├── PendingOrganizerCard.jsx        # ✅ Enhanced pending card
│   │   ├── ApprovedOrganizersSection.jsx   # ✅ Container for approved list
│   │   ├── ApprovedOrganizerRow.jsx        # ✅ Row with actions menu
│   │   ├── OrganizerDetailsModal.jsx       # ✅ Full details modal with tabs
│   │   ├── RejectionReasonModal.jsx        # ✅ Rejection reason modal
│   │   └── index.js                        # ✅ Barrel export
│   │
│   ├── events/                     # ✅ Event Management
│   │   ├── CollegeEventsSection.jsx        # ✅ Container with filters
│   │   ├── CollegeEventCard.jsx            # ✅ Enhanced event card
│   │   ├── EventDetailsModal.jsx           # ✅ Event details with tabs
│   │   └── index.js                        # ✅ Barrel export
│   │
│   ├── college/                    # ✅ College Management
│   │   ├── CollegeInfoCard.jsx             # ✅ College details display
│   │   ├── CollegeEditModal.jsx            # ✅ Edit college details modal
│   │   ├── QuickStatsCard.jsx              # ✅ Quick statistics card
│   │   └── index.js                        # ✅ Barrel export
│   │
│   ├── reports/                    # ✅ Reports & Analytics
│   │   ├── ReportsSection.jsx              # ✅ Reports container
│   │   ├── ReportCard.jsx                  # ✅ Individual report card
│   │   ├── QuickMetrics.jsx                # ✅ Quick metrics grid
│   │   ├── GenerateReportModal.jsx         # ✅ Custom report generator
│   │   └── index.js                        # ✅ Barrel export
│   │
│   ├── activityLog/                # ✅ Activity Log
│   │   ├── ActivityLogSection.jsx          # ✅ Activity log container
│   │   ├── ActivityItem.jsx                # ✅ Individual activity item
│   │   └── index.js                        # ✅ Barrel export
│   │
│   ├── charts/                     # ✅ Charts (Phase 3)
│   │   ├── BarChart.jsx                    # ✅ Vertical/horizontal bar chart
│   │   ├── LineChart.jsx                   # ✅ Line chart with area fill
│   │   ├── PieChart.jsx                    # ✅ Pie/donut chart
│   │   ├── Sparkline.jsx                   # ✅ Mini inline chart
│   │   ├── AnalyticsDashboard.jsx          # ✅ Combined analytics view
│   │   └── index.js                        # ✅ Barrel export
│   │
│   ├── notifications/              # ✅ Notifications (Phase 3)
│   │   ├── NotificationsPanel.jsx          # ✅ Slide-out notifications
│   │   ├── NotificationItem.jsx            # ✅ Individual notification
│   │   ├── NotificationBell.jsx            # ✅ Bell with badge
│   │   ├── NotificationSettings.jsx        # ✅ Settings modal
│   │   └── index.js                        # ✅ Barrel export
│   │
│   └── welcome/                    # ✅ Welcome/Header
│       ├── WelcomeBanner.jsx               # ✅ Enhanced welcome banner
│       └── index.js                        # ✅ Barrel export
│
├── hooks/                          # ✅ Custom Hooks (Phase 3)
│   ├── useAdminHooks.js            # ✅ Combined admin hooks
│   └── index.js                    # ✅ Barrel export
│
└── utils/                          # ✅ Utilities (Phase 3)
    └── exportUtils.js              # ✅ Export utilities (CSV, PDF, Excel)
```

---

## 📌 Sections & Functionality

### 1️⃣ Welcome Banner Section ✅ (Existing)

**Component**: `WelcomeBanner.jsx`

**Features**:
- [x] Display admin name with greeting
- [x] Show current date/time
- [x] Display motivational message
- [x] Show admin's position badge
- [ ] Add quick action buttons (Add Organizer, View Reports)
- [ ] Show notification count badge

---

### 2️⃣ Statistics Section ✅ (Existing - Needs Enhancement)

**Components**: `StatsGrid.jsx`, `StatCard.jsx`, `AnimatedCounter.jsx`

**Stats Cards to Display**:
| Stat | Icon | Color | Status |
|------|------|-------|--------|
| Pending Approvals | Clock | Orange | ✅ Done |
| Total Organizers | Users | Blue | ✅ Done |
| Active Events | Calendar | Green | ✅ Done |
| Total Events | CheckCircle | Purple | ✅ Done |

**Enhancements Needed**:
- [ ] Add click handlers to navigate to respective sections
- [ ] Add hover tooltips with more details
- [ ] Add trend indicators (up/down arrows with percentage)
- [ ] Add loading skeleton states

---

### 3️⃣ Pending Organizers Section ✅ (Existing - Needs Enhancement)

**Components**: `PendingOrganizersSection.jsx`, `PendingOrganizerCard.jsx`, `OrganizerDetailsModal.jsx`

**Current Features**:
- [x] Display pending organizer cards
- [x] Show organizer name, email, position
- [x] Approve/Reject buttons
- [x] Empty state when no pending

**Functionality To Implement**:
- [x] View ID card image in modal
- [x] Expand/Collapse card details
- [ ] **Add Organizer Modal** - Manually add approved organizers
- [ ] **Bulk Actions** - Select multiple & approve/reject
- [ ] **Search & Filter** - Filter by name, position, date
- [ ] **Sorting** - Sort by date, name, position
- [ ] **Rejection Reason** - Modal to input rejection reason
- [ ] **Email Notification Toggle** - Notify organizer on action
- [ ] **Undo Action** - Temporary undo after approve/reject

**Actions**:
| Action | Handler | Confirmation | API Endpoint |
|--------|---------|--------------|--------------|
| Approve | `handleApprove(id)` | Optional | `/api/organizers/approve` |
| Reject | `handleReject(id, reason)` | Required | `/api/organizers/reject` |
| View Details | `handleViewDetails(id)` | No | Local |
| View ID Card | `handleViewIdCard(url)` | No | Local |

---

### 4️⃣ Approved Organizers Section ✅ (Existing - Needs Enhancement)

**Components**: `ApprovedOrganizersSection.jsx`, `ApprovedOrganizerRow.jsx`

**Current Features**:
- [x] List approved organizers
- [x] Show basic info (name, position, date)
- [x] View All button

**Functionality To Implement**:
- [ ] **Full Organizer List Modal** - View all with pagination
- [ ] **Search Organizers** - Search by name/email
- [ ] **View Organizer Events** - See events created by organizer
- [ ] **Revoke Approval** - Remove organizer privileges
- [ ] **Send Message** - Direct message to organizer
- [ ] **View Activity Log** - Recent actions by organizer
- [ ] **Export List** - Download as CSV/Excel

---

### 5️⃣ College Events Section ✅ (Existing - Needs Enhancement)

**Components**: `CollegeEventsSection.jsx`, `CollegeEventCard.jsx`, `EventDetailsModal.jsx`

**Current Features**:
- [x] Display college event cards
- [x] Show event name, date, status
- [x] Registration count

**Functionality To Implement**:
- [ ] **Event Details Modal** - Full event information
- [ ] **Filter by Status** - Upcoming, Ongoing, Completed, Cancelled
- [ ] **Filter by Category** - Workshop, Cultural, Tech, Sports
- [ ] **Sort Events** - By date, registrations, name
- [ ] **Cancel Event** - Admin power to cancel events
- [ ] **Feature Event** - Highlight specific events
- [ ] **View Registrations** - See who registered
- [ ] **Download Attendee List** - Export registrations
- [ ] **Event Analytics** - Views, clicks, conversion rate

---

### 6️⃣ College Details Section ✅ (Existing - Needs Enhancement)

**Components**: `CollegeInfoCard.jsx`, `CollegeEditModal.jsx`

**Current Features**:
- [x] Display college name
- [x] Show state and pincode
- [x] Show admin role/position
- [x] Edit button (non-functional)

**Functionality To Implement**:
- [ ] **Edit College Details Modal**
  - [ ] Update college name
  - [ ] Update address details
  - [ ] Update contact information
  - [ ] Upload college logo
  - [ ] Add college description
- [ ] **College Branding** - Set theme colors for events
- [ ] **Social Links** - Add college social media links

---

### 7️⃣ Quick Stats Card ✅ (Existing - Needs Enhancement)

**Components**: `QuickStatsCard.jsx`

**Current Features**:
- [x] Approval rate percentage
- [x] Average response time
- [x] Monthly new organizers

**Functionality To Implement**:
- [ ] Make stats interactive (clickable for details)
- [ ] Add time period selector (This week, month, year)
- [ ] Add comparison with previous period
- [ ] Show mini charts/sparklines

---

### 8️⃣ Reports & Analytics Section ✅ (Partially Implemented)

**Components**: `ReportsSection.jsx`, `ReportCard.jsx`, `QuickMetrics.jsx`, `GenerateReportModal.jsx`

**Reports To Generate**:
| Report | Description | Format | Status |
|--------|-------------|--------|--------|
| Event Summary | All events with stats | PDF/Excel | ✅ UI Done |
| Organizer Activity | Events per organizer | PDF/Excel | ✅ UI Done |
| Registration Trends | Over time analysis | Chart | ✅ UI Done |
| Revenue Report | Fee collected | PDF/Excel | ✅ UI Done |

**Functionality To Implement**:
- [x] **Report Dashboard** - Overview of key metrics
- [x] **Generate Report** - Custom date range reports modal
- [x] **Export Options** - PDF, Excel, CSV selection
- [ ] **Charts & Graphs** (Phase 3)
  - [ ] Events by month (Bar chart)
  - [ ] Registrations trend (Line chart)
  - [ ] Category distribution (Pie chart)
  - [ ] Top 5 events (Horizontal bar)
- [ ] **Email Report** - Schedule automated reports (Phase 3)

---

### 9️⃣ Activity Log Section ✅ (Implemented)

**Components**: `ActivityLogSection.jsx`, `ActivityItem.jsx`

**Functionality**:
- [x] **Recent Actions** - Last 20 activities
- [x] **Filter by Type** - Approvals, Rejections, Events
- [x] **Filter by Date** - Today, Week, Month, Custom
- [x] **Activity Types**:
  - [x] Organizer Approved/Rejected
  - [x] Event Created/Cancelled
  - [x] Settings Changed
  - [x] Profile Updated
- [x] **Pagination** - Load more on scroll

---

### 🔟 Notifications Section ✅ (Implemented)

**Components**: `NotificationsPanel.jsx`, `NotificationItem.jsx`, `NotificationBell.jsx`, `NotificationSettings.jsx`

**Functionality**:
- [x] **Notification Bell** - Badge with unread count, animated
- [x] **Notification Types**:
  - [x] New pending organizer
  - [x] Event created (needs attention)
  - [x] Organizer message
  - [x] System announcements
- [x] **Mark as Read** - Individual/All
- [x] **Notification Settings** - What to receive (modal)
- [x] **Slide-out Panel** - Full notification list with grouping by date

---

## 🎨 Design Guidelines

### Color Palette
| State | Primary | Light | Description |
|-------|---------|-------|-------------|
| Pending | `#F97316` | `#FFF7ED` | Orange for awaiting action |
| Approved | `#10B981` | `#ECFDF5` | Green for success |
| Rejected | `#EF4444` | `#FEF2F2` | Red for declined |
| Info | `#3B82F6` | `#EFF6FF` | Blue for information |
| Featured | `#8B5CF6` | `#F5F3FF` | Purple for highlights |

### Animation Guidelines
- Use `framer-motion` for all animations
- Entry animations: `fadeIn`, `slideUp`, `slideInRight`
- Hover effects: `scale(1.02)`, subtle shadow increase
- Stagger children with 0.05s delay
- Use `AnimatePresence` for exit animations

### Component Patterns
- All cards should have `rounded-2xl` corners
- Use `glassmorphism` for overlays
- Maintain consistent padding: `p-6` for cards
- Use `gap-5` or `gap-6` for grid spacing

---

## 🔧 Implementation Priority

### Phase 1 - Core Enhancements ✅ COMPLETED
1. [x] Organizer Details Modal with ID card view
2. [x] Rejection Reason Modal
3. [x] Search & Filter for pending organizers
4. [x] Event Details Modal
5. [x] College Edit Modal
6. [x] Common reusable components (SectionHeader, EmptyState, StatusBadge, ActionButton, ConfirmationModal, SearchInput, FilterDropdown)
7. [x] Stats components (AnimatedCounter, StatCard, StatsGrid)
8. [x] Welcome Banner enhancements

### Phase 2 - Extended Features ✅ COMPLETED
6. [x] Full Organizer List with pagination (AllOrganizersModal)
7. [x] Event Filters (status, category) - Done in CollegeEventsSection
8. [x] Bulk actions for organizers (BulkActionsBar)
9. [x] Activity Log section (ActivityLogSection, ActivityItem)
10. [x] Reports section basics (ReportsSection, ReportCard, QuickMetrics, GenerateReportModal)

### Phase 3 - Advanced Features ✅ COMPLETED
11. [x] Charts & Analytics (BarChart, LineChart, PieChart, Sparkline, AnalyticsDashboard)
12. [x] Export functionality (exportUtils.js - CSV, PDF, Excel, JSON)
13. [x] Notifications panel (NotificationsPanel, NotificationItem, NotificationBell, NotificationSettings)
14. [x] Custom Hooks (useAdminData, useOrganizerActions, useNotifications)
15. [ ] Email integration (Requires backend)
16. [ ] Performance optimizations (React.memo, lazy loading)

---

## 📝 Notes

- All components should be self-contained and reusable
- Use context for shared state when needed
- Implement proper loading and error states
- Add TypeScript types in future iteration
- Consider accessibility (keyboard navigation, screen readers)

---

## ✅ Completion Checklist

- [ ] All sections implemented
- [ ] All interactions working
- [ ] Animations smooth and consistent
- [ ] Responsive design tested
- [ ] Loading states implemented
- [ ] Error handling complete
- [ ] Code documented
- [ ] Performance optimized
