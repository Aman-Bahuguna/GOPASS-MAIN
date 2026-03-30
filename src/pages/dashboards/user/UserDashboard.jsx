import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProfilePage from '../ProfilePage';
import { SettingsPage } from '../settings';
import { useAuth } from '../../../context/AuthContext';
import { getUserRegistrations, getDashboardStats, fetchEventById } from '../../../api';
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

    // Redux State
    const events = useSelector(selectAllEvents);
    const eventStatus = useSelector(selectEventsStatus);

    // Fetch events once on mount
    useEffect(() => {
        if (eventStatus === 'idle' && user) {
            dispatch(fetchEvents());
        }
    }, [eventStatus, user, dispatch]);

    const [stats, setStats] = useState(null);
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        if (!user) return;
        const fetchData = async () => {
            try {
                const fetchedStats = await getDashboardStats(user);
                setStats(fetchedStats);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
            try {
                const fetchedRegs = await getUserRegistrations();
                setRegistrations(fetchedRegs);
            } catch (error) {
                console.error('Failed to fetch registrations:', error);
            }
        };
        fetchData();
    }, [user]);

    const loading = eventStatus === 'loading';

    // Get all events for the events page, securely defaulting to array
    const allEvents = Array.isArray(events) ? events : [];

    // Get upcoming events for the home page
    const upcomingEvents = useMemo(() =>
        allEvents.filter(e => e.status === EVENT_STATUS.UPCOMING),
        [allEvents]);

    // Get favorited events
    const favoritedEvents = useMemo(() =>
        allEvents.filter(e => favorites.includes(e.id)),
        [allEvents, favorites]);

    // Check if user is registered for an event
    const isRegisteredForEvent = useCallback((eventId) => {
        return (Array.isArray(registrations) ? registrations : []).some(r => r.eventId === eventId);
    }, [registrations]);

    // Handlers
    const handleRegister = async (eventSummary) => {
        try {
            // Fetch the fully populated event (with formSchema) before opening the modal
            const fullEvent = await fetchEventById(eventSummary.id);
            
            console.log("🔥 FETCHED FULL ENTRY FROM BACKEND /api/event/" + eventSummary.id + " ->", fullEvent);
            if (!fullEvent.formSchema || fullEvent.formSchema.length === 0) {
                 console.warn("⚠️ API WARNING: The backend database returned ZERO custom fields (`formSchema`) for this event! Check your Spring Boot Entity mapping!");
            } else {
                 console.log("✅ API SUCCESS: Event contains dynamic fields:", fullEvent.formSchema);
            }

            setSelectedEvent(fullEvent || eventSummary);
            setShowRegistrationModal(true);
        } catch (error) {
            console.error('🚨 NETWORK WARNING - Failed to fetch event details for registration! Did the API throw 403 or 404?', error);
            // Fallback to summary if details fail
            setSelectedEvent(eventSummary);
            setShowRegistrationModal(true);
        }
    };

    const handleRegistrationSuccess = async (ticketData) => {
        // Refresh registrations after successful registration
        if (user) {
            try {
                const fetchedRegs = await getUserRegistrations(user.id);
                setRegistrations(fetchedRegs);
            } catch (error) {
                console.error('Failed to fetch registrations:', error);
            }
        }
        console.log('Registration successful:', ticketData);
    };

    const handleViewTicket = (registration) => {
        console.log('View ticket:', registration);
        // Ticket viewing is now handled by TicketDetailModal inside components
    };

    const handleRegistration = (event, customData = {}) => {
        console.log('Registering for event:', event.id || event.eventName, customData);
        
        // Check if already registered
        if (registrations.some(r => r.eventId === (event.id || event._id))) {
            alert('You are already registered for this event!');
            return;
        }

        const newRegistration = {
            id: `REG-${Math.floor(100000 + Math.random() * 900000)}`,
            eventId: event.id || event._id,
            eventName: event.title || event.eventName,
            registrationDate: new Date().toISOString(),
            status: 'confirmed',
            ticketNumber: `GP-${Math.floor(100000 + Math.random() * 900000)}`,
            event: event, // Keep reference to full event
            ...customData
        };

        setRegistrations(prev => [newRegistration, ...prev]);
        
        // Show success message
        const eventName = event.title || event.eventName;
        // In a real app, we'd dispatch a toast notification here
        console.log(`Successfully registered for ${eventName}`);
    };

    const handleToggleFavorite = (eventId) => {
        console.log('Toggling favorite for:', eventId);
        setFavorites(prev => {
            if (prev.includes(eventId)) {
                return prev.filter(id => id !== eventId);
            } else {
                return [...prev, eventId];
            }
        });
    };

    const handleViewEventDetails = (event) => {
        console.log('View event details:', event);
        // TODO: Implement event detail modal
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
            // Also refresh events
            await handleRefreshEvents();
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
                return `Welcome back, ${user?.fullName?.split(' ')[0]}! 👋`;
        }
    };

    // Render content based on current page
    const renderContent = () => {
        switch (currentPage) {
            case 'profile':
                return <ProfilePage onNavigate={handleNavigate} registrations={registrations} />;

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
                            registrations={registrations}
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
                            registrations={registrations}
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
                                registrations={registrations}
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
                            <div className="text-center py-16 bg-[#f7f8fa] rounded-2xl border border-slate-200">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                                    <Heart className="w-8 h-8 text-slate-300" />
                                </div>
                                <h3 className="font-semibold text-slate-700 mb-1">No favorites yet</h3>
                                <p className="text-slate-400 text-sm mb-5">
                                    Heart events to save them here for quick access
                                </p>
                                <button
                                    onClick={handleExploreEvents}
                                    className="px-6 py-2.5 bg-brand-100 text-white rounded-xl font-medium hover:shadow-lg transition-shadow"
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
                            registrations={registrations}
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
