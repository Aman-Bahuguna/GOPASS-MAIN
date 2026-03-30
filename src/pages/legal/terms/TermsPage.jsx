import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles } from 'lucide-react';

const LegalContent = ({ title, date, sections }) => (
    <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-brand-200 text-sm font-bold mb-8 shadow-sm"
            >
                <FileText className="w-4 h-4" />
                Service Agreement
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

const TermsPage = () => {
    const sections = [
        {
            heading: "1. Acceptance of Terms",
            content: "By accessing or using the GoPass platform, you agree to comply with and be bound by these Terms of Service. If you do not agree, you must not use our website, application, or services."
        },
        {
            heading: "2. User Registration & Security",
            content: "You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to notify GoPass immediately of any unauthorized use or security breach."
        },
        {
            heading: "3. Ticket Sales & Refund Policy",
            content: "GoPass acts as a facilitator for ticket sales between event organizers and attendees. All tickets are subject to the specific organizer's refund policy. GoPass processing fees are generally non-refundable except as required by law."
        },
        {
            heading: "4. Prohibited Conduct",
            content: "You agree not to use GoPass to: (a) violate any laws or regulations; (b) impersonate any person; (c) interfere with or disrupt the platform's functionality; (d) submit fraudulent or unauthorized event listings."
        },
        {
            heading: "5. Limitation of Liability",
            content: "To the maximum extent permitted by law, GoPass shall not be liable for any indirect, incidental, or special damages arising out of your use of our services or attendance at events hosted through our platform."
        }
    ];

    return (
        <div className="min-h-screen bg-white overflow-hidden pt-32 pb-24 px-6 relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-100/5 rounded-full blur-[150px] pointer-events-none" />
            <LegalContent title="Terms of Service" date="March 30, 2026" sections={sections} />
        </div>
    );
};

export default TermsPage;
