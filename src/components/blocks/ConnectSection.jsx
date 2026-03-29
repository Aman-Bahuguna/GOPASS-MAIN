import React from 'react';
import { motion } from 'framer-motion';
import { PaintBucket, Tag, Sparkles } from 'lucide-react';

const CARD_IMAGES = [
    "/events/workshop.png",
    "/events/cultural_fest.png",
    "/events/hackathon.png",
    "/events/guest_lecture.png",
    "/events/tech_symposium.png",
    "/events/sports.png",
    "/events/networking.png",
];

const ConnectSection = ({ onExploreEvents, onLearnMore }) => {
    return (
        <section className="relative w-full h-screen bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#fafafa] overflow-hidden flex flex-col items-center justify-center py-12">

            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Soft gradient orbs */}
                <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-brand-100/20 via-purple-200/10 to-transparent rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[20%] left-[5%] w-[600px] h-[600px] bg-gradient-to-tr from-emerald-200/15 via-blue-100/10 to-transparent rounded-full blur-[140px]" />

                {/* Abstract flowing shapes */}
                <div className="absolute top-[25%] left-[15%] w-32 h-32 bg-gradient-to-br from-orange-300/20 to-yellow-200/20 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] blur-xl animate-[float_8s_ease-in-out_infinite]" />
                <div className="absolute bottom-[30%] right-[20%] w-40 h-40 bg-gradient-to-bl from-pink-300/15 to-purple-200/15 rounded-[60%_40%_30%_70%/40%_70%_30%_60%] blur-xl animate-[float_10s_ease-in-out_infinite_reverse]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col items-center justify-center h-full">

                {/* Fanned Card Deck - Premium Interactive Version */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative w-full max-w-[500px] h-[280px] md:h-[360px] mb-8 md:mb-10 z-20"
                >
                    <div className="relative w-full h-full flex items-center justify-center perspective-[1200px]">
                        {CARD_IMAGES.map((src, index) => {
                            const offset = index - 3; // Center is at index 3
                            const rotate = offset * 9; // Slight rotation
                            const x = offset * 35; // Horizontal spread
                            const y = Math.abs(offset) * 12; // Y positioning for arc
                            const scale = 1 - Math.abs(offset) * 0.04; // Subtle scale difference

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ y: 300, opacity: 0, rotate: 0, scale: 0.5 }}
                                    whileInView={{
                                        y: y,
                                        opacity: 1,
                                        rotate: rotate,
                                        x: x,
                                        scale: scale
                                    }}
                                    whileHover={{
                                        scale: scale + 0.08,
                                        y: y - 15,
                                        rotate: rotate * 0.7,
                                        transition: { duration: 0.3, ease: "easeOut" }
                                    }}
                                    transition={{
                                        y: { type: "spring", stiffness: 100, damping: 18 },
                                        opacity: { duration: 0.8, ease: "easeOut" },
                                        rotate: { type: "spring", stiffness: 100, damping: 18 },
                                        scale: { duration: 0.6, ease: "easeOut" },
                                        delay: index * 0.08 + 0.2
                                    }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    style={{
                                        zIndex: 10 + index,
                                        transformOrigin: "bottom center"
                                    }}
                                    className="absolute w-36 h-52 sm:w-44 sm:h-60 md:w-52 md:h-72 rounded-3xl shadow-2xl shadow-slate-900/20 overflow-hidden bg-slate-200 cursor-pointer group"
                                >
                                    <img
                                        src={src}
                                        alt={`Event ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Gradient overlay for depth */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent pointer-events-none opacity-60 group-hover:opacity-30 transition-opacity duration-300"></div>

                                    {/* Shine effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Main Text Content - Enhanced Typography */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative z-10 max-w-6xl mx-auto text-center px-4"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-medium tracking-tight text-slate-900 leading-[1.25] md:leading-[1.3]">
                        whether you're a creator launching events
                        <br className="hidden md:block" />
                        <span className="text-slate-300 mx-2 md:mx-4 font-light">/</span>
                        or guest seeking{' '}
                        <span className="relative inline-block group">
                            <span className="text-emerald-500 font-serif italic relative z-10">
                                unique
                            </span>
                            <motion.span
                                className="absolute -inset-2 bg-emerald-100/40 rounded-lg -z-0 blur-sm"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0.5, 0.3]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </span>{' '}
                        moments
                        <span className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 mx-2 md:mx-3 bg-slate-900 rounded-full text-white align-middle shadow-xl shadow-slate-900/30 transform -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer">
                            <PaintBucket size={18} className="md:w-6 md:h-6" />
                        </span>
                        <br className="md:hidden" />
                        <span className="font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                            gopass
                        </span>{' '}
                        <br className="hidden sm:block md:hidden" />
                        connects you to{' '}
                        <span className="font-serif italic text-brand-100 relative inline-block">
                            culture
                            <svg className="absolute -bottom-1 left-0 w-full h-2 opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0,5 Q25,0 50,5 T100,5" stroke="currentColor" fill="none" strokeWidth="2" />
                            </svg>
                        </span>
                        <span className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 mx-2 md:mx-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full text-white align-middle shadow-xl shadow-orange-500/30 transform rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer">
                            <Tag size={18} className="md:w-6 md:h-6" />
                        </span>
                        <br className="md:hidden" />
                        &amp; community.
                    </h2>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        viewport={{ once: true }}
                        className="mt-8 md:mt-10 flex flex-wrap justify-center gap-4"
                    >
                        <button 
                            onClick={onExploreEvents}
                            className="group px-8 py-4 bg-slate-900 text-white rounded-full font-medium text-base md:text-lg hover:bg-slate-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/20 flex items-center gap-2"
                        >
                            Explore Events
                            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        </button>
                        <button 
                            onClick={onLearnMore}
                            className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-full font-medium text-base md:text-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                        >
                            Learn More
                        </button>
                    </motion.div>
                </motion.div>

            </div>

            {/* Bottom decorative gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none"></div>
        </section>
    );
};

export default ConnectSection;
