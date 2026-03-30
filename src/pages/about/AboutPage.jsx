import React from 'react';
import { motion } from 'framer-motion';
import { 
    Target, Eye, Heart, 
    Rocket, Users, Sparkles 
} from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white overflow-hidden pt-32 pb-24 px-6 relative">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-100/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Hero */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-brand-200 text-sm font-bold mb-8 shadow-sm"
                    >
                        <Sparkles className="w-4 h-4" />
                        Our Story
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight tracking-tight"
                    >
                        Redefining how the world <br />
                        <span className="text-brand-100 italic font-light">experiences culture</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
                    >
                        GoPass was born out of a simple idea: making incredible events 
                        accessible, secure, and community-driven for everyone, everywhere.
                    </motion.p>
                </div>

                {/* Mission / Vision */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-10 bg-slate-50/50 border border-slate-100 rounded-3xl"
                    >
                        <Target className="w-12 h-12 text-brand-200 mb-6" />
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">Our Mission</h3>
                        <p className="text-slate-500 leading-relaxed font-sans">
                            To empower creators and organizers by providing the tools 
                            they need to build thriving communities around their passions.
                        </p>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-10 bg-slate-50/50 border border-slate-100 rounded-3xl"
                    >
                        <Eye className="w-12 h-12 text-emerald-500 mb-6" />
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">Our Vision</h3>
                        <p className="text-slate-500 leading-relaxed font-sans">
                            A world where every individual can find their tribe and 
                            experience life-changing moments with zero friction.
                        </p>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="p-10 bg-slate-50/50 border border-slate-100 rounded-3xl"
                    >
                        <Heart className="w-12 h-12 text-pink-500 mb-6" />
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">Our Values</h3>
                        <p className="text-slate-500 leading-relaxed font-sans">
                            Transparency, inclusivity, and innovation. We put our 
                            users and community at the heart of everything we build.
                        </p>
                    </motion.div>
                </div>

                {/* Team Placeholder / Culture */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-12 lg:p-20 bg-slate-900 border border-slate-800 rounded-[4rem] flex flex-col lg:flex-row items-center gap-12 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-100/10 to-transparent pointer-events-none" />
                    
                    <div className="flex-1 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-sm font-bold mb-6">
                            <Rocket className="w-4 h-4 text-brand-200" />
                            Fastest Growing Platform
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">Built by explorers, for explorers.</h2>
                        <p className="text-white/60 text-xl leading-relaxed mb-8">
                            We're a distributed team of designers, engineers, and event enthusiasts 
                            who believe that technology should bring people together, not keep them apart.
                        </p>
                        <button className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:scale-105 transition-transform shadow-xl">
                            See open positions
                        </button>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4 relative z-10">
                        <div className="aspect-square bg-white/5 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center border border-white/10">
                            <Users className="w-12 h-12 text-white/20" />
                        </div>
                        <div className="aspect-square bg-white/5 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center translate-y-8 border border-white/10">
                            <Rocket className="w-12 h-12 text-white/20" />
                        </div>
                        <div className="aspect-square bg-white/5 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center border border-white/10">
                            <Sparkles className="w-12 h-12 text-white/20" />
                        </div>
                        <div className="aspect-square bg-white/5 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center translate-y-8 border border-white/10">
                            <Heart className="w-12 h-12 text-white/20" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutPage;
