import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import PendingVerificationPage from './pages/PendingVerificationPage';
import UserDashboard from './pages/dashboards/user/UserDashboard';
import OrganizerDashboard from './pages/dashboards/organizer/OrganizerDashboard';
import AdminDashboard from './pages/dashboards/admin/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ROLES, USER_STATUS } from './utils/constants';
import { getDashboardRoute, isAccountFullyVerified } from './utils/roleConfig';

// Main App Content with Auth-aware routing
function AppContent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing'); // landing, auth, dashboard, pending
  const [initialAuthPage, setInitialAuthPage] = useState('login');

  // Determine which page to show based on authentication state
  useEffect(() => {
    if (isLoading) return;

    const path = window.location.pathname;

    if (isAuthenticated && user) {
      // Check if user needs verification
      if (!isAccountFullyVerified(user)) {
        setCurrentPage('pending');
        window.history.replaceState({ page: 'pending' }, '', '/pending-verification');
      } else {
        setCurrentPage('dashboard');
        const dashboardRoute = getDashboardRoute(user.role);
        window.history.replaceState({ page: 'dashboard' }, '', dashboardRoute);
      }
    } else {
      // Not authenticated
      if (path === '/login') {
        setCurrentPage('auth');
        setInitialAuthPage('login');
      } else if (path === '/signup') {
        setCurrentPage('auth');
        setInitialAuthPage('signup');
      } else {
        setCurrentPage('landing');
        window.history.replaceState({ page: 'landing' }, '', '/');
      }
    }
  }, [isAuthenticated, user, isLoading]);

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
        if (event.state.authPage) {
          setInitialAuthPage(event.state.authPage);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToLogin = () => {
    setInitialAuthPage('login');
    setCurrentPage('auth');
    window.history.pushState({ page: 'auth', authPage: 'login' }, '', '/login');
  };

  const navigateToSignup = () => {
    setInitialAuthPage('signup');
    setCurrentPage('auth');
    window.history.pushState({ page: 'auth', authPage: 'signup' }, '', '/signup');
  };

  const navigateToHome = () => {
    setCurrentPage('landing');
    window.history.pushState({ page: 'landing' }, '', '/');
  };

  const navigateToDashboard = () => {
    // Just set the page to dashboard - the useEffect will handle proper routing
    // when user state is available
    setCurrentPage('dashboard');
    if (user) {
      const dashboardRoute = getDashboardRoute(user.role);
      window.history.pushState({ page: 'dashboard' }, '', dashboardRoute);
    }
  };

  // Navigate to dashboard for a specific role (used during signup before user state updates)
  const navigateToDashboardForRole = (role) => {
    setCurrentPage('dashboard');
    const dashboardRoute = getDashboardRoute(role);
    window.history.pushState({ page: 'dashboard' }, '', dashboardRoute);
  };

  const navigateToPending = () => {
    setCurrentPage('pending');
    window.history.pushState({ page: 'pending' }, '', '/pending-verification');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-200 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Render appropriate page based on state
  const renderDashboard = () => {
    switch (user?.role) {
      case ROLES.ADMIN:
        return <AdminDashboard />;
      case ROLES.ORGANIZER:
        return <OrganizerDashboard />;
      case ROLES.USER:
      default:
        return <UserDashboard />;
    }
  };

  switch (currentPage) {
    case 'auth':
      return (
        <AuthPage
          initialPage={initialAuthPage}
          onNavigateToHome={navigateToHome}
          onLoginSuccess={navigateToDashboard}
          onSignupSuccess={(userData) => {
            // Users and Organizers go directly to dashboard (they're ACTIVE)
            // Admins go to pending verification (they need platform verification)
            if (userData?.role === ROLES.ADMIN) {
              navigateToPending();
            } else {
              // Use navigateToDashboardForRole since user state may not be set yet
              navigateToDashboardForRole(userData?.role || ROLES.USER);
            }
          }}
        />
      );
    case 'dashboard':
      return renderDashboard();
    case 'pending':
      return (
        <PendingVerificationPage
          onNavigateToHome={navigateToHome}
        />
      );
    case 'landing':
    default:
      return (
        <LandingPage
          onNavigateToLogin={navigateToLogin}
          onNavigateToSignup={navigateToSignup}
        />
      );
  }
}

// Root App with Provider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
