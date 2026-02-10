import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProfilePage from '../ProfilePage';
import { SettingsPage } from '../settings';
import { useAuth } from '../../../context/AuthContext';
import { mockEvents, getUserRegistrations, getDashboardStats } from '../../../data/mockData';
import { EVENT_STATUS } from '../../../utils/constants';

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
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState('home');
    const [stats, setStats] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch dashboard data
    useEffect(() => {
        if (user) {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                setStats(getDashboardStats(user));
                setRegistrations(getUserRegistrations(user.id));
                setLoading(false);
            }, 500);
        }
    }, [user]);

    // Get all events for the events page
    const allEvents = mockEvents;

    // Get upcoming events for the home page
    const upcomingEvents = mockEvents.filter(e => e.status === EVENT_STATUS.UPCOMING);

    // Get favorited events
    const favoritedEvents = allEvents.filter(e => favorites.includes(e.id));

    // Check if user is registered for an event
    const isRegisteredForEvent = (eventId) => {
        return registrations.some(r => r.eventId === eventId);
    };

    // Handlers
    const handleRegister = (event) => {
        setSelectedEvent(event);
        setShowRegistrationModal(true);
    };

    const handleRegistrationSuccess = (ticketData) => {
        // Refresh registrations after successful registration
        if (user) {
            setRegistrations(getUserRegistrations(user.id));
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

    const handleRefreshStats = async () => {
        if (user) {
            setStats(getDashboardStats(user));
            setRegistrations(getUserRegistrations(user.id));
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
                            registrations={registrations}
                            favorites={favorites}
                            loading={loading}
                            onRegister={handleRegister}
                            onViewDetails={handleViewEventDetails}
                            onToggleFavorite={handleToggleFavorite}
                            showHeader={false}
                            maxDisplay={null} // Show all events
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
                            registrations={registrations}
                            favorites={favorites}
                            loading={loading}
                            onRegister={handleRegister}
                            onViewDetails={handleViewEventDetails}
                            onToggleFavorite={handleToggleFavorite}
                            onViewTicket={handleViewTicket}
                            onExploreEvents={handleExploreEvents}
                            onRefreshStats={handleRefreshStats}
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
