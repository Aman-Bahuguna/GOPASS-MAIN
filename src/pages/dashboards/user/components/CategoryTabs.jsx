import { motion } from 'framer-motion';

// Category filter tabs
function CategoryTabs({ categories, selected, onSelect }) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
                <motion.button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selected === category
                        ? 'bg-brand-200 text-white shadow-lg shadow-brand-200/30'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-100'
                        }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {category}
                </motion.button>
            ))}
        </div>
    );
}

export default CategoryTabs;
