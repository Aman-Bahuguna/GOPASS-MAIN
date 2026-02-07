import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Code2,
    GraduationCap,
    Mic2,
    Music,
    Trophy,
    Award,
    Users,
    Rocket,
    ChevronRight,
    ChevronLeft,
    Check,
    Upload,
    X,
    Calendar,
    Clock,
    MapPin,
    IndianRupee,
    Users2,
    Image as ImageIcon,
    FileText,
    Tag,
    Info,
    AlertCircle,
    Wand2,
    Plus,
    Trash2,
    // New icons for additional templates
    Video,
    Building,
    PartyPopper,
    Presentation,
    HandMetal,
    Briefcase,
    Gamepad2
} from 'lucide-react';
import { EVENT_TEMPLATES, getEventTemplates, BANNER_SPECS, EVENT_CATEGORIES } from '../../data/eventTemplates';

// Icon mapping for templates
const ICON_MAP = {
    Sparkles, Code2, GraduationCap, Mic2, Music, Trophy, Award, Users, Rocket,
    Video, Building, PartyPopper, Presentation, HandWaving: HandMetal, Briefcase, Gamepad2
};

// Template Selection Card
const TemplateCard = ({ template, isSelected, onClick }) => {
    const IconComponent = ICON_MAP[template.icon] || Sparkles;

    return (
        <motion.div
            onClick={onClick}
            className={`relative cursor-pointer rounded-2xl border-2 p-5 transition-all ${isSelected
                ? `border-${template.color}-500 bg-${template.color}-50 ring-4 ring-${template.color}-100`
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg'
                }`}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
        >
            {isSelected && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute -top-2 -right-2 w-6 h-6 bg-${template.color}-500 rounded-full flex items-center justify-center`}
                >
                    <Check className="w-4 h-4 text-white" />
                </motion.div>
            )}

            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.gradient} flex items-center justify-center mb-4`}>
                <IconComponent className="w-6 h-6 text-white" />
            </div>

            <h3 className="font-bold text-slate-900 mb-1">{template.name}</h3>
            <p className="text-sm text-slate-500 line-clamp-2">{template.description}</p>

            {template.id !== 'custom' && (
                <div className="mt-3 flex flex-wrap gap-1">
                    {template.tags?.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

// Step Indicator
const StepIndicator = ({ currentStep, steps }) => {
    return (
        <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                    <motion.div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${index < currentStep
                            ? 'bg-emerald-500 text-white'
                            : index === currentStep
                                ? 'bg-brand-200 text-white'
                                : 'bg-slate-100 text-slate-400'
                            }`}
                        animate={index === currentStep ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.3 }}
                    >
                        {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                    </motion.div>
                    {index < steps.length - 1 && (
                        <div className={`w-16 h-1 mx-2 rounded-full transition-colors ${index < currentStep ? 'bg-emerald-500' : 'bg-slate-200'
                            }`} />
                    )}
                </div>
            ))}
        </div>
    );
};

// Banner Upload Component
const BannerUpload = ({ value, onChange, error }) => {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFile = (file) => {
        if (!file) return;

        // Validate file type
        if (!BANNER_SPECS.allowedTypes.includes(file.type)) {
            alert('Please upload a JPEG, PNG or WebP image');
            return;
        }

        // Validate file size
        if (file.size > BANNER_SPECS.maxFileSize) {
            alert('File size must be less than 5MB');
            return;
        }

        // Create preview and validate dimensions
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const aspectRatio = img.width / img.height;
                const expectedRatio = BANNER_SPECS.aspectRatio;

                // Allow some tolerance (10%)
                if (Math.abs(aspectRatio - expectedRatio) > 0.1) {
                    alert(`Please upload an image with A4 aspect ratio (approximately 1:1.41). Current ratio is ${aspectRatio.toFixed(2)}`);
                    return;
                }

                setPreview(e.target.result);
                onChange(file);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
                Event Banner / Poster
                <span className="text-slate-400 font-normal ml-2">(A4 Size Recommended)</span>
            </label>

            <div
                className={`relative border-2 border-dashed rounded-2xl transition-all ${dragActive ? 'border-brand-200 bg-brand-50' : 'border-slate-200 hover:border-slate-300'
                    } ${error ? 'border-red-300' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {preview ? (
                    <div className="relative p-4">
                        <img
                            src={preview}
                            alt="Banner preview"
                            className="w-full max-h-64 object-contain rounded-xl"
                        />
                        <button
                            onClick={() => {
                                setPreview(null);
                                onChange(null);
                            }}
                            className="absolute top-6 right-6 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => inputRef.current?.click()}
                        className="p-8 text-center cursor-pointer"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-slate-600 font-medium mb-1">
                            Drag & drop your banner or click to upload
                        </p>
                        <p className="text-sm text-slate-400">
                            A4 size (210 × 297 mm) • JPEG, PNG, WebP • Max 5MB
                        </p>
                    </div>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => handleFile(e.target.files[0])}
                    className="hidden"
                />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};

// Tags Input Component
const TagsInput = ({ value = [], onChange, placeholder }) => {
    const [inputValue, setInputValue] = useState('');

    const addTag = () => {
        const tag = inputValue.trim();
        if (tag && !value.includes(tag)) {
            onChange([...value, tag]);
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2 p-3 bg-white border border-slate-200 rounded-xl min-h-[48px]">
                {value.map((tag, index) => (
                    <motion.span
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-brand-100/20 text-brand-200 rounded-full text-sm"
                    >
                        {tag}
                        <button
                            onClick={() => removeTag(tag)}
                            className="p-0.5 hover:bg-brand-200 hover:text-white rounded-full transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </motion.span>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder={value.length === 0 ? placeholder : 'Add more...'}
                    className="flex-1 min-w-[120px] outline-none text-sm"
                />
            </div>
            <p className="text-xs text-slate-400">Press Enter to add a tag</p>
        </div>
    );
};

// Form Field Component
const FormField = ({ label, required, error, children, hint }) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {children}
        {hint && <p className="text-xs text-slate-400">{hint}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
);

// Main Event Creation Component
export default function CreateEventPage({ onNavigate }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [formData, setFormData] = useState({
        // Basic Info
        title: '',
        shortDescription: '',
        description: '',
        category: '',
        tags: [],

        // Date & Location
        date: '',
        endDate: '',
        venue: '',

        // Capacity & Pricing
        fee: 0,
        capacity: 100,

        // Media
        bannerFile: null,

        // Template-specific fields
        templateFields: {}
    });
    const [errors, setErrors] = useState({});

    const steps = [
        { id: 'template', title: 'Choose Template' },
        { id: 'basic', title: 'Basic Info' },
        { id: 'details', title: 'Event Details' },
        { id: 'media', title: 'Media & Preview' }
    ];

    const templates = [EVENT_TEMPLATES.CUSTOM, ...getEventTemplates()];

    // Handle template selection
    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);

        // Pre-fill form with template defaults
        if (template.id !== 'custom') {
            setFormData(prev => ({
                ...prev,
                title: template.defaultValues?.title || '',
                shortDescription: template.defaultValues?.shortDescription || '',
                description: template.defaultValues?.description || '',
                category: template.category || '',
                tags: template.tags || [],
                fee: template.defaultValues?.fee || 0,
                capacity: template.defaultValues?.capacity || 100,
                templateFields: {}
            }));
        } else {
            // Reset for custom
            setFormData({
                title: '',
                shortDescription: '',
                description: '',
                category: '',
                tags: [],
                date: '',
                endDate: '',
                venue: '',
                fee: 0,
                capacity: 100,
                bannerFile: null,
                templateFields: {}
            });
        }
    };

    // Update form field
    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: null }));
    };

    // Update template-specific field
    const updateTemplateField = (field, value) => {
        setFormData(prev => ({
            ...prev,
            templateFields: { ...prev.templateFields, [field]: value }
        }));
    };

    // Validate current step
    const validateStep = () => {
        const newErrors = {};

        if (currentStep === 0 && !selectedTemplate) {
            newErrors.template = 'Please select a template';
        }

        if (currentStep === 1) {
            if (!formData.title.trim()) newErrors.title = 'Title is required';
            if (!formData.shortDescription.trim()) newErrors.shortDescription = 'Short description is required';
            if (!formData.category) newErrors.category = 'Category is required';
        }

        if (currentStep === 2) {
            if (!formData.date) newErrors.date = 'Start date is required';
            if (!formData.endDate) newErrors.endDate = 'End date is required';
            if (!formData.venue.trim()) newErrors.venue = 'Venue is required';
            if (formData.capacity < 1) newErrors.capacity = 'Capacity must be at least 1';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle next step
    const handleNext = () => {
        if (validateStep()) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
        }
    };

    // Handle previous step
    const handlePrev = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    // Handle submit
    const handleSubmit = () => {
        if (validateStep()) {
            console.log('Creating event:', formData);
            // TODO: API call to create event
            alert('Event created successfully!');
        }
    };

    // Render step content
    const renderStepContent = () => {
        switch (currentStep) {
            // Step 1: Template Selection
            case 0:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose a Template</h2>
                            <p className="text-slate-500">
                                Start with a template or create from scratch
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {templates.map((template) => (
                                <TemplateCard
                                    key={template.id}
                                    template={template}
                                    isSelected={selectedTemplate?.id === template.id}
                                    onClick={() => handleTemplateSelect(template)}
                                />
                            ))}
                        </div>

                        {errors.template && (
                            <p className="text-center text-red-500">{errors.template}</p>
                        )}
                    </div>
                );

            // Step 2: Basic Info
            case 1:
                return (
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-200 rounded-full text-sm font-medium mb-4">
                                <Wand2 className="w-4 h-4" />
                                Using: {selectedTemplate?.name || 'Custom'}
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Basic Information</h2>
                            <p className="text-slate-500">Tell us about your event</p>
                        </div>

                        <FormField label="Event Title" required error={errors.title}>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => updateField('title', e.target.value)}
                                placeholder="Enter event title"
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-100/20"
                            />
                        </FormField>

                        <FormField label="Short Description" required error={errors.shortDescription} hint="This appears in event cards (max 150 characters)">
                            <input
                                type="text"
                                value={formData.shortDescription}
                                onChange={(e) => updateField('shortDescription', e.target.value.slice(0, 150))}
                                placeholder="Brief summary of your event"
                                maxLength={150}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-100/20"
                            />
                            <div className="text-right text-xs text-slate-400">
                                {formData.shortDescription.length}/150
                            </div>
                        </FormField>

                        <FormField label="Category" required error={errors.category}>
                            <select
                                value={formData.category}
                                onChange={(e) => updateField('category', e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-100/20 bg-white"
                            >
                                <option value="">Select a category</option>
                                {EVENT_CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </FormField>

                        <FormField label="Tags" hint="Add relevant tags to help people find your event">
                            <TagsInput
                                value={formData.tags}
                                onChange={(tags) => updateField('tags', tags)}
                                placeholder="Add tags like 'coding', 'beginner-friendly', etc."
                            />
                        </FormField>

                        <FormField label="Full Description" required>
                            <textarea
                                value={formData.description}
                                onChange={(e) => updateField('description', e.target.value)}
                                placeholder="Provide detailed information about your event..."
                                rows={8}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-100/20 resize-none"
                            />
                        </FormField>
                    </div>
                );

            // Step 3: Event Details
            case 2:
                return (
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Event Details</h2>
                            <p className="text-slate-500">When, where, and how much?</p>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Start Date & Time" required error={errors.date}>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="datetime-local"
                                        value={formData.date}
                                        onChange={(e) => updateField('date', e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-100/20"
                                    />
                                </div>
                            </FormField>

                            <FormField label="End Date & Time" required error={errors.endDate}>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="datetime-local"
                                        value={formData.endDate}
                                        onChange={(e) => updateField('endDate', e.target.value)}
                                        min={formData.date}
                                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-100/20"
                                    />
                                </div>
                            </FormField>
                        </div>

                        {/* Venue */}
                        <FormField label="Venue / Location" required error={errors.venue}>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                                <textarea
                                    value={formData.venue}
                                    onChange={(e) => updateField('venue', e.target.value)}
                                    placeholder="e.g., Main Auditorium, Block A, XYZ College"
                                    rows={2}
                                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-100/20 resize-none"
                                />
                            </div>
                        </FormField>

                        {/* Capacity & Fee */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="Registration Fee (₹)" error={errors.fee} hint="Set to 0 for free events">
                                <div className="relative">
                                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="number"
                                        value={formData.fee}
                                        onChange={(e) => updateField('fee', Math.max(0, parseInt(e.target.value) || 0))}
                                        min={0}
                                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-100/20"
                                    />
                                </div>
                            </FormField>

                            <FormField label="Maximum Capacity" required error={errors.capacity}>
                                <div className="relative">
                                    <Users2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="number"
                                        value={formData.capacity}
                                        onChange={(e) => updateField('capacity', Math.max(1, parseInt(e.target.value) || 1))}
                                        min={1}
                                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-100/20"
                                    />
                                </div>
                            </FormField>
                        </div>

                        {/* Template-specific fields */}
                        {selectedTemplate?.fields?.length > 0 && (
                            <div className="pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-brand-200" />
                                    {selectedTemplate.name} Details
                                </h3>
                                <div className="space-y-4">
                                    {selectedTemplate.fields.map((field) => (
                                        <FormField key={field.name} label={field.label}>
                                            {field.type === 'text' && (
                                                <input
                                                    type="text"
                                                    value={formData.templateFields[field.name] || ''}
                                                    onChange={(e) => updateTemplateField(field.name, e.target.value)}
                                                    placeholder={field.placeholder}
                                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-100/20"
                                                />
                                            )}
                                            {field.type === 'number' && (
                                                <input
                                                    type="number"
                                                    value={formData.templateFields[field.name] || field.default || ''}
                                                    onChange={(e) => updateTemplateField(field.name, e.target.value)}
                                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-100/20"
                                                />
                                            )}
                                            {field.type === 'select' && (
                                                <select
                                                    value={formData.templateFields[field.name] || field.default || ''}
                                                    onChange={(e) => updateTemplateField(field.name, e.target.value)}
                                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-100/20 bg-white"
                                                >
                                                    {field.options.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            )}
                                            {field.type === 'textarea' && (
                                                <textarea
                                                    value={formData.templateFields[field.name] || ''}
                                                    onChange={(e) => updateTemplateField(field.name, e.target.value)}
                                                    placeholder={field.placeholder}
                                                    rows={3}
                                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-200 focus:ring-4 focus:ring-brand-100/20 resize-none"
                                                />
                                            )}
                                            {field.type === 'toggle' && (
                                                <button
                                                    type="button"
                                                    onClick={() => updateTemplateField(field.name, !formData.templateFields[field.name])}
                                                    className={`relative w-12 h-6 rounded-full transition-colors ${formData.templateFields[field.name] !== false
                                                        ? 'bg-brand-200'
                                                        : 'bg-slate-200'
                                                        }`}
                                                >
                                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.templateFields[field.name] !== false
                                                        ? 'translate-x-7'
                                                        : 'translate-x-1'
                                                        }`} />
                                                </button>
                                            )}
                                            {field.type === 'tags' && (
                                                <TagsInput
                                                    value={formData.templateFields[field.name] || []}
                                                    onChange={(tags) => updateTemplateField(field.name, tags)}
                                                    placeholder={field.placeholder}
                                                />
                                            )}
                                        </FormField>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );

            // Step 4: Media & Preview
            case 3:
                return (
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Media & Preview</h2>
                            <p className="text-slate-500">Upload your event banner and review</p>
                        </div>

                        {/* Banner Upload */}
                        <BannerUpload
                            value={formData.bannerFile}
                            onChange={(file) => updateField('bannerFile', file)}
                            error={errors.bannerFile}
                        />

                        {/* Preview Card */}
                        <div className="pt-8 border-t border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Info className="w-5 h-5 text-brand-200" />
                                Event Preview
                            </h3>

                            <motion.div
                                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {/* Banner */}
                                <div className="h-48 bg-gradient-to-br from-brand-100 to-brand-200 relative">
                                    {formData.bannerFile && (
                                        <img
                                            src={URL.createObjectURL(formData.bannerFile)}
                                            alt="Event banner"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700">
                                            {formData.category || 'Category'}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${formData.fee > 0
                                            ? 'bg-amber-500 text-white'
                                            : 'bg-emerald-500 text-white'
                                            }`}>
                                            {formData.fee > 0 ? `₹${formData.fee}` : 'FREE'}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                                        {formData.title || 'Event Title'}
                                    </h4>
                                    <p className="text-slate-500 mb-4">
                                        {formData.shortDescription || 'Short description will appear here'}
                                    </p>

                                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-brand-200" />
                                            {formData.date
                                                ? new Date(formData.date).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })
                                                : 'Date TBD'}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-brand-200" />
                                            {formData.venue || 'Venue TBD'}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users2 className="w-4 h-4 text-brand-200" />
                                            {formData.capacity} spots
                                        </div>
                                    </div>

                                    {formData.tags.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {formData.tags.slice(0, 5).map((tag, i) => (
                                                <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/30 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Create New Event
                    </h1>
                    <p className="text-slate-500">
                        Fill in the details to publish your event
                    </p>
                </motion.div>

                {/* Step Indicator */}
                <StepIndicator currentStep={currentStep} steps={steps} />

                {/* Step Content */}
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-8"
                >
                    {renderStepContent()}
                </motion.div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${currentStep === 0
                            ? 'text-slate-300 cursor-not-allowed'
                            : 'text-slate-600 hover:bg-slate-100'
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Previous
                    </button>

                    <div className="text-sm text-slate-400">
                        Step {currentStep + 1} of {steps.length}
                    </div>

                    {currentStep < steps.length - 1 ? (
                        <motion.button
                            onClick={handleNext}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-100 to-brand-200 text-white rounded-xl font-medium shadow-lg shadow-brand-200/30"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Next
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    ) : (
                        <motion.button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-medium shadow-lg shadow-emerald-200/50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Check className="w-5 h-5" />
                            Create Event
                        </motion.button>
                    )}
                </div>
            </div>
        </div>
    );
}
