import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import { Menu, Calendar, X, Sparkles } from "lucide-react";

const NAV_LINKS = [
    { name: "Discover", href: "#discover" },
    { name: "Map View", href: "#map" },
    { name: "Community", href: "#community" },
    { name: "About", href: "#about" },
];

// Floating particles component
const FloatingParticle = ({ delay, duration, x, y }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [x, x + Math.random() * 100 - 50],
            y: [y, y - 100],
        }}
        transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
        }}
        className="absolute w-1 h-1 bg-brand-200 rounded-full blur-[0.5px]"
        style={{ left: `${x}%`, top: '0%' }}
    />
);

const Navbar = ({ onNavigateToLogin, onNavigateToSignup }) => {
    const navigate = useNavigate();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    // Smooth scroll progress
    const scrollProgress = useSpring(scrollY, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const navbarY = useTransform(scrollProgress, [0, 100], [0, -8]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 20) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    return (
        <>
            {/* Animated gradient background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: scrolled ? 0.5 : 0 }}
                className="fixed top-0 inset-x-0 h-32 bg-gradient-to-b from-brand-100/5 via-transparent to-transparent pointer-events-none z-[59]"
            />

            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: hidden ? -120 : 0,
                    opacity: 1
                }}
                style={{ y: navbarY }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8
                }}
                className="fixed top-0 inset-x-0 z-[60] w-full"
            >
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <FloatingParticle
                            key={i}
                            delay={i * 0.8}
                            duration={3 + i * 0.5}
                            x={10 + i * 15}
                            y={0}
                        />
                    ))}
                </div>

                <div className={`transition-all duration-700 ${scrolled
                    ? "bg-white/90 backdrop-blur-3xl shadow-[0_8px_32px_rgba(61,112,178,0.12)] border-b border-slate-200/60"
                    : "bg-white/60 backdrop-blur-xl border-b border-white/40"
                    }`}
                >
                    <div className="container mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20">
                            {/* Logo - Ultra Enhanced */}
                            <motion.a
                                href="/"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15,
                                    delay: 0.1
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 cursor-pointer group relative z-10"
                            >
                                {/* Animated glow rings */}
                                <motion.div
                                    className="absolute -inset-4 bg-gradient-to-r from-brand-100/30 via-brand-200/30 to-brand-300/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 90, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />

                                <motion.div
                                    className="relative w-12 h-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl flex items-center justify-center shadow-xl"
                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <motion.div
                                        className="w-5 h-5 bg-white rounded-full"
                                        animate={{
                                            boxShadow: [
                                                "0 0 15px rgba(255,255,255,0.6)",
                                                "0 0 25px rgba(255,255,255,0.8)",
                                                "0 0 15px rgba(255,255,255,0.6)",
                                            ]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                        }}
                                    />
                                </motion.div>
                                <div className="relative">
                                    <motion.span
                                        className="text-[23px] font-bold font-serif tracking-tight text-slate-900"
                                        whileHover={{
                                            textShadow: "0 0 20px rgba(61,112,178,0.3)"
                                        }}
                                    >
                                        GoPass
                                    </motion.span>
                                    <motion.div
                                        className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-brand-100 via-brand-200 to-brand-300 rounded-full"
                                        initial={{ width: 0 }}
                                        whileHover={{ width: "100%" }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </div>
                            </motion.a>

                            {/* Center Navigation - Redesigned */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="hidden lg:flex items-center gap-2 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl px-4 py-2.5 rounded-full border border-slate-200/70 shadow-lg shadow-slate-900/5"
                            >
                                {NAV_LINKS.map((link, i) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 0.3 + (i * 0.05),
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20
                                        }}
                                        whileHover={{
                                            y: -3,
                                            transition: { duration: 0.2 }
                                        }}
                                        className="relative px-5 py-2.5 text-[15px] font-semibold text-slate-700 hover:text-slate-900 transition-colors duration-300 rounded-full group"
                                    >
                                        <span className="relative z-10">{link.name}</span>

                                        {/* Animated background */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-brand-100/15 via-brand-200/10 to-brand-300/15 rounded-full"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileHover={{
                                                opacity: 1,
                                                scale: 1,
                                                transition: { duration: 0.2 }
                                            }}
                                        />

                                        {/* Shine effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
                                            initial={{ x: "-100%" }}
                                            whileHover={{
                                                x: "100%",
                                                transition: { duration: 0.6 }
                                            }}
                                        />
                                    </motion.a>
                                ))}
                            </motion.div>

                            {/* Right Actions - Enhanced */}
                            <div className="hidden lg:flex items-center gap-3">
                                {/* Events Button - Ultra Premium */}
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        delay: 0.5,
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 15
                                    }}
                                    whileHover={{
                                        scale: 1.08,
                                        y: -3,
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative group cursor-pointer"
                                    onClick={() => navigate('/events')}
                                >
                                    {/* Outer glow */}
                                    <motion.div
                                        className="absolute -inset-1 bg-gradient-to-r from-brand-100 via-brand-200 to-brand-300 rounded-full opacity-0 group-hover:opacity-75 blur-lg"
                                        animate={{
                                            opacity: [0, 0.5, 0],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                        }}
                                    />

                                    <div className="relative px-6 py-2.5 bg-gradient-to-r from-brand-100 via-brand-200 to-brand-200 text-white rounded-full text-[15px] font-bold shadow-xl shadow-brand-100/40 flex items-center gap-2 overflow-hidden">
                                        {/* Animated shimmer */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                                            animate={{
                                                x: ["-200%", "200%"],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                repeatDelay: 1,
                                            }}
                                        />

                                        <motion.div
                                            animate={{
                                                rotate: [0, 12, -12, 0],
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                repeat: Infinity,
                                                repeatDelay: 3,
                                            }}
                                        >
                                            <Calendar className="w-4 h-4 relative z-10" />
                                        </motion.div>
                                        <span className="relative z-10">Events</span>
                                        <Sparkles className="w-3.5 h-3.5 relative z-10 opacity-80" />
                                    </div>
                                </motion.button>

                                {/* Login */}
                                <motion.button
                                    onClick={onNavigateToLogin}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                    whileHover={{
                                        y: -3,
                                        backgroundColor: "rgba(255, 255, 255, 0.8)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-5 py-2.5 text-[15px] font-semibold text-slate-700 hover:text-slate-900 transition-all duration-300 rounded-full"
                                >
                                    Log In
                                </motion.button>

                                {/* Get Started - Super Enhanced */}
                                <motion.button
                                    onClick={onNavigateToSignup}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        delay: 0.7,
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 15
                                    }}
                                    whileHover={{
                                        scale: 1.08,
                                        y: -3,
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative group overflow-hidden"
                                >
                                    <motion.div
                                        className="absolute -inset-1 bg-gradient-to-r from-slate-600 to-slate-900 rounded-full opacity-0 group-hover:opacity-100 blur-md"
                                        transition={{ duration: 0.3 }}
                                    />

                                    <div className="relative px-7 py-2.5 bg-slate-900 text-white rounded-full text-[15px] font-bold shadow-xl shadow-slate-900/30">
                                        <span className="relative z-10">Get Started</span>

                                        {/* Slide shine effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            initial={{ x: "-100%" }}
                                            whileHover={{
                                                x: "100%",
                                                transition: { duration: 0.5 }
                                            }}
                                        />
                                    </div>
                                </motion.button>
                            </div>

                            {/* Mobile menu button - Enhanced */}
                            <motion.button
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="lg:hidden p-3 text-slate-900 hover:bg-white/80 rounded-2xl transition-all duration-300 shadow-lg"
                            >
                                <motion.div
                                    animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {mobileMenuOpen ? (
                                        <X className="w-6 h-6" />
                                    ) : (
                                        <Menu className="w-6 h-6" />
                                    )}
                                </motion.div>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu - Enhanced */}
            <motion.div
                initial={false}
                animate={{
                    opacity: mobileMenuOpen ? 1 : 0,
                    scale: mobileMenuOpen ? 1 : 0.95,
                    y: mobileMenuOpen ? 0 : -20,
                    pointerEvents: mobileMenuOpen ? "auto" : "none"
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                }}
                className="fixed top-24 inset-x-0 z-50 lg:hidden"
            >
                <motion.div
                    className="mx-4 bg-white/95 backdrop-blur-3xl border border-slate-200/70 rounded-3xl shadow-2xl shadow-slate-900/10 overflow-hidden"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                >
                    <div className="p-6 space-y-2">
                        {NAV_LINKS.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{
                                    opacity: mobileMenuOpen ? 1 : 0,
                                    x: mobileMenuOpen ? 0 : -30
                                }}
                                transition={{
                                    delay: i * 0.06,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                                whileTap={{ scale: 0.95 }}
                                className="block px-5 py-3.5 text-[16px] font-semibold text-slate-700 hover:text-slate-900 hover:bg-gradient-to-r hover:from-brand-100/10 hover:to-brand-200/10 rounded-2xl transition-all duration-200"
                            >
                                {link.name}
                            </motion.a>
                        ))}

                        {/* Mobile Events Button */}
                        <motion.button
                            initial={{ opacity: 0, x: -30 }}
                            animate={{
                                opacity: mobileMenuOpen ? 1 : 0,
                                x: mobileMenuOpen ? 0 : -30
                            }}
                            transition={{
                                delay: NAV_LINKS.length * 0.06,
                                type: "spring",
                                stiffness: 300,
                                damping: 25
                            }}
                            onClick={() => {
                                setMobileMenuOpen(false);
                                navigate('/events');
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-brand-100 to-brand-200 text-white rounded-2xl text-[16px] font-bold shadow-lg shadow-brand-100/30"
                        >
                            <Calendar className="w-5 h-5" />
                            Events
                            <Sparkles className="w-4 h-4 opacity-80" />
                        </motion.button>

                        <div className="pt-4 mt-4 border-t border-slate-200/60 space-y-2">
                            <motion.button
                                onClick={onNavigateToLogin}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{
                                    opacity: mobileMenuOpen ? 1 : 0,
                                    x: mobileMenuOpen ? 0 : -30
                                }}
                                transition={{
                                    delay: (NAV_LINKS.length + 1) * 0.06,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="block w-full text-center px-5 py-3.5 text-[16px] font-semibold text-slate-700 hover:bg-slate-50 rounded-2xl transition-all duration-200"
                            >
                                Log In
                            </motion.button>
                            <motion.button
                                onClick={onNavigateToSignup}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{
                                    opacity: mobileMenuOpen ? 1 : 0,
                                    x: mobileMenuOpen ? 0 : -30
                                }}
                                transition={{
                                    delay: (NAV_LINKS.length + 2) * 0.06,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="block w-full px-5 py-3.5 bg-slate-900 text-white rounded-2xl text-[16px] font-bold shadow-lg hover:bg-slate-800 transition-all duration-200"
                            >
                                Get Started
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default Navbar;
