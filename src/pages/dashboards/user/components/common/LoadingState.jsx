import { motion } from 'framer-motion';

/**
 * Premium loading skeleton components with animated shimmer
 * Uses brand palette for a polished, cohesive loading experience
 * Variants: card, stat, list, ticket, grid
 */

// Premium shimmer effect with brand-tinted sweep
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

// Animated skeleton bar with rounded corners
const SkeletonBar = ({ width = 'w-full', height = 'h-4', rounded = 'rounded-lg', delay = 0, className = '' }) => (
    <div className={`${width} ${height} ${rounded} bg-slate-100 relative overflow-hidden ${className}`}>
        <ShimmerOverlay delay={delay} />
    </div>
);

// Animated skeleton circle
const SkeletonCircle = ({ size = 'w-12 h-12', delay = 0, className = '' }) => (
    <div className={`${size} rounded-xl bg-slate-100 relative overflow-hidden flex-shrink-0 ${className}`}>
        <ShimmerOverlay delay={delay} />
    </div>
);

// Container fade-in variant
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

// ─── CARD SKELETON ───────────────────────────────────────
export function CardSkeleton({ className = '', index = 0 }) {
    const d = index * 0.15;
    return (
        <motion.div
            className={`bg-[#f7f8fa] rounded-2xl border border-slate-200 overflow-hidden shadow-sm ${className}`}
            variants={itemVariants}
        >
            {/* Image placeholder with subtle brand tint */}
            <div className="h-44 bg-slate-100 relative overflow-hidden">
                <ShimmerOverlay delay={d} />
                {/* Floating badge placeholder */}
                <div className="absolute top-3 left-3">
                    <SkeletonBar width="w-16" height="h-6" rounded="rounded-full" delay={d + 0.2} />
                </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
                <SkeletonBar width="w-3/4" height="h-5" delay={d + 0.1} />
                <SkeletonBar width="w-full" height="h-3.5" delay={d + 0.15} />
                <SkeletonBar width="w-5/6" height="h-3.5" delay={d + 0.2} />

                {/* Meta row */}
                <div className="flex items-center gap-3 pt-2">
                    <SkeletonBar width="w-20" height="h-7" rounded="rounded-lg" delay={d + 0.25} />
                    <SkeletonBar width="w-24" height="h-7" rounded="rounded-lg" delay={d + 0.3} />
                </div>

                {/* Action button placeholder */}
                <div className="pt-2">
                    <SkeletonBar width="w-full" height="h-11" rounded="rounded-xl" delay={d + 0.35} />
                </div>
            </div>
        </motion.div>
    );
}

// ─── STAT SKELETON ───────────────────────────────────────
export function StatSkeleton({ className = '', index = 0 }) {
    const d = index * 0.12;
    return (
        <motion.div
            className={`bg-[#f7f8fa] rounded-2xl border border-slate-200 p-5 shadow-sm ${className}`}
            variants={itemVariants}
        >
            <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                    <SkeletonBar width="w-24" height="h-3.5" delay={d} />
                    <SkeletonBar width="w-16" height="h-7" delay={d + 0.1} />
                    <SkeletonBar width="w-20" height="h-3" delay={d + 0.2} />
                </div>
                <SkeletonCircle size="w-14 h-14" delay={d + 0.05} className="rounded-2xl" />
            </div>
        </motion.div>
    );
}

// ─── LIST ITEM SKELETON ──────────────────────────────────
export function ListItemSkeleton({ className = '', index = 0 }) {
    const d = index * 0.08;
    return (
        <motion.div
            className={`bg-[#f7f8fa] rounded-xl border border-slate-200 p-4 flex items-center gap-4 shadow-sm ${className}`}
            variants={itemVariants}
        >
            <SkeletonCircle size="w-12 h-12" delay={d} />
            <div className="flex-1 space-y-2">
                <SkeletonBar width="w-3/4" height="h-4" delay={d + 0.1} />
                <SkeletonBar width="w-1/2" height="h-3" delay={d + 0.15} />
            </div>
            <SkeletonBar width="w-5" height="h-5" rounded="rounded" delay={d + 0.2} />
        </motion.div>
    );
}

// ─── TICKET SKELETON ─────────────────────────────────────
export function TicketSkeleton({ className = '', index = 0 }) {
    const d = index * 0.1;
    return (
        <motion.div
            className={`flex items-center gap-4 p-4 rounded-2xl border border-slate-200 bg-[#f7f8fa] shadow-sm ${className}`}
            variants={itemVariants}
        >
            <SkeletonCircle size="w-14 h-14" delay={d} className="rounded-xl" />
            <div className="flex-1 space-y-2">
                <SkeletonBar width="w-32" height="h-4" delay={d + 0.1} />
                <SkeletonBar width="w-24" height="h-3" delay={d + 0.15} />
                <SkeletonBar width="w-16" height="h-5" rounded="rounded" delay={d + 0.2} />
            </div>
        </motion.div>
    );
}

// ─── MAIN LOADING STATE WRAPPER ──────────────────────────
function LoadingState({ variant = 'card', count = 1, className = '' }) {
    const items = Array.from({ length: count }, (_, i) => i);

    const renderSkeleton = (index) => {
        switch (variant) {
            case 'stat':
                return <StatSkeleton key={index} index={index} />;
            case 'list':
                return <ListItemSkeleton key={index} index={index} />;
            case 'ticket':
                return <TicketSkeleton key={index} index={index} />;
            case 'card':
            default:
                return <CardSkeleton key={index} index={index} />;
        }
    };

    const gridClass = variant === 'stat'
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
        : variant === 'card'
            ? 'grid grid-cols-1 md:grid-cols-2 gap-5'
            : 'space-y-3';

    return (
        <motion.div
            className={`${gridClass} ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {items.map(renderSkeleton)}
        </motion.div>
    );
}

export default LoadingState;
