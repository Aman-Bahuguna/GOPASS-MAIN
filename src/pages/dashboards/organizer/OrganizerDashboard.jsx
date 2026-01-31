import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    PlusCircle,
    CheckCircle2,
    Clock,
    Users,
    Lock,
    Unlock,
    Target,
    Lightbulb,
    Star,
    ChevronRight,
    Zap,
    BarChart2,
    DollarSign
} from 'lucide-react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProfilePage from '../ProfilePage';
import SettingsPage from '../SettingsPage';
import { useAuth } from '../../../context/AuthContext';
import { getEventsByOrganizer, getDashboardStats } from '../../../data/mockData';
import { USER_STATUS } from '../../../utils/constants';
import { canOrganizerCreateEvents } from '../../../utils/roleConfig';
import {
    ApprovalStatusBanner,
    StatCard,
    OrganizerEventCard,
    LockedEventCreation,
    EmptyEventsState
} from './components';

export default function OrganizerDashboard() {
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState('home');
    const [stats, setStats] = useState(null);
    const [events, setEvents] = useState([]);

    const canCreate = canOrganizerCreateEvents(user);

    useEffect(() => {
        if (user) {
            setStats(getDashboardStats(user));
            setEvents(getEventsByOrganizer(user.id));
        }
    }, [user]);

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
            default:
                return (
                    <>
                        {/* Approval Status Banner */}
                        <ApprovalStatusBanner user={user} />

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                            <StatCard
                                icon={Calendar}
                                label="Active Events"
                                value={stats?.activeEvents || 0}
                                color="blue"
                                delay={0}
                                locked={!canCreate}
                                subtitle={canCreate ? "Currently running" : "Unlock to view"}
                            />
                            <StatCard
                                icon={Clock}
                                label="Pending Events"
                                value={stats?.pendingEvents || 0}
                                color="orange"
                                delay={0.1}
                                locked={!canCreate}
                                subtitle={canCreate ? "Scheduled for later" : "Unlock to view"}
                            />
                            <StatCard
                                icon={CheckCircle2}
                                label="Completed Events"
                                value={stats?.completedEvents || 0}
                                color="green"
                                delay={0.2}
                                locked={!canCreate}
                                subtitle={canCreate ? "Successfully completed" : "Unlock to view"}
                            />
                            <StatCard
                                icon={Users}
                                label="Total Registrations"
                                value={stats?.totalRegistrations || 0}
                                trend={canCreate ? 12 : undefined}
                                color="purple"
                                delay={0.3}
                                locked={!canCreate}
                                subtitle={canCreate ? "All time registrations" : "Unlock to view"}
                            />
                        </div>

                        {/* Main Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Events Section */}
                            <div className="lg:col-span-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                                            <div className="p-2 bg-brand-100/10 rounded-lg">
                                                <Calendar className="w-5 h-5 text-brand-200" />
                                            </div>
                                            My Events
                                        </h2>
                                        {canCreate && (
                                            <motion.button
                                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-100 to-brand-200 text-white rounded-xl font-semibold shadow-lg shadow-brand-200/30"
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <PlusCircle className="w-5 h-5" />
                                                Create Event
                                            </motion.button>
                                        )}
                                    </div>

                                    {canCreate ? (
                                        events.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                {events.map((event, index) => (
                                                    <OrganizerEventCard key={event.id} event={event} index={index} />
                                                ))}
                                            </div>
                                        ) : (
                                            <EmptyEventsState />
                                        )
                                    ) : (
                                        <LockedEventCreation />
                                    )}
                                </motion.div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Account Status */}
                                <motion.div
                                    className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h3 className="font-bold text-lg text-slate-900 mb-5 flex items-center gap-3">
                                        <div className="p-2 bg-brand-100/10 rounded-lg">
                                            <Target className="w-5 h-5 text-brand-200" />
                                        </div>
                                        Account Status
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                            <span className="text-slate-600 font-medium">Platform Verified</span>
                                            {user?.status !== USER_STATUS.PENDING_PLATFORM_VERIFICATION ? (
                                                <div className="flex items-center gap-2 text-emerald-600">
                                                    <CheckCircle2 className="w-5 h-5" />
                                                    <span className="text-sm font-medium">Done</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-amber-500">
                                                    <Clock className="w-5 h-5" />
                                                    <span className="text-sm font-medium">Pending</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                            <span className="text-slate-600 font-medium">Admin Approved</span>
                                            {user?.isAdminApproved ? (
                                                <div className="flex items-center gap-2 text-emerald-600">
                                                    <CheckCircle2 className="w-5 h-5" />
                                                    <span className="text-sm font-medium">Done</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-amber-500">
                                                    <Clock className="w-5 h-5" />
                                                    <span className="text-sm font-medium">Pending</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className={`flex items-center justify-between p-3 rounded-xl ${canCreate ? 'bg-emerald-50' : 'bg-red-50'}`}>
                                            <span className={`font-medium ${canCreate ? 'text-emerald-700' : 'text-red-700'}`}>Event Creation</span>
                                            {canCreate ? (
                                                <div className="flex items-center gap-2 text-emerald-600">
                                                    <Unlock className="w-5 h-5" />
                                                    <span className="text-sm font-medium">Unlocked</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-red-500">
                                                    <Lock className="w-5 h-5" />
                                                    <span className="text-sm font-medium">Locked</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Pro Tips */}
                                <motion.div
                                    className="bg-gradient-to-br from-brand-100 via-brand-200 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    {/* Background decoration */}
                                    <div className="absolute inset-0 overflow-hidden">
                                        <motion.div
                                            className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                        />
                                        <motion.div
                                            className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full"
                                            animate={{ scale: [1, 1.3, 1] }}
                                            transition={{ duration: 5, repeat: Infinity }}
                                        />
                                    </div>
                                    <div className="relative">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Lightbulb className="w-5 h-5 text-yellow-300" />
                                            <span className="font-bold text-lg">Pro Tips</span>
                                        </div>
                                        <ul className="space-y-3">
                                            {[
                                                'Create eye-catching event images',
                                                'Set early bird discounts',
                                                'Promote on social media',
                                                'Engage with registrants'
                                            ].map((tip, i) => (
                                                <motion.li
                                                    key={i}
                                                    className="flex items-center gap-3 text-sm text-white/90"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.7 + i * 0.1 }}
                                                >
                                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                                        <Star className="w-3 h-3" />
                                                    </div>
                                                    {tip}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>

                                {/* Quick Actions Card */}
                                {canCreate && (
                                    <motion.div
                                        className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-3">
                                            <div className="p-2 bg-brand-100/10 rounded-lg">
                                                <Zap className="w-5 h-5 text-brand-200" />
                                            </div>
                                            Quick Actions
                                        </h3>
                                        <div className="space-y-2">
                                            <motion.button
                                                className="w-full p-3 text-left rounded-xl hover:bg-slate-50 flex items-center gap-3 transition-colors group"
                                                whileHover={{ x: 4 }}
                                            >
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <BarChart2 className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <span className="font-medium text-slate-700">View Analytics</span>
                                                <ChevronRight className="w-4 h-4 text-slate-400 ml-auto group-hover:translate-x-1 transition-transform" />
                                            </motion.button>
                                            <motion.button
                                                className="w-full p-3 text-left rounded-xl hover:bg-slate-50 flex items-center gap-3 transition-colors group"
                                                whileHover={{ x: 4 }}
                                            >
                                                <div className="p-2 bg-emerald-100 rounded-lg">
                                                    <DollarSign className="w-4 h-4 text-emerald-600" />
                                                </div>
                                                <span className="font-medium text-slate-700">Revenue Report</span>
                                                <ChevronRight className="w-4 h-4 text-slate-400 ml-auto group-hover:translate-x-1 transition-transform" />
                                            </motion.button>
                                            <motion.button
                                                className="w-full p-3 text-left rounded-xl hover:bg-slate-50 flex items-center gap-3 transition-colors group"
                                                whileHover={{ x: 4 }}
                                            >
                                                <div className="p-2 bg-purple-100 rounded-lg">
                                                    <Users className="w-4 h-4 text-purple-600" />
                                                </div>
                                                <span className="font-medium text-slate-700">Attendee List</span>
                                                <ChevronRight className="w-4 h-4 text-slate-400 ml-auto group-hover:translate-x-1 transition-transform" />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
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
