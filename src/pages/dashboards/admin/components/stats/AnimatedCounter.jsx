import { useState, useEffect } from 'react';

/**
 * Animated Counter Component
 * Smoothly animates from 0 to the target value
 */
function AnimatedCounter({ value, duration = 1, prefix = '', suffix = '' }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const end = parseInt(value) || 0;
        if (end === 0) {
            setCount(0);
            return;
        }

        let start = 0;
        const incrementTime = (duration * 1000) / end;
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            }
        }, Math.max(incrementTime, 20)); // Minimum 20ms interval

        return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{prefix}{count}{suffix}</span>;
}

export default AnimatedCounter;
