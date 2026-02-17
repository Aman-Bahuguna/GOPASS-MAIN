import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Calendar,
    Clock,
    MapPin,
    Users,
    Ticket,
    Heart,
    Share2,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Copy,
    Check,
    IndianRupee,
    User,
    Tag,
    Info,
    Star,
    MessageCircle,
    Navigation,
    Phone,
    Mail,
    ExternalLink
} from 'lucide-react';

/**
 * Full-screen event detail modal with comprehensive event information.
 * Handles both old and new event data structures gracefully.
 */
function EventDetailModal({
    event,
    isRegistered = false,
    isFavorite = false,
    onClose,
    onRegister,
    onToggleFavorite,
    className = ''
}) {
    const [activeTab, setActiveTab] = useState('about');
    const [copied, setCopied] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageLoadError, setImageLoadError] = useState(false);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // Prevent body scroll when modal is open & scroll to top
    const scrollContainerRef = useRef(null);
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        // Ensure modal starts scrolled to the very top
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!event) return null;

    // --- Normalize event data ---
    const title = event.title || event.eventName || 'Untitled Event';
    const description = event.description || event.shortDescription || 'No description available.';
    const shortDescription = event.shortDescription || event.description || '';
    const venue = event.venue || 'TBA';
    const venueName = event.venueName || venue;
    const venueAddress = event.venueAddress || venue;
    const fee = event.fee ?? 0;
    const category = event.category || (event.tags && event.tags.length > 0 ? event.tags[0] : 'Event');
    const maxCapacity = event.maxCapacity || event.capacity || event.maxParticipants || 0;
    const registeredCount = event.registeredCount || 0;
    const image = event.image || event.posterUrl || null;
    const dateStr = event.date || event.startDate || null;
    const endDateStr = event.endDate || null;
    const contact = event.contact || event.organizer?.phone || null;
    const email = event.email || event.organizer?.email || null;

    // Event images (fallback to poster or placeholder)
    const images = event.images || (image ? [image] : []);

    // Format date
    const eventDate = dateStr ? new Date(dateStr) : null;
    const endDate = endDateStr ? new Date(endDateStr) : null;

    const formatDate = (date) => {
        if (!date || isNaN(date.getTime())) return 'Date TBA';
        return date.toLocaleDateString('en-IN', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatTime = (date) => {
        if (!date || isNaN(date.getTime())) return '';
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    // Handle share
    const handleShare = async () => {
        const shareData = {
            title: title,
            text: `Check out ${title} on GoPass!`,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            handleCopyLink();
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleGetDirections = () => {
        if (venue) {
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`;
            window.open(mapsUrl, '_blank');
        }
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Calculate spots remaining
    const spotsRemaining = maxCapacity > 0 ? maxCapacity - registeredCount : null;
    const isAlmostFull = spotsRemaining !== null && spotsRemaining <= 10 && spotsRemaining > 0;
    const isFull = spotsRemaining !== null && spotsRemaining <= 0;

    // Tabs configuration
    const tabs = [
        { id: 'about', label: 'About', icon: Info },
        { id: 'schedule', label: 'Schedule', icon: Clock },
        { id: 'venue', label: 'Venue', icon: MapPin },
        { id: 'contact', label: 'Contact', icon: User }
    ];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto"
                ref={scrollContainerRef}
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className={`relative min-h-screen md:min-h-0 md:my-8 md:mx-auto md:max-w-4xl bg-white md:rounded-3xl shadow-2xl overflow-hidden ${className}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header Image Section */}
                    <div className="relative h-64 md:h-80 bg-gradient-to-br from-brand-100 to-brand-300">
                        {/* Back/Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Action buttons */}
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            <motion.button
                                onClick={() => onToggleFavorite?.(event.id, !isFavorite)}
                                className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${isFavorite
                                    ? 'bg-red-500 text-white'
                                    : 'bg-black/30 text-white hover:bg-black/50'
                                    }`}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                            </motion.button>
                            <motion.button
                                onClick={handleShare}
                                className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                                whileTap={{ scale: 0.9 }}
                            >
                                <Share2 className="w-5 h-5" />
                            </motion.button>
                        </div>

                        {/* Image */}
                        {images.length > 0 && !imageLoadError ? (
                            <>
                                <img
                                    src={images[currentImageIndex]}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                    onError={() => setImageLoadError(true)}
                                />

                                {/* Image overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {/* Image navigation */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>

                                        {/* Image indicators */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                                            {images.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentImageIndex(idx)}
                                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex
                                                        ? 'bg-white w-6'
                                                        : 'bg-white/50 hover:bg-white/70'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            /* Polished fallback when no image or image fails */
                            <>
                                {/* Soft mesh gradient overlay */}
                                <div className="absolute inset-0">
                                    <div className="absolute -top-12 -right-12 w-52 h-52 bg-white/10 rounded-full blur-3xl" />
                                    <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-white/10 rounded-full blur-3xl" />
                                    <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
                                </div>
                                {/* Dot pattern */}
                                <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                                {/* Centered icon + title */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8">
                                    <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                        <Calendar className="w-10 h-10 text-white" />
                                    </div>
                                    <p className="text-white/70 text-base font-semibold text-center max-w-[60%] line-clamp-2">
                                        {title}
                                    </p>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                            </>
                        )}

                        {/* Category Badge */}
                        <div className="absolute bottom-4 left-4">
                            <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full flex items-center gap-1.5">
                                <Tag className="w-3.5 h-3.5" />
                                {category}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                        {/* Title & Status */}
                        <div className="mb-6">
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                                    {title}
                                </h1>
                                {isRegistered && (
                                    <span className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Registered
                                    </span>
                                )}
                            </div>

                            {/* Quick Info */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                {eventDate && (
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 text-brand-200" />
                                        {formatDate(eventDate)}
                                    </div>
                                )}
                                {eventDate && formatTime(eventDate) && (
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4 text-brand-200" />
                                        {formatTime(eventDate)}
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5">
                                    <Users className="w-4 h-4 text-brand-200" />
                                    {registeredCount} registered
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-brand-200" />
                                    {venue}
                                </div>
                            </div>
                        </div>

                        {/* Price & Registration Card */}
                        <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-2xl p-5 mb-6 border border-slate-200/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Registration Fee</p>
                                    <p className="text-3xl font-bold text-slate-900">
                                        {fee === 0 ? (
                                            <span className="text-emerald-600">FREE</span>
                                        ) : (
                                            <span className="flex items-center">
                                                <IndianRupee className="w-6 h-6" />
                                                {fee}
                                            </span>
                                        )}
                                    </p>
                                </div>

                                <div className="text-right">
                                    {spotsRemaining === null ? (
                                        <span className="text-slate-500">Open registration</span>
                                    ) : isFull ? (
                                        <span className="text-red-500 font-medium">Event Full</span>
                                    ) : isAlmostFull ? (
                                        <span className="text-amber-600 font-medium">
                                            Only {spotsRemaining} spots left!
                                        </span>
                                    ) : (
                                        <span className="text-slate-500">
                                            {spotsRemaining} spots available
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Registration Button */}
                            {!isRegistered && (
                                <motion.button
                                    onClick={() => onRegister?.(event)}
                                    disabled={isFull}
                                    className={`w-full mt-4 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${isFull
                                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-brand-100 to-brand-200 text-white hover:shadow-lg hover:shadow-brand-200/30'
                                        }`}
                                    whileHover={!isFull ? { scale: 1.02 } : {}}
                                    whileTap={!isFull ? { scale: 0.98 } : {}}
                                >
                                    <Ticket className="w-5 h-5" />
                                    {isFull ? 'Event Full' : 'Register Now'}
                                </motion.button>
                            )}

                            {isRegistered && (
                                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-center text-sm">
                                    You're registered for this event! Check your tickets for details.
                                </div>
                            )}
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-slate-200 mb-6">
                            <div className="flex gap-1 -mb-px overflow-x-auto">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                                ? 'border-brand-200 text-brand-200'
                                                : 'border-transparent text-slate-500 hover:text-slate-700'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* About Tab */}
                                {activeTab === 'about' && (
                                    <div className="space-y-6">
                                        {/* Description */}
                                        <div>
                                            <h3 className="font-semibold text-slate-900 mb-3">About This Event</h3>
                                            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                                {description}
                                            </p>
                                        </div>

                                        {/* Highlights */}
                                        {event.highlights && event.highlights.length > 0 && (
                                            <div>
                                                <h3 className="font-semibold text-slate-900 mb-3">Highlights</h3>
                                                <ul className="space-y-2">
                                                    {event.highlights.map((highlight, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-slate-600">
                                                            <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                                            {highlight}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Tags */}
                                        {event.tags && event.tags.length > 0 && (
                                            <div>
                                                <h3 className="font-semibold text-slate-900 mb-3">Tags</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {event.tags.map((tag, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* What to Bring */}
                                        {event.requirements && (
                                            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                                <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                                                    <Info className="w-4 h-4" />
                                                    What to Bring
                                                </h4>
                                                <p className="text-amber-700 text-sm">{event.requirements}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Schedule Tab */}
                                {activeTab === 'schedule' && (
                                    <div className="space-y-6">
                                        {/* Main Schedule */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 bg-slate-50 rounded-xl">
                                                <p className="text-sm text-slate-500 mb-1">Start Date & Time</p>
                                                {eventDate ? (
                                                    <>
                                                        <p className="font-semibold text-slate-900">{formatDate(eventDate)}</p>
                                                        {formatTime(eventDate) && (
                                                            <p className="text-brand-200">{formatTime(eventDate)}</p>
                                                        )}
                                                    </>
                                                ) : (
                                                    <p className="font-semibold text-slate-500">To be announced</p>
                                                )}
                                            </div>
                                            {endDate && (
                                                <div className="p-4 bg-slate-50 rounded-xl">
                                                    <p className="text-sm text-slate-500 mb-1">End Date & Time</p>
                                                    <p className="font-semibold text-slate-900">{formatDate(endDate)}</p>
                                                    {formatTime(endDate) && (
                                                        <p className="text-brand-200">{formatTime(endDate)}</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Detailed Schedule */}
                                        {event.schedule && event.schedule.length > 0 && (
                                            <div>
                                                <h3 className="font-semibold text-slate-900 mb-4">Event Schedule</h3>
                                                <div className="space-y-3">
                                                    {event.schedule.map((item, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex gap-4 p-4 bg-slate-50 rounded-xl"
                                                        >
                                                            <div className="w-20 flex-shrink-0">
                                                                <span className="text-brand-200 font-semibold">
                                                                    {item.time}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-slate-900">{item.title}</p>
                                                                {item.description && (
                                                                    <p className="text-sm text-slate-500 mt-1">
                                                                        {item.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* No schedule message */}
                                        {(!event.schedule || event.schedule.length === 0) && (
                                            <div className="text-center py-8 text-slate-500">
                                                <Clock className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                                                <p>Detailed schedule will be shared closer to the event</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Venue Tab */}
                                {activeTab === 'venue' && (
                                    <div className="space-y-6">
                                        {/* Venue Info */}
                                        <div className="p-4 bg-slate-50 rounded-xl">
                                            <div className="flex items-start gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-brand-100/10 flex items-center justify-center flex-shrink-0">
                                                    <MapPin className="w-6 h-6 text-brand-200" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-slate-900 mb-1">
                                                        {venueName}
                                                    </h3>
                                                    <p className="text-slate-600 text-sm">
                                                        {venueAddress}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Get Directions Button */}
                                        <motion.button
                                            onClick={handleGetDirections}
                                            className="w-full py-3 border-2 border-brand-200 text-brand-200 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-brand-50 transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Navigation className="w-5 h-5" />
                                            Get Directions
                                        </motion.button>

                                        {/* Venue Instructions */}
                                        {event.venueInstructions && (
                                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                                <h4 className="font-semibold text-blue-800 mb-2">Venue Instructions</h4>
                                                <p className="text-blue-700 text-sm">{event.venueInstructions}</p>
                                            </div>
                                        )}

                                        {/* Parking Info */}
                                        {event.parkingInfo && (
                                            <div className="p-4 bg-slate-50 rounded-xl">
                                                <h4 className="font-semibold text-slate-900 mb-2">Parking Information</h4>
                                                <p className="text-slate-600 text-sm">{event.parkingInfo}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Contact Tab */}
                                {activeTab === 'contact' && (
                                    <div className="space-y-6">
                                        {/* Organizer Card */}
                                        {event.organizer && (
                                            <div className="p-4 bg-slate-50 rounded-xl">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-300 flex items-center justify-center text-white text-2xl font-bold">
                                                        {event.organizer?.name?.charAt(0) || 'O'}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-slate-900 text-lg">
                                                            {event.organizer?.name || 'Event Organizer'}
                                                        </h3>
                                                        {event.organizer?.department && (
                                                            <p className="text-slate-500 text-sm">
                                                                {event.organizer.department}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Organizer Bio */}
                                        {event.organizer?.bio && (
                                            <div>
                                                <h3 className="font-semibold text-slate-900 mb-2">About the Organizer</h3>
                                                <p className="text-slate-600 text-sm">{event.organizer.bio}</p>
                                            </div>
                                        )}

                                        {/* Contact Information */}
                                        <div>
                                            <h3 className="font-semibold text-slate-900 mb-3">Contact Information</h3>
                                            <div className="space-y-2">
                                                {/* Email from event or organizer */}
                                                {(email || event.organizer?.email) && (
                                                    <a
                                                        href={`mailto:${email || event.organizer?.email}`}
                                                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                                                    >
                                                        <div className="w-10 h-10 rounded-lg bg-brand-100/10 flex items-center justify-center">
                                                            <Mail className="w-5 h-5 text-brand-200" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-slate-500">Email</p>
                                                            <p className="text-slate-900">{email || event.organizer?.email}</p>
                                                        </div>
                                                    </a>
                                                )}

                                                {/* Contact / Phone */}
                                                {(contact || event.organizer?.phone) && (
                                                    <a
                                                        href={`tel:${contact || event.organizer?.phone}`}
                                                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                                                    >
                                                        <div className="w-10 h-10 rounded-lg bg-brand-100/10 flex items-center justify-center">
                                                            <Phone className="w-5 h-5 text-brand-200" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-slate-500">Phone / Contact</p>
                                                            <p className="text-slate-900">{contact || event.organizer?.phone}</p>
                                                        </div>
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Default contact message */}
                                        {!email && !event.organizer?.email && !contact && !event.organizer?.phone && !event.organizer && (
                                            <div className="text-center py-8 text-slate-500">
                                                <User className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                                                <p>Contact information will be shared after registration</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Share Section */}
                        <div className="mt-8 pt-6 border-t border-slate-200">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">Share this event</span>
                                <div className="flex gap-2">
                                    <motion.button
                                        onClick={handleCopyLink}
                                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4 text-emerald-500" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" />
                                                Copy Link
                                            </>
                                        )}
                                    </motion.button>
                                    <motion.button
                                        onClick={handleShare}
                                        className="flex items-center gap-2 px-4 py-2 bg-brand-100 hover:bg-brand-200 rounded-lg text-sm font-medium text-white transition-colors"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default EventDetailModal;
