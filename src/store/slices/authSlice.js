import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ROLES, USER_STATUS, ROUTES } from '../../utils/constants';
import { getDashboardRoute, isAccountFullyVerified, getPendingVerificationStep } from '../../utils/roleConfig';
import { findUserByEmail } from '../../api';

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
        await delay(1000); // Simulate API

        const foundUser = findUserByEmail(email);
        if (!foundUser) {
            throw new Error('Invalid email or password');
        }

        // Mock password check: succeed if user is found
        // In real apps, verify password here

        localStorage.setItem('gopass_user', JSON.stringify(foundUser));

        return {
            user: foundUser,
            redirectTo: getDashboardRoute(foundUser.role),
        };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// 3. Signup
export const signup = createAsyncThunk('auth/signup', async (formData, { rejectWithValue }) => {
    try {
        await delay(1500); // Simulate API

        const existingUser = findUserByEmail(formData.email);
        if (existingUser) {
            throw new Error('An account with this email already exists');
        }

        // Direct Role Mapping (STUDENT, ADMIN, ORGANIZER)
        let role = formData.role;
        const normalized = String(role).toUpperCase();
        if (normalized.includes('ADMIN')) role = ROLES.ADMIN;
        else if (normalized.includes('ORGANIZER')) role = ROLES.ORGANIZER;
        else if (normalized.includes('STUDENT') || normalized.includes('USER')) role = ROLES.USER;

        const newUser = {
            id: `${role.toLowerCase()}_${Date.now()}`,
            fullName: formData.fullName,
            email: formData.email,
            role: role,
            createdAt: new Date().toISOString(),
            avatar: null,
            // Additional fields based on role
            ...(formData.role === ROLES.ORGANIZER && {
                position: formData.position,
                college: {
                    name: formData.collegeName,
                    state: formData.collegeState,
                    pincode: formData.pincode,
                },
                idCardUrl: formData.idCardFile ? URL.createObjectURL(formData.idCardFile) : null,
                isAdminApproved: false,
                approvedBy: null,
                approvedAt: null,
                status: USER_STATUS.ACTIVE, // Organizer active but limited permissions
            }),
            ...(formData.role === ROLES.ADMIN && {
                status: USER_STATUS.PENDING_PLATFORM_VERIFICATION,
                position: formData.position,
                college: {
                    name: formData.collegeName,
                    state: formData.collegeState,
                    pincode: formData.pincode,
                },
                idCardUrl: formData.idCardFile ? URL.createObjectURL(formData.idCardFile) : null,
            }),
            ...(formData.role === ROLES.USER && {
                status: USER_STATUS.ACTIVE,
                registeredEvents: [],
            }),
        };

        // Persist
        localStorage.setItem('gopass_user', JSON.stringify(newUser));

        // Redirect logic
        const requiresVerification = newUser.status !== USER_STATUS.ACTIVE;
        const redirectTo = requiresVerification ? ROUTES.PENDING_VERIFICATION : getDashboardRoute(newUser.role);

        return {
            user: newUser,
            redirectTo,
            requiresVerification
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
