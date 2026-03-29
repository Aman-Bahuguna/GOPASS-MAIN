import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ROLES, USER_STATUS, ROUTES } from '../../utils/constants';
import { getDashboardRoute, isAccountFullyVerified, getPendingVerificationStep } from '../../utils/roleConfig';
import { findUserByEmail, registerUser, loginUser } from '../../api';
import { normalizeUser } from '../../utils/userUtils';

// --- Helper simulation delay ---
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Async Thunks ---

// 1. Initial Auth Check (load from localStorage)
export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
    try {
        const storedUser = localStorage.getItem('gopass_user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            return normalizeUser(parsedUser);
        }
        return null;
    } catch (error) {
        localStorage.removeItem('gopass_user');
        return rejectWithValue('Failed to parse stored user');
    }
});

// 2. Login
export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const responseData = await loginUser({ email, password });
        
        let rawUser = responseData.user || Object.assign({}, responseData);
        const user = normalizeUser(rawUser);

        localStorage.setItem('gopass_user', JSON.stringify(user));
        if (responseData.token) {
            localStorage.setItem('gopass_token', responseData.token);
        }

        return {
            user,
            redirectTo: getDashboardRoute(user.role),
            token: responseData.token
        };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// 3. Signup
export const signup = createAsyncThunk('auth/signup', async (formData, { rejectWithValue }) => {
    try {
        let role = formData.role;
        const normalizedRole = String(role).toUpperCase();
        if (normalizedRole.includes('ADMIN')) role = ROLES.ADMIN;
        else if (normalizedRole.includes('ORGANIZER')) role = ROLES.ORGANIZER;
        else if (normalizedRole.includes('STUDENT') || normalizedRole.includes('USER')) role = ROLES.USER;

        // Construct backend payload
        const payload = {
            email: formData.email,
            password: formData.password,
            fullName: formData.fullName,
            role: role === ROLES.USER ? 'STUDENT' : role === ROLES.ADMIN ? 'ADMIN' : 'ORGANIZER',
        };

        if (role !== ROLES.USER) {
            payload.collegeName = formData.collegeName;
            payload.pinCode = formData.pincode || formData.pinCode;
        }

        // Call the backend registration API
        const responseData = await registerUser(payload);
        
        let rawUser = responseData.user || {
            id: responseData.id || `${role.toLowerCase()}_${Date.now()}`,
            ...payload,
            status: USER_STATUS.ACTIVE, // Default for registration response if missing
        };
        
        const user = normalizeUser(rawUser);

        // Special handling for local organizer mock DB to support Admin Dashboard
        if (user.role === ROLES.ORGANIZER) {
            const stored = localStorage.getItem('gopass_registered_organizers');
            let orgs = stored ? JSON.parse(stored) : [];
            orgs = orgs.filter(o => o.email !== user.email);
            orgs.push({
                ...user,
                status: USER_STATUS.PENDING_ADMIN_APPROVAL,
                isAdminApproved: false,
            });
            localStorage.setItem('gopass_registered_organizers', JSON.stringify(orgs));
        }

        // Persist
        localStorage.setItem('gopass_user', JSON.stringify(user));
        localStorage.setItem('gopass_token', responseData.token || '');

        const redirectTo = isBlockingVerificationRequired(user) ? ROUTES.PENDING_VERIFICATION : getDashboardRoute(user.role);

        return {
            user,
            redirectTo,
            requiresVerification: isBlockingVerificationRequired(user),
            token: responseData.token
        };

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// 4. Update Profile
export const updateProfile = createAsyncThunk('auth/updateProfile', async (updates, { getState, rejectWithValue }) => {
    const { user } = getState().auth;
    if (!user) return rejectWithValue('Not authenticated');

    try {
        await delay(500); // Simulate network
        const updatedUser = normalizeUser({ ...user, ...updates });
        localStorage.setItem('gopass_user', JSON.stringify(updatedUser));
        return updatedUser;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// 5. Simulate Platform Approval
export const simulatePlatformApproval = createAsyncThunk('auth/simulatePlatformApproval', async (_, { getState, rejectWithValue }) => {
    const { user } = getState().auth;
    if (!user) return rejectWithValue('Not authenticated');

    const updatedUser = normalizeUser({
        ...user,
        status: user.role === ROLES.ORGANIZER ? USER_STATUS.PENDING_ADMIN_APPROVAL : USER_STATUS.ACTIVE,
    });
    localStorage.setItem('gopass_user', JSON.stringify(updatedUser));
    return updatedUser;
});

// 6. Simulate Admin Approval
export const simulateAdminApproval = createAsyncThunk('auth/simulateAdminApproval', async (adminId, { getState, rejectWithValue }) => {
    const { user } = getState().auth;
    if (!user || user.role !== ROLES.ORGANIZER) return rejectWithValue('Invalid action');

    const updatedUser = normalizeUser({
        ...user,
        status: USER_STATUS.ACTIVE,
        isAdminApproved: true,
        approvedBy: adminId,
        approvedAt: new Date().toISOString(),
    });
    localStorage.setItem('gopass_user', JSON.stringify(updatedUser));
    return updatedUser;
});


// --- Slice ---

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start loading to check auth
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('gopass_user');
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Check Auth
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload) {
                    state.user = action.payload;
                    state.isAuthenticated = true;
                } else {
                    state.user = null;
                    state.isAuthenticated = false;
                }
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // Login
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Signup
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Update Profile
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            })

            // Approvals
            .addCase(simulatePlatformApproval.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(simulateAdminApproval.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
