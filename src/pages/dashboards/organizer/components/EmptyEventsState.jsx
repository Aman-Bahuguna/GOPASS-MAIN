import { motion } from 'framer-motion';
import { Calendar, PlusCircle } from 'lucide-react';

// Empty Events State
function EmptyEventsState() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#f7f8fa] rounded-3xl border border-slate-200 p-10 text-center"
        >
            <motion.div
                className="w-20 h-20 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-5"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                <Calendar className="w-10 h-10 text-brand-200" />
            </motion.div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No Events Yet</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-6">
                Start by creating your first event and reach out to students! Your journey as an organizer begins here.
            </p>
            <motion.button
                className="px-8 py-4 bg-brand-100 text-white rounded-xl font-bold flex items-center gap-3 mx-auto shadow-lg shadow-brand-200/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
            >
                <PlusCircle className="w-6 h-6" />
                Create Your First Event
            </motion.button>
        </motion.div>
    );
}

export default EmptyEventsState;
