import { useEffect, useState, useRef } from 'react';

/**
 * Animated counter that counts up from 0 to the target value
 */
function AnimatedCounter({
    value,
    duration = 1000,
    format = true,
    prefix = '',
    suffix = ''
}) {
    const [displayValue, setDisplayValue] = useState(0);
    const startTime = useRef(null);
    const animationFrame = useRef(null);

    useEffect(() => {
        const startValue = 0;
        const endValue = value;

        const animate = (timestamp) => {
            if (!startTime.current) {
                startTime.current = timestamp;
            }

            const progress = Math.min((timestamp - startTime.current) / duration, 1);

            // Easing function (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentValue = Math.floor(startValue + (endValue - startValue) * easeOut);
            setDisplayValue(currentValue);

            if (progress < 1) {
                animationFrame.current = requestAnimationFrame(animate);
            }
        };

        // Reset and start animation
        startTime.current = null;
        setDisplayValue(0);
        animationFrame.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, [value, duration]);

    // Format number with commas or abbreviation
    const formatNumber = (num) => {
        if (!format) return num.toString();

        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 10000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num.toLocaleString();
    };

    return (
        <span className="tabular-nums">
            {prefix}{formatNumber(displayValue)}{suffix}
        </span>
    );
}

export default AnimatedCounter;
