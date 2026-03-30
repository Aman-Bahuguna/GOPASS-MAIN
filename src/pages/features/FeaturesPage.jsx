import React from 'react';
import { motion } from 'framer-motion';
import { 
    Zap, Shield, BarChart3, Users, QrCode, 
    Smartphone, Bell, Globe, Sparkles 
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
        className="p-8 bg-slate-50/50 backdrop-blur-xl border border-slate-200/50 rounded-3xl group"
    >
        <div className="w-14 h-14 bg-gradient-to-br from-brand-100/10 to-brand-200/10 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
            <Icon className="w-7 h-7 text-brand-200" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-lg">
            {description}
        </p>
    </motion.div>
);

const FeaturesPage = () => {
    const mainFeatures = [
        {
            icon: QrCode,
            title: "Seamless QR Ticketing",
            description: "No more paper trails. Smart QR codes provide instant check-ins and eliminate fraud entirely.",
            delay: 0.1
        },
        {
            icon: Shield,
            title: "Ultra-Secure Payments",
            description: "Industry-standard encryption for all transactions. Your financial data is always protected.",
            delay: 0.2
        },
        {
            icon: BarChart3,
            title: "Real-time Analytics",
            description: "Organizers get deep insights into attendance, revenue, and engagement trends.",
            delay: 0.3
        },
        {
            icon: Smartphone,
            title: "Mobile-First Experience",
            description: "A gorgeous, responsive interface that works perfectly on every device, everywhere.",
            delay: 0.4
        },
        {
            icon: Bell,
            title: "Smart Notifications",
            description: "Stay updated with instant alerts for ticket sales, event updates, and community news.",
            delay: 0.5
        },
        {
            icon: Globe,
            title: "Global Reach",
            description: "Host events for an international audience with multi-currency and global payment support.",
            delay: 0.6
        }
    ];

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            {/* Hero Section */}
            <header className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Background Blobs - Light and subtle */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-100/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

                <div className="container mx-auto max-w-7xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-brand-200 text-sm font-bold mb-8"
                    >
                        <Sparkles className="w-4 h-4" />
                        Platform Features
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight tracking-tight"
                    >
                        Built for the <span className="text-brand-100 italic font-light">Next Generation</span> of Events
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
                    >
                        GoPass provides everything you need to organize, manage, and discover 
                        unforgettable experiences with cutting-edge technology.
                    </motion.p>
                </div>
            </header>

            {/* Features Grid */}
            <section className="py-24 px-6 relative">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {mainFeatures.map((feature, i) => (
                            <FeatureCard key={i} {...feature} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Section */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="container mx-auto max-w-7xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">Ready to transform your events?</h2>
                        <p className="text-slate-500 text-xl mb-12">
                            Join thousands of organizers and millions of attendees who are already 
                            experiencing the GoPass difference.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button className="px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl shadow-slate-900/20">
                                Get Started Free
                            </button>
                            <button className="px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-xl hover:bg-slate-50 transition-colors border border-slate-200">
                                Schedule Demo
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default FeaturesPage;
