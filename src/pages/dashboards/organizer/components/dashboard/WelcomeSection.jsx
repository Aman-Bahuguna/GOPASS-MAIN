import { motion } from 'framer-motion';
import { Sun, Moon, CloudSun, Sparkles, Calendar, TrendingUp } from 'lucide-react';

/**
 * WelcomeSection - Personalized greeting with user info
 * @param {Object} props
 * @param {Object} props.user - User object
 * @param {Object} [props.stats] - Quick stats to display
 * @param {number} [props.delay] - Animation delay
 */
export default function WelcomeSection({ user, stats, delay = 0 }) {
    // Get greeting based on time of day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return { text: 'Good Morning', icon: Sun, color: 'text-amber-500' };
        if (hour < 17) return { text: 'Good Afternoon', icon: CloudSun, color: 'text-orange-500' };
        return { text: 'Good Evening', icon: Moon, color: 'text-indigo-500' };
    };

    const greeting = getGreeting();
    const GreetingIcon = greeting.icon;
    const userName = user?.name?.split(' ')[0] || 'Organizer';

    // Motivational quotes for organizers
    const quotes = [
        "Ready to create amazing events? 🚀",
        "Your events bring people together! ✨",
        "Let's make today's event unforgettable! 🎉",
        "Great organizers create great experiences! 🌟",
        "Every event is a chance to inspire! 💡"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <motion.div
            className="relative bg-brand-200 rounded-3xl p-8 text-white overflow-hidden mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
        >
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-20 -right-20 w-64 h-64 bg-[#f7f8fa]/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#f7f8fa]/10 rounded-full blur-3xl"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                {/* Floating particles */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-[#f7f8fa]/30 rounded-full"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 3) * 20}%`
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                    />
                ))}
            </div>

            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Greeting */}
                <div className="flex-1">
                    <motion.div
                        className="flex items-center gap-2 text-white/80 mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: delay + 0.1 }}
                    >
                        <GreetingIcon className={`w-5 h-5 ${greeting.color}`} />
                        <span className="text-sm font-medium">{greeting.text}</span>
                    </motion.div>

                    <motion.h1
                        className="text-3xl lg:text-4xl font-bold mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: delay + 0.2 }}
                    >
                        Welcome back, {userName}! 👋
                    </motion.h1>

                    <motion.p
                        className="text-white/80 text-lg flex items-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: delay + 0.3 }}
                    >
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        {randomQuote}
                    </motion.p>
                </div>

                {/* Right: Quick stats */}
                {stats && (
                    <motion.div
                        className="flex gap-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: delay + 0.4 }}
                    >
                        <div className="bg-[#f7f8fa]/20 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[100px]">
                            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-[#f7f8fa]/20 flex items-center justify-center">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <p className="text-2xl font-bold">{stats.activeEvents || 0}</p>
                            <p className="text-xs text-white/70">Active Events</p>
                        </div>
                        <div className="bg-[#f7f8fa]/20 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[100px]">
                            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-[#f7f8fa]/20 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <p className="text-2xl font-bold">{stats.totalRegistrations || 0}</p>
                            <p className="text-xs text-white/70">Registrations</p>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Bottom: Date */}
            <motion.div
                className="relative mt-6 pt-6 border-t border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.5 }}
            >
                <p className="text-sm text-white/60">
                    {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </motion.div>
        </motion.div>
    );
}
