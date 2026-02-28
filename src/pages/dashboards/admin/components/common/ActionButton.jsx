import { motion } from 'framer-motion';

/**
 * Reusable Action Button Component
 * Provides consistent styling for various action buttons across the dashboard
 */
function ActionButton({
    onClick,
    icon: Icon,
    label,
    variant = 'primary', // 'primary', 'secondary', 'success', 'danger', 'ghost'
    size = 'md', // 'sm', 'md', 'lg'
    fullWidth = false,
    disabled = false,
    loading = false,
    className = ''
}) {
    const variants = {
        primary: {
            base: 'bg-brand-200 hover:bg-brand-100 text-white shadow-lg shadow-brand-200/30',
            disabled: 'from-slate-300 to-slate-400'
        },
        secondary: {
            base: 'bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700',
            disabled: 'border-slate-200 text-slate-400'
        },
        success: {
            base: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200/50',
            disabled: 'from-slate-300 to-slate-400'
        },
        danger: {
            base: 'bg-white border-2 border-red-200 hover:bg-red-50 text-red-600',
            disabled: 'border-slate-200 text-slate-400'
        },
        ghost: {
            base: 'hover:bg-slate-100 text-slate-600',
            disabled: 'text-slate-300'
        }
    };

    const sizes = {
        sm: 'px-3 py-2 text-sm gap-1.5',
        md: 'px-4 py-2.5 text-sm gap-2',
        lg: 'px-6 py-3 text-base gap-2'
    };

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };

    const config = variants[variant] || variants.primary;

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                ${sizes[size]}
                ${config.base}
                ${(disabled || loading) ? config.disabled + ' cursor-not-allowed' : ''}
                ${fullWidth ? 'w-full' : ''}
                rounded-xl font-semibold flex items-center justify-center transition-all
                ${className}
            `}
            whileHover={!disabled && !loading ? { scale: 1.02, y: -2 } : {}}
            whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
        >
            {loading ? (
                <motion.div
                    className={`${iconSizes[size]} border-2 border-current border-t-transparent rounded-full`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
            ) : Icon ? (
                <Icon className={iconSizes[size]} />
            ) : null}
            {label && <span>{label}</span>}
        </motion.button>
    );
}

export default ActionButton;
