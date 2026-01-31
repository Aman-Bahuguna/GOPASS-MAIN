import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2,
    MapPin,
    Hash,
    Upload,
    X,
    Check,
    AlertCircle,
    FileImage,
    Briefcase,
    GraduationCap,
    UserCog
} from 'lucide-react';
import { INDIAN_STATES, FILE_UPLOAD, ADMIN_POSITIONS, ORGANIZER_POSITIONS, ROLES } from '../../utils/constants';
import { formatFileSize } from '../../utils/validators';

// Position selector component
function PositionSelector({ role, value, onChange, error }) {
    const positions = role === ROLES.ADMIN ? ADMIN_POSITIONS : ORGANIZER_POSITIONS;

    return (
        <div>
            <label className="block text-slate-700 font-semibold mb-3">
                Your Position
                <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {positions.map((pos) => (
                    <motion.button
                        key={pos.value}
                        type="button"
                        onClick={() => onChange(pos.value)}
                        className={`relative p-4 rounded-xl border-2 transition-all ${value === pos.value
                                ? 'border-brand-200 bg-brand-50 shadow-md'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${value === pos.value ? 'bg-brand-200 text-white' : 'bg-slate-100 text-slate-600'
                                }`}>
                                {role === ROLES.ADMIN ? (
                                    <UserCog className="w-5 h-5" />
                                ) : pos.value === 'TEACHER' ? (
                                    <Briefcase className="w-5 h-5" />
                                ) : (
                                    <GraduationCap className="w-5 h-5" />
                                )}
                            </div>
                            <span className={`font-semibold text-sm ${value === pos.value ? 'text-brand-200' : 'text-slate-700'
                                }`}>
                                {pos.label}
                            </span>
                        </div>
                        {value === pos.value && (
                            <motion.div
                                className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 500 }}
                            >
                                <Check className="w-3 h-3 text-white" />
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </div>
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    >
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

// File upload component with drag & drop
function FileUploadZone({ file, onFileChange, error }) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFileSelect(droppedFile);
        }
    }, []);

    const handleFileSelect = (selectedFile) => {
        onFileChange(selectedFile);

        // Create preview
        if (selectedFile && FILE_UPLOAD.ALLOWED_TYPES.includes(selectedFile.type)) {
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleInputChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            handleFileSelect(selectedFile);
        }
    };

    const removeFile = () => {
        onFileChange(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const getSizeStatus = () => {
        if (!file) return null;

        const isValid = file.size >= FILE_UPLOAD.MIN_SIZE_BYTES && file.size <= FILE_UPLOAD.MAX_SIZE_BYTES;
        return {
            isValid,
            message: isValid
                ? `${formatFileSize(file.size)} ✓`
                : file.size < FILE_UPLOAD.MIN_SIZE_BYTES
                    ? `Too small (min ${FILE_UPLOAD.MIN_SIZE_MB}MB)`
                    : `Too large (max ${FILE_UPLOAD.MAX_SIZE_MB}MB)`,
        };
    };

    const sizeStatus = getSizeStatus();

    return (
        <div>
            <label className="block text-slate-700 font-semibold mb-3">
                College ID Card
                <span className="text-red-500 ml-1">*</span>
            </label>

            {!file ? (
                <motion.div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging
                            ? 'border-brand-200 bg-brand-50'
                            : error
                                ? 'border-red-300 bg-red-50'
                                : 'border-slate-300 hover:border-brand-200 hover:bg-slate-50'
                        }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={FILE_UPLOAD.ALLOWED_TYPES.join(',')}
                        onChange={handleInputChange}
                        className="hidden"
                    />

                    <div className="flex flex-col items-center gap-3">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDragging ? 'bg-brand-200 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                            <Upload className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="font-semibold text-slate-700">
                                {isDragging ? 'Drop your file here' : 'Drag & drop your ID card'}
                            </p>
                            <p className="text-sm text-slate-500 mt-1">
                                or click to browse
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <FileImage className="w-4 h-4" />
                            <span>JPG, PNG, WebP • {FILE_UPLOAD.MIN_SIZE_MB}MB - {FILE_UPLOAD.MAX_SIZE_MB}MB</span>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative border-2 border-slate-200 rounded-xl p-4 bg-white"
                >
                    <div className="flex items-start gap-4">
                        {preview && (
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                                <img src={preview} alt="ID Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-900 truncate">{file.name}</p>
                            <p className={`text-sm mt-1 ${sizeStatus?.isValid ? 'text-green-600' : 'text-red-500'}`}>
                                {sizeStatus?.message}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">{file.type}</p>
                        </div>
                        <button
                            type="button"
                            onClick={removeFile}
                            className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}

            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    >
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>

            <p className="text-xs text-slate-500 mt-3">
                📋 Your ID card will be verified by our platform team. This usually takes 24-48 hours.
            </p>
        </div>
    );
}

// Main College Verification Step Component
export default function CollegeVerificationStep({
    formData,
    onChange,
    errors,
    role
}) {
    const handleChange = (field, value) => {
        onChange({ ...formData, [field]: value });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
        >
            {/* Info Banner */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-brand-100/10 to-brand-300/10 border border-brand-200/30 rounded-xl p-4"
            >
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-200/20 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-brand-200" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-900">College Verification Required</h4>
                        <p className="text-sm text-slate-600 mt-1">
                            {role === ROLES.ADMIN
                                ? 'As an Admin, you need to verify your college credentials. Only Professors, HODs, and Deans can create admin accounts.'
                                : 'As an Organizer, you need to verify your college credentials. After verification, your college admin will need to approve your account.'}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Position Selection */}
            <PositionSelector
                role={role}
                value={formData.position}
                onChange={(value) => handleChange('position', value)}
                error={errors?.position}
            />

            {/* College Name */}
            <div>
                <label className="block text-slate-700 font-semibold mb-2">
                    College Name
                    <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        value={formData.collegeName || ''}
                        onChange={(e) => handleChange('collegeName', e.target.value)}
                        className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${errors?.collegeName ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-brand-200'
                            }`}
                        placeholder="XYZ Engineering College"
                    />
                </div>
                <AnimatePresence>
                    {errors?.collegeName && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-red-500 text-sm mt-1.5"
                        >
                            {errors.collegeName}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* State and Pincode Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* State */}
                <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                        State
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
                        <select
                            value={formData.collegeState || ''}
                            onChange={(e) => handleChange('collegeState', e.target.value)}
                            className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 rounded-xl text-slate-900 focus:outline-none focus:bg-white transition-all appearance-none cursor-pointer ${errors?.collegeState ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-brand-200'
                                } ${!formData.collegeState ? 'text-slate-400' : ''}`}
                        >
                            <option value="">Select State</option>
                            {INDIAN_STATES.map((state) => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                    <AnimatePresence>
                        {errors?.collegeState && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-red-500 text-sm mt-1.5"
                            >
                                {errors.collegeState}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pincode */}
                <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                        Pincode
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={formData.pincode || ''}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                handleChange('pincode', value);
                            }}
                            className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${errors?.pincode ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-brand-200'
                                }`}
                            placeholder="400001"
                            maxLength={6}
                        />
                    </div>
                    <AnimatePresence>
                        {errors?.pincode && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-red-500 text-sm mt-1.5"
                            >
                                {errors.pincode}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* File Upload */}
            <FileUploadZone
                file={formData.idCardFile}
                onFileChange={(file) => handleChange('idCardFile', file)}
                error={errors?.idCardFile}
            />
        </motion.div>
    );
}
