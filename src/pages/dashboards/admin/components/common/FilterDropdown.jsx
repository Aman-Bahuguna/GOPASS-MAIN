import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Filter } from 'lucide-react';

/**
 * Filter Dropdown Component
 * A styled dropdown for filtering lists
 */
function FilterDropdown({
    label = 'Filter',
    options = [],
    value,
    onChange,
    placeholder = 'Select option...',
    icon: CustomIcon,
    className = ''
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);
    const Icon = CustomIcon || Filter;

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-2 px-4 py-2.5 
                    bg-white border-2 rounded-xl text-sm font-medium
                    transition-all duration-200
                    ${isOpen
                        ? 'border-brand-200 ring-4 ring-brand-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }
                    ${value ? 'text-slate-900' : 'text-slate-500'}
                `}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <Icon className="w-4 h-4 text-slate-400" />
                <span>{selectedOption?.label || placeholder}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                </motion.span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-full min-w-[180px] bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200/50 z-20 overflow-hidden"
                    >
                        <div className="py-1">
                            {/* All option to clear filter */}
                            <motion.button
                                onClick={() => {
                                    onChange(null);
                                    setIsOpen(false);
                                }}
                                className={`
                                    w-full flex items-center justify-between px-4 py-2.5 text-sm text-left
                                    hover:bg-slate-50 transition-colors
                                    ${!value ? 'text-brand-200 font-medium' : 'text-slate-600'}
                                `}
                                whileHover={{ x: 2 }}
                            >
                                <span>All {label}s</span>
                                {!value && <Check className="w-4 h-4" />}
                            </motion.button>

                            <div className="h-px bg-slate-100 mx-2" />

                            {options.map((option) => (
                                <motion.button
                                    key={option.value}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`
                                        w-full flex items-center justify-between px-4 py-2.5 text-sm text-left
                                        hover:bg-slate-50 transition-colors
                                        ${value === option.value ? 'text-brand-200 font-medium bg-brand-50/50' : 'text-slate-600'}
                                    `}
                                    whileHover={{ x: 2 }}
                                >
                                    <span>{option.label}</span>
                                    {value === option.value && <Check className="w-4 h-4" />}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default FilterDropdown;
