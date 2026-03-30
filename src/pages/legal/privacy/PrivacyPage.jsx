import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles } from 'lucide-react';

const LegalContent = ({ title, date, sections }) => (
    <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-brand-200 text-sm font-bold mb-8 shadow-sm"
            >
                <ShieldCheck className="w-4 h-4" />
                Legal Update
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">{title}</h1>
            <p className="text-slate-400 font-sans">Last Updated: {date}</p>
        </div>

        <div className="prose prose-slate lg:prose-xl max-w-none bg-slate-50/50 border border-slate-100 p-12 lg:p-20 rounded-[3rem] shadow-sm">
            {sections.map((section, i) => (
                <div key={i} className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">{section.heading}</h2>
                    <p className="text-slate-600 leading-relaxed font-sans whitespace-pre-line">
                        {section.content}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

const PrivacyPage = () => {
    const sections = [
        {
            heading: "1. Information We Collect",
            content: "We collect information you provide directly to us when you create an account, search for events, purchase tickets, or communicate with us. This includes your name, email address, payment information, and event preferences. We also automatically collect technical data like IP addresses and browsing behavior via cookies to improve our platform's security and performance."
        },
        {
            heading: "2. How We Use Your Data",
            content: "Your data is primarily used to process ticket orders, facilitate entry to events via QR verification, and personalize your event recommendations. We may also use your information to send you updates about events you've registered for, security alerts, and platform announcements."
        },
        {
            heading: "3. Data Sharing & Third Parties",
            content: "GoPass does not sell your personal data. We share information with event organizers (only for the events you attend) to facilitate check-ins and venue management. We also work with trusted payment processors like Stripe and analytics providers who adhere to strict data protection standards."
        },
        {
            heading: "4. Your Privacy Rights",
            content: "Depending on your location, you have rights to access, correct, delete, or limit the use of your personal data. You can manage your privacy settings directly within your GoPass dashboard or contact our support team for a full data export or deletion request."
        }
    ];

    return (
        <div className="min-h-screen bg-white overflow-hidden pt-32 pb-24 px-6 relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-100/5 rounded-full blur-[150px] pointer-events-none" />
            <LegalContent title="Privacy Policy" date="March 30, 2026" sections={sections} />
        </div>
    );
};

export default PrivacyPage;
