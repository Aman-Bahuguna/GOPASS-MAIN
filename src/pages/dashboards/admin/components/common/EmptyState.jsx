import { motion } from 'framer-motion';

/**
 * Reusable Empty State Component
 * Displays a visually appealing empty state with customizable icon, title, and message
 */
function EmptyState({
    icon: Icon,
    title,
    message,
    variant = 'default', // 'default', 'success', 'warning', 'info'
    action,
    onAction
}) {
    const variants = {
        default: {
            bg: 'bg-slate-50',
            border: 'border-slate-200',
            iconBg: 'bg-slate-400',
            iconShadow: 'shadow-slate-200/50',
            titleColor: 'text-slate-700',
            messageColor: 'text-slate-500'
        },
        success: {
            bg: 'bg-emerald-50',
            border: 'border-emerald-200',
            iconBg: 'bg-emerald-500',
            iconShadow: 'shadow-emerald-200/50',
            titleColor: 'text-emerald-800',
            messageColor: 'text-emerald-600'
        },
        warning: {
            bg: 'bg-amber-50',
            border: 'border-amber-200',
            iconBg: 'bg-amber-500',
            iconShadow: 'shadow-amber-200/50',
            titleColor: 'text-amber-800',
            messageColor: 'text-amber-600'
        },
        info: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            iconBg: 'bg-blue-500',
            iconShadow: 'shadow-blue-200/50',
            titleColor: 'text-blue-800',
            messageColor: 'text-blue-600'
        }
    };

    const config = variants[variant] || variants.default;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${config.bg} border ${config.border} rounded-2xl p-10 text-center`}
        >
            {Icon && (
                <motion.div
                    className={`w-20 h-20 ${config.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg ${config.iconShadow}`}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    <Icon className="w-10 h-10 text-white" />
                </motion.div>
            )}
            <h3 className={`text-xl font-bold ${config.titleColor} mb-2`}>{title}</h3>
            <p className={`${config.messageColor} max-w-sm mx-auto`}>{message}</p>

            {action && onAction && (
                <motion.button
                    onClick={onAction}
                    className="mt-6 px-6 py-2.5 bg-[#f7f8fa] border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {action}
                </motion.button>
            )}
        </motion.div>
    );
}

export default EmptyState;
