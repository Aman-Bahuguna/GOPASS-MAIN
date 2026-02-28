import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

/**
 * Premium Stat Card Component
 * Displays statistics with beautiful colors, animations, and trend indicators
 */
function StatCard({
    icon: Icon,
    label,
    value,
    trend,
    color = 'blue',
    delay = 0,
    highlight = false,
    subtitle,
    onClick,
    tooltip
}) {
    const colorConfig = {
        orange: {
            solid: 'bg-orange-500',
            bg: 'bg-orange-50',
            text: 'text-orange-600',
            ring: 'ring-orange-200',
            glow: 'shadow-orange-200/50'
        },
        blue: {
            solid: 'bg-blue-500',
            bg: 'bg-blue-50',
            text: 'text-blue-600',
            ring: 'ring-blue-200',
            glow: 'shadow-blue-200/50'
        },
        green: {
            solid: 'bg-emerald-500',
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
            ring: 'ring-emerald-200',
            glow: 'shadow-emerald-200/50'
        },
        purple: {
            solid: 'bg-purple-500',
            bg: 'bg-purple-50',
            text: 'text-purple-600',
            ring: 'ring-purple-200',
            glow: 'shadow-purple-200/50'
        },
        red: {
            solid: 'bg-red-500',
            bg: 'bg-red-50',
            text: 'text-red-600',
            ring: 'ring-red-200',
            glow: 'shadow-red-200/50'
        },
        teal: {
            solid: 'bg-teal-500',
            bg: 'bg-teal-50',
            text: 'text-teal-600',
            ring: 'ring-teal-200',
            glow: 'shadow-teal-200/50'
        }
    };

    const config = colorConfig[color] || colorConfig.blue;
    const isPositiveTrend = trend > 0;
    const TrendIcon = isPositiveTrend ? TrendingUp : TrendingDown;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.5, type: 'spring', stiffness: 100 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={onClick}
            className={`
                relative bg-[#f7f8fa] rounded-2xl p-6 border shadow-sm overflow-hidden group 
                ${onClick ? 'cursor-pointer' : ''}
                ${highlight
                    ? `border-red-200 ring-2 ${config.ring}`
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-xl'
                }
            `}
            title={tooltip}
        >
            {/* Background decoration */}
            <div className={`absolute -right-6 -top-6 w-28 h-28 rounded-full ${config.solid} opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-125`} />

            {/* Pulse indicator for highlighted cards */}
            {highlight && (
                <motion.div
                    className="absolute top-4 right-4"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <span className="flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </motion.div>
            )}

            <div className="relative flex items-start justify-between">
                <div className="flex-1">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${config.solid} shadow-lg ${config.glow} mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-slate-500 text-sm font-medium mb-1">{label}</p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-slate-900">
                            <AnimatedCounter value={value} duration={0.5} />
                        </p>
                        {trend !== undefined && trend !== 0 && (
                            <motion.div
                                className={`flex items-center gap-0.5 text-sm font-medium ${isPositiveTrend ? 'text-emerald-600' : 'text-red-500'}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: delay + 0.3 }}
                            >
                                <TrendIcon className="w-3.5 h-3.5" />
                                <span>{isPositiveTrend ? '+' : ''}{trend}%</span>
                            </motion.div>
                        )}
                    </div>
                    {subtitle && (
                        <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
                    )}
                </div>
            </div>

            {/* Hover effect */}
            <motion.div
                className={`absolute bottom-0 left-0 right-0 h-1 ${config.solid}`}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
}

export default StatCard;
