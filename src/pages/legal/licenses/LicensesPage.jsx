import React from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles } from 'lucide-react';

const LegalContent = ({ title, date, sections }) => (
    <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-brand-200 text-sm font-bold mb-8 shadow-sm"
            >
                <Award className="w-4 h-4" />
                Compliance Awards
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">{title}</h1>
            <p className="text-slate-400 font-sans">Last Updated: {date}</p>
        </div>

        <div className="prose prose-slate lg:prose-xl max-w-none bg-slate-50/50 border border-slate-100 p-12 lg:p-20 rounded-[3rem] shadow-sm">
            {sections.map((section, i) => (
                <div key={i} className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">{section.heading}</h2>
                    <p className="font-sans text-slate-600 leading-relaxed whitespace-pre-line">
                        {section.content}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

const LicensesPage = () => {
    const sections = [
        {
            heading: "1. Intellectual Property",
            content: "The GoPass website, its source code, design assets, and logos are the property of GoPass Team and are protected by international copyright and trademark laws. Unauthorized reproduction or use is strictly prohibited."
        },
        {
            heading: "2. Open Source Software (OSS)",
            content: "GoPass uses several open-source libraries and frameworks, including React, TailwindCSS, and Framer Motion. We are grateful for the vibrant developer community. All third-party software is used in accordance with their respective licenses (e.g. MIT, Apache 2.0)."
        },
        {
            heading: "3. User-Generated Licenses",
            content: "By uploading event descriptions and promotional images, you grant GoPass a non-exclusive, worldwide license to display that content for marketing and operational purposes related to your events on our platform."
        },
        {
            heading: "4. Compliance & Regulatory",
            content: "We operate in compliance with local event hosting laws and financial regulations. For specific inquiries regarding our licensing status in your jurisdiction, please reach out via our Help Center."
        }
    ];

    return (
        <div className="min-h-screen bg-white overflow-hidden pt-32 pb-24 px-6 relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-100/5 rounded-full blur-[150px] pointer-events-none" />
            <LegalContent title="Legal Licenses" date="March 30, 2026" sections={sections} />
        </div>
    );
};

export default LicensesPage;
