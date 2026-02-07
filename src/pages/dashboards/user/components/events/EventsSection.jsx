import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import EventCard from './EventCard';
import EventDetailModal from './EventDetailModal';
import EventFilters from './EventFilters';
import CategoryTabs from './CategoryTabs';
import EmptyEventsState from './EmptyEventsState';
import { SectionHeader, SearchBar, LoadingState } from '../common';

/**
 * Main events section container with search, filters, and event grid
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
    const [filters, setFilters] = useState({
        dateRange: 'all',
        priceRange: 'all',
        sortBy: 'date',
        sortOrder: 'asc'
    });

    // Handle opening event details
    const handleViewDetails = (event) => {
        setSelectedEvent(event);
        onViewDetails?.(event);
    };

    // Get unique categories
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(events.map(e => e.category))];
        return ['All', ...uniqueCategories];
    }, [events]);

    // Get category counts
    const categoryCounts = useMemo(() => {
        const counts = { All: events.length };
        events.forEach(event => {
            counts[event.category] = (counts[event.category] || 0) + 1;
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
            // Search filter
            const matchesSearch =
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (event.shortDescription && event.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()));

            // Category filter
            const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;

            // Date filter
            let matchesDate = true;
            if (filters.dateRange !== 'all') {
                const eventDate = new Date(event.date);
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

            // Price filter
            let matchesPrice = true;
            if (filters.priceRange === 'free') {
                matchesPrice = event.fee === 0;
            } else if (filters.priceRange === 'paid') {
                matchesPrice = event.fee > 0;
            }

            return matchesSearch && matchesCategory && matchesDate && matchesPrice;
        });

        // Sort events
        result.sort((a, b) => {
            let comparison = 0;
            switch (filters.sortBy) {
                case 'date':
                    comparison = new Date(a.date) - new Date(b.date);
                    break;
                case 'price':
                    comparison = a.fee - b.fee;
                    break;
                case 'popularity':
                    comparison = b.registeredCount - a.registeredCount;
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
            sortBy: 'date',
            sortOrder: 'asc'
        });
    };

    if (loading) {
        return (
            <div className={className}>
                <div className="mb-6">
                    <div className="h-8 w-48 bg-slate-100 rounded-lg animate-pulse mb-4" />
                    <div className="h-12 w-full bg-slate-100 rounded-xl animate-pulse" />
                </div>
                <LoadingState variant="card" count={4} />
            </div>
        );
    }

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex-1">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search events by name, category..."
                    />
                </div>
                <EventFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    categories={categories}
                    showPanel={showFilters}
                    onTogglePanel={() => setShowFilters(!showFilters)}
                />
            </div>

            {/* Filter Panel (conditionally rendered by EventFilters) */}
            {showFilters && (
                <EventFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    categories={categories}
                    showPanel={true}
                    onTogglePanel={() => setShowFilters(false)}
                />
            )}

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
                            key={event.id}
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
                    showCTA={searchQuery || selectedCategory !== 'All' || filters.dateRange !== 'all' || filters.priceRange !== 'all'}
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
