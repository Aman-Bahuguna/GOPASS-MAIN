import React from 'react';
import { motion } from 'framer-motion';
import { 
    Book, Code, Zap, 
    Smartphone, Globe, Shield, 
    ArrowRight, Sparkles 
} from 'lucide-react';

const DocCard = ({ icon: Icon, title, description, items, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:shadow-xl transition-all group"
    >
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-brand-200 group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-500 mb-8 font-sans">{description}</p>
        <ul className="space-y-4">
            {items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600 hover:text-brand-100 cursor-pointer text-base group/item">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0" />
                    {item}
                </li>
            ))}
        </ul>
    </motion.div>
);

const DocumentationPage = () => {
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
                        Developer Tools
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-bold text-slate-900 mb-8 tracking-tight">
                        Everything you need <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-100 to-brand-300 italic font-medium">to build with GoPass</span>
                    </h1>
                </div>
            </section>

            {/* Docs Grid */}
            <section className="py-24 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <DocCard 
                            icon={Zap}
                            title="Getting Started"
                            description="Learn the basics of creating and managing your first event on GoPass."
                            items={["Quickstart Guide", "Account Setup", "Creating Events", "Ticket Types"]}
                            delay={0.1}
                        />
                        <DocCard 
                            icon={Code}
                            title="SDKs & Libraries"
                            description="Ready-to-use libraries for React, NodeJS, and Python to speed up your build."
                            items={["React SDK", "Java Library", "Python Scripts", "Webhooks Guide"]}
                            delay={0.2}
                        />
                        <DocCard 
                            icon={Shield}
                            title="Security & Auth"
                            description="Implement secure ticketing and attendee verification for your events."
                            items={["OAuth2 Flow", "Token Secrets", "Role Scopes", "Rate Limiting"]}
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* Sub-Guide Section */}
            <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-100/5 to-transparent pointer-events-none" />
                <div className="container mx-auto max-w-4xl relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Looking for the API reference?</h2>
                    <p className="text-white/60 text-xl mb-12">
                        Our full REST API documentation is currently in private beta. Early access 
                        partners can view all endpoints and schema definitions.
                    </p>
                    <button className="px-12 py-5 bg-white text-slate-900 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-xl">
                        Request Private Beta
                    </button>
                    <p className="text-white/40 mt-8 text-sm italic font-sans">
                        Public API release slated for Q3 2026.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default DocumentationPage;
