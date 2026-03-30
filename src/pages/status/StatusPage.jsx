import React from 'react';
import { motion } from 'framer-motion';
import { 
    CheckCircle2, XCircle, AlertTriangle, 
    Clock, RefreshCw, BarChart, Sparkles 
} from 'lucide-react';

const StatusRow = ({ system, status, latency, delay }) => {
    const isUp = status === 'Operational';
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-3xl"
        >
            <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full animate-pulse ${isUp ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className="text-xl font-bold text-slate-900">{system}</span>
            </div>
            <div className="flex items-center gap-8">
                <span className="text-slate-400 text-sm hidden sm:block">Latency: {latency}ms</span>
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${isUp ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {status}
                </span>
            </div>
        </motion.div>
    );
};

const StatusPage = () => {
    return (
        <div className="min-h-screen bg-white overflow-hidden pt-32 pb-24 px-6 relative">
            {/* Header */}
            <div className="container mx-auto max-w-4xl text-center mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-brand-200 text-sm font-bold mb-8 shadow-sm"
                >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    All Systems Operational
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight">
                    System <span className="text-brand-100 italic font-light italic">Health & Status</span>
                </h1>
                <p className="text-slate-500 text-xl font-normal max-w-2xl mx-auto leading-relaxed">
                    Real-time monitoring and historical uptime reports for the GoPass infrastructure.
                </p>
            </div>

            {/* Status List */}
            <div className="container mx-auto max-w-3xl space-y-4 mb-24">
                <StatusRow system="Core Application" status="Operational" latency={42} delay={0.1} />
                <StatusRow system="Ticketing API" status="Operational" latency={58} delay={0.2} />
                <StatusRow system="Payment Gateway" status="Operational" latency={120} delay={0.3} />
                <StatusRow system="Asset CDN" status="Operational" latency={15} delay={0.4} />
                <StatusRow system="User Auth Services" status="Degraded Performance" latency={450} delay={0.5} />
            </div>

            {/* History Grid */}
            <div className="container mx-auto max-w-5xl p-12 bg-slate-50 border border-slate-100 rounded-[3rem] text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Historical Uptime</h3>
                <div className="flex justify-center gap-1 mb-8 overflow-hidden">
                    {[...Array(60)].map((_, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.1 + (i * 0.01) }}
                            className={`w-1.5 h-12 rounded-full ${i % 15 === 3 ? 'bg-amber-400' : 'bg-emerald-400'}`} 
                        />
                    ))}
                </div>
                <div className="flex justify-between text-slate-400 text-sm font-sans px-4">
                    <span>90 Days Ago</span>
                    <span className="font-bold text-slate-900">99.8% Uptime Overall</span>
                    <span>Today</span>
                </div>
            </div>
        </div>
    );
};

export default StatusPage;
