import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';

/**
 * Notification Bell Component
 * Bell icon with unread count badge
 */
function NotificationBell({
    count = 0,
    onClick,
    animated = true,
    size = 'md', // 'sm' | 'md' | 'lg'
    className = ''
}) {
    const sizes = {
        sm: {
            button: 'p-1.5',
            icon: 'w-4 h-4',
            badge: 'w-4 h-4 text-[10px] -top-1 -right-1'
        },
        md: {
            button: 'p-2',
            icon: 'w-5 h-5',
            badge: 'w-5 h-5 text-xs -top-1 -right-1'
        },
        lg: {
            button: 'p-3',
            icon: 'w-6 h-6',
            badge: 'w-6 h-6 text-xs -top-1.5 -right-1.5'
        }
    };

    const sizeConfig = sizes[size] || sizes.md;

    return (
        <motion.button
            onClick={onClick}
            className={`relative ${sizeConfig.button} hover:bg-slate-100 rounded-xl transition-colors ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                animate={animated && count > 0 ? {
                    rotate: [0, -10, 10, -10, 10, 0],
                } : {}}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 5
                }}
            >
                <Bell className={`${sizeConfig.icon} text-slate-600`} />
            </motion.div>

            {/* Badge */}
            <AnimatePresence>
                {count > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className={`absolute ${sizeConfig.badge} bg-red-500 text-white rounded-full flex items-center justify-center font-bold`}
                    >
                        {count > 99 ? '99+' : count}
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Pulse effect for new notifications */}
            {count > 0 && animated && (
                <motion.span
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-400 rounded-full"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeOut'
                    }}
                />
            )}
        </motion.button>
    );
}

export default NotificationBell;
