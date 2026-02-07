import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell,
    X,
    Check,
    CheckCheck,
    Settings,
    Trash2,
    UserPlus,
    Calendar,
    AlertCircle,
    MessageCircle,
    Info
} from 'lucide-react';
import NotificationItem from './NotificationItem';
import { ActionButton } from '../common';

/**
 * Notifications Panel Component
 * Slide-out panel for viewing notifications
 */
function NotificationsPanel({
    isOpen,
    onClose,
    notifications = [],
    onMarkAsRead,
    onMarkAllAsRead,
    onDelete,
    onClearAll,
    onAction,
    onSettings,
    loading = false
}) {
    const panelRef = useRef(null);
    const [filter, setFilter] = useState('all'); // 'all' | 'unread'

    const unreadCount = notifications.filter(n => !n.read).length;

    const filteredNotifications = filter === 'unread'
        ? notifications.filter(n => !n.read)
        : notifications;

    // Group notifications by date
    const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
        const date = new Date(notification.timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        let groupKey;
        if (date.toDateString() === today.toDateString()) {
            groupKey = 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            groupKey = 'Yesterday';
        } else {
            groupKey = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        }

        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(notification);
        return groups;
    }, {});

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
                    />

                    {/* Panel */}
                    <motion.div
                        ref={panelRef}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-brand-100/20 rounded-xl">
                                    <Bell className="w-5 h-5 text-brand-200" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-slate-900">Notifications</h2>
                                    <p className="text-xs text-slate-500">
                                        {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {onSettings && (
                                    <motion.button
                                        onClick={onSettings}
                                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Settings className="w-5 h-5 text-slate-400" />
                                    </motion.button>
                                )}
                                <motion.button
                                    onClick={onClose}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-5 h-5 text-slate-400" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-2 p-4 pb-0">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === 'all'
                                        ? 'bg-brand-200 text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('unread')}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${filter === 'unread'
                                        ? 'bg-brand-200 text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                Unread
                                {unreadCount > 0 && (
                                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${filter === 'unread' ? 'bg-white/20' : 'bg-brand-100 text-brand-200'
                                        }`}>
                                        {unreadCount}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Quick Actions */}
                        {unreadCount > 0 && (
                            <div className="flex items-center justify-end gap-2 px-4 pt-3">
                                <button
                                    onClick={onMarkAllAsRead}
                                    className="text-xs text-brand-200 hover:text-brand-100 font-medium flex items-center gap-1"
                                >
                                    <CheckCheck className="w-3 h-3" />
                                    Mark all as read
                                </button>
                            </div>
                        )}

                        {/* Notifications List */}
                        <div className="flex-1 overflow-y-auto">
                            {loading ? (
                                <div className="p-8 text-center">
                                    <div className="w-8 h-8 border-2 border-brand-200 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                                    <p className="text-slate-500 text-sm">Loading notifications...</p>
                                </div>
                            ) : filteredNotifications.length === 0 ? (
                                <div className="p-8 text-center">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Bell className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <p className="text-slate-600 font-medium">
                                        {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                                    </p>
                                    <p className="text-slate-400 text-sm mt-1">
                                        {filter === 'unread' ? "You're all caught up!" : "We'll notify you when something happens"}
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {Object.entries(groupedNotifications).map(([date, items]) => (
                                        <div key={date}>
                                            <div className="px-4 py-2 bg-slate-50 sticky top-0">
                                                <span className="text-xs font-semibold text-slate-500 uppercase">
                                                    {date}
                                                </span>
                                            </div>
                                            {items.map((notification, index) => (
                                                <NotificationItem
                                                    key={notification.id}
                                                    notification={notification}
                                                    index={index}
                                                    onMarkAsRead={() => onMarkAsRead?.(notification.id)}
                                                    onDelete={() => onDelete?.(notification.id)}
                                                    onAction={() => onAction?.(notification)}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {notifications.length > 0 && (
                            <div className="p-4 border-t border-slate-100 bg-slate-50">
                                <button
                                    onClick={onClearAll}
                                    className="w-full py-2 text-sm text-red-500 hover:text-red-600 font-medium flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Clear all notifications
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default NotificationsPanel;
