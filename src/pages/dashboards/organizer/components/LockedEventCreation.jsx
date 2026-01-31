import { motion } from 'framer-motion';
import { Lock, Clock } from 'lucide-react';

// Premium Locked Event Creation Card
function LockedEventCreation() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-300 rounded-3xl p-10 text-center"
        >
            <motion.div
                className="w-20 h-20 rounded-2xl bg-slate-200 flex items-center justify-center mx-auto mb-5"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                <Lock className="w-10 h-10 text-slate-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-slate-700 mb-3">Event Creation Locked</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">
                You cannot create events until your account is approved by your college admin.
                Please wait for approval.
            </p>
            <div className="flex items-center justify-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-xl w-fit mx-auto">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Approval Pending</span>
            </div>
        </motion.div>
    );
}

export default LockedEventCreation;
