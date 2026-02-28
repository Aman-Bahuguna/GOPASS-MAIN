import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    Calendar,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    ChevronDown,
    User,
    Building2,
    Shield,
    Ticket,
    Clock,
    CheckCircle2,
    Sparkles,
    Moon,
    Sun,
    TrendingUp,
    Zap,
    Star,
    Plus,
    BarChart3,
    FileText,
    Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';

// Animated Logo Component
const AnimatedLogo = React.memo(function AnimatedLogo() {
    return (
        <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
        >
            <div className="relative w-11 h-11 rounded-2xl bg-brand-200 flex items-center justify-center shadow-lg shadow-brand-200/30">
                <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 className="text-xl font-bold text-slate-900">
                    GoPass
                </h1>
                <p className="text-[10px] text-slate-400 -mt-0.5">Event Management</p>
            </div>
        </motion.div>
    );
});

// User Status Badge
const StatusBadge = React.memo(function StatusBadge({ status }) {
    const isActive = status === 'ACTIVE';
    return (
        <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isActive
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-amber-100 text-amber-700'
                }`}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-amber-500'}`}
            />
            {isActive ? 'Active' : 'Pending'}
        </div>
    );
});

// Enhanced Sidebar Navigation Item
const NavItem = React.memo(function NavItem({ icon: Icon, label, isActive, onClick, badge, isCollapsed }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden group ${isActive
                ? 'bg-brand-50 text-brand-300 shadow-sm'
                : 'text-slate-500 hover:bg-brand-50/60 hover:text-brand-400'
                }`}
        >
            {/* Active indicator */}
            {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-200 rounded-r-full" />
            )}

            {/* Icon container */}
            <div className={`relative p-2 rounded-lg transition-all duration-200 ${isActive
                ? 'bg-brand-200 text-white shadow-md shadow-brand-200/30'
                : 'bg-slate-100 text-slate-400 group-hover:bg-brand-100 group-hover:text-brand-400 group-hover:shadow-sm'
                }`}>
                <Icon className="w-4 h-4" />
                {badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                        {badge}
                    </span>
                )}
            </div>

            {!isCollapsed && (
                <span className="flex-1 text-left">{label}</span>
            )}
        </button>
    );
});

// Premium Sidebar
function Sidebar({ isOpen, onClose, currentPage, onNavigate }) {
    const { user, logout } = useAuth();

    const getNavItems = () => {
        const baseItems = [
            { id: 'home', icon: Home, label: 'Dashboard' },
        ];

        if (user?.role === ROLES.ADMIN) {
            return [
                ...baseItems,
                { id: 'organizers', icon: Users, label: 'Manage Organizers', badge: 0 },
                { id: 'events', icon: Calendar, label: 'College Events' },
                { id: 'analytics', icon: BarChart3, label: 'Analytics' },
                { id: 'activity', icon: Activity, label: 'Activity Log' },
                { id: 'reports', icon: FileText, label: 'Reports' },
                { id: 'college', icon: Building2, label: 'College Details' },
                { id: 'notifications', icon: Bell, label: 'Notifications' },
                { id: 'settings', icon: Settings, label: 'Settings' },
            ];
        } else if (user?.role === ROLES.ORGANIZER) {
            return [
                ...baseItems,
                { id: 'my-events', icon: Calendar, label: 'My Events' },
                { id: 'create-event', icon: Plus, label: 'Create Event' },
                { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
                { id: 'settings', icon: Settings, label: 'Settings' },
            ];
        } else {
            return [
                ...baseItems,
                { id: 'events', icon: Calendar, label: 'Explore Events' },
                { id: 'tickets', icon: Ticket, label: 'My Tickets' },
                { id: 'favorites', icon: Star, label: 'Favorites' },
                { id: 'settings', icon: Settings, label: 'Settings' },
            ];
        }
    };

    const navItems = getNavItems();

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-72 h-screen bg-[#f7f8fa]/90 backdrop-blur-xl border-r border-slate-200 flex flex-col transform lg:transform-none transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                {/* Header */}
                <div className="p-4 border-b border-slate-200 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <AnimatedLogo />
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
                        >
                            <X className="w-5 h-5 text-slate-500" />
                        </button>
                    </div>
                </div>

                {/* User Profile Card */}
                <div className="px-3 py-2 flex-shrink-0">
                    <motion.div
                        className="relative p-3 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden"
                        whileHover={{ y: -1 }}
                    >
                        <div className="relative flex items-center gap-3">
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="w-10 h-10 rounded-lg bg-brand-200 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-brand-200/30">
                                    {user?.fullName?.charAt(0).toUpperCase()}
                                </div>
                                <motion.div
                                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </motion.div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-slate-900 truncate text-sm">{user?.fullName}</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500 capitalize">{user?.role?.toLowerCase()}</span>
                                    <StatusBadge status={user?.status} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto min-h-0">
                    {navItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <NavItem
                                icon={item.icon}
                                label={item.label}
                                badge={item.badge}
                                isActive={currentPage === item.id}
                                onClick={() => onNavigate(item.id)}
                            />
                        </motion.div>
                    ))}
                </nav>

                {/* Footer Actions */}
                <div className="p-3 border-t border-slate-200 space-y-2 flex-shrink-0">
                    {/* Premium upgrade card - compact version */}
                    <motion.div
                        className="relative p-3 rounded-xl bg-brand-200 text-white overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                    >
                        {/* Animated background circles */}
                        <motion.div
                            className="absolute -top-3 -right-3 w-12 h-12 bg-white/10 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <div className="relative flex items-center gap-3">
                            <div className="flex-shrink-0">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="font-semibold text-sm">Pro Features</span>
                                <p className="text-xs text-white/70 truncate">Unlock advanced tools</p>
                            </div>
                            <motion.button
                                className="px-3 py-1.5 bg-white text-brand-200 rounded-lg font-semibold text-xs flex-shrink-0"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Upgrade
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Logout button */}
                    <motion.button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium text-sm">Logout</span>
                    </motion.button>
                </div>
            </motion.aside>
        </>
    );
}

// Premium Header
function Header({ onMenuClick, title, onNavigate }) {
    const { user, logout } = useAuth();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const handleNavigate = (page) => {
        setShowProfile(false);
        onNavigate && onNavigate(page);
    };

    const notifications = [
        { id: 1, title: 'New event registration', time: '2 min ago', unread: true },
        { id: 2, title: 'Approval request pending', time: '1 hour ago', unread: true },
        { id: 3, title: 'Weekly report ready', time: '3 hours ago', unread: false },
    ];

    return (
        <header className="sticky top-0 z-30 bg-[#f7f8fa]/80 backdrop-blur-xl border-b border-slate-200">
            <div className="px-4 lg:px-8 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Left section */}
                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={onMenuClick}
                            className="lg:hidden p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Menu className="w-5 h-5 text-slate-600" />
                        </motion.button>

                        <div>
                            <motion.h1
                                className="text-xl lg:text-2xl font-bold text-slate-900"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {title}
                            </motion.h1>
                            <motion.p
                                className="text-sm text-slate-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                {currentTime.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </motion.p>
                        </div>
                    </div>

                    {/* Right section */}
                    <div className="flex items-center gap-2 lg:gap-3">
                        {/* Search */}
                        <motion.div
                            className="hidden lg:flex items-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search anything..."
                                    className="w-64 pl-11 pr-4 py-2.5 bg-slate-100 border-0 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-200/50 transition-all"
                                />
                            </div>
                        </motion.div>

                        {/* Mobile search */}
                        <motion.button
                            onClick={() => setShowSearch(!showSearch)}
                            className="lg:hidden p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Search className="w-5 h-5 text-slate-600" />
                        </motion.button>

                        {/* Notifications */}
                        <div className="relative">
                            <motion.button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Bell className="w-5 h-5 text-slate-600" />
                                <motion.span
                                    className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </motion.button>

                            <AnimatePresence>
                                {showNotifications && (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="fixed inset-0 z-40"
                                            onClick={() => setShowNotifications(false)}
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-2 w-80 bg-[#f7f8fa] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50"
                                        >
                                            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                                                <h3 className="font-semibold text-slate-900">Notifications</h3>
                                                <span className="px-2 py-0.5 bg-brand-100/10 text-brand-200 rounded-full text-xs font-medium">
                                                    {notifications.filter(n => n.unread).length} new
                                                </span>
                                            </div>
                                            <div className="max-h-64 overflow-y-auto">
                                                {notifications.map((notification, index) => (
                                                    <motion.div
                                                        key={notification.id}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors ${notification.unread ? 'bg-brand-50/30' : ''
                                                            }`}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className={`p-2 rounded-lg ${notification.unread
                                                                ? 'bg-brand-100/10 text-brand-200'
                                                                : 'bg-slate-100 text-slate-500'
                                                                }`}>
                                                                <Bell className="w-4 h-4" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className={`text-sm ${notification.unread ? 'font-medium text-slate-900' : 'text-slate-600'}`}>
                                                                    {notification.title}
                                                                </p>
                                                                <p className="text-xs text-slate-400 mt-0.5">{notification.time}</p>
                                                            </div>
                                                            {notification.unread && (
                                                                <div className="w-2 h-2 bg-brand-200 rounded-full" />
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <div className="p-3 border-t border-slate-200">
                                                <button className="w-full py-2 text-brand-200 hover:bg-brand-50 rounded-lg text-sm font-medium transition-colors">
                                                    View all notifications
                                                </button>
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Profile */}
                        <div className="relative">
                            <motion.button
                                onClick={() => setShowProfile(!showProfile)}
                                className="flex items-center gap-3 pl-3 pr-1.5 py-1.5 hover:bg-slate-100 rounded-xl transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-slate-900">{user?.fullName?.split(' ')[0]}</p>
                                    <p className="text-xs text-slate-500 capitalize">{user?.role?.toLowerCase()}</p>
                                </div>
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-xl bg-brand-200 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-200/20">
                                        {user?.fullName?.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
                            </motion.button>

                            <AnimatePresence>
                                {showProfile && (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="fixed inset-0 z-40"
                                            onClick={() => setShowProfile(false)}
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-2 w-64 bg-[#f7f8fa] rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 overflow-hidden"
                                        >
                                            {/* User info header */}
                                            <div className="px-4 py-3 bg-brand-50 border-b border-slate-200">
                                                <p className="font-semibold text-slate-900">{user?.fullName}</p>
                                                <p className="text-sm text-slate-500">{user?.email}</p>
                                            </div>

                                            <div className="py-2">
                                                <motion.button
                                                    onClick={() => handleNavigate('profile')}
                                                    className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                                                    whileHover={{ x: 4 }}
                                                >
                                                    <div className="p-1.5 rounded-lg bg-slate-100">
                                                        <User className="w-4 h-4 text-slate-500" />
                                                    </div>
                                                    View Profile
                                                </motion.button>
                                                <motion.button
                                                    onClick={() => handleNavigate('settings')}
                                                    className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                                                    whileHover={{ x: 4 }}
                                                >
                                                    <div className="p-1.5 rounded-lg bg-slate-100">
                                                        <Settings className="w-4 h-4 text-slate-500" />
                                                    </div>
                                                    Settings
                                                </motion.button>
                                            </div>

                                            <div className="pt-2 mt-2 border-t border-slate-200">
                                                <motion.button
                                                    onClick={logout}
                                                    className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                                                    whileHover={{ x: 4 }}
                                                >
                                                    <div className="p-1.5 rounded-lg bg-red-100">
                                                        <LogOut className="w-4 h-4 text-red-500" />
                                                    </div>
                                                    Sign out
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

// Main Dashboard Layout
export default function DashboardLayout({ children, title = 'Dashboard', onNavigate, currentPage = 'home' }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleNavigate = (page) => {
        setSidebarOpen(false);
        onNavigate && onNavigate(page);
    };

    return (
        <div className="h-screen overflow-hidden bg-[#f7f8fa] flex">
            {/* Decorative background elements */}
            {/* Subtle decorative background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
            </div>

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                currentPage={currentPage}
                onNavigate={handleNavigate}
            />

            <div className="flex-1 flex flex-col min-w-0 relative h-screen overflow-hidden">
                <Header
                    onMenuClick={() => setSidebarOpen(true)}
                    title={title}
                    onNavigate={handleNavigate}
                />

                <main className="flex-1 p-4 lg:p-6 overflow-y-auto min-h-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
