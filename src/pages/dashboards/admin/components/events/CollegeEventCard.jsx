import { motion } from 'framer-motion';
import { Calendar, Clock, Users, CheckCircle2, Activity, XCircle, ExternalLink } from 'lucide-react';

/**
 * College Event Card Component
 * Displays an event card with status indicator and registration info
 */
function CollegeEventCard({ event, index, onClick, onViewDetails }) {
    const statusConfig = {
        UPCOMING: {
            bg: 'bg-blue-100',
            text: 'text-blue-700',
            icon: Calendar,
            ringColor: 'ring-blue-200'
        },
        ONGOING: {
            bg: 'bg-emerald-100',
            text: 'text-emerald-700',
            icon: Activity,
            ringColor: 'ring-emerald-200'
        },
        COMPLETED: {
            bg: 'bg-slate-100',
            text: 'text-slate-600',
            icon: CheckCircle2,
            ringColor: 'ring-slate-200'
        },
        CANCELLED: {
            bg: 'bg-red-100',
            text: 'text-red-600',
            icon: XCircle,
            ringColor: 'ring-red-200'
        }
    };

    const config = statusConfig[event.status] || statusConfig.UPCOMING;
    const StatusIcon = config.icon;

    // Calculate fill percentage
    const fillPercentage = event.capacity > 0
        ? Math.min((event.registeredCount / event.capacity) * 100, 100)
        : 0;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            whileHover={{ y: -2, boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}
            onClick={() => onClick?.(event)}
            className="flex items-center gap-4 p-4 bg-[#f7f8fa] rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer group"
        >
            {/* Event Icon */}
            <motion.div
                className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-200/30"
                whileHover={{ scale: 1.05, rotate: -5 }}
            >
                <Calendar className="w-6 h-6 text-white" />
            </motion.div>

            {/* Event Info */}
            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 truncate group-hover:text-brand-200 transition-colors">
                    {event.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatDate(event.date)}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <Users className="w-3.5 h-3.5" />
                    <span>{event.registeredCount}/{event.capacity}</span>
                </div>

                {/* Progress bar for registration */}
                <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${fillPercentage}%` }}
                        transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
                        className={`h-full rounded-full ${fillPercentage >= 90 ? 'bg-red-400' :
                                fillPercentage >= 70 ? 'bg-amber-400' :
                                    'bg-emerald-400'
                            }`}
                    />
                </div>
            </div>

            {/* Status & Actions */}
            <div className="flex items-center gap-2">
                <span className={`px-3 py-1.5 ${config.bg} ${config.text} rounded-lg text-xs font-semibold flex items-center gap-1.5 ring-1 ${config.ringColor}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {event.status}
                </span>
                {onViewDetails && (
                    <motion.button
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(event);
                        }}
                        className="p-2 hover:bg-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        whileHover={{ scale: 1.1 }}
                    >
                        <ExternalLink className="w-4 h-4 text-slate-400" />
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}

export default CollegeEventCard;
