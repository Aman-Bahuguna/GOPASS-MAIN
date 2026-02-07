import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, UserCheck, UserX, Mail, X, AlertTriangle } from 'lucide-react';
import { ActionButton, ConfirmationModal } from '../common';

/**
 * Bulk Actions Bar Component
 * Floating action bar for bulk operations on selected organizers
 */
function BulkActionsBar({
    selectedCount,
    selectedIds = [],
    onApproveAll,
    onRejectAll,
    onMessageAll,
    onClearSelection,
    position = 'bottom' // 'top' | 'bottom'
}) {
    const [showConfirm, setShowConfirm] = useState(null); // 'approve' | 'reject' | null
    const [isProcessing, setIsProcessing] = useState(false);

    const handleBulkApprove = async () => {
        setIsProcessing(true);
        await onApproveAll?.(selectedIds);
        setIsProcessing(false);
        setShowConfirm(null);
        onClearSelection?.();
    };

    const handleBulkReject = async () => {
        setIsProcessing(true);
        await onRejectAll?.(selectedIds);
        setIsProcessing(false);
        setShowConfirm(null);
        onClearSelection?.();
    };

    if (selectedCount === 0) return null;

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: position === 'bottom' ? 20 : -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: position === 'bottom' ? 20 : -20 }}
                    className={`fixed left-1/2 -translate-x-1/2 z-40 ${position === 'bottom' ? 'bottom-6' : 'top-20'
                        }`}
                >
                    <div className="flex items-center gap-4 px-6 py-4 bg-slate-900 rounded-2xl shadow-2xl">
                        {/* Selection count */}
                        <div className="flex items-center gap-2">
                            <motion.div
                                className="w-8 h-8 bg-brand-200 rounded-lg flex items-center justify-center"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 0.5 }}
                            >
                                <CheckSquare className="w-4 h-4 text-white" />
                            </motion.div>
                            <span className="text-white font-semibold">
                                {selectedCount} selected
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="w-px h-8 bg-slate-700" />

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <motion.button
                                onClick={() => setShowConfirm('approve')}
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <UserCheck className="w-4 h-4" />
                                Approve All
                            </motion.button>
                            <motion.button
                                onClick={() => setShowConfirm('reject')}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <UserX className="w-4 h-4" />
                                Reject All
                            </motion.button>
                            <motion.button
                                onClick={() => onMessageAll?.(selectedIds)}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Mail className="w-4 h-4" />
                                Message
                            </motion.button>
                        </div>

                        {/* Divider */}
                        <div className="w-px h-8 bg-slate-700" />

                        {/* Clear selection */}
                        <motion.button
                            onClick={onClearSelection}
                            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X className="w-5 h-5 text-slate-400" />
                        </motion.button>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Confirmation Modals */}
            <ConfirmationModal
                isOpen={showConfirm === 'approve'}
                onClose={() => setShowConfirm(null)}
                onConfirm={handleBulkApprove}
                title="Approve All Selected"
                message={`Are you sure you want to approve ${selectedCount} organizer${selectedCount > 1 ? 's' : ''}? They will immediately gain access to create events.`}
                confirmLabel="Approve All"
                variant="success"
                loading={isProcessing}
            />

            <ConfirmationModal
                isOpen={showConfirm === 'reject'}
                onClose={() => setShowConfirm(null)}
                onConfirm={handleBulkReject}
                title="Reject All Selected"
                message={`Are you sure you want to reject ${selectedCount} organizer${selectedCount > 1 ? 's' : ''}? This action cannot be undone.`}
                confirmLabel="Reject All"
                variant="danger"
                loading={isProcessing}
            />
        </>
    );
}

export default BulkActionsBar;
