import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Pie Chart Component
 * Displays data as a pie or donut chart
 */
function PieChart({
    data = [],
    size = 200,
    donut = false,
    donutWidth = 40,
    showLabels = true,
    showLegend = true,
    showPercentages = true,
    animated = true,
    colorScheme = 'brand',
    className = ''
}) {
    const [activeIndex, setActiveIndex] = useState(null);

    const colors = {
        brand: ['#4F46E5', '#7C3AED', '#EC4899', '#F97316', '#10B981', '#06B6D4'],
        rainbow: ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#8B5CF6'],
        monochrome: ['#1E293B', '#334155', '#475569', '#64748B', '#94A3B8', '#CBD5E1'],
        pastel: ['#FCA5A5', '#FDBA74', '#FDE047', '#86EFAC', '#93C5FD', '#C4B5FD']
    };

    const chartColors = colors[colorScheme] || colors.brand;
    const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
    const radius = size / 2;
    const innerRadius = donut ? radius - donutWidth : 0;

    // Calculate segments
    let currentAngle = -90; // Start from top
    const segments = data.map((item, index) => {
        const percentage = (item.value / total) * 100;
        const angle = (percentage / 100) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;
        currentAngle = endAngle;

        // Calculate path
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const x1 = radius + radius * Math.cos(startRad);
        const y1 = radius + radius * Math.sin(startRad);
        const x2 = radius + radius * Math.cos(endRad);
        const y2 = radius + radius * Math.sin(endRad);

        const x1Inner = radius + innerRadius * Math.cos(startRad);
        const y1Inner = radius + innerRadius * Math.sin(startRad);
        const x2Inner = radius + innerRadius * Math.cos(endRad);
        const y2Inner = radius + innerRadius * Math.sin(endRad);

        const largeArcFlag = angle > 180 ? 1 : 0;

        const path = donut
            ? `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x2Inner} ${y2Inner} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1Inner} ${y1Inner} Z`
            : `M ${radius} ${radius} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

        // Label position
        const midAngle = (startAngle + endAngle) / 2;
        const midRad = (midAngle * Math.PI) / 180;
        const labelRadius = donut ? (radius + innerRadius) / 2 : radius * 0.6;
        const labelX = radius + labelRadius * Math.cos(midRad);
        const labelY = radius + labelRadius * Math.sin(midRad);

        return {
            ...item,
            path,
            color: chartColors[index % chartColors.length],
            percentage: percentage.toFixed(1),
            labelX,
            labelY,
            index
        };
    });

    return (
        <div className={`flex flex-col md:flex-row items-center gap-6 ${className}`}>
            {/* Chart */}
            <div className="relative" style={{ width: size, height: size }}>
                <svg viewBox={`0 0 ${size} ${size}`} className="transform -rotate-0">
                    {segments.map((segment, index) => (
                        <motion.path
                            key={segment.label}
                            d={segment.path}
                            fill={segment.color}
                            stroke="white"
                            strokeWidth="2"
                            initial={animated ? { opacity: 0, scale: 0.8 } : false}
                            animate={{
                                opacity: 1,
                                scale: activeIndex === index ? 1.05 : 1,
                                filter: activeIndex !== null && activeIndex !== index ? 'brightness(0.7)' : 'none'
                            }}
                            transition={{
                                delay: animated ? index * 0.1 : 0,
                                duration: 0.3
                            }}
                            className="cursor-pointer origin-center"
                            style={{ transformOrigin: `${radius}px ${radius}px` }}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                        />
                    ))}

                    {/* Labels inside chart */}
                    {showLabels && !donut && segments.map((segment) => (
                        segment.percentage > 5 && (
                            <motion.text
                                key={`label-${segment.label}`}
                                x={segment.labelX}
                                y={segment.labelY}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-white text-xs font-bold pointer-events-none"
                                initial={animated ? { opacity: 0 } : false}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                {showPercentages ? `${segment.percentage}%` : segment.value}
                            </motion.text>
                        )
                    ))}
                </svg>

                {/* Center text for donut */}
                {donut && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <AnimatePresence mode="wait">
                            {activeIndex !== null ? (
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="text-center"
                                >
                                    <p className="text-2xl font-bold text-slate-900">
                                        {segments[activeIndex].percentage}%
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        {segments[activeIndex].label}
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="total"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="text-center"
                                >
                                    <p className="text-2xl font-bold text-slate-900">{total}</p>
                                    <p className="text-sm text-slate-500">Total</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Legend */}
            {showLegend && (
                <div className="flex flex-col gap-2">
                    {segments.map((segment, index) => (
                        <motion.div
                            key={segment.label}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${activeIndex === index ? 'bg-slate-100' : 'hover:bg-slate-50'
                                }`}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            initial={animated ? { opacity: 0, x: -10 } : false}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <div
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: segment.color }}
                            />
                            <span className="text-sm text-slate-700 flex-1">{segment.label}</span>
                            <span className="text-sm font-semibold text-slate-900">
                                {showPercentages ? `${segment.percentage}%` : segment.value}
                            </span>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PieChart;
