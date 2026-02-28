import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProfilePage from '../ProfilePage';
import { SettingsPage } from '../settings';
import { useAuth } from '../../../context/AuthContext';
import { getUserRegistrations, getDashboardStats } from '../../../api';
import { EVENT_STATUS } from '../../../utils/constants';
import { fetchEvents, selectAllEvents, selectEventsStatus, resetStatus } from '../../../store/slices/eventsSlice';

// Import components from new structure
import {
    DashboardHome,
    EventsSection,
    TicketsSection,
    RegistrationModal,
    SectionHeader
} from './components';
import { Calendar, Ticket, Star, Heart } from 'lucide-react';

/**
 * Main User Dashboard Component
 * Container for the user dashboard pages with navigation
 */
export default function UserDashboard() {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState('home');
    const [favorites, setFavorites] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [registrations, setRegistrations] = useState([]);
    const [stats, setStats] = useState(null);
    const [isDataLoading, setIsDataLoading] = useState(false);

    // Redux State
    const events = useSelector(selectAllEvents);
    const eventStatus = useSelector(selectEventsStatus);

    // Fetch events once on mount
    useEffect(() => {
        if (user) {
            console.log('DEBUG [UserDashboard]: Triggering fetchEvents for user:', user.email);
            dispatch(fetchEvents());
        }
    }, [user, dispatch]); // Fetch on mount and when user changes

    useEffect(() => {
        console.log('DEBUG [UserDashboard]: current events:', events);
        console.log('DEBUG [UserDashboard]: event status:', eventStatus);
    }, [events, eventStatus]);

    // Fetch dashboard data (stats & registrations)
    const fetchDashboardData = useCallback(async () => {
        if (!user) return;

        setIsDataLoading(true);
        try {
            const [statsData, regsData] = await Promise.all([
                getDashboardStats(user),
                getUserRegistrations()
            ]);
            setStats(statsData);
            setRegistrations(regsData);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsDataLoading(false);
        }
    }, [user]);

    // Fetch data on mount or user change
    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const loading = eventStatus === 'loading' || isDataLoading;

    // Get all events for the events page
    const allEvents = events;

    // Get upcoming events for the home page
    const upcomingEvents = useMemo(() =>
        events.filter(e => e.status === EVENT_STATUS.UPCOMING),
        [events]);

    // Get favorited events
    const favoritedEvents = useMemo(() =>
        allEvents.filter(e => favorites.includes(e.id)),
        [allEvents, favorites]);

    // Enrich registrations with full event data from the store
    const enrichedRegistrations = useMemo(() => {
        if (!Array.isArray(registrations)) return [];
        return registrations.map(reg => {
            // Already has event object? (Some backends might deliver it)
            if (reg.event && typeof reg.event === 'object') return reg;

            // Otherwise, find the event in our global events list
            const eventId = reg.eventId || reg.id; // Fallback if reg itself is keyed by ID
            const eventData = allEvents.find(e => String(e.id) === String(eventId));

            return {
                ...reg,
                event: eventData || reg.event || null
            };
        });
    }, [registrations, allEvents]);

    // Check if user is registered for an event
    const isRegisteredForEvent = useCallback((eventId) => {
        return enrichedRegistrations.some(r => String(r.eventId) === String(eventId) || String(r.id) === String(eventId));
    }, [enrichedRegistrations]);

    // Handlers
    const handleRegister = (event) => {
        setSelectedEvent(event);
        setShowRegistrationModal(true);
    };

    const handleRegistrationSuccess = async (ticketData) => {
        // Refresh registrations after successful registration
        if (user) {
            const regsData = await getUserRegistrations();
            setRegistrations(regsData);
            // Also refresh stats as they include registration counts
            const statsData = await getDashboardStats(user);
            setStats(statsData);
        }
        console.log('Registration successful:', ticketData);
    };

    const handleViewTicket = (registration) => {
        console.log('View ticket:', registration);
        // Ticket viewing is now handled by TicketDetailModal inside components
    };

    const handleViewEventDetails = (event) => {
        console.log('View event details:', event);
        // TODO: Implement event detail modal
    };

    const handleToggleFavorite = (eventId, isFavorite) => {
        if (isFavorite) {
            setFavorites([...favorites, eventId]);
        } else {
            setFavorites(favorites.filter(id => id !== eventId));
        }
    };

    const handleExploreEvents = () => {
        // Navigate to events page
        setCurrentPage('events');
    };

    // Refresh events from the store (API re-fetch)
    const handleRefreshEvents = async () => {
        dispatch(resetStatus());
        await dispatch(fetchEvents());
    };

    const handleRefreshStats = async () => {
        if (user) {
            await Promise.all([
                handleRefreshEvents(),
                fetchDashboardData()
            ]);
        }
    };

    const handleNavigate = (page) => {
        setCurrentPage(page);
    };

    // Get page title based on current page
    const getPageTitle = () => {
        switch (currentPage) {
            case 'profile':
                return 'My Profile';
            case 'settings':
                return 'Settings';
            case 'events':
                return 'Explore Events';
            case 'tickets':
                return 'My Tickets';
            case 'favorites':
                return 'Favorites';
            default:
                const name = user?.fullName || user?.username || 'User';
                return `Welcome back, ${name.split(' ')[0]}! 👋`;
        }
    };

    // Render content based on current page
    const renderContent = () => {
        switch (currentPage) {
            case 'profile':
                return <ProfilePage onNavigate={handleNavigate} />;

            case 'settings':
                return <SettingsPage onNavigate={handleNavigate} />;

            case 'events':
                return (
                    <>
                        <SectionHeader
                            icon={Calendar}
                            title="Explore Events"
                            subtitle="Discover and register for exciting events"
                            showAction={false}
                        />
                        <EventsSection
                            events={allEvents}
                            registrations={enrichedRegistrations}
                            favorites={favorites}
                            loading={loading}
                            onRegister={handleRegister}
                            onViewDetails={handleViewEventDetails}
                            onToggleFavorite={handleToggleFavorite}
                            onRefresh={handleRefreshEvents}
                            showHeader={false}
                            maxDisplay={null}
                            showViewAll={false}
                        />

                        {/* Registration Modal */}
                        {showRegistrationModal && selectedEvent && (
                            <RegistrationModal
                                event={selectedEvent}
                                user={user}
                                onClose={() => {
                                    setShowRegistrationModal(false);
                                    setSelectedEvent(null);
                                }}
                                onSuccess={handleRegistrationSuccess}
                            />
                        )}
                    </>
                );

            case 'tickets':
                return (
                    <>
                        <SectionHeader
                            icon={Ticket}
                            title="My Tickets"
                            subtitle="Manage your event registrations"
                            showAction={false}
                        />
                        <TicketsSection
                            registrations={enrichedRegistrations}
                            loading={loading}
                            onBrowseEvents={handleExploreEvents}
                            showHeader={false}
                            maxDisplay={null} // Show all tickets
                            showViewAll={false}
                        />
                    </>
                );

            case 'favorites':
                return (
                    <>
                        <SectionHeader
                            icon={Heart}
                            title="My Favorites"
                            subtitle="Events you've saved for later"
                            count={favoritedEvents.length}
                            showAction={false}
                        />
                        {favoritedEvents.length > 0 ? (
                            <EventsSection
                                events={favoritedEvents}
                                registrations={enrichedRegistrations}
                                favorites={favorites}
                                loading={loading}
                                onRegister={handleRegister}
                                onViewDetails={handleViewEventDetails}
                                onToggleFavorite={handleToggleFavorite}
                                showHeader={false}
                                maxDisplay={null}
                                showViewAll={false}
                            />
                        ) : (
                            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                                    <Heart className="w-8 h-8 text-slate-300" />
                                </div>
                                <h3 className="font-semibold text-slate-700 mb-1">No favorites yet</h3>
                                <p className="text-slate-400 text-sm mb-5">
                                    Heart events to save them here for quick access
                                </p>
                                <button
                                    onClick={handleExploreEvents}
                                    className="px-6 py-2.5 bg-gradient-to-r from-brand-100 to-brand-200 text-white rounded-xl font-medium hover:shadow-lg transition-shadow"
                                >
                                    Explore Events
                                </button>
                            </div>
                        )}

                        {/* Registration Modal */}
                        {showRegistrationModal && selectedEvent && (
                            <RegistrationModal
                                event={selectedEvent}
                                user={user}
                                onClose={() => {
                                    setShowRegistrationModal(false);
                                    setSelectedEvent(null);
                                }}
                                onSuccess={handleRegistrationSuccess}
                            />
                        )}
                    </>
                );

            default: // 'home'
                return (
                    <>
                        {/* Dashboard Home with all sections */}
                        <DashboardHome
                            user={user}
                            stats={stats}
                            events={upcomingEvents}
                            registrations={enrichedRegistrations}
                            favorites={favorites}
                            loading={loading}
                            onRegister={handleRegister}
                            onViewDetails={handleViewEventDetails}
                            onToggleFavorite={handleToggleFavorite}
                            onViewTicket={handleViewTicket}
                            onExploreEvents={handleExploreEvents}
                            onRefreshStats={handleRefreshStats}
                            onRefreshEvents={handleRefreshEvents}
                        />

                        {/* Registration Modal */}
                        {showRegistrationModal && selectedEvent && (
                            <RegistrationModal
                                event={selectedEvent}
                                user={user}
                                onClose={() => {
                                    setShowRegistrationModal(false);
                                    setSelectedEvent(null);
                                }}
                                onSuccess={handleRegistrationSuccess}
                            />
                        )}
                    </>
                );
        }
    };

    return (
        <DashboardLayout title={getPageTitle()} onNavigate={handleNavigate} currentPage={currentPage}>
            {renderContent()}
        </DashboardLayout>
    );
}
