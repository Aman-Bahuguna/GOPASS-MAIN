import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, selectEventsStatus } from '../store/slices/eventsSlice';
import HeroSection from '../components/blocks/HeroSection';
import ShowcaseSection from '../components/blocks/ShowcaseSection';
import DeckSection from '../components/blocks/DeckSection';
import FeaturedSection from '../components/blocks/FeaturedSection';

import ConnectSection from '../components/blocks/ConnectSection';
import VisionSection from '../components/blocks/VisionSection';
import Footer from '../components/blocks/Footer';

import Navbar from '../components/ui/Navbar';
import Lenis from 'lenis';

const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const eventStatus = useSelector(selectEventsStatus);

    useEffect(() => {
        if (eventStatus === 'idle') {
            dispatch(fetchEvents());
        }
    }, [eventStatus, dispatch]);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <main className="w-full min-h-screen bg-ui-100 text-foreground selection:bg-brand-200 selection:text-white">
            <Navbar 
                onNavigateToLogin={() => navigate('/login')} 
                onNavigateToSignup={() => navigate('/signup')} 
            />
            <HeroSection onJoinForFree={() => navigate('/signup')} />
            <ShowcaseSection />
            {/* <DeckSection /> */}
            <FeaturedSection />
            <ConnectSection 
                onExploreEvents={() => navigate('/events')} 
                onLearnMore={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            />
            <VisionSection 
                onAbout={() => navigate('/about')} 
                onSignup={() => navigate('/signup')}
            />

            <Footer />
        </main>
    );
}

export default LandingPage;
