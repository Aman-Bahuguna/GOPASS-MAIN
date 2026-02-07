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
                    // Loading skeletons
                    Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl border border-slate-200/60 p-5 animate-pulse"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-slate-100 rounded-xl" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-slate-100 rounded w-20" />
                                    <div className="h-6 bg-slate-100 rounded w-16" />
                                </div>
                            </div>
                        </div>
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
