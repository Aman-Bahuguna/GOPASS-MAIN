import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

/**
 * Individual stat card with animated counter and trend indicator
 */

const colorVariants = {
    blue: {
        bg: 'bg-blue-50',
        icon: 'bg-gradient-to-br from-blue-400 to-blue-600',
        text: 'text-blue-600',
        glow: 'hover:shadow-blue-200/50'
    },
    brand: {
        bg: 'bg-brand-50',
        icon: 'bg-gradient-to-br from-brand-100 to-brand-300',
        text: 'text-brand-200',
        glow: 'hover:shadow-brand-200/30'
    },
    green: {
        bg: 'bg-emerald-50',
        icon: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
        text: 'text-emerald-600',
        glow: 'hover:shadow-emerald-200/50'
    },
    amber: {
        bg: 'bg-amber-50',
        icon: 'bg-gradient-to-br from-amber-400 to-amber-600',
        text: 'text-amber-600',
        glow: 'hover:shadow-amber-200/50'
    },
    pink: {
        bg: 'bg-pink-50',
        icon: 'bg-gradient-to-br from-pink-400 to-pink-600',
        text: 'text-pink-600',
        glow: 'hover:shadow-pink-200/50'
    }
};

function StatCard({
    icon: Icon,
    label,
    value,
    trend,
    color = 'blue',
    delay = 0,
    onClick,
    prefix = '',
    suffix = ''
}) {
    const colors = colorVariants[color] || colorVariants.blue;
    const hasTrend = trend !== undefined && trend !== null;
    const isPositiveTrend = trend > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                delay,
                duration: 0.4,
                type: 'spring',
                stiffness: 100
            }}
            whileHover={{
                y: -5,
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            onClick={onClick}
            className={`bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-5 shadow-sm hover:shadow-xl ${colors.glow} transition-all duration-300 ${onClick ? 'cursor-pointer' : ''}`}
        >
            <div className="flex items-center gap-4">
                {/* Icon Container */}
                <motion.div
                    className={`w-14 h-14 rounded-xl ${colors.icon} flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                >
                    <Icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                    <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
                    <div className="flex items-end gap-2">
                        <h3 className="text-2xl font-bold text-slate-900">
                            <AnimatedCounter
                                value={value}
                                prefix={prefix}
                                suffix={suffix}
                            />
                        </h3>

                        {/* Trend Indicator */}
                        {hasTrend && (
                            <motion.div
                                className={`flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full ${isPositiveTrend
                                        ? 'bg-emerald-100 text-emerald-700'
                                        : 'bg-red-100 text-red-700'
                                    }`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: delay + 0.3 }}
                            >
                                {isPositiveTrend ? (
                                    <TrendingUp className="w-3 h-3" />
                                ) : (
                                    <TrendingDown className="w-3 h-3" />
                                )}
                                {Math.abs(trend)}%
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Decorative gradient line at bottom */}
            <motion.div
                className={`h-1 ${colors.icon} rounded-full mt-4 opacity-30`}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: delay + 0.2, duration: 0.5 }}
            />
        </motion.div>
    );
}

export default StatCard;
