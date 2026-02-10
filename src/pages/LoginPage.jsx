import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Stars, Cylinder } from '@react-three/drei';
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles, ArrowRight, Calendar, Users, Zap, Shield, CheckCircle2, ArrowLeft, Home } from 'lucide-react';
import gsap from 'gsap';
import { useAuth } from '../context/AuthContext';

// 3D DNA Helix Structure
function DNAHelix() {
    const groupRef = useRef();

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.3;
        }
    });

    const helixPoints = [];
    const count = 20;

    for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 4;
        const x = Math.cos(t) * 1.5;
        const y = (i / count) * 8 - 4;
        const z = Math.sin(t) * 1.5;
        helixPoints.push({ x, y, z, t });
    }

    return (
        <group ref={groupRef}>
            {helixPoints.map((point, i) => (
                <Float key={i} speed={2 + i * 0.1} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Sphere position={[point.x, point.y, point.z]} args={[0.15, 32, 32]}>
                        <meshStandardMaterial
                            color="#5596e6"
                            metalness={0.8}
                            roughness={0.2}
                            emissive="#41d6c3"
                            emissiveIntensity={0.3}
                        />
                    </Sphere>
                    {i < helixPoints.length - 1 && (
                        <Cylinder
                            position={[
                                (point.x + helixPoints[i + 1].x) / 2,
                                (point.y + helixPoints[i + 1].y) / 2,
                                (point.z + helixPoints[i + 1].z) / 2,
                            ]}
                            args={[0.03, 0.03, 0.4, 8]}
                            rotation={[
                                Math.atan2(helixPoints[i + 1].z - point.z, Math.sqrt(Math.pow(helixPoints[i + 1].x - point.x, 2) + Math.pow(helixPoints[i + 1].y - point.y, 2))),
                                0,
                                Math.atan2(helixPoints[i + 1].y - point.y, helixPoints[i + 1].x - point.x),
                            ]}
                        >
                            <meshStandardMaterial color="#3d70b2" metalness={0.9} roughness={0.1} />
                        </Cylinder>
                    )}
                </Float>
            ))}
        </group>
    );
}

// 3D Background Scene
function ThreeDBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1.2} />
                <pointLight position={[-10, -10, -5]} intensity={0.6} color="#41d6c3" />
                <spotLight position={[0, 10, 0]} intensity={0.5} color="#5596e6" />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <DNAHelix />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
            </Canvas>
        </div>
    );
}

// Decorative Pattern
function DecorativePattern() {
    return (
        <div className="absolute inset-0 overflow-hidden opacity-10">
            <svg width="100%" height="100%">
                <defs>
                    <pattern id="loginGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <circle cx="30" cy="30" r="1.5" fill="white" />
                        <circle cx="0" cy="0" r="1.5" fill="white" />
                        <circle cx="60" cy="0" r="1.5" fill="white" />
                        <circle cx="0" cy="60" r="1.5" fill="white" />
                        <circle cx="60" cy="60" r="1.5" fill="white" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#loginGrid)" />
            </svg>
        </div>
    );
}

// Feature Item
function FeatureItem({ icon: Icon, text, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.6 }}
            className="flex items-center gap-3"
        >
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Icon className="w-5 h-5 text-brand-300" />
            </div>
            <span className="text-white/90 font-medium">{text}</span>
        </motion.div>
    );
}

// Stat Card
function StatCard({ number, label, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, type: 'spring', stiffness: 200 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
        >
            <div className="text-3xl font-bold text-white mb-1">{number}</div>
            <div className="text-white/70 text-sm">{label}</div>
        </motion.div>
    );
}

