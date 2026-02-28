import { motion } from 'framer-motion';
import { TrendingUp, Lock } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

// Premium Stat Card Component
function StatCard({ icon: Icon, label, value, trend, color, delay, locked, subtitle }) {
    const colorConfig = {
        orange: {
            solid: 'bg-orange-500',
            glow: 'shadow-orange-200/50'
        },
        blue: {
            solid: 'bg-blue-500',
            glow: 'shadow-blue-200/50'
        },
        green: {
            solid: 'bg-emerald-500',
            glow: 'shadow-emerald-200/50'
        },
        purple: {
            solid: 'bg-purple-500',
            glow: 'shadow-purple-200/50'
        },
    };

    const config = colorConfig[color] || colorConfig.blue;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.5, type: 'spring', stiffness: 100 }}
            whileHover={!locked ? { y: -5, transition: { duration: 0.2 } } : {}}
            className={`relative bg-[#f7f8fa] rounded-2xl p-6 border shadow-sm overflow-hidden group cursor-pointer ${locked
                ? 'opacity-60 border-slate-200'
                : 'border-slate-200 hover:border-slate-300 hover:shadow-xl'
                }`}
        >
            {/* Background decoration */}
            <div className={`absolute -right-6 -top-6 w-28 h-28 rounded-full ${config.solid} opacity-10 ${!locked ? 'group-hover:opacity-20' : ''} transition-all duration-500 ${!locked ? 'group-hover:scale-125' : ''}`} />

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
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${config.solid} shadow-lg ${config.glow} mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-slate-500 text-sm font-medium mb-1">{label}</p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-slate-900">
                            {!locked ? <AnimatedCounter value={value} duration={0.5} /> : value}
                        </p>
                        {trend !== undefined && !locked && (
                            <motion.div
                                className="flex items-center gap-0.5 text-emerald-600 text-sm font-medium"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: delay + 0.3 }}
                            >
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>+{trend}%</span>
                            </motion.div>
                        )}
                    </div>
                    {subtitle && (
                        <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
                    )}
                </div>
            </div>

            {/* Hover effect */}
            {!locked && (
                <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-1 ${config.solid}`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                />
            )}
        </motion.div>
    );
}

export default StatCard;
