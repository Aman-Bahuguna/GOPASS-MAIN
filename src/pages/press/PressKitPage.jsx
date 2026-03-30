import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, ImageIcon, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';

const PressSection = ({ title, description, items, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="p-12 bg-slate-50 border border-slate-100 rounded-[3rem]"
    >
        <div className="max-w-2xl text-center mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{title}</h2>
            <p className="text-slate-500 leading-relaxed">{description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center cursor-pointer group"
                >
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 text-brand-200 group-hover:scale-110 transition-transform">
                        <item.icon className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2 font-serif">{item.name}</h4>
                    <p className="text-xs text-slate-400 mb-6 font-sans lowercase">{item.size}</p>
                    <button className="flex items-center gap-2 text-brand-200 font-bold group-hover:text-brand-100">
                        Download <Download className="w-4 h-4" />
                    </button>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

const PressKitPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="pt-32 pb-24 px-6 text-center relative overflow-hidden bg-slate-50">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-100/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="container mx-auto max-w-7xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-brand-200 text-sm font-bold mb-8 shadow-sm"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        Assets & Guidelines
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-bold text-slate-900 mb-8 tracking-tight">
                        Our <span className="text-brand-100 italic font-light">brand kit.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-normal max-w-2xl mx-auto leading-relaxed">
                        Find everything you need to tell our story, including official logos,
                        brand assets, and voice guidelines.
                    </p>
                </div>
            </section>

            {/* Assets */}
            <section className="py-24 px-6 space-y-12">
                <div className="container mx-auto max-w-7xl">
                    <PressSection 
                        title="Official Logos"
                        description="Our primary logos in multiple formats (PNG, SVG, EPS) with transparent backgrounds and light/dark versions."
                        items={[
                            { icon: ImageIcon, name: "GoPass Primary", size: "SVG • 12 KB" },
                            { icon: ImageIcon, name: "GoPass Mono", size: "PNG • 840 KB" },
                            { icon: ImageIcon, name: "Symbol Light", size: "PNG • 1.2 MB" },
                            { icon: ImageIcon, name: "App Icon Kit", size: "ZIP • 4.5 MB" }
                        ]}
                        delay={0.1}
                    />

                    <div className="pt-12" />

                    <PressSection 
                        title="Brand Assets"
                        description="Photography, illustrations, and high-resolution screen captures of the GoPass experience."
                        items={[
                            { icon: ImageIcon, name: "Product UI Kit", size: "ZIP • 120 MB" },
                            { icon: ImageIcon, name: "Team Photos", size: "JPG • 45 MB" },
                            { icon: FileText, name: "Style Guide", size: "PDF • 2.4 MB" },
                            { icon: FileText, name: "Press Release Template", size: "DOCX • 140 KB" }
                        ]}
                        delay={0.2}
                    />
                </div>
            </section>

            {/* Contact Inquiry */}
            <section className="py-24 px-6 bg-slate-900 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-100/10 to-brand-300/10 pointer-events-none" />
                <div className="container mx-auto max-w-4xl relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">Need something else?</h2>
                    <p className="text-white/60 text-xl mb-12">
                        For specific inquiries, interview requests, or partnership opportunities, 
                        reach out to our media relations team directly.
                    </p>
                    <button className="px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto">
                        Contact Press Team <ExternalLink className="w-5 h-5 flex-shrink-0" />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default PressKitPage;
