import { motion } from 'framer-motion';

/**
 * LoadingState - Skeleton loading component with shimmer effect
 * @param {Object} props
 * @param {string} [props.variant] - 'card' | 'list' | 'chart' | 'stat'
 * @param {number} [props.count] - Number of skeleton items
 */
export default function LoadingState({ variant = 'card', count = 1 }) {
    const shimmerClass = "relative overflow-hidden bg-slate-200 after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_2s_infinite] after:bg-white/40";

    const renderStat = (index) => (
        <motion.div
            key={index}
            className="bg-[#f7f8fa] rounded-2xl p-6 border border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${shimmerClass}`} />
                <div className={`w-20 h-6 rounded-full ${shimmerClass}`} />
            </div>
            <div className={`h-8 w-24 rounded-lg mb-2 ${shimmerClass}`} />
            <div className={`h-4 w-32 rounded ${shimmerClass}`} />
        </motion.div>
    );

    const renderCard = (index) => (
        <motion.div
            key={index}
            className="bg-[#f7f8fa] rounded-2xl border border-slate-200 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className={`h-40 ${shimmerClass}`} />
            <div className="p-5">
                <div className={`h-6 w-3/4 rounded mb-3 ${shimmerClass}`} />
                <div className={`h-4 w-full rounded mb-2 ${shimmerClass}`} />
                <div className={`h-4 w-2/3 rounded mb-4 ${shimmerClass}`} />
                <div className="flex gap-2">
                    <div className={`h-6 w-16 rounded-full ${shimmerClass}`} />
                    <div className={`h-6 w-20 rounded-full ${shimmerClass}`} />
                </div>
            </div>
        </motion.div>
    );

    const renderList = (index) => (
        <motion.div
            key={index}
            className="bg-[#f7f8fa] rounded-xl p-4 border border-slate-200 flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <div className={`w-12 h-12 rounded-xl flex-shrink-0 ${shimmerClass}`} />
            <div className="flex-1">
                <div className={`h-5 w-48 rounded mb-2 ${shimmerClass}`} />
                <div className={`h-4 w-32 rounded ${shimmerClass}`} />
            </div>
            <div className={`w-20 h-8 rounded-lg ${shimmerClass}`} />
        </motion.div>
    );

    const renderChart = () => (
        <motion.div
            className="bg-[#f7f8fa] rounded-2xl p-6 border border-slate-200"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="flex items-center justify-between mb-6">
                <div className={`h-6 w-32 rounded ${shimmerClass}`} />
                <div className={`h-8 w-24 rounded-lg ${shimmerClass}`} />
            </div>
            <div className={`h-64 rounded-xl ${shimmerClass}`} />
        </motion.div>
    );

    const renderContent = () => {
        switch (variant) {
            case 'stat':
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {Array.from({ length: count }, (_, i) => renderStat(i))}
                    </div>
                );
            case 'card':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {Array.from({ length: count }, (_, i) => renderCard(i))}
                    </div>
                );
            case 'list':
                return (
                    <div className="space-y-3">
                        {Array.from({ length: count }, (_, i) => renderList(i))}
                    </div>
                );
            case 'chart':
                return renderChart();
            default:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {Array.from({ length: count }, (_, i) => renderCard(i))}
                    </div>
                );
        }
    };

    return renderContent();
}
