import { motion } from 'framer-motion';
import { Ticket, ChevronRight } from 'lucide-react';

// Registered Event Card (Ticket)
function TicketCard({ registration, index, onViewTicket }) {
    const { event, ticketNumber, amount } = registration;
    const isPast = event && new Date(event.endDate) < new Date();

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02, x: 5 }}
            onClick={() => onViewTicket(registration)}
            className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${isPast
                ? 'bg-slate-50 border-slate-200'
                : 'bg-gradient-to-r from-white to-brand-50/30 border-brand-100/50 hover:shadow-lg hover:shadow-brand-100/20'
                }`}
        >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${isPast
                ? 'bg-slate-200'
                : 'bg-gradient-to-br from-brand-100 to-brand-300'
                }`}>
                <Ticket className={`w-7 h-7 ${isPast ? 'text-slate-400' : 'text-white'}`} />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className={`font-semibold truncate ${isPast ? 'text-slate-500' : 'text-slate-900'}`}>
                    {event?.title}
                </h4>
                <p className="text-sm text-slate-500">
                    {event && new Date(event.date).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-brand-200 font-mono bg-brand-50 px-2 py-0.5 rounded">
                        #{ticketNumber}
                    </span>
                    {isPast && (
                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                            Completed
                        </span>
                    )}
                </div>
            </div>
            <ChevronRight className={`w-5 h-5 flex-shrink-0 ${isPast ? 'text-slate-300' : 'text-brand-200'}`} />
        </motion.div>
    );
}

export default TicketCard;
