import { useState, useEffect, useMemo, useCallback } from 'react';
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
    UserCheck,
    Bell,
    X
} from 'lucide-react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProfilePage from '../ProfilePage';
import { SettingsPage } from '../settings';
import { useAuth } from '../../../context/AuthContext';
import { getPendingOrganizers, getOrganizersByCollege, getEventsByCollege, getDashboardStats, approveOrganizer } from '../../../api';
import { USER_STATUS, EVENT_STATUS } from '../../../utils/constants';
import {
    StatCard,
    PendingOrganizerCard,
    ApprovedOrganizerRow,
    CollegeEventCard,
    WelcomeBanner,
    EmptyPendingState,
    // Events Components
    AdminCreateEventForm,
    // Phase 2-3 Components
    AllOrganizersModal,
    CollegeEventsSection,
    CollegeInfoCard,
    CollegeEditModal,
    ActivityLogSection,
    ReportsSection,
    AnalyticsDashboard,
    NotificationsPanel,
    NotificationBell,
    NotificationSettings
} from './components';

import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, selectAllEvents, selectEventsStatus } from '../../../store/slices/eventsSlice';
import { normalizeUser } from '../../../utils/userUtils';

// Main Admin Dashboard Component
export default function AdminDashboard() {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState('home');
    const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
    const [showNotificationSettings, setShowNotificationSettings] = useState(false);
    const [showAllOrganizers, setShowAllOrganizers] = useState(false);
    const [showEditCollege, setShowEditCollege] = useState(false);
    const [pendingOrganizerState, setPendingOrganizerState] = useState({});
    const [approvedOrganizerState, setApprovedOrganizerState] = useState({});

    // Redux State
    const events = useSelector(selectAllEvents);
    const eventStatus = useSelector(selectEventsStatus);

    // Fetch Events once
    useEffect(() => {
        if (eventStatus === 'idle' && user) {
            dispatch(fetchEvents());
        }
    }, [eventStatus, user, dispatch]);

    // Memoized notifications data
    const notifications = useMemo(() => [
        { id: '1', type: 'new_organizer', title: 'New Organizer Request', message: 'John Doe has requested to become an organizer', timestamp: new Date().toISOString(), read: false, actionable: true },
        { id: '2', type: 'new_event', title: 'New Event Created', message: 'Tech Fest 2024 has been created by an organizer', timestamp: new Date(Date.now() - 3600000).toISOString(), read: false, actionable: true },
        { id: '3', type: 'system', title: 'System Update', message: 'Platform will undergo maintenance tonight', timestamp: new Date(Date.now() - 86400000).toISOString(), read: true, actionable: false },
    ], []);

    // Memoized activities data
    const [activities, setActivities] = useState([
        { id: '1', type: 'organizer_approved', title: 'Approved Organizer', description: 'You approved Jane Smith as organizer', user: 'Jane Smith', timestamp: new Date().toISOString() },
        { id: '2', type: 'event_created', title: 'Event Created', description: 'New event "Hackathon 2024" was created', user: 'John Doe', timestamp: new Date(Date.now() - 3600000).toISOString() },
        { id: '3', type: 'organizer_rejected', title: 'Rejected Organizer', description: 'You rejected Mike Johnson', user: 'Mike Johnson', timestamp: new Date(Date.now() - 7200000).toISOString() },
    ]);

    // Derived College Events - memoized
    const collegeEvents = useMemo(() => {
        return events.filter(event =>
            user?.college?.name && event.collegeId?.toLowerCase() === user.college.name.toLowerCase()
        );
    }, [events, user?.college?.name]);

    const [allOrganizers, setAllOrganizers] = useState([]);
    const [apiPendingOrgs, setApiPendingOrgs] = useState([]);
    const [statsBase, setStatsBase] = useState(null);

    useEffect(() => {
        if (!user) return; // Wait until useAuth completes
        const fetchOrgs = async () => {
            if (user?.college) {
                try {
                    const orgs = await getOrganizersByCollege(user.college.name, user.college.state);
                    setAllOrganizers(orgs || []);
                } catch (err) {
                    console.error("Local mock organizers error:", err);
                }
            } else {
                setAllOrganizers([]); // Fallback to empty
            }

            try {
                const pending = await getPendingOrganizers();
                setApiPendingOrgs(pending || []);
            } catch (err) {
                console.error("API Pending Organizers Error:", err);
            }
        };
        fetchOrgs();
    }, [user, user?.college]);

    useEffect(() => {
        if (!user) return;
        const fetchStats = async () => {
            try {
                const s = await getDashboardStats(user);
                setStatsBase(s);
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, [user]);

    // Memoized organizers
    const organizers = useMemo(() => {
        if (!allOrganizers) return { pending: [], approved: [] };
        let pending = allOrganizers.filter(o => o.status === USER_STATUS.PENDING_ADMIN_APPROVAL && !pendingOrganizerState[o.id]?.rejected);
        const approved = allOrganizers.filter(o => o.isAdminApproved || pendingOrganizerState[o.id]?.approved);
        
        // Merge API fetched pending organizers seamlessly
        if (apiPendingOrgs && apiPendingOrgs.length > 0) {
            const apiEmails = apiPendingOrgs.map(o => o.email);
            pending = pending.filter(o => !apiEmails.includes(o.email)); // Prevent duplicates
            
            const realPending = apiPendingOrgs
                .map(o => normalizeUser(o, user?.college))
                .filter(o => !pendingOrganizerState[o.id]?.rejected && !pendingOrganizerState[o.id]?.approved);
            
            pending = [...pending, ...realPending];
        }

        return { pending, approved };
    }, [allOrganizers, pendingOrganizerState, apiPendingOrgs, user?.college]);

    // Memoized stats
    const stats = useMemo(() => {
        if (!statsBase) return null;
        return {
            ...statsBase,
            activeEvents: collegeEvents.filter(e => e.status === EVENT_STATUS.UPCOMING).length,
            totalEvents: collegeEvents.length,
        };
    }, [statsBase, collegeEvents]);

    const handleApprove = useCallback(async (organizerId) => {
        const approved = organizers.pending.find(o => o.id === organizerId);
        
        try {
            // Send API call to backend
            await approveOrganizer(organizerId);
            
            // On success, update UI state
            setPendingOrganizerState(prev => ({
                ...prev,
                [organizerId]: { approved: true }
            }));
            
            // Mock persistence for cross-user approval demo
            if (approved) {
                 const stored = localStorage.getItem('gopass_registered_organizers');
                 if (stored) {
                     const orgs = JSON.parse(stored);
                     const index = orgs.findIndex(o => o.id === organizerId);
                     if (index !== -1) {
                         orgs[index].isAdminApproved = true;
                         orgs[index].status = USER_STATUS.ACTIVE;
                         localStorage.setItem('gopass_registered_organizers', JSON.stringify(orgs));
                     }
                 }

                 const approvals = JSON.parse(localStorage.getItem('gopass_approved_organizers') || '[]');
                 if (!approvals.includes(approved.email)) approvals.push(approved.email);
                 if (!approvals.includes(String(approved.id))) approvals.push(String(approved.id));
                 localStorage.setItem('gopass_approved_organizers', JSON.stringify(approvals));

                 setActivities(prev => [{
                    id: Date.now().toString(),
                    type: 'organizer_approved',
                    title: 'Approved Organizer',
                    description: `You approved ${approved.fullName}`,
                    user: approved.fullName,
                    timestamp: new Date().toISOString()
                }, ...prev]);
            }
        } catch (error) {
            console.error("Failed to approve organizer:", error);
            alert(`Failed to approve: ${error.message}`);
        }
    }, [organizers.pending]);

    const handleReject = useCallback((organizerId) => {
        const rejected = organizers.pending.find(o => o.id === organizerId);
        setPendingOrganizerState(prev => ({
            ...prev,
            [organizerId]: { rejected: true }
        }));
        if (rejected) {
            setActivities(prev => [{
                id: Date.now().toString(),
                type: 'organizer_rejected',
                title: 'Rejected Organizer',
                description: `You rejected ${rejected.fullName}`,
                user: rejected.fullName,
                timestamp: new Date().toISOString()
            }, ...prev]);
        }
    }, [organizers.pending]);

    const handleNavigate = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    // Notification handlers
    const handleMarkAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const handleDeleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    // Get page title based on current page
    const getPageTitle = () => {
        switch (currentPage) {
            case 'profile':
                return 'My Profile';
            case 'settings':
                return 'Settings';
            case 'organizers':
                return 'Manage Organizers';
            case 'events':
                return 'College Events';
            case 'analytics':
                return 'Analytics';
            case 'activity':
                return 'Activity Log';
            case 'reports':
                return 'Reports';
            case 'college':
                return 'College Details';
            case 'notifications':
                return 'Notifications';
            case 'create-event':
                return 'Create Event';
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

            // Manage Organizers Page
            case 'organizers':
                return (
                    <div className="space-y-6">
                        {/* Pending Organizers */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#f7f8fa] rounded-2xl border border-slate-200 p-6"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <AlertCircle className="w-5 h-5 text-orange-600" />
                                    </div>
                                    Pending Approvals
                                    {organizers.pending.length > 0 && (
                                        <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold">
                                            {organizers.pending.length}
                                        </span>
                                    )}
                                </h2>
                                <button
                                    onClick={() => setShowAllOrganizers(true)}
                                    className="text-sm text-brand-200 hover:text-brand-100 font-medium"
                                >
                                    View All Organizers
                                </button>
                            </div>
                            <AnimatePresence mode="popLayout">
                                {organizers.pending.length > 0 ? (
                                    <div className="space-y-4">
                                        {organizers.pending.map((organizer, index) => (
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

                        {/* Approved Organizers */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-[#f7f8fa] rounded-2xl border border-slate-200 p-6"
                        >
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 mb-5">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <UserCheck className="w-5 h-5 text-emerald-600" />
                                </div>
                                Approved Organizers ({organizers.approved.length})
                            </h3>
                            <div className="space-y-2">
                                {organizers.approved.slice(0, 5).map((organizer, index) => (
                                    <ApprovedOrganizerRow
                                        key={organizer.id}
                                        organizer={organizer}
                                        index={index}
                                    />
                                ))}
                                {organizers.approved.length === 0 && (
                                    <p className="text-slate-500 text-center py-4">No approved organizers yet</p>
                                )}
                            </div>
                        </motion.div>
                    </div>
                );

            // College Events Page
            case 'events':
                return (
                    <CollegeEventsSection
                        events={collegeEvents}
                        onCreateEvent={() => handleNavigate('create-event')}
                    />
                );

            // Create Event Page
            case 'create-event':
                return (
                    <AdminCreateEventForm onNavigate={handleNavigate} />
                );

            // Analytics Page
            case 'analytics':
                return (
                    <AnalyticsDashboard
                        eventsData={[
                            { label: 'Jan', value: 12 },
                            { label: 'Feb', value: 19 },
                            { label: 'Mar', value: 15 },
                            { label: 'Apr', value: 25 },
                            { label: 'May', value: 22 },
                            { label: 'Jun', value: 30 }
                        ]}
                        registrationsData={[
                            { label: 'Week 1', value: 120 },
                            { label: 'Week 2', value: 180 },
                            { label: 'Week 3', value: 150 },
                            { label: 'Week 4', value: 220 }
                        ]}
                        categoriesData={[
                            { label: 'Technical', value: 35 },
                            { label: 'Cultural', value: 25 },
                            { label: 'Sports', value: 20 },
                            { label: 'Workshop', value: 15 },
                            { label: 'Others', value: 5 }
                        ]}
                    />
                );

            // Activity Log Page
            case 'activity':
                return (
                    <ActivityLogSection
                        activities={activities}
                        onRefresh={() => console.log('Refresh activities')}
                        onLoadMore={() => console.log('Load more activities')}
                    />
                );

            // Reports Page
            case 'reports':
                return (
                    <ReportsSection
                        stats={{
                            totalEvents: stats?.totalEvents || 0,
                            totalOrganizers: stats?.totalOrganizers || 0,
                            totalRegistrations: stats?.totalRegistrations || 0,
                            activeEvents: stats?.activeEvents || 0
                        }}
                        onGenerateReport={(config) => console.log('Generate report:', config)}
                        onExport={(reportId, format) => console.log('Export:', reportId, format)}
                    />
                );

            // College Details Page
            case 'college':
                return (
                    <div className="space-y-6">
                        <CollegeInfoCard
                            college={user?.college}
                            onEdit={() => setShowEditCollege(true)}
                        />

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                            <div className="bg-[#f7f8fa] rounded-2xl border border-slate-200 p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Users className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="text-slate-600 font-medium">Total Organizers</span>
                                </div>
                                <p className="text-3xl font-bold text-slate-900">{organizers.approved.length}</p>
                            </div>
                            <div className="bg-[#f7f8fa] rounded-2xl border border-slate-200 p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <Calendar className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <span className="text-slate-600 font-medium">Total Events</span>
                                </div>
                                <p className="text-3xl font-bold text-slate-900">{collegeEvents.length}</p>
                            </div>
                            <div className="bg-[#f7f8fa] rounded-2xl border border-slate-200 p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-emerald-100 rounded-lg">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <span className="text-slate-600 font-medium">Active Events</span>
                                </div>
                                <p className="text-3xl font-bold text-slate-900">{stats?.activeEvents || 0}</p>
                            </div>
                        </motion.div>
                    </div>
                );

            // Notifications Page
            case 'notifications':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">All Notifications</h2>
                                <p className="text-slate-500 text-sm">{notifications.filter(n => !n.read).length} unread notifications</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleMarkAllAsRead}
                                    className="px-4 py-2 text-sm font-medium text-brand-200 hover:bg-brand-50 rounded-lg transition-colors"
                                >
                                    Mark all as read
                                </button>
                                <button
                                    onClick={() => setShowNotificationSettings(true)}
                                    className="px-4 py-2 text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                                >
                                    Settings
                                </button>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#f7f8fa] rounded-2xl border border-slate-200 overflow-hidden"
                        >
                            {notifications.length > 0 ? (
                                <div className="divide-y divide-slate-200">
                                    {notifications.map((notification, index) => (
                                        <motion.div
                                            key={notification.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors ${!notification.read ? 'bg-brand-50/30' : ''
                                                }`}
                                            onClick={() => handleMarkAsRead(notification.id)}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-slate-300' : 'bg-brand-200'
                                                    }`} />
                                                <div className="flex-1">
                                                    <p className={`text-sm ${notification.read ? 'text-slate-600' : 'text-slate-900 font-medium'}`}>
                                                        {notification.title}
                                                    </p>
                                                    <p className="text-xs text-slate-500 mt-0.5">{notification.message}</p>
                                                    <p className="text-xs text-slate-400 mt-1">
                                                        {new Date(notification.timestamp).toLocaleString()}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteNotification(notification.id);
                                                    }}
                                                    className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-500"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-600 font-medium">No notifications</p>
                                    <p className="text-slate-400 text-sm">You're all caught up!</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                );

            // Default - Home Dashboard
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
                                value={organizers.pending.length}
                                color="orange"
                                delay={0}
                                highlight={organizers.pending.length > 0}
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
                                            {organizers.pending.length > 0 && (
                                                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold">
                                                    {organizers.pending.length}
                                                </span>
                                            )}
                                        </h2>
                                    </div>

                                    <AnimatePresence mode="popLayout">
                                        {organizers.pending.length > 0 ? (
                                            <div className="space-y-4">
                                                {organizers.pending.map((organizer, index) => (
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
                                    <div className="bg-[#f7f8fa] rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden shadow-sm">
                                        {organizers.approved.length > 0 ? (
                                            organizers.approved.slice(0, 5).map((organizer, index) => (
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
                                    className="bg-[#f7f8fa] rounded-2xl border border-slate-200 p-6 shadow-sm"
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
                                        <div className="p-4 bg-slate-50/50 rounded-xl">
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
                                        <div className="p-4 bg-brand-50 rounded-xl border border-brand-100/30">
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
                                    className="bg-[#f7f8fa] rounded-2xl border border-slate-200 p-6 shadow-sm"
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
                                    className="bg-brand-200 rounded-2xl p-6 text-white overflow-hidden relative"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    {/* Background decoration */}
                                    <div className="absolute inset-0 overflow-hidden">
                                        <motion.div
                                            className="absolute -top-8 -right-8 w-32 h-32 bg-[#f7f8fa]/10 rounded-full"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                        />
                                        <motion.div
                                            className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#f7f8fa]/10 rounded-full"
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
        <DashboardLayout title={getPageTitle()} onNavigate={handleNavigate} currentPage={currentPage}>
            {renderContent()}
        </DashboardLayout>
    );
}
