import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Check,
    Trash2,
    ExternalLink,
    UserPlus,
    Calendar,
    AlertCircle,
    MessageCircle,
    Info,
    CheckCircle2,
    XCircle,
    Bell
} from 'lucide-react';

/**
 * Notification Item Component
 * Individual notification entry with actions
 */
function NotificationItem({
    notification,
    index,
    onMarkAsRead,
    onDelete,
    onAction
}) {
    const [isHovered, setIsHovered] = useState(false);

    // Notification type configurations
    const typeConfig = {
        new_organizer: {
            icon: UserPlus,
            bg: 'bg-blue-100',
            color: 'text-blue-600',
            actionLabel: 'Review'
        },
        organizer_approved: {
            icon: CheckCircle2,
            bg: 'bg-emerald-100',
            color: 'text-emerald-600',
            actionLabel: 'View'
        },
        organizer_rejected: {
            icon: XCircle,
            bg: 'bg-red-100',
            color: 'text-red-600',
            actionLabel: 'View'
        },
        new_event: {
            icon: Calendar,
            bg: 'bg-purple-100',
            color: 'text-purple-600',
            actionLabel: 'View Event'
        },
        event_cancelled: {
            icon: AlertCircle,
            bg: 'bg-amber-100',
            color: 'text-amber-600',
            actionLabel: 'Details'
        },
        message: {
            icon: MessageCircle,
            bg: 'bg-pink-100',
            color: 'text-pink-600',
            actionLabel: 'Reply'
        },
        system: {
            icon: Info,
            bg: 'bg-slate-100',
            color: 'text-slate-600',
            actionLabel: 'Learn More'
        },
        reminder: {
            icon: Bell,
            bg: 'bg-indigo-100',
            color: 'text-indigo-600',
            actionLabel: 'View'
        }
    };

    const config = typeConfig[notification.type] || typeConfig.system;
    const Icon = config.icon;

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;

        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: index * 0.05 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative px-4 py-3 cursor-pointer transition-colors ${notification.read ? 'bg-white' : 'bg-brand-50/30'
                } hover:bg-slate-50`}
        >
            {/* Unread indicator */}
            {!notification.read && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 bg-brand-200 rounded-full"
                />
            )}

            <div className="flex gap-3">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm ${notification.read ? 'text-slate-600' : 'text-slate-900 font-medium'}`}>
                            {notification.title}
                        </p>
                        <span className="text-xs text-slate-400 whitespace-nowrap">
                            {formatTimestamp(notification.timestamp)}
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                        {notification.message}
                    </p>

                    {/* Action button */}
                    {notification.actionable && (
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation();
                                onAction?.();
                            }}
                            className="mt-2 text-xs font-medium text-brand-200 hover:text-brand-100 flex items-center gap-1"
                            whileHover={{ x: 2 }}
                        >
                            {config.actionLabel}
                            <ExternalLink className="w-3 h-3" />
                        </motion.button>
                    )}
                </div>

                {/* Hover Actions */}
                <div className={`flex items-center gap-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                    {!notification.read && (
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation();
                                onMarkAsRead?.();
                            }}
                            className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
                            title="Mark as read"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Check className="w-4 h-4 text-emerald-500" />
                        </motion.button>
                    )}
                    <motion.button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.();
                        }}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Trash2 className="w-4 h-4 text-red-400" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default NotificationItem;
