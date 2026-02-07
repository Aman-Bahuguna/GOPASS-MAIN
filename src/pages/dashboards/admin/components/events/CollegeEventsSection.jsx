import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    ChevronRight,
    Plus,
    Zap,
    Clock,
    Users,
    MapPin,
    TrendingUp,
    Eye
} from 'lucide-react';
import { SearchInput, FilterDropdown } from '../common';
import CollegeEventCard from './CollegeEventCard';

/**
 * Live Event Card - Shows currently ongoing events with a prominent design
 */
function LiveEventCard({ event, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 rounded-2xl border border-red-200/50 p-5 overflow-hidden group hover:shadow-lg transition-all"
        >
            {/* Live Pulse Animation */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <motion.div
                    className="w-2.5 h-2.5 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Live Now</span>
            </div>

            {/* Event Image/Banner */}
            <div className="flex gap-4">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-red-400 to-orange-500 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {event.image ? (
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    ) : (
                        <Zap className="w-8 h-8 text-white" />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 text-lg mb-1 truncate">{event.title}</h4>
                    <p className="text-sm text-slate-500 mb-2 line-clamp-1">{event.shortDescription || event.description}</p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {event.venue}
                        </span>
                        <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {event.registeredCount || 0}/{event.capacity} attending
                        </span>
                    </div>
                </div>
            </div>

            {/* Progress Bar - Time remaining */}
            <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Event in progress</span>
                    <span className="text-red-600 font-medium">Ends soon</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                        initial={{ width: '30%' }}
                        animate={{ width: '70%' }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                    />
                </div>
            </div>

            {/* View Button */}
            <motion.button
                className="mt-4 w-full py-2.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-red-200/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Eye className="w-4 h-4" />
                View Live Event
            </motion.button>
        </motion.div>
    );
}

/**
 * Upcoming Event Card - Compact card for upcoming events
 */
function UpcomingEventCard({ event, index }) {
    const eventDate = new Date(event.date);
    const isToday = new Date().toDateString() === eventDate.toDateString();
    const isTomorrow = new Date(Date.now() + 86400000).toDateString() === eventDate.toDateString();

    const getTimeLabel = () => {
        if (isToday) return 'Today';
        if (isTomorrow) return 'Tomorrow';
        return eventDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all group cursor-pointer"
        >
            {/* Date Badge */}
            <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center ${isToday ? 'bg-gradient-to-br from-emerald-500 to-green-600' :
                    isTomorrow ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
                        'bg-gradient-to-br from-blue-500 to-indigo-600'
                } text-white shadow-lg`}>
                <span className="text-xs font-medium opacity-90">
                    {eventDate.toLocaleDateString('en-IN', { weekday: 'short' })}
                </span>
                <span className="text-lg font-bold leading-none">{eventDate.getDate()}</span>
            </div>

            {/* Event Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${isToday ? 'bg-emerald-100 text-emerald-700' :
                            isTomorrow ? 'bg-amber-100 text-amber-700' :
                                'bg-blue-100 text-blue-700'
                        }`}>
                        {getTimeLabel()}
                    </span>
                    <span className="text-xs text-slate-400">
                        {eventDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                <h4 className="font-semibold text-slate-900 truncate group-hover:text-brand-200 transition-colors">
                    {event.title}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.venue}
                    </span>
                    <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {event.registeredCount || 0} registered
                    </span>
                </div>
            </div>

            {/* Arrow */}
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-200 group-hover:translate-x-1 transition-all" />
        </motion.div>
    );
}

/**
 * College Events Section Component
 * Container for displaying and managing college events with live and upcoming sections
 */
function CollegeEventsSection({
    events = [],
    onEventClick,
    onViewDetails,
    onViewAll,
    onCreateEvent,
    limit = 6
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState(null);

    // Status options
    const statusOptions = [
        { value: 'UPCOMING', label: 'Upcoming' },
        { value: 'ONGOING', label: 'Ongoing' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'CANCELLED', label: 'Cancelled' }
    ];

    // Get unique categories from events
    const categoryOptions = useMemo(() => {
        const categories = [...new Set(events.map(e => e.category).filter(Boolean))];
        return categories.map(cat => ({ value: cat, label: cat }));
    }, [events]);

    // Separate events by status
    const liveEvents = useMemo(() => {
        return events.filter(e => e.status === 'ONGOING');
    }, [events]);

    const upcomingEvents = useMemo(() => {
        return events
            .filter(e => e.status === 'UPCOMING')
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5);
    }, [events]);

    // Filtered events for main list
    const filteredEvents = useMemo(() => {
        let result = [...events];

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(event =>
                event.title?.toLowerCase().includes(query) ||
                event.venue?.toLowerCase().includes(query) ||
                event.category?.toLowerCase().includes(query)
            );
        }

        if (statusFilter) {
            result = result.filter(event => event.status === statusFilter);
        }

        if (categoryFilter) {
            result = result.filter(event => event.category === categoryFilter);
        }

        return result;
    }, [events, searchQuery, statusFilter, categoryFilter]);

    const displayedEvents = filteredEvents.slice(0, limit);
    const hasMore = filteredEvents.length > limit;
    const hasFilters = searchQuery || statusFilter || categoryFilter;
    const hasLiveOrUpcoming = liveEvents.length > 0 || upcomingEvents.length > 0;

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <motion.div
                className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-lg text-slate-900 flex items-center gap-3">
                        <div className="p-2 bg-brand-100/10 rounded-lg">
                            <Calendar className="w-5 h-5 text-brand-200" />
                        </div>
                        College Events
                        {events.length > 0 && (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                                {events.length}
                            </span>
                        )}
                    </h3>
                    {onCreateEvent && (
                        <motion.button
                            onClick={onCreateEvent}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-100 to-brand-200 text-white rounded-xl text-sm font-medium shadow-lg shadow-brand-200/30"
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Plus className="w-4 h-4" />
                            New Event
                        </motion.button>
                    )}
                </div>

                {/* Filters */}
                {events.length > 3 && (
                    <div className="flex flex-wrap items-center gap-3">
                        <SearchInput
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search events..."
                            className="flex-1 min-w-[200px]"
                        />
                        <FilterDropdown
                            label="Status"
                            options={statusOptions}
                            value={statusFilter}
                            onChange={setStatusFilter}
                            placeholder="All Status"
                        />
                        {categoryOptions.length > 1 && (
                            <FilterDropdown
                                label="Category"
                                options={categoryOptions}
                                value={categoryFilter}
                                onChange={setCategoryFilter}
                                placeholder="All Categories"
                            />
                        )}
                    </div>
                )}
            </motion.div>

            {/* Live Events Section */}
            {liveEvents.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <motion.div
                            className="w-3 h-3 bg-red-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                        <h4 className="font-bold text-slate-900">Live Now</h4>
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                            {liveEvents.length} event{liveEvents.length > 1 ? 's' : ''}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {liveEvents.map((event, index) => (
                            <LiveEventCard key={event.id} event={event} index={index} />
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Upcoming Events Section */}
            {upcomingEvents.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Clock className="w-4 h-4 text-blue-600" />
                            </div>
                            <h4 className="font-bold text-slate-900">Upcoming Events</h4>
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                                {upcomingEvents.length}
                            </span>
                        </div>
                        {upcomingEvents.length > 3 && (
                            <button className="text-sm text-brand-200 font-medium hover:underline flex items-center gap-1">
                                View all <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <div className="space-y-3">
                        {upcomingEvents.slice(0, 4).map((event, index) => (
                            <UpcomingEventCard key={event.id} event={event} index={index} />
                        ))}
                    </div>
                </motion.div>
            )}

            {/* All Events List (when filtered or no live/upcoming) */}
            {(hasFilters || !hasLiveOrUpcoming) && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm"
                >
                    {!hasFilters && !hasLiveOrUpcoming && (
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-slate-100 rounded-lg">
                                <TrendingUp className="w-4 h-4 text-slate-600" />
                            </div>
                            <h4 className="font-bold text-slate-900">All Events</h4>
                        </div>
                    )}

                    {displayedEvents.length > 0 ? (
                        <div className="space-y-3">
                            {displayedEvents.map((event, index) => (
                                <CollegeEventCard
                                    key={event.id}
                                    event={event}
                                    index={index}
                                    onClick={onEventClick}
                                    onViewDetails={onViewDetails}
                                />
                            ))}
                        </div>
                    ) : hasFilters ? (
                        <div className="text-center py-8">
                            <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                            <p className="text-slate-500">No events match your filters</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setStatusFilter(null);
                                    setCategoryFilter(null);
                                }}
                                className="mt-2 text-brand-200 text-sm font-medium hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
                                <Calendar className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">No events yet</h3>
                            <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                                Create your first event and start managing college activities
                            </p>
                            {onCreateEvent && (
                                <motion.button
                                    onClick={onCreateEvent}
                                    className="px-6 py-3 bg-gradient-to-r from-brand-100 to-brand-200 text-white rounded-xl font-medium shadow-lg shadow-brand-200/30"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Plus className="w-5 h-5 inline mr-2" />
                                    Create First Event
                                </motion.button>
                            )}
                        </div>
                    )}

                    {hasMore && (
                        <motion.button
                            onClick={onViewAll}
                            className="w-full mt-4 py-3 text-brand-200 hover:bg-brand-50/50 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                            whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
                        >
                            View all {filteredEvents.length} events
                            <ChevronRight className="w-4 h-4" />
                        </motion.button>
                    )}
                </motion.div>
            )}
        </div>
    );
}

export default CollegeEventsSection;
