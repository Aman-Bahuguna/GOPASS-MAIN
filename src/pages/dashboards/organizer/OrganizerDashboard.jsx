import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProfilePage from '../ProfilePage';
import { SettingsPage } from '../settings';
import CreateEventPage from '../../events/CreateEventPage';
import { useAuth } from '../../../context/AuthContext';
import { getEventsByOrganizer, getDashboardStats } from '../../../data/mockData';
import { canOrganizerCreateEvents } from '../../../utils/roleConfig';
import { DashboardHome } from './components';

/**
 * OrganizerDashboard - Main dashboard container for organizers
 * Handles routing between dashboard sections and manages state
 */
export default function OrganizerDashboard() {
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState('home');
    const [stats, setStats] = useState(null);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const canCreate = canOrganizerCreateEvents(user);

    // Fetch dashboard data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (user) {
                    // Simulate API call delay
                    await new Promise(resolve => setTimeout(resolve, 500));
                    setStats(getDashboardStats(user));
                    setEvents(getEventsByOrganizer(user.id));
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user]);

    // Navigation handler
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
                return <CreateEventPage onNavigate={handleNavigate} />;

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
                    <motion.div
                        className="flex flex-col items-center justify-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Attendee Management</h3>
                        <p className="text-slate-500">Coming soon...</p>
                    </motion.div>
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
                        events={events}
                        canCreate={canCreate}
                        isLoading={isLoading}
                        onNavigate={handleNavigate}
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
