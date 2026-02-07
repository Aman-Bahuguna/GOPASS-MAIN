import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

/**
 * Promotional card encouraging users to explore more events
 */
function DiscoverCard({
    onExplore,
    title = 'Discover More!',
    description = 'Explore hundreds of exciting events happening near you.',
    ctaLabel = 'Explore Events',
    className = ''
}) {
    return (
        <motion.div
            className={`bg-gradient-to-br from-brand-100 via-brand-200 to-brand-300 rounded-2xl p-6 text-white relative overflow-hidden ${className}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
        >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            {/* Floating sparkles */}
            <motion.div
                className="absolute top-8 right-8"
                animate={{
                    y: [0, -5, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            >
                <Sparkles className="w-6 h-6 text-white/40" />
            </motion.div>

            <div className="relative">
                {/* Icon */}
                <motion.div
                    className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                >
                    <Sparkles className="w-6 h-6" />
                </motion.div>

                {/* Content */}
                <h3 className="font-bold text-xl mb-2">{title}</h3>
                <p className="text-white/80 text-sm mb-5">{description}</p>

                {/* CTA Button */}
                <motion.button
                    onClick={onExplore}
                    className="w-full py-3.5 bg-white text-brand-200 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Star className="w-5 h-5" />
                    {ctaLabel}
                </motion.button>
            </div>
        </motion.div>
    );
}

export default DiscoverCard;
