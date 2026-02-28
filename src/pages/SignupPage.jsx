import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, Lock, Eye, EyeOff, UserPlus, User, Sparkles, Shield,
    ArrowRight, CheckCircle2, Calendar, Users, Zap, ArrowLeft,
    Home, Crown, Building2
} from 'lucide-react';
import CollegeVerificationStep from '../components/auth/CollegeVerificationStep';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../utils/constants';
import { validateStep3 } from '../utils/validators';
import { sendPlatformVerificationRequest } from '../services/emailService';

// Lightweight CSS-only animated background (replaces Three.js Canvas)
function AnimatedBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Animated gradient mesh blobs */}
            <div className="signup-blob signup-blob-1" />
            <div className="signup-blob signup-blob-2" />
            <div className="signup-blob signup-blob-3" />

            {/* Floating particles via CSS */}
            <div className="signup-particles">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="signup-particle"
                        style={{
                            '--x': `${Math.random() * 100}%`,
                            '--y': `${Math.random() * 100}%`,
                            '--size': `${2 + Math.random() * 4}px`,
                            '--duration': `${6 + Math.random() * 10}s`,
                            '--delay': `${Math.random() * -15}s`,
                        }}
                    />
                ))}
            </div>

            {/* Subtle grid pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
                <defs>
                    <pattern id="signupGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#signupGrid)" />
            </svg>
        </div>
    );
}

/* Inline styles for the CSS-only animations — injected once */
const animationStyles = `
.signup-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.5;
    will-change: transform;
}
.signup-blob-1 {
    width: 380px; height: 380px;
    background: radial-gradient(circle, rgba(85, 150, 230, 0.5), transparent 70%);
    top: -8%; left: -5%;
    animation: signupBlobFloat1 14s ease-in-out infinite;
}
.signup-blob-2 {
    width: 320px; height: 320px;
    background: radial-gradient(circle, rgba(65, 214, 195, 0.45), transparent 70%);
    bottom: -5%; right: -5%;
    animation: signupBlobFloat2 12s ease-in-out infinite;
}
.signup-blob-3 {
    width: 260px; height: 260px;
    background: radial-gradient(circle, rgba(61, 112, 178, 0.35), transparent 70%);
    top: 35%; right: 25%;
    animation: signupBlobFloat3 11s ease-in-out infinite;
}
@keyframes signupBlobFloat1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(25px, 15px) scale(1.1); }
    66% { transform: translate(-20px, -10px) scale(0.95); }
}
@keyframes signupBlobFloat2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-20px, -15px) scale(1.12); }
    66% { transform: translate(15px, 10px) scale(0.92); }
}
@keyframes signupBlobFloat3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-18px, 20px) scale(1.15); }
}
.signup-particles {
    position: absolute; inset: 0;
}
.signup-particle {
    position: absolute;
    left: var(--x); top: var(--y);
    width: var(--size); height: var(--size);
    background: rgba(255,255,255,0.7);
    border-radius: 50%;
    animation: signupParticleFloat var(--duration) ease-in-out var(--delay) infinite;
    will-change: transform, opacity;
}
@keyframes signupParticleFloat {
    0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
    50% { transform: translateY(-25px) scale(1.3); opacity: 0.8; }
}
`;

// Benefit Item
function BenefitItem({ icon: Icon, title, description, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="flex gap-4"
        >
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-brand-300" />
            </div>
            <div>
                <h3 className="text-white font-semibold mb-1">{title}</h3>
                <p className="text-white/70 text-sm">{description}</p>
            </div>
        </motion.div>
    );
}

// Role Selection Card
function RoleCard({ role, icon: Icon, description, selected, onClick }) {
    return (
        <motion.button
            type="button"
            onClick={() => onClick(role)}
            className={`relative p-3 rounded-xl border-2 transition-all ${selected
                ? 'border-brand-200 bg-brand-50 shadow-lg shadow-brand-200/20'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selected ? 'bg-brand-200 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className="text-center">
                    <span className={`font-bold text-sm block ${selected ? 'text-brand-200' : 'text-slate-900'}`}>
                        {role}
                    </span>
                    <span className="text-xs text-slate-500 leading-tight">{description}</span>
                </div>
            </div>
            {selected && (
                <motion.div
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-200 rounded-full flex items-center justify-center shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                >
                    <CheckCircle2 className="w-3 h-3 text-white" />
                </motion.div>
            )}
        </motion.button>
    );
}

export default function SignupPage({ onNavigateToLogin, onNavigateToHome, onSignupSuccess }) {
    const { signup } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'USER',
        // College verification fields (for Admin/Organizer)
        position: '',
        collegeName: '',
        collegeState: '',
        pincode: '',
        idCardFile: null,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // Determine total steps based on role
    const needsCollegeVerification = formData.role === ROLES.ADMIN || formData.role === ROLES.ORGANIZER;
    const totalSteps = needsCollegeVerification ? 3 : 2;

    const roles = [
        { role: 'STUDENT', icon: User, description: 'Attend & explore events' },
        { role: 'ORGANIZER', icon: Shield, description: 'Create & manage events' },
        { role: 'ADMIN', icon: Crown, description: 'Full system control' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleRoleChange = (role) => {
        setFormData((prev) => ({ ...prev, role }));
        if (errors.role) {
            setErrors((prev) => ({ ...prev, role: '' }));
        }
    };

    const handleCollegeDataChange = (collegeData) => {
        setFormData((prev) => ({ ...prev, ...collegeData }));
        // Clear related errors
        const newErrors = { ...errors };
        Object.keys(collegeData).forEach(key => {
            if (newErrors[key]) delete newErrors[key];
        });
        setErrors(newErrors);
    };

    const validateStep1 = () => {
        const newErrors = {};

        if (!formData.fullName) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.length < 2) {
            newErrors.fullName = 'Name must be at least 2 characters';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.role) {
            newErrors.role = 'Please select a role';
        }

        if (!agreedToTerms) {
            newErrors.terms = 'You must agree to the terms';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateCurrentStep = () => {
        if (currentStep === 1) return validateStep1();
        if (currentStep === 2) return validateStep2();
        if (currentStep === 3) {
            const step3Errors = validateStep3(formData);
            setErrors(step3Errors);
            return Object.keys(step3Errors).length === 0;
        }
        return false;
    };

    const handleNext = () => {
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentStep < totalSteps) {
            handleNext();
            return;
        }

        if (!validateCurrentStep()) return;

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            const userData = {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                ...(needsCollegeVerification && {
                    position: formData.position,
                    collegeName: formData.collegeName,
                    collegeState: formData.collegeState,
                    pincode: formData.pincode,
                    idCardFileName: formData.idCardFile?.name,
                }),
            };

            console.log('Signup submitted:', userData);

            // Send verification emails only for Admin (requires platform verification)
            // Organizer accounts are active immediately (but need admin approval to create events)
            if (formData.role === ROLES.ADMIN) {
                await sendPlatformVerificationRequest(userData);
                console.log('Platform verification request sent for Admin!');
            }

            // Call AuthContext signup to create the user
            const signupResult = await signup(formData);

            if (!signupResult.success) {
                throw new Error(signupResult.error || 'Signup failed');
            }

            console.log('User created successfully:', signupResult.user);

            // Call success callback if provided
            if (onSignupSuccess) {
                onSignupSuccess(formData);
            }
        } catch (error) {
            console.error('Signup error:', error);
            setErrors({ submit: error.message || 'Registration failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const getStepLabel = (step) => {
        if (step === 1) return 'Basic Info';
        if (step === 2) return 'Security & Role';
        if (step === 3) return 'College Verification';
        return '';
    };

    return (
        <div className="min-h-screen relative flex">
            {/* Inject lightweight CSS animations */}
            <style>{animationStyles}</style>

            {/* Left Panel - Marketing/Visual Section */}
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-brand-300 via-brand-200 to-brand-100 p-12 flex-col justify-between overflow-hidden"
            >
                {/* CSS Animated Background (replaces Three.js) */}
                <AnimatedBackground />

                {/* Dark overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-900/20 to-transparent z-[1]" />

                {/* Content */}
                <div className="relative z-10">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-16"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-3xl font-bold text-white font-serif">GoPass</span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <h1 className="text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                            Join the Future of<br />Event Management
                        </h1>
                        <p className="text-xl text-white max-w-md drop-shadow-md" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.3)' }}>
                            Create your account and unlock access to thousands of exciting events and opportunities.
                        </p>
                    </motion.div>

                    {/* Benefits */}
                    <div className="space-y-6 mb-12">
                        <BenefitItem
                            icon={Calendar}
                            title="Unlimited Access"
                            description="Browse and book unlimited events across all categories"
                            delay={0.4}
                        />
                        <BenefitItem
                            icon={Users}
                            title="Community Network"
                            description="Connect with like-minded individuals and organizations"
                            delay={0.5}
                        />
                        <BenefitItem
                            icon={Zap}
                            title="Instant Booking"
                            description="Quick registration with digital passes sent instantly"
                            delay={0.6}
                        />
                        <BenefitItem
                            icon={Shield}
                            title="Safe & Secure"
                            description="Your data is protected with enterprise-grade security"
                            delay={0.7}
                        />
                    </div>
                </div>

                {/* Bottom Decoration */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="relative z-10 text-white/60 text-sm"
                >
                    © 2026 GoPass. All rights reserved.
                </motion.div>

                {/* Floating Orbs (CSS-driven for performance) */}
                <div
                    className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                    style={{ animation: 'signupBlobFloat1 8s ease-in-out infinite' }}
                />
                <div
                    className="absolute bottom-20 left-20 w-96 h-96 bg-brand-300/20 rounded-full blur-3xl"
                    style={{ animation: 'signupBlobFloat2 10s ease-in-out infinite' }}
                />
            </motion.div>

            {/* Right Panel - Form Section */}
            <div className="w-full lg:w-1/2 h-screen overflow-y-auto bg-white relative">
                <div className="min-h-full flex flex-col items-center p-6 lg:p-12">
                    {/* Back to Home Button */}
                    <motion.button
                        onClick={onNavigateToHome}
                        className="fixed lg:absolute top-6 left-6 flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-brand-200 transition-colors group z-50 bg-white/80 backdrop-blur-sm rounded-lg lg:bg-transparent"
                        whileHover={{ x: -3 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold hidden sm:inline">Back to Home</span>
                        <Home className="w-4 h-4 sm:hidden" />
                    </motion.button>

                    {/* Mobile Logo */}
                    <div className="lg:hidden fixed top-6 right-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 z-50">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-100 to-brand-300 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-slate-900 font-serif">GoPass</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        className="w-full max-w-md mt-20 lg:mt-8 pb-8"
                    >
                        {/* Form Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <h2 className="text-4xl font-bold text-slate-900 mb-2">Create Account</h2>
                            <p className="text-slate-600 text-lg">Start your event journey today</p>
                        </motion.div>

                        {/* Progress Indicator */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                                    <div key={step} className="flex items-center flex-1">
                                        <div className="flex items-center gap-2 flex-1">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step === currentStep
                                                ? 'bg-brand-200 text-white shadow-lg shadow-brand-200/50'
                                                : step < currentStep
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-slate-200 text-slate-400'
                                                }`}>
                                                {step < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step}
                                            </div>
                                            <div className="flex-1">
                                                <div className={`text-xs font-semibold ${step === currentStep ? 'text-brand-200' : step < currentStep ? 'text-green-500' : 'text-slate-400'
                                                    }`}>
                                                    {getStepLabel(step)}
                                                </div>
                                            </div>
                                        </div>
                                        {step < totalSteps && (
                                            <div className={`h-0.5 w-8 mx-2 transition-all ${currentStep > step ? 'bg-green-500' : 'bg-slate-200'
                                                }`} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Signup Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <AnimatePresence mode="wait">
                                {currentStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className="space-y-5"
                                    >
                                        {/* Full Name Field */}
                                        <div>
                                            <label className="block text-slate-700 font-semibold mb-2">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-200 focus:bg-white transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <AnimatePresence>
                                                {errors.fullName && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0 }}
                                                        className="text-red-500 text-sm mt-1.5 font-medium"
                                                    >
                                                        {errors.fullName}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Email Field */}
                                        <div>
                                            <label className="block text-slate-700 font-semibold mb-2">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-200 focus:bg-white transition-all"
                                                    placeholder="your.email@example.com"
                                                />
                                            </div>
                                            <AnimatePresence>
                                                {errors.email && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0 }}
                                                        className="text-red-500 text-sm mt-1.5 font-medium"
                                                    >
                                                        {errors.email}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className="space-y-5"
                                    >
                                        {/* Password Field */}
                                        <div>
                                            <label className="block text-slate-700 font-semibold mb-2">Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-200 focus:bg-white transition-all"
                                                    placeholder="••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                            <AnimatePresence>
                                                {errors.password && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0 }}
                                                        className="text-red-500 text-sm mt-1.5 font-medium"
                                                    >
                                                        {errors.password}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Confirm Password Field */}
                                        <div>
                                            <label className="block text-slate-700 font-semibold mb-2">Confirm Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-200 focus:bg-white transition-all"
                                                    placeholder="••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                            <AnimatePresence>
                                                {errors.confirmPassword && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0 }}
                                                        className="text-red-500 text-sm mt-1.5 font-medium"
                                                    >
                                                        {errors.confirmPassword}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Role Selection */}
                                        <div>
                                            <label className="block text-slate-700 font-semibold mb-3">Account Type</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {roles.map((roleData) => (
                                                    <RoleCard
                                                        key={roleData.role}
                                                        {...roleData}
                                                        selected={formData.role === roleData.role}
                                                        onClick={handleRoleChange}
                                                    />
                                                ))}
                                            </div>
                                            <AnimatePresence>
                                                {errors.role && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0 }}
                                                        className="text-red-500 text-sm mt-1.5 font-medium"
                                                    >
                                                        {errors.role}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>

                                            {/* Role-specific notices */}
                                            {formData.role === ROLES.ORGANIZER && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                                                >
                                                    <p className="text-sm text-blue-700">
                                                        <strong>Note:</strong> Organizers need to complete college verification
                                                        and get approval from their college admin before creating events.
                                                    </p>
                                                </motion.div>
                                            )}
                                            {formData.role === ROLES.ADMIN && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg"
                                                >
                                                    <p className="text-sm text-purple-700">
                                                        <strong>Note:</strong> Admin accounts are for Professors, HODs, and Deans only.
                                                        College verification is required.
                                                    </p>
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* Terms Checkbox */}
                                        <div>
                                            <label className="flex items-start gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={agreedToTerms}
                                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                                    className="w-5 h-5 mt-0.5 rounded border-2 border-slate-300 text-brand-200 focus:ring-2 focus:ring-brand-200 cursor-pointer"
                                                />
                                                <span className="text-slate-600 text-sm group-hover:text-slate-900 transition-colors">
                                                    I agree to the{' '}
                                                    <a href="#" className="text-brand-200 hover:text-brand-100 font-semibold">
                                                        Terms of Service
                                                    </a>
                                                    {' '}and{' '}
                                                    <a href="#" className="text-brand-200 hover:text-brand-100 font-semibold">
                                                        Privacy Policy
                                                    </a>
                                                </span>
                                            </label>
                                            <AnimatePresence>
                                                {errors.terms && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0 }}
                                                        className="text-red-500 text-sm mt-1.5 font-medium"
                                                    >
                                                        {errors.terms}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 3 && needsCollegeVerification && (
                                    <CollegeVerificationStep
                                        key="step3"
                                        formData={formData}
                                        onChange={handleCollegeDataChange}
                                        errors={errors}
                                        role={formData.role}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                {currentStep > 1 && (
                                    <motion.button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-6 py-4 border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        style={{ minWidth: '120px' }}
                                    >
                                        Back
                                    </motion.button>
                                )}
                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 bg-gradient-to-r from-brand-100 via-brand-200 to-brand-300 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-brand-200/50 transition-all disabled:opacity-50 group relative overflow-hidden"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {isLoading ? (
                                            <motion.div
                                                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            />
                                        ) : currentStep < totalSteps ? (
                                            <>
                                                Next Step
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus className="w-5 h-5 flex-shrink-0" />
                                                <span>{needsCollegeVerification ? 'Submit for Verification' : 'Create Account'}</span>
                                            </>
                                        )}
                                    </span>

                                    {/* Shine effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '100%' }}
                                        transition={{ duration: 0.6 }}
                                    />
                                </motion.button>
                            </div>
                        </form>

                        {/* Login Link */}
                        <motion.div
                            className="mt-8 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <p className="text-slate-600">
                                Already have an account?{' '}
                                <motion.button
                                    onClick={onNavigateToLogin}
                                    className="relative text-brand-200 hover:text-brand-100 font-bold transition-colors inline-flex items-center gap-1 group"
                                    whileHover={{ x: 2, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.span
                                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-100 to-brand-300"
                                        initial={{ width: 0 }}
                                        whileHover={{ width: '100%' }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <span className="relative">Sign In</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </p>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500"
                        >
                            <div className="flex items-center gap-1.5">
                                <Shield className="w-4 h-4" />
                                <span>256-bit Encryption</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>GDPR Compliant</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
