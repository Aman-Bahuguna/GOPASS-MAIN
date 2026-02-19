import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    CheckCircle2,
    Clock,
    MapPin,
    ArrowRight,
    Sparkles,
    Users,
    Heart
} from 'lucide-react';

// Event Card Component
function EventCard({ event, index, onRegister, isRegistered }) {
    const [isLiked, setIsLiked] = useState(false);
    const spotsLeft = event.capacity - event.registeredCount;
    const isAlmostFull = spotsLeft < 20;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index, duration: 0.4 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group"
        >
            {/* Event Image */}
            <div className="h-44 bg-gradient-to-br from-brand-100 via-brand-200 to-brand-300 relative overflow-hidden">
                {/* Event icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                        <Calendar className="w-8 h-8 text-white" />
                    </motion.div>
                </div>

                {/* Price badge */}
                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-2 rounded-full text-xs font-bold shadow-lg whitespace-nowrap ${event.fee === 0
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-slate-900'
                        }`}>
                        {event.fee === 0 ? 'FREE' : `₹${event.fee}`}
                    </span>
                </div>

                {/* Category & Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-700">
                        {event.category}
                    </span>
                </div>

                {/* Like button */}
                <motion.button
                    onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                </motion.button>

                {/* Almost full badge */}
                {isAlmostFull && !isRegistered && (
                    <div className="absolute bottom-4 left-4">
                        <motion.span
                            className="px-3 py-1.5 bg-red-500 text-white rounded-full text-xs font-bold flex items-center gap-1"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <Sparkles className="w-3 h-3" />
                            Only {spotsLeft} spots left!
                        </motion.span>
                    </div>
                )}
            </div>

            {/* Event Details */}
            <div className="p-5">
                <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-1 group-hover:text-brand-200 transition-colors">
                    {event.title}
                </h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                    {event.shortDescription}
                </p>

                <div className="space-y-2.5 mb-4">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-brand-200" />
                        </div>
                        <div>
                            <p className="font-medium">{new Date(event.date).toLocaleDateString('en-IN', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
                            })}</p>
                            <p className="text-xs text-slate-400">{new Date(event.date).toLocaleTimeString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-brand-200" />
                        </div>
                        <span className="truncate">{event.venue}</span>
                    </div>
                </div>

                {/* Capacity progress */}
                <div className="mb-5">
                    <div className="flex justify-between text-xs text-slate-500 mb-2">
                        <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {event.registeredCount} registered
                        </span>
                        <span className={isAlmostFull ? 'text-red-500 font-medium' : ''}>
                            {spotsLeft} spots left
                        </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full rounded-full ${isAlmostFull
                                ? 'bg-gradient-to-r from-red-400 to-red-500'
                                : 'bg-gradient-to-r from-brand-200 to-brand-300'
                                }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${(event.registeredCount / event.capacity) * 100}%` }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                        />
                    </div>
                </div>

                {/* Action Button */}
                <motion.button
                    onClick={() => onRegister(event)}
                    disabled={isRegistered}
                    className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${isRegistered
                        ? 'bg-emerald-100 text-emerald-700 cursor-default'
                        : 'bg-gradient-to-r from-brand-100 to-brand-200 text-white hover:shadow-lg hover:shadow-brand-200/30 hover:scale-[1.02]'
                        }`}
                    whileHover={!isRegistered ? { scale: 1.02 } : {}}
                    whileTap={!isRegistered ? { scale: 0.98 } : {}}
                >
                    {isRegistered ? (
                        <>
                            <CheckCircle2 className="w-5 h-5" />
                            Already Registered
                        </>
                    ) : (
                        <>
                            Register Now
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
}

export default EventCard;
