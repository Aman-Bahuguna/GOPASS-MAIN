import { motion } from 'framer-motion';
import {
    Clock,
    AlertCircle,
    Unlock,
    PlusCircle,
    Sparkles,
    Award,
    Mail,
    HelpCircle,
    X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllUsers } from '../../../../../api';
import { USER_STATUS } from '../../../../../utils/constants';
import { canOrganizerCreateEvents, isSameCollege } from '../../../../../utils/roleConfig';

/**
 * ApprovalStatusBanner - Premium status banner showing verification state
 * @param {Object} props
 * @param {Object} props.user - User object
 * @param {Function} [props.onCreateEvent] - Create event handler
 * @param {Function} [props.onContactSupport] - Contact support handler
 */
function ApprovalStatusBanner({ user, onCreateEvent, onContactSupport }) {
    const canCreate = canOrganizerCreateEvents(user);

    const [isDismissed, setIsDismissed] = useState(false);
    const [collegeAdmin, setCollegeAdmin] = useState(null);

    useEffect(() => {
        const dismissed = sessionStorage.getItem(`gopass_banner_dismissed_${user?.email}`);
        if (dismissed) setIsDismissed(true);
    }, [user?.email]);

    const handleDismiss = () => {
        setIsDismissed(true);
        sessionStorage.setItem(`gopass_banner_dismissed_${user?.email}`, 'true');
    };

    useEffect(() => {
        if (user?.status === USER_STATUS.PENDING_ADMIN_APPROVAL) {
            const fetchAdmin = async () => {
                try {
                    const allUsers = await getAllUsers();
                    const admin = allUsers.find(u => u.role === 'ADMIN' && isSameCollege(u, user));
                    setCollegeAdmin(admin);
                } catch (e) {
                    console.error('Failed to fetch admin info', e);
                }
            };
            fetchAdmin();
        }
    }, [user]);

    // Don't show if already dismissed in this session
    if (isDismissed) return null;

    if (user?.status === USER_STATUS.PENDING_PLATFORM_VERIFICATION) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                className="relative overflow-hidden bg-blue-600 rounded-3xl p-8 text-white mb-8"
            >
                {/* Dismiss button */}
                <button 
                   onClick={handleDismiss}
                   className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Animated background patterns */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-0 right-0 w-80 h-80 bg-[#f7f8fa]/10 rounded-full blur-3xl"
                        animate={{
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 w-48 h-48 bg-[#f7f8fa]/10 rounded-full blur-2xl"
                        animate={{
                            x: [0, -20, 0],
                            y: [0, 20, 0],
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>

                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-start gap-5">
                        <motion.div
                            className="w-16 h-16 rounded-2xl bg-[#f7f8fa]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-lg"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Clock className="w-8 h-8" />
                        </motion.div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-5 h-5 text-yellow-300" />
                                <span className="text-sm font-medium text-white/80">Verification In Progress</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Platform Verification In Progress</h3>
                            <p className="text-white/80 mb-4 max-w-lg">
                                Our team is reviewing your college credentials. This usually takes 24-48 hours. We'll notify you once verified!
                            </p>
                            <div className="flex items-center gap-3 bg-[#f7f8fa]/10 rounded-xl px-4 py-3 w-fit backdrop-blur-sm">
                                <motion.div
                                    className="w-2.5 h-2.5 bg-yellow-400 rounded-full"
                                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <span className="text-sm font-semibold">Under Review</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact support button */}
                    {onContactSupport && (
                        <motion.button
                            onClick={onContactSupport}
                            className="flex items-center gap-2 px-6 py-3 bg-[#f7f8fa]/20 hover:bg-[#f7f8fa]/30 rounded-xl font-medium transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <HelpCircle className="w-5 h-5" />
                            Contact Support
                        </motion.button>
                    )}
                </div>
            </motion.div>
        );
    }

    if (user?.status === USER_STATUS.PENDING_ADMIN_APPROVAL) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                className="relative overflow-hidden bg-amber-500 rounded-3xl p-8 text-white mb-8"
            >
                {/* Animated background patterns */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-0 right-0 w-80 h-80 bg-[#f7f8fa]/10 rounded-full blur-3xl"
                        animate={{
                            x: [0, 40, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>

                <div className="relative flex flex-col lg:flex-row items-start gap-5">
                    <motion.div
                        className="w-16 h-16 rounded-2xl bg-[#f7f8fa]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-lg"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <AlertCircle className="w-8 h-8" />
                    </motion.div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-yellow-300" />
                            <span className="text-sm font-medium text-white/80">Almost There!</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Awaiting Admin Approval</h3>
                        <p className="text-white/80 mb-5 max-w-lg">
                            Your account has been verified by our platform. Now waiting for approval from your college admin to start creating events.
                        </p>
                        {collegeAdmin && (
                            <motion.div
                                className="bg-[#f7f8fa]/15 backdrop-blur-sm rounded-2xl p-5 border border-white/10"
                                whileHover={{ scale: 1.02 }}
                            >
                                <p className="text-sm font-medium text-white/70 mb-3">Your College Admin:</p>
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#f7f8fa]/20 flex items-center justify-center text-lg font-bold">
                                            {collegeAdmin.fullName?.charAt(0) || 'A'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">{collegeAdmin.fullName}</p>
                                            <p className="text-sm text-white/80">{collegeAdmin.position} • {collegeAdmin.college?.name}</p>
                                        </div>
                                    </div>
                                    <motion.button
                                        className="flex items-center gap-2 px-4 py-2 bg-[#f7f8fa]/20 hover:bg-[#f7f8fa]/30 rounded-lg text-sm font-medium transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Mail className="w-4 h-4" />
                                        Contact
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    }

    if (canCreate) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                className="relative overflow-hidden bg-emerald-600 rounded-3xl p-8 text-white mb-8"
            >
                {/* Dismiss button */}
                <button 
                   onClick={handleDismiss}
                   className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Confetti-like decorations */}
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
                </div>

                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-start gap-5">
                        <motion.div
                            className="w-20 h-20 rounded-2xl bg-[#f7f8fa]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-lg"
                            whileHover={{ scale: 1.05, rotate: 5 }}
                        >
                            <Unlock className="w-10 h-10" />
                        </motion.div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Sparkles className="w-5 h-5 text-yellow-300" />
                                </motion.div>
                                <span className="text-sm font-medium text-white/80">You're All Set!</span>
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-bold mb-2">Account Approved! 🎉</h3>
                            <p className="text-white/80 max-w-lg">
                                Congratulations! You can now create and manage events. Start organizing amazing college events!
                            </p>
                        </div>
                    </div>
                    <motion.button
                        onClick={onCreateEvent}
                        className="px-8 py-4 bg-[#f7f8fa] text-emerald-600 rounded-xl font-bold flex items-center gap-3 shadow-xl shadow-black/10"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <PlusCircle className="w-6 h-6" />
                        Create Your First Event
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    return null;
}

export default ApprovalStatusBanner;
