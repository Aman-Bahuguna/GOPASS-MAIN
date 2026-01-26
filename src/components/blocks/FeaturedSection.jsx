import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Play, MoreHorizontal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeaturedSection = () => {
    const container = useRef();
    const cardRef = useRef();
    const contentRef = useRef();
    const titleRef = useRef();


    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(titleRef.current.children, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        })
            .from(cardRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                scale: 0.95,
                ease: "power3.out"
            }, "-=0.5")
            .from(contentRef.current.children, {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.8");

    }, { scope: container });

    return (
        <section ref={container} className="w-full min-h-screen flex flex-col justify-center bg-white py-12 px-4 md:px-8 relative overflow-hidden">
            <div className="container mx-auto max-w-7xl h-full flex flex-col justify-center">

                {/* Header Content */}
                <div ref={titleRef} className="mb-8 md:mb-12 relative">
                    <div className="flex justify-between items-end">
                        <div>
                            {/* Removed Event By Text */}
                            <h2 className="text-6xl md:text-8xl font-serif font-medium text-slate-900 tracking-tight leading-[0.9]">
                                Gateway to <br />
                                unforgettable events.
                            </h2>
                        </div>

                        {/* Quote Bubble Absolute Positioned relative to container or flexed */}
                        {/* Bubble Removed */}
                    </div>
                </div>

                {/* Main Visual Card */}
                <div
                    ref={cardRef}
                    className="relative w-full aspect-[16/9] md:aspect-[2.35/1] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl group"
                >
                    {/* Background Image */}
                    <img
                        src="/events/hackathon.png"
                        alt="Hackathon Event"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />

                    {/* Overlay Gradient (Subtle) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                    {/* Floating UI Elements */}
                    <div ref={contentRef} className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">

                        {/* Top Row */}
                        <div className="flex justify-between items-start">
                            {/* Abstract Shape / Toggle */}
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-16 bg-white rounded-t-full rounded-b-xl shadow-lg z-10" />
                                <div className="w-12 h-12 bg-[#1a1a1a] rounded-2xl shadow-lg -mt-4" />
                            </div>

                            {/* Menu Dots */}
                            <button className="text-white/80 hover:text-white transition-colors">
                                <MoreHorizontal className="w-8 h-8 drop-shadow-md" />
                            </button>
                        </div>

                        {/* Bottom Row */}
                        <div className="flex justify-between items-end">
                            {/* Watch Button Removed */}
                            <div></div>

                            {/* Navigation Arrows */}
                            <div className="flex gap-3">
                                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100 transition-colors">
                                    <ArrowLeft className="w-5 h-5 text-slate-900" />
                                </button>
                                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100 transition-colors">
                                    <ArrowRight className="w-5 h-5 text-slate-900" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FeaturedSection;
