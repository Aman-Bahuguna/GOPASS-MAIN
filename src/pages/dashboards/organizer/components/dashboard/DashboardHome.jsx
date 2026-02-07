import { motion } from 'framer-motion';
import WelcomeSection from './WelcomeSection';
import { StatsGrid } from '../stats';
import { EventsSection } from '../events';
import { AccountStatus, ProTips, QuickActions } from '../sidebar';
import { ApprovalStatusBanner } from '../status';

/**
 * DashboardHome - Main home view for organizer dashboard
 * @param {Object} props
 * @param {Object} props.user - User object
 * @param {Object} props.stats - Dashboard statistics
 * @param {Array} props.events - List of events
 * @param {boolean} props.canCreate - Whether user can create events
 * @param {boolean} [props.isLoading] - Loading state
 * @param {Function} props.onNavigate - Navigation handler
 */
export default function DashboardHome({
    user,
    stats,
    events,
    canCreate,
    isLoading = false,
    onNavigate
}) {
    // Event handlers
    const handleCreateEvent = () => onNavigate?.('create-event');
    const handleViewAnalytics = () => onNavigate?.('analytics');
    const handleViewRevenue = () => onNavigate?.('revenue');
    const handleViewAttendees = () => onNavigate?.('attendees');
    const handleOpenScanner = () => onNavigate?.('scanner');
    const handleOpenSettings = () => onNavigate?.('settings');
    const handleManageEvent = (event) => onNavigate?.(`event/${event.id}`);

    return (
        <>
            {/* Approval Status Banner */}
            <ApprovalStatusBanner user={user} />

            {/* Welcome Section */}
            <WelcomeSection
                user={user}
                stats={canCreate ? { activeEvents: stats?.activeEvents, totalRegistrations: stats?.totalRegistrations } : null}
            />

            {/* Stats Grid */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <StatsGrid
                    stats={stats}
                    canCreate={canCreate}
                    isLoading={isLoading}
                    onStatClick={(statId) => {
                        // Handle stat click for detailed view
                        if (statId === 'registrations') onNavigate?.('attendees');
                        else if (statId === 'revenue') onNavigate?.('revenue');
                    }}
                />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Events Section - Takes 2 columns */}
                <div className="lg:col-span-2">
                    <EventsSection
                        events={events}
                        canCreate={canCreate}
                        isLoading={isLoading}
                        onCreateEvent={handleCreateEvent}
                        onManageEvent={handleManageEvent}
                        onViewEvent={(event) => onNavigate?.(`event/${event.id}/view`)}
                        onEditEvent={(event) => onNavigate?.(`event/${event.id}/edit`)}
                        onDeleteEvent={(event) => {
                            // Handle delete with confirmation
                            console.log('Delete event:', event.id);
                        }}
                        onDuplicateEvent={(event) => {
                            // Handle duplicate
                            console.log('Duplicate event:', event.id);
                        }}
                    />
                </div>

                {/* Sidebar - Takes 1 column */}
                <div className="space-y-6">
                    {/* Account Status */}
                    <AccountStatus
                        user={user}
                        canCreate={canCreate}
                        delay={0.5}
                    />

                    {/* Pro Tips */}
                    <ProTips delay={0.6} />

                    {/* Quick Actions */}
                    <QuickActions
                        canCreate={canCreate}
                        onCreateEvent={handleCreateEvent}
                        onViewAnalytics={handleViewAnalytics}
                        onViewRevenue={handleViewRevenue}
                        onViewAttendees={handleViewAttendees}
                        onOpenScanner={handleOpenScanner}
                        onOpenSettings={handleOpenSettings}
                        delay={0.7}
                    />
                </div>
            </div>
        </>
    );
}
