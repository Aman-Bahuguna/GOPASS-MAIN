import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, UserPlus } from 'lucide-react';
import { SectionHeader, EmptyState, SearchInput, FilterDropdown } from '../common';
import PendingOrganizerCard from './PendingOrganizerCard';

/**
 * Pending Organizers Section Component
 * Container for managing and displaying pending organizer approvals
 */
function PendingOrganizersSection({
    organizers = [],
    onApprove,
    onReject,
    onViewDetails,
    onViewIdCard,
    onAddOrganizer
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [positionFilter, setPositionFilter] = useState(null);
    const [sortBy, setSortBy] = useState('date'); // 'date', 'name'

    // Position options for filter
    const positionOptions = [
        { value: 'TEACHER', label: 'Teacher' },
        { value: 'STUDENT', label: 'Student' }
    ];

    // Sort options
    const sortOptions = [
        { value: 'date', label: 'Latest First' },
        { value: 'name', label: 'Name A-Z' }
    ];

    // Filtered and sorted organizers
    const filteredOrganizers = useMemo(() => {
        let result = [...organizers];

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(org =>
                org.fullName?.toLowerCase().includes(query) ||
                org.email?.toLowerCase().includes(query) ||
                org.college?.name?.toLowerCase().includes(query)
            );
        }

        // Apply position filter
        if (positionFilter) {
            result = result.filter(org => org.position === positionFilter);
        }

        // Apply sorting
        if (sortBy === 'name') {
            result.sort((a, b) => a.fullName.localeCompare(b.fullName));
        } else {
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return result;
    }, [organizers, searchQuery, positionFilter, sortBy]);

    const hasFilters = searchQuery || positionFilter;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <SectionHeader
                icon={AlertCircle}
                title="Pending Approvals"
                count={organizers.length}
                iconBgColor="bg-orange-100"
                iconColor="text-orange-600"
                countColor="bg-red-100 text-red-600"
                pulseCount={organizers.length > 0}
            >
                {onAddOrganizer && (
                    <motion.button
                        onClick={onAddOrganizer}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-200 hover:bg-brand-100 text-white rounded-xl text-sm font-medium transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <UserPlus className="w-4 h-4" />
                        Add Organizer
                    </motion.button>
                )}
            </SectionHeader>

            {/* Filters */}
            {organizers.length > 0 && (
                <motion.div
                    className="flex flex-wrap items-center gap-3 mb-5"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search by name, email, college..."
                        className="flex-1 min-w-[200px]"
                    />
                    <FilterDropdown
                        label="Position"
                        options={positionOptions}
                        value={positionFilter}
                        onChange={setPositionFilter}
                        placeholder="All Positions"
                    />
                    <FilterDropdown
                        label="Sort"
                        options={sortOptions}
                        value={sortBy}
                        onChange={(val) => setSortBy(val || 'date')}
                        placeholder="Sort by"
                    />
                </motion.div>
            )}

            {/* Results count when filtered */}
            {hasFilters && filteredOrganizers.length !== organizers.length && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-slate-500 mb-4"
                >
                    Showing {filteredOrganizers.length} of {organizers.length} pending organizers
                </motion.p>
            )}

            {/* Organizer Cards */}
            <AnimatePresence mode="popLayout">
                {filteredOrganizers.length > 0 ? (
                    <div className="space-y-4">
                        {filteredOrganizers.map((organizer, index) => (
                            <PendingOrganizerCard
                                key={organizer.id}
                                organizer={organizer}
                                index={index}
                                onApprove={onApprove}
                                onReject={onReject}
                                onViewDetails={onViewDetails}
                                onViewIdCard={onViewIdCard}
                            />
                        ))}
                    </div>
                ) : hasFilters ? (
                    <EmptyState
                        icon={AlertCircle}
                        title="No Results Found"
                        message="No organizers match your search criteria. Try adjusting your filters."
                        variant="info"
                        action="Clear Filters"
                        onAction={() => {
                            setSearchQuery('');
                            setPositionFilter(null);
                            setSortBy('date');
                        }}
                    />
                ) : (
                    <EmptyState
                        icon={AlertCircle}
                        title="All Caught Up!"
                        message="You've reviewed all organizer requests. Check back later for new applications."
                        variant="success"
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default PendingOrganizersSection;
