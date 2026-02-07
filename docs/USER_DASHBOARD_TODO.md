# 📋 User Dashboard - Section-Wise Functionality TODO

> **Project**: GoPass - Event Management Platform  
> **Module**: User Dashboard  
> **Created**: February 7, 2026  
> **Last Updated**: February 7, 2026

---

## 📁 Folder Structure

```
src/pages/dashboards/user/
├── UserDashboard.jsx               # Main dashboard container
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
│   │   ├── StatCard.jsx            # Individual stat card (migrate existing)
│   │   ├── AnimatedCounter.jsx     # Counter animation
│   │   └── index.js
│   │
│   ├── events/                     # 🎪 Events Discovery Section
│   │   ├── EventsSection.jsx       # Events list container
│   │   ├── EventCard.jsx           # Event card (migrate existing)
│   │   ├── EventFilters.jsx        # Filter/search for events
│   │   ├── CategoryTabs.jsx        # Category tabs (migrate existing)
│   │   ├── EventDetailModal.jsx    # Event details popup
│   │   ├── EmptyEventsState.jsx    # Empty state display
│   │   └── index.js
│   │
│   ├── tickets/                    # 🎟️ My Tickets Section
│   │   ├── TicketsSection.jsx      # Tickets container
│   │   ├── TicketCard.jsx          # Individual ticket (migrate existing)
│   │   ├── TicketDetailModal.jsx   # Ticket detail view with QR
│   │   ├── EmptyTicketsState.jsx   # No tickets state
│   │   └── index.js
│   │
│   ├── registration/               # 📝 Registration Section
│   │   ├── RegistrationModal.jsx   # Registration modal (migrate existing)
│   │   ├── RegistrationSteps.jsx   # Multi-step registration
│   │   ├── PaymentStep.jsx         # Payment processing step
│   │   ├── ConfirmationStep.jsx    # Success confirmation
│   │   └── index.js
│   │
│   ├── notifications/              # 🔔 Notifications Section
│   │   ├── NotificationsSection.jsx # Notifications container
│   │   ├── NotificationCard.jsx    # Individual notification
│   │   ├── NotificationBadge.jsx   # Unread count badge
│   │   └── index.js
│   │
│   ├── favorites/                  # ❤️ Favorites Section
│   │   ├── FavoritesSection.jsx    # Saved events container
│   │   ├── FavoriteCard.jsx        # Favorited event card
│   │   ├── EmptyFavoritesState.jsx # No favorites state
│   │   └── index.js
│   │
│   ├── history/                    # 📜 Event History Section
│   │   ├── HistorySection.jsx      # Past events container
│   │   ├── HistoryCard.jsx         # Past event card
│   │   ├── HistoryStats.jsx        # Attendance statistics
│   │   └── index.js
│   │
│   ├── sidebar/                    # 📱 Sidebar Components
│   │   ├── MyTicketsWidget.jsx     # Quick tickets preview
│   │   ├── DiscoverCard.jsx        # Discover events promotion
│   │   ├── QuickTips.jsx           # Pro tips card
│   │   ├── UpcomingReminder.jsx    # Next event reminder
│   │   └── index.js
│   │
│   └── common/                     # 🔧 Common/Shared Components
│       ├── SectionHeader.jsx       # Reusable section header
│       ├── LoadingState.jsx        # Loading skeleton
│       ├── ErrorState.jsx          # Error display
│       ├── SearchBar.jsx           # Reusable search input
│       └── index.js
```

---

## 🚀 Implementation Phases

### Phase 1: Core Structure Setup ✅
**Priority**: High | **Complexity**: Low

- [ ] Create folder structure for components
- [ ] Set up index.js exports for each folder
- [ ] Migrate existing components to new structure
- [ ] Update main UserDashboard.jsx imports

---

### Phase 2: Common Components
**Priority**: High | **Complexity**: Low

#### 2.1 Section Header
- [ ] Create `SectionHeader.jsx`
  - Title with icon
  - Optional subtitle
  - Action button slot (View All, Settings, etc.)
  - Consistent styling
  
