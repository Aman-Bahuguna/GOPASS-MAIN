import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Music,
    Palette,
    Coffee,
    Users,
    Sparkles,
    Camera,
    Heart,
    ArrowRight
} from 'lucide-react';

const CATEGORIES = {
    creators: {
        title: "Creators",
        images: [
            "/events/cultural_fest.png",
            "/events/workshop.png",
            "/events/hackathon.png",
            "/events/guest_lecture.png",
            "/events/seminar.png",
            "/events/career_fair.png"
        ]
    },
    experiences: {
        title: "Experiences",
        images: [
            "/events/tech_symposium.png",
            "/events/sports.png",
            "/events/networking.png",
            "/events/hackathon.png",
            "/events/workshop.png",
            "/events/guest_lecture.png"
        ]
    }
};

const FEATURE_ICONS = [
    { Icon: Music, label: "Live Events", color: "from-purple-500 to-purple-600" },
    { Icon: Palette, label: "Art Shows", color: "from-pink-500 to-rose-600" },
    { Icon: Coffee, label: "Workshops", color: "from-amber-500 to-orange-600" },
    { Icon: Users, label: "Community", color: "from-blue-500 to-indigo-600" },
    { Icon: Camera, label: "Experiences", color: "from-emerald-500 to-teal-600" },
    { Icon: Heart, label: "Connection", color: "from-red-500 to-pink-600" },
    { Icon: Sparkles, label: "Moments", color: "from-yellow-500 to-amber-600" }
];

