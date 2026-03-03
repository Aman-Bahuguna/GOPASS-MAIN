import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import StatCard from './StatCard';

/**
 * Responsive grid container for stats with refresh capability
 */
function StatsGrid({
    stats = [],
    loading = false,
    onRefresh,
    className = ''
}) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        if (!onRefresh || isRefreshing) return;

        setIsRefreshing(true);
        try {
            await onRefresh();
        } finally {
            setTimeout(() => setIsRefreshing(false), 500);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className={className}>
            {/* Header with refresh */}
            {onRefresh && (
                <div className="flex justify-end mb-4">
                    <motion.button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="text-slate-400 hover:text-brand-200 p-2 rounded-lg hover:bg-brand-50 transition-all disabled:opacity-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </motion.button>
                </div>
            )}

            {/* Stats Grid */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {loading ? (
                    // Premium loading skeletons
                    Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="bg-[#f7f8fa] rounded-2xl border border-slate-200 p-5 shadow-sm"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-slate-100 rounded-xl relative overflow-hidden">
                                    <motion.div
                                        className="absolute inset-0 -translate-x-full"
                                        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(202,240,248,0.4) 40%, rgba(144,224,239,0.3) 50%, rgba(202,240,248,0.4) 60%, transparent 100%)' }}
                                        animate={{ translateX: ['-100%', '200%'] }}
                                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-slate-100 rounded-lg w-20 relative overflow-hidden">
                                        <motion.div
                                            className="absolute inset-0 -translate-x-full"
                                            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(202,240,248,0.4) 40%, rgba(144,224,239,0.3) 50%, rgba(202,240,248,0.4) 60%, transparent 100%)' }}
                                            animate={{ translateX: ['-100%', '200%'] }}
                                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 + 0.1 }}
                                        />
                                    </div>
                                    <div className="h-6 bg-slate-100 rounded-lg w-16 relative overflow-hidden">
                                        <motion.div
                                            className="absolute inset-0 -translate-x-full"
                                            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(202,240,248,0.4) 40%, rgba(144,224,239,0.3) 50%, rgba(202,240,248,0.4) 60%, transparent 100%)' }}
                                            animate={{ translateX: ['-100%', '200%'] }}
                                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 + 0.2 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    stats.map((stat, index) => (
                        <StatCard
                            key={stat.id || index}
                            icon={stat.icon}
                            label={stat.label}
                            value={stat.value}
                            trend={stat.trend}
                            color={stat.color}
                            delay={index * 0.1}
                            onClick={stat.onClick}
                            prefix={stat.prefix}
                            suffix={stat.suffix}
                        />
                    ))
                )}
            </motion.div>
        </div>
    );
}

export default StatsGrid;
