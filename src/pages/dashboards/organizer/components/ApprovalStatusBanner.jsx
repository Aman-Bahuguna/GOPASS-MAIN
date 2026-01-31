import { motion } from 'framer-motion';
import {
    Clock,
    AlertCircle,
    Unlock,
    PlusCircle,
    Sparkles,
    Award
} from 'lucide-react';
import { mockAdmins } from '../../../../data/mockData';
import { USER_STATUS } from '../../../../utils/constants';
import { canOrganizerCreateEvents, isSameCollege } from '../../../../utils/roleConfig';

// Premium Approval Status Banner
function ApprovalStatusBanner({ user }) {
    const canCreate = canOrganizerCreateEvents(user);

    // Find the admin from the same college
    const collegeAdmin = mockAdmins.find(admin =>
        isSameCollege(admin, user)
    );

    if (user.status === USER_STATUS.PENDING_PLATFORM_VERIFICATION) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 rounded-3xl p-8 text-white mb-8"
            >
                {/* Animated background patterns */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"
                        animate={{
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"
                        animate={{
                            x: [0, -20, 0],
                            y: [0, 20, 0],
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>

                <div className="relative flex items-start gap-5">
                    <motion.div
                        className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-lg"
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
                        <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 w-fit backdrop-blur-sm">
                            <motion.div
                                className="w-2.5 h-2.5 bg-yellow-400 rounded-full"
                                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <span className="text-sm font-semibold">Under Review</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    if (user.status === USER_STATUS.PENDING_ADMIN_APPROVAL) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-3xl p-8 text-white mb-8"
            >
                {/* Animated background patterns */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"
                        animate={{
                            x: [0, 40, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>

                <div className="relative flex flex-col lg:flex-row items-start gap-5">
                    <motion.div
                        className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-lg"
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
                                className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/10"
                                whileHover={{ scale: 1.02 }}
                            >
                                <p className="text-sm font-medium text-white/70 mb-2">Your College Admin:</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-lg font-bold">
                                        {collegeAdmin.fullName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">{collegeAdmin.fullName}</p>
                                        <p className="text-sm text-white/80">{collegeAdmin.position} • {collegeAdmin.college.name}</p>
                                    </div>
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
                className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 rounded-3xl p-8 text-white mb-8"
            >
                {/* Confetti-like decorations */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                        animate={{
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl"
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
                            className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-lg"
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
                        className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold flex items-center gap-3 shadow-xl shadow-black/10"
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
