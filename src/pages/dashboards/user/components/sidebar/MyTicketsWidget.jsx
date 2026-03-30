import { motion } from 'framer-motion';
import { Ticket, ChevronRight, ArrowRight } from 'lucide-react';

/**
 * Sidebar widget showing quick preview of upcoming tickets
 */
function MyTicketsWidget({
    registrations = [],
    onViewTicket,
    onViewAll,
    maxDisplay = 3,
    className = ''
}) {
    const upcomingTickets = registrations
        .filter(reg => {
            const eventObj = reg.event || reg;
            const dStr = eventObj.endDate || eventObj.startDate || eventObj.date || reg.startDate || reg.date;
            return !dStr || new Date(dStr) >= new Date();
        })
        .sort((a, b) => {
            const getD = (r) => {
                const o = r.event || r;
                const d = o.startDate || o.date || r.startDate || r.date;
                return d ? new Date(d).getTime() : Infinity;
            };
            return getD(a) - getD(b);
        })
        .slice(0, maxDisplay);

    return (
        <motion.div
            className={`bg-[#f7f8fa] rounded-2xl border border-slate-200 p-5 ${className}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
        >
            {/* Header */}
            <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-100/10 flex items-center justify-center">
                    <Ticket className="w-4 h-4 text-brand-200" />
                </div>
                My Tickets
            </h3>

            {upcomingTickets.length > 0 ? (
                <div className="space-y-3">
                    {upcomingTickets.map((reg, index) => {
                        const eventObj = reg.event || reg;
                        const dStr = eventObj.endDate || eventObj.startDate || eventObj.date || reg.startDate || reg.date;
                        const isPastData = dStr && new Date(dStr) < new Date();

                        return (
                            <motion.div
                                key={reg.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                                whileHover={{ scale: 1.02, x: 3 }}
                                onClick={() => onViewTicket?.(reg)}
                                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${isPastData
                                        ? 'bg-slate-50 border-slate-200 opacity-60'
                                        : 'bg-[#f7f8fa] border-brand-100/50 hover:shadow-md'
                                    }`}
                            >
                                {/* Mini ticket icon */}
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isPastData
                                        ? 'bg-slate-200'
                                        : 'bg-brand-100'
                                    }`}>
                                    <Ticket className={`w-5 h-5 ${isPastData ? 'text-slate-400' : 'text-white'}`} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm text-slate-900 truncate">
                                        {eventObj.eventName || eventObj.title || reg.eventName || reg.title || 'Unknown Event'}
                                    </h4>
                                    <p className="text-xs text-slate-500">
                                        {dStr ? new Date(dStr).toLocaleDateString('en-IN', {
                                            month: 'short',
                                            day: 'numeric'
                                        }) : 'TBD'}
                                    </p>
                                </div>

                                <ChevronRight className="w-4 h-4 text-slate-300" />
                            </motion.div>
                        );
                    })}

                    {/* View all link */}
                    {registrations.length > maxDisplay && (
                        <motion.button
                            onClick={onViewAll}
                            className="w-full py-2.5 text-brand-200 hover:text-brand-100 text-sm font-medium flex items-center justify-center gap-1 hover:bg-brand-50 rounded-xl transition-colors"
                            whileHover={{ scale: 1.02 }}
                        >
                            View all {registrations.length} tickets
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    )}
                </div>
            ) : (
                <div className="text-center py-6">
                    <Ticket className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">No tickets yet</p>
                    <p className="text-slate-400 text-xs mt-1">Register for an event to get started!</p>
                </div>
            )}
        </motion.div>
    );
}

export default MyTicketsWidget;
