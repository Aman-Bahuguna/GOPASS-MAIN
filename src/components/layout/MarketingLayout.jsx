import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import Footer from '../blocks/Footer';
import { useEffect } from 'react';
import Lenis from 'lenis';

const MarketingLayout = () => {
    const navigate = useNavigate();

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
            <div className="pt-20">
                <Outlet />
            </div>
            <Footer />
        </main>
    );
};

export default MarketingLayout;
