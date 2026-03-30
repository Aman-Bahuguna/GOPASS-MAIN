import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Sparkles } from 'lucide-react';

const LegalContent = ({ title, date, sections }) => (
    <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-brand-200 text-sm font-bold mb-8 shadow-sm"
            >
                <Globe className="w-4 h-4" />
                Browser Settings
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

const CookiePolicyPage = () => {
    const sections = [
        {
            heading: "1. What are Cookies?",
            content: "Cookies are small text files stored on your device to help websites remember your preferences, keep you logged in, and understand how you interact with the content. At GoPass, we use them to enhance your browsing experience and secure our platform."
        },
        {
            heading: "2. Types of Cookies We Use",
            content: "• Essential Cookies: Necessary for basic site functionality (e.g. login session, secure ticket checkout).\n• Analytics Cookies: Help us understand how users navigate the site to improve features.\n• Functional Cookies: Remember your site preferences (e.g. language, theme)."
        },
        {
            heading: "3. Third-Party Cookies",
            content: "We use third-party tools like Google Analytics and Stripe, which may set their own cookies to provide their specific services. We do not control these cookies, and we recommend reviewing their individual privacy policies."
        },
        {
            heading: "4. Managing Your Cookies",
            content: "You can control cookie settings through your browser's preferences. Disabling essential cookies may impact the performance and security of your GoPass account. You can clear your cookie history at any time through your browser settings."
        }
    ];

    return (
        <div className="min-h-screen bg-white overflow-hidden pt-32 pb-24 px-6 relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-100/5 rounded-full blur-[150px] pointer-events-none" />
            <LegalContent title="Cookie Policy" date="March 30, 2026" sections={sections} />
        </div>
    );
};

export default CookiePolicyPage;
