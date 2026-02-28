import { motion } from 'framer-motion';
import { Calendar, PlusCircle, Sparkles } from 'lucide-react';

/**
 * EmptyEventsState - Empty state component when no events exist
 * @param {Object} props
 * @param {Function} [props.onCreateEvent] - Handler to create new event
 * @param {string} [props.filterActive] - Current active filter (to show custom message)
 */
function EmptyEventsState({ onCreateEvent, filterActive }) {
    const getContent = () => {
        if (filterActive && filterActive !== 'all') {
            return {
                title: `No ${filterActive} Events`,
                description: `You don't have any ${filterActive.toLowerCase()} events at the moment. They will appear here when available.`,
                showButton: false
            };
        }
        return {
            title: 'No Events Yet',
            description: 'Start by creating your first event and reach out to students! Your journey as an organizer begins here.',
            showButton: true
        };
    };

    const content = getContent();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#f7f8fa] rounded-3xl border border-slate-200 p-10 text-center relative overflow-hidden"
        >
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-10 -right-10 w-40 h-40 bg-brand-100/5 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-200/5 rounded-full blur-2xl"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
            </div>

            <div className="relative">
                <motion.div
                    className="w-20 h-20 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-5"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <Calendar className="w-10 h-10 text-brand-200" />
                </motion.div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">{content.title}</h3>
                <p className="text-slate-500 max-w-sm mx-auto mb-6">
                    {content.description}
                </p>

                {content.showButton && (
                    <motion.button
                        onClick={onCreateEvent}
                        className="px-8 py-4 bg-brand-100 text-white rounded-xl font-bold flex items-center gap-3 mx-auto shadow-lg shadow-brand-200/30 relative overflow-hidden group"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Shimmer effect on hover */}
                        <motion.div
                            className="absolute inset-0 bg-white/10"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6 }}
                        />
                        <PlusCircle className="w-6 h-6" />
                        <span>Create Your First Event</span>
                        <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                )}

                {/* Quick tips */}
                {content.showButton && (
                    <motion.div
                        className="mt-8 flex flex-wrap justify-center gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {['Quick Setup', 'Custom Templates', 'Easy Registration'].map((tip, i) => (
                            <span
                                key={i}
                                className="px-3 py-1.5 bg-slate-50 text-slate-500 text-xs rounded-full border border-slate-200"
                            >
                                ✨ {tip}
                            </span>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

export default EmptyEventsState;
