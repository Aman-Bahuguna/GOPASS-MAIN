import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2 } from 'lucide-react';

const EventSearch = ({ value, onChange, placeholder = "Search events...", isLoading = false }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [localValue, setLocalValue] = useState(value || '');
    const inputRef = useRef(null);
    const debounceRef = useRef(null);

    // Sync with external value
    useEffect(() => {
        setLocalValue(value || '');
    }, [value]);

    // Debounced search
    const handleChange = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        // Clear existing timeout
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        // Set new debounced update
        debounceRef.current = setTimeout(() => {
            onChange?.(newValue);
        }, 300);
    };

    // Clear search
    const handleClear = () => {
        setLocalValue('');
        onChange?.('');
        inputRef.current?.focus();
    };

    // Handle keyboard shortcuts
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            handleClear();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`relative w-full transition-all duration-300 ${isFocused ? 'scale-[1.01]' : 'scale-100'
                }`}
        >
            {/* Glow Effect */}
            <AnimatePresence>
                {isFocused && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute -inset-1 bg-gradient-to-r from-brand-100 via-brand-200 to-brand-300 rounded-2xl opacity-20 blur-lg"
                    />
                )}
            </AnimatePresence>

            <div className={`relative flex items-center bg-white border-2 rounded-xl transition-all duration-300 overflow-hidden ${isFocused
                    ? 'border-brand-200 shadow-lg shadow-brand-100/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                {/* Search Icon */}
                <div className="pl-4 pr-2 flex items-center justify-center">
                    <motion.div
                        animate={{
                            scale: isFocused ? 1.1 : 1,
                            rotate: isFocused ? 360 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <Search className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-brand-200' : 'text-slate-400'
                            }`} />
                    </motion.div>
                </div>

                {/* Input */}
                <input
                    ref={inputRef}
                    type="text"
                    value={localValue}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-1 py-4 pr-4 text-slate-800 placeholder-slate-400 bg-transparent outline-none text-base font-medium"
                />

                {/* Loading Indicator */}
                <AnimatePresence mode="wait">
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="pr-2"
                        >
                            <Loader2 className="w-5 h-5 text-brand-200 animate-spin" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Clear Button */}
                <AnimatePresence>
                    {localValue && !isLoading && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleClear}
                            className="pr-4 pl-2 py-2"
                        >
                            <div className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200">
                                <X className="w-4 h-4 text-slate-500" />
                            </div>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Search Tips */}
            <AnimatePresence>
                {isFocused && !localValue && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute top-full left-0 right-0 mt-2 p-3 bg-white border border-slate-200 rounded-xl shadow-lg z-10"
                    >
                        <p className="text-xs text-slate-500 mb-2">Try searching for:</p>
                        <div className="flex flex-wrap gap-2">
                            {['Hackathon', 'Workshop', 'Cultural', 'Sports'].map((suggestion) => (
                                <button
                                    key={suggestion}
                                    onClick={() => {
                                        setLocalValue(suggestion);
                                        onChange?.(suggestion);
                                    }}
                                    className="px-3 py-1.5 bg-slate-100 hover:bg-brand-100/10 text-slate-600 hover:text-brand-200 rounded-full text-xs font-medium transition-colors duration-200"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default EventSearch;
