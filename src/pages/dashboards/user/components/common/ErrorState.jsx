import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, MessageCircle } from 'lucide-react';

/**
 * Error display component with retry and support options
 */
function ErrorState({
    title = 'Something went wrong',
    message = 'We encountered an error while loading this content. Please try again.',
    onRetry,
    showSupport = true,
    className = ''
}) {
    return (
        <motion.div
            className={`text-center py-12 px-6 bg-white rounded-2xl border border-slate-200 ${className}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Error Icon */}
            <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            >
                <AlertCircle className="w-8 h-8 text-red-500" />
            </motion.div>

            {/* Error Title */}
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {title}
            </h3>

            {/* Error Message */}
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                {message}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {onRetry && (
                    <motion.button
                        onClick={onRetry}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-100 to-brand-200 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-brand-200/30 transition-shadow"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </motion.button>
                )}

                {showSupport && (
                    <motion.button
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <MessageCircle className="w-4 h-4" />
                        Contact Support
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}

export default ErrorState;
