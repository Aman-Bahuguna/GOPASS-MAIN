import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Filter, ChevronDown, ChevronUp, X, MapPin, Tag,
    IndianRupee, Calendar, RotateCcw, SlidersHorizontal
} from 'lucide-react';
import { INDIAN_STATES } from '../../../utils/constants';

// Event categories
const CATEGORIES = [
    { value: 'all', label: 'All Categories', icon: Tag },
    { value: 'Technology', label: 'Technology', color: 'blue' },
    { value: 'Cultural', label: 'Cultural', color: 'purple' },
    { value: 'Workshop', label: 'Workshop', color: 'emerald' },
    { value: 'Sports', label: 'Sports', color: 'orange' },
];

// Fee options
const FEE_OPTIONS = [
    { value: 'all', label: 'All Events' },
    { value: 'free', label: 'Free Events' },
    { value: 'paid', label: 'Paid Events' },
];

// Date filter options
const DATE_OPTIONS = [
    { value: 'all', label: 'All Dates' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
];

const FilterSection = ({ title, icon: Icon, children, isOpen, onToggle }) => (
    <div className="border-b border-slate-100 last:border-0">
        <button
            onClick={onToggle}
            className="w-full flex items-center justify-between py-4 px-1 text-left hover:bg-slate-50/50 transition-colors duration-200 rounded-lg"
        >
            <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-brand-200" />
                <span className="font-semibold text-slate-700">{title}</span>
            </div>
            <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
            >
                <ChevronDown className="w-4 h-4 text-slate-400" />
            </motion.div>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                >
                    <div className="pb-4 px-1">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const EventFilters = ({
    filters,
    onFilterChange,
    onClearFilters,
    activeFiltersCount = 0,
    className = ''
}) => {
    const [openSections, setOpenSections] = useState({
        category: true,
        location: true,
        fee: false,
        date: false,
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleCategoryChange = (category) => {
        onFilterChange?.({ ...filters, category });
    };

    const handleLocationChange = (location) => {
        onFilterChange?.({ ...filters, location });
    };

    const handleFeeChange = (feeType) => {
        onFilterChange?.({ ...filters, feeType });
    };

    const handleDateChange = (dateFilter) => {
        onFilterChange?.({ ...filters, dateFilter });
    };

    const getCategoryColor = (color) => {
        const colors = {
            blue: 'bg-blue-100 text-blue-700 border-blue-200',
            purple: 'bg-purple-100 text-purple-700 border-purple-200',
            emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
            orange: 'bg-orange-100 text-orange-700 border-orange-200',
        };
        return colors[color] || 'bg-slate-100 text-slate-700 border-slate-200';
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className={`bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-900/5 overflow-hidden ${className}`}
        >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-brand-100/10 rounded-lg">
                            <SlidersHorizontal className="w-5 h-5 text-brand-200" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Filters</h3>
                            {activeFiltersCount > 0 && (
                                <p className="text-xs text-slate-500">{activeFiltersCount} active</p>
                            )}
                        </div>
                    </div>
                    {activeFiltersCount > 0 && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onClearFilters}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-200 hover:bg-brand-100/10 rounded-lg transition-colors duration-200"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Clear All
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Filter Sections */}
            <div className="p-4 space-y-1">
                {/* Category Filter */}
                <FilterSection
                    title="Category"
                    icon={Tag}
                    isOpen={openSections.category}
                    onToggle={() => toggleSection('category')}
                >
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                            <motion.button
                                key={cat.value}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleCategoryChange(cat.value)}
                                className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${filters.category === cat.value
                                        ? cat.color
                                            ? getCategoryColor(cat.color)
                                            : 'bg-brand-100 text-white border-brand-200'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                {cat.label}
                            </motion.button>
                        ))}
                    </div>
                </FilterSection>

                {/* Location Filter */}
                <FilterSection
                    title="Location"
                    icon={MapPin}
                    isOpen={openSections.location}
                    onToggle={() => toggleSection('location')}
                >
                    <div className="relative">
                        <select
                            value={filters.location || 'all'}
                            onChange={(e) => handleLocationChange(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 appearance-none cursor-pointer hover:border-brand-200 focus:outline-none focus:border-brand-200 focus:ring-2 focus:ring-brand-100/20 transition-all duration-200"
                        >
                            <option value="all">All Locations</option>
                            {INDIAN_STATES.map((state) => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                </FilterSection>

                {/* Fee Filter */}
                <FilterSection
                    title="Price"
                    icon={IndianRupee}
                    isOpen={openSections.fee}
                    onToggle={() => toggleSection('fee')}
                >
                    <div className="space-y-2">
                        {FEE_OPTIONS.map((option) => (
                            <label
                                key={option.value}
                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${filters.feeType === option.value
                                        ? 'bg-brand-100/10 border border-brand-200'
                                        : 'bg-slate-50 border border-transparent hover:border-slate-200'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="feeType"
                                    value={option.value}
                                    checked={filters.feeType === option.value}
                                    onChange={() => handleFeeChange(option.value)}
                                    className="w-4 h-4 text-brand-200 border-slate-300 focus:ring-brand-200"
                                />
                                <span className={`text-sm font-medium ${filters.feeType === option.value ? 'text-brand-200' : 'text-slate-600'
                                    }`}>
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                {/* Date Filter */}
                <FilterSection
                    title="Date"
                    icon={Calendar}
                    isOpen={openSections.date}
                    onToggle={() => toggleSection('date')}
                >
                    <div className="grid grid-cols-2 gap-2">
                        {DATE_OPTIONS.map((option) => (
                            <motion.button
                                key={option.value}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleDateChange(option.value)}
                                className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${filters.dateFilter === option.value
                                        ? 'bg-brand-100/10 text-brand-200 border-brand-200'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                {option.label}
                            </motion.button>
                        ))}
                    </div>
                </FilterSection>
            </div>
        </motion.div>
    );
};

export default EventFilters;
