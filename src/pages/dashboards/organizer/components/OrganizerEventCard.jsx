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
    Play
} from 'lucide-react';

// Premium Event Card for Organizer
function OrganizerEventCard({ event, index }) {
    const [showMenu, setShowMenu] = useState(false);

    const statusConfig = {
        UPCOMING: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Calendar },
        ONGOING: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: Play },
        COMPLETED: { bg: 'bg-slate-100', text: 'text-slate-600', icon: CheckCircle2 }
    };

    const status = statusConfig[event.status] || statusConfig.UPCOMING;
    const StatusIcon = status.icon;
    const revenue = event.registeredCount * event.fee;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, type: 'spring', stiffness: 100 }}
            whileHover={{ y: -5, boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
            className="bg-[#f7f8fa] rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-all duration-300 group"
        >
            {/* Top accent bar based on status */}
            <div className={`h-1.5 ${event.status === 'UPCOMING' ? 'bg-blue-500' :
                event.status === 'ONGOING' ? 'bg-emerald-500' :
                    'bg-slate-400'
                }`} />

            <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-brand-200 transition-colors">{event.title}</h3>
                        <p className="text-sm text-slate-500 flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-slate-100 rounded text-xs font-medium">{event.category}</span>
                        </p>
                    </div>
                    <div className="relative">
                        <motion.button
                            onClick={() => setShowMenu(!showMenu)}
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
                                            className="w-full px-4 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3"
                                            whileHover={{ x: 4 }}
                                        >
                                            <Eye className="w-4 h-4 text-slate-400" /> View Details
                                        </motion.button>
                                        <motion.button
                                            className="w-full px-4 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3"
                                            whileHover={{ x: 4 }}
                                        >
                                            <Edit className="w-4 h-4 text-slate-400" /> Edit Event
                                        </motion.button>
                                        <motion.button
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
                        <p className="text-xs text-slate-500 mb-1">Date</p>
                        <p className="font-semibold text-slate-900 text-sm">
                            {new Date(event.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl text-center">
                        <p className="text-xs text-slate-500 mb-1">Registrations</p>
                        <p className="font-semibold text-slate-900 text-sm">
                            {event.registeredCount}/{event.capacity}
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
                        <span>{Math.round((event.registeredCount / event.capacity) * 100)}% filled</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-brand-200 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(event.registeredCount / event.capacity) * 100}%` }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <span className={`px-3 py-1.5 ${status.bg} ${status.text} rounded-lg text-xs font-semibold flex items-center gap-1.5`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {event.status}
                    </span>
                    <motion.button
                        className="text-brand-200 hover:text-brand-100 text-sm font-semibold flex items-center gap-1.5 group/btn"
                        whileHover={{ x: 3 }}
                    >
                        Manage
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default OrganizerEventCard;
