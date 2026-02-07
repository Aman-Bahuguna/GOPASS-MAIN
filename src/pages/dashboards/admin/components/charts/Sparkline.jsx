import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Sparkline Component
 * Mini inline chart for showing trends
 */
function Sparkline({
    data = [],
    width = 100,
    height = 32,
    lineColor = '#4F46E5',
    fillColor = 'rgba(79, 70, 229, 0.1)',
    showTrend = true,
    animated = true,
    className = ''
}) {
    if (data.length < 2) return null;

    const values = Array.isArray(data[0]) ? data : data.map(d => typeof d === 'object' ? d.value : d);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue || 1;

    // Calculate points
    const points = values.map((value, index) => ({
        x: (index / (values.length - 1)) * width,
        y: height - ((value - minValue) / range) * height
    }));

    // Generate SVG path
    const linePath = points
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
        .join(' ');

    // Generate area path
    const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

    // Calculate trend
    const firstValue = values[0];
    const lastValue = values[values.length - 1];
    const trendPercent = ((lastValue - firstValue) / firstValue * 100).toFixed(1);
    const isPositive = lastValue >= firstValue;

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg width={width} height={height} className="overflow-visible">
                {/* Area fill */}
                <motion.path
                    d={areaPath}
                    fill={fillColor}
                    initial={animated ? { opacity: 0 } : false}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />

                {/* Line */}
                <motion.path
                    d={linePath}
                    fill="none"
                    stroke={lineColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={animated ? { pathLength: 0 } : false}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />

                {/* End point */}
                <motion.circle
                    cx={points[points.length - 1].x}
                    cy={points[points.length - 1].y}
                    r="3"
                    fill="white"
                    stroke={lineColor}
                    strokeWidth="2"
                    initial={animated ? { scale: 0 } : false}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.2 }}
                />
            </svg>

            {showTrend && (
                <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-red-500'
                    }`}>
                    {isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                    ) : (
                        <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{isPositive ? '+' : ''}{trendPercent}%</span>
                </div>
            )}
        </div>
    );
}

export default Sparkline;