const VisionSection = ({ onAbout, onSignup }) => {
    const [activeTab, setActiveTab] = useState('creators');
    const constraintsRef = useRef(null);

    return (
        <section id="about" className="relative w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-20 overflow-hidden">

            {/* Animated Background Decoration */}
            <motion.div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
            >
                <motion.div
                    className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-gradient-to-br from-brand-100/10 to-purple-200/5 rounded-full blur-[100px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-[15%] right-[15%] w-[500px] h-[500px] bg-gradient-to-tl from-emerald-100/10 to-blue-100/5 rounded-full blur-[120px]"
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </motion.div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">

                    {/* Left Side - Vision & Icons */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="space-y-8"
                    >
                        {/* Section Tag */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700 shadow-sm"
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Sparkles className="w-4 h-4 text-brand-100" />
                            </motion.div>
                            Our Vision
                        </motion.div>

                        {/* Headline */}
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-slate-900 leading-tight">
                                Our vision for
                                <br />
                                <span className="text-brand-100 italic font-light">any event experience.</span>
                            </h2>

                            <motion.p
                                className="text-lg text-slate-600 leading-relaxed max-w-xl"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                Every event tells a story. Go Pass empowers creators to showcase their unique experiences and helps explorers discover unforgettable moments in their community.
                            </motion.p>

                            <motion.button
                                onClick={onAbout}
                                className="group inline-flex items-center gap-2 text-slate-900 font-medium hover:gap-3 transition-all duration-300"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                viewport={{ once: true }}
                                whileHover={{ x: 5 }}
                            >
                                <span>Read more</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </motion.div>

                        {/* Bouncing Ball Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="pt-8"
                        >
                            <motion.div
                                ref={constraintsRef}
                                className="relative w-full h-[280px] bg-gradient-to-br from-slate-100/50 to-slate-50/50 backdrop-blur-sm rounded-3xl border-2 border-slate-200/50 shadow-inner overflow-hidden"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                {/* Container Label */}
                                <div className="absolute top-4 left-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
                                    Drag & Explore
                                </div>

                                {/* Falling Draggable Balls */}
                                {FEATURE_ICONS.map(({ Icon, label, color }, index) => (
                                    <motion.div
                                        key={label}
                                        drag
                                        dragConstraints={constraintsRef}
                                        dragElastic={0.1}
                                        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                                        initial={{
                                            y: -200,
                                            x: Math.random() * 300 - 150,
                                            opacity: 0,
                                            scale: 0
                                        }}
                                        whileInView={{
                                            y: Math.random() * 150 + 20,
                                            x: Math.random() * 350,
                                            opacity: 1,
                                            scale: 1
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 12,
                                            delay: index * 0.15 + 0.8,
                                            opacity: { duration: 0.3, delay: index * 0.15 + 0.8 }
                                        }}
                                        whileHover={{
                                            scale: 1.15,
                                            boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                                        }}
                                        whileDrag={{
                                            scale: 1.2,
                                            cursor: "grabbing",
                                            zIndex: 999
                                        }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        className={`
                                            absolute w-16 h-16 rounded-full bg-gradient-to-br ${color}
                                            shadow-xl shadow-slate-400/30 cursor-grab
                                            flex items-center justify-center
                                            border-2 border-white/30
                                        `}
                                        style={{
                                            willChange: "transform"
                                        }}
                                    >
                                        <Icon className="w-7 h-7 text-white drop-shadow-lg" strokeWidth={2.5} />

                                        {/* Tooltip on Hover */}
                                        <motion.div
                                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none opacity-0"
                                            whileHover={{ opacity: 1 }}
                                        >
                                            {label}
                                        </motion.div>
                                    </motion.div>
                                ))}

                                {/* Decorative Bottom Gradient */}
                                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-200/30 to-transparent pointer-events-none" />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Tabbed Image Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="relative"
                    >
                        {/* Tab Switcher */}
                        <motion.div
                            className="flex justify-end mb-6"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-lg shadow-slate-200/50 border border-slate-100">
                                {Object.keys(CATEGORIES).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`
                                            relative px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                                            ${activeTab === tab
                                                ? 'text-white'
                                                : 'text-slate-600 hover:text-slate-900'
                                            }
                                        `}
                                    >
                                        {activeTab === tab && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-slate-900 rounded-xl"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{CATEGORIES[tab].title}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Image Grid with Enhanced Animations */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, scale: 0.92, rotateX: 10 }}
                                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                                exit={{ opacity: 0, scale: 0.92, rotateX: -10 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-3 gap-4"
                                style={{ perspective: "1000px" }}
                            >
                                {CATEGORIES[activeTab].images.map((image, index) => (
                                    <motion.div
                                        key={`${activeTab}-${index}`}
                                        initial={{ opacity: 0, y: 40, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index * 0.12,
                                            ease: [0.23, 1, 0.32, 1]
                                        }}
                                        whileHover={{
                                            scale: 1.08,
                                            rotate: index % 2 === 0 ? 3 : -3,
                                            zIndex: 10,
                                            transition: { duration: 0.3 }
                                        }}
                                        className={`
                                            relative rounded-2xl overflow-hidden shadow-xl shadow-slate-900/10 
                                            bg-slate-100 cursor-pointer group
                                            ${index === 0 || index === 5 ? 'col-span-2 row-span-1 h-48' : 'h-48'}
                                        `}
                                    >
                                        <motion.img
                                            src={image}
                                            alt={`${CATEGORIES[activeTab].title} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            initial={{ scale: 1.2 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.8, delay: index * 0.12 }}
                                            whileHover={{ scale: 1.1 }}
                                        />

                                        {/* Animated Overlay */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
                                            initial={{ opacity: 0.6 }}
                                            whileHover={{ opacity: 0.2 }}
                                            transition={{ duration: 0.3 }}
                                        />

                                        {/* Shine Effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/30"
                                            initial={{ x: "-100%", opacity: 0 }}
                                            whileHover={{ x: "100%", opacity: 1 }}
                                            transition={{ duration: 0.7 }}
                                        />

                                        {/* Ripple Effect on Hover */}
                                        <motion.div
                                            className="absolute inset-0 border-2 border-white/50 rounded-2xl"
                                            initial={{ scale: 1, opacity: 0 }}
                                            whileHover={{ scale: 1.1, opacity: 0 }}
                                            transition={{ duration: 0.6 }}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* Floating CTA Badge with Pulse */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0, rotate: -180 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{
                                duration: 0.7,
                                delay: 0.8,
                                type: "spring",
                                stiffness: 200
                            }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            onClick={onSignup}
                            className="absolute -top-4 -left-4 bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl shadow-slate-900/30 flex items-center gap-2 cursor-pointer z-20"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 10, -10, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <Sparkles className="w-4 h-4" />
                            </motion.div>
                            <span className="text-sm font-medium">Create</span>

                            {/* Pulse Ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-slate-900"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 0, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeOut"
                                }}
                            />
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default VisionSection;
