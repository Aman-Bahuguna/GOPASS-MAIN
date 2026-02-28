import { motion } from 'framer-motion';
import { Lock, Clock, Mail, HelpCircle } from 'lucide-react';

/**
 * LockedEventCreation - Display when event creation is locked
 * @param {Object} props
 * @param {string} [props.reason] - Reason for being locked
 * @param {Function} [props.onContactSupport] - Contact support handler
 */
function LockedEventCreation({ reason, onContactSupport }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#f7f8fa] rounded-2xl border border-slate-200 p-8 text-center relative overflow-hidden"
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-slate-400" style={{
                    backgroundImage: 'none',
                    backgroundColor: '#64748b'
                }} />
            </div>

            <div className="relative">
                {/* Lock icon */}
                <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                    <motion.div
                        animate={{
                            rotate: [0, -5, 5, 0],
                            y: [0, -2, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <Lock className="w-10 h-10 text-slate-400" />
                    </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h3
                    className="text-xl font-bold text-slate-900 mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Event Creation Locked
                </motion.h3>

                {/* Description */}
                <motion.p
                    className="text-slate-500 max-w-sm mx-auto mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {reason || 'You need admin approval to create events. Please wait for your account to be approved.'}
                </motion.p>

                {/* Status indicator */}
                <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <Clock className="w-4 h-4" />
                    </motion.div>
                    Pending Approval
                </motion.div>

                {/* Info cards */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="p-4 bg-slate-50 rounded-xl text-left">
                        <Mail className="w-5 h-5 text-slate-400 mb-2" />
                        <p className="text-sm font-medium text-slate-700">Check your email</p>
                        <p className="text-xs text-slate-500">We'll notify you when approved</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl text-left">
                        <Clock className="w-5 h-5 text-slate-400 mb-2" />
                        <p className="text-sm font-medium text-slate-700">Usually 24-48 hours</p>
                        <p className="text-xs text-slate-500">Typical approval time</p>
                    </div>
                </motion.div>

                {/* Contact support */}
                {onContactSupport && (
                    <motion.button
                        onClick={onContactSupport}
                        className="inline-flex items-center gap-2 text-sm text-brand-200 hover:text-brand-100 font-medium transition-colors"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <HelpCircle className="w-4 h-4" />
                        Need help? Contact Support
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}

export default LockedEventCreation;
