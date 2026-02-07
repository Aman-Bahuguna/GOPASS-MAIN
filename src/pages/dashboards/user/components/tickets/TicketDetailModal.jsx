import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Ticket,
    Calendar,
    Clock,
    MapPin,
    User,
    Mail,
    Download,
    CalendarPlus,
    Share2,
    CheckCircle,
    Copy,
    Check
} from 'lucide-react';

/**
 * Modal for viewing ticket details with QR code
 */
function TicketDetailModal({
    registration,
    onClose,
    className = ''
}) {
    const [copied, setCopied] = useState(false);
    const { event, ticketNumber, amount, user: ticketUser } = registration || {};

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const handleCopyTicket = () => {
        navigator.clipboard.writeText(ticketNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        // TODO: Implement PDF download
        console.log('Download ticket:', ticketNumber);
    };

    const handleAddToCalendar = () => {
        // Create calendar event
        if (event) {
            const eventDate = new Date(event.date);
            const endDate = event.endDate ? new Date(event.endDate) : new Date(eventDate.getTime() + 2 * 60 * 60 * 1000);

            const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${eventDate.toISOString().replace(/-|:|\.\d+/g, '')}/${endDate.toISOString().replace(/-|:|\.\d+/g, '')}&details=${encodeURIComponent(event.shortDescription || '')}&location=${encodeURIComponent(event.venue || '')}`;

            window.open(calendarUrl, '_blank');
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `My Ticket for ${event?.title}`,
                    text: `I'm attending ${event?.title}! Ticket: ${ticketNumber}`,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        }
    };

    if (!registration) return null;

    const isPast = event && new Date(event.endDate) < new Date();

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className={`bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto ${className}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="relative bg-gradient-to-br from-brand-100 via-brand-200 to-brand-300 p-6 rounded-t-3xl">
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Ticket Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                            <Ticket className="w-8 h-8 text-white" />
                        </div>

                        <h2 className="text-xl font-bold text-white mb-1">
                            {event?.title}
                        </h2>
                        <p className="text-white/80 text-sm">
                            {event?.category}
                        </p>

                        {/* Status Badge */}
                        {isPast ? (
                            <span className="inline-flex items-center gap-1 mt-3 px-3 py-1 bg-white/20 rounded-full text-white text-xs font-medium">
                                <CheckCircle className="w-3.5 h-3.5" />
                                Event Completed
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 mt-3 px-3 py-1 bg-emerald-400/30 rounded-full text-white text-xs font-medium">
                                <CheckCircle className="w-3.5 h-3.5" />
                                Valid Ticket
                            </span>
                        )}
                    </div>

                    {/* QR Code Section */}
                    <div className="p-6 border-b border-slate-100">
                        <div className="text-center">
                            <div className="w-48 h-48 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
                                {/* QR Code Placeholder - In real app, use qrcode.react */}
                                <div className="w-36 h-36 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMSAyMSI+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTAgMGg3djdIMHptMiAydjNoM1Yyem0xIDFoMXYxSDN6bTUtM2g3djdIOHptMiAydjNoM1Yyem0xIDFoMXYxaC0xem01IDJ2MWgxVjVoLTFWNGgtMXYtMWgxdi0xaDFWMWgxdjNoMVYxaC0xVjBoLTJ2MWgtMVYwSDl2MWgydjFoLTF2MWgxdjFoMXYxaC0xdjFoMXYtMWgxVjR6bS0zIDBoMVY0aC0xem0xIDFoMVY1aC0xem0yIDFoMVY2aC0xem0wIDJoMVY4aC0xek0wIDE0aDd2N0gwem0yIDJ2M2gzdi0zem0xIDFoMXYxSDN6bTExLTNoMXYxaC0xem0xIDFoMXYxaC0xem0xIDFoMVYxNGgxdjJoMXYxaC0xdjFoLTF2LTFoLTF2MWgtMXYtMWgxdi0xem0tMiAzaDF2LTFoLTF6bTIgMHYxaDF2LTF6bTIgMHYxaDFWMTZoLTF2LTFoMXYtMWgtMXYxaC0xem0tMiAzdi0xaC0xdi0xaC0xdjFoLTF2MWgxdjFoMXYtMWgxem0yIDBoMXYtMWgtMXptLTMtMTRoMXYxaC0xem0yIDBoMXYxaC0xem0xIDFoMVY4aC0xem0tNCAxaDF2MWgtMXptMiAwaDJ2MWgtMnptMCAxdjFoMXYtMXptMSAxaDF2MWgtMXptMSAxaDF2LTFoLTF6bTEgMGgxdi0xaC0xem0xLTFoMVY5aC0xem0tNSAxaDF2MWgtMXptMCAxdjFoMXYxaC0xdi0xaC0xdi0xem0tMSAydi0xaC0xdjFoLTF2MWgxdi0xem0xIDFoMXYxaC0xem0wIDJoMXYtMWgtMXptLTEgMHYxaDF2LTF6bS0zLTFoMXYtMWgtMXptLTEgMHYxaDF2LTF6TTggMTBoMXYxSDh6bTEgMWgxdjFIOXptMCAxdi0xSDh2MWgtMXYxaDF2LTF6bTEgMnYxaDF2LTFoMXYtMWgtMXYxem0yIDFoMXYtMWgtMXptLTMtMUg4djFIMXYxaDd2LTFoMXYtMXptMSAydjFoMXYtMXptMyAwdjFoMXYtMXptLTgtNGgxdjFIMXoiLz48L3N2Zz4=')] bg-no-repeat bg-center bg-contain" />

                                {/* Decorative corners */}
                                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-brand-200 rounded-tl" />
                                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-brand-200 rounded-tr" />
                                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-brand-200 rounded-bl" />
                                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-brand-200 rounded-br" />
                            </div>

                            {/* Ticket Number */}
                            <div className="flex items-center justify-center gap-2">
                                <span className="font-mono text-lg text-slate-700 bg-slate-100 px-4 py-2 rounded-xl">
                                    #{ticketNumber}
                                </span>
                                <motion.button
                                    onClick={handleCopyTicket}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {copied ? (
                                        <Check className="w-5 h-5 text-emerald-500" />
                                    ) : (
                                        <Copy className="w-5 h-5 text-slate-400" />
                                    )}
                                </motion.button>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">
                                Present this QR code at the venue for check-in
                            </p>
                        </div>
                    </div>

                    {/* Event Details */}
                    <div className="p-6 space-y-4">
                        <h3 className="font-semibold text-slate-900">Event Details</h3>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center">
                                    <Calendar className="w-4 h-4 text-brand-200" />
                                </div>
                                <div>
                                    <p className="font-medium">
                                        {event && new Date(event.date).toLocaleDateString('en-IN', {
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-brand-200" />
                                </div>
                                <div>
                                    <p className="font-medium">
                                        {event && new Date(event.date).toLocaleTimeString('en-IN', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-brand-200" />
                                </div>
                                <div>
                                    <p className="font-medium">{event?.venue}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Info */}
                        {amount !== undefined && (
                            <div className="mt-4 p-4 bg-slate-50 rounded-xl">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">Ticket Price</span>
                                    <span className="font-bold text-slate-900">
                                        {amount === 0 ? 'FREE' : `₹${amount}`}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 pt-0 space-y-3">
                        <div className="grid grid-cols-3 gap-3">
                            <motion.button
                                onClick={handleDownload}
                                className="flex flex-col items-center gap-1 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Download className="w-5 h-5 text-slate-600" />
                                <span className="text-xs text-slate-600">Download</span>
                            </motion.button>

                            <motion.button
                                onClick={handleAddToCalendar}
                                className="flex flex-col items-center gap-1 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <CalendarPlus className="w-5 h-5 text-slate-600" />
                                <span className="text-xs text-slate-600">Calendar</span>
                            </motion.button>

                            <motion.button
                                onClick={handleShare}
                                className="flex flex-col items-center gap-1 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Share2 className="w-5 h-5 text-slate-600" />
                                <span className="text-xs text-slate-600">Share</span>
                            </motion.button>
                        </div>

                        <motion.button
                            onClick={onClose}
                            className="w-full py-3.5 bg-gradient-to-r from-brand-100 to-brand-200 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-brand-200/30 transition-shadow"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            Done
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default TicketDetailModal;
