import { motion } from 'framer-motion';

/**
 * Loading skeleton components with shimmer effect
 * Variants: card, stat, list, grid
 */

// Shimmer animation overlay
const ShimmerOverlay = () => (
    <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
        animate={{ translateX: ['0%', '200%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
    />
);

// Single skeleton card
export function CardSkeleton({ className = '' }) {
    return (
        <div className={`bg-white rounded-2xl border border-slate-200/60 overflow-hidden ${className}`}>
            {/* Image placeholder */}
            <div className="h-44 bg-slate-100 relative overflow-hidden">
                <ShimmerOverlay />
            </div>
            {/* Content placeholder */}
            <div className="p-5 space-y-4">
                <div className="h-5 bg-slate-100 rounded-lg w-3/4 relative overflow-hidden">
                    <ShimmerOverlay />
                </div>
                <div className="h-4 bg-slate-100 rounded-lg w-full relative overflow-hidden">
                    <ShimmerOverlay />
                </div>
                <div className="h-4 bg-slate-100 rounded-lg w-5/6 relative overflow-hidden">
                    <ShimmerOverlay />
                </div>
                <div className="flex gap-2 mt-4">
                    <div className="h-8 bg-slate-100 rounded-lg w-24 relative overflow-hidden">
                        <ShimmerOverlay />
                    </div>
                    <div className="h-8 bg-slate-100 rounded-lg w-24 relative overflow-hidden">
                        <ShimmerOverlay />
                    </div>
                </div>
                <div className="h-12 bg-slate-100 rounded-xl w-full mt-4 relative overflow-hidden">
                    <ShimmerOverlay />
                </div>
            </div>
        </div>
    );
}

// Stat card skeleton
export function StatSkeleton({ className = '' }) {
    return (
        <div className={`bg-white rounded-2xl border border-slate-200/60 p-5 ${className}`}>
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-100 rounded-xl relative overflow-hidden">
                    <ShimmerOverlay />
                </div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-100 rounded-lg w-24 relative overflow-hidden">
                        <ShimmerOverlay />
                    </div>
                    <div className="h-6 bg-slate-100 rounded-lg w-16 relative overflow-hidden">
                        <ShimmerOverlay />
                    </div>
                </div>
            </div>
        </div>
    );
}

// List item skeleton
export function ListItemSkeleton({ className = '' }) {
    return (
        <div className={`bg-white rounded-xl border border-slate-200/60 p-4 flex items-center gap-4 ${className}`}>
            <div className="w-12 h-12 bg-slate-100 rounded-xl relative overflow-hidden">
                <ShimmerOverlay />
            </div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-100 rounded-lg w-3/4 relative overflow-hidden">
                    <ShimmerOverlay />
                </div>
                <div className="h-3 bg-slate-100 rounded-lg w-1/2 relative overflow-hidden">
                    <ShimmerOverlay />
                </div>
            </div>
            <div className="w-5 h-5 bg-slate-100 rounded relative overflow-hidden">
                <ShimmerOverlay />
            </div>
        </div>
    );
}

// Ticket skeleton
export function TicketSkeleton({ className = '' }) {
    return (
        <div className={`flex items-center gap-4 p-4 rounded-2xl border border-slate-200/60 bg-white ${className}`}>
            <div className="w-14 h-14 bg-slate-100 rounded-xl relative overflow-hidden">
                <ShimmerOverlay />
            </div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-100 rounded-lg w-32 relative overflow-hidden">
                    <ShimmerOverlay />
                </div>
                <div className="h-3 bg-slate-100 rounded-lg w-24 relative overflow-hidden">
                    <ShimmerOverlay />
                </div>
                <div className="h-5 bg-slate-100 rounded w-16 relative overflow-hidden">
                    <ShimmerOverlay />
                </div>
            </div>
        </div>
    );
}

// Main loading state wrapper with variants
function LoadingState({ variant = 'card', count = 1, className = '' }) {
    const items = Array.from({ length: count }, (_, i) => i);

    const renderSkeleton = (index) => {
        switch (variant) {
            case 'stat':
                return <StatSkeleton key={index} />;
            case 'list':
                return <ListItemSkeleton key={index} />;
            case 'ticket':
                return <TicketSkeleton key={index} />;
            case 'card':
            default:
                return <CardSkeleton key={index} />;
        }
    };

    if (variant === 'stat') {
        return (
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ${className}`}>
                {items.map(renderSkeleton)}
            </div>
        );
    }

    if (variant === 'card') {
        return (
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${className}`}>
                {items.map(renderSkeleton)}
            </div>
        );
    }

    return (
        <div className={`space-y-3 ${className}`}>
            {items.map(renderSkeleton)}
        </div>
    );
}

export default LoadingState;
