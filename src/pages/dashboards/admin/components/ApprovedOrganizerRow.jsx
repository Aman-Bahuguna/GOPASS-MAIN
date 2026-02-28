import { motion } from 'framer-motion';
import { CheckCircle2, ExternalLink } from 'lucide-react';

// Approved Organizer Row with enhanced design
function ApprovedOrganizerRow({ organizer, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            whileHover={{ backgroundColor: 'rgba(248, 250, 252, 1)' }}
            className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all group"
        >
            <motion.div
                className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md shadow-emerald-200/50"
                whileHover={{ scale: 1.05, rotate: 5 }}
            >
                {organizer.fullName.charAt(0).toUpperCase()}
            </motion.div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 truncate">{organizer.fullName}</p>
                <p className="text-sm text-slate-500 capitalize">{organizer.position?.toLowerCase()}</p>
            </div>
            <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approved
                </span>
                <motion.button
                    className="p-2 hover:bg-slate-200 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    whileHover={{ scale: 1.1 }}
                >
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                </motion.button>
            </div>
        </motion.div>
    );
}

export default ApprovedOrganizerRow;
