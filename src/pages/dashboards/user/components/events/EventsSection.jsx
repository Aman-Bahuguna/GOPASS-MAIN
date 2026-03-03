import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, RefreshCw } from 'lucide-react';
import EventCard from './EventCard';
import EventDetailModal from './EventDetailModal';
import EventFilters from './EventFilters';
import CategoryTabs from './CategoryTabs';
import EmptyEventsState from './EmptyEventsState';
import { SectionHeader, SearchBar, LoadingState } from '../common';

/**
 * Main events section container with search, filters, event grid, and refresh
 */
function EventsSection({
    events = [],
    registrations = [],
    favorites = [],
    loading = false,
    error = null,
    onRegister,
    onViewDetails,
    onToggleFavorite,
    onViewAll,
    onRefresh,
    showHeader = true,
    showAllLink = true,
    showViewAll = true,
    maxDisplay = 6,
    className = ''
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [filters, setFilters] = useState({
        dateRange: 'all',
        priceRange: 'all',
        statusFilter: 'all',
        sortBy: 'date',
        sortOrder: 'asc'
    });

    // Handle opening event details
    const handleViewDetails = (event) => {
        setSelectedEvent(event);
        onViewDetails?.(event);
    };

    // Handle refresh
    const handleRefresh = useCallback(async () => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        try {
            await onRefresh?.();
        } finally {
            // Add a small delay for the animation
            setTimeout(() => setIsRefreshing(false), 600);
        }
    }, [onRefresh, isRefreshing]);

    // Normalize event data helper
    const getEventCategory = (event) => {
        return event.category || (event.tags && event.tags.length > 0 ? event.tags[0] : 'General');
    };

    const getEventDate = (event) => {
        return event.date || event.startDate || null;
    };

    const getEventFee = (event) => {
        return event.fee ?? 0;
    };

    const getEventDescription = (event) => {
        return event.shortDescription || event.description || '';
    };

    // Get unique categories
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(events.map(e => getEventCategory(e)))];
        return ['All', ...uniqueCategories];
    }, [events]);

    // Get category counts
    const categoryCounts = useMemo(() => {
        const counts = { All: events.length };
        events.forEach(event => {
            const cat = getEventCategory(event);
            counts[cat] = (counts[cat] || 0) + 1;
        });
        return counts;
    }, [events]);

    // Check if user is registered for an event
    const isRegisteredForEvent = (eventId) => {
        return registrations.some(r => r.eventId === eventId);
    };

    // Check if event is favorited
    const isFavorited = (eventId) => {
        return favorites.includes(eventId);
    };

    // Filter and sort events
    const filteredEvents = useMemo(() => {
        let result = events.filter(event => {
            const eventCategory = getEventCategory(event);
            const eventDesc = getEventDescription(event);
            const eventTitle = event.title || event.eventName || '';

            // Search filter
            const matchesSearch =
                eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                eventCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
                eventDesc.toLowerCase().includes(searchQuery.toLowerCase());

            // Category filter
            const matchesCategory = selectedCategory === 'All' || eventCategory === selectedCategory;

            // Date filter
            let matchesDate = true;
            if (filters.dateRange !== 'all') {
                const eventDateStr = getEventDate(event);
                if (eventDateStr) {
                    const eventDate = new Date(eventDateStr);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    switch (filters.dateRange) {
                        case 'today':
                            matchesDate = eventDate.toDateString() === today.toDateString();
                            break;
                        case 'week':
                            const weekEnd = new Date(today);
                            weekEnd.setDate(weekEnd.getDate() + 7);
                            matchesDate = eventDate >= today && eventDate <= weekEnd;
                            break;
                        case 'month':
                            const monthEnd = new Date(today);
                            monthEnd.setMonth(monthEnd.getMonth() + 1);
                            matchesDate = eventDate >= today && eventDate <= monthEnd;
                            break;
                        default:
                            matchesDate = true;
                    }
                }
            }

            // Price filter
            let matchesPrice = true;
            const fee = getEventFee(event);
            if (filters.priceRange === 'free') {
                matchesPrice = fee === 0;
            } else if (filters.priceRange === 'paid') {
                matchesPrice = fee > 0;
            }

            // Status filter
            let matchesStatus = true;
            if (filters.statusFilter !== 'all') {
                const eventStatus = event.status || 'UPCOMING';
                matchesStatus = eventStatus === filters.statusFilter;
            }

            return matchesSearch && matchesCategory && matchesDate && matchesPrice && matchesStatus;
        });

        // Sort events
        result.sort((a, b) => {
            let comparison = 0;
            switch (filters.sortBy) {
                case 'date':
                    const dateA = getEventDate(a);
                    const dateB = getEventDate(b);
                    comparison = (dateA ? new Date(dateA) : 0) - (dateB ? new Date(dateB) : 0);
                    break;
                case 'price':
                    comparison = getEventFee(a) - getEventFee(b);
                    break;
                case 'popularity':
                    comparison = (b.registeredCount || 0) - (a.registeredCount || 0);
                    break;
                default:
                    comparison = 0;
            }
            return filters.sortOrder === 'asc' ? comparison : -comparison;
        });

        return result;
    }, [events, searchQuery, selectedCategory, filters]);

    const displayEvents = maxDisplay ? filteredEvents.slice(0, maxDisplay) : filteredEvents;
    const hasMore = maxDisplay ? filteredEvents.length > maxDisplay : false;

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('All');
        setFilters({
            dateRange: 'all',
            priceRange: 'all',
            statusFilter: 'all',
            sortBy: 'date',
            sortOrder: 'asc'
        });
    };

    if (loading && !isRefreshing) {
        return (
            <div className={className}>
                <div className="mb-6">
                    <motion.div
                        className="h-8 w-48 bg-slate-100 rounded-lg relative overflow-hidden mb-4"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="absolute inset-0 -translate-x-full"
                            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(202,240,248,0.4) 40%, rgba(144,224,239,0.3) 50%, rgba(202,240,248,0.4) 60%, transparent 100%)' }}
                            animate={{ translateX: ['-100%', '200%'] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </motion.div>
                    <motion.div
                        className="h-12 w-full bg-slate-100 rounded-xl relative overflow-hidden"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <motion.div
                            className="absolute inset-0 -translate-x-full"
                            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(202,240,248,0.4) 40%, rgba(144,224,239,0.3) 50%, rgba(202,240,248,0.4) 60%, transparent 100%)' }}
                            animate={{ translateX: ['-100%', '200%'] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                        />
                    </motion.div>
                </div>
                <LoadingState variant="card" count={4} />
            </div>
        );
    }

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Search & Filter Bar with Refresh */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex-1">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search events by name, category..."
                    />
                </div>

                <div className="flex items-center gap-2">
                    {/* Refresh Button */}
                    {onRefresh && (
                        <motion.button
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className={`p-3.5 bg-[#f7f8fa] border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-brand-100 transition-all flex items-center gap-2 text-slate-600 ${isRefreshing ? 'opacity-60 cursor-wait' : ''
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="Refresh events"
                        >
                            <motion.div
                                animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                                transition={isRefreshing ? { duration: 0.8, repeat: Infinity, ease: 'linear' } : {}}
                            >
                                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'text-brand-200' : ''}`} />
                            </motion.div>
                        </motion.button>
                    )}

                    {/* Filter Toggle */}
                    <EventFilters
                        filters={filters}
                        onFiltersChange={setFilters}
                        categories={categories}
                        showPanel={showFilters}
                        onTogglePanel={() => setShowFilters(!showFilters)}
                    />
                </div>
            </div>

            {/* Category Tabs */}
            <CategoryTabs
                categories={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
                showCounts={true}
                counts={categoryCounts}
            />

            {/* Section Header */}
            {showHeader && (
                <SectionHeader
                    icon={Calendar}
                    title={selectedCategory === 'All' ? 'All Events' : selectedCategory}
                    count={filteredEvents.length}
                    actionLabel={hasMore ? 'View All' : undefined}
                    onAction={hasMore && showViewAll ? onViewAll : undefined}
                    showAction={hasMore && showViewAll}
                />
            )}

            {/* Refreshing Indicator */}
            <AnimatePresence>
                {isRefreshing && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center justify-center gap-2 py-3 px-4 bg-brand-50 border border-brand-100 rounded-xl text-brand-200 text-sm font-medium"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        >
                            <RefreshCw className="w-4 h-4" />
                        </motion.div>
                        Refreshing events...
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Events Grid */}
            {displayEvents.length > 0 ? (
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {displayEvents.map((event, index) => (
                        <EventCard
                            key={event.id || index}
                            event={event}
                            index={index}
                            onRegister={onRegister}
                            onViewDetails={handleViewDetails}
                            isRegistered={isRegisteredForEvent(event.id)}
                            isFavorite={isFavorited(event.id)}
                            onToggleFavorite={onToggleFavorite}
                        />
                    ))}
                </motion.div>
            ) : (
                <EmptyEventsState
                    title="No events found"
                    message="Try adjusting your search or filters to find more events"
                    variant="search"
                    showCTA={searchQuery || selectedCategory !== 'All' || filters.dateRange !== 'all' || filters.priceRange !== 'all' || filters.statusFilter !== 'all'}
                    ctaLabel="Clear Filters"
                    onCTA={handleClearFilters}
                />
            )}

            {/* Event Detail Modal */}
            {selectedEvent && (
                <EventDetailModal
                    event={selectedEvent}
                    isRegistered={isRegisteredForEvent(selectedEvent.id)}
                    isFavorite={isFavorited(selectedEvent.id)}
                    onClose={() => setSelectedEvent(null)}
                    onRegister={(event) => {
                        setSelectedEvent(null);
                        onRegister?.(event);
                    }}
                    onToggleFavorite={onToggleFavorite}
                />
            )}
        </div>
    );
}

export default EventsSection;
