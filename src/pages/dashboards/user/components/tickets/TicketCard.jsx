import { motion } from 'framer-motion';
import { Ticket, ChevronRight, CheckCircle, Clock, XCircle } from 'lucide-react';

/**
 * Individual ticket card component for displaying registered event tickets
 */

// Status configuration
const statusConfig = {
    upcoming: {
        label: 'Upcoming',
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        icon: Clock
    },
    checked_in: {
        label: 'Checked In',
        bg: 'bg-emerald-100',
        text: 'text-emerald-700',
        icon: CheckCircle
    },
    completed: {
        label: 'Completed',
        bg: 'bg-slate-100',
        text: 'text-slate-500',
        icon: CheckCircle
    },
    cancelled: {
        label: 'Cancelled',
        bg: 'bg-red-100',
        text: 'text-red-700',
        icon: XCircle
    }
};

function TicketCard({
    registration,
    index = 0,
    onViewTicket,
    className = ''
}) {
    const { event, ticketNumber, amount, status: ticketStatus } = registration;
    const eventObj = event || registration;

    // Determine status
    const eventEndDate = 
        eventObj?.endDate || 
        eventObj?.startDate || 
        eventObj?.date || 
        registration?.startDate || 
        registration?.date;

    const isPast = eventObj && eventEndDate && new Date(eventEndDate) < new Date();
    const status = ticketStatus || (isPast ? 'completed' : 'upcoming');
    const statusInfo = statusConfig[status] || statusConfig.upcoming;
    const StatusIcon = statusInfo.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02, x: 5 }}
            onClick={() => onViewTicket?.(registration)}
            className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${isPast
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-[#f7f8fa] border-brand-100/50 hover:shadow-lg hover:shadow-brand-100/20'
                } ${className}`}
        >
            {/* Ticket Icon */}
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 relative ${isPast
                    ? 'bg-slate-200'
                    : 'bg-brand-100'
                }`}>
                <Ticket className={`w-7 h-7 ${isPast ? 'text-slate-400' : 'text-white'}`} />

                {/* Status indicator dot */}
                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${status === 'upcoming' ? 'bg-blue-500' :
                        status === 'checked_in' ? 'bg-emerald-500' :
                            status === 'cancelled' ? 'bg-red-500' :
                                'bg-slate-400'
                    }`} />
            </div>

            {/* Ticket Content */}
            <div className="flex-1 min-w-0">
                <h4 className={`font-semibold truncate ${isPast ? 'text-slate-500' : 'text-slate-900'}`}>
                    {eventObj?.eventName || eventObj?.title || eventObj?.name || eventObj?.event_name || registration?.eventName || registration?.title || 'Unknown Event'}
                </h4>
                <p className="text-sm text-slate-500">
                    {eventObj && new Date(eventObj.startDate || eventObj.date).toLocaleDateString('en-IN', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    {/* Ticket Number */}
                    <span className="text-xs text-brand-200 font-mono bg-brand-50 px-2 py-0.5 rounded">
                        #{ticketNumber}
                    </span>

                    {/* Status Badge */}
                    <span className={`text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1 ${statusInfo.bg} ${statusInfo.text}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                    </span>

                    {/* Amount if paid */}
                    {amount > 0 && (
                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                            ₹{amount}
                        </span>
                    )}
                </div>
            </div>

            {/* Arrow */}
            <ChevronRight className={`w-5 h-5 flex-shrink-0 ${isPast ? 'text-slate-300' : 'text-brand-200'}`} />
        </motion.div>
    );
}

export default TicketCard;
