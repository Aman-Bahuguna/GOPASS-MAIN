import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    MapPin,
    Phone,
    FileText,
    Upload,
    X,
    Check,
    Image as ImageIcon,
    DollarSign,
    Users,
    AlertCircle,
} from 'lucide-react';

const AdminCreateEventForm = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        eventName: '',
        dateTime: '',
        venue: '',
        contact: '',
        description: '',
        poster: null,
        paymentEnabled: false,
        ticketPrice: '',
        maxParticipants: '',
        tags: [],
    });

    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        if (file) {
            processFile(file);
        }
    };

    const handleFileDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file) => {
        // Validate file type
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            setErrors(prev => ({ ...prev, poster: 'Please upload a JPEG, PNG or WebP image' }));
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, poster: 'File size must be less than 5MB' }));
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
            setFormData(prev => ({ ...prev, poster: file }));
            if (errors.poster) {
                setErrors(prev => ({ ...prev, poster: '' }));
            }
        };
        reader.readAsDataURL(file);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.eventName.trim()) {
            newErrors.eventName = 'Event name is required';
        }
        if (!formData.dateTime) {
            newErrors.dateTime = 'Date and time are required';
        }
        if (!formData.venue.trim()) {
            newErrors.venue = 'Venue is required';
        }
        if (!formData.contact.trim()) {
            newErrors.contact = 'Contact information is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (!formData.poster) {
            newErrors.poster = 'Poster is required';
        }
        if (formData.paymentEnabled && !formData.ticketPrice) {
            newErrors.ticketPrice = 'Ticket price is required for paid events';
        }
        if (formData.paymentEnabled && formData.ticketPrice && parseFloat(formData.ticketPrice) <= 0) {
            newErrors.ticketPrice = 'Ticket price must be greater than 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log('Event Created:', formData);

            // Reset form
            setFormData({
                eventName: '',
                dateTime: '',
                venue: '',
                contact: '',
                description: '',
                poster: null,
                paymentEnabled: false,
                ticketPrice: '',
                maxParticipants: '',
                tags: [],
            });
            setPreview(null);

            // Navigate back to events
            onNavigate?.('events');
        } catch (error) {
            console.error('Error creating event:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        onNavigate?.('events');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
        >
            <div className="bg-white rounded-2xl border border-slate-200/60 p-8 shadow-sm">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-200 to-brand-100 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Create New Event</h2>
                            <p className="text-slate-600 text-sm mt-1">Add event details and configure settings</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Event Basic Info Section */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-6 border border-slate-200/40">
                        <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-brand-200 rounded-full" />
                            Event Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Event Name */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Event Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="eventName"
                                    value={formData.eventName}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Annual Tech Fest 2026"
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${
                                        errors.eventName
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-slate-200 bg-white focus:border-brand-300 focus:shadow-md'
                                    }`}
                                />
                                {errors.eventName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.eventName}</p>
                                )}
                            </div>

                            {/* Date & Time */}
                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-brand-200" />
                                    Date & Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    name="dateTime"
                                    value={formData.dateTime}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${
                                        errors.dateTime
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-slate-200 bg-white focus:border-brand-300 focus:shadow-md'
                                    }`}
                                />
                                {errors.dateTime && (
                                    <p className="mt-1 text-sm text-red-600">{errors.dateTime}</p>
                                )}
                            </div>

                            {/* Max Participants */}
                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-brand-200" />
                                    Max Participants
                                </label>
                                <input
                                    type="number"
                                    name="maxParticipants"
                                    value={formData.maxParticipants}
                                    onChange={handleInputChange}
                                    placeholder="Leave blank for unlimited"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:border-brand-300 focus:shadow-md transition-all outline-none"
                                />
                            </div>

                            {/* Venue */}
                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-brand-200" />
                                    Venue <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="venue"
                                    value={formData.venue}
                                    onChange={handleInputChange}
                                    placeholder="Enter event location"
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${
                                        errors.venue
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-slate-200 bg-white focus:border-brand-300 focus:shadow-md'
                                    }`}
                                />
                                {errors.venue && (
                                    <p className="mt-1 text-sm text-red-600">{errors.venue}</p>
                                )}
                            </div>

                            {/* Contact */}
                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-brand-200" />
                                    Contact Information <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleInputChange}
                                    placeholder="Phone number or email"
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${
                                        errors.contact
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-slate-200 bg-white focus:border-brand-300 focus:shadow-md'
                                    }`}
                                />
                                {errors.contact && (
                                    <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-6">
                            <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-brand-200" />
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe your event, what participants can expect, any special requirements, etc."
                                rows="4"
                                className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none resize-none ${
                                    errors.description
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-slate-200 bg-white focus:border-brand-300 focus:shadow-md'
                                }`}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200/40">
                        <h3 className="text-lg font-semibold text-slate-900 mb-5 flex items-center gap-2">
                            <div className="w-1 h-6 bg-brand-200 rounded-full" />
                            Payment Settings
                        </h3>

                        <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl bg-white border-2 border-slate-200 hover:border-brand-300 transition-all">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="paymentEnabled"
                                    checked={formData.paymentEnabled}
                                    onChange={handleInputChange}
                                    className="sr-only"
                                />
                                <div
                                    className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${
                                        formData.paymentEnabled
                                            ? 'bg-brand-200 border-brand-200 shadow-lg shadow-brand-200/30'
                                            : 'border-slate-300 bg-white'
                                    }`}
                                >
                                    {formData.paymentEnabled && (
                                        <Check className="w-4 h-4 text-white" />
                                    )}
                                </div>
                            </div>
                            <div className="flex-1">
                                <span className="font-semibold text-slate-900">This is a Paid Event</span>
                                <p className="text-slate-600 text-sm mt-1">
                                    {formData.paymentEnabled
                                        ? 'Participants will need to pay to register'
                                        : 'Free registration for all participants'}
                                </p>
                            </div>
                            <DollarSign className={`w-5 h-5 transition-colors ${formData.paymentEnabled ? 'text-brand-200' : 'text-slate-400'}`} />
                        </label>

                        {/* Ticket Price - Show only when payment enabled */}
                        <AnimatePresence>
                            {formData.paymentEnabled && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, y: -10 }}
                                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                                    exit={{ opacity: 0, height: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4 pt-4 border-t border-blue-200"
                                >
                                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                                        Ticket Price <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3 text-slate-600 font-semibold">₹</span>
                                        <input
                                            type="number"
                                            name="ticketPrice"
                                            value={formData.ticketPrice}
                                            onChange={handleInputChange}
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                            className={`w-full pl-8 pr-4 py-3 rounded-xl border-2 transition-all outline-none ${
                                                errors.ticketPrice
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-slate-200 bg-white focus:border-brand-300 focus:shadow-md'
                                            }`}
                                        />
                                    </div>
                                    {errors.ticketPrice && (
                                        <p className="mt-1 text-sm text-red-600">{errors.ticketPrice}</p>
                                    )}
                                    {formData.ticketPrice && !errors.ticketPrice && (
                                        <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-2">
                                            <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-emerald-900">Price set at ₹{parseFloat(formData.ticketPrice).toFixed(2)}</p>
                                                <p className="text-sm text-emerald-700">Participants will pay this amount during registration</p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Poster Upload */}
                    <div>
                        <label className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-brand-200" />
                            Event Poster <span className="text-red-500">*</span>
                        </label>

                        {!preview ? (
                            <motion.div
                                onClick={() => fileInputRef.current?.click()}
                                onDrop={handleFileDrop}
                                onDragOver={handleFileDragOver}
                                className={`border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                                    errors.poster
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-slate-300 bg-slate-50 hover:border-brand-300 hover:bg-brand-50'
                                }`}
                                whileHover={{ scale: 1.02, borderColor: '#5596e6' }}
                            >
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                                </motion.div>
                                <p className="text-slate-800 font-semibold mb-2 text-lg">Drop your poster here</p>
                                <p className="text-slate-600 mb-3">or click to browse from your computer</p>
                                <p className="text-slate-500 text-xs">JPG, PNG, or WebP • Max 5MB</p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative rounded-2xl overflow-hidden border-2 border-emerald-300 bg-slate-50 shadow-lg"
                            >
                                <img
                                    src={preview}
                                    alt="Poster preview"
                                    className="w-full h-72 object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPreview(null);
                                        setFormData(prev => ({ ...prev, poster: null }));
                                    }}
                                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition-all shadow-lg hover:shadow-xl"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="px-4 py-3 bg-gradient-to-r from-emerald-50 to-emerald-100 border-t-2 border-emerald-300">
                                    <p className="text-sm font-semibold text-emerald-900">
                                        ✓ {formData.poster?.name}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                        {errors.poster && (
                            <p className="mt-2 text-sm text-red-600">{errors.poster}</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6 border-t border-slate-200">
                        <motion.button
                            type="button"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all disabled:opacity-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Cancel
                        </motion.button>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-200 to-brand-100 text-white font-semibold hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.02, boxShadow: '0 20px 25px rgba(85, 150, 230, 0.3)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Creating Event...
                                </>
                            ) : (
                                <>
                                    <Check className="w-5 h-5" />
                                    Create Event
                                </>
                            )}
                        </motion.button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default AdminCreateEventForm;
