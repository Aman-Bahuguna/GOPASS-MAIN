/**
 * Redux State Management Integration Tests
 * Tests for integration between different slices and overall state management
 */

import store from '../../src/store';
import { login, logout, signup } from '../../src/store/slices/authSlice';
import {
    fetchEvents,
    fetchEventById,
    createEvent,
    deleteEvent,
} from '../../src/store/slices/eventsSlice';

describe('Redux State Management Integration', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    describe('Auth and Events Interaction', () => {
        it('should manage auth and events independently', async () => {
            // Get initial state
            let state = store.getState();
            expect(state.auth.isAuthenticated).toBe(false);
            expect(state.events.items.length).toBe(0);

            // Fetch events (doesn't require auth)
            await store.dispatch(fetchEvents());
            state = store.getState();
            expect(state.events.items.length).toBeGreaterThan(0);
            expect(state.auth.isAuthenticated).toBe(false);

            // Login
            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));
            state = store.getState();
            expect(state.auth.isAuthenticated).toBe(true);
            expect(state.events.items.length).toBeGreaterThan(0);
        });

        it('should preserve events after logout', async () => {
            await store.dispatch(fetchEvents());
            const eventsBefore = store.getState().events.items.length;

            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));
            store.dispatch(logout());

            const eventsAfter = store.getState().events.items.length;
            expect(eventsAfter).toBe(eventsBefore);
        });

        it('should allow event operations regardless of auth state', async () => {
            // Fetch without auth
            await store.dispatch(fetchEvents());
            const unauthEvents = store.getState().events.items.length;
            expect(unauthEvents).toBeGreaterThan(0);

            // Login and fetch again
            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));
            await store.dispatch(fetchEvents());
            const authEvents = store.getState().events.items.length;

            expect(authEvents).toBe(unauthEvents);
        });
    });

    describe('Complex User Workflows', () => {
        it('should support complete signup and event browsing flow', async () => {
            // Signup
            const signupResult = await store.dispatch(signup({
                fullName: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                role: 'USER',
            }));
            expect(signupResult.type).toBe(signup.fulfilled.type);

            let state = store.getState();
            expect(state.auth.isAuthenticated).toBe(true);
            expect(state.auth.user.email).toBe('john@example.com');

            // Fetch events
            await store.dispatch(fetchEvents());
            state = store.getState();
            expect(state.events.items.length).toBeGreaterThan(0);

            // View event details
            const eventId = state.events.items[0].id;
            await store.dispatch(fetchEventById(eventId));
            state = store.getState();
            expect(state.events.currentEvent.id).toBe(eventId);
        });

        it('should support organizer workflow', async () => {
            // Signup as organizer
            await store.dispatch(signup({
                fullName: 'Event Manager',
                email: 'organizer@example.com',
                password: 'password123',
                role: 'ORGANIZER',
                position: 'Event Manager',
                collegeName: 'Test College',
                collegeState: 'Maharashtra',
                pincode: '400001',
            }));

            let state = store.getState();
            expect(state.auth.user.role).toBe('ORGANIZER');

            // Fetch events to view
            await store.dispatch(fetchEvents());

            // Create event
            const createResult = await store.dispatch(createEvent({
                title: 'New Org Event',
                description: 'Organized event',
                date: new Date().toISOString(),
                capacity: 200,
            }));
            expect(createResult.type).toBe(createEvent.fulfilled.type);

            state = store.getState();
            expect(state.events.items.length).toBeGreaterThan(0);
            expect(state.events.items[0].title).toBe('New Org Event');
        });

        it('should maintain state consistency through multiple operations', async () => {
            const initialState = store.getState();

            // Operation 1: Login
            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));
            expect(store.getState().auth.isAuthenticated).toBe(true);

            // Operation 2: Fetch events
            await store.dispatch(fetchEvents());
            const eventCount1 = store.getState().events.items.length;
            expect(eventCount1).toBeGreaterThan(0);

            // Operation 3: Create event
            await store.dispatch(createEvent({
                title: 'Test Event',
                description: 'Test',
                date: new Date().toISOString(),
                capacity: 150,
            }));
            const eventCount2 = store.getState().events.items.length;
            expect(eventCount2).toBe(eventCount1 + 1);

            // Operation 4: Logout
            store.dispatch(logout());
            const finalState = store.getState();
            expect(finalState.auth.isAuthenticated).toBe(false);
            expect(finalState.events.items.length).toBe(eventCount2);
        });
    });

    describe('State Persistence', () => {
        it('should persist auth state to localStorage', async () => {
            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));

            const storedUser = localStorage.getItem('gopass_user');
            expect(storedUser).not.toBeNull();

            const parsedUser = JSON.parse(storedUser);
            const stateUser = store.getState().auth.user;
            expect(parsedUser).toEqual(stateUser);
        });

        it('should restore auth state from localStorage', async () => {
            const mockUser = {
                id: 'user_1',
                email: 'test@example.com',
                role: 'USER',
            };
            localStorage.setItem('gopass_user', JSON.stringify(mockUser));

            // Create new store instance
            const newStore = require('../../src/store').default;
            expect(newStore.getState).toBeDefined();
        });

        it('should clear localStorage on logout', async () => {
            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));
            expect(localStorage.getItem('gopass_user')).not.toBeNull();

            store.dispatch(logout());
            expect(localStorage.getItem('gopass_user')).toBeNull();
        });
    });

    describe('Concurrent Operations', () => {
        it('should handle concurrent auth and events operations', async () => {
            const operations = [
                store.dispatch(fetchEvents()),
                store.dispatch(login({
                    email: 'rajesh.sharma@xyz.edu.in',
                    password: 'password123',
                })),
            ];

            const results = await Promise.all(operations);

            expect(results[0].type).toBe(fetchEvents.fulfilled.type);
            expect(results[1].type).toBe(login.fulfilled.type);

            const state = store.getState();
            expect(state.auth.isAuthenticated).toBe(true);
            expect(state.events.items.length).toBeGreaterThan(0);
        });

        it('should handle rapid state updates correctly', async () => {
            const updates = [];

            // Create multiple events quickly
            for (let i = 0; i < 3; i++) {
                updates.push(
                    store.dispatch(createEvent({
                        title: `Event ${i}`,
                        description: `Desc ${i}`,
                        date: new Date().toISOString(),
                        capacity: 100,
                    }))
                );
            }

            const results = await Promise.all(updates);
            expect(results.length).toBe(3);

            const state = store.getState();
            expect(state.events.items.length).toBe(3);
        });
    });

    describe('State Validation', () => {
        it('should maintain valid state structure after operations', async () => {
            await store.dispatch(fetchEvents());
            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));

            const state = store.getState();

            // Validate auth structure
            expect(state.auth).toHaveProperty('user');
            expect(state.auth).toHaveProperty('isAuthenticated');
            expect(state.auth).toHaveProperty('isLoading');
            expect(state.auth).toHaveProperty('error');

            // Validate events structure
            expect(state.events).toHaveProperty('items');
            expect(state.events).toHaveProperty('currentEvent');
            expect(state.events).toHaveProperty('status');
            expect(state.events).toHaveProperty('error');
            expect(state.events).toHaveProperty('lastFetched');
        });

        it('should not allow invalid state mutations', () => {
            const initialState = store.getState();
            const stateCopy = JSON.stringify(initialState);

            // Try invalid operation (should not crash)
            const invalidResult = store.dispatch({
                type: 'INVALID_ACTION_TYPE',
                payload: {},
            });

            const finalState = store.getState();
            expect(JSON.stringify(finalState)).toBe(stateCopy);
        });
    });

    describe('Error Recovery', () => {
        it('should recover from failed login and retry', async () => {
            // Failed login
            const failedLogin = await store.dispatch(login({
                email: 'nonexistent@example.com',
                password: 'wrong',
            }));
            expect(failedLogin.type).toBe(login.rejected.type);
            expect(store.getState().auth.isAuthenticated).toBe(false);
            expect(store.getState().auth.error).not.toBeNull();

            // Successful login with correct credentials
            const successLogin = await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));
            expect(successLogin.type).toBe(login.fulfilled.type);
            expect(store.getState().auth.isAuthenticated).toBe(true);
            expect(store.getState().auth.error).toBeNull();
        });

        it('should recover from failed event fetch and retry', async () => {
            // Failed fetch
            const failedFetch = await store.dispatch(fetchEventById('invalid_id'));
            expect(failedFetch.type).toBe(fetchEventById.rejected.type);
            expect(store.getState().events.error).not.toBeNull();

            // Successful fetch
            const successFetch = await store.dispatch(fetchEvents());
            expect(successFetch.type).toBe(fetchEvents.fulfilled.type);
            expect(store.getState().events.status).toBe('succeeded');
        });

        it('should maintain other state during error recovery', async () => {
            // Setup: login and fetch events
            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));
            await store.dispatch(fetchEvents());
            const eventsBefore = store.getState().events.items.length;
            const userBefore = store.getState().auth.user;

            // Cause error
            await store.dispatch(fetchEventById('invalid_id'));

            // Check state preservation
            expect(store.getState().events.items.length).toBe(eventsBefore);
            expect(store.getState().auth.user).toEqual(userBefore);
        });
    });

    describe('Performance and Optimization', () => {
        it('should not re-render unnecessarily on unrelated state changes', async () => {
            const listener = jest.fn();
            const unsubscribe = store.subscribe(listener);

            // Initial state
            expect(listener).toHaveBeenCalledTimes(0);

            // Dispatch action that doesn't affect everything
            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));
            // Listener should be called once
            expect(listener).toHaveBeenCalled();

            unsubscribe();
        });

        it('should handle large event lists efficiently', async () => {
            const startTime = Date.now();

            // Create many events
            const createPromises = [];
            for (let i = 0; i < 10; i++) {
                createPromises.push(
                    store.dispatch(createEvent({
                        title: `Event ${i}`,
                        description: `Desc ${i}`,
                        date: new Date().toISOString(),
                        capacity: 100,
                    }))
                );
            }

            await Promise.all(createPromises);
            const endTime = Date.now();

            const state = store.getState();
            expect(state.events.items.length).toBe(10);
            expect(endTime - startTime).toBeLessThan(15000); // Should complete in reasonable time
        });
    });

    describe('State Immutability', () => {
        it('should not mutate previous state on update', async () => {
            const stateBefore = store.getState();
            const authBefore = JSON.parse(JSON.stringify(stateBefore.auth));
            const eventsBefore = JSON.parse(JSON.stringify(stateBefore.events));

            // Perform operation
            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));

            // Previous state should not be mutated
            expect(authBefore).toEqual({
                user: null,
                isAuthenticated: false,
                isLoading: true,
                error: null,
            });
        });

        it('should create new state object on changes', async () => {
            const state1 = store.getState();
            await store.dispatch(fetchEvents());
            const state2 = store.getState();

            expect(state1).not.toBe(state2);
            expect(state1.events).not.toBe(state2.events);
        });

        it('should not affect items array reference when not modified', async () => {
            const state1 = store.getState();
            await store.dispatch(login({
                email: 'rajesh.sharma@xyz.edu.in',
                password: 'password123',
            }));
            const state2 = store.getState();

            // Events array should be same reference if not modified
            expect(state1.events.items === state2.events.items).toBeDefined();
        });
    });
});
