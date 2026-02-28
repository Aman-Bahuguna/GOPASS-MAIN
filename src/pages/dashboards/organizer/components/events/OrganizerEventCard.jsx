import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    CheckCircle2,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    ChevronRight,
    Play,
    Copy,
    Users,
    MapPin,
    Clock
} from 'lucide-react';

/**
 * OrganizerEventCard - Premium event card for organizer dashboard
 * @param {Object} props
 * @param {Object} props.event - Event data object
 * @param {number} props.index - Index for staggered animation
 * @param {Function} [props.onView] - View event handler
 * @param {Function} [props.onEdit] - Edit event handler
 * @param {Function} [props.onDelete] - Delete event handler
 * @param {Function} [props.onDuplicate] - Duplicate event handler
 * @param {Function} [props.onManage] - Manage event handler
 * @param {Function} [props.onViewAttendees] - View attendee list handler
 * @param {boolean} [props.selected] - Whether card is selected
 * @param {Function} [props.onSelect] - Selection handler
 */
function OrganizerEventCard({
    event,
    index,
    onView,
    onEdit,
    onDelete,
    onDuplicate,
    onManage,
    onViewAttendees,
    selected,
    onSelect
}) {
    const [showMenu, setShowMenu] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const statusConfig = {
        UPCOMING: {
            bg: 'bg-blue-100',
            text: 'text-blue-700',
            icon: Calendar,
            solid: 'bg-blue-500',
            label: 'Upcoming'
        },
        ONGOING: {
            bg: 'bg-emerald-100',
            text: 'text-emerald-700',
            icon: Play,
            solid: 'bg-emerald-500',
            label: 'Live'
        },
        COMPLETED: {
            bg: 'bg-slate-100',
            text: 'text-slate-600',
            icon: CheckCircle2,
            solid: 'bg-slate-400',
            label: 'Completed'
        },
        DRAFT: {
            bg: 'bg-amber-100',
            text: 'text-amber-700',
            icon: Edit,
            solid: 'bg-amber-500',
            label: 'Draft'
        }
    };

    const status = statusConfig[event.status] || statusConfig.UPCOMING;
    const StatusIcon = status.icon;
    const revenue = (event.registeredCount || 0) * (event.fee || 0);
    const fillPercentage = event.capacity > 0
        ? Math.round((event.registeredCount / event.capacity) * 100)
        : 0;

    const handleMenuAction = (action, e) => {
        e?.stopPropagation();
        setShowMenu(false);
        action?.();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, type: 'spring', stiffness: 100 }}
            whileHover={{ y: -5, boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`relative bg-[#f7f8fa] rounded-2xl border overflow-hidden transition-all duration-300 group ${selected
                    ? 'border-brand-200 ring-2 ring-brand-200/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
        >
            {/* Selection checkbox */}
            {onSelect && (
                <motion.div
                    className="absolute top-4 left-4 z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isHovered || selected ? 1 : 0, scale: isHovered || selected ? 1 : 0.8 }}
                >
                    <label className="relative cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => onSelect(event.id)}
                            className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${selected
                                ? 'bg-brand-200 border-brand-200'
                                : 'bg-white border-slate-300 hover:border-brand-200'
                            }`}>
                            {selected && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </div>
                    </label>
                </motion.div>
            )}

            {/* Top accent bar based on status */}
            <div className={`h-1.5 ${status.solid}`} />

            <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 pr-4">
                        <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-brand-200 transition-colors line-clamp-1">
                            {event.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span className="px-2 py-0.5 bg-slate-100 rounded text-xs font-medium">
                                {event.category}
                            </span>
                            {event.venue && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    <span className="truncate max-w-[100px]">{event.venue}</span>
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Menu button */}
                    <div className="relative">
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowMenu(!showMenu);
                            }}
                            className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <MoreVertical className="w-5 h-5 text-slate-400" />
                        </motion.button>

                        <AnimatePresence>
                            {showMenu && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowMenu(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        className="absolute right-0 mt-2 w-48 bg-[#f7f8fa] rounded-xl shadow-2xl border border-slate-200 py-2 z-50 overflow-hidden"
                                    >
                                        <motion.button
                                            onClick={(e) => handleMenuAction(onView, e)}
                                            className="w-full px-4 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3"
                                            whileHover={{ x: 4 }}
                                        >
                                            <Eye className="w-4 h-4 text-slate-400" /> View Details
                                        </motion.button>
                                        <motion.button
                                            onClick={(e) => handleMenuAction(onEdit, e)}
                                            className="w-full px-4 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3"
                                            whileHover={{ x: 4 }}
                                        >
                                            <Edit className="w-4 h-4 text-slate-400" /> Edit Event
                                        </motion.button>
                                        <motion.button
                                            onClick={(e) => handleMenuAction(onDuplicate, e)}
                                            className="w-full px-4 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3"
                                            whileHover={{ x: 4 }}
                                        >
                                            <Copy className="w-4 h-4 text-slate-400" /> Duplicate
                                        </motion.button>
                                        <div className="my-1 border-t border-slate-200" />
                                        <motion.button
                                            onClick={(e) => handleMenuAction(onDelete, e)}
                                            className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                                            whileHover={{ x: 4 }}
                                        >
                                            <Trash2 className="w-4 h-4" /> Delete
                                        </motion.button>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="p-3 bg-slate-50 rounded-xl text-center">
                        <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                            <Clock className="w-3 h-3" />
                            <p className="text-xs">Date</p>
                        </div>
                        <p className="font-semibold text-slate-900 text-sm">
                            {new Date(event.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl text-center">
                        <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                            <Users className="w-3 h-3" />
                            <p className="text-xs">Registrations</p>
                        </div>
                        <p className="font-semibold text-slate-900 text-sm">
                            {event.registeredCount || 0}/{event.capacity || 0}
                        </p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl text-center">
                        <p className="text-xs text-emerald-600 mb-1">Revenue</p>
                        <p className="font-semibold text-emerald-700 text-sm">
                            ₹{revenue.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-500 mb-2">
                        <span>Capacity</span>
                        <span className={fillPercentage >= 90 ? 'text-emerald-600 font-medium' : ''}>
                            {fillPercentage}% filled
                        </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full rounded-full ${fillPercentage >= 90
                                    ? 'bg-emerald-500'
                                    : 'bg-brand-200'
                                }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${fillPercentage}%` }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <span className={`px-3 py-1.5 ${status.bg} ${status.text} rounded-lg text-xs font-semibold flex items-center gap-1.5`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                    </span>
                    <div className="flex items-center gap-4">
                        {onViewAttendees && (
                            <motion.button
                                onClick={(e) => { e.stopPropagation(); onViewAttendees(event); }}
                                className="text-slate-500 hover:text-slate-700 text-sm font-semibold flex items-center gap-1.5"
                                whileHover={{ x: 3 }}
                            >
                                <Users className="w-4 h-4" />
                                Attendees
                            </motion.button>
                        )}

                        <motion.button
                            onClick={onManage}
                            className="text-brand-200 hover:text-brand-100 text-sm font-semibold flex items-center gap-1.5 group/btn"
                            whileHover={{ x: 3 }}
                        >
                            Manage
                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default OrganizerEventCard;
