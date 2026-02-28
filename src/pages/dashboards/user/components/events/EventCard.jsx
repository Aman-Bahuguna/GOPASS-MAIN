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
    Eye,
    IndianRupee,
    Tag
} from 'lucide-react';

/**
 * Helper to normalize event data from both old and new event creation formats.
 * Old format: { date, image, capacity, registeredCount, shortDescription, category }
 * New format: { startDate, posterUrl, maxParticipants, description, tags }
 */
function normalizeEvent(event) {
    const eventDate = event.date || event.startDate || null;
    const eventImage = event.image || event.posterUrl || null;
    const capacity = event.capacity || event.maxCapacity || event.maxParticipants || 0;
    const registeredCount = event.registeredCount || 0;
    const shortDesc = event.shortDescription || event.description || '';
    const category = event.category || (event.tags && event.tags.length > 0 ? event.tags[0] : 'Event');
    const fee = event.fee ?? 0;
    const venue = event.venue || 'TBA';
    const title = event.title || event.eventName || 'Untitled Event';
    const endDate = event.endDate || null;
    const contact = event.contact || event.organizer?.phone || null;
    const email = event.email || event.organizer?.email || null;

    return {
        ...event,
        _date: eventDate,
        _image: eventImage,
        _capacity: capacity,
        _registeredCount: registeredCount,
        _shortDesc: shortDesc,
        _category: category,
        _fee: fee,
        _venue: venue,
        _title: title,
        _endDate: endDate,
        _contact: contact,
        _email: email,
    };
}

