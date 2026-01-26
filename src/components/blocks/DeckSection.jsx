import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BadgeCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DECK_ITEMS = [
    { title: "Neon Nights", user: "@alex_art", color: "bg-[#FF6B6B]", rotate: -15, x: -250, z: 0 },
    { title: "Abstract Flow", user: "@sarah_des", color: "bg-[#4ECDC4]", rotate: -7.5, x: -120, z: 10 },
    { title: "Urban Pulse", user: "@mike_city", color: "bg-[#FFE66D]", rotate: 0, x: 0, z: 20 },
    { title: "Nature Zen", user: "@em_green", color: "bg-[#95E1D3]", rotate: 7.5, x: 120, z: 10 },
    { title: "Future Tech", user: "@david_vfx", color: "bg-[#F7FFF7]", rotate: 15, x: 250, z: 0 },
];

const DeckCard = ({ item, index }) => {
    return (
        <div
            className={`deck-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 md:w-72 md:h-96 rounded-3xl shadow-2xl border-4 border-white flex flex-col justify-between p-6 ${item.color} origin-bottom transition-shadow duration-500 hover:shadow-brand-200/50`}
            style={{ zIndex: index }}
        >
            <div className="flex justify-between items-start">
                <div className="w-8 h-8 rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-xs font-bold text-black/50">0{index + 1}</span>
                </div>
            </div>

            <div>
                <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 inline-flex items-center gap-2 shadow-sm mb-2 transform -translate-x-2">
                    <span className="text-xs font-bold text-foreground">{item.user}</span>
                    <BadgeCheck className="w-3 h-3 text-blue-500" fill="currentColor" color="white" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground leading-none">{item.title}</h3>
            </div>
        </div>
    );
};

const DeckSection = () => {
    const container = useRef();
    const cardsRef = useRef([]);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.deck-card');

        // Initial set: Stacked in center (slightly offset for "stack" feel)
        gsap.set(cards, {
            rotate: 0,
            xPercent: -50,
            yPercent: -50,
            x: 0,
            scale: 0.9 + (0.02 * container.current) // slight scale diff 
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top top", // Start when container hits top
                end: "+=150%", // Pin for 150% window height
                pin: true,
                scrub: 1,
                // markers: true 
            }
        });

        // Fan Out Animation
        tl.to(cards, {
            x: (i) => DECK_ITEMS[i].x,
            rotate: (i) => DECK_ITEMS[i].rotate,
            scale: 1,
            ease: "power2.out",
            stagger: 0.05, // Slight ripple effect
            duration: 1
        });

    }, { scope: container });

    return (
        <section ref={container} className="relative w-full h-screen bg-ui-100 flex flex-col items-center justify-center overflow-hidden py-20">
            <div className="text-center mb-12 relative z-10 pointer-events-none">
                <h2 className="text-5xl md:text-7xl font-bold font-serif mb-4 tracking-tighter">
                    Curated <br /> <span className="text-brand-100 italic">Masterpieces</span>
                </h2>
                <p className="text-ui-500 text-lg max-w-md mx-auto">
                    Swipe through the finest collection of local events and experiences.
                </p>
            </div>

            <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000">
                {DECK_ITEMS.map((item, index) => (
                    <DeckCard key={index} item={item} index={index} />
                ))}
            </div>
        </section>
    );
};

export default DeckSection;
