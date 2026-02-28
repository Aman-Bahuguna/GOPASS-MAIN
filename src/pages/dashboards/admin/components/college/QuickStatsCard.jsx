import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock, UserPlus } from 'lucide-react';

/**
 * Quick Stats Card Component
 * Displays quick performance statistics card
 */
function QuickStatsCard({ stats, delay = 0.7 }) {
    const defaultStats = {
        approvalRate: stats?.approvalRate || 98,
        avgResponseTime: stats?.avgResponseTime || '2.5h',
        monthlyGrowth: stats?.monthlyGrowth || '+12 organizers',
        ...stats
    };

    return (
        <motion.div
            className="bg-brand-200 rounded-2xl p-6 text-white overflow-hidden relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-8 -right-8 w-32 h-32 bg-[#f7f8fa]/10 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#f7f8fa]/10 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
            </div>

            <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    <span className="font-semibold">Quick Stats</span>
                </div>

                <div className="space-y-3">
                    {/* Approval Rate */}
                    <motion.div
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: delay + 0.1 }}
                    >
                        <span className="text-white/80 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Approval Rate
                        </span>
                        <span className="font-bold">{defaultStats.approvalRate}%</span>
                    </motion.div>

                    {/* Average Response Time */}
                    <motion.div
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: delay + 0.2 }}
                    >
                        <span className="text-white/80 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Avg Response Time
                        </span>
                        <span className="font-bold">{defaultStats.avgResponseTime}</span>
                    </motion.div>

                    {/* Monthly Growth */}
                    <motion.div
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: delay + 0.3 }}
                    >
                        <span className="text-white/80 flex items-center gap-2">
                            <UserPlus className="w-4 h-4" />
                            This Month
                        </span>
                        <span className="font-bold">{defaultStats.monthlyGrowth}</span>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#f7f8fa]/20 my-4" />

                {/* View Reports Link */}
                <motion.button
                    className="w-full py-2 text-center text-white/80 hover:text-white text-sm font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                >
                    View Detailed Reports →
                </motion.button>
            </div>
        </motion.div>
    );
}

export default QuickStatsCard;
