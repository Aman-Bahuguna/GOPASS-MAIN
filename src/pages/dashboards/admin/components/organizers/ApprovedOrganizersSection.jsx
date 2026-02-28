import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Users, ChevronRight } from 'lucide-react';
import { SectionHeader, SearchInput, EmptyState } from '../common';
import ApprovedOrganizerRow from './ApprovedOrganizerRow';

/**
 * Approved Organizers Section Component
 * Container for displaying and managing approved organizers
 */
function ApprovedOrganizersSection({
    organizers = [],
    onViewDetails,
    onViewEvents,
    onSendMessage,
    onRevoke,
    onViewAll,
    limit = 5
}) {
    const [searchQuery, setSearchQuery] = useState('');

    // Filtered organizers based on search
    const filteredOrganizers = useMemo(() => {
        if (!searchQuery.trim()) return organizers;

        const query = searchQuery.toLowerCase();
        return organizers.filter(org =>
            org.fullName?.toLowerCase().includes(query) ||
            org.email?.toLowerCase().includes(query) ||
            org.position?.toLowerCase().includes(query)
        );
    }, [organizers, searchQuery]);

    // Displayed organizers (limited view)
    const displayedOrganizers = filteredOrganizers.slice(0, limit);
    const hasMore = filteredOrganizers.length > limit;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <SectionHeader
                icon={UserCheck}
                title="Approved Organizers"
                iconBgColor="bg-emerald-100"
                iconColor="text-emerald-600"
                showViewAll={organizers.length > limit}
                onViewAll={onViewAll}
            />

            {/* Search (only show if there are organizers) */}
            {organizers.length > 3 && (
                <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search organizers..."
                        className="max-w-sm"
                    />
                </motion.div>
            )}

            {/* Organizer List */}
            <div className="bg-[#f7f8fa] rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden shadow-sm">
                {displayedOrganizers.length > 0 ? (
                    <>
                        {displayedOrganizers.map((organizer, index) => (
                            <ApprovedOrganizerRow
                                key={organizer.id}
                                organizer={organizer}
                                index={index}
                                onViewDetails={onViewDetails}
                                onViewEvents={onViewEvents}
                                onSendMessage={onSendMessage}
                                onRevoke={onRevoke}
                            />
                        ))}

                        {/* Show more button */}
                        {hasMore && (
                            <motion.button
                                onClick={onViewAll}
                                className="w-full py-4 text-brand-200 hover:bg-brand-50/50 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                                whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
                            >
                                View all {filteredOrganizers.length} organizers
                                <ChevronRight className="w-4 h-4" />
                            </motion.button>
                        )}
                    </>
                ) : searchQuery ? (
                    <div className="p-8 text-center">
                        <Users className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                        <p className="text-slate-500">No organizers match "{searchQuery}"</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="mt-2 text-brand-200 text-sm font-medium hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                ) : (
                    <div className="p-8 text-center">
                        <Users className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                        <p className="text-slate-500">No approved organizers yet</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default ApprovedOrganizersSection;
