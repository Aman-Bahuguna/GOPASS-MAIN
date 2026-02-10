import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Calendar, MapPin, Users, Clock, Tag, Ticket,
    ChevronRight, ExternalLink, Share2, Heart,
    IndianRupee, Sparkles, CheckCircle, Building,
    Phone, Mail, User
} from 'lucide-react';

// Format price with Indian Rupee symbol
const formatPrice = (fee) => {
    if (fee === 0) return 'Free';
    return `₹${fee.toLocaleString('en-IN')}`;
};

// Format date for display
const formatDate = (dateString, includeTime = false) => {
    const date = new Date(dateString);
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
    }
    return date.toLocaleDateString('en-IN', options);
};

// Format time only
const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

// Get category color scheme
const getCategoryColors = (category) => {
    const colors = {
        Technology: {
            bg: 'bg-blue-100',
            text: 'text-blue-700',
            border: 'border-blue-200',
            gradient: 'from-blue-500 to-indigo-600',
        },
        Cultural: {
            bg: 'bg-purple-100',
            text: 'text-purple-700',
            border: 'border-purple-200',
            gradient: 'from-purple-500 to-pink-600',
        },
        Workshop: {
            bg: 'bg-emerald-100',
            text: 'text-emerald-700',
            border: 'border-emerald-200',
            gradient: 'from-emerald-500 to-teal-600',
        },
        Sports: {
            bg: 'bg-orange-100',
            text: 'text-orange-700',
            border: 'border-orange-200',
            gradient: 'from-orange-500 to-red-600',
        },
    };
    return colors[category] || colors.Technology;
};

const EventModal = ({ event, isOpen, onClose, onViewFullDetails }) => {
    const [isLiked, setIsLiked] = useState(false);

    if (!event) return null;

    const categoryColors = getCategoryColors(event.category);
    const spotsLeft = event.capacity - event.registeredCount;
    const isAlmostFull = spotsLeft <= event.capacity * 0.1;
    const isFree = event.fee === 0;
    const progressPercentage = (event.registeredCount / event.capacity) * 100;

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: event.title,
                    text: event.shortDescription || event.description?.substring(0, 100),
                    url: window.location.origin + `/events/${event.id}`,
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.origin + `/events/${event.id}`);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal Container - Centered */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
                        >
                            {/* Header with Image */}
                            <div className={`relative h-48 flex-shrink-0 bg-gradient-to-br ${categoryColors.gradient}`}>
                                {/* Pattern Overlay */}
                                <div className="absolute inset-0 opacity-10">
                                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <pattern id="modal-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                                <circle cx="20" cy="20" r="1.5" fill="white" />
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill="url(#modal-pattern)" />
                                    </svg>
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors z-10"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>

                                {/* Action Buttons */}
                                <div className="absolute top-4 left-4 flex gap-2 z-10">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setIsLiked(!isLiked)}
                                        className={`p-2 backdrop-blur-sm rounded-full transition-colors ${isLiked ? 'bg-red-500 text-white' : 'bg-white/20 hover:bg-white/30 text-white'
                                            }`}
                                    >
                                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handleShare}
                                        className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors"
                                    >
                                        <Share2 className="w-5 h-5 text-white" />
                                    </motion.button>
                                </div>

                                {/* Category & Price Badges */}
                                <div className="absolute bottom-4 left-4 flex gap-2">
                                    <span className={`px-3 py-1.5 rounded-full bg-white/90 ${categoryColors.text} text-sm font-semibold`}>
                                        {event.category}
                                    </span>
                                    <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${isFree ? 'bg-emerald-500 text-white' : 'bg-white/90 text-slate-900'
                                        }`}>
                                        {formatPrice(event.fee)}
                                    </span>
                                </div>

                                {/* Decorative Sparkle */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                    className="absolute bottom-4 right-4"
                                >
                                    <Sparkles className="w-6 h-6 text-white/40" />
                                </motion.div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-6 overflow-y-auto">
                                {/* Title */}
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">{event.title}</h2>
                                <p className="text-slate-600 mb-6">{event.shortDescription || event.description?.substring(0, 150) + '...'}</p>

                                {/* Quick Info Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                                        <div className="p-2 bg-brand-100/10 rounded-lg">
                                            <Calendar className="w-5 h-5 text-brand-200" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium">Date</p>
                                            <p className="text-sm font-semibold text-slate-700">{formatDate(event.date)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                                        <div className="p-2 bg-brand-100/10 rounded-lg">
                                            <Clock className="w-5 h-5 text-brand-200" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium">Time</p>
                                            <p className="text-sm font-semibold text-slate-700">
                                                {formatTime(event.date)} - {formatTime(event.endDate)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl col-span-2">
                                        <div className="p-2 bg-brand-100/10 rounded-lg">
                                            <MapPin className="w-5 h-5 text-brand-200" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium">Venue</p>
                                            <p className="text-sm font-semibold text-slate-700">{event.venueName || event.venue}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">{event.venueAddress}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Registration Progress */}
                                <div className="mb-6 p-4 bg-slate-50 rounded-xl">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-slate-500" />
                                            <span className="text-sm font-medium text-slate-600">
                                                {event.registeredCount} / {event.capacity} registered
                                            </span>
                                        </div>
                                        {isAlmostFull && (
                                            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                                                Almost Full!
                                            </span>
                                        )}
                                    </div>
                                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progressPercentage}%` }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className={`h-full rounded-full ${isAlmostFull ? 'bg-red-500' : 'bg-brand-200'
                                                }`}
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">
                                        {spotsLeft} spots remaining
                                    </p>
                                </div>

                                {/* Highlights */}
                                {event.highlights && event.highlights.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-sm font-bold text-slate-700 mb-3">Event Highlights</h3>
                                        <div className="space-y-2">
                                            {event.highlights.slice(0, 4).map((highlight, index) => (
                                                <div key={index} className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm text-slate-600">{highlight}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Organizer Info */}
                                {event.organizer && (
                                    <div className="p-4 bg-slate-50 rounded-xl mb-6">
                                        <h3 className="text-sm font-bold text-slate-700 mb-3">Organizer</h3>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                                                <User className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-700">{event.organizer.name}</p>
                                                <p className="text-xs text-slate-500">{event.organizer.department}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Tags */}
                                {event.tags && event.tags.length > 0 && (
                                    <div className="mb-6">
                                        <div className="flex flex-wrap gap-2">
                                            {event.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer Actions */}
                            <div className="p-6 border-t border-slate-100 bg-white flex-shrink-0">
                                <div className="flex gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => onViewFullDetails?.(event)}
                                        className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                                    >
                                        View Full Details
                                        <ExternalLink className="w-4 h-4" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 py-3 bg-brand-200 hover:bg-brand-100 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                                    >
                                        Register Now
                                        <ChevronRight className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EventModal;

