import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ShowcaseSection = () => {
    // Images from HeroSection (first page)
    const HERO_IMAGES = [
        "/events/workshop.png",
        "/events/cultural_fest.png",
        "/events/hackathon.png",
        "/events/guest_lecture.png",
        "/events/tech_symposium.png",
    ];

    return (
        <section className="relative w-full min-h-[90vh] flex items-center bg-white overflow-hidden py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start h-full">

                    {/* Left Column: Content (Spans 5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-5 space-y-8 lg:pt-12" // Added top padding to shift down slightly but effectively "up" relative to center if needed, or we keep it regular. User asked to shift text "little to the up". reducing py on section helps.
                    >
                        <div className="space-y-4">
                            <span className="text-sm font-bold tracking-wider text-slate-500 uppercase">
                                Marketplace
                            </span>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-slate-900 leading-[1.05] tracking-tight">
                                Showcase, Sell, <br />
                                & <span className="text-brand-100">acquire tickets</span> to <br />
                                our marketplace.
                            </h2>
                            <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-lg">
                                A dynamic community where artists and buyers seamlessly merge.
                                GoPass brings together creators and enthusiasts to share creativity.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium text-lg hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/10 flex items-center gap-2">
                                Get Started
                            </button>
                            <button className="px-8 py-4 bg-slate-100 text-slate-900 rounded-full font-medium text-lg hover:bg-slate-200 transition-colors">
                                Read more
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Column: Visual Composition (Spans 7 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="lg:col-span-7 relative h-[600px] w-full mt-12 md:mt-24 lg:mt-32"
                    >
                        {/*
                           Diagonal Stack Container
                           - Card 5 anchored to bottom-right (right-0 bottom-0)
                           - Others overlap upwards and leftwards from there
                        */}
                        <div className="relative w-full h-full">

                            {/* Card 1: Top Left-ish (Calculated back from bottom-right) */}
                            <motion.div
                                className="absolute top-0 left-4 md:left-12 w-48 h-48 md:w-64 md:h-64 rounded-[32px] overflow-hidden shadow-2xl z-10 bg-slate-800 hover:scale-105 transition-transform duration-300"
                            >
                                <img src={HERO_IMAGES[0]} alt="Event 1" className="w-full h-full object-cover border-0" />
                            </motion.div>

                            {/* Card 2: Step Down & Right */}
                            <motion.div
                                className="absolute top-16 left-24 md:top-24 md:left-48 w-48 h-48 md:w-64 md:h-64 rounded-[32px] overflow-hidden shadow-2xl z-20 bg-slate-200 hover:scale-105 transition-transform duration-300"
                            >
                                <img src={HERO_IMAGES[1]} alt="Event 2" className="w-full h-full object-cover border-0" />

                                {/* @howard Bubble */}
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30">
                                    <div className="relative">
                                        <div className="bg-[#8B3D2F] text-white px-4 py-1.5 rounded-full font-medium text-sm shadow-md whitespace-nowrap">
                                            @howard
                                        </div>
                                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-0 h-0 border-l-[6px] border-l-transparent border-t-[6px] border-t-[#8B3D2F] border-r-[6px] border-r-transparent"></div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 3: Step Down & Right */}
                            <motion.div
                                className="absolute top-32 left-44 md:top-48 md:left-[21rem] w-48 h-48 md:w-64 md:h-64 rounded-[32px] overflow-hidden shadow-2xl z-30 bg-slate-100 hover:scale-105 transition-transform duration-300"
                            >
                                <img src={HERO_IMAGES[2]} alt="Event 3" className="w-full h-full object-cover border-0" />
                            </motion.div>

                            {/* Card 4: Step Down & Right */}
                            <motion.div
                                className="absolute top-48 left-64 md:top-72 md:left-[30rem] w-48 h-48 md:w-64 md:h-64 rounded-[32px] overflow-hidden shadow-2xl z-40 bg-slate-300 hover:scale-105 transition-transform duration-300"
                            >
                                <img src={HERO_IMAGES[3]} alt="Event 4" className="w-full h-full object-cover border-0" />

                                {/* @robin Bubble */}
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30">
                                    <div className="relative">
                                        <div className="bg-[#1A1A1A] text-white px-4 py-1.5 rounded-full font-medium text-sm shadow-md whitespace-nowrap">
                                            @robin
                                        </div>
                                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-0 h-0 border-l-[6px] border-l-transparent border-t-[6px] border-t-[#1A1A1A] border-r-[6px] border-r-transparent"></div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 5: Bottom Right Anchor */}
                            <motion.div
                                className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 rounded-[32px] overflow-hidden shadow-2xl z-50 bg-yellow-400 hover:scale-105 transition-transform duration-300"
                            >
                                <img src={HERO_IMAGES[4]} alt="Event 5" className="w-full h-full object-cover border-0" />
                            </motion.div>



                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default ShowcaseSection;
