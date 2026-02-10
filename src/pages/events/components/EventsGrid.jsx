import { motion } from 'framer-motion';
import EventCard from './EventCard';
import { Calendar, SearchX } from 'lucide-react';

// Loading skeleton for event cards
const EventCardSkeleton = () => (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-lg animate-pulse">
        <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300" />
        <div className="p-5 space-y-4">
            <div className="space-y-2.5">
                <div className="h-4 bg-slate-200 rounded-lg w-3/4" />
                <div className="h-4 bg-slate-200 rounded-lg w-1/2" />
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="h-4 bg-slate-200 rounded-lg w-20" />
                <div className="h-4 bg-slate-200 rounded-lg w-16" />
            </div>
            <div className="h-12 bg-slate-200 rounded-xl" />
        </div>
    </div>
);

// Empty state component
const EmptyState = ({ searchQuery, hasFilters }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="col-span-full flex flex-col items-center justify-center py-16 px-4"
    >
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            {searchQuery ? (
                <SearchX className="w-10 h-10 text-slate-400" />
            ) : (
                <Calendar className="w-10 h-10 text-slate-400" />
            )}
        </div>
        <h3 className="text-xl font-bold text-slate-700 mb-2">
            {searchQuery
                ? 'No events found'
                : hasFilters
                    ? 'No matching events'
                    : 'No events available'}
        </h3>
        <p className="text-slate-500 text-center max-w-md">
            {searchQuery
                ? `We couldn't find any events matching "${searchQuery}". Try a different search term.`
                : hasFilters
                    ? 'Try adjusting your filters to see more events.'
                    : 'Check back later for upcoming events in your area.'}
        </p>
    </motion.div>
);

const EventsGrid = ({
    events = [],
    isLoading = false,
    searchQuery = '',
    hasFilters = false,
    onViewDetails,
    columns = 'auto' // 'auto', 1, 2, 3, 4
}) => {
    // Determine grid columns class
    const getGridClass = () => {
        if (columns === 'auto') {
            return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
        }
        const colMap = {
            1: 'grid-cols-1',
            2: 'grid-cols-1 sm:grid-cols-2',
            3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
            4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        };
        return colMap[columns] || colMap.auto;
    };

    // Show loading skeletons
    if (isLoading) {
        return (
            <div className={`grid ${getGridClass()} gap-6`}>
                {[...Array(8)].map((_, i) => (
                    <EventCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    // Show empty state
    if (events.length === 0) {
        return <EmptyState searchQuery={searchQuery} hasFilters={hasFilters} />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`grid ${getGridClass()} gap-6`}
        >
            {events.map((event, index) => (
                <EventCard
                    key={event.id}
                    event={event}
                    index={index}
                    onViewDetails={onViewDetails}
                />
            ))}
        </motion.div>
    );
};

export default EventsGrid;
