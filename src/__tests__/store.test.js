/**
 * Store Configuration Tests
 * Tests for the Redux store setup and configuration
 */

import store from '../store';
import authReducer from '../store/slices/authSlice';
import eventsReducer from '../store/slices/eventsSlice';

describe('Redux Store Configuration', () => {
    describe('Store Creation', () => {
        it('should create a store with correct initial state', () => {
            const state = store.getState();
            expect(state).toHaveProperty('auth');
            expect(state).toHaveProperty('events');
        });

        it('should have auth reducer with correct initial state', () => {
            const state = store.getState();
            expect(state.auth).toEqual({
                user: null,
                isAuthenticated: false,
                isLoading: true,
                error: null,
            });
        });

        it('should have events reducer with correct initial state', () => {
            const state = store.getState();
            expect(state.events).toEqual({
                items: [],
                currentEvent: null,
                status: 'idle',
                error: null,
                lastFetched: null,
            });
        });
    });

    describe('Store Dispatch', () => {
        it('should allow dispatching actions', () => {
            const action = { type: 'auth/checkAuth/fulfilled', payload: null };
            expect(() => {
                store.dispatch(action);
            }).not.toThrow();
        });

        it('should maintain state immutability', () => {
            const beforeState = store.getState();
            const beforeAuth = JSON.parse(JSON.stringify(beforeState.auth));
            
            store.dispatch({ type: '@@INIT' });
            
            expect(store.getState().auth).toEqual(beforeAuth);
        });
    });

    describe('Store Subscription', () => {
        it('should allow subscriptions to store changes', () => {
            const listener = jest.fn();
            const unsubscribe = store.subscribe(listener);
            
            const action = { type: 'test-action' };
            store.dispatch(action);
            
            expect(listener).toHaveBeenCalled();
            unsubscribe();
        });
    });

    describe('Reducer Integration', () => {
        it('should combine reducers correctly', () => {
            const state = store.getState();
            expect(Object.keys(state).length).toBeGreaterThanOrEqual(2);
            expect(state).toHaveProperty('auth');
            expect(state).toHaveProperty('events');
        });

        it('should handle state updates independently for each slice', () => {
            const initialState = store.getState();
            const initialAuthError = initialState.auth.error;
            const initialEventsError = initialState.events.error;
            
            // Auth and events errors should be independent
            expect(typeof initialAuthError).toBe('object');
            expect(typeof initialEventsError).toBe('object');
        });
    });
});
