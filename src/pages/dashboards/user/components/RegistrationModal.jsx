import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Ticket,
    CheckCircle2,
    X,
    CreditCard,
    User,
    Mail,
    Phone,
    IndianRupee,
    Loader2,
    Download,
    ArrowRight,
    QrCode
} from 'lucide-react';

// Registration Modal
function RegistrationModal({ event, onClose, onSuccess, user }) {
    const [step, setStep] = useState(1); // 1: Form, 2: Payment, 3: Success
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.fullName || '',
        email: user?.email || '',
        phone: '',
    });
    const [ticketData, setTicketData] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProceedToPayment = (e) => {
        e.preventDefault();
        if (!formData.phone) return;
        setStep(2);
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate ticket
        const ticket = {
            ticketNumber: `GP${Date.now().toString(36).toUpperCase()}`,
            eventTitle: event.title,
            eventDate: event.date,
            venue: event.venue,
            amount: event.fee,
            registeredAt: new Date().toISOString(),
        };

        setTicketData(ticket);
        setIsProcessing(false);
        setStep(3);
    };

    const handleDone = () => {
        if (onSuccess) onSuccess(ticketData);
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-brand-100 to-brand-300 p-6 text-white relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                {step === 3 ? (
                                    <CheckCircle2 className="w-8 h-8" />
                                ) : step === 2 ? (
                                    <CreditCard className="w-8 h-8" />
                                ) : (
                                    <Ticket className="w-8 h-8" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">
                                    {step === 3 ? 'Registration Complete!' : step === 2 ? 'Payment' : 'Register for Event'}
                                </h2>
                                <p className="text-white/80 text-sm mt-0.5 line-clamp-1">{event.title}</p>
                            </div>
                        </div>

                        {/* Step indicator */}
                        {step < 3 && (
                            <div className="flex gap-2 mt-6">
                                {[1, 2].map((s) => (
                                    <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-white' : 'bg-white/30'}`} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {step === 1 && (
                            <form onSubmit={handleProceedToPayment} className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-700 block mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 bg-slate-50"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700 block mb-2">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 bg-slate-50"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700 block mb-2">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Event Summary */}
                                <div className="bg-slate-50 rounded-xl p-4 mt-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600">Event</span>
                                        <span className="font-medium text-slate-900">{event.title}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <span className="text-slate-600">Date</span>
                                        <span className="font-medium text-slate-900">
                                            {new Date(event.date).toLocaleDateString('en-IN', {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm mt-2 pt-2 border-t border-slate-200">
                                        <span className="text-slate-600 font-medium">Registration Fee</span>
                                        <span className="text-lg font-bold text-brand-200">
                                            {event.fee === 0 ? 'FREE' : `₹${event.fee}`}
                                        </span>
                                    </div>
                                </div>

                                <motion.button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-brand-100 to-brand-200 text-white rounded-xl font-semibold flex items-center justify-center gap-2 mt-6"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {event.fee === 0 ? 'Complete Registration' : 'Proceed to Payment'}
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </form>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                {/* Payment Summary */}
                                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-slate-400 text-sm">Amount to Pay</span>
                                        <IndianRupee className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <p className="text-4xl font-bold">₹{event.fee}</p>
                                    <p className="text-slate-400 text-sm mt-2">For: {event.title}</p>
                                </div>

                                {/* Payment methods placeholder */}
                                <div>
                                    <p className="text-sm font-medium text-slate-700 mb-3">Payment Method</p>
                                    <div className="space-y-2">
                                        {['UPI / Google Pay', 'Credit/Debit Card', 'Net Banking'].map((method, i) => (
                                            <label key={method} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${i === 0 ? 'border-brand-200 bg-brand-50' : 'border-slate-200 hover:border-brand-100'}`}>
                                                <input type="radio" name="payment" defaultChecked={i === 0} className="w-4 h-4 text-brand-200" />
                                                <span className="font-medium text-slate-700">{method}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <motion.button
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
                                    whileHover={!isProcessing ? { scale: 1.02 } : {}}
                                    whileTap={!isProcessing ? { scale: 0.98 } : {}}
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing Payment...
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard className="w-5 h-5" />
                                            Pay ₹{event.fee}
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        )}

                        {step === 3 && ticketData && (
                            <div className="text-center">
                                {/* Success animation */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center"
                                >
                                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                                </motion.div>

                                <h3 className="text-xl font-bold text-slate-900 mb-2">You're In!</h3>
                                <p className="text-slate-500 mb-6">Your registration was successful</p>

                                {/* Ticket Card */}
                                <div className="bg-gradient-to-br from-brand-100 to-brand-300 rounded-2xl p-6 text-white text-left relative overflow-hidden">
                                    {/* Decorative circles */}
                                    <div className="absolute -left-4 top-1/2 w-8 h-8 bg-white rounded-full" />
                                    <div className="absolute -right-4 top-1/2 w-8 h-8 bg-white rounded-full" />

                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-white/80 text-xs uppercase tracking-wider">Ticket</p>
                                            <p className="font-mono font-bold text-lg">{ticketData.ticketNumber}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                            <QrCode className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <div className="border-t border-white/20 pt-4 border-dashed">
                                        <p className="font-bold text-lg">{ticketData.eventTitle}</p>
                                        <p className="text-white/80 text-sm mt-1">
                                            {new Date(ticketData.eventDate).toLocaleDateString('en-IN', {
                                                weekday: 'long',
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </p>
                                        <p className="text-white/80 text-sm">{ticketData.venue}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <motion.button
                                        className="flex-1 py-3 border border-slate-200 rounded-xl font-medium text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Download className="w-4 h-4" />
                                        Download
                                    </motion.button>
                                    <motion.button
                                        onClick={handleDone}
                                        className="flex-1 py-3 bg-gradient-to-r from-brand-100 to-brand-200 text-white rounded-xl font-semibold"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Done
                                    </motion.button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default RegistrationModal;
