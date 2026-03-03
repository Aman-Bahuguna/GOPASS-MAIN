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
    Tag,
    Flame
} from 'lucide-react';

/**
 * Helper to normalize event data from both old and new event creation formats.
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
 * Premium Event card component with refined UI/UX.
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

    // Category color mapping for visual distinction
    const getCategoryColors = (cat) => {
        const c = (cat || '').toLowerCase();
        if (c.includes('tech') || c.includes('workshop')) return { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' };
        if (c.includes('cultural') || c.includes('music') || c.includes('art')) return { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' };
        if (c.includes('sport') || c.includes('fitness')) return { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' };
        if (c.includes('business') || c.includes('seminar')) return { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' };
        if (c.includes('social') || c.includes('networking')) return { bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500' };
        return { bg: 'bg-slate-50', text: 'text-slate-700', dot: 'bg-slate-500' };
    };

    const catColors = getCategoryColors(norm._category);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * index, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,119,182,0.1),0_8px_16px_rgba(0,0,0,0.06)] transition-all duration-500 group flex flex-col"
        >
            {/* Subtle top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-300 via-brand-200 to-brand-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Event Image / Poster */}
            <div className="h-44 relative overflow-hidden flex-shrink-0">
                {/* Image or Dynamic gradient fallback */}
                {norm._image && !imageError ? (
                    <>
                        <img
                            src={norm._image}
                            alt={norm._title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={() => setImageError(true)}
                        />
                        {/* Subtle scrim for legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    </>
                ) : (
                    <>
                        {/* Rich gradient fallback */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-300 via-brand-200 to-brand-100" />
                        {/* Decorative orbs */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/8 rounded-full blur-2xl" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                        </div>
                        {/* Subtle grid dots pattern */}
                        <div className="absolute inset-0 opacity-[0.04]"
                            style={{
                                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                            }}
                        />
                        {/* Bottom scrim */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        {/* Centered title */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-6 z-[1]">
                            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg shadow-black/5">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-white/90 text-xs font-semibold text-center line-clamp-1 max-w-[75%] tracking-wide uppercase">
                                {norm._title}
                            </p>
                        </div>
                    </>
                )}

                {/* Price badge — top left */}
                <div className="absolute top-3 left-3 z-[2]">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md backdrop-blur-md ${norm._fee === 0
                        ? 'bg-emerald-500/90 text-white'
                        : 'bg-white/90 text-slate-800'
                        }`}
                    >
                        {norm._fee === 0 ? (
                            <><Sparkles className="w-3 h-3" /> FREE</>
                        ) : (
                            <><IndianRupee className="w-3 h-3" />{norm._fee}</>
                        )}
                    </span>
                </div>

                {/* Category badge — top right */}
                <div className="absolute top-3 right-3 z-[2]">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold backdrop-blur-md shadow-md ${catColors.bg} ${catColors.text} bg-opacity-90`}
                        style={{ backgroundColor: 'rgba(255,255,255,0.88)' }}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${catColors.dot}`} />
                        {norm._category}
                    </span>
                </div>

                {/* Favorite button — always visible, share on hover */}
                <div className="absolute bottom-3 right-3 z-[2] flex gap-1.5">
                    <motion.button
                        onClick={handleShareClick}
                        className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Share2 className="w-3.5 h-3.5 text-slate-600" />
                    </motion.button>
                    <motion.button
                        onClick={handleFavoriteClick}
                        className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-400'
                            }`} />
                    </motion.button>
                </div>

                {/* Urgency badges */}
                {isFull && !isRegistered && (
                    <div className="absolute bottom-3 left-3 z-[2]">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-red-600/95 text-white rounded-lg text-[11px] font-bold shadow-md backdrop-blur-md">
                            Event Full
                        </span>
                    </div>
                )}
                {isAlmostFull && !isRegistered && !isFull && (
                    <div className="absolute bottom-3 left-3 z-[2]">
                        <motion.span
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg text-[11px] font-bold shadow-md"
                            animate={{ scale: [1, 1.03, 1] }}
                            transition={{ repeat: Infinity, duration: 2.5 }}
                        >
                            <Flame className="w-3 h-3" />
                            {spotsLeft} spots left
                        </motion.span>
                    </div>
                )}
            </div>

            {/* Event Details — Content Area */}
            <div className="p-4 pt-3.5 flex flex-col flex-1">
                {/* Title */}
                <h3 className="font-bold text-[15px] text-slate-900 mb-1 line-clamp-1 group-hover:text-brand-300 transition-colors duration-300">
                    {norm._title}
                </h3>
                {/* Description */}
                <p className="text-slate-500 text-[13px] mb-3 line-clamp-2 leading-relaxed">
                    {norm._shortDesc}
                </p>

                {/* Meta info — Date & Venue */}
                <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2.5 text-[13px] text-slate-600">
                        <div className="w-7 h-7 rounded-lg bg-brand-50/70 flex items-center justify-center flex-shrink-0">
                            <Clock className="w-3.5 h-3.5 text-brand-300" />
                        </div>
                        <div className="min-w-0">
                            <span className="font-medium">{formatEventDate(norm._date)}</span>
                            {formatEventTime(norm._date) && (
                                <span className="text-slate-400 ml-1.5">• {formatEventTime(norm._date)}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-[13px] text-slate-600">
                        <div className="w-7 h-7 rounded-lg bg-brand-50/70 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-3.5 h-3.5 text-brand-300" />
                        </div>
                        <span className="truncate">{norm._venue}</span>
                    </div>
                </div>

                {/* Capacity indicator */}
                {norm._capacity > 0 && (
                    <div className="mb-3">
                        <div className="flex justify-between text-[11px] text-slate-500 mb-1.5">
                            <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {norm._registeredCount} registered
                            </span>
                            <span className={`font-medium ${isFull ? 'text-red-500' : isAlmostFull ? 'text-orange-500' : 'text-slate-400'}`}>
                                {isFull ? 'Full' : `${spotsLeft} left`}
                            </span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                className={`h-full rounded-full ${isFull
                                    ? 'bg-red-400'
                                    : isAlmostFull
                                        ? 'bg-gradient-to-r from-orange-400 to-red-400'
                                        : 'bg-gradient-to-r from-brand-200 to-brand-100'
                                    }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${fillPercentage}%` }}
                                transition={{ delay: 0.3 + index * 0.08, duration: 0.8, ease: 'easeOut' }}
                            />
                        </div>
                    </div>
                )}

                {/* Spacer */}
                <div className="flex-1" />

                {/* Divider */}
                <div className="h-px bg-slate-100 -mx-4 mb-3" />

                {/* Action Buttons */}
                <div className="flex gap-2">
                    {/* View Details */}
                    <motion.button
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails?.(event);
                        }}
                        className="flex-1 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-1.5 border border-slate-200 text-slate-600 hover:border-brand-200 hover:text-brand-300 hover:bg-brand-50/30 transition-all text-[13px]"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Eye className="w-3.5 h-3.5" />
                        Details
                    </motion.button>

                    {/* Register / Status */}
                    <motion.button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRegister?.(event);
                        }}
                        disabled={isRegistered || isFull}
                        className={`flex-[1.4] py-2.5 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all text-[13px] ${isRegistered
                            ? 'bg-emerald-50 text-emerald-700 cursor-default border border-emerald-200'
                            : isFull
                                ? 'bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-200'
                                : 'bg-gradient-to-r from-brand-300 to-brand-200 text-white hover:shadow-lg hover:shadow-brand-200/25 shadow-sm'
                            }`}
                        whileHover={!isRegistered && !isFull ? { scale: 1.02 } : {}}
                        whileTap={!isRegistered && !isFull ? { scale: 0.98 } : {}}
                    >
                        {isRegistered ? (
                            <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Registered
                            </>
                        ) : isFull ? (
                            'Event Full'
                        ) : (
                            <>
                                Register Now
                                <ArrowRight className="w-3.5 h-3.5" />
                            </>
                        )}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default EventCard;