export default function LoginPage({ onNavigateToSignup, onNavigateToHome, onLoginSuccess }) {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const containerRef = useRef(null);
    const leftPanelRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(leftPanelRef.current, {
                x: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            gsap.from(formRef.current, {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setIsLoading(true);

        try {
            const result = await login(formData.email, formData.password);

            if (result.success) {
                console.log('Login successful:', result.user);
                if (onLoginSuccess) {
                    onLoginSuccess();
                }
            } else {
                setErrors({ email: result.error || 'Login failed' });
            }
        } catch (error) {
            setErrors({ email: 'An error occurred. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div ref={containerRef} className="min-h-screen relative overflow-x-hidden flex">
            {/* Left Panel - Marketing/Visual Section */}
            <div
                ref={leftPanelRef}
                className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-brand-100 via-brand-200 to-brand-300 p-12 flex-col justify-between overflow-hidden"
            >
                {/* 3D Background */}
                <ThreeDBackground />

                {/* Decorative Pattern */}
                <DecorativePattern />

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
                            Welcome Back to<br />Your Events Hub
                        </h1>
                        <p className="text-xl text-white mb-0 max-w-md drop-shadow-md" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.3)' }}>
                            Access thousands of events, connect with organizers, and manage your passes all in one place.
                        </p>
                    </motion.div>

                    {/* Features */}
                    <div className="space-y-4 mb-12">
                        <FeatureItem icon={Calendar} text="Discover 10,000+ Events" delay={0.4} />
                        <FeatureItem icon={Users} text="Connect with Community" delay={0.5} />
                        <FeatureItem icon={Zap} text="Instant Digital Passes" delay={0.6} />
                        <FeatureItem icon={Shield} text="Secure & Verified" delay={0.7} />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <StatCard number="10K+" label="Active Events" delay={0.8} />
                        <StatCard number="50K+" label="Happy Users" delay={0.9} />
                        <StatCard number="200+" label="Organizations" delay={1.0} />
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

                {/* Floating Orbs */}
                <motion.div
                    className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 left-20 w-96 h-96 bg-brand-300/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
            </div>

            {/* Right Panel - Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white relative">
                {/* Back to Home Button */}
                <motion.button
                    onClick={onNavigateToHome}
                    className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-brand-200 transition-colors group"
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
                <div className="lg:hidden absolute top-6 right-6 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-100 to-brand-300 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900 font-serif">GoPass</span>
                </div>

                <div ref={formRef} className="w-full max-w-md mt-16 lg:mt-0">
                    {/* Form Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h2 className="text-4xl font-bold text-slate-900 mb-2">Welcome Back</h2>
                        <p className="text-slate-600 text-lg">Sign in to continue your journey</p>
                    </motion.div>

                    {/* Social Login */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-2 gap-4 mb-8"
                    >
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-200 rounded-xl hover:border-brand-200 hover:bg-brand-50 transition-all"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-slate-700 font-semibold text-sm">Google</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-200 rounded-xl hover:border-brand-200 hover:bg-brand-50 transition-all"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span className="text-slate-700 font-semibold text-sm">GitHub</span>
                        </motion.button>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <div className="flex-1 h-px bg-slate-200" />
                        <span className="text-slate-500 text-sm font-medium">OR</span>
                        <div className="flex-1 h-px bg-slate-200" />
                    </motion.div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
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
                        </motion.div>

                        {/* Password Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
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
                        </motion.div>

                        {/* Remember Me & Forgot Password */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center justify-between"
                        >
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-2 border-slate-300 text-brand-200 focus:ring-2 focus:ring-brand-200 cursor-pointer"
                                />
                                <span className="text-slate-600 text-sm font-medium group-hover:text-slate-900 transition-colors">
                                    Remember me
                                </span>
                            </label>
                            <motion.a
                                href="#"
                                className="text-brand-200 hover:text-brand-100 text-sm font-semibold transition-colors"
                                whileHover={{ x: 2 }}
                            >
                                Forgot Password?
                            </motion.a>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-brand-100 via-brand-200 to-brand-300 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-brand-200/50 transition-all disabled:opacity-50 group relative overflow-hidden"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            {isLoading ? (
                                <motion.div
                                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                />
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Sign In
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}

                            {/* Shine effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.6 }}
                            />
                        </motion.button>
                    </form>

                    {/* Sign Up Link */}
                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <p className="text-slate-600">
                            Don't have an account?{' '}
                            <motion.button
                                onClick={onNavigateToSignup}
                                className="relative text-brand-200 hover:text-brand-100 font-bold transition-colors inline-flex items-center gap-1 group"
                                whileHover={{ x: 2, scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* Animated underline */}
                                <motion.span
                                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-100 to-brand-300"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: '100%' }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Glow effect */}
                                <motion.span
                                    className="absolute inset-0 bg-brand-200/20 rounded-lg blur-md"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: [0, 0.5, 0],
                                        scale: [0.8, 1.2, 0.8],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />

                                <span className="relative">Create Account</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </p>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500"
                    >
                        <div className="flex items-center gap-1.5">
                            <Shield className="w-4 h-4" />
                            <span>Secure Login</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Verified Platform</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
