import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Ticket, ArrowRight, Sparkles } from 'lucide-react';

// Format price with Indian Rupee symbol
const formatPrice = (fee) => {
    if (fee === 0) return 'Free';
    return `₹${fee.toLocaleString('en-IN')}`;
};

// Format date for display
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

// Get category color scheme
const getCategoryColors = (category) => {
    const colors = {
        Technology: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-700',
            dot: 'bg-blue-500',
            gradient: 'from-blue-500 to-indigo-600',
        },
        Cultural: {
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            text: 'text-purple-700',
            dot: 'bg-purple-500',
            gradient: 'from-purple-500 to-pink-600',
        },
        Workshop: {
            bg: 'bg-emerald-50',
            border: 'border-emerald-200',
            text: 'text-emerald-700',
            dot: 'bg-emerald-500',
            gradient: 'from-emerald-500 to-teal-600',
        },
        Sports: {
            bg: 'bg-orange-50',
            border: 'border-orange-200',
            text: 'text-orange-700',
            dot: 'bg-orange-500',
            gradient: 'from-orange-500 to-red-600',
        },
    };
    return colors[category] || colors.Technology;
};

const EventCard = ({ event, index = 0, onViewDetails }) => {
    const [isHovered, setIsHovered] = useState(false);
    const categoryColors = getCategoryColors(event.category);

    const spotsLeft = event.capacity - event.registeredCount;
    const isAlmostFull = spotsLeft <= event.capacity * 0.1;
    const isFree = event.fee === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-lg shadow-slate-900/5 hover:shadow-xl hover:shadow-slate-900/10 transition-all duration-500"
        >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors.gradient} opacity-80 z-10`} />

                {/* Pattern Overlay */}
                <div className="absolute inset-0 z-10 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id={`pattern-${event.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="1.5" fill="white" />
                            </pattern>
                        </defs>
                        <rect x="0" y="0" width="100%" height="100%" fill={`url(#pattern-${event.id})`} />
                    </svg>
                </div>

                {/* Event Title on Image */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-5">
                    <motion.h3
                        className="text-xl font-bold text-white leading-tight drop-shadow-lg"
                        animate={{ y: isHovered ? -5 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {event.title}
                    </motion.h3>
                    <p className="text-white/80 text-sm mt-1 line-clamp-1">
                        {event.shortDescription || event.description?.substring(0, 60) + '...'}
                    </p>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <div className={`px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm ${categoryColors.text} text-xs font-semibold flex items-center gap-1.5`}>
                        <div className={`w-2 h-2 rounded-full ${categoryColors.dot}`} />
                        {event.category}
                    </div>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <div className={`px-3 py-1.5 rounded-full backdrop-blur-sm text-xs font-bold ${isFree ? 'bg-emerald-500 text-white' : 'bg-white/90 text-slate-900'}`}>
                        {formatPrice(event.fee)}
                    </div>
                </div>

                {/* Animated Sparkles */}
                <motion.div
                    className="absolute top-4 right-14 z-20"
                    animate={{
                        rotate: isHovered ? 360 : 0,
                        scale: isHovered ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <Sparkles className="w-4 h-4 text-white/60" />
                </motion.div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
                {/* Date & Venue */}
                <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4 text-brand-200" />
                        <span className="text-sm font-medium">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-600">
                        <MapPin className="w-4 h-4 text-brand-200 flex-shrink-0 mt-0.5" />
                        <span className="text-sm line-clamp-1">{event.venue}</span>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 text-slate-500">
                            <Users className="w-4 h-4" />
                            <span className="text-sm font-medium">{event.registeredCount}/{event.capacity}</span>
                        </div>
                        {isAlmostFull && (
                            <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs font-semibold rounded-full">
                                Almost Full!
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                        <Ticket className="w-4 h-4" />
                        <span className="text-xs">{spotsLeft} left</span>
                    </div>
                </div>

                {/* View Details Button */}
                <motion.button
                    onClick={() => onViewDetails?.(event)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors duration-300"
                >
                    View Details
                    <motion.div
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ArrowRight className="w-4 h-4" />
                    </motion.div>
                </motion.button>
            </div>

            {/* Hover Glow Effect */}
            <motion.div
                className={`absolute -inset-0.5 bg-gradient-to-r ${categoryColors.gradient} rounded-2xl opacity-0 group-hover:opacity-20 -z-10 blur-xl transition-opacity duration-500`}
            />
        </motion.div>
    );
};

export default EventCard;
