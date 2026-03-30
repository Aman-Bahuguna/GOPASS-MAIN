import React from 'react';
import { motion } from 'framer-motion';
import { 
    Code, Terminal, Key, 
    Sparkles, Clock, Send, 
    ArrowRight 
} from 'lucide-react';

const APIPage = () => {
    return (
        <div className="min-h-[80vh] bg-white flex items-center justify-center overflow-hidden px-6 relative py-20 lg:py-32">
            {/* Background Decorations - Subtly light with brand Teal/Blue */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-100/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="container mx-auto max-w-4xl relative z-10 text-center">
                {/* Coming Soon Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-100 border border-slate-200 rounded-full text-brand-200 text-sm font-bold mb-10 shadow-sm"
                >
                    <Clock className="w-4 h-4 animate-pulse" />
                    Public API Launching Q4 2026
                </motion.div>

                {/* Main Content */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-8xl font-bold text-slate-900 mb-8 leading-none tracking-tight"
                >
                    Build on top of <br />
                    <span className="text-brand-100 italic font-light italic">GoPass Engine</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-500 text-xl md:text-2xl max-w-2xl mx-auto mb-16 leading-relaxed"
                >
                    We're finalizing our REST API to allow developers to build world-class 
                    white-label ticketing and event management solutions on our core stack.
                </motion.p>

                {/* Notify Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-1.5 bg-white border border-slate-200 rounded-3xl max-w-lg mx-auto shadow-2xl"
                >
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input 
                            type="email" 
                            placeholder="Sign up for our developer beta" 
                            className="flex-1 bg-transparent px-6 py-4 text-slate-900 placeholder-slate-400 focus:outline-none text-lg"
                        />
                        <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-900/10">
                            Get Access
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-400 mt-8 text-sm flex items-center justify-center gap-2"
                >
                    <Sparkles className="w-4 h-4 text-brand-100" />
                    Developers in our beta program will receive generous usage quotas and lifetime support.
                </motion.p>

                {/* API Features Placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40 border-t border-slate-100 pt-16">
                    <div className="text-center">
                        <Terminal className="w-8 h-8 text-brand-200 mx-auto mb-4" />
                        <h4 className="text-slate-900 font-semibold mb-2">JSON REST API</h4>
                        <p className="text-slate-500 text-sm">Clean, predictable REST endpoints.</p>
                    </div>
                    <div className="text-center md:border-x border-slate-100">
                        <Key className="w-8 h-8 text-brand-200 mx-auto mb-4" />
                        <h4 className="text-slate-900 font-semibold mb-2">OAuth2 Auth</h4>
                        <p className="text-slate-500 text-sm">Industrial-strength authentication.</p>
                    </div>
                    <div className="text-center">
                        <Code className="w-8 h-8 text-brand-100 mx-auto mb-4" />
                        <h4 className="text-slate-900 font-semibold mb-2">Official SDKs</h4>
                        <p className="text-slate-500 text-sm">React, Node, Python libraries.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default APIPage;
