import { motion } from 'framer-motion';

/**
 * Premium LoadingState - Skeleton loading with brand-tinted shimmer
 * @param {Object} props
 * @param {string} [props.variant] - 'card' | 'list' | 'chart' | 'stat'
 * @param {number} [props.count] - Number of skeleton items
 */

// Premium shimmer sweep with brand palette tint
const ShimmerOverlay = ({ delay = 0 }) => (
    <div className="absolute inset-0 overflow-hidden">
        <motion.div
            className="absolute inset-0 -translate-x-full"
            style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(202,240,248,0.4) 40%, rgba(144,224,239,0.3) 50%, rgba(202,240,248,0.4) 60%, transparent 100%)',
            }}
            animate={{ translateX: ['-100%', '200%'] }}
            transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: delay,
            }}
        />
    </div>
);

// Skeleton building blocks
const SkeletonBar = ({ width = 'w-full', height = 'h-4', rounded = 'rounded-lg', delay = 0, className = '' }) => (
    <div className={`${width} ${height} ${rounded} bg-slate-100 relative overflow-hidden ${className}`}>
        <ShimmerOverlay delay={delay} />
    </div>
);

const SkeletonCircle = ({ size = 'w-12 h-12', delay = 0, className = '' }) => (
    <div className={`${size} rounded-xl bg-slate-100 relative overflow-hidden flex-shrink-0 ${className}`}>
        <ShimmerOverlay delay={delay} />
    </div>
);

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' }
    }
};

export default function LoadingState({ variant = 'card', count = 1 }) {

    const renderStat = (index) => {
        const d = index * 0.12;
        return (
            <motion.div
                key={index}
                className="bg-[#f7f8fa] rounded-2xl p-6 border border-slate-200 shadow-sm"
                variants={itemVariants}
            >
                <div className="flex items-start justify-between mb-4">
                    <SkeletonCircle size="w-12 h-12" delay={d} />
                    <SkeletonBar width="w-20" height="h-6" rounded="rounded-full" delay={d + 0.1} />
                </div>
                <SkeletonBar width="w-24" height="h-8" rounded="rounded-lg" delay={d + 0.15} className="mb-2" />
                <SkeletonBar width="w-32" height="h-4" delay={d + 0.2} />
            </motion.div>
        );
    };

    const renderCard = (index) => {
        const d = index * 0.15;
        return (
            <motion.div
                key={index}
                className="bg-[#f7f8fa] rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
                variants={itemVariants}
            >
                {/* Image placeholder */}
                <div className="h-40 bg-slate-100 relative overflow-hidden">
                    <ShimmerOverlay delay={d} />
                    <div className="absolute top-3 right-3">
                        <SkeletonBar width="w-12" height="h-5" rounded="rounded-full" delay={d + 0.1} />
                    </div>
                </div>

                <div className="p-5 space-y-3">
                    <SkeletonBar width="w-3/4" height="h-6" delay={d + 0.1} />
                    <SkeletonBar width="w-full" height="h-4" delay={d + 0.15} />
                    <SkeletonBar width="w-2/3" height="h-4" delay={d + 0.2} />
                    <div className="flex gap-2 pt-1">
                        <SkeletonBar width="w-16" height="h-6" rounded="rounded-full" delay={d + 0.25} />
                        <SkeletonBar width="w-20" height="h-6" rounded="rounded-full" delay={d + 0.3} />
                    </div>
                </div>
            </motion.div>
        );
    };

    const renderList = (index) => {
        const d = index * 0.08;
        return (
            <motion.div
                key={index}
                className="bg-[#f7f8fa] rounded-xl p-4 border border-slate-200 flex items-center gap-4 shadow-sm"
                variants={itemVariants}
            >
                <SkeletonCircle size="w-12 h-12" delay={d} />
                <div className="flex-1 space-y-2">
                    <SkeletonBar width="w-48" height="h-5" delay={d + 0.1} />
                    <SkeletonBar width="w-32" height="h-4" delay={d + 0.15} />
                </div>
                <SkeletonBar width="w-20" height="h-8" rounded="rounded-lg" delay={d + 0.2} />
            </motion.div>
        );
    };

    const renderChart = () => (
        <motion.div
            className="bg-[#f7f8fa] rounded-2xl p-6 border border-slate-200 shadow-sm"
            variants={itemVariants}
        >
            <div className="flex items-center justify-between mb-6">
                <SkeletonBar width="w-32" height="h-6" delay={0} />
                <SkeletonBar width="w-24" height="h-8" rounded="rounded-lg" delay={0.1} />
            </div>
            {/* Chart bars */}
            <div className="flex items-end gap-3 h-48">
                {Array.from({ length: 7 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="flex-1 bg-slate-100 rounded-t-lg relative overflow-hidden"
                        style={{ height: `${30 + Math.random() * 60}%` }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
                    >
                        <ShimmerOverlay delay={i * 0.1} />
                    </motion.div>
                ))}
            </div>
            <div className="flex justify-between mt-3">
                {Array.from({ length: 7 }).map((_, i) => (
                    <SkeletonBar key={i} width="w-8" height="h-3" delay={i * 0.05} />
                ))}
            </div>
        </motion.div>
    );

    const renderContent = () => {
        switch (variant) {
            case 'stat':
                return (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {Array.from({ length: count }, (_, i) => renderStat(i))}
                    </motion.div>
                );
            case 'card':
                return (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {Array.from({ length: count }, (_, i) => renderCard(i))}
                    </motion.div>
                );
            case 'list':
                return (
                    <motion.div
                        className="space-y-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {Array.from({ length: count }, (_, i) => renderList(i))}
                    </motion.div>
                );
            case 'chart':
                return (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {renderChart()}
                    </motion.div>
                );
            default:
                return (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {Array.from({ length: count }, (_, i) => renderCard(i))}
                    </motion.div>
                );
        }
    };

    return renderContent();
}
