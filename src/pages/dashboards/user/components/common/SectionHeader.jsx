import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * Reusable section header component with title, subtitle, and action button
 */
function SectionHeader({
    icon: Icon,
    title,
    subtitle,
    count,
    actionLabel = 'View All',
    onAction,
    showAction = true,
    className = ''
}) {
    return (
        <motion.div
            className={`flex items-center justify-between mb-5 ${className}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center gap-3">
                {Icon && (
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-brand-200" />
                    </div>
                )}
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        {title}
                        {count !== undefined && (
                            <span className="text-slate-400 font-normal text-base">
                                ({count})
                            </span>
                        )}
                    </h2>
                    {subtitle && (
                        <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
                    )}
                </div>
            </div>

            {showAction && onAction && (
                <motion.button
                    onClick={onAction}
                    className="text-brand-200 hover:text-brand-100 text-sm font-medium flex items-center gap-1 group px-3 py-2 rounded-lg hover:bg-brand-50 transition-colors"
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {actionLabel}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
            )}
        </motion.div>
    );
}

export default SectionHeader;
