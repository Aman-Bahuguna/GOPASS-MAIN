import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Code,
    Wrench,
    Music,
    Trophy,
    Palette,
    Users,
    LayoutGrid
} from 'lucide-react';

/**
 * Category tabs with horizontal scroll for mobile and icons
 */

// Category icon mapping
const categoryIcons = {
    'All': LayoutGrid,
    'Hackathon': Code,
    'Workshop': Wrench,
    'Concert': Music,
    'Sports': Trophy,
    'Cultural': Palette,
    'Conference': Users,
    'Tech': Code,
    'Music': Music,
    'Art': Palette
};

// Category color mapping
const categoryColors = {
    'All': 'slate',
    'Hackathon': 'blue',
    'Workshop': 'green',
    'Concert': 'purple',
    'Sports': 'orange',
    'Cultural': 'pink',
    'Conference': 'indigo',
    'Tech': 'blue',
    'Music': 'purple',
    'Art': 'pink'
};

function CategoryTabs({
    categories = [],
    selected,
    onSelect,
    showCounts = false,
    counts = {},
    className = ''
}) {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    // Check scroll position for arrows
    useEffect(() => {
        const checkScroll = () => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                setShowLeftArrow(scrollLeft > 0);
                setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
            }
        };

        checkScroll();
        const ref = scrollRef.current;
        ref?.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);

        return () => {
            ref?.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, [categories]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const getColorClasses = (category, isSelected) => {
        const color = categoryColors[category] || 'slate';

        if (isSelected) {
            return `bg-brand-100 text-white shadow-lg shadow-brand-200/30`;
        }

        return `bg-[#f7f8fa] hover:bg-${color}-50 text-slate-600 hover:text-${color}-700 border border-slate-200 hover:border-${color}-200`;
    };

    return (
        <div className={`relative ${className}`}>
            {/* Left Arrow */}
            {showLeftArrow && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[#f7f8fa] shadow-lg rounded-full flex items-center justify-center text-slate-600 hover:text-brand-200"
                    onClick={() => scroll('left')}
                >
                    <ChevronLeft className="w-5 h-5" />
                </motion.button>
            )}

            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                className="overflow-x-auto scrollbar-hide flex gap-2 py-1 px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {categories.map((category, index) => {
                    const isSelected = selected === category;
                    const IconComponent = categoryIcons[category] || LayoutGrid;
                    const count = counts[category];

                    return (
                        <motion.button
                            key={category}
                            onClick={() => onSelect(category)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${isSelected
                                    ? 'bg-brand-100 text-white shadow-lg shadow-brand-200/30'
                                    : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 hover:border-brand-100'
                                }`}
                        >
                            <IconComponent className="w-4 h-4" />
                            {category}
                            {showCounts && count !== undefined && (
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${isSelected
                                        ? 'bg-[#f7f8fa]/20 text-white'
                                        : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    {count}
                                </span>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Right Arrow */}
            {showRightArrow && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[#f7f8fa] shadow-lg rounded-full flex items-center justify-center text-slate-600 hover:text-brand-200"
                    onClick={() => scroll('right')}
                >
                    <ChevronRight className="w-5 h-5" />
                </motion.button>
            )}
        </div>
    );
}

export default CategoryTabs;