/**
 * Event card component for displaying event information.
 * Supports both old and new event data structures.
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
    const [imageError, setImageError] = useState(false);

    const norm = normalizeEvent(event);

    const spotsLeft = norm._capacity > 0 ? norm._capacity - norm._registeredCount : null;
    const isAlmostFull = spotsLeft !== null && spotsLeft < 20 && spotsLeft > 0;
    const isFull = spotsLeft !== null && spotsLeft <= 0;
    const fillPercentage = norm._capacity > 0
        ? Math.min((norm._registeredCount / norm._capacity) * 100, 100)
        : 0;

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
        onToggleFavorite?.(event.id, !isFavorite);
    };

    const handleShareClick = (e) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: norm._title,
                text: norm._shortDesc,
                url: window.location.href
            });
        }
    };

    // Format date safely
    const formatEventDate = (dateStr) => {
        if (!dateStr) return 'Date TBA';
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return 'Date TBA';
            return d.toLocaleDateString('en-IN', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return 'Date TBA';
        }
    };

    const formatEventTime = (dateStr) => {
        if (!dateStr) return '';
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return '';
            return d.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return '';
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
            className="bg-[#f7f8fa] rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col"
        >
            {/* Event Image / Poster */}
            <div className="h-48 bg-brand-200 relative overflow-hidden flex-shrink-0">
                {/* Image if available and not errored */}
                {norm._image && !imageError && (
                    <img
                        src={norm._image}
                        alt={norm._title}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                )}

                {/* Fallback visual — shown when no image or image fails to load */}
                {(!norm._image || imageError) && (
                    <>
                        {/* Soft mesh overlay */}
                        <div className="absolute inset-0">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#f7f8fa]/10 rounded-full blur-2xl" />
                            <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-[#f7f8fa]/10 rounded-full blur-2xl" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#f7f8fa]/5 rounded-full blur-3xl" />
                        </div>
                        {/* Subtle grid pattern */}
                        <div className="absolute inset-0 opacity-[0.06]"  />
                        {/* Centered icon + title */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#f7f8fa]/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                <Calendar className="w-7 h-7 text-white" />
                            </div>
                            <p className="text-white/80 text-sm font-semibold text-center line-clamp-1 max-w-[80%]">
                                {norm._title}
                            </p>
                        </div>
                    </>
                )}

                {/* Price badge */}
                <div className="absolute top-3 left-3">
                    <span className={`px-3.5 py-1.5 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm ${norm._fee === 0
                        ? 'bg-emerald-500/90 text-white'
                        : 'bg-[#f7f8fa]/90 text-slate-800'
                        }`}>
                        {norm._fee === 0 ? '✨ FREE' : (
                            <span className="flex items-center gap-0.5">
                                <IndianRupee className="w-3.5 h-3.5" />
                                {norm._fee}
                            </span>
                        )}
                    </span>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 right-3">
                    <span className="px-3 py-1.5 bg-[#f7f8fa]/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-700 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {norm._category}
                    </span>
                </div>

                {/* Action buttons - Favorite & Share */}
                <div className="absolute bottom-3 right-3 flex gap-2">
                    <motion.button
                        onClick={handleShareClick}
                        className="w-9 h-9 rounded-full bg-[#f7f8fa]/90 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Share2 className="w-4 h-4 text-slate-500" />
                    </motion.button>
                    <motion.button
                        onClick={handleFavoriteClick}
                        className="w-9 h-9 rounded-full bg-[#f7f8fa]/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-400'
                            }`} />
                    </motion.button>
                </div>

                {/* Almost full / Full badge */}
                {isFull && !isRegistered && (
                    <div className="absolute bottom-3 left-3">
                        <span className="px-3 py-1.5 bg-red-600 text-white rounded-full text-xs font-bold flex items-center gap-1">
                            Event Full
                        </span>
                    </div>
                )}
                {isAlmostFull && !isRegistered && !isFull && (
                    <div className="absolute bottom-3 left-3">
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
            </div>

            {/* Event Details */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-slate-900 mb-1.5 line-clamp-1 group-hover:text-brand-200 transition-colors">
                    {norm._title}
                </h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {norm._shortDesc}
                </p>

                <div className="space-y-2.5 mb-4">
                    {/* Date & Time */}
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                            <Clock className="w-4 h-4 text-brand-200" />
                        </div>
                        <div>
                            <p className="font-medium">{formatEventDate(norm._date)}</p>
                            {formatEventTime(norm._date) && (
                                <p className="text-xs text-slate-400">{formatEventTime(norm._date)}</p>
                            )}
                        </div>
                    </div>

                    {/* Venue */}
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-brand-200" />
                        </div>
                        <span className="truncate">{norm._venue}</span>
                    </div>
                </div>

                {/* Capacity progress - only show if capacity is set */}
                {norm._capacity > 0 && (
                    <div className="mb-5">
                        <div className="flex justify-between text-xs text-slate-500 mb-2">
                            <span className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5" />
                                {norm._registeredCount} registered
                            </span>
                            <span className={isAlmostFull || isFull ? 'text-red-500 font-medium' : ''}>
                                {isFull ? 'Full' : `${spotsLeft} spots left`}
                            </span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                className={`h-full rounded-full ${isFull
                                    ? 'bg-red-500'
                                    : isAlmostFull
                                        ? 'bg-amber-500'
                                        : 'bg-brand-200'
                                    }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${fillPercentage}%` }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                            />
                        </div>
                    </div>
                )}

                {/* Spacer to push buttons to bottom */}
                <div className="flex-1" />

                {/* Action Buttons */}
                <div className="flex gap-2.5 mt-2">
                    {/* View Details Button */}
                    <motion.button
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails?.(event);
                        }}
                        className="flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 hover:border-brand-200 hover:text-brand-200 hover:bg-brand-50/30 transition-all text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Eye className="w-4 h-4" />
                        View Details
                    </motion.button>

                    {/* Register Button */}
                    <motion.button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRegister?.(event);
                        }}
                        disabled={isRegistered || isFull}
                        className={`flex-[1.3] py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all text-sm ${isRegistered
                            ? 'bg-emerald-100 text-emerald-700 cursor-default border-2 border-emerald-200'
                            : isFull
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-2 border-slate-200'
                                : 'bg-brand-100 text-white hover:shadow-lg hover:shadow-brand-200/30'
                            }`}
                        whileHover={!isRegistered && !isFull ? { scale: 1.02 } : {}}
                        whileTap={!isRegistered && !isFull ? { scale: 0.98 } : {}}
                    >
                        {isRegistered ? (
                            <>
                                <CheckCircle2 className="w-4.5 h-4.5" />
                                Registered
                            </>
                        ) : isFull ? (
                            'Event Full'
                        ) : (
                            <>
                                Register Now
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default EventCard;
