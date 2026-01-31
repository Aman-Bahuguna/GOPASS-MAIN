import { motion } from 'framer-motion';
import { Calendar, Clock, Users, CheckCircle2, Activity } from 'lucide-react';

// College Event Card with enhanced design
function CollegeEventCard({ event, index }) {
    const statusConfig = {
        UPCOMING: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Calendar },
        ONGOING: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: Activity },
        COMPLETED: { bg: 'bg-slate-100', text: 'text-slate-600', icon: CheckCircle2 }
    };

    const config = statusConfig[event.status] || statusConfig.UPCOMING;
    const StatusIcon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            whileHover={{ y: -2, boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}
            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200/60 hover:border-slate-300 transition-all cursor-pointer group"
        >
            <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-brand-300 flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-200/30"
                whileHover={{ scale: 1.05, rotate: -5 }}
            >
                <Calendar className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 truncate group-hover:text-brand-200 transition-colors">{event.title}</h4>
                <p className="text-sm text-slate-500 flex items-center gap-2 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    })}
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <Users className="w-3.5 h-3.5" />
                    {event.registeredCount} registered
                </p>
            </div>
            <span className={`px-3 py-1.5 ${config.bg} ${config.text} rounded-lg text-xs font-semibold flex items-center gap-1.5`}>
                <StatusIcon className="w-3.5 h-3.5" />
                {event.status}
            </span>
        </motion.div>
    );
}

export default CollegeEventCard;
