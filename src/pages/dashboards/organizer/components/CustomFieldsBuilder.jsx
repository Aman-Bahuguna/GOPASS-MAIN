import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    X,
    GripVertical,
    Type,
    AlignLeft,
    CheckSquare,
    Circle,
    List,
    Hash,
    Users,
    ChevronDown,
    ChevronUp,
    Copy,
    Trash2,
    Settings2,
} from 'lucide-react';

// Field type definitions
const FIELD_TYPES = [
    { id: 'text', label: 'Short Text', icon: Type, description: 'Single line text input', color: 'bg-blue-500' },
    { id: 'textarea', label: 'Long Text', icon: AlignLeft, description: 'Multi-line text area', color: 'bg-sky-500' },
    { id: 'number', label: 'Number', icon: Hash, description: 'Numeric input field', color: 'bg-amber-500' },
    { id: 'checkbox', label: 'Checkboxes', icon: CheckSquare, description: 'Multiple choice (select many)', color: 'bg-emerald-500' },
    { id: 'radio', label: 'Radio Buttons', icon: Circle, description: 'Single choice (select one)', color: 'bg-pink-500' },
    { id: 'dropdown', label: 'Dropdown', icon: List, description: 'Dropdown selection menu', color: 'bg-orange-500' },
    { id: 'team', label: 'Team Details', icon: Users, description: 'Team name & member count', color: 'bg-violet-500' },
];

// Color map for field type icon backgrounds (softer versions for cards)
const FIELD_COLORS = {
    text: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', accent: 'bg-blue-500' },
    textarea: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-600', accent: 'bg-sky-500' },
    number: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', accent: 'bg-amber-500' },
    checkbox: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', accent: 'bg-emerald-500' },
    radio: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-600', accent: 'bg-pink-500' },
    dropdown: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', accent: 'bg-orange-500' },
    team: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600', accent: 'bg-violet-500' },
};

