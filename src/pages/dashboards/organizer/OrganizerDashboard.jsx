import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Lock } from 'lucide-react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProfilePage from '../ProfilePage';
import { SettingsPage } from '../settings';
import OrganizerCreateEventForm from './components/OrganizerCreateEventForm';
import AttendeeSection from './components/attendees/AttendeeSection';
import { useAuth } from '../../../context/AuthContext';
import { getDashboardStats, getEventRegistrations } from '../../../api';
import { canOrganizerCreateEvents } from '../../../utils/roleConfig';
import { DashboardHome } from './components';
import { EventsSection } from './components/events';
import { fetchOrganizerEvents, selectAllEvents, selectEventsStatus } from '../../../store/slices/eventsSlice';

/**
 * OrganizerDashboard - Main dashboard container for organizers
 * Handles routing between dashboard sections and manages state
 */
export default function OrganizerDashboard() {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const allEvents = useSelector(selectAllEvents);
    const eventStatus = useSelector(selectEventsStatus);

    const [currentPage, setCurrentPage] = useState('home');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventAttendees, setEventAttendees] = useState([]);
    const canCreate = canOrganizerCreateEvents(user);

    // Fetch Events if not loaded
    useEffect(() => {
        if (eventStatus === 'idle' && user) {
            dispatch(fetchOrganizerEvents());
        }
    }, [dispatch, eventStatus, user]);

    // Derived state for organizer events
    const organizerEvents = useMemo(() => {
        if (!user) return [];
        return allEvents; // The backend already filters for this organizer
    }, [allEvents, user]);

    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (!user) return;
        const fetchStats = async () => {
            try {
                const s = await getDashboardStats(user);
                setStats(s);
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, [user]);

    // Combined loading state
    const isDashboardLoading = eventStatus === 'loading';

    // Navigation handler
    const handleNavigate = useCallback((page) => {
        // reset attendee selection when changing pages
        if (page !== 'attendees') {
            setSelectedEvent(null);
            setEventAttendees([]);
        }
        setCurrentPage(page);
    }, []);

    const handleViewEventAttendees = async (event) => {
        setSelectedEvent(event);
        handleNavigate('attendees');
        
        try {
            const regs = await getEventRegistrations(event.id);
            setEventAttendees(regs);
        } catch (err) {
            console.error(err);
        }
    };

    const handleBackToEvents = () => {
        setSelectedEvent(null);
        setEventAttendees([]);
    };


    // Get page title based on current page
    const getPageTitle = () => {
        switch (currentPage) {
            case 'profile':
                return 'My Profile';
            case 'settings':
                return 'Settings';
            case 'create-event':
                return 'Create Event';
            case 'my-events':
                return 'My Events';
            case 'analytics':
                return 'Analytics';
            case 'revenue':
                return 'Revenue Report';
            case 'attendees':
                return 'Attendee Management';
            case 'scanner':
                return 'Ticket Scanner';
            default:
                return 'Organizer Dashboard';
        }
    };

    // Render content based on current page
    const renderContent = () => {
        switch (currentPage) {
            case 'profile':
                return <ProfilePage onNavigate={handleNavigate} />;

            case 'settings':
                return <SettingsPage onNavigate={handleNavigate} />;

            case 'create-event':
                if (!canCreate) {
                    return (
                        <motion.div
                            className="flex flex-col items-center justify-center py-16"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
                                <Lock className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Event Creation Locked</h3>
                            <p className="text-slate-500 text-center max-w-md mb-6">
                                You need admin approval to create events. Please wait for your account to be approved.
                            </p>
                            <motion.button
                                onClick={() => handleNavigate('home')}
                                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Back to Dashboard
                            </motion.button>
                        </motion.div>
                    );
                }
                return <OrganizerCreateEventForm onNavigate={handleNavigate} />;

            case 'analytics':
                return (
                    <motion.div
                        className="flex flex-col items-center justify-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Analytics</h3>
                        <p className="text-slate-500">Coming soon...</p>
                    </motion.div>
                );

            case 'revenue':
                return (
                    <motion.div
                        className="flex flex-col items-center justify-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Revenue Report</h3>
                        <p className="text-slate-500">Coming soon...</p>
                    </motion.div>
                );

            case 'attendees':
                return (
                    <AttendeeSection
                        events={organizerEvents}
                        selectedEvent={selectedEvent}
                        attendees={eventAttendees}
                        onBack={handleBackToEvents}
                    />
                );

            case 'my-events':
                return (
                    <div className="py-6">
                        {/* only the event list, no stats or quick actions */}
                        <EventsSection
                            events={organizerEvents}
                            canCreate={canCreate}
                            isLoading={isDashboardLoading}
                            onCreateEvent={() => handleNavigate('create-event')}
                            onManageEvent={(event) => handleNavigate(`event/${event.id}`)}
                            onViewEvent={(event) => handleNavigate(`event/${event.id}/view`)}
                            onEditEvent={(event) => handleNavigate(`event/${event.id}/edit`)}
                            onDeleteEvent={(event) => console.log('Delete event:', event.id)}
                            onDuplicateEvent={(event) => console.log('Duplicate event:', event.id)}
                            onViewAttendees={handleViewEventAttendees}
                            onBulkDelete={() => {}}
                            onBulkExport={() => {}}
                        />
                    </div>
                );

            case 'scanner':
                return (
                    <motion.div
                        className="flex flex-col items-center justify-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Ticket Scanner</h3>
                        <p className="text-slate-500">Coming soon...</p>
                    </motion.div>
                );

            default:
                return (
                    <DashboardHome
                        user={user}
                        stats={stats}
                        events={organizerEvents}
                        canCreate={canCreate}
                        isLoading={isDashboardLoading}
                        onNavigate={handleNavigate}
                        onViewAttendees={handleViewEventAttendees}
                    />
                );
        }
    };

    return (
        <DashboardLayout title={getPageTitle()} onNavigate={handleNavigate} currentPage={currentPage}>
            {renderContent()}
        </DashboardLayout>
    );
}
