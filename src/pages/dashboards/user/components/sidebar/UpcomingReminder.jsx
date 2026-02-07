import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Navigation, CalendarPlus } from 'lucide-react';

/**
 * Widget showing countdown to user's next upcoming event
 */
function UpcomingReminder({
    registration,
    onViewTicket,
    onGetDirections,
    onAddToCalendar,
    className = ''
}) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
        if (!registration?.event?.date) return;

        const calculateTimeLeft = () => {
            const eventDate = new Date(registration.event.date);
            const now = new Date();
            const diff = eventDate - now;

            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0 });
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            setTimeLeft({ days, hours, minutes });
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

        return () => clearInterval(timer);
    }, [registration]);

    if (!registration?.event) return null;

    const { event } = registration;
    const isPast = new Date(event.endDate || event.date) < new Date();

    if (isPast) return null;

    const handleGetDirections = () => {
        if (event.venue) {
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue)}`;
            window.open(mapsUrl, '_blank');
        }
        onGetDirections?.();
    };

    const handleAddToCalendar = () => {
        const eventDate = new Date(event.date);
        const endDate = event.endDate ? new Date(event.endDate) : new Date(eventDate.getTime() + 2 * 60 * 60 * 1000);

        const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${eventDate.toISOString().replace(/-|:|\.\d+/g, '')}/${endDate.toISOString().replace(/-|:|\.\d+/g, '')}&details=${encodeURIComponent(event.shortDescription || '')}&location=${encodeURIComponent(event.venue || '')}`;

        window.open(calendarUrl, '_blank');
        onAddToCalendar?.();
    };

    return (
        <motion.div
            className={`bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 ${className}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
        >
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                    <h4 className="font-semibold text-blue-900 text-sm">Next Event</h4>
                    <p className="text-xs text-blue-600">Coming up soon!</p>
                </div>
            </div>

            {/* Event Info */}
            <div
                className="bg-white rounded-xl p-3 mb-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onViewTicket?.(registration)}
            >
                <h5 className="font-medium text-slate-900 text-sm mb-1 line-clamp-1">
                    {event.title}
                </h5>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(event.date).toLocaleDateString('en-IN', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                    })}
                </div>
            </div>

            {/* Countdown */}
            <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 bg-white rounded-xl">
                    <motion.span
                        className="block text-2xl font-bold text-blue-600"
                        key={timeLeft.days}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                    >
                        {timeLeft.days}
                    </motion.span>
                    <span className="text-xs text-slate-500">Days</span>
                </div>
                <div className="text-center p-2 bg-white rounded-xl">
                    <motion.span
                        className="block text-2xl font-bold text-blue-600"
                        key={timeLeft.hours}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                    >
                        {timeLeft.hours}
                    </motion.span>
                    <span className="text-xs text-slate-500">Hours</span>
                </div>
                <div className="text-center p-2 bg-white rounded-xl">
                    <motion.span
                        className="block text-2xl font-bold text-blue-600"
                        key={timeLeft.minutes}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                    >
                        {timeLeft.minutes}
                    </motion.span>
                    <span className="text-xs text-slate-500">Mins</span>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
                <motion.button
                    onClick={handleGetDirections}
                    className="flex items-center justify-center gap-1.5 py-2 bg-white hover:bg-blue-50 text-blue-700 rounded-xl text-xs font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Navigation className="w-3.5 h-3.5" />
                    Directions
                </motion.button>
                <motion.button
                    onClick={handleAddToCalendar}
                    className="flex items-center justify-center gap-1.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    Calendar
                </motion.button>
            </div>
        </motion.div>
    );
}

export default UpcomingReminder;
