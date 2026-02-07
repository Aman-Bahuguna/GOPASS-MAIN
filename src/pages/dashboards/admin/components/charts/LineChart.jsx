import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Line Chart Component
 * Displays data as a line graph with optional area fill
 */
function LineChart({
    data = [],
    height = 250,
    showPoints = true,
    showLabels = true,
    showGrid = true,
    areaFill = true,
    animated = true,
    lineColor = '#4F46E5',
    areaColor = 'rgba(79, 70, 229, 0.1)',
    className = ''
}) {
    const [isVisible, setIsVisible] = useState(!animated);

    useEffect(() => {
        if (animated) {
            const timer = setTimeout(() => setIsVisible(true), 100);
            return () => clearTimeout(timer);
        }
    }, [animated]);

    if (data.length < 2) {
        return (
            <div className={`flex items-center justify-center text-slate-400 ${className}`} style={{ height }}>
                Not enough data points
            </div>
        );
    }

    const maxValue = Math.max(...data.map(d => d.value), 1);
    const minValue = Math.min(...data.map(d => d.value), 0);
    const range = maxValue - minValue || 1;
    const padding = 40;
    const chartWidth = 100; // percentage
    const chartHeight = height - 40;

    // Calculate points
    const points = data.map((item, index) => ({
        x: (index / (data.length - 1)) * 100,
        y: ((maxValue - item.value) / range) * 100,
        ...item
    }));

    // Generate SVG path
    const linePath = points
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
        .join(' ');

    // Generate area path
    const areaPath = `${linePath} L ${100} ${100} L ${0} ${100} Z`;

    // Grid lines
    const gridLines = [0, 25, 50, 75, 100];

    return (
        <div className={`relative ${className}`} style={{ height }}>
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full"
                style={{ height: chartHeight }}
            >
                {/* Grid lines */}
                {showGrid && gridLines.map((y) => (
                    <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="100"
                        y2={y}
                        stroke="#E2E8F0"
                        strokeWidth="0.3"
                        vectorEffect="non-scaling-stroke"
                    />
                ))}

                {/* Area fill */}
                {areaFill && (
                    <motion.path
                        d={areaPath}
                        fill={areaColor}
                        initial={animated ? { opacity: 0 } : false}
                        animate={{ opacity: isVisible ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    />
                )}

                {/* Line */}
                <motion.path
                    d={linePath}
                    fill="none"
                    stroke={lineColor}
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    initial={animated ? { pathLength: 0 } : false}
                    animate={{ pathLength: isVisible ? 1 : 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />

                {/* Data points */}
                {showPoints && points.map((point, index) => (
                    <motion.g key={index}>
                        <motion.circle
                            cx={point.x}
                            cy={point.y}
                            r="1.5"
                            fill="white"
                            stroke={lineColor}
                            strokeWidth="0.4"
                            vectorEffect="non-scaling-stroke"
                            initial={animated ? { scale: 0 } : false}
                            animate={{ scale: isVisible ? 1 : 0 }}
                            transition={{ delay: 0.5 + index * 0.05, duration: 0.2 }}
                            className="cursor-pointer"
                        />
                        {/* Hover area */}
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r="4"
                            fill="transparent"
                            className="cursor-pointer"
                        >
                            <title>{`${point.label}: ${point.value}`}</title>
                        </circle>
                    </motion.g>
                ))}
            </svg>

            {/* X-axis labels */}
            {showLabels && (
                <div className="flex justify-between mt-2">
                    {data.map((item, index) => (
                        <span
                            key={index}
                            className="text-xs text-slate-500 text-center"
                            style={{
                                width: `${100 / data.length}%`,
                                maxWidth: '60px'
                            }}
                        >
                            {item.label}
                        </span>
                    ))}
                </div>
            )}

            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-400 pr-2" style={{ height: chartHeight }}>
                <span>{maxValue}</span>
                <span>{Math.round((maxValue + minValue) / 2)}</span>
                <span>{minValue}</span>
            </div>
        </div>
    );
}

export default LineChart;
