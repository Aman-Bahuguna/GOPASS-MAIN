import { motion } from 'framer-motion';
import WelcomeSection from './WelcomeSection';
import { StatsGrid } from '../stats';
import { EventsSection } from '../events';
import { AccountStatus } from '../sidebar';
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
 * @param {Function} [props.onViewAttendees] - View attendees handler for each event card
 */
export default function DashboardHome({
    user,
    stats,
    events,
    canCreate,
    isLoading = false,
    onNavigate,
    onViewAttendees,
    fullActivated,
    onActivateFull
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
            {!fullActivated && (
                <div className="mb-4 text-center">
                    <button
                        onClick={onActivateFull}
                        className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                    >
                        Activate Full Dashboard
                    </button>
                </div>
            )}

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
                        onViewAttendees={(event) => onViewAttendees?.(event)}
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
                </div>
            </div>
        </>
    );
}
