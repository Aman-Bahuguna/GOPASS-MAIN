import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ROLES, USER_STATUS, ROUTES } from '../../utils/constants';
import { getDashboardRoute, isAccountFullyVerified, getPendingVerificationStep } from '../../utils/roleConfig';
import { findUserByEmail, registerUser, loginUser } from '../../api';

// --- Helper simulation delay ---
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Async Thunks ---

// 1. Initial Auth Check (load from localStorage)
export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
    try {
        const storedUser = localStorage.getItem('gopass_user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            return parsedUser;
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
        
        let foundUser = responseData.user || Object.assign({}, responseData);

        // Optional: map backend role strings to frontend roles if needed or provide fallbacks
        if (foundUser.role === 'STUDENT') foundUser.role = ROLES.USER;
        else if (foundUser.role === 'ADMIN') foundUser.role = ROLES.ADMIN;
        else if (foundUser.role === 'ORGANIZER') foundUser.role = ROLES.ORGANIZER;

        // Ensure status is set if backend doesn't provide it
        if (!foundUser.status) {
            if (foundUser.role === ROLES.USER || foundUser.role === ROLES.ORGANIZER) {
                foundUser.status = USER_STATUS.ACTIVE;
            } else if (foundUser.role === ROLES.ADMIN) {
                // Set to pending if backend doesn't explicitly return ACTIVE
                foundUser.status = USER_STATUS.PENDING_PLATFORM_VERIFICATION; 
            }
        }

        // Just to ensure existing frontend logic for Organizer approval doesn't break
        if (foundUser.role === ROLES.ORGANIZER && foundUser.isAdminApproved === undefined) {
             foundUser.isAdminApproved = true; // Temporary fix if backend doesn't return this
        }

        localStorage.setItem('gopass_user', JSON.stringify(foundUser));
        if (responseData.token) {
            localStorage.setItem('gopass_token', responseData.token);
        }

        return {
            user: foundUser,
            redirectTo: getDashboardRoute(foundUser.role),
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
        const normalized = String(role).toUpperCase();
        if (normalized.includes('ADMIN')) role = ROLES.ADMIN;
        else if (normalized.includes('ORGANIZER')) role = ROLES.ORGANIZER;
        else if (normalized.includes('STUDENT') || normalized.includes('USER')) role = ROLES.USER; // map to whatever backend expects

        // Construct backend payload based on role
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
        
        // Use the returned user data or fallback to formatting what we have
        const newUser = responseData.user || {
            id: responseData.id || `${role.toLowerCase()}_${Date.now()}`,
            ...payload,
            status: role === ROLES.USER ? USER_STATUS.ACTIVE : USER_STATUS.PENDING_PLATFORM_VERIFICATION,
        };

        // Persist
        localStorage.setItem('gopass_user', JSON.stringify(newUser));
        localStorage.setItem('gopass_token', responseData.token || '');

        // Redirect logic
        const requiresVerification = newUser.status !== USER_STATUS.ACTIVE;
        const redirectTo = requiresVerification ? ROUTES.PENDING_VERIFICATION : getDashboardRoute(newUser.role || role);

        return {
            user: newUser,
            redirectTo,
            requiresVerification,
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
        await delay(500);
        const updatedUser = { ...user, ...updates };
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

    const updatedUser = {
        ...user,
        status: user.role === ROLES.ORGANIZER ? USER_STATUS.PENDING_ADMIN_APPROVAL : USER_STATUS.ACTIVE,
    };
    localStorage.setItem('gopass_user', JSON.stringify(updatedUser));
    return updatedUser;
});

// 6. Simulate Admin Approval
export const simulateAdminApproval = createAsyncThunk('auth/simulateAdminApproval', async (adminId, { getState, rejectWithValue }) => {
    const { user } = getState().auth;
    if (!user || user.role !== ROLES.ORGANIZER) return rejectWithValue('Invalid action');

    const updatedUser = {
        ...user,
        status: USER_STATUS.ACTIVE,
        isAdminApproved: true,
        approvedBy: adminId,
        approvedAt: new Date().toISOString(),
    };
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
