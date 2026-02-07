import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Bar Chart Component
 * Displays data as vertical or horizontal bars
 */
function BarChart({
    data = [],
    height = 250,
    showLabels = true,
    showValues = true,
    horizontal = false,
    animated = true,
    colorScheme = 'brand', // 'brand' | 'rainbow' | 'monochrome'
    className = ''
}) {
    const colors = {
        brand: ['#4F46E5', '#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD'],
        rainbow: ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#8B5CF6'],
        monochrome: ['#1E293B', '#334155', '#475569', '#64748B', '#94A3B8']
    };

    const maxValue = Math.max(...data.map(d => d.value), 1);
    const chartColors = colors[colorScheme] || colors.brand;

    if (horizontal) {
        return (
            <div className={`space-y-3 ${className}`}>
                {data.map((item, index) => (
                    <div key={item.label} className="flex items-center gap-3">
                        {showLabels && (
                            <span className="text-sm text-slate-600 w-24 truncate text-right">
                                {item.label}
                            </span>
                        )}
                        <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden">
                            <motion.div
                                initial={animated ? { width: 0 } : false}
                                animate={{ width: `${(item.value / maxValue) * 100}%` }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                                className="h-full rounded-lg flex items-center justify-end px-2"
                                style={{ backgroundColor: chartColors[index % chartColors.length] }}
                            >
                                {showValues && (
                                    <span className="text-white text-sm font-medium">
                                        {item.value}
                                    </span>
                                )}
                            </motion.div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={`flex items-end justify-around gap-2 ${className}`} style={{ height }}>
            {data.map((item, index) => (
                <div key={item.label} className="flex flex-col items-center flex-1 h-full">
                    <div className="flex-1 w-full flex items-end justify-center">
                        <motion.div
                            initial={animated ? { height: 0 } : false}
                            animate={{ height: `${(item.value / maxValue) * 100}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                            className="w-full max-w-12 rounded-t-lg relative group cursor-pointer"
                            style={{ backgroundColor: chartColors[index % chartColors.length] }}
                            whileHover={{ opacity: 0.9 }}
                        >
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                {item.label}: {item.value}
                            </div>
                            {showValues && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-slate-700"
                                >
                                    {item.value}
                                </motion.span>
                            )}
                        </motion.div>
                    </div>
                    {showLabels && (
                        <span className="mt-2 text-xs text-slate-500 text-center truncate w-full">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}

export default BarChart;
