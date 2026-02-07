import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    History,
    Filter,
    ChevronDown,
    RefreshCw,
    UserCheck,
    UserX,
    Calendar,
    Settings,
    Edit,
    ExternalLink
} from 'lucide-react';
import { SectionHeader, FilterDropdown, EmptyState } from '../common';
import ActivityItem from './ActivityItem';

/**
 * Activity Log Section Component
 * Displays recent admin activities with filtering
 */
function ActivityLogSection({
    activities = [],
    onLoadMore,
    onRefresh,
    hasMore = false,
    loading = false,
    limit = 10
}) {
    const [typeFilter, setTypeFilter] = useState(null);
    const [dateFilter, setDateFilter] = useState('all');

    // Type filter options
    const typeOptions = [
        { value: 'organizer_approved', label: 'Organizer Approved' },
        { value: 'organizer_rejected', label: 'Organizer Rejected' },
        { value: 'event_created', label: 'Event Created' },
        { value: 'event_cancelled', label: 'Event Cancelled' },
        { value: 'settings_changed', label: 'Settings Changed' },
        { value: 'profile_updated', label: 'Profile Updated' }
    ];

    // Date filter options
    const dateOptions = [
        { value: 'all', label: 'All Time' },
        { value: 'today', label: 'Today' },
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' }
    ];

    // Filter activities
    const filteredActivities = useMemo(() => {
        let result = [...activities];

        // Type filter
        if (typeFilter) {
            result = result.filter(act => act.type === typeFilter);
        }

        // Date filter
        if (dateFilter !== 'all') {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

            result = result.filter(act => {
                const actDate = new Date(act.timestamp);
                switch (dateFilter) {
                    case 'today':
                        return actDate >= today;
                    case 'week':
                        return actDate >= weekAgo;
                    case 'month':
                        return actDate >= monthAgo;
                    default:
                        return true;
                }
            });
        }

        return result.slice(0, limit);
    }, [activities, typeFilter, dateFilter, limit]);

    const hasFilters = typeFilter || dateFilter !== 'all';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <History className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-900">Activity Log</h3>
                        <p className="text-sm text-slate-500">Recent admin actions</p>
                    </div>
                </div>
                <motion.button
                    onClick={onRefresh}
                    disabled={loading}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <RefreshCw className={`w-5 h-5 text-slate-400 ${loading ? 'animate-spin' : ''}`} />
                </motion.button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50 border-b border-slate-100">
                <FilterDropdown
                    label="Type"
                    options={typeOptions}
                    value={typeFilter}
                    onChange={setTypeFilter}
                    placeholder="All Types"
                />
                <FilterDropdown
                    label="Period"
                    options={dateOptions}
                    value={dateFilter}
                    onChange={(v) => setDateFilter(v || 'all')}
                    placeholder="All Time"
                />
                {hasFilters && (
                    <motion.button
                        onClick={() => {
                            setTypeFilter(null);
                            setDateFilter('all');
                        }}
                        className="text-sm text-brand-200 hover:text-brand-100 font-medium"
                        whileHover={{ scale: 1.02 }}
                    >
                        Clear filters
                    </motion.button>
                )}
            </div>

            {/* Activity List */}
            <div className="divide-y divide-slate-100">
                <AnimatePresence mode="popLayout">
                    {filteredActivities.length > 0 ? (
                        filteredActivities.map((activity, index) => (
                            <ActivityItem
                                key={activity.id}
                                activity={activity}
                                index={index}
                            />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-8 text-center"
                        >
                            <History className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                            <p className="text-slate-500">
                                {hasFilters ? 'No activities match your filters' : 'No recent activities'}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Load More */}
            {hasMore && filteredActivities.length > 0 && (
                <div className="p-4 border-t border-slate-100">
                    <motion.button
                        onClick={onLoadMore}
                        disabled={loading}
                        className="w-full py-3 flex items-center justify-center gap-2 text-brand-200 hover:bg-brand-50 rounded-xl font-medium transition-colors disabled:opacity-50"
                        whileHover={{ scale: 1.01 }}
                    >
                        {loading ? (
                            <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-4 h-4" />
                                Load More
                            </>
                        )}
                    </motion.button>
                </div>
            )}
        </motion.div>
    );
}

export default ActivityLogSection;
