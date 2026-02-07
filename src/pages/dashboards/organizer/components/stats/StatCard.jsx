import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Lock, Info } from 'lucide-react';
import { useState } from 'react';
import AnimatedCounter from './AnimatedCounter';

/**
 * StatCard - Premium statistics card with animations
 * @param {Object} props
 * @param {React.ElementType} props.icon - Lucide icon component
 * @param {string} props.label - Stat label
 * @param {number} props.value - Stat value
 * @param {number} [props.trend] - Trend percentage (positive or negative)
 * @param {string} props.color - Color theme: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'teal'
 * @param {number} [props.delay] - Animation delay
 * @param {boolean} [props.locked] - Whether card is locked
 * @param {string} [props.subtitle] - Optional subtitle text
 * @param {string} [props.prefix] - Prefix for value (e.g., '$')
 * @param {string} [props.suffix] - Suffix for value (e.g., '%')
 * @param {Function} [props.onClick] - Click handler for detailed view
 * @param {string} [props.tooltip] - Tooltip text on hover
 */
function StatCard({
    icon: Icon,
    label,
    value,
    trend,
    color,
    delay = 0,
    locked,
    subtitle,
    prefix = '',
    suffix = '',
    onClick,
    tooltip
}) {
    const [showTooltip, setShowTooltip] = useState(false);

    const colorConfig = {
        orange: {
            gradient: 'from-orange-500 to-amber-500',
            glow: 'shadow-orange-200/50',
            bg: 'bg-orange-50',
            text: 'text-orange-600'
        },
        blue: {
            gradient: 'from-blue-500 to-indigo-500',
            glow: 'shadow-blue-200/50',
            bg: 'bg-blue-50',
            text: 'text-blue-600'
        },
        green: {
            gradient: 'from-emerald-500 to-teal-500',
            glow: 'shadow-emerald-200/50',
            bg: 'bg-emerald-50',
            text: 'text-emerald-600'
        },
        purple: {
            gradient: 'from-purple-500 to-violet-500',
            glow: 'shadow-purple-200/50',
            bg: 'bg-purple-50',
            text: 'text-purple-600'
        },
        red: {
            gradient: 'from-red-500 to-rose-500',
            glow: 'shadow-red-200/50',
            bg: 'bg-red-50',
            text: 'text-red-600'
        },
        teal: {
            gradient: 'from-teal-500 to-cyan-500',
            glow: 'shadow-teal-200/50',
            bg: 'bg-teal-50',
            text: 'text-teal-600'
        },
    };

    const config = colorConfig[color] || colorConfig.blue;
    const isPositiveTrend = trend >= 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.5, type: 'spring', stiffness: 100 }}
            whileHover={!locked ? { y: -5, transition: { duration: 0.2 } } : {}}
            onClick={!locked ? onClick : undefined}
            className={`relative bg-white rounded-2xl p-6 border shadow-sm overflow-hidden group ${locked
                    ? 'opacity-60 border-slate-200 cursor-not-allowed'
                    : `border-slate-200/60 hover:border-slate-300 hover:shadow-xl ${onClick ? 'cursor-pointer' : ''}`
                }`}
        >
            {/* Background decoration */}
            <div className={`absolute -right-6 -top-6 w-28 h-28 rounded-full bg-gradient-to-br ${config.gradient} opacity-10 ${!locked ? 'group-hover:opacity-20' : ''} transition-all duration-500 ${!locked ? 'group-hover:scale-125' : ''}`} />

            {/* Lock overlay */}
            {locked && (
                <motion.div
                    className="absolute inset-0 bg-slate-100/60 backdrop-blur-[2px] flex items-center justify-center z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="p-3 bg-slate-200 rounded-xl">
                        <Lock className="w-6 h-6 text-slate-500" />
                    </div>
                </motion.div>
            )}

            <div className="relative flex items-start justify-between">
                <div className="flex-1">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} shadow-lg ${config.glow} mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Label with tooltip */}
                    <div className="flex items-center gap-1.5 mb-1">
                        <p className="text-slate-500 text-sm font-medium">{label}</p>
                        {tooltip && (
                            <div
                                className="relative"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                                {showTooltip && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap z-20"
                                    >
                                        {tooltip}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Value with trend */}
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-slate-900">
                            {!locked ? (
                                <AnimatedCounter
                                    value={value}
                                    duration={0.5}
                                    prefix={prefix}
                                    suffix={suffix}
                                    formatNumber={value >= 1000}
                                />
                            ) : (
                                `${prefix}${value}${suffix}`
                            )}
                        </p>
                        {trend !== undefined && !locked && (
                            <motion.div
                                className={`flex items-center gap-0.5 text-sm font-medium ${isPositiveTrend ? 'text-emerald-600' : 'text-red-500'
                                    }`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: delay + 0.3 }}
                            >
                                {isPositiveTrend ? (
                                    <TrendingUp className="w-3.5 h-3.5" />
                                ) : (
                                    <TrendingDown className="w-3.5 h-3.5" />
                                )}
                                <span>{isPositiveTrend ? '+' : ''}{trend}%</span>
                            </motion.div>
                        )}
                    </div>

                    {/* Subtitle */}
                    {subtitle && (
                        <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
                    )}
                </div>
            </div>

            {/* Hover effect bar */}
            {!locked && (
                <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient}`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                />
            )}
        </motion.div>
    );
}

export default StatCard;
