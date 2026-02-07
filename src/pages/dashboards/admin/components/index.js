// Admin Dashboard Components - Main Barrel Export
// This file provides centralized exports for all admin dashboard components

// Legacy Components (Root folder - for backward compatibility)
export { default as EmptyPendingState } from './EmptyPendingState';

// Common Components
export {
    SectionHeader,
    EmptyState,
    StatusBadge,
    ActionButton,
    ConfirmationModal,
    SearchInput,
    FilterDropdown
} from './common';

// Stats Components
export {
    AnimatedCounter,
    StatCard,
    StatsGrid
} from './stats';

// Organizer Components
export {
    PendingOrganizerCard,
    ApprovedOrganizerRow,
    PendingOrganizersSection,
    ApprovedOrganizersSection,
    OrganizerDetailsModal,
    RejectionReasonModal,
    AllOrganizersModal,
    BulkActionsBar
} from './organizers';

// Events Components
export {
    CollegeEventCard,
    CollegeEventsSection,
    EventDetailsModal
} from './events';

// College Components
export {
    CollegeInfoCard,
    CollegeEditModal,
    QuickStatsCard
} from './college';

// Welcome Components
export {
    WelcomeBanner
} from './welcome';

// Activity Log Components
export {
    ActivityLogSection,
    ActivityItem
} from './activityLog';

// Reports Components
export {
    ReportsSection,
    ReportCard,
    QuickMetrics,
    GenerateReportModal
} from './reports';

// Charts Components (Phase 3)
export {
    BarChart,
    LineChart,
    PieChart,
    Sparkline,
    AnalyticsDashboard
} from './charts';

// Notifications Components (Phase 3)
export {
    NotificationsPanel,
    NotificationItem,
    NotificationBell,
    NotificationSettings
} from './notifications';
