import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    CheckCircle2,
    Users,
    DollarSign,
    TrendingUp,
    RefreshCw
} from 'lucide-react';
import { useState } from 'react';
import StatCard from './StatCard';
import { LoadingState } from '../common';

/**
 * StatsGrid - Container for statistics cards with animations
 * @param {Object} props
 * @param {Object} props.stats - Statistics data object
 * @param {boolean} props.canCreate - Whether user can create events
 * @param {boolean} [props.isLoading] - Loading state
 * @param {Function} [props.onRefresh] - Refresh handler
 * @param {Function} [props.onStatClick] - Handler when a stat is clicked
 */
export default function StatsGrid({
    stats,
    canCreate,
    isLoading = false,
    onRefresh,
    onStatClick
}) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        if (onRefresh && !isRefreshing) {
            setIsRefreshing(true);
            await onRefresh();
            setIsRefreshing(false);
        }
    };

    const statsConfig = [
        {
            id: 'active',
            icon: Calendar,
            label: 'Active Events',
            value: stats?.activeEvents || 0,
            color: 'blue',
            subtitle: canCreate ? 'Currently running' : 'Unlock to view',
            tooltip: 'Events that are currently live and accepting registrations'
        },
        {
            id: 'pending',
            icon: Clock,
            label: 'Pending Events',
            value: stats?.pendingEvents || 0,
            color: 'orange',
            subtitle: canCreate ? 'Scheduled for later' : 'Unlock to view',
            tooltip: 'Events scheduled for future dates'
        },
        {
            id: 'completed',
            icon: CheckCircle2,
            label: 'Completed Events',
            value: stats?.completedEvents || 0,
            color: 'green',
            subtitle: canCreate ? 'Successfully completed' : 'Unlock to view',
            tooltip: 'Events that have ended'
        },
        {
            id: 'registrations',
            icon: Users,
            label: 'Total Registrations',
            value: stats?.totalRegistrations || 0,
            trend: canCreate ? 12 : undefined,
            color: 'purple',
            subtitle: canCreate ? 'All time registrations' : 'Unlock to view',
            tooltip: 'Total number of attendees across all events'
        }
    ];

    // Extended stats (shown when user has permission)
    const extendedStats = canCreate ? [
        {
            id: 'revenue',
            icon: DollarSign,
            label: 'Total Revenue',
            value: stats?.totalRevenue || 0,
            trend: 8,
            color: 'teal',
            prefix: '₹',
            subtitle: 'Earnings from all events',
            tooltip: 'Total revenue earned from ticket sales'
        },
        {
            id: 'attendance',
            icon: TrendingUp,
            label: 'Avg. Attendance',
            value: stats?.avgAttendance || 85,
            color: 'green',
            suffix: '%',
            subtitle: 'Show-up rate',
            tooltip: 'Average percentage of registered attendees who showed up'
        }
    ] : [];

    if (isLoading) {
        return <LoadingState variant="stat" count={4} />;
    }

    return (
        <div className="space-y-5">
            {/* Header with refresh button */}
            {onRefresh && (
                <div className="flex items-center justify-end">
                    <motion.button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.div
                            animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                            transition={isRefreshing ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
                        >
                            <RefreshCw className="w-4 h-4" />
                        </motion.div>
                        {isRefreshing ? 'Refreshing...' : 'Refresh'}
                    </motion.button>
                </div>
            )}

            {/* Main Stats Grid */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
            >
                {statsConfig.map((stat, index) => (
                    <StatCard
                        key={stat.id}
                        icon={stat.icon}
                        label={stat.label}
                        value={stat.value}
                        trend={stat.trend}
                        color={stat.color}
                        delay={index * 0.1}
                        locked={!canCreate}
                        subtitle={stat.subtitle}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        tooltip={stat.tooltip}
                        onClick={onStatClick ? () => onStatClick(stat.id) : undefined}
                    />
                ))}
            </motion.div>

            {/* Extended Stats (if available) */}
            {extendedStats.length > 0 && (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {extendedStats.map((stat, index) => (
                        <StatCard
                            key={stat.id}
                            icon={stat.icon}
                            label={stat.label}
                            value={stat.value}
                            trend={stat.trend}
                            color={stat.color}
                            delay={0.5 + index * 0.1}
                            locked={false}
                            subtitle={stat.subtitle}
                            prefix={stat.prefix}
                            suffix={stat.suffix}
                            tooltip={stat.tooltip}
                            onClick={onStatClick ? () => onStatClick(stat.id) : undefined}
                        />
                    ))}
                </motion.div>
            )}
        </div>
    );
}
