import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, CloudSun, Sparkles } from 'lucide-react';

/**
 * Personalized welcome section with greeting and motivational content
 */
function WelcomeSection({
    user,
    tip,
    className = ''
}) {
    // Get time-based greeting
    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            return { text: 'Good Morning', icon: Sun, emoji: '☀️' };
        } else if (hour < 17) {
            return { text: 'Good Afternoon', icon: CloudSun, emoji: '🌤️' };
        } else {
            return { text: 'Good Evening', icon: Moon, emoji: '🌙' };
        }
    }, []);

    const firstName = user?.fullName?.split(' ')[0] || 'there';
    const GreetingIcon = greeting.icon;

    // Motivational messages
    const motivationalMessages = [
        "Ready to discover amazing events?",
        "What exciting adventures await you today?",
        "Let's find your next memorable experience!",
        "Your next adventure is waiting!",
        "Explore, Connect, Experience!"
    ];

    const randomMessage = useMemo(() => {
        return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    }, []);

    return (
        <motion.div
            className={`bg-brand-50/50 rounded-2xl p-6 border border-brand-100/30 ${className}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <motion.div
                        className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-brand-200/30"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                        {user?.avatar ? (
                            <img
                                src={user.avatar}
                                alt={firstName}
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        ) : (
                            firstName.charAt(0).toUpperCase()
                        )}
                    </motion.div>

                    {/* Greeting */}
                    <div>
                        <motion.h1
                            className="text-2xl font-bold text-slate-900 flex items-center gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            {greeting.text}, {firstName}!
                            <motion.span
                                animate={{
                                    rotate: [0, 15, 0],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 3
                                }}
                            >
                                👋
                            </motion.span>
                        </motion.h1>
                        <motion.p
                            className="text-slate-500 text-sm mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {randomMessage}
                        </motion.p>
                    </div>
                </div>

                {/* Time indicator */}
                <motion.div
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#f7f8fa] rounded-xl border border-slate-200 shadow-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <GreetingIcon className="w-5 h-5 text-amber-500" />
                    <span className="text-sm font-medium text-slate-700">
                        {new Date().toLocaleDateString('en-IN', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </span>
                </motion.div>
            </div>

            {/* Optional tip */}
            {tip && (
                <motion.div
                    className="mt-4 flex items-center gap-2 text-sm text-brand-200 bg-brand-50 px-4 py-2.5 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Sparkles className="w-4 h-4" />
                    {tip}
                </motion.div>
            )}
        </motion.div>
    );
}

export default WelcomeSection;
