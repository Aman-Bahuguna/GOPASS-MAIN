import { useState, useEffect } from 'react';

/**
 * AnimatedCounter - Smooth number counting animation
 * @param {Object} props
 * @param {number} props.value - Target value to count to
 * @param {number} [props.duration] - Animation duration in seconds
 * @param {string} [props.prefix] - Prefix before number (e.g., '$')
 * @param {string} [props.suffix] - Suffix after number (e.g., '%')
 * @param {boolean} [props.formatNumber] - Whether to format with commas
 */
function AnimatedCounter({ value, duration = 1, prefix = '', suffix = '', formatNumber = false }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(value) || 0;
        if (start === end) {
            setCount(end);
            return;
        }

        // Determine step size based on value magnitude
        const totalSteps = Math.min(end, 60); // Cap at 60 steps for smooth animation
        const stepValue = end / totalSteps;
        const incrementTime = (duration * 1000) / totalSteps;

        const timer = setInterval(() => {
            start += stepValue;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value, duration]);

    const formattedCount = formatNumber
        ? count.toLocaleString()
        : count;

    return <span>{prefix}{formattedCount}{suffix}</span>;
}

export default AnimatedCounter;
