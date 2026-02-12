import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Calendar, MapPin, Clock, Users, Ticket,
    Share2, Heart, CheckCircle, ChevronRight, Building,
    Phone, Mail, User, FileText, AlertCircle
} from 'lucide-react';
import { fetchEvents, selectAllEvents, selectEventsStatus } from '../../store/slices/eventsSlice';
import { EVENT_STATUS } from '../../utils/constants';

// ... (keep format helper functions) ...

const EventDetailPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const events = useSelector(selectAllEvents);
    const eventStatus = useSelector(selectEventsStatus);

    useEffect(() => {
        if (eventStatus === 'idle') {
            dispatch(fetchEvents());
        }
    }, [eventStatus, dispatch]);

    // Find the event
    const event = useMemo(() => {
        return events.find(e => e.id === eventId);
    }, [events, eventId]);

    // Related events (same category, excluding current)
    const relatedEvents = useMemo(() => {
        if (!event) return [];
        return events
            .filter(e => e.category === event.category && e.id !== event.id && e.status === EVENT_STATUS.UPCOMING)
            .slice(0, 3);
    }, [events, event]);

    // Handle share
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: event.title,
                    text: event.shortDescription,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    // Event not found
    if (!event) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center p-8">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-10 h-10 text-slate-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Event Not Found</h1>
                    <p className="text-slate-500 mb-6">The event you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={() => navigate('/events')}
                        className="px-6 py-3 bg-brand-200 text-white rounded-xl font-semibold hover:bg-brand-100 transition-colors"
                    >
                        Browse Events
                    </button>
                </div>
            </div>
        );
    }

    const categoryColors = getCategoryColors(event.category);
    const spotsLeft = event.capacity - event.registeredCount;
    const isAlmostFull = spotsLeft <= event.capacity * 0.1;
    const isFree = event.fee === 0;
    const progressPercentage = (event.registeredCount / event.capacity) * 100;

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'schedule', label: 'Schedule' },
        { id: 'venue', label: 'Venue' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            {/* Hero Section */}
            <div className={`relative bg-gradient-to-br ${categoryColors.gradient} overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="detail-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                                <circle cx="30" cy="30" r="2" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#detail-pattern)" />
                    </svg>
                </div>

                {/* Floating Shapes */}
                <motion.div
                    className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.3, 1], y: [0, -30, 0] }}
                    transition={{ duration: 12, repeat: Infinity }}
                />

                <div className="relative container mx-auto max-w-6xl px-6 py-8">
                    {/* Navigation */}
                    <div className="flex items-center justify-between mb-8">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => navigate('/events')}
                            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Events</span>
                        </motion.button>

                        <div className="flex items-center gap-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsLiked(!isLiked)}
                                className={`p-3 rounded-full backdrop-blur-sm transition-colors ${isLiked ? 'bg-red-500 text-white' : 'bg-white/20 hover:bg-white/30 text-white'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleShare}
                                className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors"
                            >
                                <Share2 className="w-5 h-5 text-white" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Event Header */}
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap gap-2 mb-4"
                        >
                            <span className="px-3 py-1.5 bg-white/90 rounded-full text-sm font-semibold" style={{ color: 'inherit' }}>
                                <span className={categoryColors.text}>{event.category}</span>
                            </span>
                            <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${isFree ? 'bg-emerald-500 text-white' : 'bg-white/90 text-slate-900'
                                }`}>
                                {formatPrice(event.fee)}
                            </span>
                            {isAlmostFull && (
                                <span className="px-3 py-1.5 bg-red-500 text-white rounded-full text-sm font-bold animate-pulse">
                                    Almost Full!
                                </span>
                            )}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                        >
                            {event.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-white/80 mb-6"
                        >
                            {event.shortDescription}
                        </motion.p>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-6"
                        >
                            <div className="flex items-center gap-2 text-white/90">
                                <Calendar className="w-5 h-5" />
                                <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/90">
                                <Clock className="w-5 h-5" />
                                <span>{formatTime(event.date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/90">
                                <Users className="w-5 h-5" />
                                <span>{event.registeredCount} registered</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto max-w-6xl px-6 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Details */}
                    <div className="flex-1">
                        {/* Tabs */}
                        <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-xl">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.id
                                        ? 'bg-white text-slate-800 shadow-sm'
                                        : 'text-slate-600 hover:text-slate-800'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                            {activeTab === 'overview' && (
                                <motion.div
                                    key="overview"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-8"
                                >
                                    {/* Description */}
                                    <div className="bg-white border border-slate-200 rounded-2xl p-6">
                                        <h2 className="text-lg font-bold text-slate-800 mb-4">About This Event</h2>
                                        <div className="prose prose-slate max-w-none">
                                            {event.description.split('\n\n').map((paragraph, index) => (
                                                <p key={index} className="text-slate-600 mb-4 last:mb-0">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Highlights */}
                                    {event.highlights && event.highlights.length > 0 && (
                                        <div className="bg-white border border-slate-200 rounded-2xl p-6">
                                            <h2 className="text-lg font-bold text-slate-800 mb-4">Event Highlights</h2>
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                {event.highlights.map((highlight, index) => (
                                                    <div
                                                        key={index}
                                                        className={`flex items-start gap-3 p-3 rounded-xl ${categoryColors.lightBg}`}
                                                    >
                                                        <CheckCircle className={`w-5 h-5 ${categoryColors.text} mt-0.5 flex-shrink-0`} />
                                                        <span className="text-sm text-slate-700">{highlight}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Requirements */}
                                    {event.requirements && (
                                        <div className="bg-white border border-slate-200 rounded-2xl p-6">
                                            <h2 className="text-lg font-bold text-slate-800 mb-4">What to Bring</h2>
                                            <p className="text-slate-600">{event.requirements}</p>
                                        </div>
                                    )}

                                    {/* Tags */}
                                    {event.tags && event.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {event.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors cursor-pointer"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === 'schedule' && (
                                <motion.div
                                    key="schedule"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-white border border-slate-200 rounded-2xl p-6"
                                >
                                    <h2 className="text-lg font-bold text-slate-800 mb-6">Event Schedule</h2>
                                    {event.schedule && event.schedule.length > 0 ? (
                                        <div className="space-y-0">
                                            {event.schedule.map((item, index) => (
                                                <ScheduleItem
                                                    key={index}
                                                    time={item.time}
                                                    title={item.title}
                                                    description={item.description}
                                                    isLast={index === event.schedule.length - 1}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-slate-500 text-center py-8">
                                            Detailed schedule will be announced soon.
                                        </p>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === 'venue' && (
                                <motion.div
                                    key="venue"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-white border border-slate-200 rounded-2xl p-6">
                                        <h2 className="text-lg font-bold text-slate-800 mb-4">Venue Details</h2>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-brand-100/10 rounded-xl">
                                                    <Building className="w-5 h-5 text-brand-200" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-800">{event.venueName || event.venue}</p>
                                                    <p className="text-sm text-slate-500 mt-1">{event.venueAddress}</p>
                                                </div>
                                            </div>

                                            {event.venueInstructions && (
                                                <div className="flex items-start gap-4">
                                                    <div className="p-3 bg-amber-100 rounded-xl">
                                                        <FileText className="w-5 h-5 text-amber-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800">Entry Instructions</p>
                                                        <p className="text-sm text-slate-500 mt-1">{event.venueInstructions}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {event.parkingInfo && (
                                                <div className="flex items-start gap-4">
                                                    <div className="p-3 bg-blue-100 rounded-xl">
                                                        <Car className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800">Parking Information</p>
                                                        <p className="text-sm text-slate-500 mt-1">{event.parkingInfo}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:w-80 space-y-6">
                        {/* Registration Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-6">
                            <div className="text-center mb-6">
                                <p className={`text-3xl font-bold ${isFree ? 'text-emerald-600' : 'text-slate-800'}`}>
                                    {formatPrice(event.fee)}
                                </p>
                                <p className="text-sm text-slate-500 mt-1">per person</p>
                            </div>

                            {/* Progress */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-slate-600">{event.registeredCount} registered</span>
                                    <span className="text-slate-500">{event.capacity} capacity</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressPercentage}%` }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className={`h-full rounded-full ${isAlmostFull ? 'bg-red-500' : 'bg-brand-200'}`}
                                    />
                                </div>
                                <p className="text-xs text-center text-slate-500 mt-2">
                                    {spotsLeft} spots remaining
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 bg-brand-200 hover:bg-brand-100 text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-colors"
                            >
                                <Ticket className="w-5 h-5" />
                                Register Now
                            </motion.button>

                            {isAlmostFull && (
                                <p className="text-xs text-center text-red-500 mt-3">
                                    ⚡ Hurry! Only {spotsLeft} spots left
                                </p>
                            )}
                        </div>

                        {/* Organizer Card */}
                        {event.organizer && (
                            <div className="bg-white border border-slate-200 rounded-2xl p-6">
                                <h3 className="font-bold text-slate-800 mb-4">Organized By</h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-brand-100 to-brand-200 rounded-full flex items-center justify-center">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800">{event.organizer.name}</p>
                                        <p className="text-sm text-slate-500">{event.organizer.department}</p>
                                    </div>
                                </div>
                                {event.organizer.bio && (
                                    <p className="text-sm text-slate-600 mb-4">{event.organizer.bio}</p>
                                )}
                                <div className="space-y-2">
                                    {event.organizer.email && (
                                        <a
                                            href={`mailto:${event.organizer.email}`}
                                            className="flex items-center gap-2 text-sm text-slate-600 hover:text-brand-200 transition-colors"
                                        >
                                            <Mail className="w-4 h-4" />
                                            {event.organizer.email}
                                        </a>
                                    )}
                                    {event.organizer.phone && (
                                        <a
                                            href={`tel:${event.organizer.phone}`}
                                            className="flex items-center gap-2 text-sm text-slate-600 hover:text-brand-200 transition-colors"
                                        >
                                            <Phone className="w-4 h-4" />
                                            {event.organizer.phone}
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Quick Info */}
                        <div className="space-y-3">
                            <InfoCard
                                icon={Calendar}
                                label="Date"
                                value={formatDate(event.date, 'short')}
                                subValue={formatTime(event.date) + ' - ' + formatTime(event.endDate)}
                            />
                            <InfoCard
                                icon={MapPin}
                                label="Venue"
                                value={event.venueName || event.venue}
                            />
                        </div>
                    </div>
                </div>

                {/* Related Events */}
                {relatedEvents.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Related Events</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedEvents.map((relatedEvent) => (
                                <motion.div
                                    key={relatedEvent.id}
                                    whileHover={{ y: -5 }}
                                    onClick={() => navigate(`/events/${relatedEvent.id}`)}
                                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                                >
                                    <div className={`h-24 bg-gradient-to-br ${getCategoryColors(relatedEvent.category).gradient}`} />
                                    <div className="p-4">
                                        <h3 className="font-bold text-slate-800 mb-1">{relatedEvent.title}</h3>
                                        <p className="text-sm text-slate-500 mb-3">{formatDate(relatedEvent.date, 'short')}</p>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm font-semibold ${relatedEvent.fee === 0 ? 'text-emerald-600' : 'text-slate-700'}`}>
                                                {formatPrice(relatedEvent.fee)}
                                            </span>
                                            <ChevronRight className="w-4 h-4 text-slate-400" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventDetailPage;
