import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, MessageCircle } from 'lucide-react';

/**
 * ErrorState - Error display component with retry and support options
 * @param {Object} props
 * @param {string} [props.title] - Error title
 * @param {string} [props.message] - Error message
 * @param {Function} [props.onRetry] - Retry handler
 * @param {Function} [props.onContact] - Contact support handler
 * @param {string} [props.variant] - 'full' | 'inline' | 'compact'
 */
export default function ErrorState({
    title = 'Something went wrong',
    message = 'We encountered an error while loading this content. Please try again.',
    onRetry,
    onContact,
    variant = 'full'
}) {
    if (variant === 'compact') {
        return (
            <motion.div
                className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700 flex-1">{message}</p>
                {onRetry && (
                    <motion.button
                        onClick={onRetry}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </motion.button>
                )}
            </motion.div>
        );
    }

    if (variant === 'inline') {
        return (
            <motion.div
                className="flex flex-col items-center justify-center py-8 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <h4 className="text-base font-semibold text-slate-900 mb-2">{title}</h4>
                <p className="text-sm text-slate-500 text-center max-w-sm mb-4">{message}</p>
                {onRetry && (
                    <motion.button
                        onClick={onRetry}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium text-sm hover:bg-red-100 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </motion.button>
                )}
            </motion.div>
        );
    }

    // Full variant
    return (
        <motion.div
            className="flex flex-col items-center justify-center py-16 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
        >
            {/* Animated Error Icon */}
            <motion.div
                className="relative mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
                <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <AlertCircle className="w-12 h-12 text-red-500" />
                    </motion.div>
                </div>
                {/* Decorative rings */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-red-200"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </motion.div>

            {/* Error Text */}
            <motion.h3
                className="text-xl font-bold text-slate-900 mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                {title}
            </motion.h3>
            <motion.p
                className="text-slate-500 text-center max-w-md mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                {message}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                {onRetry && (
                    <motion.button
                        onClick={onRetry}
                        className="flex items-center gap-2 px-6 py-3 bg-brand-100 text-white rounded-xl font-semibold shadow-lg shadow-brand-200/30"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <RefreshCw className="w-5 h-5" />
                        Try Again
                    </motion.button>
                )}
                {onContact && (
                    <motion.button
                        onClick={onContact}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <MessageCircle className="w-5 h-5" />
                        Contact Support
                    </motion.button>
                )}
            </motion.div>
        </motion.div>
    );
}