// Generate unique IDs
const generateId = () => `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Default field template
const createField = (type) => {
    const base = {
        id: generateId(),
        type,
        label: '',
        required: false,
        placeholder: '',
    };

    switch (type) {
        case 'checkbox':
        case 'radio':
        case 'dropdown':
            return { ...base, options: ['Option 1', 'Option 2'] };
        case 'team':
            return {
                ...base,
                label: 'Team Details',
                teamConfig: {
                    minMembers: 2,
                    maxMembers: 5,
                    collectMemberNames: true,
                    collectMemberEmails: false,
                    collectMemberPhones: false,
                },
            };
        case 'number':
            return { ...base, min: '', max: '' };
        default:
            return base;
    }
};

// ————————————————————————
// Sub-component: Option Editor (for checkbox, radio, dropdown)
// ————————————————————————
const OptionEditor = ({ options, onChange, fieldType }) => {
    const colors = FIELD_COLORS[fieldType] || FIELD_COLORS.checkbox;

    const addOption = () => {
        onChange([...options, `Option ${options.length + 1}`]);
    };

    const removeOption = (index) => {
        if (options.length <= 1) return;
        onChange(options.filter((_, i) => i !== index));
    };

    const updateOption = (index, value) => {
        const updated = [...options];
        updated[index] = value;
        onChange(updated);
    };

    return (
        <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Options</label>
            <div className="space-y-2">
                {options.map((option, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-2.5"
                    >
                        <span className={`w-5 h-5 text-xs font-bold rounded-md ${colors.bg} ${colors.text} flex items-center justify-center flex-shrink-0`}>
                            {index + 1}
                        </span>
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => updateOption(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                            className="flex-1 px-3.5 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50/50 text-sm font-medium focus:border-brand-200 focus:bg-[#f7f8fa] focus:shadow-sm transition-all outline-none placeholder:text-slate-300"
                        />
                        <button
                            type="button"
                            onClick={() => removeOption(index)}
                            disabled={options.length <= 1}
                            className="p-2 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </motion.div>
                ))}
            </div>
            <motion.button
                type="button"
                onClick={addOption}
                className={`flex items-center gap-2 text-sm font-semibold ${colors.text} hover:opacity-80 transition-all mt-1 px-1`}
                whileHover={{ x: 3 }}
            >
                <Plus className="w-4 h-4" />
                Add Option
            </motion.button>
        </div>
    );
};

// ————————————————————————
// Sub-component: Team Config Editor
// ————————————————————————
const TeamConfigEditor = ({ config, onChange }) => {
    const updateConfig = (key, value) => {
        onChange({ ...config, [key]: value });
    };

    return (
        <div className="space-y-5">
            {/* Team Size Config */}
            <div className="bg-violet-50/60 rounded-xl p-4 border border-violet-100">
                <label className="text-xs font-bold text-violet-500 uppercase tracking-widest mb-3 flex items-center gap-2 block">
                    <Users className="w-3.5 h-3.5" />
                    Team Size
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Minimum</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={config.minMembers}
                                onChange={(e) => updateConfig('minMembers', parseInt(e.target.value) || 1)}
                                min="1"
                                max="50"
                                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-violet-100 bg-[#f7f8fa] text-sm font-semibold text-slate-700 focus:border-violet-300 focus:shadow-sm transition-all outline-none"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">members</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Maximum</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={config.maxMembers}
                                onChange={(e) => updateConfig('maxMembers', parseInt(e.target.value) || 2)}
                                min="1"
                                max="50"
                                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-violet-100 bg-[#f7f8fa] text-sm font-semibold text-slate-700 focus:border-violet-300 focus:shadow-sm transition-all outline-none"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">members</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Collect Info Toggles */}
            <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                    Collect from each member
                </label>
                <div className="space-y-2.5">
                    {[
                        { key: 'collectMemberNames', label: 'Full Name', desc: 'Name of each team member' },
                        { key: 'collectMemberEmails', label: 'Email Address', desc: 'Email for communication' },
                        { key: 'collectMemberPhones', label: 'Phone Number', desc: 'Contact number' },
                    ].map(({ key, label, desc }) => (
                        <label
                            key={key}
                            className={`flex items-center gap-3.5 cursor-pointer p-3 rounded-xl border-2 transition-all ${config[key]
                                ? 'border-brand-200/30 bg-brand-200/5'
                                : 'border-transparent hover:bg-[#f7f8fa] hover:border-slate-200'
                                }`}
                        >
                            <div className="relative flex-shrink-0">
                                <input
                                    type="checkbox"
                                    checked={config[key]}
                                    onChange={(e) => updateConfig(key, e.target.checked)}
                                    className="sr-only"
                                />
                                <div
                                    className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${config[key]
                                        ? 'bg-brand-200 border-brand-200 shadow-sm shadow-brand-200/30'
                                        : 'border-slate-300 bg-white'
                                        }`}
                                >
                                    {config[key] && (
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="text-sm font-semibold text-slate-700">{label}</span>
                                <p className="text-xs text-slate-400">{desc}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ————————————————————————
// Sub-component: Single Field Card
// ————————————————————————
const FieldCard = ({ field, onUpdate, onDelete, onDuplicate }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const fieldType = FIELD_TYPES.find((t) => t.id === field.type);
    const Icon = fieldType?.icon || Type;
    const colors = FIELD_COLORS[field.type] || FIELD_COLORS.text;

    const updateField = (key, value) => {
        onUpdate(field.id, { ...field, [key]: value });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="bg-[#f7f8fa] rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group overflow-hidden"
        >
            {/* Colored Top Accent Bar */}
            <div className={`h-1 w-full ${fieldType?.color || 'bg-slate-300'}`} />

            {/* Field Header */}
            <div className="flex items-center gap-3 px-5 py-3.5">
                <div className="cursor-grab text-slate-200 hover:text-slate-400 transition-colors active:cursor-grabbing">
                    <GripVertical className="w-5 h-5" />
                </div>

                <div className={`w-9 h-9 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0 ring-2 ring-white shadow-sm`}>
                    <Icon className={`w-4.5 h-4.5 ${colors.text}`} />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-bold uppercase tracking-widest ${colors.text}`}>
                            {fieldType?.label}
                        </span>
                        {field.required && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-1.5 py-0.5 rounded-md">
                                Required
                            </span>
                        )}
                    </div>
                    {field.label && (
                        <p className="text-sm text-slate-800 font-semibold truncate mt-0.5">{field.label}</p>
                    )}
                </div>

                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        type="button"
                        onClick={() => onDuplicate(field)}
                        className="p-2 rounded-lg text-slate-300 hover:text-blue-500 hover:bg-blue-50 transition-all"
                        title="Duplicate field"
                    >
                        <Copy className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete(field.id)}
                        className="p-2 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                        title="Delete field"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`p-2 rounded-lg transition-all ${isExpanded ? 'text-slate-500 bg-slate-100' : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'}`}
                >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
            </div>

            {/* Field Body */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 pt-2 space-y-5 border-t border-slate-200">
                            {/* Field Label */}
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                                    Field Label
                                </label>
                                <input
                                    type="text"
                                    value={field.label}
                                    onChange={(e) => updateField('label', e.target.value)}
                                    placeholder="e.g., College Name, Year of Study..."
                                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50/50 text-sm font-medium focus:border-brand-200 focus:bg-[#f7f8fa] focus:shadow-md focus:shadow-brand-200/10 transition-all outline-none placeholder:text-slate-300"
                                />
                            </div>

                            {/* Placeholder (for text/number types) */}
                            {['text', 'textarea', 'number'].includes(field.type) && (
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                                        Placeholder Text
                                    </label>
                                    <input
                                        type="text"
                                        value={field.placeholder}
                                        onChange={(e) => updateField('placeholder', e.target.value)}
                                        placeholder="Hint text for participants..."
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50/50 text-sm font-medium focus:border-brand-200 focus:bg-[#f7f8fa] focus:shadow-md focus:shadow-brand-200/10 transition-all outline-none placeholder:text-slate-300"
                                    />
                                </div>
                            )}

                            {/* Number min/max */}
                            {field.type === 'number' && (
                                <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100">
                                    <label className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2 block">
                                        <Hash className="w-3.5 h-3.5" />
                                        Value Range
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Min Value</label>
                                            <input
                                                type="number"
                                                value={field.min}
                                                onChange={(e) => updateField('min', e.target.value)}
                                                placeholder="No min"
                                                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-100 bg-[#f7f8fa] text-sm font-semibold text-slate-700 focus:border-amber-300 focus:shadow-sm transition-all outline-none placeholder:text-slate-300 placeholder:font-normal"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Max Value</label>
                                            <input
                                                type="number"
                                                value={field.max}
                                                onChange={(e) => updateField('max', e.target.value)}
                                                placeholder="No max"
                                                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-100 bg-[#f7f8fa] text-sm font-semibold text-slate-700 focus:border-amber-300 focus:shadow-sm transition-all outline-none placeholder:text-slate-300 placeholder:font-normal"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Options (for checkbox, radio, dropdown) */}
                            {['checkbox', 'radio', 'dropdown'].includes(field.type) && (
                                <OptionEditor
                                    options={field.options}
                                    onChange={(options) => updateField('options', options)}
                                    fieldType={field.type}
                                />
                            )}

                            {/* Team Config */}
                            {field.type === 'team' && (
                                <TeamConfigEditor
                                    config={field.teamConfig}
                                    onChange={(config) => updateField('teamConfig', config)}
                                />
                            )}

                            {/* Required Toggle */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                                <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={field.required}
                                            onChange={(e) => updateField('required', e.target.checked)}
                                            className="sr-only"
                                        />
                                        <div
                                            className={`w-11 h-6 rounded-full transition-all duration-300 ${field.required
                                                ? 'bg-brand-200 shadow-md shadow-brand-200/30'
                                                : 'bg-slate-200'
                                                }`}
                                        >
                                            <motion.div
                                                className="w-5 h-5 rounded-full bg-[#f7f8fa] shadow-sm absolute top-0.5"
                                                animate={{ x: field.required ? 22 : 2 }}
                                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-sm font-semibold text-slate-700">Required field</span>
                                        <p className="text-xs text-slate-400">
                                            {field.required ? 'Participants must fill this field' : 'This field is optional'}
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// ————————————————————————
// Main Component: CustomFieldsBuilder
// ————————————————————————
const CustomFieldsBuilder = ({ fields, onChange }) => {
    const [showAddMenu, setShowAddMenu] = useState(false);

    const addField = (type) => {
        const newField = createField(type);
        onChange([...fields, newField]);
        setShowAddMenu(false);
    };

    const updateField = (fieldId, updatedField) => {
        onChange(fields.map((f) => (f.id === fieldId ? updatedField : f)));
    };

    const deleteField = (fieldId) => {
        onChange(fields.filter((f) => f.id !== fieldId));
    };

    const duplicateField = (field) => {
        const newField = { ...field, id: generateId(), label: `${field.label} (Copy)` };
        if (field.options) {
            newField.options = [...field.options];
        }
        if (field.teamConfig) {
            newField.teamConfig = { ...field.teamConfig };
        }
        const index = fields.findIndex((f) => f.id === field.id);
        const updated = [...fields];
        updated.splice(index + 1, 0, newField);
        onChange(updated);
    };

    return (
        <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-violet-200/30 shadow-sm">
            {/* Section Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center shadow-lg shadow-violet-300/30">
                        <Settings2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">
                            Custom Registration Fields
                        </h3>
                        <p className="text-sm text-slate-500">
                            Collect additional info from participants — team details, preferences, etc.
                        </p>
                    </div>
                </div>
            </div>

            {/* Existing Fields */}
            <AnimatePresence mode="popLayout">
                {fields.length > 0 && (
                    <motion.div layout className="space-y-4 mb-6">
                        {fields.map((field) => (
                            <FieldCard
                                key={field.id}
                                field={field}
                                onUpdate={updateField}
                                onDelete={deleteField}
                                onDuplicate={duplicateField}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Empty State */}
            {fields.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10 border-2 border-dashed border-violet-200/60 rounded-2xl mb-6 bg-[#f7f8fa]/60 backdrop-blur-sm"
                >
                    <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-4 shadow-sm"
                    >
                        <Plus className="w-7 h-7 text-violet-400" />
                    </motion.div>
                    <p className="font-bold text-slate-700 mb-1 text-base">No custom fields yet</p>
                    <p className="text-sm text-slate-400 max-w-xs mx-auto">
                        Add fields like team details, checkboxes, dropdowns and more for your registration form.
                    </p>
                </motion.div>
            )}

            {/* Add Field Button */}
            <div className="relative">
                <motion.button
                    type="button"
                    onClick={() => setShowAddMenu(!showAddMenu)}
                    className={`w-full flex items-center justify-center gap-2.5 px-5 py-4 rounded-xl font-bold text-sm transition-all ${showAddMenu
                        ? 'text-white bg-violet-500 shadow-lg shadow-violet-300/40'
                        : 'text-violet-600 bg-[#f7f8fa] border-2 border-violet-200/60 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/50'
                        }`}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                >
                    <Plus className="w-5 h-5" />
                    Add Custom Field
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAddMenu ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* Add Field Dropdown Menu */}
                <AnimatePresence>
                    {showAddMenu && (
                        <>
                            {/* Backdrop */}
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowAddMenu(false)}
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className="absolute left-0 right-0 bottom-full mb-2 bg-[#f7f8fa] rounded-2xl border border-slate-200 shadow-2xl shadow-slate-300/40 z-20 overflow-hidden"
                            >
                                <div className="p-2">
                                    <div className="px-3 py-2.5 mb-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            Choose Field Type
                                        </p>
                                    </div>
                                    <div className="space-y-0.5">
                                        {FIELD_TYPES.map((type) => {
                                            const FieldIcon = type.icon;
                                            const colors = FIELD_COLORS[type.id];
                                            return (
                                                <motion.button
                                                    key={type.id}
                                                    type="button"
                                                    onClick={() => addField(type.id)}
                                                    className="w-full flex items-center gap-3.5 px-3 py-3 rounded-xl hover:bg-slate-50 transition-all text-left group/item"
                                                    whileHover={{ x: 3 }}
                                                >
                                                    <div className={`w-9 h-9 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0 ring-1 ring-inset ring-black/5 group-hover/item:shadow-md transition-shadow`}>
                                                        <FieldIcon className={`w-4.5 h-4.5 ${colors.text}`} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-bold text-slate-800">{type.label}</p>
                                                        <p className="text-xs text-slate-400">{type.description}</p>
                                                    </div>
                                                    <Plus className="w-4 h-4 text-slate-200 group-hover/item:text-slate-400 transition-colors" />
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* Field Count Badge */}
            {fields.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-5 flex items-center justify-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200/50">
                        <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                        <span className="text-xs font-bold text-violet-600">
                            {fields.length} custom {fields.length === 1 ? 'field' : 'fields'} added
                        </span>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default CustomFieldsBuilder;
