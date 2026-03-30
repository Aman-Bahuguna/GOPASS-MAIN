import React from 'react';
import { motion } from 'framer-motion';
import { 
    Search, HelpCircle, User, 
    CreditCard, Ticket, Globe, 
    MessageSquare, ArrowRight, Sparkles 
} from 'lucide-react';

const HelpCategory = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -5, backgroundColor: 'rgba(0,0,0,0.02)' }}
        className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] cursor-pointer group"
    >
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm text-brand-200 group-hover:scale-110 transition-transform">
            <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">{title}</h3>
        <p className="text-slate-500 mb-6 font-sans text-sm leading-relaxed">{description}</p>
        <div className="flex items-center gap-2 text-brand-200 font-bold text-sm">
            View Articles <ArrowRight className="w-4 h-4" />
        </div>
    </motion.div>
);

const HelpCenterPage = () => {
    return (
        <div className="min-h-screen bg-white overflow-hidden pt-32 pb-24 px-6 relative">
            {/* Header / Search */}
            <header className="container mx-auto max-w-4xl text-center mb-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-brand-200 text-sm font-bold mb-8 shadow-sm"
                >
                    <HelpCircle className="w-4 h-4" />
                    How can we help?
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
                    GoPass <span className="text-brand-100 italic font-light">Support Hub</span>
                </h1>
                
                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto mt-12 mb-20">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300" />
                    <input 
                        type="text" 
                        placeholder="Search for answers (e.g. refund, event setup)" 
                        className="w-full bg-slate-50 border border-slate-200 px-16 py-6 rounded-[2rem] text-slate-900 focus:outline-none focus:border-brand-200 transition-colors shadow-sm text-lg"
                    />
                </div>
            </header>

            {/* Categories */}
            <section className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    <HelpCategory 
                        icon={Ticket}
                        title="Buying Tickets"
                        description="Learn how to find events, pay, and retrieve your QR passes."
                        delay={0.1}
                    />
                    <HelpCategory 
                        icon={User}
                        title="Your Account"
                        description="Manage your profile, security, and event preferences."
                        delay={0.2}
                    />
                    <HelpCategory 
                        icon={CreditCard}
                        title="Refunds & Payments"
                        description="Understand our payment terms and how to initiate a refund."
                        delay={0.3}
                    />
                    <HelpCategory 
                        icon={Globe}
                        title="Hosting Events"
                        description="Pro-tips for organizers to maximize their event reach."
                        delay={0.4}
                    />
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-12 lg:p-20 bg-slate-900 rounded-[4rem] text-center overflow-hidden shadow-2xl relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-100/10 via-brand-200/5 to-transparent pointer-events-none" />
                    <MessageSquare className="absolute top-10 right-10 w-32 h-32 text-white/5 rotate-12" />
                    
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Talk to a real explorer.</h2>
                        <p className="text-white/60 text-xl mb-12">
                            Can't find what you're looking for? Our community support team is 
                            active 24/7 on our Discord channel.
                        </p>
                        <button className="px-12 py-5 bg-white text-slate-900 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-xl">
                            Join Discord Support
                        </button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default HelpCenterPage;
