import { motion } from 'framer-motion';
import { Calendar, Search, ArrowRight } from 'lucide-react';

/**
 * Empty state component for when no events match the criteria
 */
function EmptyEventsState({
    title = 'No events found',
    message = 'Try adjusting your search or filters',
    showCTA = true,
    ctaLabel = 'Clear Filters',
    onCTA,
    variant = 'search', // search, calendar, empty
    className = ''
}) {
    const icons = {
        search: Search,
        calendar: Calendar,
        empty: Calendar
    };

    const Icon = icons[variant] || Calendar;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`text-center py-16 bg-[#f7f8fa] rounded-2xl border border-slate-200 ${className}`}
        >
            {/* Icon */}
            <motion.div
                className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-slate-100 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            >
                <Icon className="w-10 h-10 text-slate-300" />
            </motion.div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {title}
            </h3>

            {/* Message */}
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                {message}
            </p>

            {/* CTA Button */}
            {showCTA && onCTA && (
                <motion.button
                    onClick={onCTA}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-100 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-brand-200/30 transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                </motion.button>
            )}
        </motion.div>
    );
}

export default EmptyEventsState;
