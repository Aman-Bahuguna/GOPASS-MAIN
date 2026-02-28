import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * Password Change Modal
 * Modal dialog for changing user password with validation
 */
export default function PasswordModal({ isOpen, onClose }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Password validation
    const validatePassword = (password) => {
        if (password.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
        if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter';
        if (!/[0-9]/.test(password)) return 'Password must contain a number';
        return null;
    };

    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500', 'bg-emerald-500'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords
        const passwordError = validatePassword(newPassword);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (currentPassword === newPassword) {
            setError('New password must be different from current password');
            return;
        }

        setIsLoading(true);

        // Simulate API call - Replace with actual API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSuccess(true);
            setTimeout(() => {
                handleClose();
            }, 1500);
        } catch (err) {
            setError('Failed to update password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
        // Reset form after animation
        setTimeout(() => {
            setSuccess(false);
            setError('');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setShowPasswords(false);
        }, 200);
    };

    const passwordStrength = getPasswordStrength(newPassword);

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
                                        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                    >
                                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-slate-900">Password Updated!</h3>
                                    <p className="text-slate-500 mt-2">Your password has been changed successfully.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center">
                                            <Key className="w-6 h-6 text-brand-300" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900">Change Password</h3>
                                            <p className="text-sm text-slate-500">Enter your current and new password</p>
                                        </div>
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600"
                                        >
                                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                            <span className="text-sm">{error}</span>
                                        </motion.div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPasswords ? 'text' : 'password'}
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-200"
                                                    required
                                                    placeholder="Enter current password"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                                            <input
                                                type={showPasswords ? 'text' : 'password'}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-200"
                                                required
                                                placeholder="Enter new password"
                                            />
                                            {newPassword && (
                                                <div className="mt-2">
                                                    <div className="flex gap-1 mb-1">
                                                        {[...Array(6)].map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className={`h-1.5 flex-1 rounded-full transition-colors ${i < passwordStrength
                                                                        ? strengthColors[passwordStrength - 1]
                                                                        : 'bg-slate-200'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="text-xs text-slate-500">
                                                        Strength: <span className="font-medium">{strengthLabels[Math.max(0, passwordStrength - 1)]}</span>
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPasswords ? 'text' : 'password'}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-200 ${confirmPassword && confirmPassword !== newPassword
                                                            ? 'border-red-300'
                                                            : confirmPassword && confirmPassword === newPassword
                                                                ? 'border-green-300'
                                                                : 'border-slate-200'
                                                        }`}
                                                    required
                                                    placeholder="Confirm new password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPasswords(!showPasswords)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                                >
                                                    {showPasswords ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                            {confirmPassword && confirmPassword !== newPassword && (
                                                <p className="text-xs text-red-500 mt-1">Passwords don't match</p>
                                            )}
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
                                                disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
                                                className="flex-1 py-3 px-4 bg-brand-200 text-white rounded-xl font-medium shadow-lg shadow-brand-200/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isLoading ? 'Updating...' : 'Update Password'}
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