#### 2.2 Loading State
- [ ] Create `LoadingState.jsx`
  - Skeleton loaders for different component shapes
  - Shimmer effect animation
  - Variants: card, list, grid, stat

#### 2.3 Error State
- [ ] Create `ErrorState.jsx`
  - Error icon and message
  - Retry button with callback
  - Contact support link

#### 2.4 Search Bar
- [ ] Create `SearchBar.jsx`
  - Search icon with input
  - Clear button when text present
  - Debounced search callback
  - Placeholder customization

---

### Phase 3: Statistics Section
**Priority**: High | **Complexity**: Medium

#### 3.1 Stats Grid
- [ ] Create `StatsGrid.jsx`
  - Responsive grid container (1/2/3 columns)
  - Animation stagger effect on load
  - Refresh capability

#### 3.2 Stat Card Enhancement
- [ ] Enhance `StatCard.jsx`
  - Glassmorphism design
  - Trend indicators (up/down arrows)
  - Color variants (blue, brand, green, amber)
  - Hover animations
  - Click to navigate

#### 3.3 Animated Counter
- [ ] Create `AnimatedCounter.jsx`
  - Smooth count-up animation
  - Number formatting (1K, 10K, etc.)
  - Duration customization

#### Stats to Display:
| Stat Name | Icon | Description |
|-----------|------|-------------|
| Upcoming Events | Calendar | Events you're registered for |
| My Registrations | Ticket | Total tickets purchased |
| Events Attended | CheckCircle2 | Completed event count |
| Saved Events | Heart | Favorited events |
| Points Earned | Award | Loyalty/gamification points |

---

### Phase 4: Events Discovery Section
**Priority**: High | **Complexity**: High

#### 4.1 Events Section Container
- [ ] Create `EventsSection.jsx`
  - Grid layout for event cards
  - Search integration
  - Category filtering
  - Sort options (Date, Price, Popularity)
  - Pagination or infinite scroll

#### 4.2 Event Filters
- [ ] Create `EventFilters.jsx`
  - Search by event name/description
  - Category dropdown/tabs
  - Date range picker
  - Price range filter (Free, Paid, Custom range)
  - Location filter
  - Clear all filters button

#### 4.3 Event Card Enhancement
- [ ] Enhance `EventCard.jsx`
  - Improved image handling with fallback
  - Like/Favorite toggle
  - Quick view on hover
  - Registration status badge
  - Spots left indicator
  - Price display (Free badge / Amount)
  - Share button

#### 4.4 Event Detail Modal
- [ ] Create `EventDetailModal.jsx`
  - Full event details view
  - Image gallery
  - Schedule/timeline
  - Venue with map link
  - Organizer info
  - Terms and conditions
  - Register button

#### 4.5 Category Tabs Enhancement
- [ ] Enhance `CategoryTabs.jsx`
  - Scrollable tabs for mobile
  - Active indicator animation
  - Event count badges
  - Icon support for each category

#### Event Categories:
| Category | Icon | Color |
|----------|------|-------|
| All | Grid | slate |
| Hackathon | Code | blue |
| Workshop | Wrench | green |
| Concert | Music | purple |
| Sports | Trophy | orange |
| Cultural | Palette | pink |
| Conference | Users | indigo |

---

### Phase 5: My Tickets Section
**Priority**: High | **Complexity**: High

#### 5.1 Tickets Section Container
- [ ] Create `TicketsSection.jsx`
  - Tab navigation (Upcoming, Past, All)
  - Sort by date
  - Search tickets

#### 5.2 Ticket Card Enhancement
- [ ] Enhance `TicketCard.jsx`
  - Event image thumbnail
  - Event title and date
  - Ticket number display
  - QR code preview
  - Check-in status indicator
  - Click to expand details

#### 5.3 Ticket Detail Modal
- [ ] Create `TicketDetailModal.jsx`
  - Large QR code display
  - Event complete details
  - Ticket information
  - Download ticket as PDF
  - Add to calendar button
  - Share ticket option
  - Check-in status

