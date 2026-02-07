import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    CheckCircle2,
    Clock,
    MapPin,
    ArrowRight,
    Sparkles,
    Users,
    Heart,
    Share2,
    Eye
} from 'lucide-react';

/**
 * Event card component for displaying event information
 */
function EventCard({
    event,
    index = 0,
    onRegister,
    onViewDetails,
    isRegistered = false,
    isFavorite: initialFavorite = false,
    onToggleFavorite
}) {
    const [isFavorite, setIsFavorite] = useState(initialFavorite);
    const [isHovered, setIsHovered] = useState(false);

    const spotsLeft = event.capacity - event.registeredCount;
    const isAlmostFull = spotsLeft < 20;
    const fillPercentage = (event.registeredCount / event.capacity) * 100;

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
        onToggleFavorite?.(event.id, !isFavorite);
    };

    const handleShareClick = (e) => {
        e.stopPropagation();
        // Share functionality
        if (navigator.share) {
            navigator.share({
                title: event.title,
                text: event.shortDescription,
                url: window.location.href
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index, duration: 0.4 }}
            whileHover={{ y: -8 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group"
        >
            {/* Event Image */}
            <div className="h-44 bg-gradient-to-br from-brand-100 via-brand-200 to-brand-300 relative overflow-hidden">
                {/* Image if available */}
                {event.image && (
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                )}

                {/* Animated background pattern (fallback) */}
                {!event.image && (
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 left-4 w-24 h-24 border border-white/50 rounded-full" />
                        <div className="absolute bottom-4 right-4 w-16 h-16 border border-white/50 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
                    </div>
                )}

                {/* Event icon (fallback) */}
                {!event.image && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                            <Calendar className="w-8 h-8 text-white" />
                        </motion.div>
                    </div>
                )}

                {/* Price badge */}
                <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-lg ${event.fee === 0
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-slate-800'
                        }`}>
                        {event.fee === 0 ? 'FREE' : `₹${event.fee}`}
                    </span>
                </div>

                {/* Category badge */}
                <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-700">
                        {event.category}
                    </span>
                </div>

                {/* Action buttons - Favorite & Share */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                    <motion.button
                        onClick={handleShareClick}
                        className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Share2 className="w-4 h-4 text-slate-500" />
                    </motion.button>
                    <motion.button
                        onClick={handleFavoriteClick}
                        className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-400'
                            }`} />
                    </motion.button>
                </div>

                {/* Almost full badge */}
                {isAlmostFull && !isRegistered && (
                    <div className="absolute bottom-4 left-4">
                        <motion.span
                            className="px-3 py-1.5 bg-red-500 text-white rounded-full text-xs font-bold flex items-center gap-1"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <Sparkles className="w-3 h-3" />
                            Only {spotsLeft} spots left!
                        </motion.span>
                    </div>
                )}

                {/* Quick view overlay */}
                {onViewDetails && (
                    <motion.div
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        onClick={() => onViewDetails(event)}
                    >
                        <motion.div
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-slate-800 font-medium"
                            initial={{ scale: 0.8 }}
                            animate={isHovered ? { scale: 1 } : { scale: 0.8 }}
                        >
                            <Eye className="w-4 h-4" />
                            Quick View
                        </motion.div>
                    </motion.div>
                )}
            </div>

            {/* Event Details */}
            <div className="p-5">
                <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-1 group-hover:text-brand-200 transition-colors">
                    {event.title}
                </h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                    {event.shortDescription}
                </p>

                <div className="space-y-2.5 mb-4">
                    {/* Date & Time */}
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-brand-200" />
                        </div>
                        <div>
                            <p className="font-medium">
                                {new Date(event.date).toLocaleDateString('en-IN', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </p>
                            <p className="text-xs text-slate-400">
                                {new Date(event.date).toLocaleTimeString('en-IN', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Venue */}
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-brand-200" />
                        </div>
                        <span className="truncate">{event.venue}</span>
                    </div>
                </div>

                {/* Capacity progress */}
                <div className="mb-5">
                    <div className="flex justify-between text-xs text-slate-500 mb-2">
                        <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {event.registeredCount} registered
                        </span>
                        <span className={isAlmostFull ? 'text-red-500 font-medium' : ''}>
                            {spotsLeft} spots left
                        </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full rounded-full ${isAlmostFull
                                ? 'bg-gradient-to-r from-red-400 to-red-500'
                                : 'bg-gradient-to-r from-brand-200 to-brand-300'
                                }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${fillPercentage}%` }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    {/* View Details Button */}
                    <motion.button
                        onClick={() => onViewDetails?.(event)}
                        className="flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 hover:border-brand-200 hover:text-brand-200 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Eye className="w-4 h-4" />
                        Details
                    </motion.button>

                    {/* Register Button */}
                    <motion.button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRegister?.(event);
                        }}
                        disabled={isRegistered}
                        className={`flex-[1.5] py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${isRegistered
                            ? 'bg-emerald-100 text-emerald-700 cursor-default'
                            : 'bg-gradient-to-r from-brand-100 to-brand-200 text-white hover:shadow-lg hover:shadow-brand-200/30'
                            }`}
                        whileHover={!isRegistered ? { scale: 1.02 } : {}}
                        whileTap={!isRegistered ? { scale: 0.98 } : {}}
                    >
                        {isRegistered ? (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                Registered
                            </>
                        ) : (
                            <>
                                Register
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default EventCard;
