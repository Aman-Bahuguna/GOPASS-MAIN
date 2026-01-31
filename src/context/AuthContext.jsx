import { createContext, useContext, useState, useEffect } from 'react';
import { ROLES, USER_STATUS, ROUTES } from '../utils/constants';
import { getDashboardRoute, isAccountFullyVerified, getPendingVerificationStep } from '../utils/roleConfig';
import { findUserByEmail, getAllUsers, mockAdmins, mockOrganizers, mockUsers } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check for existing session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('gopass_user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Failed to parse stored user:', error);
                localStorage.removeItem('gopass_user');
            }
        }
        setIsLoading(false);
    }, []);

    // Login function
    const login = async (email, password) => {
        setIsLoading(true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Find user in mock data
            const foundUser = findUserByEmail(email);

            if (!foundUser) {
                throw new Error('Invalid email or password');
            }

            // In real app, verify password here
            // For mock, we accept any password

            setUser(foundUser);
            setIsAuthenticated(true);
            localStorage.setItem('gopass_user', JSON.stringify(foundUser));

            return {
                success: true,
                user: foundUser,
                redirectTo: getDashboardRoute(foundUser.role),
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
            };
        } finally {
            setIsLoading(false);
        }
    };

    // Signup function
    const signup = async (formData) => {
        setIsLoading(true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Check if email already exists
            const existingUser = findUserByEmail(formData.email);
            if (existingUser) {
                throw new Error('An account with this email already exists');
            }

            // Create new user based on role
            const newUser = {
                id: `${formData.role.toLowerCase()}_${Date.now()}`,
                fullName: formData.fullName,
                email: formData.email,
                role: formData.role,
                createdAt: new Date().toISOString(),
                avatar: null,
            };

            // Set status based on role
            // USER: Active immediately
            // ORGANIZER: Active immediately (needs admin approval to CREATE events, not for account)
            // ADMIN: Platform verification → Active
            if (formData.role === ROLES.USER) {
                newUser.status = USER_STATUS.ACTIVE;
                newUser.registeredEvents = [];
            } else if (formData.role === ROLES.ORGANIZER) {
                newUser.status = USER_STATUS.ACTIVE;  // Organizer is active, but can't create events until admin approval
                newUser.position = formData.position;
                newUser.college = {
                    name: formData.collegeName,
                    state: formData.collegeState,
                    pincode: formData.pincode,
                };
                newUser.idCardUrl = formData.idCardFile ? URL.createObjectURL(formData.idCardFile) : null;
                newUser.isAdminApproved = false;  // This controls event creation permission
                newUser.approvedBy = null;
                newUser.approvedAt = null;
            } else if (formData.role === ROLES.ADMIN) {
                newUser.status = USER_STATUS.PENDING_PLATFORM_VERIFICATION;  // Only admin needs platform verification
                newUser.position = formData.position;
                newUser.college = {
                    name: formData.collegeName,
                    state: formData.collegeState,
                    pincode: formData.pincode,
                };
                newUser.idCardUrl = formData.idCardFile ? URL.createObjectURL(formData.idCardFile) : null;
            }

            // In real app, this would be an API call
            // For mock, we add to local storage
            setUser(newUser);
            setIsAuthenticated(true);
            localStorage.setItem('gopass_user', JSON.stringify(newUser));

            // Simulate sending verification email for platform team
            if (formData.role !== ROLES.USER) {
                console.log('📧 Verification request sent to platform team:', {
                    user: newUser.fullName,
                    email: newUser.email,
                    role: newUser.role,
                    college: newUser.college,
                    position: newUser.position,
                });
            }

            return {
                success: true,
                user: newUser,
                requiresVerification: newUser.status !== USER_STATUS.ACTIVE,
                redirectTo: newUser.status !== USER_STATUS.ACTIVE
                    ? ROUTES.PENDING_VERIFICATION
                    : getDashboardRoute(newUser.role),
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
            };
        } finally {
            setIsLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('gopass_user');
    };

    // Update user profile
    const updateProfile = async (updates) => {
        if (!user) return { success: false, error: 'Not authenticated' };

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const updatedUser = { ...user, ...updates };
            setUser(updatedUser);
            localStorage.setItem('gopass_user', JSON.stringify(updatedUser));

            return { success: true, user: updatedUser };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    // Simulate platform verification approval (for demo purposes)
    const simulatePlatformApproval = async () => {
        if (!user) return { success: false };

        const updatedUser = {
            ...user,
            status: user.role === ROLES.ORGANIZER
                ? USER_STATUS.PENDING_ADMIN_APPROVAL
                : USER_STATUS.ACTIVE,
        };

        setUser(updatedUser);
        localStorage.setItem('gopass_user', JSON.stringify(updatedUser));

        return { success: true, user: updatedUser };
    };

    // Simulate admin approval (for demo purposes)
    const simulateAdminApproval = async (adminId) => {
        if (!user || user.role !== ROLES.ORGANIZER) return { success: false };

        const updatedUser = {
            ...user,
            status: USER_STATUS.ACTIVE,
            isAdminApproved: true,
            approvedBy: adminId,
            approvedAt: new Date().toISOString(),
        };

        setUser(updatedUser);
        localStorage.setItem('gopass_user', JSON.stringify(updatedUser));

        return { success: true, user: updatedUser };
    };

    const value = {
        user,
        isLoading,
        isAuthenticated,
        isAccountActive: isAccountFullyVerified(user),
        pendingStep: getPendingVerificationStep(user),
        login,
        signup,
        logout,
        updateProfile,
        simulatePlatformApproval,
        simulateAdminApproval,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
