import { motion } from 'framer-motion';
import {
    UserCheck,
    UserX,
    Calendar,
    CalendarX,
    Settings,
    Edit,
    Bell,
    Mail,
    FileText,
    ExternalLink
} from 'lucide-react';

/**
 * Activity Item Component
 * Individual activity entry in the activity log
 */
function ActivityItem({ activity, index, onClick }) {
    // Activity type configurations
    const typeConfig = {
        organizer_approved: {
            icon: UserCheck,
            bg: 'bg-emerald-100',
            color: 'text-emerald-600',
            label: 'Organizer Approved'
        },
        organizer_rejected: {
            icon: UserX,
            bg: 'bg-red-100',
            color: 'text-red-600',
            label: 'Organizer Rejected'
        },
        event_created: {
            icon: Calendar,
            bg: 'bg-blue-100',
            color: 'text-blue-600',
            label: 'Event Created'
        },
        event_cancelled: {
            icon: CalendarX,
            bg: 'bg-amber-100',
            color: 'text-amber-600',
            label: 'Event Cancelled'
        },
        settings_changed: {
            icon: Settings,
            bg: 'bg-purple-100',
            color: 'text-purple-600',
            label: 'Settings Updated'
        },
        profile_updated: {
            icon: Edit,
            bg: 'bg-slate-100',
            color: 'text-slate-600',
            label: 'Profile Updated'
        },
        notification_sent: {
            icon: Bell,
            bg: 'bg-pink-100',
            color: 'text-pink-600',
            label: 'Notification Sent'
        },
        message_sent: {
            icon: Mail,
            bg: 'bg-indigo-100',
            color: 'text-indigo-600',
            label: 'Message Sent'
        },
        report_generated: {
            icon: FileText,
            bg: 'bg-teal-100',
            color: 'text-teal-600',
            label: 'Report Generated'
        }
    };

    const config = typeConfig[activity.type] || {
        icon: Bell,
        bg: 'bg-slate-100',
        color: 'text-slate-600',
        label: 'Activity'
    };

    const Icon = config.icon;

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ backgroundColor: 'rgba(248, 250, 252, 1)' }}
            onClick={() => onClick?.(activity)}
            className="flex items-start gap-4 p-4 cursor-pointer group"
        >
            {/* Icon */}
            <motion.div
                className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}
                whileHover={{ scale: 1.05 }}
            >
                <Icon className={`w-5 h-5 ${config.color}`} />
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <p className="font-medium text-slate-900">
                            {activity.title || config.label}
                        </p>
                        <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">
                            {activity.description}
                        </p>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap mt-0.5">
                        {formatTimestamp(activity.timestamp)}
                    </span>
                </div>

                {/* Target info */}
                {activity.target && (
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-lg">
                            {activity.targetType}: {activity.target}
                        </span>
                    </div>
                )}

                {/* Actor info */}
                {activity.actor && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                        <span>by {activity.actor}</span>
                    </div>
                )}
            </div>

            {/* View action */}
            {onClick && (
                <motion.button
                    className="p-2 hover:bg-slate-200 rounded-lg opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                >
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                </motion.button>
            )}
        </motion.div>
    );
}

export default ActivityItem;
