import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    X,
    Calendar,
    ChevronDown,
    SlidersHorizontal
} from 'lucide-react';

/**
 * EventFilters - Filter and search component for events
 * @param {Object} props
 * @param {string} props.searchQuery - Current search query
 * @param {Function} props.onSearchChange - Search change handler
 * @param {string} props.statusFilter - Current status filter
 * @param {Function} props.onStatusChange - Status filter change handler
 * @param {string} props.sortBy - Current sort option
 * @param {Function} props.onSortChange - Sort change handler
 * @param {Object} [props.dateRange] - Date range filter { from, to }
 * @param {Function} [props.onDateRangeChange] - Date range change handler
 * @param {Function} [props.onClearAll] - Clear all filters handler
 */
export default function EventFilters({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusChange,
    sortBy,
    onSortChange,
    dateRange,
    onDateRangeChange,
    onClearAll
}) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'ONGOING', label: 'Live' },
        { value: 'UPCOMING', label: 'Upcoming' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'DRAFT', label: 'Draft' }
    ];

    const sortOptions = [
        { value: 'date-desc', label: 'Newest First' },
        { value: 'date-asc', label: 'Oldest First' },
        { value: 'registrations-desc', label: 'Most Registrations' },
        { value: 'registrations-asc', label: 'Least Registrations' },
        { value: 'revenue-desc', label: 'Highest Revenue' },
        { value: 'name-asc', label: 'Name (A-Z)' }
    ];

    const hasActiveFilters = searchQuery || statusFilter !== 'all' || sortBy !== 'date-desc' || dateRange?.from;

    return (
        <motion.div
            className="bg-[#f7f8fa] rounded-2xl border border-slate-200 p-4 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Main filter row */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Search input */}
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-200/20 focus:border-brand-200 transition-all"
                    />
                    {searchQuery && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => onSearchChange('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full transition-colors"
                        >
                            <X className="w-3 h-3 text-slate-500" />
                        </motion.button>
                    )}
                </div>

                {/* Status filter */}
                <div className="relative">
                    <select
                        value={statusFilter}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="appearance-none pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-200/20 focus:border-brand-200 cursor-pointer transition-all"
                    >
                        {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Sort dropdown */}
                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="appearance-none pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-200/20 focus:border-brand-200 cursor-pointer transition-all"
                    >
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Advanced filters toggle */}
                <motion.button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${showAdvanced
                            ? 'bg-brand-100 text-white'
                            : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                </motion.button>

                {/* Clear all */}
                {hasActiveFilters && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={onClearAll}
                        className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <X className="w-4 h-4" />
                        Clear All
                    </motion.button>
                )}
            </div>

            {/* Advanced filters panel */}
            <AnimatePresence>
                {showAdvanced && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 mt-4 border-t border-slate-200">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Date range - From */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1.5">
                                        From Date
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="date"
                                            value={dateRange?.from || ''}
                                            onChange={(e) => onDateRangeChange?.({ ...dateRange, from: e.target.value })}
                                            className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-200/20 focus:border-brand-200 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Date range - To */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1.5">
                                        To Date
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="date"
                                            value={dateRange?.to || ''}
                                            onChange={(e) => onDateRangeChange?.({ ...dateRange, to: e.target.value })}
                                            className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-200/20 focus:border-brand-200 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Active filter tags */}
            {hasActiveFilters && (
                <motion.div
                    className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {searchQuery && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-100/10 text-brand-200 rounded-lg text-xs font-medium">
                            Search: "{searchQuery}"
                            <button onClick={() => onSearchChange('')} className="hover:bg-brand-100/20 rounded p-0.5">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                    {statusFilter !== 'all' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                            Status: {statusOptions.find(o => o.value === statusFilter)?.label}
                            <button onClick={() => onStatusChange('all')} className="hover:bg-blue-200 rounded p-0.5">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                    {dateRange?.from && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium">
                            From: {dateRange.from}
                            <button
                                onClick={() => onDateRangeChange?.({ ...dateRange, from: '' })}
                                className="hover:bg-amber-200 rounded p-0.5"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
}