#### 5.4 Empty Tickets State
- [ ] Create `EmptyTicketsState.jsx`
  - Friendly illustration/icon
  - Encouraging message
  - CTA to browse events

#### Ticket Features:
| Feature | Description | Priority |
|---------|-------------|----------|
| QR Code | Dynamic QR for check-in | High |
| Download PDF | Offline ticket access | Medium |
| Calendar | Add event to calendar | Medium |
| Share | Share ticket with friends | Low |
| Transfer | Transfer ticket (future) | Low |

---

### Phase 6: Registration Section
**Priority**: High | **Complexity**: High

#### 6.1 Registration Modal Enhancement
- [ ] Enhance `RegistrationModal.jsx`
  - Improved modal animations
  - Step progress indicator
  - Better form validation
  - Error handling

#### 6.2 Multi-Step Registration
- [ ] Create `RegistrationSteps.jsx`
  - Step 1: Personal Details
  - Step 2: Ticket Selection
  - Step 3: Payment (if paid event)
  - Step 4: Confirmation
  - Progress bar

#### 6.3 Payment Step
- [ ] Create `PaymentStep.jsx`
  - Payment method selection
  - Card details input (mock)
  - UPI option display
  - Promo code input
  - Order summary
  - Security badges

#### 6.4 Confirmation Step
- [ ] Create `ConfirmationStep.jsx`
  - Success animation
  - Ticket preview
  - Next steps info
  - Add to calendar CTA
  - Share option

#### Registration Flow:
```
┌─────────────────────────────────────────────────────────┐
│  Step 1          Step 2          Step 3        Step 4   │
│  ────●───────────────●───────────────●────────────●──── │
│  Details        Ticket          Payment      Confirm    │
└─────────────────────────────────────────────────────────┘
```

---

### Phase 7: Notifications Section
**Priority**: Medium | **Complexity**: Medium

#### 7.1 Notifications Section
- [ ] Create `NotificationsSection.jsx`
  - Notifications list
  - Mark all as read
  - Filter by type
  - Clear old notifications

#### 7.2 Notification Card
- [ ] Create `NotificationCard.jsx`
  - Icon based on type
  - Title and message
  - Timestamp (relative)
  - Unread indicator
  - Action button (if applicable)
  - Swipe to dismiss

#### 7.3 Notification Badge
- [ ] Create `NotificationBadge.jsx`
  - Unread count display
  - Pulse animation for new
  - Position variants

#### Notification Types:
| Type | Icon | Color | Description |
|------|------|-------|-------------|
| Event Reminder | Bell | blue | 24h before event |
| Registration | CheckCircle | green | Successful registration |
| Event Update | Info | amber | Event details changed |
| Cancellation | XCircle | red | Event cancelled |
| Promotion | Sparkles | purple | Special offers |

---

### Phase 8: Favorites Section
**Priority**: Medium | **Complexity**: Low

#### 8.1 Favorites Section
- [ ] Create `FavoritesSection.jsx`
  - Saved events grid
  - Sort by added date
  - Quick filter

#### 8.2 Favorite Card
- [ ] Create `FavoriteCard.jsx`
  - Similar to EventCard but lighter
  - Remove from favorites button
  - Registration status
  - Quick register option

#### 8.3 Empty Favorites State
- [ ] Create `EmptyFavoritesState.jsx`
  - Heart illustration
  - Encouraging message
  - Browse events CTA

---

### Phase 9: Event History Section
**Priority**: Medium | **Complexity**: Medium

#### 9.1 History Section
- [ ] Create `HistorySection.jsx`
  - Past events list
  - Filter by year/month
  - Statistics overview

#### 9.2 History Card
- [ ] Create `HistoryCard.jsx`
  - Event snapshot
  - Attended badge
  - Rating option
  - Photo memories link

#### 9.3 History Stats
- [ ] Create `HistoryStats.jsx`
  - Total events attended
  - Events by category pie chart
  - This year vs last year
  - Badges earned

