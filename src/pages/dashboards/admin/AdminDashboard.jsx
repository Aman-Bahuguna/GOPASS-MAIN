import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Calendar,
    Building2,
    CheckCircle2,
    Clock,
    AlertCircle,
    Shield,
    Sparkles,
    ChevronRight,
    UserCheck
} from 'lucide-react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProfilePage from '../ProfilePage';
import SettingsPage from '../SettingsPage';
import { useAuth } from '../../../context/AuthContext';
import {
    getPendingOrganizers,
    getOrganizersByCollege,
    getEventsByCollege,
    getDashboardStats,
    mockOrganizers
} from '../../../data/mockData';
import { USER_STATUS } from '../../../utils/constants';
import {
    StatCard,
    PendingOrganizerCard,
    ApprovedOrganizerRow,
    CollegeEventCard,
    WelcomeBanner,
    EmptyPendingState
} from './components';

// Main Admin Dashboard Component
export default function AdminDashboard() {
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState('home');
    const [stats, setStats] = useState(null);
    const [pendingOrganizers, setPendingOrganizers] = useState([]);
    const [approvedOrganizers, setApprovedOrganizers] = useState([]);
    const [collegeEvents, setCollegeEvents] = useState([]);

    useEffect(() => {
        if (user?.college) {
            setStats(getDashboardStats(user));

            // Get organizers from the same college
            const allOrganizers = getOrganizersByCollege(user.college.name, user.college.state);
            setPendingOrganizers(allOrganizers.filter(o => o.status === USER_STATUS.PENDING_ADMIN_APPROVAL));
            setApprovedOrganizers(allOrganizers.filter(o => o.isAdminApproved));

            // Get college events
            setCollegeEvents(getEventsByCollege(user.college.name));
        }
    }, [user]);

    const handleApprove = (organizerId) => {
        setPendingOrganizers(prev => prev.filter(o => o.id !== organizerId));
        const approved = pendingOrganizers.find(o => o.id === organizerId);
        if (approved) {
            setApprovedOrganizers(prev => [...prev, { ...approved, isAdminApproved: true }]);
        }
        console.log('Approved organizer:', organizerId);
    };

    const handleReject = (organizerId) => {
        setPendingOrganizers(prev => prev.filter(o => o.id !== organizerId));
        console.log('Rejected organizer:', organizerId);
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
                return 'Admin Dashboard';
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
                        {/* Welcome Banner */}
                        <WelcomeBanner user={user} />

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                            <StatCard
                                icon={Clock}
                                label="Pending Approvals"
                                value={pendingOrganizers.length}
                                color="orange"
                                delay={0}
                                highlight={pendingOrganizers.length > 0}
                                subtitle="Awaiting your review"
                            />
                            <StatCard
                                icon={Users}
                                label="Total Organizers"
                                value={stats?.totalOrganizers || 0}
                                color="blue"
                                delay={0.1}
                                subtitle="Active in your college"
                            />
                            <StatCard
                                icon={Calendar}
                                label="Active Events"
                                value={stats?.activeEvents || 0}
                                color="green"
                                delay={0.2}
                                subtitle="Currently running"
                            />
                            <StatCard
                                icon={CheckCircle2}
                                label="Total Events"
                                value={stats?.totalEvents || 0}
                                trend={15}
                                color="purple"
                                delay={0.3}
                                subtitle="All time events"
                            />
                        </div>

                        {/* Main Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Pending Approvals & Approved Organizers */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Pending Approvals Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="flex items-center justify-between mb-5">
                                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                                            <div className="p-2 bg-orange-100 rounded-lg">
                                                <AlertCircle className="w-5 h-5 text-orange-600" />
                                            </div>
                                            Pending Approvals
                                            {pendingOrganizers.length > 0 && (
                                                <motion.span
                                                    className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold"
                                                    animate={{ scale: [1, 1.1, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    {pendingOrganizers.length}
                                                </motion.span>
                                            )}
                                        </h2>
                                    </div>

                                    <AnimatePresence mode="popLayout">
                                        {pendingOrganizers.length > 0 ? (
                                            <div className="space-y-4">
                                                {pendingOrganizers.map((organizer, index) => (
                                                    <PendingOrganizerCard
                                                        key={organizer.id}
                                                        organizer={organizer}
                                                        index={index}
                                                        onApprove={handleApprove}
                                                        onReject={handleReject}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <EmptyPendingState />
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Approved Organizers Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="flex items-center justify-between mb-5">
                                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                                            <div className="p-2 bg-emerald-100 rounded-lg">
                                                <UserCheck className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            Approved Organizers
                                        </h3>
                                        <motion.button
                                            className="text-brand-200 hover:text-brand-100 text-sm font-semibold flex items-center gap-1.5 group"
                                            whileHover={{ x: 5 }}
                                        >
                                            View All
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </motion.button>
                                    </div>
                                    <div className="bg-white rounded-2xl border border-slate-200/60 divide-y divide-slate-100 overflow-hidden shadow-sm">
                                        {approvedOrganizers.length > 0 ? (
                                            approvedOrganizers.slice(0, 5).map((organizer, index) => (
                                                <ApprovedOrganizerRow key={organizer.id} organizer={organizer} index={index} />
                                            ))
                                        ) : (
                                            <div className="p-8 text-center">
                                                <Users className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                                                <p className="text-slate-500">No approved organizers yet</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* College Info Card */}
                                <motion.div
                                    className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h3 className="font-bold text-lg text-slate-900 mb-5 flex items-center gap-3">
                                        <div className="p-2 bg-brand-100/10 rounded-lg">
                                            <Building2 className="w-5 h-5 text-brand-200" />
                                        </div>
                                        College Details
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl">
                                            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">Institution</p>
                                            <p className="font-semibold text-slate-900">{user?.college?.name}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="p-4 bg-slate-50 rounded-xl">
                                                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">Location</p>
                                                <p className="font-medium text-slate-900 text-sm">{user?.college?.state}</p>
                                            </div>
                                            <div className="p-4 bg-slate-50 rounded-xl">
                                                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">Pincode</p>
                                                <p className="font-medium text-slate-900 text-sm">{user?.college?.pincode}</p>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-gradient-to-r from-brand-50 to-purple-50 rounded-xl border border-brand-100/30">
                                            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">Your Role</p>
                                            <p className="font-semibold text-brand-200 flex items-center gap-2">
                                                <Shield className="w-4 h-4" />
                                                {user?.position}
                                            </p>
                                        </div>
                                    </div>
                                    <motion.button
                                        className="w-full mt-5 py-3 border-2 border-brand-200 text-brand-200 rounded-xl font-semibold hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Building2 className="w-4 h-4" />
                                        Edit Details
                                    </motion.button>
                                </motion.div>

                                {/* College Events Card */}
                                <motion.div
                                    className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <h3 className="font-bold text-lg text-slate-900 mb-5 flex items-center gap-3">
                                        <div className="p-2 bg-brand-100/10 rounded-lg">
                                            <Calendar className="w-5 h-5 text-brand-200" />
                                        </div>
                                        College Events
                                    </h3>
                                    {collegeEvents.length > 0 ? (
                                        <div className="space-y-3">
                                            {collegeEvents.slice(0, 4).map((event, index) => (
                                                <CollegeEventCard key={event.id} event={event} index={index} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                                            <p className="text-slate-500">No events yet</p>
                                        </div>
                                    )}
                                    {collegeEvents.length > 4 && (
                                        <motion.button
                                            className="w-full mt-4 py-3 text-brand-200 hover:bg-brand-50 rounded-xl text-sm font-semibold transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            View all {collegeEvents.length} events
                                        </motion.button>
                                    )}
                                </motion.div>

                                {/* Quick Stats Card */}
                                <motion.div
                                    className="bg-gradient-to-br from-brand-100 via-brand-200 to-purple-600 rounded-2xl p-6 text-white overflow-hidden relative"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 }}
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
                                            <Sparkles className="w-5 h-5 text-yellow-300" />
                                            <span className="font-semibold">Quick Stats</span>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-white/80">Approval Rate</span>
                                                <span className="font-bold">98%</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-white/80">Avg Response Time</span>
                                                <span className="font-bold">2.5h</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-white/80">This Month</span>
                                                <span className="font-bold">+12 organizers</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
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
