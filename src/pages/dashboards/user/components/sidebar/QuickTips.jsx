import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

/**
 * Rotating tips carousel with contextual tips for users
 */

// Default tips for users
const defaultTips = [
    {
        id: 1,
        text: 'Register early for popular events! Some events fill up within hours of opening.',
        link: null
    },
    {
        id: 2,
        text: 'Add events to your favorites to get notified when they go live.',
        link: null
    },
    {
        id: 3,
        text: 'Check your tickets before the event - you can download them offline!',
        link: null
    },
    {
        id: 4,
        text: 'Arrive early to events for a smoother check-in experience.',
        link: null
    },
    {
        id: 5,
        text: 'Complete your profile to get personalized event recommendations.',
        link: '/profile'
    }
];

function QuickTips({
    tips = defaultTips,
    autoRotate = true,
    rotateInterval = 8000,
    dismissable = true,
    className = ''
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dismissedTips, setDismissedTips] = useState([]);
    const [isPaused, setIsPaused] = useState(false);

    // Filter out dismissed tips
    const activeTips = tips.filter(tip => !dismissedTips.includes(tip.id));

    // Auto-rotate
    useEffect(() => {
        if (!autoRotate || isPaused || activeTips.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % activeTips.length);
        }, rotateInterval);

        return () => clearInterval(timer);
    }, [autoRotate, isPaused, activeTips.length, rotateInterval]);

    // Reset index if it goes out of bounds
    useEffect(() => {
        if (currentIndex >= activeTips.length && activeTips.length > 0) {
            setCurrentIndex(0);
        }
    }, [currentIndex, activeTips.length]);

    const handleDismiss = (tipId) => {
        setDismissedTips([...dismissedTips, tipId]);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + activeTips.length) % activeTips.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % activeTips.length);
    };

    if (activeTips.length === 0) return null;

    const currentTip = activeTips[currentIndex];

    return (
        <motion.div
            className={`bg-amber-50 border border-amber-200 rounded-2xl p-5 ${className}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-amber-800 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Pro Tip
                </h4>

                {dismissable && (
                    <motion.button
                        onClick={() => handleDismiss(currentTip.id)}
                        className="p-1 hover:bg-amber-100 rounded-lg transition-colors"
                        whileTap={{ scale: 0.9 }}
                    >
                        <X className="w-4 h-4 text-amber-400" />
                    </motion.button>
                )}
            </div>

            {/* Tip Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentTip.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <p className="text-sm text-amber-700">
                        {currentTip.text}
                    </p>

                    {currentTip.link && (
                        <motion.a
                            href={currentTip.link}
                            className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-amber-800 hover:text-amber-900"
                            whileHover={{ x: 3 }}
                        >
                            Show me how
                            <ExternalLink className="w-3.5 h-3.5" />
                        </motion.a>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {activeTips.length > 1 && (
                <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-1">
                        {activeTips.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex
                                        ? 'bg-amber-500 w-4'
                                        : 'bg-amber-300 hover:bg-amber-400'
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="flex gap-1">
                        <motion.button
                            onClick={handlePrev}
                            className="p-1.5 hover:bg-amber-100 rounded-lg transition-colors"
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft className="w-4 h-4 text-amber-600" />
                        </motion.button>
                        <motion.button
                            onClick={handleNext}
                            className="p-1.5 hover:bg-amber-100 rounded-lg transition-colors"
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronRight className="w-4 h-4 text-amber-600" />
                        </motion.button>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default QuickTips;
