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
    Check,
    Info,
    Smartphone,
    ShieldCheck,
    ShieldAlert,
    ArrowRight
} from 'lucide-react';

/**
 * Ultimate Premium Ticket Modal
 * - Dynamic QR Code generation
 * - Auto-disables if event passed
 * - Unique entry token display
 * - Robust data mapping
 */
function TicketDetailModal({
    registration,
    onClose,
    className = ''
}) {
    const [copied, setCopied] = useState(false);
    
    // 1. Robust Data Extraction (Nested vs Flat)
    const event = registration?.event || {};
    const eventObj = (registration?.event && Object.keys(registration.event).length > 0) ? registration.event : registration;

    const ticketNumber = registration?.ticketNumber || registration?.id || 'TBD';
    const amount = registration?.amount || registration?.fee || 0;
    
    // 2. Field Fallbacks for all possible backend field names
    const eventTitle = 
        eventObj?.eventName || 
        eventObj?.title || 
        eventObj?.name || 
        eventObj?.event_name || 
        registration?.eventName || 
        registration?.title ||
        'Event Ticket';

    const eventDateStr = 
        eventObj?.startDate || 
        eventObj?.date || 
        eventObj?.eventDate || 
        registration?.startDate || 
        registration?.date;

    const eventVenue = 
        eventObj?.venue || 
        eventObj?.location || 
        eventObj?.venueName || 
        registration?.venue || 
        'Venue TBD';

    const eventCategory = 
        eventObj?.category || 
        eventObj?.eventCategory || 
        registration?.category || 
        'General Admission';

    const eventEndDate = eventObj?.endDate || registration?.endDate || eventDateStr;

    // 3. Status logic
    const isPast = eventEndDate && new Date(eventEndDate) < new Date();

    // 4. Dynamic Token Generation (for entry verification)
    // We use a prefix + first 7 characters of the ID/Ticket # for a "Verification Token"
    const entryToken = `GOPASS-${(ticketNumber || 'VOID').toString().replace(/[^a-zA-Z0-9]/g, '').slice(-6).toUpperCase()}`;

    // 5. QR Code URL (Auto-disables if event is past)
    const qrUrl = isPast ? null : `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(ticketNumber)}&bgcolor=ffffff&color=000000`;

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const handleCopyToken = () => {
        navigator.clipboard.writeText(ticketNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!registration) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl"
                onClick={onClose}
            >
                <style>
                    {`
                    .ticket-shape {
                        clip-path: polygon(0% 0%, 100% 0%, 100% 30%, 98% 33%, 98% 37%, 100% 40%, 100% 100%, 0% 100%, 0% 40%, 2% 37%, 2% 33%, 0% 30%);
                    }
                    .perforated-line {
                        background-image: linear-gradient(to right, #e2e8f0 50%, transparent 50%);
                        background-size: 15px 2px;
                        background-repeat: repeat-x;
                    }
                    `}
                </style>

                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className={`bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] max-w-sm w-full relative overflow-hidden flex flex-col ${className}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header: Branding & Category */}
                    <div className="bg-brand-200 h-32 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-200 via-[#00B4D8] to-[#0077B6] opacity-90" />
                        <div className="relative z-10 text-center px-6">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20 mb-3">
                                <Ticket className="w-3 h-3" />
                                Official Event Pass
                            </div>
                            <h2 className="text-xl font-black text-white line-clamp-1">
                                {eventTitle}
                            </h2>
                        </div>

                        {/* Top Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Ticket "Stubs" & Perforated Divider */}
                    <div className="relative h-6 bg-white">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-r border-slate-700/20" />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-l border-slate-700/20" />
                    </div>

                    {/* Body: Authentication Code & QR */}
                    <div className="px-10 pb-10 pt-4 text-center">
                        {isPast ? (
                            <div className="py-12 flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                                    <ShieldAlert className="w-12 h-12 text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 mb-2">PASS EXPIRED</h3>
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Event finished on {new Date(eventEndDate).toLocaleDateString()}</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-2 text-brand-200">
                                        <Smartphone className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">PRESENT QR CODE FOR ENTRY</span>
                                    </div>
                                    
                                    {/* Verification Token Centerpiece */}
                                    <div className="text-center">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Entry Authorization Code</p>
                                        <h4 className="text-2xl font-black text-slate-900 tracking-widest">{entryToken}</h4>
                                    </div>
                                </div>

                                {/* QR Code Container with Padding to prevent clipping */}
                                <div className="p-4 bg-slate-50 rounded-[2rem] border-2 border-slate-100 shadow-inner group">
                                    <div className="relative w-52 h-52 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-[1.02]">
                                        <img 
                                            src={qrUrl} 
                                            alt="Admission QR" 
                                            className="w-44 h-44 opacity-90 transition-opacity group-hover:opacity-100" 
                                        />
                                        
                                        {/* Corner Accents */}
                                        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-brand-200 rounded-tl-xl opacity-40" />
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-brand-200 rounded-br-xl opacity-40" />
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-3">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        Secured Registration
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest"># {ticketNumber}</span>
                                        <motion.button 
                                            onClick={handleCopyToken}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-1 text-slate-300 hover:text-brand-200"
                                        >
                                            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Perforated Divider */}
                        <div className="perforated-line h-[2px] w-full my-8 opacity-50" />

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8 text-left">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pass Category</p>
                                <p className="text-sm font-black text-slate-900">{eventCategory}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry Fee</p>
                                <p className="text-sm font-black text-brand-200">{amount === 0 ? 'FREE ADMISSION' : `₹${amount}`}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Event Date</p>
                                <div className="flex items-center gap-1.5 text-slate-900">
                                    <Calendar className="w-3.5 h-3.5 text-brand-200" />
                                    <span className="text-xs font-black">
                                        {eventDateStr ? new Date(eventDateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'TBD'}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gate Opens</p>
                                <div className="flex items-center gap-1.5 text-slate-900">
                                    <Clock className="w-3.5 h-3.5 text-brand-200" />
                                    <span className="text-xs font-black">
                                        {eventDateStr ? new Date(eventDateStr).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '10:00 AM'}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-2 space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Venue Address</p>
                                <div className="flex items-center gap-1.5 text-slate-900">
                                    <MapPin className="w-3.5 h-3.5 text-brand-200 flex-shrink-0" />
                                    <span className="text-xs font-black line-clamp-1">{eventVenue}</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer Button: Done */}
                        <motion.button
                            onClick={onClose}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/40"
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
