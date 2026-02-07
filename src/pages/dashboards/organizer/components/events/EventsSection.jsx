import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, PlusCircle, Grid, List } from 'lucide-react';
import { SectionHeader, LoadingState } from '../common';
import OrganizerEventCard from './OrganizerEventCard';
import EmptyEventsState from './EmptyEventsState';
import EventFilters from './EventFilters';
import EventActions from './EventActions';

/**
 * EventsSection - Main events management section
 * @param {Object} props
 * @param {Array} props.events - Array of event objects
 * @param {boolean} props.canCreate - Whether user can create events
 * @param {boolean} [props.isLoading] - Loading state
 * @param {Function} [props.onCreateEvent] - Create event handler
 * @param {Function} [props.onViewEvent] - View event handler
 * @param {Function} [props.onEditEvent] - Edit event handler
 * @param {Function} [props.onDeleteEvent] - Delete event handler
 * @param {Function} [props.onDuplicateEvent] - Duplicate event handler
 * @param {Function} [props.onManageEvent] - Manage event handler
 * @param {Function} [props.onBulkDelete] - Bulk delete handler
 * @param {Function} [props.onBulkExport] - Bulk export handler
 */
export default function EventsSection({
    events = [],
    canCreate,
    isLoading = false,
    onCreateEvent,
    onViewEvent,
    onEditEvent,
    onDeleteEvent,
    onDuplicateEvent,
    onManageEvent,
    onBulkDelete,
    onBulkExport
}) {
    // Filter and search state
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date-desc');
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [selectedEventIds, setSelectedEventIds] = useState([]);

    // Filter and sort events
    const filteredEvents = useMemo(() => {
        let result = [...events];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(event =>
                event.title?.toLowerCase().includes(query) ||
                event.description?.toLowerCase().includes(query) ||
                event.category?.toLowerCase().includes(query)
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            result = result.filter(event => event.status === statusFilter);
        }

        // Date range filter
        if (dateRange.from) {
            result = result.filter(event => new Date(event.date) >= new Date(dateRange.from));
        }
        if (dateRange.to) {
            result = result.filter(event => new Date(event.date) <= new Date(dateRange.to));
        }

        // Sort
        result.sort((a, b) => {
            switch (sortBy) {
                case 'date-asc':
                    return new Date(a.date) - new Date(b.date);
                case 'date-desc':
                    return new Date(b.date) - new Date(a.date);
                case 'registrations-desc':
                    return (b.registeredCount || 0) - (a.registeredCount || 0);
                case 'registrations-asc':
                    return (a.registeredCount || 0) - (b.registeredCount || 0);
                case 'revenue-desc':
                    return ((b.registeredCount || 0) * (b.fee || 0)) - ((a.registeredCount || 0) * (a.fee || 0));
                case 'name-asc':
                    return (a.title || '').localeCompare(b.title || '');
                default:
                    return 0;
            }
        });

        return result;
    }, [events, searchQuery, statusFilter, sortBy, dateRange]);

    // Selection handlers
    const handleSelectEvent = (eventId) => {
        setSelectedEventIds(prev =>
            prev.includes(eventId)
                ? prev.filter(id => id !== eventId)
                : [...prev, eventId]
        );
    };

    const handleSelectAll = () => {
        setSelectedEventIds(filteredEvents.map(e => e.id));
    };

    const handleDeselectAll = () => {
        setSelectedEventIds([]);
    };

    // Clear all filters
    const handleClearFilters = () => {
        setSearchQuery('');
        setStatusFilter('all');
        setSortBy('date-desc');
        setDateRange({ from: '', to: '' });
    };

    // Bulk actions
    const handleBulkDelete = () => {
        if (onBulkDelete) {
            onBulkDelete(selectedEventIds);
            setSelectedEventIds([]);
        }
    };

    const handleBulkExport = () => {
        if (onBulkExport) {
            onBulkExport(selectedEventIds);
        }
    };

    if (isLoading) {
        return (
            <div>
                <SectionHeader
                    icon={Calendar}
                    title="My Events"
                    delay={0.4}
                />
                <LoadingState variant="card" count={4} />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
                <SectionHeader
                    icon={Calendar}
                    title="My Events"
                    subtitle={`${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''}`}
                    delay={0}
                />

                <div className="flex items-center gap-3">
                    {/* View toggle */}
                    <div className="flex items-center bg-slate-100 rounded-lg p-1">
                        <motion.button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                                    ? 'bg-white shadow-sm text-brand-200'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Grid className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                                    ? 'bg-white shadow-sm text-brand-200'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            whileTap={{ scale: 0.95 }}
                        >
                            <List className="w-4 h-4" />
                        </motion.button>
                    </div>

                    {/* Create event button */}
                    {canCreate && (
                        <motion.button
                            onClick={onCreateEvent}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-100 to-brand-200 text-white rounded-xl font-semibold shadow-lg shadow-brand-200/30"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <PlusCircle className="w-5 h-5" />
                            Create Event
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Filters */}
            {events.length > 0 && (
                <EventFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    statusFilter={statusFilter}
                    onStatusChange={setStatusFilter}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    dateRange={dateRange}
                    onDateRangeChange={setDateRange}
                    onClearAll={handleClearFilters}
                />
            )}

            {/* Bulk Actions */}
            <EventActions
                selectedIds={selectedEventIds}
                totalEvents={filteredEvents.length}
                onSelectAll={handleSelectAll}
                onDeselectAll={handleDeselectAll}
                onBulkDelete={handleBulkDelete}
                onBulkExport={handleBulkExport}
            />

            {/* Events Grid/List */}
            {canCreate ? (
                filteredEvents.length > 0 ? (
                    <div className={
                        viewMode === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 gap-5'
                            : 'space-y-4'
                    }>
                        {filteredEvents.map((event, index) => (
                            <OrganizerEventCard
                                key={event.id}
                                event={event}
                                index={index}
                                selected={selectedEventIds.includes(event.id)}
                                onSelect={handleSelectEvent}
                                onView={() => onViewEvent?.(event)}
                                onEdit={() => onEditEvent?.(event)}
                                onDelete={() => onDeleteEvent?.(event)}
                                onDuplicate={() => onDuplicateEvent?.(event)}
                                onManage={() => onManageEvent?.(event)}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyEventsState
                        onCreateEvent={onCreateEvent}
                        filterActive={statusFilter !== 'all' || searchQuery ? statusFilter : null}
                    />
                )
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl border border-slate-200/60 p-10 text-center"
                >
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Event Creation Locked</h3>
                    <p className="text-slate-500 max-w-sm mx-auto">
                        You need admin approval to create and manage events. Please wait for your account to be approved.
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
}
