import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

// Empty State Component
function EmptyPendingState() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center"
        >
            <motion.div
                className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-200/50"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-emerald-800 mb-2">All Caught Up!</h3>
            <p className="text-emerald-600 max-w-sm mx-auto">
                You've reviewed all organizer requests. Check back later for new applications.
            </p>
        </motion.div>
    );
}

export default EmptyPendingState;
