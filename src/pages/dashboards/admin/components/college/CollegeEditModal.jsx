import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, MapPin, Mail, Phone, Globe, Upload, Save } from 'lucide-react';
import { ActionButton } from '../common';
import { INDIAN_STATES } from '../../../../../utils/constants';

/**
 * College Edit Modal Component
 * Modal for editing college details
 */
function CollegeEditModal({
    isOpen,
    onClose,
    college,
    onSave,
    loading = false
}) {
    const [formData, setFormData] = useState({
        name: college?.name || '',
        state: college?.state || '',
        pincode: college?.pincode || '',
        address: college?.address || '',
        email: college?.email || '',
        phone: college?.phone || '',
        website: college?.website || '',
        description: college?.description || ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when field is changed
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'College name is required';
        }
        if (!formData.state) {
            newErrors.state = 'State is required';
        }
        if (!formData.pincode.trim()) {
            newErrors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = 'Pincode must be 6 digits';
        }
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
            newErrors.website = 'Website must start with http:// or https://';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSave(formData);
        }
    };

    const handleClose = () => {
        setErrors({});
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="fixed inset-0 flex items-center justify-center z-50 p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="relative p-6 pb-4 border-b border-slate-100">
                                <motion.button
                                    onClick={handleClose}
                                    className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-5 h-5 text-slate-400" />
                                </motion.button>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-brand-100/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Building2 className="w-6 h-6 text-brand-200" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">Edit College Details</h3>
                                        <p className="text-slate-500 mt-1 text-sm">
                                            Update your college information
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-5">
                                {/* Basic Info Section */}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                        Basic Information
                                    </h4>

                                    {/* College Name */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            College Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            placeholder="Enter college name"
                                            className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand-50 transition-all ${errors.name
                                                    ? 'border-red-300 focus:border-red-400'
                                                    : 'border-slate-200 focus:border-brand-200'
                                                }`}
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* State & Pincode */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                State *
                                            </label>
                                            <select
                                                value={formData.state}
                                                onChange={(e) => handleChange('state', e.target.value)}
                                                className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand-50 transition-all ${errors.state
                                                        ? 'border-red-300 focus:border-red-400'
                                                        : 'border-slate-200 focus:border-brand-200'
                                                    }`}
                                            >
                                                <option value="">Select state</option>
                                                {INDIAN_STATES.map(state => (
                                                    <option key={state} value={state}>{state}</option>
                                                ))}
                                            </select>
                                            {errors.state && (
                                                <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Pincode *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.pincode}
                                                onChange={(e) => handleChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                placeholder="6 digits"
                                                maxLength={6}
                                                className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand-50 transition-all ${errors.pincode
                                                        ? 'border-red-300 focus:border-red-400'
                                                        : 'border-slate-200 focus:border-brand-200'
                                                    }`}
                                            />
                                            {errors.pincode && (
                                                <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Full Address
                                        </label>
                                        <textarea
                                            value={formData.address}
                                            onChange={(e) => handleChange('address', e.target.value)}
                                            placeholder="Enter complete address"
                                            rows={2}
                                            className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-50 transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Contact Info Section */}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                        Contact Information
                                    </h4>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                <Mail className="w-3.5 h-3.5 inline mr-1" />
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleChange('email', e.target.value)}
                                                placeholder="admin@college.edu"
                                                className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand-50 transition-all ${errors.email
                                                        ? 'border-red-300 focus:border-red-400'
                                                        : 'border-slate-200 focus:border-brand-200'
                                                    }`}
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                <Phone className="w-3.5 h-3.5 inline mr-1" />
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => handleChange('phone', e.target.value)}
                                                placeholder="+91 1234567890"
                                                className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-50 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            <Globe className="w-3.5 h-3.5 inline mr-1" />
                                            Website
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.website}
                                            onChange={(e) => handleChange('website', e.target.value)}
                                            placeholder="https://www.college.edu"
                                            className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand-50 transition-all ${errors.website
                                                    ? 'border-red-300 focus:border-red-400'
                                                    : 'border-slate-200 focus:border-brand-200'
                                                }`}
                                        />
                                        {errors.website && (
                                            <p className="text-red-500 text-xs mt-1">{errors.website}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                        About
                                    </h4>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        placeholder="Brief description about your college..."
                                        rows={3}
                                        className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-50 transition-all resize-none"
                                    />
                                </div>

                                {/* Logo Upload */}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                        College Logo
                                    </h4>
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-brand-200 transition-colors cursor-pointer">
                                        <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                        <p className="text-sm text-slate-500">
                                            Click or drag to upload logo
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1">
                                            PNG, JPG up to 2MB
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 p-6 pt-4 bg-slate-50 border-t border-slate-100">
                                <ActionButton
                                    onClick={handleClose}
                                    label="Cancel"
                                    variant="secondary"
                                    fullWidth
                                    disabled={loading}
                                />
                                <ActionButton
                                    onClick={handleSubmit}
                                    icon={Save}
                                    label="Save Changes"
                                    variant="primary"
                                    fullWidth
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default CollegeEditModal;
