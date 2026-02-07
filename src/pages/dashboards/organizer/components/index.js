// ============================================
// Organizer Dashboard Components - Central Exports
// ============================================

// Common Components
export * from './common';

// Dashboard Home Components
export * from './dashboard';

// Stats Components
export * from './stats';

// Events Components
export * from './events';

// Sidebar Components
export * from './sidebar';

// Status Components
export * from './status';

// ============================================
// Legacy exports for backward compatibility
// (These point to the old location - should be migrated)
// ============================================

// Re-export commonly used components at root level for convenience
export { default as SectionHeader } from './common/SectionHeader';
export { default as LoadingState } from './common/LoadingState';
export { default as ErrorState } from './common/ErrorState';

export { default as DashboardHome } from './dashboard/DashboardHome';
export { default as WelcomeSection } from './dashboard/WelcomeSection';

export { default as StatsGrid } from './stats/StatsGrid';
export { default as StatCard } from './stats/StatCard';
export { default as AnimatedCounter } from './stats/AnimatedCounter';

export { default as EventsSection } from './events/EventsSection';
export { default as OrganizerEventCard } from './events/OrganizerEventCard';
export { default as EventFilters } from './events/EventFilters';
export { default as EventActions } from './events/EventActions';
export { default as EmptyEventsState } from './events/EmptyEventsState';

export { default as AccountStatus } from './sidebar/AccountStatus';
export { default as ProTips } from './sidebar/ProTips';
export { default as QuickActions } from './sidebar/QuickActions';

export { default as ApprovalStatusBanner } from './status/ApprovalStatusBanner';
export { default as VerificationProgress } from './status/VerificationProgress';
export { default as LockedEventCreation } from './status/LockedEventCreation';