---

### Phase 10: Sidebar Components
**Priority**: Medium | **Complexity**: Low

#### 10.1 My Tickets Widget
- [ ] Create `MyTicketsWidget.jsx`
  - Next 3 upcoming tickets
  - Quick view ticket option
  - View all tickets link
  - Collapsed/expanded state

#### 10.2 Discover Card
- [ ] Create `DiscoverCard.jsx`
  - Gradient background
  - Promotional content
  - Explore events CTA
  - Animated decorations

#### 10.3 Quick Tips
- [ ] Create `QuickTips.jsx`
  - Rotating tips carousel
  - Contextual tips based on activity
  - Dismiss functionality
  - "Show me how" links

#### 10.4 Upcoming Reminder
- [ ] Create `UpcomingReminder.jsx`
  - Next event countdown
  - Event quick info
  - Get directions link
  - Add to calendar

---

## 🎨 Design System

### Colors
```css
/* Primary Brand Colors */
--brand-100: #6366f1;  /* Indigo */
--brand-200: #8b5cf6;  /* Purple */
--brand-300: #a78bfa;  /* Light Purple */

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

/* Accent Colors */
--pink: #ec4899;
--orange: #f97316;
--cyan: #06b6d4;
```

### Component Styling Guidelines
- Use `rounded-2xl` for cards
- Use `shadow-sm` with `border border-slate-200/60`
- Glassmorphism for premium feel: `bg-white/80 backdrop-blur-sm`
- Animation delays for stagger effects
- Framer Motion for all animations
- Hover states with subtle shadows and transforms

### Animation Patterns
```jsx
// Card entrance animation
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.05, duration: 0.4 }}

// Hover lift effect
whileHover={{ y: -8, scale: 1.02 }}
transition={{ type: "spring", stiffness: 300 }}

// Button press effect
whileTap={{ scale: 0.98 }}
```

---

