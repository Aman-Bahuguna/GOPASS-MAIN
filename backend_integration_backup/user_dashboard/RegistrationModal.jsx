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
    QrCode,
    Building2,
    Calendar,
    MapPin,
    Shield,
    AlertCircle
} from 'lucide-react';
import { registerForEvent } from '@/api';

/**
 * Streamlined Registration Modal - Essential Information Only
 */
function RegistrationModal({ event, onClose, onSuccess, user }) {
    const [step, setStep] = useState(1); // 1: Form, 2: Payment, 3: Success
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [registerError, setRegisterError] = useState(null);
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phone: '',
        collegeName: '',
        year: '',
        agreeToTerms: false
    });
    const [ticketData, setTicketData] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
        if (registerError) setRegisterError(null);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Required';
        if (!formData.email.trim()) newErrors.email = 'Required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.phone.trim()) newErrors.phone = 'Required';
        if (!formData.collegeName.trim()) newErrors.collegeName = 'Required';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (event.fee === 0) {
            handleCompleteRegistration();
        } else {
            setStep(2);
        }
    };

    const handlePayment = async () => {
        handleCompleteRegistration();
    };

    const handleCompleteRegistration = async () => {
        setIsProcessing(true);
        setRegisterError(null);

        try {
            console.log('DEBUG [RegistrationModal]: Registering for event ID:', event.id);
            const response = await registerForEvent(event.id);
            console.log('DEBUG [RegistrationModal]: Registration response:', response);

            // Create ticket from response or local data
            const ticket = {
                ticketNumber: response.ticketId || response.registrationId || `GP${Date.now().toString(36).toUpperCase()}`,
                eventTitle: event.eventName || event.title,
                eventDate: event.startDate || event.date,
                venue: event.venue,
                amount: event.fee,
                registeredAt: new Date().toISOString(),
                attendeeName: formData.fullName,
                attendeeEmail: formData.email,
                college: formData.collegeName
            };

            setTicketData(ticket);
            setStep(3);
        } catch (error) {
            console.error('DEBUG [RegistrationModal]: Registration failed:', error);
            setRegisterError(error.message || 'Registration failed. Please try again.');
            // If payment was step 2, we might want to stay there or go back
        } finally {
            setIsProcessing(false);
        }
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
                                    {step === 3 ? 'Registration Complete!' : step === 2 ? 'Payment' : 'Quick Registration'}
                                </h2>
                                <p className="text-white/80 text-sm mt-0.5 line-clamp-1">{event.title}</p>
                            </div>
                        </div>

                        {step < 3 && (
                            <div className="flex gap-2 mt-6">
                                {[1, 2].slice(0, event?.fee === 0 ? 1 : 2).map((s) => (
                                    <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-white' : 'bg-white/30'}`} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            {/* Step 1: Registration Form */}
                            {step === 1 && (
                                <motion.form
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    {/* Full Name */}
                                    <div>
                                        <label className="text-sm font-medium text-slate-700 block mb-1.5">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                placeholder="Enter your full name"
                                                className={`w-full pl-10 pr-4 py-2.5 border rounded-xl focus:outline-none focus:border-brand-200 ${errors.fullName ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'
                                                    }`}
                                            />
                                        </div>
                                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                    </div>

                                    {/* Email & Phone Row */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-sm font-medium text-slate-700 block mb-1.5">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="Email"
                                                    className={`w-full pl-9 pr-3 py-2.5 border rounded-xl focus:outline-none focus:border-brand-200 text-sm ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'
                                                        }`}
                                                />
                                            </div>
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-slate-700 block mb-1.5">
                                                Phone <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+91 98765..."
                                                    className={`w-full pl-9 pr-3 py-2.5 border rounded-xl focus:outline-none focus:border-brand-200 text-sm ${errors.phone ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'
                                                        }`}
                                                />
                                            </div>
                                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                        </div>
                                    </div>

                                    {/* College & Year Row */}
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="col-span-2">
                                            <label className="text-sm font-medium text-slate-700 block mb-1.5">
                                                College <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    type="text"
                                                    name="collegeName"
                                                    value={formData.collegeName}
                                                    onChange={handleChange}
                                                    placeholder="College name"
                                                    className={`w-full pl-9 pr-3 py-2.5 border rounded-xl focus:outline-none focus:border-brand-200 text-sm ${errors.collegeName ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'
                                                        }`}
                                                />
                                            </div>
                                            {errors.collegeName && <p className="text-red-500 text-xs mt-1">{errors.collegeName}</p>}
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-slate-700 block mb-1.5">Year</label>
                                            <select
                                                name="year"
                                                value={formData.year}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 bg-slate-50 text-sm"
                                            >
                                                <option value="">Select</option>
                                                <option value="1">1st</option>
                                                <option value="2">2nd</option>
                                                <option value="3">3rd</option>
                                                <option value="4">4th</option>
                                                <option value="pg">PG</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Event Summary */}
                                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                        <div className="flex items-center justify-between text-sm mb-2">
                                            <span className="text-slate-500 flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(event.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                                            </span>
                                            <span className="text-slate-500 flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span className="truncate max-w-[120px]">{event.venue}</span>
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                                            <span className="font-medium text-slate-700">Total</span>
                                            <span className="text-xl font-bold text-brand-200">
                                                {event.fee === 0 ? 'FREE' : `₹${event.fee}`}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Terms */}
                                    <label className="flex items-start gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="agreeToTerms"
                                            checked={formData.agreeToTerms}
                                            onChange={handleChange}
                                            className="mt-0.5 w-4 h-4 text-brand-200 rounded"
                                        />
                                        <span className="text-xs text-slate-500">
                                            I agree to the <span className="text-brand-200">Terms & Conditions</span> and consent to event photography
                                        </span>
                                    </label>
                                    {errors.agreeToTerms && <p className="text-red-500 text-xs -mt-2">{errors.agreeToTerms}</p>}

                                    {/* API Error Display */}
                                    <AnimatePresence>
                                        {registerError && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-2"
                                            >
                                                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                                <p className="text-xs text-red-600 font-medium">{registerError}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <motion.button
                                        type="submit"
                                        className="w-full py-3.5 bg-gradient-to-r from-brand-100 to-brand-200 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {event.fee === 0 ? 'Complete Registration' : 'Proceed to Payment'}
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </motion.form>
                            )}

                            {/* Step 2: Payment */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-5"
                                >
                                    {/* Payment Card */}
                                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-slate-400 text-sm">Amount</span>
                                            <IndianRupee className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <p className="text-3xl font-bold">₹{event.fee}</p>
                                        <div className="mt-3 pt-3 border-t border-slate-700 flex justify-between text-sm">
                                            <span className="text-slate-400">Attendee</span>
                                            <span>{formData.fullName}</span>
                                        </div>
                                    </div>

                                    {/* Payment Methods */}
                                    <div className="space-y-2">
                                        {['UPI / Google Pay', 'Credit/Debit Card', 'Net Banking'].map((method, i) => (
                                            <label key={method} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${i === 0 ? 'border-brand-200 bg-brand-50' : 'border-slate-200 hover:border-brand-100'}`}>
                                                <input type="radio" name="payment" defaultChecked={i === 0} className="w-4 h-4 text-brand-200" />
                                                <span className="text-sm font-medium text-slate-700">{method}</span>
                                            </label>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                                        <Shield className="w-4 h-4 text-emerald-600" />
                                        <p className="text-xs text-emerald-700">Secured with 256-bit encryption</p>
                                    </div>

                                    <motion.button
                                        onClick={handlePayment}
                                        disabled={isProcessing}
                                        className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
                                        whileHover={!isProcessing ? { scale: 1.02 } : {}}
                                        whileTap={!isProcessing ? { scale: 0.98 } : {}}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard className="w-5 h-5" />
                                                Pay ₹{event.fee}
                                            </>
                                        )}
                                    </motion.button>
                                </motion.div>
                            )}

                            {/* Step 3: Success */}
                            {step === 3 && ticketData && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                        className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center"
                                    >
                                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                                    </motion.div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-1">You're In!</h3>
                                    <p className="text-slate-500 text-sm mb-5">Confirmation sent to {formData.email}</p>

                                    {/* Ticket */}
                                    <div className="bg-gradient-to-br from-brand-100 to-brand-300 rounded-2xl p-5 text-white text-left relative overflow-hidden">
                                        <div className="absolute -left-3 top-1/2 w-6 h-6 bg-white rounded-full" />
                                        <div className="absolute -right-3 top-1/2 w-6 h-6 bg-white rounded-full" />

                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <p className="text-white/70 text-xs uppercase">E-Ticket</p>
                                                <p className="font-mono font-bold">{ticketData.ticketNumber}</p>
                                            </div>
                                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                                <QrCode className="w-5 h-5" />
                                            </div>
                                        </div>

                                        <div className="border-t border-white/20 pt-3 border-dashed">
                                            <p className="font-bold">{ticketData.eventTitle}</p>
                                            <div className="flex items-center gap-4 text-white/80 text-sm mt-2">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(ticketData.eventDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    <span className="truncate max-w-[100px]">{ticketData.venue}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-5">
                                        <motion.button
                                            className="flex-1 py-2.5 border border-slate-200 rounded-xl font-medium text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Download className="w-4 h-4" />
                                            Download
                                        </motion.button>
                                        <motion.button
                                            onClick={handleDone}
                                            className="flex-1 py-2.5 bg-gradient-to-r from-brand-100 to-brand-200 text-white rounded-xl font-semibold"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Done
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default RegistrationModal;
