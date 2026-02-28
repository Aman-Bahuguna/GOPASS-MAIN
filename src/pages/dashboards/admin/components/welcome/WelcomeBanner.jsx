import { motion } from 'framer-motion';
import { Shield, Sparkles, ChevronRight, Bell } from 'lucide-react';

/**
 * Premium Welcome Banner Component
 * Displays a welcome banner with admin information
 */
function WelcomeBanner({ user, onViewNotifications, notificationCount = 0 }) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    const getFirstName = () => {
        return user?.fullName?.split(' ')[0] || 'Admin';
    };

    return (
        <motion.div
            className="relative bg-brand-200 rounded-2xl p-6 sm:p-8 text-white overflow-hidden mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-0 right-0 w-48 h-48 bg-[#f7f8fa]/10 rounded-full -translate-y-1/2 translate-x-1/4"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-32 h-32 bg-[#f7f8fa]/10 rounded-full translate-y-1/2 -translate-x-1/4"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-1/2 right-1/4 w-20 h-20 bg-[#f7f8fa]/5 rounded-full"
                    animate={{
                        y: [-10, 10, -10],
                        x: [-5, 5, -5]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />

                {/* Floating sparkles */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${20 + (i % 3) * 20}%`
                        }}
                        animate={{
                            y: [-5, 5, -5],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.3
                        }}
                    >
                        <Sparkles className="w-4 h-4 text-white/30" />
                    </motion.div>
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <motion.p
                        className="text-white/80 text-sm mb-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {getGreeting()},
                    </motion.p>
                    <motion.h1
                        className="text-2xl sm:text-3xl font-bold flex items-center gap-2 flex-wrap"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span>Welcome back, {getFirstName()}</span>
                        <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        >
                            👋
                        </motion.span>
                    </motion.h1>
                    <motion.div
                        className="flex items-center gap-4 mt-3 flex-wrap"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <span className="flex items-center gap-2 px-3 py-1.5 bg-[#f7f8fa]/20 rounded-full text-sm font-medium backdrop-blur-sm">
                            <Shield className="w-4 h-4" />
                            {user?.position || 'Admin'}
                        </span>
                        <span className="text-white/80 text-sm">
                            {user?.college?.name || 'Your College'}
                        </span>
                    </motion.div>
                </div>

                {/* Actions */}
                <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {/* Notification Button */}
                    {onViewNotifications && (
                        <motion.button
                            onClick={onViewNotifications}
                            className="relative p-3 bg-[#f7f8fa]/20 hover:bg-[#f7f8fa]/30 rounded-xl backdrop-blur-sm transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Bell className="w-5 h-5" />
                            {notificationCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center"
                                >
                                    {notificationCount > 9 ? '9+' : notificationCount}
                                </motion.span>
                            )}
                        </motion.button>
                    )}

                    {/* CTA Button */}
                    <motion.button
                        className="px-5 py-3 bg-[#f7f8fa] text-brand-200 rounded-xl font-semibold hover:bg-[#f7f8fa]/90 transition-colors flex items-center gap-2 shadow-lg"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Quick Actions
                        <ChevronRight className="w-4 h-4" />
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default WelcomeBanner;
