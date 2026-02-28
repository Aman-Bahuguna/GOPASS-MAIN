import { motion } from 'framer-motion';
import {
    Zap,
    BarChart2,
    DollarSign,
    Users,
    PlusCircle,
    Settings,
    ChevronRight,
    Calendar,
    QrCode
} from 'lucide-react';

/**
 * QuickActions - Quick action buttons sidebar card
 * @param {Object} props
 * @param {boolean} props.canCreate - Whether user can create events
 * @param {Function} [props.onCreateEvent] - Create event handler
 * @param {Function} [props.onViewAnalytics] - View analytics handler
 * @param {Function} [props.onViewRevenue] - View revenue handler
 * @param {Function} [props.onViewAttendees] - View attendees handler
 * @param {Function} [props.onOpenScanner] - Open QR scanner handler
 * @param {Function} [props.onOpenSettings] - Open settings handler
 * @param {number} [props.delay] - Animation delay
 */
export default function QuickActions({
    canCreate,
    onCreateEvent,
    onViewAnalytics,
    onViewRevenue,
    onViewAttendees,
    onOpenScanner,
    onOpenSettings,
    delay = 0.7
}) {
    const actions = [
        {
            id: 'create',
            icon: PlusCircle,
            label: 'Create Event',
            description: 'Start a new event',
            color: 'brand',
            bgColor: 'bg-brand-100/10',
            iconColor: 'text-brand-200',
            onClick: onCreateEvent,
            primary: true,
            requiresPermission: true
        },
        {
            id: 'analytics',
            icon: BarChart2,
            label: 'View Analytics',
            description: 'Event insights',
            color: 'blue',
            bgColor: 'bg-blue-100',
            iconColor: 'text-blue-600',
            onClick: onViewAnalytics
        },
        {
            id: 'revenue',
            icon: DollarSign,
            label: 'Revenue Report',
            description: 'Earnings overview',
            color: 'emerald',
            bgColor: 'bg-emerald-100',
            iconColor: 'text-emerald-600',
            onClick: onViewRevenue
        },
        {
            id: 'attendees',
            icon: Users,
            label: 'Attendee List',
            description: 'Manage attendees',
            color: 'purple',
            bgColor: 'bg-purple-100',
            iconColor: 'text-purple-600',
            onClick: onViewAttendees
        },
        {
            id: 'scanner',
            icon: QrCode,
            label: 'Scan Tickets',
            description: 'Check-in attendees',
            color: 'amber',
            bgColor: 'bg-amber-100',
            iconColor: 'text-amber-600',
            onClick: onOpenScanner
        }
    ];

    // Filter actions based on permissions
    const availableActions = actions.filter(action =>
        !action.requiresPermission || canCreate
    );

    if (!canCreate) {
        return null;
    }

    return (
        <motion.div
            className="bg-[#f7f8fa] rounded-2xl border border-slate-200 p-6 shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
        >
            {/* Header */}
            <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-3">
                <div className="p-2 bg-brand-100/10 rounded-lg">
                    <Zap className="w-5 h-5 text-brand-200" />
                </div>
                Quick Actions
            </h3>

            {/* Actions list */}
            <div className="space-y-2">
                {availableActions.map((action, index) => (
                    <motion.button
                        key={action.id}
                        onClick={action.onClick}
                        className={`w-full p-3 text-left rounded-xl flex items-center gap-3 transition-all group ${action.primary
                                ? 'bg-brand-100 text-white shadow-lg shadow-brand-200/20 hover:shadow-xl hover:shadow-brand-200/30'
                                : 'hover:bg-slate-50'
                            }`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: delay + index * 0.05 }}
                        whileHover={{ x: action.primary ? 0 : 4 }}
                    >
                        <div className={`p-2 rounded-lg ${action.primary ? 'bg-[#f7f8fa]/20' : action.bgColor
                            }`}>
                            <action.icon className={`w-4 h-4 ${action.primary ? 'text-white' : action.iconColor
                                }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className={`font-medium block ${action.primary ? 'text-white' : 'text-slate-700'
                                }`}>
                                {action.label}
                            </span>
                            <span className={`text-xs ${action.primary ? 'text-white/70' : 'text-slate-400'
                                }`}>
                                {action.description}
                            </span>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform ${action.primary
                                ? 'text-white/70 group-hover:translate-x-1'
                                : 'text-slate-400 group-hover:translate-x-1'
                            }`} />
                    </motion.button>
                ))}
            </div>

            {/* Footer actions */}
            <div className="mt-4 pt-4 border-t border-slate-200">
                <motion.button
                    onClick={onOpenSettings}
                    className="w-full p-2.5 text-center text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.01 }}
                >
                    <Settings className="w-4 h-4" />
                    Dashboard Settings
                </motion.button>
            </div>
        </motion.div>
    );
}
