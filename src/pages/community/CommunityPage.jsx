import React from 'react';
import { motion } from 'framer-motion';
import { 
    MessageSquare, Users, Award, 
    Share2, ExternalLink, Heart, Sparkles 
} from 'lucide-react';

const CommunityCard = ({ icon: Icon, title, description, count, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ x: 5, backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
        className="p-8 bg-slate-50/50 border border-slate-200 rounded-3xl cursor-pointer group"
    >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${color}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 mb-6 font-sans">{description}</p>
        <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-brand-200">{count}</span>
            <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
        </div>
    </motion.div>
);

const CommunityPage = () => {
    return (
        <div className="min-h-screen bg-white overflow-hidden pt-32 pb-24 px-6 relative">
            {/* Background Blob */}
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-100/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-brand-200 text-sm font-bold mb-8"
                    >
                        <Sparkles className="w-4 h-4" />
                        Join the Movement
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-slate-900 mb-8"
                    >
                        Built with the <span className="text-brand-100 italic font-light">Community</span>, for the community
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-xl md:text-2xl max-w-3xl mx-auto"
                    >
                        Connect with fellow explorers, event organizers, and creators. 
                        Share experiences, get support, and help shape the future of GoPass.
                    </motion.p>
                </div>

                {/* Main Hub Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    <CommunityCard 
                        icon={MessageSquare}
                        title="Discussion Forum"
                        description="Vibrant conversations about everything from venue ideas to tech hacks."
                        count="25.4k+ Topics"
                        color="bg-purple-500 shadow-purple-500/20"
                        delay={0.1}
                    />
                    <CommunityCard 
                        icon={Award}
                        title="Partner Program"
                        description="Exclusive perks for organizers who consistently host high-rated events."
                        count="1.2k Partners"
                        color="bg-amber-500 shadow-amber-500/20"
                        delay={0.2}
                    />
                    <CommunityCard 
                        icon={Share2}
                        title="Open Source"
                        description="Contribute to our UI kits and event management workflows on GitHub."
                        count="3.8k Stars"
                        color="bg-brand-200 shadow-brand-200/20"
                        delay={0.3}
                    />
                </div>

                {/* Join Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative p-12 lg:p-20 bg-slate-900 rounded-[3rem] text-center overflow-hidden shadow-2xl"
                >
                    {/* Floating Icons Background - Subtle in dark container */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <Users className="absolute top-10 left-10 w-24 h-24 rotate-12 text-white" />
                        <Heart className="absolute bottom-10 right-10 w-24 h-24 -rotate-12 text-white" />
                        <Share2 className="absolute top-[40%] left-[80%] w-20 h-20 rotate-45 text-white" />
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">Be part of something bigger.</h2>
                        <p className="text-white/60 text-xl mb-12">
                            GoPass is more than a platform—it's a community of millions creating meaningful moments together.
                        </p>
                        <button className="px-12 py-5 bg-white text-slate-900 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-xl">
                            Join Discord Channel
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CommunityPage;
