import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';

/**
 * Reusable search bar with debouncing and filter button
 */
function SearchBar({
    value = '',
    onChange,
    placeholder = 'Search...',
    onFilterClick,
    showFilter = false,
    debounceMs = 300,
    className = ''
}) {
    const [localValue, setLocalValue] = useState(value);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onChange && localValue !== value) {
                onChange(localValue);
            }
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [localValue, debounceMs, onChange, value]);

    // Sync with external value
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleClear = useCallback(() => {
        setLocalValue('');
        onChange?.('');
    }, [onChange]);

    return (
        <motion.div
            className={`flex items-center gap-3 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Search Input */}
            <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-10 py-3.5 bg-[#f7f8fa] border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-100/20 transition-all text-slate-700 placeholder-slate-400"
                />

                {/* Clear button */}
                {localValue && (
                    <motion.button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <X className="w-3.5 h-3.5 text-slate-500" />
                    </motion.button>
                )}
            </div>

            {/* Filter Button */}
            {showFilter && (
                <motion.button
                    onClick={onFilterClick}
                    className="p-3.5 bg-[#f7f8fa] border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-brand-100 transition-all flex items-center gap-2 text-slate-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Filter className="w-5 h-5" />
                </motion.button>
            )}
        </motion.div>
    );
}

export default SearchBar;
