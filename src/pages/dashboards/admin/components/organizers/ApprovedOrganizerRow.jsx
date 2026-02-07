import { motion } from 'framer-motion';
import { CheckCircle2, ExternalLink, MoreVertical, Mail, Calendar } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

/**
 * Approved Organizer Row Component
 * Displays an approved organizer in a compact row format
 */
function ApprovedOrganizerRow({
    organizer,
    index,
    onViewDetails,
    onViewEvents,
    onSendMessage,
    onRevoke
}) {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getEventsCount = () => {
        // In a real app, this would come from the organizer data
        return organizer.eventsCount || 0;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            whileHover={{ backgroundColor: 'rgba(248, 250, 252, 1)' }}
            className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all group"
        >
            <motion.div
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md shadow-emerald-200/50"
                whileHover={{ scale: 1.05, rotate: 5 }}
            >
                {organizer.fullName.charAt(0).toUpperCase()}
            </motion.div>

            <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 truncate">{organizer.fullName}</p>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="capitalize">{organizer.position?.toLowerCase()}</span>
                    {getEventsCount() > 0 && (
                        <>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span>{getEventsCount()} events</span>
                        </>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* Approved badge */}
                <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approved
                </span>

                {/* View details button */}
                <motion.button
                    onClick={() => onViewDetails?.(organizer)}
                    className="p-2 hover:bg-slate-200 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    whileHover={{ scale: 1.1 }}
                    title="View details"
                >
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                </motion.button>

                {/* Actions menu */}
                <div ref={menuRef} className="relative">
                    <motion.button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-2 hover:bg-slate-200 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        whileHover={{ scale: 1.1 }}
                    >
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                    </motion.button>

                    {showMenu && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-10 overflow-hidden"
                        >
                            <button
                                onClick={() => {
                                    onViewEvents?.(organizer);
                                    setShowMenu(false);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                                <Calendar className="w-4 h-4" />
                                View Events
                            </button>
                            <button
                                onClick={() => {
                                    onSendMessage?.(organizer);
                                    setShowMenu(false);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                Send Message
                            </button>
                            <div className="h-px bg-slate-100" />
                            <button
                                onClick={() => {
                                    onRevoke?.(organizer);
                                    setShowMenu(false);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                Revoke Approval
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default ApprovedOrganizerRow;
