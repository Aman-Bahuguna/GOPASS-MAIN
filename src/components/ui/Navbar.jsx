import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import { Menu, Calendar, X, Sparkles, ArrowRight } from "lucide-react";

const NAV_LINKS = [
    { name: "Features", href: "/features" },
    { name: "Events", href: "/events" },
    { name: "Pricing", href: "/pricing" },
    { name: "Community", href: "/community" },
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

    const scrollProgress = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const navbarY = useTransform(scrollProgress, [0, 100], [0, -8]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        setHidden(latest > previous && latest > 150);
        setScrolled(latest > 20);
    });

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: scrolled ? 0.5 : 0 }}
                className="fixed top-0 inset-x-0 h-32 bg-gradient-to-b from-brand-100/5 via-transparent to-transparent pointer-events-none z-[59]"
            />

            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: hidden ? -120 : 0, opacity: 1 }}
                style={{ y: navbarY }}
                transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
                className="fixed top-0 inset-x-0 z-[60] w-full"
            >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <FloatingParticle key={i} delay={i * 0.8} duration={3 + i * 0.5} x={10 + i * 15} y={0} />
                    ))}
                </div>

                <div className={`transition-all duration-500 border-b ${scrolled
                    ? "bg-slate-900/95 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-slate-700/40"
                    : "bg-transparent border-transparent"
                }`}>
                    <div className="container mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20">
                            {/* Logo */}
                            <Link to="/" className="flex items-center gap-3 cursor-pointer group relative z-10">
                                <motion.div
                                    className="absolute -inset-4 bg-gradient-to-r from-brand-100/30 via-brand-200/30 to-brand-300/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity"
                                />
                                <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl transition-colors duration-500 ${
                                    scrolled 
                                    ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10" 
                                    : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
                                }`}>
                                    <div className="w-5 h-5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
                                </div>
                                <div className="relative">
                                    <span className={`text-[23px] font-bold font-serif tracking-tight transition-colors duration-300 ${
                                        scrolled ? "text-white group-hover:text-brand-100" : "text-slate-900"
                                    }`}>GoPass</span>
                                    <motion.div className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-brand-100 to-brand-300 rounded-full" initial={{ width: 0 }} whileHover={{ width: "100%" }} />
                                </div>
                            </Link>

                            {/* Desktop Nav */}
                            <div className={`hidden lg:flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-full border transition-all duration-500 ${
                                scrolled ? "bg-slate-800/40 border-slate-700/40" : "bg-white/50 border-slate-200/50 shadow-sm"
                            }`}>
                                {NAV_LINKS.map((link) => (
                                    <Link key={link.name} to={link.href} className={`relative px-4 py-2 text-[14px] font-semibold transition-colors rounded-full group ${
                                        scrolled ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
                                    }`}>
                                        <span className="relative z-10">{link.name}</span>
                                        <motion.div className={`absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform ${
                                            scrolled ? "bg-slate-700/60" : "bg-white/80"
                                        }`} />
                                    </Link>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="hidden lg:flex items-center gap-4">
                                <motion.button
                                    onClick={() => navigate('/events')}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="group relative flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-100 to-brand-200 text-white rounded-full font-bold text-[15px] shadow-lg shadow-brand-100/20 overflow-hidden"
                                >
                                    <Calendar className="w-4 h-4" />
                                    <span>Events</span>
                                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                                </motion.button>

                                <motion.button
                                    onClick={onNavigateToLogin}
                                    whileHover="hover"
                                    className={`relative group px-6 py-2.5 text-[15px] font-semibold transition-colors rounded-full overflow-hidden ${
                                        scrolled ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-slate-900"
                                    }`}
                                >
                                    <span className="relative z-10 transition-transform group-hover:-translate-y-0.5 inline-block">Log In</span>
                                    <motion.div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-1 bg-brand-100 rounded-full" variants={{ hover: { width: 12 } }} />
                                </motion.button>

                                <motion.button
                                    onClick={onNavigateToSignup}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`group relative overflow-hidden px-8 py-2.5 text-white rounded-full font-bold text-[15px] shadow-xl transition-all duration-300 ${
                                        scrolled ? "bg-brand-100 shadow-brand-100/30 hover:bg-brand-200 hover:shadow-brand-100/50" : "bg-slate-900 shadow-slate-900/30 hover:bg-slate-800 hover:shadow-slate-900/50"
                                    }`}
                                >
                                    <span className="relative z-10">Get Started</span>
                                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                                </motion.button>
                            </div>

                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`lg:hidden p-2 transition-colors ${
                                scrolled ? "text-white" : "text-slate-900"
                            }`}>
                                {mobileMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            <motion.div
                initial={false}
                animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : -20, pointerEvents: mobileMenuOpen ? "auto" : "none" }}
                className="fixed top-24 inset-x-0 z-50 lg:hidden px-4"
            >
                <div className="bg-slate-900/95 backdrop-blur-2xl border border-slate-700 rounded-3xl shadow-2xl p-6 space-y-4">
                    {NAV_LINKS.map((link) => (
                        <Link key={link.name} to={link.href} className="block text-lg font-semibold text-slate-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-4 border-t border-slate-800 space-y-3">
                        <button onClick={onNavigateToSignup} className="w-full py-4 bg-brand-100 text-white rounded-2xl font-bold shadow-lg shadow-brand-100/20">Get Started</button>
                        <button onClick={onNavigateToLogin} className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold">Log In</button>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Navbar;
