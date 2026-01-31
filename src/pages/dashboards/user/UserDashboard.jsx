import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    Ticket,
    CheckCircle2,
    Search,
    Filter,
    Star,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProfilePage from '../ProfilePage';
import SettingsPage from '../SettingsPage';
import { useAuth } from '../../../context/AuthContext';
import { mockEvents, getUserRegistrations, getDashboardStats } from '../../../data/mockData';
import { EVENT_STATUS } from '../../../utils/constants';
import {
    StatCard,
    EventCard,
    TicketCard,
    RegistrationModal,
    CategoryTabs
} from './components';

// Main Dashboard Component
export default function UserDashboard() {
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [stats, setStats] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);

    useEffect(() => {
        if (user) {
            setStats(getDashboardStats(user));
            setRegistrations(getUserRegistrations(user.id));
        }
    }, [user]);

    const upcomingEvents = mockEvents.filter(e => e.status === EVENT_STATUS.UPCOMING);

    // Get unique categories
    const categories = ['All', ...new Set(upcomingEvents.map(e => e.category))];

    // Filter events
    const filteredEvents = upcomingEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Check if user is registered for an event
    const isRegisteredForEvent = (eventId) => {
        return registrations.some(r => r.eventId === eventId);
    };

    const handleRegister = (event) => {
        setSelectedEvent(event);
        setShowRegistrationModal(true);
    };

    const handleRegistrationSuccess = (ticketData) => {
        // Refresh registrations
        if (user) {
            setRegistrations(getUserRegistrations(user.id));
        }
        console.log('Registration successful:', ticketData);
    };

    const handleViewTicket = (registration) => {
        console.log('View ticket:', registration);
        // TODO: Implement ticket viewing modal
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
            default:
                return (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                            <StatCard
                                icon={Calendar}
                                label="Upcoming Events"
                                value={stats?.upcomingEvents || 0}
                                color="blue"
                                delay={0}
                            />
                            <StatCard
                                icon={Ticket}
                                label="My Registrations"
                                value={stats?.registeredEvents || 0}
                                trend={12}
                                color="brand"
                                delay={0.1}
                            />
                            <StatCard
                                icon={CheckCircle2}
                                label="Events Attended"
                                value={stats?.attendedEvents || 0}
                                color="green"
                                delay={0.2}
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Events Section */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Search & Filter Bar */}
                                <motion.div
                                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search events by name, category..."
                                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-100/20 transition-all"
                                        />
                                    </div>
                                    <motion.button
                                        className="p-3.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-brand-100 transition-all flex items-center gap-2 text-slate-600"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Filter className="w-5 h-5" />
                                        <span className="sm:hidden">Filters</span>
                                    </motion.button>
                                </motion.div>

                                {/* Category Tabs */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 }}
                                >
                                    <CategoryTabs
                                        categories={categories}
                                        selected={selectedCategory}
                                        onSelect={setSelectedCategory}
                                    />
                                </motion.div>

                                {/* Events Header */}
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-slate-900">
                                        {selectedCategory === 'All' ? 'All Events' : selectedCategory}
                                        <span className="text-slate-400 font-normal text-base ml-2">
                                            ({filteredEvents.length})
                                        </span>
                                    </h2>
                                    <button className="text-brand-200 hover:text-brand-100 text-sm font-medium flex items-center gap-1 group">
                                        View All
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>

                                {/* Events Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {filteredEvents.slice(0, 6).map((event, index) => (
                                        <EventCard
                                            key={event.id}
                                            event={event}
                                            index={index}
                                            onRegister={handleRegister}
                                            isRegistered={isRegisteredForEvent(event.id)}
                                        />
                                    ))}
                                </div>

                                {filteredEvents.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-16 bg-white rounded-2xl border border-slate-200"
                                    >
                                        <Calendar className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-slate-900 mb-2">No events found</h3>
                                        <p className="text-slate-500">Try adjusting your search or filters</p>
                                    </motion.div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* My Tickets */}
                                <motion.div
                                    className="bg-white rounded-2xl border border-slate-200 p-5"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-brand-100/10 flex items-center justify-center">
                                            <Ticket className="w-4 h-4 text-brand-200" />
                                        </div>
                                        My Tickets
                                    </h3>

                                    {registrations.length > 0 ? (
                                        <div className="space-y-3">
                                            {registrations.slice(0, 3).map((reg, index) => (
                                                <TicketCard
                                                    key={reg.id}
                                                    registration={reg}
                                                    index={index}
                                                    onViewTicket={handleViewTicket}
                                                />
                                            ))}
                                            {registrations.length > 3 && (
                                                <motion.button
                                                    className="w-full py-3 text-brand-200 hover:text-brand-100 text-sm font-medium flex items-center justify-center gap-1 hover:bg-brand-50 rounded-xl transition-colors"
                                                    whileHover={{ scale: 1.02 }}
                                                >
                                                    View all {registrations.length} tickets
                                                    <ArrowRight className="w-4 h-4" />
                                                </motion.button>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <Ticket className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                                            <p className="text-slate-500 text-sm">
                                                No tickets yet
                                            </p>
                                            <p className="text-slate-400 text-xs mt-1">
                                                Register for an event to get started!
                                            </p>
                                        </div>
                                    )}
                                </motion.div>

                                {/* Discover Card */}
                                <motion.div
                                    className="bg-gradient-to-br from-brand-100 via-brand-200 to-brand-300 rounded-2xl p-6 text-white relative overflow-hidden"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {/* Decorative elements */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                                            <Sparkles className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-bold text-xl mb-2">Discover More!</h3>
                                        <p className="text-white/80 text-sm mb-5">
                                            Explore hundreds of exciting events happening near you.
                                        </p>
                                        <motion.button
                                            className="w-full py-3.5 bg-white text-brand-200 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Star className="w-5 h-5" />
                                            Explore Events
                                        </motion.button>
                                    </div>
                                </motion.div>

                                {/* Quick Tips */}
                                <motion.div
                                    className="bg-amber-50 border border-amber-200 rounded-2xl p-5"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.55 }}
                                >
                                    <h4 className="font-semibold text-amber-800 mb-2">💡 Pro Tip</h4>
                                    <p className="text-sm text-amber-700">
                                        Register early for popular events! Some events fill up within hours of opening.
                                    </p>
                                </motion.div>
                            </div>
                        </div>

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
        <DashboardLayout title={getPageTitle()} onNavigate={handleNavigate}>
            {renderContent()}
        </DashboardLayout>
    );
}
