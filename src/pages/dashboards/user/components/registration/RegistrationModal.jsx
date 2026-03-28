import { useState, useEffect } from 'react';
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
    Users,
    UserPlus,
    Minus,
    AlertCircle,
    ChevronDown,
    Check,
} from 'lucide-react';
import { registerForEvent } from '../../../../../api';

/**
 * Streamlined Registration Modal with Custom Fields Support
 */
function RegistrationModal({ event, onClose, onSuccess, user }) {
    const [step, setStep] = useState(1); // 1: Form, 2: Payment, 3: Success
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phone: '',
        collegeName: '',
        year: '',
        agreeToTerms: false
    });
    const [ticketData, setTicketData] = useState(null);
    const eventFee = event?.ticketPrice ? Number(event.ticketPrice) : (event?.fee || 0);

    // Custom fields state: map backend's formSchema if available, fallback to customFields for mock data
    const customFields = (event?.formSchema?.map((schemaField, idx) => {
        // Infer true type from backend structure
        let inferredType = schemaField.type || 'text';
        
        // If backend says 'string' but we have options, it's likely a choice field
        if (inferredType === 'string' && schemaField.options?.length > 0) {
            inferredType = 'dropdown'; // Default inferred type for structured choices
        }

        return {
            ...schemaField, // Preserve options and configs perfectly
            id: schemaField.id || `custom_${idx}`,
            label: schemaField.fieldName || schemaField.label,
            type: inferredType,
            options: schemaField.options || [],
            required: schemaField.required !== undefined ? schemaField.required : false
        };
    })) || event?.customFields || [];
    
    const hasCustomFields = customFields.length > 0;
    const [customFieldValues, setCustomFieldValues] = useState({});
    const [teamName, setTeamName] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);

    // Initialize team members
    useEffect(() => {
        const teamField = customFields.find(f => f.type === 'team' || f.type === 'Team Details');
        if (teamField && teamMembers.length === 0) {
            const min = teamField.teamConfig?.minMembers || 2;
            setTeamMembers(Array.from({ length: min }, () => ({ name: '', email: '', phone: '' })));
        }
    }, [customFields]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    // Custom field handlers
    const handleFieldChange = (fieldId, value) => {
        setCustomFieldValues(prev => ({ ...prev, [fieldId]: value }));
        if (errors[fieldId]) setErrors(prev => ({ ...prev, [fieldId]: null }));
    };

    const handleCheckboxToggle = (fieldId, option) => {
        const current = customFieldValues[fieldId] || [];
        const updated = current.includes(option)
            ? current.filter(o => o !== option)
            : [...current, option];
        handleFieldChange(fieldId, updated);
    };

    const addTeamMember = (max) => {
        if (teamMembers.length < max) {
            setTeamMembers(prev => [...prev, { name: '', email: '', phone: '' }]);
        }
    };

    const removeTeamMember = (idx, min) => {
        if (teamMembers.length > min) {
            setTeamMembers(prev => prev.filter((_, i) => i !== idx));
        }
    };

    const updateTeamMember = (idx, key, value) => {
        setTeamMembers(prev => {
            const updated = [...prev];
            updated[idx] = { ...updated[idx], [key]: value };
            return updated;
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Required';
        if (!formData.email.trim()) newErrors.email = 'Required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.phone.trim()) newErrors.phone = 'Required';
        if (!formData.collegeName.trim()) newErrors.collegeName = 'Required';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms';

        // Validate custom fields
        customFields.forEach(field => {
            if (!field.required) return;

            if (field.type === 'team') {
                if (!teamName.trim()) newErrors[field.id + '_teamName'] = 'Team name is required';
                const cfg = field.teamConfig || {};
                teamMembers.forEach((member, idx) => {
                    if (cfg.collectMemberNames && !member.name.trim())
                        newErrors[`${field.id}_member_${idx}_name`] = 'Required';
                    if (cfg.collectMemberEmails && !member.email.trim())
                        newErrors[`${field.id}_member_${idx}_email`] = 'Required';
                    if (cfg.collectMemberPhones && !member.phone.trim())
                        newErrors[`${field.id}_member_${idx}_phone`] = 'Required';
                });
            } else if (field.type === 'checkbox') {
                if (!(customFieldValues[field.id]?.length > 0))
                    newErrors[field.id] = 'Select at least one';
            } else {
                const val = customFieldValues[field.id];
                if (!val || (typeof val === 'string' && !val.trim()))
                    newErrors[field.id] = 'Required';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (eventFee === 0) {
            handleCompleteRegistration();
        } else {
            setStep(2);
        }
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        handleCompleteRegistration();
    };

    const handleCompleteRegistration = async () => {
        setIsProcessing(true);
        try {
            // Prepare backend payload
            // Backend expects the additional fields and custom question answers
            const registrationPayload = { 
                ...customFieldValues,
                teamName: teamName || undefined,
                teamMembers: teamMembers.length > 0 ? teamMembers : undefined,
                collegeName: formData.collegeName,
                year: formData.year,
                phone: formData.phone
            };

            // Call POST /api/registrations/{eventId}
            await registerForEvent(event.id, registrationPayload);

            const ticket = {
                ticketNumber: `GP${Date.now().toString(36).toUpperCase()}`,
                eventTitle: event.eventName || event.title || 'Event',
                eventDate: event.startDate || event.date || new Date().toISOString(),
                venue: event.venue || 'Online',
                amount: eventFee,
                registeredAt: new Date().toISOString(),
                attendeeName: formData.fullName,
                attendeeEmail: formData.email,
                college: formData.collegeName,
                customFieldValues,
                teamName: teamName || undefined,
                teamMembers: teamMembers.length > 0 ? teamMembers : undefined,
            };

            setTicketData(ticket);
            setStep(3);
        } catch (error) {
            console.error('Registration API Error:', error);
            setErrors({ submit: 'Failed to register with server. Please try again.' });
            setStep(1); 
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDone = () => {
        if (onSuccess) onSuccess(ticketData);
        onClose();
    };

    // Render a single custom field
    const renderCustomField = (field) => {
        // — Team Details —
        if (field.type === 'team' || field.type === 'Team Details') {
            const cfg = field.teamConfig || {};
            return (
                <div key={field.id} className="bg-violet-50/70 rounded-2xl p-4 border border-violet-200/50 space-y-3">
                    <h4 className="font-semibold text-sm text-slate-800 flex items-center gap-2">
                        <Users className="w-4 h-4 text-violet-500" />
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                        <span className="text-xs font-normal text-slate-400 ml-auto">{cfg.minMembers}–{cfg.maxMembers} members</span>
                    </h4>

                    {/* Team name */}
                    <div>
                        <input
                            type="text"
                            value={teamName}
                            onChange={(e) => { setTeamName(e.target.value); if (errors[field.id + '_teamName']) setErrors(prev => ({ ...prev, [field.id + '_teamName']: null })); }}
                            placeholder="Team Name"
                            className={`w-full px-3.5 py-2.5 border rounded-xl text-sm font-medium outline-none transition-all ${errors[field.id + '_teamName'] ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white focus:border-brand-200'}`}
                        />
                        {errors[field.id + '_teamName'] && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors[field.id + '_teamName']}</p>}
                    </div>

                    {/* Members */}
                    {teamMembers.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl p-3 border border-violet-100 space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-violet-500 uppercase tracking-wider">Member {idx + 1}</span>
                                {teamMembers.length > cfg.minMembers && (
                                    <button type="button" onClick={() => removeTeamMember(idx, cfg.minMembers)} className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                                        <Minus className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {cfg.collectMemberNames && (
                                    <input
                                        type="text"
                                        value={member.name}
                                        onChange={(e) => updateTeamMember(idx, 'name', e.target.value)}
                                        placeholder="Full Name"
                                        className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all ${errors[`${field.id}_member_${idx}_name`] ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-brand-200'}`}
                                    />
                                )}
                                {cfg.collectMemberEmails && (
                                    <input
                                        type="email"
                                        value={member.email}
                                        onChange={(e) => updateTeamMember(idx, 'email', e.target.value)}
                                        placeholder="Email"
                                        className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all ${errors[`${field.id}_member_${idx}_email`] ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-brand-200'}`}
                                    />
                                )}
                                {cfg.collectMemberPhones && (
                                    <input
                                        type="tel"
                                        value={member.phone}
                                        onChange={(e) => updateTeamMember(idx, 'phone', e.target.value)}
                                        placeholder="Phone"
                                        className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all ${errors[`${field.id}_member_${idx}_phone`] ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-brand-200'}`}
                                    />
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {teamMembers.length < cfg.maxMembers && (
                        <button
                            type="button"
                            onClick={() => addTeamMember(cfg.maxMembers)}
                            className="w-full py-2.5 rounded-xl border-2 border-dashed border-violet-200 text-violet-600 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-violet-50 transition-colors"
                        >
                            <UserPlus className="w-3.5 h-3.5" />
                            Add Member ({teamMembers.length}/{cfg.maxMembers})
                        </button>
                    )}
                </div>
            );
        }

        // — Text —
        if (field.type === 'text' || field.type === 'textarea') {
            return (
                <div key={field.id}>
                    <label className="text-sm font-medium text-slate-700 block mb-1.5">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                        <textarea
                            value={customFieldValues[field.id] || ''}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            placeholder={field.placeholder || ''}
                            rows="2"
                            className={`w-full px-3.5 py-2.5 border rounded-xl text-sm outline-none transition-all resize-none ${errors[field.id] ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white focus:border-brand-200'}`}
                        />
                    ) : (
                        <input
                            type="text"
                            value={customFieldValues[field.id] || ''}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            placeholder={field.placeholder || ''}
                            className={`w-full px-3.5 py-2.5 border rounded-xl text-sm outline-none transition-all ${errors[field.id] ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white focus:border-brand-200'}`}
                        />
                    )}
                    {errors[field.id] && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors[field.id]}</p>}
                </div>
            );
        }

        // — Number —
        if (field.type === 'number') {
            return (
                <div key={field.id}>
                    <label className="text-sm font-medium text-slate-700 block mb-1.5">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                        type="number"
                        value={customFieldValues[field.id] || ''}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        placeholder={field.placeholder || ''}
                        className={`w-full px-3.5 py-2.5 border rounded-xl text-sm outline-none transition-all ${errors[field.id] ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white focus:border-brand-200'}`}
                    />
                    {errors[field.id] && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors[field.id]}</p>}
                </div>
            );
        }

        // — Dropdown —
        if (field.type === 'dropdown') {
            return (
                <div key={field.id}>
                    <label className="text-sm font-medium text-slate-700 block mb-1.5">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                        <select
                            value={customFieldValues[field.id] || ''}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            className={`w-full px-3.5 py-2.5 border rounded-xl text-sm outline-none transition-all appearance-none bg-white ${errors[field.id] ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-brand-200'}`}
                        >
                            <option value="">Select...</option>
                            {(field.options || []).map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    {errors[field.id] && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors[field.id]}</p>}
                </div>
            );
        }

        // — Radio —
        if (field.type === 'radio') {
            return (
                <div key={field.id}>
                    <label className="text-sm font-medium text-slate-700 block mb-2">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="space-y-1.5">
                        {(field.options || []).map((opt, i) => (
                            <label
                                key={i}
                                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm ${customFieldValues[field.id] === opt
                                    ? 'border-brand-200 bg-brand-50'
                                    : 'border-slate-100 hover:border-slate-200 bg-white'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${customFieldValues[field.id] === opt ? 'border-brand-200' : 'border-slate-300'}`}>
                                    {customFieldValues[field.id] === opt && <div className="w-2 h-2 rounded-full bg-brand-200" />}
                                </div>
                                <input type="radio" name={field.id} value={opt} checked={customFieldValues[field.id] === opt} onChange={() => handleFieldChange(field.id, opt)} className="sr-only" />
                                <span className="font-medium text-slate-700">{opt}</span>
                            </label>
                        ))}
                    </div>
                    {errors[field.id] && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors[field.id]}</p>}
                </div>
            );
        }

        // — Checkbox —
        if (field.type === 'checkbox') {
            const selected = customFieldValues[field.id] || [];
            return (
                <div key={field.id}>
                    <label className="text-sm font-medium text-slate-700 block mb-2">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                        <span className="text-slate-400 font-normal ml-1 text-xs">(select multiple)</span>
                    </label>
                    <div className="space-y-1.5">
                        {(field.options || []).map((opt, i) => (
                            <label
                                key={i}
                                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm ${selected.includes(opt)
                                    ? 'border-brand-200 bg-brand-50'
                                    : 'border-slate-100 hover:border-slate-200 bg-white'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${selected.includes(opt) ? 'border-brand-200 bg-brand-200' : 'border-slate-300 bg-white'}`}>
                                    {selected.includes(opt) && <Check className="w-2.5 h-2.5 text-white" />}
                                </div>
                                <input type="checkbox" checked={selected.includes(opt)} onChange={() => handleCheckboxToggle(field.id, opt)} className="sr-only" />
                                <span className="font-medium text-slate-700">{opt}</span>
                            </label>
                        ))}
                    </div>
                    {errors[field.id] && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors[field.id]}</p>}
                </div>
            );
        }

        return null;
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
                    className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.15)] max-h-[90vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-brand-400 via-brand-300 to-brand-200 p-5 text-white relative flex-shrink-0 overflow-hidden">
                        {/* Decorative orbs */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/8 rounded-full blur-2xl" />
                        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-2xl" />

                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 p-2 hover:bg-white/20 rounded-xl transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 relative z-[1]">
                            <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg shadow-black/5">
                                {step === 3 ? (
                                    <CheckCircle2 className="w-6 h-6" />
                                ) : step === 2 ? (
                                    <CreditCard className="w-6 h-6" />
                                ) : (
                                    <Ticket className="w-6 h-6" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold tracking-tight">
                                    {step === 3 ? 'Registration Complete!' : step === 2 ? 'Payment' : 'Quick Registration'}
                                </h2>
                                <p className="text-white/70 text-sm line-clamp-1">{event.eventName || event.title}</p>
                            </div>
                        </div>

                        {step < 3 && (
                            <div className="flex gap-2 mt-4 relative z-[1]">
                                {[1, 2].slice(0, eventFee === 0 ? 1 : 2).map((s) => (
                                    <div key={s} className={`flex-1 h-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-white' : 'bg-white/20'}`} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Content — scrollable */}
                    <div className="p-5 overflow-y-auto flex-1">
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
                                                className={`w-full pl-10 pr-4 py-2.5 border rounded-xl focus:outline-none focus:border-brand-200 ${errors.fullName ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'
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
                                                    className={`w-full pl-9 pr-3 py-2.5 border rounded-xl focus:outline-none focus:border-brand-200 text-sm ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'
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
                                                    className={`w-full pl-9 pr-3 py-2.5 border rounded-xl focus:outline-none focus:border-brand-200 text-sm ${errors.phone ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'
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
                                                    className={`w-full pl-9 pr-3 py-2.5 border rounded-xl focus:outline-none focus:border-brand-200 text-sm ${errors.collegeName ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'
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
                                                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 bg-white text-sm"
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

                                    {/* ======= Custom Fields Section ======= */}
                                    {hasCustomFields && (
                                        <div className="space-y-4 pt-3 mt-3 border-t border-slate-200">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-lg bg-brand-200/10 flex items-center justify-center">
                                                    <Users className="w-3.5 h-3.5 text-brand-200" />
                                                </div>
                                                <h3 className="text-sm font-bold text-slate-800">Event-Specific Details</h3>
                                            </div>
                                            {customFields.map(field => renderCustomField(field))}
                                        </div>
                                    )}

                                    {/* Event Summary */}
                                    <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 border border-slate-200/80 shadow-sm">
                                        <div className="flex items-center justify-between text-sm mb-2">
                                            <span className="text-slate-500 flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(event.startDate || event.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                                            </span>
                                            <span className="text-slate-500 flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span className="truncate max-w-[120px]">{event.venue}</span>
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                                            <span className="font-medium text-slate-700">Total</span>
                                            <span className="text-xl font-bold text-brand-300">
                                                {eventFee === 0 ? 'FREE' : `₹${eventFee}`}
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
                                            I agree to the <span className="text-brand-300 font-medium">Terms & Conditions</span> and consent to event photography
                                        </span>
                                    </label>
                                    {errors.agreeToTerms && <p className="text-red-500 text-xs -mt-2">{errors.agreeToTerms}</p>}

                                    <motion.button
                                        type="submit"
                                        className="w-full py-3.5 bg-gradient-to-r from-brand-400 via-brand-300 to-brand-200 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-brand-300/20 hover:shadow-xl hover:shadow-brand-300/30 transition-shadow"
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {eventFee === 0 ? 'Complete Registration' : 'Proceed to Payment'}
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
                                    <div className="bg-slate-900 rounded-2xl p-5 text-white">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-slate-400 text-sm">Amount</span>
                                            <IndianRupee className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <p className="text-3xl font-bold">₹{eventFee}</p>
                                        <div className="mt-3 pt-3 border-t border-slate-700 flex justify-between text-sm">
                                            <span className="text-slate-400">Attendee</span>
                                            <span>{formData.fullName}</span>
                                        </div>
                                    </div>

                                    {/* Payment Methods */}
                                    <div className="space-y-2">
                                        {['UPI / Google Pay', 'Credit/Debit Card', 'Net Banking'].map((method, i) => (
                                            <label key={method} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${i === 0 ? 'border-brand-200 bg-brand-50' : 'border-slate-200 hover:border-brand-200'}`}>
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
                                        className="w-full py-3.5 bg-emerald-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
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
                                                Pay ₹{eventFee}
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
                                    <div className="bg-gradient-to-br from-brand-400 via-brand-300 to-brand-200 rounded-2xl p-5 text-white text-left relative overflow-hidden shadow-lg shadow-brand-300/20">
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
                                            className="flex-1 py-2.5 bg-gradient-to-r from-brand-300 to-brand-200 text-white rounded-xl font-semibold shadow-md shadow-brand-200/25"
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
