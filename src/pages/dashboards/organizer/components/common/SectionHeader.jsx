import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

/**
 * SectionHeader - Reusable section header component
 * @param {Object} props
 * @param {React.ElementType} props.icon - Lucide icon component
 * @param {string} props.title - Section title
 * @param {string} [props.subtitle] - Optional subtitle
 * @param {React.ReactNode} [props.action] - Optional action button/element
 * @param {Function} [props.onViewAll] - Optional view all handler
 * @param {string} [props.viewAllText] - Custom view all text
 * @param {number} [props.delay] - Animation delay
 */
export default function SectionHeader({
    icon: Icon,
    title,
    subtitle,
    action,
    onViewAll,
    viewAllText = 'View All',
    delay = 0
}) {
    return (
        <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
        >
            <div className="flex items-center gap-3">
                {Icon && (
                    <div className="p-2 bg-brand-100/10 rounded-lg">
                        <Icon className="w-5 h-5 text-brand-200" />
                    </div>
                )}
                <div>
                    <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                    {subtitle && (
                        <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3">
                {action}
                {onViewAll && (
                    <motion.button
                        onClick={onViewAll}
                        className="flex items-center gap-1.5 text-sm font-medium text-brand-200 hover:text-brand-100 transition-colors group"
                        whileHover={{ x: 2 }}
                    >
                        {viewAllText}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}
