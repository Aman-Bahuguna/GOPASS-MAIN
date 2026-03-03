import { motion } from 'framer-motion';
import {
    Calendar,
    Users,
    TrendingUp,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { AnimatedCounter } from '../stats';

/**
 * Quick Metrics Component
 * Displays key metrics in a compact grid format
 */
function QuickMetrics({ metrics = {}, timePeriod, loading = false }) {
    const defaultMetrics = {
        totalEvents: metrics.totalEvents || 24,
        totalRegistrations: metrics.totalRegistrations || 1248,
        growthRate: metrics.growthRate || 12.5,
        revenue: metrics.revenue || 45680,
        eventsTrend: metrics.eventsTrend || 'up',
        registrationsTrend: metrics.registrationsTrend || 'up',
        growthTrend: metrics.growthTrend || 'up',
        revenueTrend: metrics.revenueTrend || 'up'
    };

    const metricCards = [
        {
            label: 'Total Events',
            value: defaultMetrics.totalEvents,
            icon: Calendar,
            trend: defaultMetrics.eventsTrend,
            trendValue: '+3',
            bg: 'bg-blue-500'
        },
        {
            label: 'Registrations',
            value: defaultMetrics.totalRegistrations,
            icon: Users,
            trend: defaultMetrics.registrationsTrend,
            trendValue: '+156',
            bg: 'bg-emerald-500'
        },
        {
            label: 'Growth Rate',
            value: defaultMetrics.growthRate,
            suffix: '%',
            icon: TrendingUp,
            trend: defaultMetrics.growthTrend,
            trendValue: '+2.1%',
            bg: 'bg-purple-500'
        },
        {
            label: 'Revenue',
            value: defaultMetrics.revenue,
            prefix: '₹',
            icon: DollarSign,
            trend: defaultMetrics.revenueTrend,
            trendValue: '+₹8.2k',
            bg: 'bg-amber-500'
        }
    ];

    const getPeriodLabel = () => {
        switch (timePeriod) {
            case 'week': return 'this week';
            case 'month': return 'this month';
            case 'quarter': return 'this quarter';
            case 'year': return 'this year';
            default: return 'this month';
        }
    };

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metricCards.map((metric, index) => (
                <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="relative overflow-hidden bg-[#f7f8fa] rounded-2xl border border-slate-200 p-5 group hover:shadow-lg transition-shadow"
                >
                    {/* Background accent on hover */}
                    <motion.div
                        className={`absolute inset-0 ${metric.bg} opacity-0 group-hover:opacity-5 transition-opacity`}
                    />

                    <div className="relative">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-slate-500">{metric.label}</span>
                            <div className={`p-2 rounded-lg ${metric.bg} bg-opacity-10`}>
                                <metric.icon className="w-4 h-4 text-white" style={{
                                    filter: 'brightness(0) saturate(100%) invert(35%) sepia(94%) saturate(1352%) hue-rotate(213deg) brightness(91%) contrast(101%)'
                                }} />
                            </div>
                        </div>

                        {/* Value */}
                        <div className="flex items-end justify-between">
                            <div className="text-2xl font-bold text-slate-900">
                                {metric.prefix}
                                {loading ? (
                                    <span className="inline-block w-16 h-7 bg-slate-100 rounded relative overflow-hidden">
                                        <span className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_ease-in-out_infinite]" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(202,240,248,0.4) 40%, rgba(144,224,239,0.3) 50%, rgba(202,240,248,0.4) 60%, transparent 100%)' }} />
                                    </span>
                                ) : (
                                    <AnimatedCounter
                                        value={metric.value}
                                        duration={1000}
                                    />
                                )}
                                {metric.suffix}
                            </div>

                            {/* Trend */}
                            <div className={`flex items-center gap-1 text-xs font-medium ${metric.trend === 'up' ? 'text-emerald-600' : 'text-red-500'
                                }`}>
                                {metric.trend === 'up' ? (
                                    <ArrowUpRight className="w-3 h-3" />
                                ) : (
                                    <ArrowDownRight className="w-3 h-3" />
                                )}
                                {metric.trendValue}
                            </div>
                        </div>

                        {/* Period label */}
                        <p className="text-xs text-slate-400 mt-2">{getPeriodLabel()}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export default QuickMetrics;
