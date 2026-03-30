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
    ExternalLink,
    ClipboardList,
    Plus,
    Minus,
    UserPlus,
    AlertCircle,
    ChevronDown,
    Sparkles,
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
    const [customFieldValues, setCustomFieldValues] = useState({});
    const [fieldErrors, setFieldErrors] = useState({});
    const [isSubmittingRegistration, setIsSubmittingRegistration] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]);
    const [teamName, setTeamName] = useState('');

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
        // If year is way in the past (like year 1000), it's likely a timestamp in seconds instead of ms
        if (date.getFullYear() < 2000) {
            const correctedDate = new Date(date.getTime() * 1000);
            if (correctedDate.getFullYear() >= 2000) {
                return correctedDate.toLocaleDateString('en-IN', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
            }
            return 'Upcoming Event'; 
        }
        return date.toLocaleDateString('en-IN', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatTime = (date) => {
        if (!date || isNaN(date.getTime())) return '';
        let d = date;
        if (date.getFullYear() < 2000) {
            d = new Date(date.getTime() * 1000);
        }
        return d.toLocaleTimeString('en-IN', {
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

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                handleCopyLink();
            }
        } catch (err) {
            console.log('Share error:', err);
            handleCopyLink(); // Fallback to copy link on error
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

    // Custom fields
    const customFields = event.customFields || [];
    const hasCustomFields = customFields.length > 0;

    // Initialize team members for team-type fields
    useEffect(() => {
        const teamField = customFields.find(f => f.type === 'team');
        if (teamField && teamMembers.length === 0) {
            const minMembers = teamField.teamConfig?.minMembers || 2;
            const initialMembers = Array.from({ length: minMembers }, () => ({
                name: '', email: '', phone: ''
            }));
            setTeamMembers(initialMembers);
        }
    }, [customFields]);

    // Handle custom field value changes
    const handleFieldChange = (fieldId, value) => {
        setCustomFieldValues(prev => ({ ...prev, [fieldId]: value }));
        if (fieldErrors[fieldId]) {
            setFieldErrors(prev => ({ ...prev, [fieldId]: '' }));
        }
    };

    // Handle checkbox toggle
    const handleCheckboxToggle = (fieldId, option) => {
        const current = customFieldValues[fieldId] || [];
        const updated = current.includes(option)
            ? current.filter(o => o !== option)
            : [...current, option];
        handleFieldChange(fieldId, updated);
    };

    // Team member helpers
    const addTeamMember = (maxMembers) => {
        if (teamMembers.length < maxMembers) {
            setTeamMembers(prev => [...prev, { name: '', email: '', phone: '' }]);
        }
    };

    const removeTeamMember = (index, minMembers) => {
        if (teamMembers.length > minMembers) {
            setTeamMembers(prev => prev.filter((_, i) => i !== index));
        }
    };

    const updateTeamMember = (index, key, value) => {
        setTeamMembers(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [key]: value };
            return updated;
        });
    };

    // Validate custom fields
    const validateCustomFields = () => {
        const errors = {};
        let isValid = true;

        customFields.forEach(field => {
            if (!field.required) return;

            if (field.type === 'team') {
                if (!teamName.trim()) {
                    errors[field.id + '_teamName'] = 'Team name is required';
                    isValid = false;
                }
                teamMembers.forEach((member, idx) => {
                    if (field.teamConfig?.collectMemberNames && !member.name.trim()) {
                        errors[`${field.id}_member_${idx}_name`] = 'Name required';
                        isValid = false;
                    }
                    if (field.teamConfig?.collectMemberEmails && !member.email.trim()) {
                        errors[`${field.id}_member_${idx}_email`] = 'Email required';
                        isValid = false;
                    }
                    if (field.teamConfig?.collectMemberPhones && !member.phone.trim()) {
                        errors[`${field.id}_member_${idx}_phone`] = 'Phone required';
                        isValid = false;
                    }
                });
            } else if (field.type === 'checkbox') {
                const val = customFieldValues[field.id] || [];
                if (val.length === 0) {
                    errors[field.id] = 'Please select at least one option';
                    isValid = false;
                }
            } else {
                const val = customFieldValues[field.id];
                if (!val || (typeof val === 'string' && !val.trim())) {
                    errors[field.id] = 'This field is required';
                    isValid = false;
                }
            }
        });

        setFieldErrors(errors);
        return isValid;
    };

    // Submit registration with custom fields
    const handleRegistrationSubmit = async () => {
        if (!validateCustomFields()) return;

        setIsSubmittingRegistration(true);
        try {
            const registrationData = {
                customFieldValues,
                teamName,
                teamMembers,
            };
            await onRegister?.(event, registrationData);
        } finally {
            setIsSubmittingRegistration(false);
        }
    };

    // Tabs configuration
    const tabs = [
        { id: 'about', label: 'About', icon: Info },
        { id: 'schedule', label: 'Schedule', icon: Clock },
        { id: 'venue', label: 'Venue', icon: MapPin },
        { id: 'contact', label: 'Contact', icon: User },
    ];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto flex items-start md:items-start justify-center"
                ref={scrollContainerRef}
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className={`relative w-full md:max-w-4xl md:my-8 bg-white md:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden ${className}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header Image Section */}
                    {/* Header Image Section */}
                    <div className={`relative bg-gradient-to-br from-brand-400 via-brand-300 to-brand-200 ${images.length > 0 && !imageLoadError ? 'h-64 md:h-80' : 'h-44 md:h-52'}`}>
                        {/* Action buttons */}
                        <div className="absolute top-4 right-4 z-30 flex gap-2.5">
                            <motion.button
                                onClick={() => onToggleFavorite?.(event.id, !isFavorite)}
                                className={`w-11 h-11 rounded-2xl backdrop-blur-md flex items-center justify-center transition-all shadow-xl border ${isFavorite
                                    ? 'bg-red-500 text-white border-red-400'
                                    : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                            </motion.button>
                            <motion.button
                                onClick={handleShare}
                                className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 border border-white/20 transition-all shadow-xl"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Share2 className="w-5 h-5" />
                            </motion.button>
                        </div>

                        {/* Back/Close button - moved to end and increased z-index */}
                        <motion.button
                            onClick={onClose}
                            className="absolute top-4 left-4 z-40 w-11 h-11 rounded-2xl bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 border border-white/10 transition-all shadow-xl"
                            whileHover={{ scale: 1.05, bg: 'rgba(0,0,0,0.4)' }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>

                        {/* Image */}
                        {images.length > 0 && !imageLoadError ? (
                            <>
                                <img
                                    src={images[currentImageIndex]}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                    onError={() => setImageLoadError(true)}
                                />

                                {/* Image overlay */}
                                <div className="absolute inset-0 bg-black/40" />

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
                                                        : 'bg-[#f7f8fa]/50 hover:bg-[#f7f8fa]/70'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                             <>
                                 {/* Animated gradient background */}
                                 <div className="absolute inset-0 bg-gradient-to-br from-brand-400 via-brand-300 to-brand-100 overflow-hidden">
                                     <motion.div 
                                         className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/10 rounded-full blur-[120px]"
                                         animate={{ 
                                             x: [0, 50, 0],
                                             y: [0, 30, 0],
                                             scale: [1, 1.2, 1]
                                         }}
                                         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                     />
                                     <motion.div 
                                         className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-brand-100/20 rounded-full blur-[100px]"
                                         animate={{ 
                                             x: [0, -40, 0],
                                             y: [0, -20, 0],
                                             scale: [1, 1.1, 1]
                                         }}
                                         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                     />
                                 </div>
                                 
                                 {/* Centered icon + title */}
                                 <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-8">
                                     <motion.div 
                                         initial={{ scale: 0.8, opacity: 0 }}
                                         animate={{ scale: 1, opacity: 1 }}
                                         className="w-20 h-20 rounded-[2rem] bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-2xl"
                                     >
                                         <Calendar className="w-10 h-10 text-white" />
                                     </motion.div>
                                     <motion.p 
                                         initial={{ y: 10, opacity: 0 }}
                                         animate={{ y: 0, opacity: 1 }}
                                         transition={{ delay: 0.2 }}
                                         className="text-white text-lg font-bold text-center drop-shadow-lg"
                                     >
                                         {title}
                                     </motion.p>
                                 </div>
                             </>
                        )}

                        {/* Category Badge */}
                        <div className="absolute bottom-10 left-6 z-[2]">
                            <span className="px-3.5 py-1.5 bg-white/15 backdrop-blur-lg text-white text-sm font-semibold rounded-xl flex items-center gap-1.5 border border-white/20 shadow-lg">
                                <Tag className="w-3.5 h-3.5" />
                                {category}
                            </span>
                        </div>
                    </div>

                    {/* Content — overlaps gradient header */}
                    <div className="relative -mt-6 bg-white rounded-t-3xl p-6 md:p-8">
                        {/* Title & Status */}
                        <div className="mb-8">
                            <div className="flex items-start justify-between gap-6">
                                <div className="space-y-1">
                                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                        {title}
                                    </h1>
                                    <div className="h-1.5 w-20 bg-brand-100 rounded-full" />
                                </div>
                                {isRegistered && (
                                    <motion.div 
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-emerald-50 text-emerald-700 rounded-2xl text-sm font-bold border-2 border-emerald-100 shadow-sm"
                                    >
                                        <CheckCircle2 className="w-5 h-5" />
                                        Joined
                                    </motion.div>
                                )}
                            </div>

                            {/* Quick Info Pills */}
                            <div className="flex flex-wrap items-center gap-2.5 text-[13px] text-slate-600">
                                {eventDate && (
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                                        <Calendar className="w-3.5 h-3.5 text-brand-300" />
                                        {formatDate(eventDate)}
                                    </div>
                                )}
                                {eventDate && formatTime(eventDate) && (
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                                        <Clock className="w-3.5 h-3.5 text-brand-300" />
                                        {formatTime(eventDate)}
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                                    <Users className="w-3.5 h-3.5 text-brand-300" />
                                    {registeredCount} registered
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                                    <MapPin className="w-3.5 h-3.5 text-brand-300" />
                                    {venue}
                                </div>
                            </div>
                        </div>
                        {/* Price & Registration Card */}
                        <motion.div 
                            className="bg-white rounded-3xl p-6 mb-8 border-2 border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden"
                            whileHover={{ y: -2 }}
                        >
                            {/* Decorative element */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-100/10 rounded-full blur-3xl" />
                            
                            <div className="relative z-[1] flex items-center justify-between">
                                <div className="space-y-2">
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Registration Fee</p>
                                    <div className="flex items-baseline gap-1">
                                        {fee === 0 ? (
                                            <span className="text-4xl font-extrabold text-emerald-600 tracking-tight flex items-center gap-2">
                                                FREE
                                                <Sparkles className="w-6 h-6 text-emerald-500 animate-pulse" />
                                            </span>
                                        ) : (
                                            <div className="flex items-center text-4xl font-extrabold text-slate-900 tracking-tight">
                                                <IndianRupee className="w-8 h-8" />
                                                {fee}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className={`px-4 py-2 rounded-2xl inline-block ${
                                        isFull ? 'bg-red-50 text-red-600 border border-red-100' : 
                                        isAlmostFull ? 'bg-orange-50 text-orange-600 border border-orange-100' : 
                                        'bg-brand-50 text-brand-300 border border-brand-100'
                                    }`}>
                                        <p className="text-xs font-bold uppercase tracking-wider">
                                            {isFull ? 'Sold Out' : isAlmostFull ? 'Last Call' : 'Registration'}
                                        </p>
                                        <p className="text-sm font-medium mt-0.5">
                                            {spotsRemaining === null ? 'Open Entry' : isFull ? 'No Spots left' : isAlmostFull ? `${spotsRemaining} left!` : `${spotsRemaining} available`}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Registration Button */}
                            {!isRegistered && (
                                <motion.button
                                    onClick={() => onRegister?.(event)}
                                    disabled={isFull}
                                    className={`w-full mt-4 py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all ${isFull
                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                                        : 'bg-gradient-to-r from-brand-400 via-brand-300 to-brand-200 text-white hover:shadow-xl hover:shadow-brand-300/25 shadow-md shadow-brand-300/15'
                                        }`}
                                    whileHover={!isFull ? { scale: 1.01 } : {}}
                                    whileTap={!isFull ? { scale: 0.98 } : {}}
                                >
                                    <Ticket className="w-5 h-5" />
                                    {isFull ? 'Event Full' : hasCustomFields ? 'Register — Fill Details' : 'Register Now'}
                                </motion.button>
                            )}

                            {isRegistered && (
                                <div className="mt-4 p-3.5 bg-emerald-50/70 border border-emerald-200/60 rounded-xl text-emerald-700 text-center text-sm font-medium">
                                    ✓ You're registered for this event! Check your tickets for details.
                                </div>
                            )}
                        </motion.div>

                        {/* Tabs */}
                        <div className="mb-6">
                            <div className="flex gap-1 p-1 bg-slate-100/80 rounded-xl overflow-x-auto">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold rounded-lg transition-all whitespace-nowrap ${activeTab === tab.id
                                                ? 'bg-white text-brand-300 shadow-sm'
                                                : 'text-slate-500 hover:text-slate-700'
                                                }`}
                                        >
                                            <Icon className="w-3.5 h-3.5" />
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
                                        <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                                <Info className="w-5 h-5 text-brand-200" />
                                                About This Event
                                            </h3>
                                            {description === 'No description available.' ? (
                                                <div className="py-8 text-center bg-white/50 rounded-xl border border-dashed border-slate-200">
                                                    <Sparkles className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                                                    <p className="text-slate-400 text-sm italic">The organizer hasn't shared a detailed description for this event yet.</p>
                                                </div>
                                            ) : (
                                                <p className="text-slate-600 leading-relaxed whitespace-pre-line text-[15px]">
                                                    {description}
                                                </p>
                                            )}
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
                                                    <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center text-white text-2xl font-bold">
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

                                {/* Register Tab */}
                                {activeTab === 'register' && hasCustomFields && (
                                    <div className="space-y-6">
                                        {/* Header */}
                                        <div className="p-4 bg-brand-50 border border-brand-100 rounded-xl">
                                            <h3 className="font-semibold text-brand-200 mb-1 flex items-center gap-2">
                                                <ClipboardList className="w-5 h-5" />
                                                Registration Form
                                            </h3>
                                            <p className="text-sm text-slate-600">
                                                Please fill in the details below to complete your registration for <strong>{title}</strong>.
                                            </p>
                                        </div>

                                        {/* Render Custom Fields */}
                                        {customFields.map((field) => {
                                            // —— Team Details Field ——
                                            if (field.type === 'team') {
                                                const cfg = field.teamConfig || {};
                                                return (
                                                    <div key={field.id} className="bg-violet-50 rounded-2xl p-5 border border-violet-200/50 space-y-4">
                                                        <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                                                            <Users className="w-5 h-5 text-violet-500" />
                                                            {field.label}
                                                            {field.required && <span className="text-red-500 text-sm">*</span>}
                                                        </h4>
                                                        <p className="text-sm text-slate-500">
                                                            Team of {cfg.minMembers}–{cfg.maxMembers} members
                                                        </p>

                                                        {/* Team Name */}
                                                        <div>
                                                            <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Team Name</label>
                                                            <input
                                                                type="text"
                                                                value={teamName}
                                                                onChange={(e) => setTeamName(e.target.value)}
                                                                placeholder="Enter your team name"
                                                                className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-medium outline-none transition-all ${fieldErrors[field.id + '_teamName']
                                                                    ? 'border-red-300 bg-red-50'
                                                                    : 'border-slate-200 bg-white focus:border-brand-200 focus:shadow-sm'
                                                                    }`}
                                                            />
                                                            {fieldErrors[field.id + '_teamName'] && (
                                                                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                                                    <AlertCircle className="w-3 h-3" />
                                                                    {fieldErrors[field.id + '_teamName']}
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* Team Members */}
                                                        <div className="space-y-3">
                                                            <label className="text-sm font-semibold text-slate-700 block">
                                                                Team Members ({teamMembers.length}/{cfg.maxMembers})
                                                            </label>
                                                            {teamMembers.map((member, idx) => (
                                                                <motion.div
                                                                    key={idx}
                                                                    initial={{ opacity: 0, y: 10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    className="bg-white rounded-xl p-4 border border-violet-100 space-y-3"
                                                                >
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="text-xs font-bold text-violet-500 uppercase tracking-wider">
                                                                            Member {idx + 1}
                                                                        </span>
                                                                        {teamMembers.length > cfg.minMembers && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => removeTeamMember(idx, cfg.minMembers)}
                                                                                className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                                            >
                                                                                <Minus className="w-4 h-4" />
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                                        {cfg.collectMemberNames && (
                                                                            <div>
                                                                                <input
                                                                                    type="text"
                                                                                    value={member.name}
                                                                                    onChange={(e) => updateTeamMember(idx, 'name', e.target.value)}
                                                                                    placeholder="Full Name"
                                                                                    className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all ${fieldErrors[`${field.id}_member_${idx}_name`]
                                                                                        ? 'border-red-300 bg-red-50'
                                                                                        : 'border-slate-200 focus:border-brand-200'
                                                                                        }`}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                        {cfg.collectMemberEmails && (
                                                                            <div>
                                                                                <input
                                                                                    type="email"
                                                                                    value={member.email}
                                                                                    onChange={(e) => updateTeamMember(idx, 'email', e.target.value)}
                                                                                    placeholder="Email Address"
                                                                                    className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all ${fieldErrors[`${field.id}_member_${idx}_email`]
                                                                                        ? 'border-red-300 bg-red-50'
                                                                                        : 'border-slate-200 focus:border-brand-200'
                                                                                        }`}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                        {cfg.collectMemberPhones && (
                                                                            <div>
                                                                                <input
                                                                                    type="tel"
                                                                                    value={member.phone}
                                                                                    onChange={(e) => updateTeamMember(idx, 'phone', e.target.value)}
                                                                                    placeholder="Phone Number"
                                                                                    className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all ${fieldErrors[`${field.id}_member_${idx}_phone`]
                                                                                        ? 'border-red-300 bg-red-50'
                                                                                        : 'border-slate-200 focus:border-brand-200'
                                                                                        }`}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </motion.div>
                                                            ))}

                                                            {teamMembers.length < cfg.maxMembers && (
                                                                <motion.button
                                                                    type="button"
                                                                    onClick={() => addTeamMember(cfg.maxMembers)}
                                                                    className="w-full py-3 rounded-xl border-2 border-dashed border-violet-200 text-violet-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-violet-50 transition-colors"
                                                                    whileHover={{ scale: 1.01 }}
                                                                    whileTap={{ scale: 0.99 }}
                                                                >
                                                                    <UserPlus className="w-4 h-4" />
                                                                    Add Member ({teamMembers.length}/{cfg.maxMembers})
                                                                </motion.button>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            // —— Text Field ——
                                            if (field.type === 'text') {
                                                return (
                                                    <div key={field.id}>
                                                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                                                            {field.label}
                                                            {field.required && <span className="text-red-500 ml-1">*</span>}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={customFieldValues[field.id] || ''}
                                                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                            placeholder={field.placeholder || ''}
                                                            className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-medium outline-none transition-all ${fieldErrors[field.id]
                                                                ? 'border-red-300 bg-red-50'
                                                                : 'border-slate-200 bg-white focus:border-brand-200 focus:shadow-sm'
                                                                }`}
                                                        />
                                                        {fieldErrors[field.id] && (
                                                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                                                <AlertCircle className="w-3 h-3" />
                                                                {fieldErrors[field.id]}
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            }

                                            // —— Textarea Field ——
                                            if (field.type === 'textarea') {
                                                return (
                                                    <div key={field.id}>
                                                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                                                            {field.label}
                                                            {field.required && <span className="text-red-500 ml-1">*</span>}
                                                        </label>
                                                        <textarea
                                                            value={customFieldValues[field.id] || ''}
                                                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                            placeholder={field.placeholder || ''}
                                                            rows="3"
                                                            className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-medium outline-none transition-all resize-none ${fieldErrors[field.id]
                                                                ? 'border-red-300 bg-red-50'
                                                                : 'border-slate-200 bg-white focus:border-brand-200 focus:shadow-sm'
                                                                }`}
                                                        />
                                                        {fieldErrors[field.id] && (
                                                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                                                <AlertCircle className="w-3 h-3" />
                                                                {fieldErrors[field.id]}
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            }

                                            // —— Number Field ——
                                            if (field.type === 'number') {
                                                return (
                                                    <div key={field.id}>
                                                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                                                            {field.label}
                                                            {field.required && <span className="text-red-500 ml-1">*</span>}
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={customFieldValues[field.id] || ''}
                                                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                            placeholder={field.placeholder || ''}
                                                            min={field.min || undefined}
                                                            max={field.max || undefined}
                                                            className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-medium outline-none transition-all ${fieldErrors[field.id]
                                                                ? 'border-red-300 bg-red-50'
                                                                : 'border-slate-200 bg-white focus:border-brand-200 focus:shadow-sm'
                                                                }`}
                                                        />
                                                        {fieldErrors[field.id] && (
                                                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                                                <AlertCircle className="w-3 h-3" />
                                                                {fieldErrors[field.id]}
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            }

                                            // —— Dropdown Field ——
                                            if (field.type === 'dropdown') {
                                                return (
                                                    <div key={field.id}>
                                                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                                                            {field.label}
                                                            {field.required && <span className="text-red-500 ml-1">*</span>}
                                                        </label>
                                                        <div className="relative">
                                                            <select
                                                                value={customFieldValues[field.id] || ''}
                                                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                                className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-medium outline-none transition-all appearance-none bg-white ${fieldErrors[field.id]
                                                                    ? 'border-red-300 bg-red-50'
                                                                    : 'border-slate-200 focus:border-brand-200 focus:shadow-sm'
                                                                    }`}
                                                            >
                                                                <option value="">Select an option...</option>
                                                                {(field.options || []).map((option, oi) => (
                                                                    <option key={oi} value={option}>{option}</option>
                                                                ))}
                                                            </select>
                                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                                        </div>
                                                        {fieldErrors[field.id] && (
                                                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                                                <AlertCircle className="w-3 h-3" />
                                                                {fieldErrors[field.id]}
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            }

                                            // —— Radio Buttons ——
                                            if (field.type === 'radio') {
                                                return (
                                                    <div key={field.id}>
                                                        <label className="text-sm font-semibold text-slate-700 mb-2 block">
                                                            {field.label}
                                                            {field.required && <span className="text-red-500 ml-1">*</span>}
                                                        </label>
                                                        <div className="space-y-2">
                                                            {(field.options || []).map((option, oi) => (
                                                                <label
                                                                    key={oi}
                                                                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${customFieldValues[field.id] === option
                                                                        ? 'border-brand-200 bg-brand-50'
                                                                        : 'border-slate-100 hover:border-slate-200 bg-white'
                                                                        }`}
                                                                >
                                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${customFieldValues[field.id] === option
                                                                        ? 'border-brand-200'
                                                                        : 'border-slate-300'
                                                                        }`}>
                                                                        {customFieldValues[field.id] === option && (
                                                                            <div className="w-2.5 h-2.5 rounded-full bg-brand-200" />
                                                                        )}
                                                                    </div>
                                                                    <input
                                                                        type="radio"
                                                                        name={field.id}
                                                                        value={option}
                                                                        checked={customFieldValues[field.id] === option}
                                                                        onChange={() => handleFieldChange(field.id, option)}
                                                                        className="sr-only"
                                                                    />
                                                                    <span className="text-sm text-slate-700 font-medium">{option}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                        {fieldErrors[field.id] && (
                                                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                                                <AlertCircle className="w-3 h-3" />
                                                                {fieldErrors[field.id]}
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            }

                                            // —— Checkboxes ——
                                            if (field.type === 'checkbox') {
                                                const selectedOpts = customFieldValues[field.id] || [];
                                                return (
                                                    <div key={field.id}>
                                                        <label className="text-sm font-semibold text-slate-700 mb-2 block">
                                                            {field.label}
                                                            {field.required && <span className="text-red-500 ml-1">*</span>}
                                                            <span className="text-slate-400 font-normal ml-1">(select multiple)</span>
                                                        </label>
                                                        <div className="space-y-2">
                                                            {(field.options || []).map((option, oi) => (
                                                                <label
                                                                    key={oi}
                                                                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedOpts.includes(option)
                                                                        ? 'border-brand-200 bg-brand-50'
                                                                        : 'border-slate-100 hover:border-slate-200 bg-white'
                                                                        }`}
                                                                >
                                                                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${selectedOpts.includes(option)
                                                                        ? 'border-brand-200 bg-brand-200'
                                                                        : 'border-slate-300 bg-white'
                                                                        }`}>
                                                                        {selectedOpts.includes(option) && (
                                                                            <Check className="w-3 h-3 text-white" />
                                                                        )}
                                                                    </div>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedOpts.includes(option)}
                                                                        onChange={() => handleCheckboxToggle(field.id, option)}
                                                                        className="sr-only"
                                                                    />
                                                                    <span className="text-sm text-slate-700 font-medium">{option}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                        {fieldErrors[field.id] && (
                                                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                                                <AlertCircle className="w-3 h-3" />
                                                                {fieldErrors[field.id]}
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            }

                                            return null;
                                        })}

                                        {/* Submit Registration */}
                                        <div className="pt-4 border-t border-slate-200">
                                            <motion.button
                                                onClick={handleRegistrationSubmit}
                                                disabled={isSubmittingRegistration || isFull}
                                                className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${isSubmittingRegistration || isFull
                                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-brand-200 to-brand-100 text-white hover:shadow-xl hover:shadow-brand-200/30'
                                                    }`}
                                                whileHover={!isSubmittingRegistration && !isFull ? { scale: 1.02 } : {}}
                                                whileTap={!isSubmittingRegistration && !isFull ? { scale: 0.98 } : {}}
                                            >
                                                {isSubmittingRegistration ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle2 className="w-5 h-5" />
                                                        Complete Registration
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
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
                                        className="flex items-center gap-2 px-4 py-2 bg-brand-300 hover:bg-brand-200 rounded-lg text-sm font-medium text-white transition-colors"
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
