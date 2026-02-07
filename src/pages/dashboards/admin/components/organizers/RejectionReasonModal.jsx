import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, MessageSquare } from 'lucide-react';
import { ActionButton } from '../common';

/**
 * Rejection Reason Modal Component
 * Modal for entering a reason when rejecting an organizer
 */
function RejectionReasonModal({
    isOpen,
    onClose,
    onConfirm,
    organizerName,
    loading = false
}) {
    const [reason, setReason] = useState('');
    const [notifyOrganizer, setNotifyOrganizer] = useState(true);

    const predefinedReasons = [
        'Invalid or unclear ID card image',
        'Institution details do not match',
        'Incomplete application information',
        'Could not verify identity',
        'Duplicate application',
        'Other (specify below)'
    ];

    const [selectedReason, setSelectedReason] = useState('');

    const handleConfirm = () => {
        const finalReason = selectedReason === 'Other (specify below)' ? reason : selectedReason || reason;
        onConfirm(finalReason, notifyOrganizer);
    };

    const handleClose = () => {
        setReason('');
        setSelectedReason('');
        setNotifyOrganizer(true);
        onClose();
    };

    const isValid = selectedReason || reason.trim();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
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
                                    onClick={handleClose}
                                    className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-5 h-5 text-slate-400" />
                                </motion.button>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <AlertTriangle className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">Reject Application</h3>
                                        <p className="text-slate-500 mt-1 text-sm">
                                            Rejecting <strong>{organizerName}</strong>'s application
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-6 pb-4 space-y-4">
                                {/* Predefined reasons */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                                        Select a reason
                                    </label>
                                    <div className="space-y-2">
                                        {predefinedReasons.map((reasonOption) => (
                                            <motion.button
                                                key={reasonOption}
                                                onClick={() => setSelectedReason(reasonOption)}
                                                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${selectedReason === reasonOption
                                                        ? 'bg-red-50 border-2 border-red-200 text-red-700'
                                                        : 'bg-slate-50 border-2 border-transparent text-slate-600 hover:bg-slate-100'
                                                    }`}
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                            >
                                                {reasonOption}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom reason input */}
                                {selectedReason === 'Other (specify below)' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <label className="text-sm font-medium text-slate-700 mb-2 block">
                                            Specify reason
                                        </label>
                                        <textarea
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            placeholder="Enter the reason for rejection..."
                                            rows={3}
                                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-50 transition-all resize-none"
                                        />
                                    </motion.div>
                                )}

                                {/* Notify organizer checkbox */}
                                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                                    <input
                                        type="checkbox"
                                        id="notifyOrganizer"
                                        checked={notifyOrganizer}
                                        onChange={(e) => setNotifyOrganizer(e.target.checked)}
                                        className="w-4 h-4 rounded border-slate-300 text-brand-200 focus:ring-brand-200"
                                    />
                                    <label htmlFor="notifyOrganizer" className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                        <MessageSquare className="w-4 h-4" />
                                        Send notification email to organizer
                                    </label>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 p-6 pt-4 bg-slate-50 border-t border-slate-100">
                                <ActionButton
                                    onClick={handleClose}
                                    label="Cancel"
                                    variant="secondary"
                                    fullWidth
                                    disabled={loading}
                                />
                                <ActionButton
                                    onClick={handleConfirm}
                                    label="Reject Application"
                                    variant="danger"
                                    fullWidth
                                    loading={loading}
                                    disabled={!isValid}
                                />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default RejectionReasonModal;
