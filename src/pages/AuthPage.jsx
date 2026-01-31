import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

export default function AuthPage({ initialPage = 'login', onNavigateToHome, onLoginSuccess, onSignupSuccess }) {
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

    // Minimal, premium transition - inspired by Apple's design
    const pageVariants = {
        enter: (direction) => ({
            opacity: 0,
            scale: 0.96,
            filter: 'blur(8px)',
            x: direction > 0 ? 50 : -50,
        }),
        center: {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            x: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1], // Apple's easing curve
            },
        },
        exit: (direction) => ({
            opacity: 0,
            scale: 1.02,
            filter: 'blur(8px)',
            x: direction > 0 ? -50 : 50,
            transition: {
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
            },
        }),
    };

    // Subtle background gradient transition
    const backgroundVariants = {
        login: {
            background: 'linear-gradient(135deg, rgba(245, 247, 250, 1) 0%, rgba(250, 251, 252, 1) 100%)',
        },
        signup: {
            background: 'linear-gradient(135deg, rgba(250, 251, 252, 1) 0%, rgba(245, 247, 250, 1) 100%)',
        },
    };

    return (
        <motion.div
            className="min-h-screen relative overflow-hidden"
            initial={false}
            animate={isLogin ? 'login' : 'signup'}
            variants={backgroundVariants}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
            {/* Subtle shimmer effect during transition */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                initial={{ x: '-100%' }}
                animate={{ x: isLogin ? '100%' : '-100%' }}
                transition={{
                    duration: 1.2,
                    ease: 'easeInOut',
                }}
            />

            {/* Minimal page transitions */}
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
                            onNavigateToHome={onNavigateToHome}
                            onLoginSuccess={onLoginSuccess}
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
                            onNavigateToHome={onNavigateToHome}
                            onSignupSuccess={onSignupSuccess}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Premium transition overlay */}
            <AnimatePresence>
                <motion.div
                    key={`overlay-${isLogin ? 'login' : 'signup'}`}
                    className="absolute inset-0 bg-white pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0.4 }}
                    transition={{
                        duration: 0.2,
                        ease: 'easeOut',
                    }}
                />
            </AnimatePresence>
        </motion.div>
    );
}
