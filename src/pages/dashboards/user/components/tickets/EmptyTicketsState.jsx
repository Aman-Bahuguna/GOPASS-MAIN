import { motion } from 'framer-motion';
import { Ticket, ArrowRight, Search } from 'lucide-react';

/**
 * Empty state for when user has no tickets
 */
function EmptyTicketsState({
    title = 'No tickets yet',
    message = 'Register for an event to get started!',
    ctaLabel = 'Browse Events',
    onCTA,
    className = ''
}) {
    return (
        <motion.div
            className={`text-center py-12 ${className}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Icon */}
            <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            >
                <Ticket className="w-8 h-8 text-slate-300" />
            </motion.div>

            {/* Text */}
            <h3 className="font-semibold text-slate-700 mb-1">{title}</h3>
            <p className="text-slate-400 text-sm mb-5">{message}</p>

            {/* CTA */}
            {onCTA && (
                <motion.button
                    onClick={onCTA}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-100 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-brand-200/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Search className="w-4 h-4" />
                    {ctaLabel}
                </motion.button>
            )}
        </motion.div>
    );
}

export default EmptyTicketsState;
