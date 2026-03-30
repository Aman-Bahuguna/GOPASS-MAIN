import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Search, ArrowRight, Zap, Target, Users, Sparkles, Clock, Send } from 'lucide-react';

const CareersPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="pt-32 pb-24 px-6 relative overflow-hidden bg-slate-50">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-100/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="container mx-auto max-w-7xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-brand-200 text-sm font-bold mb-8 shadow-sm"
                    >
                        <Sparkles className="w-4 h-4" />
                        Join the GoPass Team
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-bold text-slate-900 mb-8 tracking-tight">
                        Shape the future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-100 to-brand-300 italic font-medium">shared experiences</span>
                    </h1>
                </div>
            </section>

            {/* Values / Benefits Section */}
            <section className="py-24 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                        <div className="space-y-8 text-center md:text-left">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Why build with us?</h2>
                            <p className="text-slate-500 text-xl leading-relaxed">
                                We're on a mission to bring people together through the power of live events. 
                                We value autonomy, creativity, and radical honesty. If you're a builder 
                                who loves to explore, you've found your tribe.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="p-8 bg-slate-50/50 rounded-3xl border border-slate-100">
                                <Zap className="w-10 h-10 text-brand-100 mb-6" />
                                <h4 className="text-xl font-bold text-slate-900 mb-2 font-serif">Fast Growth</h4>
                                <p className="text-slate-500">Rapid professional development and clear equity-based rewards.</p>
                            </div>
                            <div className="p-8 bg-slate-50/50 rounded-3xl border border-slate-100 translate-y-0 sm:translate-y-6">
                                <Target className="w-10 h-10 text-emerald-500 mb-6" />
                                <h4 className="text-xl font-bold text-slate-900 mb-2 font-serif">Meaningful Impact</h4>
                                <p className="text-slate-500">Build products used by millions in their happiest moments.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Coming Soon Section for Jobs */}
            <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
                {/* Background Detail */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                <div className="container mx-auto max-w-4xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-full text-brand-200 text-sm font-bold mb-10 shadow-sm"
                    >
                        <Clock className="w-4 h-4 animate-pulse" />
                        Hiring Coming Soon
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 font-serif leading-none">
                        Our new openings <br /> 
                        <span className="text-brand-100">will be posted soon.</span>
                    </h2>

                    <p className="text-slate-500 text-xl md:text-2xl max-w-2xl mx-auto mb-16 leading-relaxed">
                        We're finalizing our next growth phase. In the meantime, tell us about 
                        yourself and we'll reach out when the right role opens up.
                    </p>

                    {/* Talent Pool Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-1.5 bg-white border border-slate-200 rounded-3xl max-w-lg mx-auto shadow-2xl"
                    >
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input 
                                type="email" 
                                placeholder="Email to join our talent pool" 
                                className="flex-1 bg-transparent px-6 py-4 text-slate-900 placeholder-slate-400 focus:outline-none text-lg"
                            />
                            <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-900/10">
                                Connect
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40 border-t border-slate-200/50 pt-16">
                        <div className="text-center">
                            <Users className="w-8 h-8 text-brand-200 mx-auto mb-4" />
                            <h4 className="text-slate-900 font-semibold mb-2">Remote First</h4>
                            <p className="text-slate-400 text-sm">Flexible work culture.</p>
                        </div>
                        <div className="text-center md:border-x border-slate-200/50">
                            <Briefcase className="w-8 h-8 text-brand-200 mx-auto mb-4" />
                            <h4 className="text-slate-900 font-semibold mb-2">Health & Wellness</h4>
                            <p className="text-slate-400 text-sm">Full coverage for you.</p>
                        </div>
                        <div className="text-center">
                            <Sparkles className="w-8 h-8 text-brand-100 mx-auto mb-4" />
                            <h4 className="text-slate-900 font-semibold mb-2">Yearly Retreats</h4>
                            <p className="text-slate-400 text-sm">Connect in person.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CareersPage;
