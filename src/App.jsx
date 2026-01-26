import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';

function App() {
  // Toggle between landing page and auth pages
  const [showAuth, setShowAuth] = useState(false);
  const [initialAuthPage, setInitialAuthPage] = useState('login'); // 'login' or 'signup'

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.showAuth !== undefined) {
        setShowAuth(event.state.showAuth);
        if (event.state.authPage) {
          setInitialAuthPage(event.state.authPage);
        }
      } else {
        // Default to landing page
        setShowAuth(false);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Set initial state based on current URL
    const path = window.location.pathname;
    if (path === '/login') {
      setShowAuth(true);
      setInitialAuthPage('login');
      window.history.replaceState({ showAuth: true, authPage: 'login' }, '', '/login');
    } else if (path === '/signup') {
      setShowAuth(true);
      setInitialAuthPage('signup');
      window.history.replaceState({ showAuth: true, authPage: 'signup' }, '', '/signup');
    } else {
      window.history.replaceState({ showAuth: false }, '', '/');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToLogin = () => {
    setInitialAuthPage('login');
    setShowAuth(true);
    window.history.pushState({ showAuth: true, authPage: 'login' }, '', '/login');
  };

  const navigateToSignup = () => {
    setInitialAuthPage('signup');
    setShowAuth(true);
    window.history.pushState({ showAuth: true, authPage: 'signup' }, '', '/signup');
  };

  const navigateToHome = () => {
    setShowAuth(false);
    window.history.pushState({ showAuth: false }, '', '/');
  };

  return showAuth ? (
    <AuthPage initialPage={initialAuthPage} onNavigateToHome={navigateToHome} />
  ) : (
    <LandingPage onNavigateToLogin={navigateToLogin} onNavigateToSignup={navigateToSignup} />
  );
}

export default App
