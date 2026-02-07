import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

/**
 * Search Input Component
 * A styled search input with clear functionality
 */
function SearchInput({
    value,
    onChange,
    placeholder = 'Search...',
    className = '',
    onClear,
    autoFocus = false
}) {
    const [isFocused, setIsFocused] = useState(false);

    const handleClear = () => {
        onChange('');
        if (onClear) onClear();
    };

    return (
        <motion.div
            className={`relative ${className}`}
            animate={{ scale: isFocused ? 1.01 : 1 }}
            transition={{ duration: 0.2 }}
        >
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className={`w-4 h-4 transition-colors ${isFocused ? 'text-brand-200' : 'text-slate-400'}`} />
            </div>

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoFocus={autoFocus}
                placeholder={placeholder}
                className={`
                    w-full pl-10 pr-10 py-2.5 
                    bg-white border-2 rounded-xl 
                    text-sm text-slate-900 placeholder-slate-400
                    focus:outline-none transition-all duration-200
                    ${isFocused
                        ? 'border-brand-200 ring-4 ring-brand-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }
                `}
            />

            {value && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-md transition-colors"
                >
                    <X className="w-3.5 h-3.5 text-slate-400" />
                </motion.button>
            )}
        </motion.div>
    );
}

export default SearchInput;
