import { useState, useEffect } from 'react';

// Animated Counter Component
function AnimatedCounter({ value, duration = 1 }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(value);
        if (start === end) return;

        const incrementTime = (duration * 1000) / end;
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count}</span>;
}

export default AnimatedCounter;
