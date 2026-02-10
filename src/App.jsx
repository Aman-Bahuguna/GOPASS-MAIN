import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import PendingVerificationPage from './pages/PendingVerificationPage';
import { EventsPage, EventDetailPage } from './pages/events';
import UserDashboard from './pages/dashboards/user/UserDashboard';
import OrganizerDashboard from './pages/dashboards/organizer/OrganizerDashboard';
import AdminDashboard from './pages/dashboards/admin/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ROLES } from './utils/constants';
import { getDashboardRoute, isAccountFullyVerified } from './utils/roleConfig';

// Protected Route Wrapper - redirects to login if not authenticated
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

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

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Public Route - redirects to dashboard if already authenticated
function PublicRoute({ children }) {
  const { isAuthenticated, user, isLoading } = useAuth();

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

  if (isAuthenticated && user) {
    // Check if user needs verification
    if (!isAccountFullyVerified(user)) {
      return <Navigate to="/pending-verification" replace />;
    }
    // Use explicit paths that match actual route definitions
    const roleToDashboardPath = {
      [ROLES.ADMIN]: '/dashboard/admin',
      [ROLES.ORGANIZER]: '/dashboard/organizer',
      [ROLES.USER]: '/dashboard/user',
    };
    const dashboardRoute = roleToDashboardPath[user.role] || '/dashboard/user';
    return <Navigate to={dashboardRoute} replace />;
  }

  return children;
}

// Dashboard Router - shows correct dashboard based on role
function DashboardRouter() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    // Check if user needs verification
    if (!isAccountFullyVerified(user)) {
      navigate('/pending-verification', { replace: true });
      return;
    }

    // Only redirect once to prevent loops
    if (hasRedirected.current) return;

    // Map roles to their expected dashboard paths
    const roleToDashboardPath = {
      [ROLES.ADMIN]: '/dashboard/admin',
      [ROLES.ORGANIZER]: '/dashboard/organizer',
      [ROLES.USER]: '/dashboard/user',
    };

    const correctPath = roleToDashboardPath[user.role] || '/dashboard/user';
    const currentPath = location.pathname;

    // Only redirect if the user is on a wrong dashboard path
    if (currentPath !== correctPath && currentPath.startsWith('/dashboard')) {
      hasRedirected.current = true;
      navigate(correctPath, { replace: true });
    }
  }, [user, isLoading, navigate, location.pathname]);

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

  switch (user?.role) {
    case ROLES.ADMIN:
      return <AdminDashboard />;
    case ROLES.ORGANIZER:
      return <OrganizerDashboard />;
    case ROLES.USER:
    default:
      return <UserDashboard />;
  }
}

// Auth Success Handler - handles post-authentication routing
function AuthSuccessHandler({ onSuccess, role }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (onSuccess) {
      // Admins go to pending verification
      if (role === ROLES.ADMIN) {
        navigate('/pending-verification', { replace: true });
      } else {
        // Users and Organizers go to their dashboard
        const dashboardRoute = getDashboardRoute(role || ROLES.USER);
        navigate(dashboardRoute, { replace: true });
      }
      onSuccess();
    }
  }, [onSuccess, role, navigate]);

  return null;
}

// Main App Content with Router
function AppContent() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthPage initialPage="login" />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <AuthPage initialPage="signup" />
          </PublicRoute>
        }
      />

      {/* Public Events Page - No authentication required */}
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:eventId" element={<EventDetailPage />} />

      {/* Protected Routes */}
      <Route
        path="/pending-verification"
        element={
          <ProtectedRoute>
            <PendingVerificationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/user"
        element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/organizer"
        element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        }
      />

      {/* Base /dashboard route - redirect to correct dashboard */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardRouter />
        </ProtectedRoute>
      } />

      {/* Fallback - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Root App with Providers
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
