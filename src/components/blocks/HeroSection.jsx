import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

const HERO_IMAGES = [
    "/events/hackathon.png",
    "/events/workshop.png",
    "/events/guest_lecture.png",
    "/events/cultural_fest.png",
    "/events/tech_symposium.png",
    "/events/sports.png",
    "/events/networking.png",
];

const HeroSection = ({ onJoinForFree }) => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Initial setup
        gsap.set(cardsRef.current, {
            y: 500,
            opacity: 0,
            rotate: 0,
            scale: 0.8
        });

        // Intro Animation for text
        tl.fromTo(".hero-element",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.1 }
        )
            .to(cardsRef.current, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                stagger: {
                    amount: 0.3,
                    from: "center"
                },
                ease: "back.out(1.2)"
            }, "-=0.5");

        // Fanning Effect
        cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const mid = Math.floor(HERO_IMAGES.length / 2); // 3 for 7 items
            const dist = i - mid;

            // Adjusted values for 7 cards to maintain the "Hand" look without excessive spread
            const rotation = dist * 10;
            const xOffset = dist * 50;
            const yOffset = Math.abs(dist) * 15;
            const scale = 1 - Math.abs(dist) * 0.05;

            const zIndex = 50 - Math.abs(dist) * 10;
            gsap.set(card, { zIndex: zIndex });

            gsap.to(card, {
                rotation: rotation,
                x: xOffset,
                y: yOffset,
                scale: scale,
                duration: 1.5,
                delay: 0.8,
                ease: "power2.out"
            });
        });

        // Floating animation loop
        cardsRef.current.forEach((card) => {
            gsap.to(card, {
                y: `-=${10 + Math.random() * 5}`,
                rotation: `+=${(Math.random() - 0.5) * 3}`,
                duration: 2 + Math.random(),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 2 + Math.random()
            });
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-[#ffffff] flex flex-col items-center justify-start pt-12 pb-16 overflow-hidden">

            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-blue-50/50 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center">

                {/* Headline */}
                <h1 className="hero-element text-6xl md:text-7xl lg:text-8xl font-serif text-slate-900 leading-[1.1] tracking-tight mb-12">
                    Host experiences that <br />
                    <span className="text-brand-100 italic font-light">inspire connection.</span>
                </h1>

                {/* Cards Fan - Adjusted container height/margin for alignment */}
                <div className="hero-element relative h-[400px] w-full max-w-5xl mx-auto mb-6">
                    {HERO_IMAGES.map((img, i) => (
                        <div
                            key={i}
                            ref={el => cardsRef.current[i] = el}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-3xl shadow-2xl shadow-slate-900/20 w-56 h-56 md:w-72 md:h-72 origin-bottom"
                        >
                            <div className="w-full h-full rounded-3xl overflow-hidden relative border border-white/20">
                                <img
                                    src={img}
                                    alt={`Hero Event ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Subtext */}
                <p className="hero-element text-lg md:text-xl text-slate-500 font-sans font-normal leading-relaxed max-w-2xl mx-auto mb-8">
                    Creators can share their exclusive events, and explorers can
                    discover unique experiences in their city.
                </p>

                {/* CTA Buttons */}
                <div className="hero-element flex flex-wrap justify-center gap-4">
                    <button
                        onClick={onJoinForFree}
                        className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium text-lg hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/20 flex items-center gap-2 group"
                    >
                        Join for Free
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-medium text-lg hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 hover:border-slate-300">
                        Read Success Stories
                    </button>
                </div>

            </div>
        </section>
    );
};

export default HeroSection;
