import { motion } from 'framer-motion';
import StatCard from './StatCard';

/**
 * Stats Grid Component
 * Container for displaying multiple stat cards in a responsive grid
 */
function StatsGrid({ stats = [], className = '' }) {
    return (
        <motion.div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ${className}`}
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1
                    }
                }
            }}
        >
            {stats.map((stat, index) => (
                <StatCard
                    key={stat.id || index}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    trend={stat.trend}
                    color={stat.color}
                    delay={0.1 * index}
                    highlight={stat.highlight}
                    subtitle={stat.subtitle}
                    onClick={stat.onClick}
                    tooltip={stat.tooltip}
                />
            ))}
        </motion.div>
    );
}

export default StatsGrid;
