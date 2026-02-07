import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Filter,
    X,
    Calendar,
    DollarSign,
    MapPin,
    SortAsc,
    SortDesc,
    RotateCcw
} from 'lucide-react';

/**
 * Event filters component with search, category, date, price, and sort options
 */
function EventFilters({
    filters = {},
    onFiltersChange,
    categories = [],
    showPanel = false,
    onTogglePanel,
    className = ''
}) {
    const [localFilters, setLocalFilters] = useState({
        dateRange: 'all', // all, today, week, month
        priceRange: 'all', // all, free, paid
        sortBy: 'date', // date, price, popularity
        sortOrder: 'asc',
        ...filters
    });

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        onFiltersChange?.(newFilters);
    };

    const handleClearFilters = () => {
        const defaultFilters = {
            dateRange: 'all',
            priceRange: 'all',
            sortBy: 'date',
            sortOrder: 'asc'
        };
        setLocalFilters(defaultFilters);
        onFiltersChange?.(defaultFilters);
    };

    const toggleSortOrder = () => {
        const newOrder = localFilters.sortOrder === 'asc' ? 'desc' : 'asc';
        handleFilterChange('sortOrder', newOrder);
    };

    const hasActiveFilters =
        localFilters.dateRange !== 'all' ||
        localFilters.priceRange !== 'all';

    return (
        <>
            {/* Filter Toggle Button */}
            <motion.button
                onClick={onTogglePanel}
                className={`p-3.5 bg-white border rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-slate-600 ${hasActiveFilters ? 'border-brand-200 bg-brand-50' : 'border-slate-200 hover:border-brand-100'
                    }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Filter className={`w-5 h-5 ${hasActiveFilters ? 'text-brand-200' : ''}`} />
                {hasActiveFilters && (
                    <span className="w-2 h-2 bg-brand-200 rounded-full" />
                )}
            </motion.button>

            {/* Filter Panel */}
            <AnimatePresence>
                {showPanel && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className={`w-full mt-4 overflow-hidden ${className}`}
                    >
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-lg">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-brand-200" />
                                    Filters
                                </h3>
                                <div className="flex items-center gap-2">
                                    {hasActiveFilters && (
                                        <motion.button
                                            onClick={handleClearFilters}
                                            className="text-sm text-slate-500 hover:text-brand-200 flex items-center gap-1"
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <RotateCcw className="w-3.5 h-3.5" />
                                            Clear all
                                        </motion.button>
                                    )}
                                    <button
                                        onClick={onTogglePanel}
                                        className="p-1 hover:bg-slate-100 rounded-lg"
                                    >
                                        <X className="w-4 h-4 text-slate-400" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Date Range */}
                                <div>
                                    <label className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        Date
                                    </label>
                                    <select
                                        value={localFilters.dateRange}
                                        onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-200 focus:ring-2 focus:ring-brand-100/20"
                                    >
                                        <option value="all">All Dates</option>
                                        <option value="today">Today</option>
                                        <option value="week">This Week</option>
                                        <option value="month">This Month</option>
                                    </select>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <label className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                                        <DollarSign className="w-3.5 h-3.5" />
                                        Price
                                    </label>
                                    <select
                                        value={localFilters.priceRange}
                                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-200 focus:ring-2 focus:ring-brand-100/20"
                                    >
                                        <option value="all">All Prices</option>
                                        <option value="free">Free Only</option>
                                        <option value="paid">Paid Only</option>
                                    </select>
                                </div>

                                {/* Sort By */}
                                <div>
                                    <label className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                                        <SortAsc className="w-3.5 h-3.5" />
                                        Sort By
                                    </label>
                                    <select
                                        value={localFilters.sortBy}
                                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-200 focus:ring-2 focus:ring-brand-100/20"
                                    >
                                        <option value="date">Date</option>
                                        <option value="price">Price</option>
                                        <option value="popularity">Popularity</option>
                                    </select>
                                </div>

                                {/* Sort Order */}
                                <div>
                                    <label className="text-xs font-medium text-slate-500 mb-2">Order</label>
                                    <motion.button
                                        onClick={toggleSortOrder}
                                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {localFilters.sortOrder === 'asc' ? (
                                            <>
                                                <SortAsc className="w-4 h-4 text-brand-200" />
                                                Ascending
                                            </>
                                        ) : (
                                            <>
                                                <SortDesc className="w-4 h-4 text-brand-200" />
                                                Descending
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default EventFilters;
