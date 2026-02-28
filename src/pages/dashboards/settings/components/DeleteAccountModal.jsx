import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react';

/**
 * Delete Account Modal
 * Modal dialog for account deletion with confirmation
 */
export default function DeleteAccountModal({ isOpen, onClose, onConfirm }) {
    const [confirmText, setConfirmText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const CONFIRM_PHRASE = 'DELETE MY ACCOUNT';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (confirmText !== CONFIRM_PHRASE) return;

        setIsLoading(true);

        try {
            // Simulate API call - Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSuccess(true);
            setTimeout(() => {
                onConfirm?.();
                handleClose();
            }, 1500);
        } catch (err) {
            console.error('Failed to delete account:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setSuccess(false);
            setConfirmText('');
        }, 200);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={handleClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-[#f7f8fa] rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                            {success ? (
                                <div className="text-center py-8">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                    >
                                        <CheckCircle2 className="w-8 h-8 text-red-600" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-slate-900">Account Deleted</h3>
                                    <p className="text-slate-500 mt-2">Your account has been permanently deleted.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                                            <Trash2 className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900">Delete Account</h3>
                                            <p className="text-sm text-slate-500">This action cannot be undone</p>
                                        </div>
                                    </div>

                                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl">
                                        <div className="flex gap-3">
                                            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                            <div className="text-sm text-red-700">
                                                <p className="font-medium mb-2">Warning: This will permanently delete:</p>
                                                <ul className="list-disc list-inside space-y-1 text-red-600">
                                                    <li>Your account and profile information</li>
                                                    <li>All your event registrations</li>
                                                    <li>Your tickets and history</li>
                                                    <li>All associated data</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Type <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">{CONFIRM_PHRASE}</span> to confirm
                                            </label>
                                            <input
                                                type="text"
                                                value={confirmText}
                                                onChange={(e) => setConfirmText(e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200"
                                                placeholder="Type the phrase above"
                                            />
                                        </div>

                                        <div className="flex gap-3 pt-4">
                                            <button
                                                type="button"
                                                onClick={handleClose}
                                                className="flex-1 py-3 px-4 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isLoading || confirmText !== CONFIRM_PHRASE}
                                                className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isLoading ? 'Deleting...' : 'Delete Account'}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
