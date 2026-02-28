import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Star, ChevronLeft, ChevronRight, X } from 'lucide-react';

/**
 * ProTips - Dynamic pro tips card with carousel
 * @param {Object} props
 * @param {number} [props.delay] - Animation delay
 * @param {Array} [props.customTips] - Custom tips array
 */
export default function ProTips({ delay = 0.6, customTips }) {
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const [dismissedTips, setDismissedTips] = useState([]);

    const defaultTips = [
        {
            id: 1,
            title: 'Eye-catching Images',
            text: 'Use high-quality event banners to increase engagement by up to 40%',
            category: 'design'
        },
        {
            id: 2,
            title: 'Early Bird Discounts',
            text: 'Offer early bird pricing to drive initial registrations and create urgency',
            category: 'pricing'
        },
        {
            id: 3,
            title: 'Social Media Promotion',
            text: 'Share your event on social media platforms to reach a wider audience',
            category: 'marketing'
        },
        {
            id: 4,
            title: 'Engage Registrants',
            text: 'Send reminder emails before the event to reduce no-shows',
            category: 'engagement'
        },
        {
            id: 5,
            title: 'Collect Feedback',
            text: 'Post-event surveys help improve future events and build loyalty',
            category: 'growth'
        },
        {
            id: 6,
            title: 'Optimize Timing',
            text: 'Launch events on weekdays for 23% higher registration rates',
            category: 'timing'
        }
    ];

    const tips = (customTips || defaultTips).filter(tip => !dismissedTips.includes(tip.id));

    // Auto-rotate tips every 8 seconds
    useEffect(() => {
        if (tips.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentTipIndex(prev => (prev + 1) % tips.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [tips.length]);

    const handlePrev = () => {
        setCurrentTipIndex(prev => (prev - 1 + tips.length) % tips.length);
    };

    const handleNext = () => {
        setCurrentTipIndex(prev => (prev + 1) % tips.length);
    };

    const handleDismiss = (tipId) => {
        setDismissedTips(prev => [...prev, tipId]);
        if (currentTipIndex >= tips.length - 1) {
            setCurrentTipIndex(0);
        }
    };

    if (tips.length === 0) {
        return null;
    }

    const currentTip = tips[currentTipIndex];

    return (
        <motion.div
            className="bg-brand-200 rounded-2xl p-6 text-white relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-8 -right-8 w-32 h-32 bg-[#f7f8fa]/10 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#f7f8fa]/10 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
            </div>

            <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-300" />
                        <span className="font-bold text-lg">Pro Tips</span>
                    </div>
                    {tips.length > 1 && (
                        <div className="flex items-center gap-1">
                            <motion.button
                                onClick={handlePrev}
                                className="p-1.5 hover:bg-[#f7f8fa]/20 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                                onClick={handleNext}
                                className="p-1.5 hover:bg-[#f7f8fa]/20 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </motion.button>
                        </div>
                    )}
                </div>

                {/* Tip content with animation */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTip.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                    >
                        {/* Dismiss button */}
                        <motion.button
                            onClick={() => handleDismiss(currentTip.id)}
                            className="absolute -top-2 -right-2 p-1 hover:bg-[#f7f8fa]/20 rounded-full transition-colors opacity-0 hover:opacity-100"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X className="w-3 h-3" />
                        </motion.button>

                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-[#f7f8fa]/20 flex items-center justify-center flex-shrink-0">
                                <Star className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm mb-1">{currentTip.title}</h4>
                                <p className="text-sm text-white/80 leading-relaxed">{currentTip.text}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Dot indicators */}
                {tips.length > 1 && (
                    <div className="flex items-center justify-center gap-1.5 mt-4">
                        {tips.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setCurrentTipIndex(index)}
                                className={`h-1.5 rounded-full transition-all ${index === currentTipIndex
                                        ? 'w-4 bg-white'
                                        : 'w-1.5 bg-[#f7f8fa]/40 hover:bg-[#f7f8fa]/60'
                                    }`}
                                whileHover={{ scale: 1.2 }}
                            />
                        ))}
                    </div>
                )}

                {/* Quick action link */}
                <motion.button
                    className="mt-4 w-full py-2.5 bg-[#f7f8fa]/20 hover:bg-[#f7f8fa]/30 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Learn More Tips
                    <ChevronRight className="w-4 h-4" />
                </motion.button>
            </div>
        </motion.div>
    );
}
