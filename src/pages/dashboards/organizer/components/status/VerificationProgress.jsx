import { motion } from 'framer-motion';
import { Check, Clock, Circle } from 'lucide-react';

/**
 * VerificationProgress - Step-by-step verification progress indicator
 * @param {Object} props
 * @param {Object} props.user - User object
 * @param {boolean} props.canCreate - Whether user can create events
 */
export default function VerificationProgress({ user, canCreate }) {
    const steps = [
        {
            id: 1,
            label: 'Account Created',
            description: 'Sign up completed',
            completed: true
        },
        {
            id: 2,
            label: 'Email Verified',
            description: 'Email confirmation received',
            completed: user?.emailVerified !== false
        },
        {
            id: 3,
            label: 'Platform Verified',
            description: 'Credentials reviewed',
            completed: user?.status !== 'PENDING_PLATFORM_VERIFICATION'
        },
        {
            id: 4,
            label: 'Admin Approved',
            description: 'College admin approval',
            completed: user?.isAdminApproved
        },
        {
            id: 5,
            label: 'Ready to Create',
            description: 'Start organizing events',
            completed: canCreate
        }
    ];

    const currentStep = steps.findIndex(step => !step.completed);
    const progressPercent = currentStep === -1 ? 100 : (currentStep / steps.length) * 100;

    return (
        <motion.div
            className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h3 className="font-bold text-lg text-slate-900 mb-6">Verification Progress</h3>

            {/* Progress bar */}
            <div className="relative mb-8">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-brand-100 to-brand-200 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    />
                </div>
                <p className="text-right text-sm text-slate-500 mt-2">
                    {Math.round(progressPercent)}% Complete
                </p>
            </div>

            {/* Steps */}
            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-8 bottom-4 w-0.5 bg-slate-200" />

                <div className="space-y-6">
                    {steps.map((step, index) => {
                        const isActive = index === currentStep;
                        const isPending = index > currentStep && currentStep !== -1;

                        return (
                            <motion.div
                                key={step.id}
                                className="relative flex items-start gap-4"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {/* Step indicator */}
                                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${step.completed
                                        ? 'bg-emerald-500 text-white'
                                        : isActive
                                            ? 'bg-brand-200 text-white'
                                            : 'bg-slate-200 text-slate-400'
                                    }`}>
                                    {step.completed ? (
                                        <Check className="w-4 h-4" />
                                    ) : isActive ? (
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <Clock className="w-4 h-4" />
                                        </motion.div>
                                    ) : (
                                        <Circle className="w-4 h-4" />
                                    )}
                                </div>

                                {/* Step content */}
                                <div className={`flex-1 pb-2 ${isPending ? 'opacity-50' : ''}`}>
                                    <p className={`font-semibold ${step.completed
                                            ? 'text-emerald-700'
                                            : isActive
                                                ? 'text-brand-200'
                                                : 'text-slate-600'
                                        }`}>
                                        {step.label}
                                    </p>
                                    <p className="text-sm text-slate-400">{step.description}</p>
                                </div>

                                {/* Status badge */}
                                {step.completed && (
                                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                        Done
                                    </span>
                                )}
                                {isActive && (
                                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                                        In Progress
                                    </span>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
