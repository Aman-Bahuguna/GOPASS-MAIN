import { motion } from 'framer-motion';
import {
    Target,
    CheckCircle2,
    Clock,
    Lock,
    Unlock,
    Shield,
    Mail,
    AlertCircle
} from 'lucide-react';
import { USER_STATUS } from '../../../../../utils/constants';

/**
 * AccountStatus - Account verification and status display
 * @param {Object} props
 * @param {Object} props.user - User object
 * @param {boolean} props.canCreate - Whether user can create events
 * @param {number} [props.delay] - Animation delay
 */
export default function AccountStatus({ user, canCreate, delay = 0.5 }) {
    const isPlatformVerified = user?.status !== USER_STATUS.PENDING_PLATFORM_VERIFICATION;
    const isAdminApproved = user?.isAdminApproved;

    // Calculate progress percentage
    const getProgress = () => {
        let steps = 0;
        if (isPlatformVerified) steps++;
        if (isAdminApproved) steps++;
        if (canCreate) steps++;
        return Math.round((steps / 3) * 100);
    };

    const statusItems = [
        {
            label: 'Email Verified',
            icon: Mail,
            completed: isPlatformVerified,
            description: 'Your email has been confirmed'
        },
        {
            label: 'Platform Verified',
            icon: Shield,
            completed: isPlatformVerified,
            description: 'Account identity verified'
        },
        {
            label: 'Admin Approved',
            icon: CheckCircle2,
            completed: isAdminApproved,
            description: isAdminApproved ? 'Approved by admin' : 'Awaiting admin review'
        }
    ];

    return (
        <motion.div
            className="bg-[#f7f8fa] rounded-2xl border border-slate-200 p-6 shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
        >
            {/* Header */}
            <h3 className="font-bold text-lg text-slate-900 mb-5 flex items-center gap-3">
                <div className="p-2 bg-brand-100/10 rounded-lg">
                    <Target className="w-5 h-5 text-brand-200" />
                </div>
                Account Status
            </h3>

            {/* Progress bar */}
            <div className="mb-5">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-500">Verification Progress</span>
                    <span className="font-semibold text-brand-200">{getProgress()}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-brand-100 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgress()}%` }}
                        transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
                    />
                </div>
            </div>

            {/* Status items */}
            <div className="space-y-3">
                {statusItems.map((item, index) => (
                    <motion.div
                        key={item.label}
                        className={`flex items-center justify-between p-3 rounded-xl transition-colors ${item.completed ? 'bg-emerald-50' : 'bg-slate-50'
                            }`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: delay + 0.1 * index }}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-lg ${item.completed ? 'bg-emerald-100' : 'bg-slate-200'
                                }`}>
                                <item.icon className={`w-4 h-4 ${item.completed ? 'text-emerald-600' : 'text-slate-500'
                                    }`} />
                            </div>
                            <div>
                                <span className={`font-medium text-sm ${item.completed ? 'text-emerald-700' : 'text-slate-600'
                                    }`}>{item.label}</span>
                                <p className="text-xs text-slate-400">{item.description}</p>
                            </div>
                        </div>
                        {item.completed ? (
                            <div className="flex items-center gap-1.5 text-emerald-600">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 text-amber-500">
                                <Clock className="w-5 h-5" />
                            </div>
                        )}
                    </motion.div>
                ))}

                {/* Event Creation Status */}
                <motion.div
                    className={`flex items-center justify-between p-3 rounded-xl ${canCreate ? 'bg-emerald-50' : 'bg-red-50'
                        }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: delay + 0.3 }}
                >
                    <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg ${canCreate ? 'bg-emerald-100' : 'bg-red-100'
                            }`}>
                            {canCreate ? (
                                <Unlock className="w-4 h-4 text-emerald-600" />
                            ) : (
                                <Lock className="w-4 h-4 text-red-500" />
                            )}
                        </div>
                        <div>
                            <span className={`font-medium text-sm ${canCreate ? 'text-emerald-700' : 'text-red-700'
                                }`}>Event Creation</span>
                            <p className="text-xs text-slate-400">
                                {canCreate ? 'You can create events' : 'Pending approval'}
                            </p>
                        </div>
                    </div>
                    {canCreate ? (
                        <div className="flex items-center gap-1.5 text-emerald-600">
                            <Unlock className="w-5 h-5" />
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 text-red-500">
                            <Lock className="w-5 h-5" />
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Help text for pending users */}
            {!canCreate && (
                <motion.div
                    className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + 0.4 }}
                >
                    <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-amber-700">
                            Your account is pending verification. This usually takes 24-48 hours.
                            You'll receive an email once approved.
                        </p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
