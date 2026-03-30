import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, selectEventsStatus } from '../store/slices/eventsSlice';
import HeroSection from '../components/blocks/HeroSection';
import ShowcaseSection from '../components/blocks/ShowcaseSection';
import FeaturedSection from '../components/blocks/FeaturedSection';
import ConnectSection from '../components/blocks/ConnectSection';
import VisionSection from '../components/blocks/VisionSection';

const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const eventStatus = useSelector(selectEventsStatus);

    useEffect(() => {
        if (eventStatus === 'idle') {
            dispatch(fetchEvents());
        }
    }, [eventStatus, dispatch]);

    return (
        <>
            <HeroSection onJoinForFree={() => navigate('/signup')} />
            <ShowcaseSection />
            <FeaturedSection />
            <ConnectSection 
                onExploreEvents={() => navigate('/events')} 
                onLearnMore={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            />
            <VisionSection 
                onAbout={() => navigate('/about')} 
                onSignup={() => navigate('/signup')}
            />
        </>
    );
}

export default LandingPage;
