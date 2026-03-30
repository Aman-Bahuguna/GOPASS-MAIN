import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Calendar, MapPin, Filter, X, Sparkles,
    ChevronDown, SlidersHorizontal, LayoutGrid, List,
    TrendingUp, Users, CalendarDays, ChevronLeft, ChevronRight
} from 'lucide-react';
import { EVENT_STATUS } from '../../utils/constants';
import { EventSearch, EventFilters, EventsGrid, EventModal } from './components';
import { fetchEvents, selectAllEvents, selectEventsStatus } from '../../store/slices/eventsSlice';

// Items per page
const ITEMS_PER_PAGE = 6;

// Sort options
const SORT_OPTIONS = [
    { value: 'date-asc', label: 'Date (Earliest First)' },
    { value: 'date-desc', label: 'Date (Latest First)' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
];

// Stats Card Component
const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-3 px-5 py-4 bg-white border border-slate-200 rounded-xl shadow-sm`}
    >
        <div className={`p-2.5 rounded-lg ${color}`}>
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-sm text-slate-500">{label}</p>
        </div>
    </motion.div>
);

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    // Always show first page
    pages.push(1);

    if (showEllipsisStart) {
        pages.push('...');
    }

    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (!pages.includes(i)) {
            pages.push(i);
        }
    }

    if (showEllipsisEnd) {
        pages.push('...');
    }

    // Always show last page
    if (totalPages > 1 && !pages.includes(totalPages)) {
        pages.push(totalPages);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mt-10"
        >
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:border-brand-200 hover:text-brand-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {pages.map((page, index) => (
                page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-slate-400">...</span>
                ) : (
                    <motion.button
                        key={page}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all ${currentPage === page
                            ? 'bg-brand-200 text-white shadow-lg shadow-brand-200/30'
                            : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-200 hover:text-brand-200'
                            }`}
                    >
                        {page}
                    </motion.button>
                )
            ))}

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:border-brand-200 hover:text-brand-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <ChevronRight className="w-5 h-5" />
            </motion.button>
        </motion.div>
    );
};

const EventsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    // Redux State
    const events = useSelector(selectAllEvents);
    const eventStatus = useSelector(selectEventsStatus);
    const isLoading = eventStatus === 'loading' || eventStatus === 'idle';

    // Initialize state from URL params
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || 'all',
        location: searchParams.get('location') || 'all',
        feeType: searchParams.get('fee') || 'all',
        dateFilter: searchParams.get('date') || 'all',
    });
    const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'date-asc');
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Modal state
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch Events
    useEffect(() => {
        if (eventStatus === 'idle') {
            dispatch(fetchEvents());
        }
    }, [dispatch, eventStatus]);

    // Sync state to URL params whenever relevant state changes
    useEffect(() => {
        const params = new URLSearchParams();

        if (searchQuery) params.set('q', searchQuery);
        if (filters.category !== 'all') params.set('category', filters.category);
        if (filters.location !== 'all') params.set('location', filters.location);
        if (filters.feeType !== 'all') params.set('fee', filters.feeType);
        if (filters.dateFilter !== 'all') params.set('date', filters.dateFilter);
        if (sortBy !== 'date-asc') params.set('sort', sortBy);
        if (currentPage > 1) params.set('page', currentPage.toString());

        // Only update if the params actually changed to prevent infinite loops
        const newParamsString = params.toString();
        const currentParamsString = searchParams.toString();
        if (newParamsString !== currentParamsString) {
            setSearchParams(params, { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, filters.category, filters.location, filters.feeType, filters.dateFilter, sortBy, currentPage]);

    // Filter and sort events
    const filteredEvents = useMemo(() => {
        let result = [...events];

        // Filter by status (only upcoming or ongoing)
        result = result.filter(event =>
            event.status === EVENT_STATUS.UPCOMING || event.status === EVENT_STATUS.ONGOING
        );

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(event =>
                event.title.toLowerCase().includes(query) ||
                event.description?.toLowerCase().includes(query) ||
                event.category.toLowerCase().includes(query) ||
                event.venue.toLowerCase().includes(query) ||
                event.tags?.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Category filter
        if (filters.category !== 'all') {
            result = result.filter(event => event.category === filters.category);
        }

        // Location filter (by state in venue address)
        if (filters.location !== 'all') {
            result = result.filter(event =>
                event.venueAddress?.toLowerCase().includes(filters.location.toLowerCase()) ||
                event.venue?.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        // Fee filter
        if (filters.feeType === 'free') {
            result = result.filter(event => event.fee === 0);
        } else if (filters.feeType === 'paid') {
            result = result.filter(event => event.fee > 0);
        }

        // Date filter
        const now = new Date();
        if (filters.dateFilter === 'today') {
            result = result.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.toDateString() === now.toDateString();
            });
        } else if (filters.dateFilter === 'week') {
            const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            result = result.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= now && eventDate <= weekFromNow;
            });
        } else if (filters.dateFilter === 'month') {
            const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            result = result.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= now && eventDate <= monthFromNow;
            });
        }

        // Sort
        switch (sortBy) {
            case 'date-asc':
                result.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'date-desc':
                result.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'popularity':
                result.sort((a, b) => b.registeredCount - a.registeredCount);
                break;
            case 'price-low':
                result.sort((a, b) => a.fee - b.fee);
                break;
            case 'price-high':
                result.sort((a, b) => b.fee - a.fee);
                break;
            default:
                break;
        }

        return result;
    }, [searchQuery, filters, sortBy]);

    // Paginated events
    const paginatedEvents = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredEvents, currentPage]);

    // Total pages
    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

    // Count active filters
    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (filters.category !== 'all') count++;
        if (filters.location !== 'all') count++;
        if (filters.feeType !== 'all') count++;
        if (filters.dateFilter !== 'all') count++;
        return count;
    }, [filters]);

    // Clear all filters
    const handleClearFilters = () => {
        setFilters({
            category: 'all',
            location: 'all',
            feeType: 'all',
            dateFilter: 'all',
        });
        setSearchQuery('');
        setCurrentPage(1);
    };

    // Handle event details view - open modal
    const handleViewDetails = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    // Handle full details navigation
    const handleViewFullDetails = (event) => {
        setIsModalOpen(false);
        navigate(`/events/${event.id}`);
    };

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll to top of events grid
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    // Stats
    const stats = useMemo(() => ({
        total: events.filter(e => e.status === EVENT_STATUS.UPCOMING).length,
        thisWeek: events.filter(e => {
            const eventDate = new Date(e.date);
            const weekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            return eventDate <= weekFromNow && e.status === EVENT_STATUS.UPCOMING;
        }).length,
        totalRegistrations: events.reduce((acc, e) => acc + e.registeredCount, 0),
    }), [events]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-brand-100 via-brand-200 to-brand-300 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="hero-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="1.5" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#hero-pattern)" />
                    </svg>
                </div>

                {/* Floating Shapes */}
                <motion.div
                    className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/10 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.3, 1], y: [0, -20, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />

                <div className="relative container mx-auto max-w-7xl px-6 py-20 pb-12">
                    {/* Title */}
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4"
                        >
                            <Sparkles className="w-4 h-4" />
                            Discover Amazing Events
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                        >
                            Explore Upcoming Events
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/80 text-lg max-w-2xl mx-auto"
                        >
                            Find and join exciting events happening near you.
                            From tech conferences to cultural festivals.
                        </motion.p>
                    </div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-2xl mx-auto"
                    >
                        <EventSearch
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search events, workshops, conferences..."
                        />
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto"
                    >
                        <StatCard
                            icon={CalendarDays}
                            label="Total Events"
                            value={stats.total}
                            color="bg-blue-100 text-blue-600"
                        />
                        <StatCard
                            icon={TrendingUp}
                            label="This Week"
                            value={stats.thisWeek}
                            color="bg-emerald-100 text-emerald-600"
                        />
                        <StatCard
                            icon={Users}
                            label="Registrations"
                            value={stats.totalRegistrations.toLocaleString()}
                            color="bg-purple-100 text-purple-600"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto max-w-7xl px-6 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters - Desktop */}
                    <aside className="hidden lg:block w-80 flex-shrink-0">
                        <div className="sticky top-6">
                            <EventFilters
                                filters={filters}
                                onFilterChange={setFilters}
                                onClearFilters={handleClearFilters}
                                activeFiltersCount={activeFiltersCount}
                            />
                        </div>
                    </aside>

                    {/* Events Grid */}
                    <main className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            {/* Results Count */}
                            <div className="flex items-center gap-3">
                                <p className="text-slate-600">
                                    <span className="font-bold text-slate-800">{filteredEvents.length}</span>
                                    {' '}events found
                                    {totalPages > 1 && (
                                        <span className="text-slate-400 ml-2">
                                            (Page {currentPage} of {totalPages})
                                        </span>
                                    )}
                                </p>
                                {activeFiltersCount > 0 && (
                                    <button
                                        onClick={handleClearFilters}
                                        className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-brand-200 hover:bg-brand-100/10 rounded-lg transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                        Clear filters
                                    </button>
                                )}
                            </div>

                            {/* Sort & Mobile Filter */}
                            <div className="flex items-center gap-3">
                                {/* Mobile Filter Button */}
                                <button
                                    onClick={() => setShowMobileFilters(true)}
                                    className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-brand-200 transition-colors"
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Filters
                                    {activeFiltersCount > 0 && (
                                        <span className="w-5 h-5 bg-brand-200 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                            {activeFiltersCount}
                                        </span>
                                    )}
                                </button>

                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none px-4 py-2.5 pr-10 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-brand-200 focus:outline-none focus:border-brand-200 cursor-pointer transition-colors"
                                    >
                                        {SORT_OPTIONS.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Events Grid */}
                        <EventsGrid
                            events={paginatedEvents}
                            isLoading={isLoading}
                            searchQuery={searchQuery}
                            hasFilters={activeFiltersCount > 0}
                            onViewDetails={handleViewDetails}
                            columns={3}
                        />

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </main>
                </div>
            </div>

            {/* Mobile Filters Drawer */}
            <AnimatePresence>
                {showMobileFilters && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowMobileFilters(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
                        >
                            <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between">
                                <h3 className="font-bold text-slate-800">Filters</h3>
                                <button
                                    onClick={() => setShowMobileFilters(false)}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>
                            <div className="p-4">
                                <EventFilters
                                    filters={filters}
                                    onFilterChange={setFilters}
                                    onClearFilters={handleClearFilters}
                                    activeFiltersCount={activeFiltersCount}
                                    className="border-0 shadow-none"
                                />
                            </div>
                            <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4">
                                <button
                                    onClick={() => setShowMobileFilters(false)}
                                    className="w-full py-3 bg-brand-200 text-white rounded-xl font-semibold hover:bg-brand-100 transition-colors"
                                >
                                    Show {filteredEvents.length} Events
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Event Preview Modal */}
            <EventModal
                event={selectedEvent}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onViewFullDetails={handleViewFullDetails}
            />
        </div>
    );
};

export default EventsPage;
