// ============================================
// User Dashboard Components - Central Exports
// ============================================

// -------- Common Components --------
export {
    SectionHeader,
    LoadingState,
    CardSkeleton,
    StatSkeleton,
    ListItemSkeleton,
    TicketSkeleton,
    ErrorState,
    SearchBar
} from './common';

// -------- Dashboard Section --------
export {
    DashboardHome,
    WelcomeSection
} from './dashboard';

// -------- Stats Section --------
export {
    StatCard,
    StatsGrid,
    AnimatedCounter
} from './stats';

// -------- Events Section --------
export {
    EventsSection,
    EventCard,
    EventDetailModal,
    EventFilters,
    CategoryTabs,
    EmptyEventsState
} from './events';

// -------- Tickets Section --------
export {
    TicketsSection,
    TicketCard,
    TicketDetailModal,
    EmptyTicketsState
} from './tickets';

// -------- Registration Section --------
export {
    RegistrationModal
} from './registration';

// -------- Sidebar Components --------
export {
    MyTicketsWidget,
    DiscoverCard,
    QuickTips,
    UpcomingReminder
} from './sidebar';
