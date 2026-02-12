/**
 * Auth Slice Tests
 * Comprehensive tests for authentication state management
 */

import authReducer, {
    checkAuth,
    login,
    signup,
    logout,
    clearError,
    updateProfile,
    simulatePlatformApproval,
    simulateAdminApproval,
} from '../store/slices/authSlice';
import store from '../store';

describe('Auth Slice', () => {
    describe('Initial State', () => {
        it('should have correct initial state', () => {
            const initialState = {
                user: null,
                isAuthenticated: false,
                isLoading: true,
                error: null,
            };
            expect(authReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
        });
    });

    describe('logout Action', () => {
        it('should clear user on logout', () => {
            const userState = {
                user: { id: 'user_1', email: 'test@example.com', role: 'USER' },
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };
            const action = logout();
            const newState = authReducer(userState, action);

            expect(newState).toEqual({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            });
        });

        it('should clear localStorage on logout', () => {
            localStorage.setItem('gopass_user', JSON.stringify({ id: 'user_1' }));
            store.dispatch(logout());
            expect(localStorage.getItem('gopass_user')).toBeNull();
        });
    });

    describe('clearError Action', () => {
        it('should clear error state', () => {
            const errorState = {
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: 'Some error occurred',
            };
            const action = clearError();
            const newState = authReducer(errorState, action);

            expect(newState.error).toBeNull();
        });
    });

    describe('checkAuth Async Thunk', () => {
        beforeEach(() => {
            localStorage.clear();
            jest.clearAllMocks();
        });

        it('should be fulfilled when user is in localStorage', async () => {
            const mockUser = {
                id: 'user_1',
                email: 'test@example.com',
                role: 'USER',
                status: 'ACTIVE',
            };
            localStorage.setItem('gopass_user', JSON.stringify(mockUser));

            const resultAction = await store.dispatch(checkAuth());
            expect(resultAction.payload).toEqual(mockUser);
        });

        it('should set isAuthenticated to true when user exists', async () => {
            const mockUser = {
                id: 'user_1',
                email: 'amit.kumar@gmail.com',
                role: 'USER',
            };
            localStorage.setItem('gopass_user', JSON.stringify(mockUser));

            await store.dispatch(checkAuth());
            const state = store.getState();

            expect(state.auth.isAuthenticated).toBe(true);
            expect(state.auth.user).toEqual(mockUser);
        });

        it('should return null when no user in localStorage', async () => {
            const resultAction = await store.dispatch(checkAuth());
            expect(resultAction.payload).toBeNull();
        });

        it('should set isAuthenticated to false when no user', async () => {
            await store.dispatch(checkAuth());
            const state = store.getState();

            expect(state.auth.isAuthenticated).toBe(false);
            expect(state.auth.user).toBeNull();
        });

        it('should handle corrupted localStorage data', async () => {
            localStorage.setItem('gopass_user', 'invalid json');
            const resultAction = await store.dispatch(checkAuth());

            expect(resultAction.type).toBe(checkAuth.rejected.type);
            expect(localStorage.getItem('gopass_user')).toBeNull();
        });
    });

    describe('login Async Thunk', () => {
        beforeEach(() => {
            localStorage.clear();
            jest.clearAllMocks();
        });

        it('should set isLoading to true when login pending', async () => {
            const loginPromise = store.dispatch(login({ email: 'test@example.com', password: 'password' }));
            
            // Immediately check if loading
            const pendingState = store.getState();
            expect(pendingState.auth.isLoading).toBe(true);
            
            await loginPromise;
        });

        it('should handle successful login with valid user', async () => {
            const resultAction = await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in', // Valid email from mock data
                password: 'password123',
            }));

            expect(resultAction.type).toBe(login.fulfilled.type);
            expect(resultAction.payload).toHaveProperty('user');
            expect(resultAction.payload).toHaveProperty('redirectTo');
        });

        it('should set isAuthenticated to true on successful login', async () => {
            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));
            const state = store.getState();

            expect(state.auth.isAuthenticated).toBe(true);
            expect(state.auth.user).not.toBeNull();
        });

        it('should persist user to localStorage on successful login', async () => {
            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));

            const storedUser = localStorage.getItem('gopass_user');
            expect(storedUser).not.toBeNull();
            expect(JSON.parse(storedUser)).toHaveProperty('id');
        });

        it('should handle login with invalid email', async () => {
            const resultAction = await store.dispatch(login({
                email: 'nonexistent@example.com',
                password: 'password123',
            }));

            expect(resultAction.type).toBe(login.rejected.type);
        });

        it('should set error state on failed login', async () => {
            await store.dispatch(login({
                email: 'nonexistent@example.com',
                password: 'password123',
            }));
            const state = store.getState();

            expect(state.auth.error).not.toBeNull();
            expect(state.auth.isAuthenticated).toBe(false);
        });

        it('should set isLoading to false after login completes', async () => {
            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));
            const state = store.getState();

            expect(state.auth.isLoading).toBe(false);
        });
    });

    describe('signup Async Thunk', () => {
        beforeEach(() => {
            localStorage.clear();
            jest.clearAllMocks();
        });

        it('should create new user account with valid data', async () => {
            const signupData = {
                fullName: 'John Doe',
                email: 'newuser@example.com',
                password: 'password123',
                role: 'USER',
            };

            const resultAction = await store.dispatch(signup(signupData));

            expect(resultAction.type).toBe(signup.fulfilled.type);
            expect(resultAction.payload).toHaveProperty('user');
            expect(resultAction.payload.user.email).toBe(signupData.email);
        });

        it('should set isAuthenticated to true after signup', async () => {
            const signupData = {
                fullName: 'Jane Doe',
                email: 'janeuser@example.com',
                password: 'password123',
                role: 'USER',
            };

            await store.dispatch(signup(signupData));
            const state = store.getState();

            expect(state.auth.isAuthenticated).toBe(true);
            expect(state.auth.user).not.toBeNull();
        });

        it('should persist new user to localStorage', async () => {
            const signupData = {
                fullName: 'Test User',
                email: 'testuser@example.com',
                password: 'password123',
                role: 'USER',
            };

            await store.dispatch(signup(signupData));

            const storedUser = localStorage.getItem('gopass_user');
            expect(storedUser).not.toBeNull();
            expect(JSON.parse(storedUser).email).toBe(signupData.email);
        });

        it('should reject signup with existing email', async () => {
            // First signup
            await store.dispatch(signup({
                fullName: 'First User',
                email: 'duplicate@example.com',
                password: 'password123',
                role: 'USER',
            }));

            // Try to signup with same email
            const resultAction = await store.dispatch(signup({
                fullName: 'Second User',
                email: 'duplicate@example.com',
                password: 'password123',
                role: 'USER',
            }));

            expect(resultAction.type).toBe(signup.rejected.type);
        });

        it('should set appropriate status for organizer signup', async () => {
            const signupData = {
                fullName: 'Organizer User',
                email: 'organizer@example.com',
                password: 'password123',
                role: 'ORGANIZER',
                position: 'Event Manager',
                collegeName: 'Test College',
                collegeState: 'Maharashtra',
                pincode: '400001',
            };

            const resultAction = await store.dispatch(signup(signupData));

            expect(resultAction.payload.user.role).toBe('ORGANIZER');
            expect(resultAction.payload.user).toHaveProperty('position');
            expect(resultAction.payload.user).toHaveProperty('college');
        });

        it('should set appropriate status for admin signup', async () => {
            const signupData = {
                fullName: 'Admin User',
                email: 'admin.new@xyz.edu.in',
                password: 'password123',
                role: 'ADMIN',
                position: 'Platform Admin',
                collegeName: 'Admin College',
                collegeState: 'Delhi',
                pincode: '110001',
            };

            const resultAction = await store.dispatch(signup(signupData));

            expect(resultAction.payload.user.role).toBe('ADMIN');
            expect(resultAction.payload.requiresVerification).toBeDefined();
        });
    });

    describe('updateProfile Async Thunk', () => {
        beforeEach(async () => {
            localStorage.clear();
            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));
        });

        it('should update user profile successfully', async () => {
            const updates = {
                fullName: 'Updated Name',
                avatar: 'https://example.com/avatar.jpg',
            };

            const resultAction = await store.dispatch(updateProfile(updates));

            expect(resultAction.type).toBe(updateProfile.fulfilled.type);
            expect(resultAction.payload.fullName).toBe('Updated Name');
        });

        it('should persist updated profile to localStorage', async () => {
            const updates = { fullName: 'New Name' };

            await store.dispatch(updateProfile(updates));

            const storedUser = JSON.parse(localStorage.getItem('gopass_user'));
            expect(storedUser.fullName).toBe('New Name');
        });

        it('should reject update if not authenticated', async () => {
            localStorage.clear();
            store.dispatch(logout());

            const resultAction = await store.dispatch(updateProfile({ fullName: 'Test' }));

            expect(resultAction.type).toBe(updateProfile.rejected.type);
        });
    });

    describe('simulatePlatformApproval Async Thunk', () => {
        beforeEach(async () => {
            localStorage.clear();
            jest.clearAllMocks();
            await store.dispatch(signup({
                fullName: 'Organizer',
                email: 'rahul.verma@xyz.edu.in',
                password: 'password123',
                role: 'ORGANIZER',
                position: 'Event Manager',
                collegeName: 'Test College',
                collegeState: 'Maharashtra',
                pincode: '400001',
            }));
        });

        it('should update organizer status to pending admin approval', async () => {
            const resultAction = await store.dispatch(simulatePlatformApproval());

            expect(resultAction.type).toBe(simulatePlatformApproval.fulfilled.type);
            expect(resultAction.payload.status).toBe('PENDING_ADMIN_APPROVAL');
        });

        it('should reject if not authenticated', async () => {
            localStorage.clear();
            store.dispatch(logout());

            const resultAction = await store.dispatch(simulatePlatformApproval());

            expect(resultAction.type).toBe(simulatePlatformApproval.rejected.type);
        });
    });

    describe('simulateAdminApproval Async Thunk', () => {
        beforeEach(async () => {
            localStorage.clear();
            jest.clearAllMocks();
            await store.dispatch(signup({
                fullName: 'Organizer',
                email: 'sneha.k@abc.edu.in',
                password: 'password123',
                role: 'ORGANIZER',
                position: 'Event Manager',
                collegeName: 'Test College',
                collegeState: 'Maharashtra',
                pincode: '400001',
            }));
            await store.dispatch(simulatePlatformApproval());
        });

        it('should set organizer as approved', async () => {
            const resultAction = await store.dispatch(simulateAdminApproval('admin_1'));

            expect(resultAction.type).toBe(simulateAdminApproval.fulfilled.type);
            expect(resultAction.payload.isAdminApproved).toBe(true);
            expect(resultAction.payload.status).toBe('ACTIVE');
        });

        it('should set approvedBy and approvedAt fields', async () => {
            const adminId = 'admin_123';
            const resultAction = await store.dispatch(simulateAdminApproval(adminId));

            expect(resultAction.payload.approvedBy).toBe(adminId);
            expect(resultAction.payload.approvedAt).toBeDefined();
        });

        it('should reject if not an organizer', async () => {
            localStorage.clear();
            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));

            const resultAction = await store.dispatch(simulateAdminApproval('admin_1'));

            expect(resultAction.type).toBe(simulateAdminApproval.rejected.type);
        });
    });

    describe('Auth State Transitions', () => {
        beforeEach(() => {
            localStorage.clear();
            jest.clearAllMocks();
        });

        it('should transition from unauthenticated to authenticated', async () => {
            let state = store.getState();
            expect(state.auth.isAuthenticated).toBe(false);

            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));

            state = store.getState();
            expect(state.auth.isAuthenticated).toBe(true);
        });

        it('should transition from authenticated to unauthenticated', async () => {
            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));
            let state = store.getState();
            expect(state.auth.isAuthenticated).toBe(true);

            store.dispatch(logout());

            state = store.getState();
            expect(state.auth.isAuthenticated).toBe(false);
        });

        it('should maintain loading state correctly', async () => {
            const pendingPromise = store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));

            let state = store.getState();
            expect(state.auth.isLoading).toBe(true);

            await pendingPromise;

            state = store.getState();
            expect(state.auth.isLoading).toBe(false);
        });
    });

    describe('Error Handling', () => {
        beforeEach(() => {
            localStorage.clear();
            jest.clearAllMocks();
        });

        it('should clear previous errors on new action', async () => {
            // Create an error
            await store.dispatch(login({
                email: 'nonexistent@example.com',
                password: 'password123',
            }));
            let state = store.getState();
            expect(state.auth.error).not.toBeNull();

            // Clear error
            store.dispatch(clearError());

            state = store.getState();
            expect(state.auth.error).toBeNull();
        });

        it('should handle and store error messages', async () => {
            await store.dispatch(login({
                email: 'invalid@email.com',
                password: 'wrong',
            }));

            const state = store.getState();
            expect(state.auth.error).toBeDefined();
            expect(typeof state.auth.error).toBe('string');
        });
    });
});