## 🔌 API Integration Points

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/user/dashboard` | GET | Dashboard statistics |
| `/api/events` | GET | List available events |
| `/api/events/:id` | GET | Single event details |
| `/api/events/:id/register` | POST | Register for event |
| `/api/user/registrations` | GET | User's registrations |
| `/api/user/tickets` | GET | User's tickets |
| `/api/user/tickets/:id` | GET | Single ticket with QR |
| `/api/user/favorites` | GET | Favorited events |
| `/api/user/favorites/:eventId` | POST | Add to favorites |
| `/api/user/favorites/:eventId` | DELETE | Remove from favorites |
| `/api/user/notifications` | GET | User notifications |
| `/api/user/history` | GET | Event history |

---

## 📝 Implementation Order

### Sprint 1 (Current) - Foundation
1. 📋 Create folder structure
2. 📋 Create common components (SectionHeader, LoadingState, ErrorState)
3. 📋 Migrate existing components to new structure
4. 📋 Update index.js exports

### Sprint 2 - Core Features
5. 📋 Enhance Stats Section with StatsGrid
6. 📋 Build Events Section with filters and search
7. 📋 Enhance My Tickets section

### Sprint 3 - Advanced Features
8. 📋 Implement full Registration flow
9. 📋 Build Ticket Detail Modal with QR
10. 📋 Create Event Detail Modal

### Sprint 4 - Enhanced UX
11. 📋 Add Notifications system
12. 📋 Implement Favorites functionality
13. 📋 Build Event History section

### Sprint 5 - Polish & Optimization
14. 📋 Add loading states everywhere
15. 📋 Implement error handling
16. 📋 Add animations and micro-interactions
17. 📋 Performance optimization

---

## ✅ Acceptance Criteria

### Per Component:
- [ ] Responsive on all screen sizes (mobile-first)
- [ ] Smooth animations (Framer Motion)
- [ ] Loading states implemented
- [ ] Error handling in place
- [ ] Accessible (keyboard navigation, ARIA labels)
- [ ] Consistent with design system
- [ ] PropTypes defined

### Overall Dashboard:
- [ ] Fast initial load (< 2s)
- [ ] Smooth navigation between sections
- [ ] Data persists during navigation
- [ ] Real-time updates where applicable
- [ ] Offline-friendly ticket viewing

---

## 🔧 Dependencies

```json
{
  "framer-motion": "^10.x",
  "lucide-react": "^0.x",
  "date-fns": "^2.x",
  "react-hot-toast": "^2.x",
  "qrcode.react": "^3.x"
}
```

---

## 📌 Notes

1. **Mock Data**: Use `src/data/mockData.js` for development
2. **Auth Context**: Use `useAuth()` for user data
3. **Constants**: Status enums in `src/utils/constants.js`
4. **Role Config**: Check permissions via `src/utils/roleConfig.js`
5. **Existing Components**: Migrate carefully to preserve functionality

---

## 🚦 Current Status

| Section | Status | Progress |
|---------|--------|----------|
| Folder Structure | ✅ Complete | 100% |
| Common Components | ✅ Complete | 100% |
| Dashboard Home | ✅ Complete | 100% |
| Stats Section | ✅ Complete | 100% |
| Events Section | ✅ Complete | 100% |
| Tickets Section | ✅ Complete | 100% |
| Registration Section | ✅ Migrated | 100% |
| Notifications Section | 📋 Planned | 0% |
| Favorites Section | 📋 Planned | 0% |
| History Section | 📋 Planned | 0% |
| Sidebar Components | ✅ Complete | 100% |

---

## 🔄 Migration Checklist

### Existing Components to Migrate:
- [x] `StatCard.jsx` → `components/stats/StatCard.jsx`
- [x] `EventCard.jsx` → `components/events/EventCard.jsx`
- [x] `TicketCard.jsx` → `components/tickets/TicketCard.jsx`
- [x] `RegistrationModal.jsx` → `components/registration/RegistrationModal.jsx`
- [x] `CategoryTabs.jsx` → `components/events/CategoryTabs.jsx`

### New Folders Created:
- [x] `components/dashboard/`
- [x] `components/stats/`
- [x] `components/events/`
- [x] `components/tickets/`
- [x] `components/registration/`
- [x] `components/notifications/`
- [x] `components/favorites/`
- [x] `components/history/`
- [x] `components/sidebar/`
- [x] `components/common/`

### Components Created:
#### Common
- [x] `SectionHeader.jsx` - Reusable section headers with icons
- [x] `LoadingState.jsx` - Skeleton loaders with shimmer effect
- [x] `ErrorState.jsx` - Error display with retry options
- [x] `SearchBar.jsx` - Debounced search input

#### Stats
- [x] `StatCard.jsx` - Enhanced stat cards with animations
- [x] `StatsGrid.jsx` - Grid container with refresh
- [x] `AnimatedCounter.jsx` - Smooth number animations

#### Events
- [x] `EventsSection.jsx` - Full events management
- [x] `EventCard.jsx` - Enhanced event cards
- [x] `EventFilters.jsx` - Search, filter, and sort
- [x] `CategoryTabs.jsx` - Scrollable category tabs
- [x] `EmptyEventsState.jsx` - Empty state display

#### Tickets
- [x] `TicketsSection.jsx` - Tickets container with tabs
- [x] `TicketCard.jsx` - Enhanced ticket cards
- [x] `TicketDetailModal.jsx` - Full ticket view with QR
- [x] `EmptyTicketsState.jsx` - No tickets state

#### Sidebar
- [x] `MyTicketsWidget.jsx` - Quick tickets preview
- [x] `DiscoverCard.jsx` - Promotional card
- [x] `QuickTips.jsx` - Rotating tips carousel
- [x] `UpcomingReminder.jsx` - Next event countdown

#### Dashboard
- [x] `DashboardHome.jsx` - Main home integration
- [x] `WelcomeSection.jsx` - Personalized greeting

---

*Last Updated: February 7, 2026*
