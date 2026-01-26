import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EventCard = ({ title, date, location, color }) => {
    const cardRef = useRef();

    useGSAP(() => {
        const card = cardRef.current;

        // 1. Entry Animation
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 60,
                scale: 0.9,
                filter: 'blur(10px)'
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 95%', // Starts when top of card hits 95% of viewport height (just entering)
                    end: 'top 60%',   // Ends when top of card is at 60% of viewport
                    scrub: 1,         // Smooth scrubbing
                }
            }
        );

        // 2. Parallax / Float Effect (Continuous while in view)
        gsap.to(card, {
            y: -40, // Moves up slightly as it scrolls (parallax)
            ease: 'none',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            }
        });

        // 3. Exit Animation
        gsap.to(card, {
            opacity: 0,
            y: -50, // Continue moving up but faster? Or just the fade out params: translateY 0 -> -30px (relative to current)
            scale: 0.95,
            filter: 'blur(5px)',
            scrollTrigger: {
                trigger: card,
                start: 'center 20%', // Starts fading out when center is near top
                end: 'bottom top',   // Fully gone when bottom leaves top
                scrub: 1,
            }
        });

    }, { scope: cardRef });

    return (
        <div
            ref={cardRef}
            className="relative mx-auto w-full max-w-3xl bg-white rounded-3xl p-8 shadow-xl border border-ui-200 flex flex-col md:flex-row gap-8 items-center md:items-start"
            style={{ willChange: 'transform, opacity, filter' }} // Hardware acceleration hints
        >
            {/* Abstract Image/Color Block */}
            <div className={`w-full md:w-48 h-48 rounded-2xl flex-shrink-0 ${color} shadow-inner bg-gradient-to-br from-white/10 to-black/5`}></div>

            <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-serif font-semibold text-foreground mb-4">{title}</h3>
                <div className="flex flex-col md:flex-row gap-4 text-ui-500 font-medium mb-6 justify-center md:justify-start">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-brand-200" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-brand-200" />
                        <span>{location}</span>
                    </div>
                </div>
                <p className="text-ui-500 mb-6 leading-relaxed">
                    Experience the local vibes with exclusive access to this premier event. Limited tickets available for the community.
                </p>
                <button className="px-6 py-2 border border-ui-300 rounded-full hover:bg-ui-200 transition-colors font-medium text-sm">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default EventCard;
