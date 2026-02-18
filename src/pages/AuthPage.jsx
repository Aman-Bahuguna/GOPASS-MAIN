import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

export default function AuthPage({ initialPage = 'login' }) {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(initialPage === 'login');
    const [direction, setDirection] = useState(0);

    const handleNavigateToSignup = () => {
        setDirection(1);
        setIsLogin(false);
    };

    const handleNavigateToLogin = () => {
        setDirection(-1);
        setIsLogin(true);
    };

    // Lightweight transition — opacity + subtle translate only (no blur, no scale)
    const pageVariants = {
        enter: (direction) => ({
            opacity: 0,
            x: direction > 0 ? 40 : -40,
        }),
        center: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.35,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
        exit: (direction) => ({
            opacity: 0,
            x: direction > 0 ? -40 : 40,
            transition: {
                duration: 0.25,
                ease: [0.25, 0.1, 0.25, 1],
            },
        }),
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 to-white">
            {/* Clean page transitions — no shimmer, no overlay, no blur */}
            <AnimatePresence mode="wait" custom={direction} initial={false}>
                {isLogin ? (
                    <motion.div
                        key="login"
                        custom={direction}
                        variants={pageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0"
                    >
                        <LoginPage
                            onNavigateToSignup={handleNavigateToSignup}
                            onNavigateToHome={() => navigate('/')}
                            onLoginSuccess={() => { }} // Navigation handled by App.jsx
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="signup"
                        custom={direction}
                        variants={pageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0"
                    >
                        <SignupPage
                            onNavigateToLogin={handleNavigateToLogin}
                            onNavigateToHome={() => navigate('/')}
                            onSignupSuccess={() => { }} // Navigation handled by App.jsx
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
