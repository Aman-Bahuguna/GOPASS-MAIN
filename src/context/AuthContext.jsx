import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    checkAuth,
    login as loginAction,
    signup as signupAction,
    logout as logoutAction,
    updateProfile as updateProfileAction,
    simulatePlatformApproval as simulatePlatformApprovalAction,
    simulateAdminApproval as simulateAdminApprovalAction
} from '../store/slices/authSlice';
import { isAccountFullyVerified, getPendingVerificationStep } from '../utils/roleConfig';


// Compatibility Provider (Pass-through + Init)
export function AuthProvider({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return children;
}

// Custom hook facade for Redux
export function useAuth() {
    const dispatch = useDispatch();
    const { user, isLoading, isAuthenticated, error } = useSelector((state) => state.auth);

    const login = async (email, password) => {
        try {
            const resultAction = await dispatch(loginAction({ email, password }));
            if (loginAction.fulfilled.match(resultAction)) {
                return {
                    success: true,
                    user: resultAction.payload.user,
                    redirectTo: resultAction.payload.redirectTo
                };
            } else {
                return {
                    success: false,
                    error: resultAction.payload || 'Login failed'
                };
            }
        } catch (err) {
            return {
                success: false,
                error: err.message
            };
        }
    };

    const signup = async (formData) => {
        try {
            const resultAction = await dispatch(signupAction(formData));
            if (signupAction.fulfilled.match(resultAction)) {
                return {
                    success: true,
                    user: resultAction.payload.user,
                    requiresVerification: resultAction.payload.requiresVerification,
                    redirectTo: resultAction.payload.redirectTo
                };
            } else {
                return {
                    success: false,
                    error: resultAction.payload || 'Signup failed'
                };
            }
        } catch (err) {
            return {
                success: false,
                error: err.message
            };
        }
    };

    const logout = () => {
        dispatch(logoutAction());
    };

    const updateProfile = async (updates) => {
        try {
            const resultAction = await dispatch(updateProfileAction(updates));
            if (updateProfileAction.fulfilled.match(resultAction)) {
                return { success: true, user: resultAction.payload };
            }
            return { success: false, error: resultAction.payload };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const simulatePlatformApproval = async () => {
        const result = await dispatch(simulatePlatformApprovalAction());
        if (simulatePlatformApprovalAction.fulfilled.match(result)) {
            return { success: true, user: result.payload };
        }
        return { success: false };
    };

    const simulateAdminApproval = async (adminId) => {
        const result = await dispatch(simulateAdminApprovalAction(adminId));
        if (simulateAdminApprovalAction.fulfilled.match(result)) {
            return { success: true, user: result.payload };
        }
        return { success: false };
    };

    return {
        user,
        isLoading,
        isAuthenticated,
        error,
        isAccountActive: isAccountFullyVerified(user),
        pendingStep: getPendingVerificationStep(user),
        login,
        signup,
        logout,
        updateProfile,
        simulatePlatformApproval,
        simulateAdminApproval
    };
}

export default useAuth;
