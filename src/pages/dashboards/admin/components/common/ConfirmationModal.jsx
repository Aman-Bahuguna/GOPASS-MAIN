import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import ActionButton from './ActionButton';

/**
 * Confirmation Modal Component
 * Used for confirming actions like approve, reject, delete, etc.
 */
function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'warning', // 'warning', 'danger', 'success', 'info'
    loading = false,
    children
}) {
    const variantConfig = {
        warning: {
            icon: AlertTriangle,
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-600',
            confirmVariant: 'primary'
        },
        danger: {
            icon: XCircle,
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
            confirmVariant: 'danger'
        },
        success: {
            icon: CheckCircle2,
            iconBg: 'bg-emerald-100',
            iconColor: 'text-emerald-600',
            confirmVariant: 'success'
        },
        info: {
            icon: Info,
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            confirmVariant: 'primary'
        }
    };

    const config = variantConfig[variant] || variantConfig.warning;
    const Icon = config.icon;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="fixed inset-0 flex items-center justify-center z-50 p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                            {/* Header */}
                            <div className="relative p-6 pb-4">
                                <motion.button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-5 h-5 text-slate-400" />
                                </motion.button>

                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 ${config.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                        <Icon className={`w-6 h-6 ${config.iconColor}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                                        <p className="text-slate-500 mt-1 text-sm">{message}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Custom Content */}
                            {children && (
                                <div className="px-6 pb-4">
                                    {children}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-3 p-6 pt-4 bg-slate-50 border-t border-slate-100">
                                <ActionButton
                                    onClick={onClose}
                                    label={cancelText}
                                    variant="secondary"
                                    fullWidth
                                    disabled={loading}
                                />
                                <ActionButton
                                    onClick={onConfirm}
                                    label={confirmText}
                                    variant={config.confirmVariant}
                                    fullWidth
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default ConfirmationModal;
