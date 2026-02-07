import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

/**
 * Reusable Section Header Component
 * Used across all admin dashboard sections for consistent styling
 */
function SectionHeader({
    icon: Icon,
    title,
    count,
    iconBgColor = 'bg-brand-100/10',
    iconColor = 'text-brand-200',
    countColor = 'bg-slate-100 text-slate-600',
    showViewAll = false,
    onViewAll,
    pulseCount = false,
    children
}) {
    return (
        <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                {Icon && (
                    <div className={`p-2 ${iconBgColor} rounded-lg`}>
                        <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                )}
                {title}
                {count !== undefined && count > 0 && (
                    <motion.span
                        className={`px-3 py-1 ${countColor} rounded-full text-sm font-bold`}
                        animate={pulseCount ? { scale: [1, 1.1, 1] } : {}}
                        transition={pulseCount ? { duration: 2, repeat: Infinity } : {}}
                    >
                        {count}
                    </motion.span>
                )}
            </h2>
            <div className="flex items-center gap-3">
                {children}
                {showViewAll && (
                    <motion.button
                        onClick={onViewAll}
                        className="text-brand-200 hover:text-brand-100 text-sm font-semibold flex items-center gap-1.5 group"
                        whileHover={{ x: 5 }}
                    >
                        View All
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                )}
            </div>
        </div>
    );
}

export default SectionHeader;
