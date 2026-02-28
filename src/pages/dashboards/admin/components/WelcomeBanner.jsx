import { motion } from 'framer-motion';
import { Shield, Sparkles, Award, Zap } from 'lucide-react';

// Welcome Banner with premium design
function WelcomeBanner({ user }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            className="relative overflow-hidden rounded-3xl bg-brand-200 p-8 text-white mb-8"
        >
            {/* Animated background patterns */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-0 right-0 w-96 h-96 bg-[#f7f8fa]/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-64 h-64 bg-[#f7f8fa]/10 rounded-full blur-2xl"
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.15, 1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Decorative dots pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-8 left-8 w-2 h-2 bg-[#f7f8fa] rounded-full" />
                    <div className="absolute top-12 left-16 w-2 h-2 bg-[#f7f8fa] rounded-full" />
                    <div className="absolute top-16 left-24 w-2 h-2 bg-[#f7f8fa] rounded-full" />
                    <div className="absolute bottom-8 right-8 w-2 h-2 bg-[#f7f8fa] rounded-full" />
                    <div className="absolute bottom-12 right-16 w-2 h-2 bg-[#f7f8fa] rounded-full" />
                </div>
            </div>

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-5">
                    <motion.div
                        className="w-20 h-20 rounded-2xl bg-[#f7f8fa]/20 backdrop-blur-sm flex items-center justify-center shadow-2xl"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                        <Shield className="w-10 h-10" />
                    </motion.div>
                    <div>
                        <motion.div
                            className="flex items-center gap-2 mb-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Sparkles className="w-5 h-5 text-yellow-300" />
                            <span className="text-sm font-medium text-white/80">Admin Dashboard</span>
                        </motion.div>
                        <h2 className="text-3xl lg:text-4xl font-bold">Welcome back, {user?.fullName?.split(' ')[0]}!</h2>
                        <p className="text-white/80 mt-2 flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            {user?.position} • {user?.college?.name}
                        </p>
                    </div>
                </div>

                <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.button
                        className="px-6 py-3 bg-[#f7f8fa] text-brand-200 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-black/10"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Zap className="w-5 h-5" />
                        Quick Actions
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default WelcomeBanner;
