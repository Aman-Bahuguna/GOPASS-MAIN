/**
 * Events Slice Tests
 * Comprehensive tests for events state management
 */

import eventsReducer, {
    fetchEvents,
    fetchEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    clearCurrentEvent,
    resetStatus,
    selectAllEvents,
    selectEventById,
    selectEventsStatus,
    selectEventsError,
} from '../store/slices/eventsSlice';
import store from '../store';

describe('Events Slice', () => {
    describe('Initial State', () => {
        it('should have correct initial state', () => {
            const initialState = {
                items: [],
                currentEvent: null,
                status: 'idle',
                error: null,
                lastFetched: null,
            };
            expect(eventsReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
        });

        it('should have empty items array', () => {
            const state = store.getState().events;
            expect(Array.isArray(state.items)).toBe(true);
        });

        it('should have status idle', () => {
            const state = store.getState().events;
            expect(state.status).toBe('idle');
        });
    });

    describe('clearCurrentEvent Action', () => {
        it('should clear currently displayed event', () => {
            const stateWithEvent = {
                items: [],
                currentEvent: { id: 'evt_1', title: 'Some Event' },
                status: 'succeeded',
                error: null,
                lastFetched: null,
            };

            const action = clearCurrentEvent();
            const newState = eventsReducer(stateWithEvent, action);

            expect(newState.currentEvent).toBeNull();
        });
    });

    describe('resetStatus Action', () => {
        it('should reset status and error', () => {
            const stateWithError = {
                items: [],
                currentEvent: null,
                status: 'failed',
                error: 'Some error',
                lastFetched: null,
            };

            const action = resetStatus();
            const newState = eventsReducer(stateWithError, action);

            expect(newState.status).toBe('idle');
            expect(newState.error).toBeNull();
        });
    });

    describe('fetchEvents Async Thunk', () => {
        it('should set status to loading when fetching', async () => {
            const fetchPromise = store.dispatch(fetchEvents());
            const pendingState = store.getState().events;
            expect(pendingState.status).toBe('loading');
            await fetchPromise;
        });

        it('should fetch all events successfully', async () => {
            const resultAction = await store.dispatch(fetchEvents());

            expect(resultAction.type).toBe(fetchEvents.fulfilled.type);
            expect(Array.isArray(resultAction.payload)).toBe(true);
        });

        it('should set status to succeeded after fetching', async () => {
            await store.dispatch(fetchEvents());
            const state = store.getState().events;

            expect(state.status).toBe('succeeded');
        });

        it('should populate items array with fetched events', async () => {
            await store.dispatch(fetchEvents());
            const state = store.getState().events;

            expect(state.items.length).toBeGreaterThan(0);
            expect(state.items[0]).toHaveProperty('id');
            expect(state.items[0]).toHaveProperty('title');
        });

        it('should set lastFetched timestamp', async () => {
            const beforeFetch = Date.now();
            await store.dispatch(fetchEvents());
            const state = store.getState().events;

            expect(state.lastFetched).not.toBeNull();
            expect(state.lastFetched).toBeGreaterThanOrEqual(beforeFetch);
        });

        it('should not clear items on fetching again', async () => {
            await store.dispatch(fetchEvents());
            const firstFetch = store.getState().events.items;
            const firstCount = firstFetch.length;

            await store.dispatch(fetchEvents());
            const state = store.getState().events;

            expect(state.items.length).toBe(firstCount);
        });
    });

    describe('fetchEventById Async Thunk', () => {
        beforeEach(async () => {
            await store.dispatch(fetchEvents());
        });

        it('should set status to loading when fetching single event', async () => {
            const state = store.getState().events;
            const eventId = state.items[0]?.id;

            if (eventId) {
                const fetchPromise = store.dispatch(fetchEventById(eventId));
                const pendingState = store.getState().events;
                expect(pendingState.status).toBe('loading');
                await fetchPromise;
            }
        });

        it('should fetch event by id successfully', async () => {
            const state = store.getState().events;
            const eventId = state.items[0]?.id;

            if (eventId) {
                const resultAction = await store.dispatch(fetchEventById(eventId));

                expect(resultAction.type).toBe(fetchEventById.fulfilled.type);
                expect(resultAction.payload.id).toBe(eventId);
            }
        });

        it('should set currentEvent when fetching single event', async () => {
            const state = store.getState().events;
            const eventId = state.items[0]?.id;

            if (eventId) {
                await store.dispatch(fetchEventById(eventId));
                const updatedState = store.getState().events;

                expect(updatedState.currentEvent).not.toBeNull();
                expect(updatedState.currentEvent.id).toBe(eventId);
            }
        });

        it('should handle non-existent event id', async () => {
            const resultAction = await store.dispatch(fetchEventById('nonexistent_id'));

            expect(resultAction.type).toBe(fetchEventById.rejected.type);
        });

        it('should set status to failed for non-existent event', async () => {
            await store.dispatch(fetchEventById('nonexistent_id'));
            const state = store.getState().events;

            expect(state.status).toBe('failed');
            expect(state.error).not.toBeNull();
        });
    });

    describe('createEvent Async Thunk', () => {
        beforeEach(() => {
            store.dispatch(resetStatus());
        });

        it('should create new event', async () => {
            const eventData = {
                title: 'New Event',
                description: 'Event Description',
                date: new Date().toISOString(),
                capacity: 100,
            };

            const resultAction = await store.dispatch(createEvent(eventData));

            expect(resultAction.type).toBe(createEvent.fulfilled.type);
            expect(resultAction.payload).toHaveProperty('id');
            expect(resultAction.payload).toHaveProperty('createdAt');
        });

        it('should add new event to items array', async () => {
            const beforeCount = store.getState().events.items.length;

            await store.dispatch(createEvent({
                title: 'Another Event',
                description: 'Description',
                date: new Date().toISOString(),
                capacity: 50,
            }));

            const afterCount = store.getState().events.items.length;
            expect(afterCount).toBe(beforeCount + 1);
        });

        it('should add new event at the top of list', async () => {
            // Fetch events first
            await store.dispatch(fetchEvents());
            const firstItemBeforeCreate = store.getState().events.items[0];

            const newEventData = {
                title: 'Top Event',
                description: 'This should be at top',
                date: new Date().toISOString(),
                capacity: 100,
            };

            const createResult = await store.dispatch(createEvent(newEventData));
            const firstItemAfterCreate = store.getState().events.items[0];

            expect(firstItemAfterCreate.id).toBe(createResult.payload.id);
        });

        it('should set status as UPCOMING for new events', async () => {
            const resultAction = await store.dispatch(createEvent({
                title: 'Future Event',
                description: 'In future',
                date: new Date().toISOString(),
                capacity: 100,
            }));

            expect(resultAction.payload.status).toBe('UPCOMING');
        });

        it('should set registeredCount to 0 for new event', async () => {
            const resultAction = await store.dispatch(createEvent({
                title: 'New Event',
                description: 'None',
                date: new Date().toISOString(),
                capacity: 100,
            }));

            expect(resultAction.payload.registeredCount).toBe(0);
        });

        it('should generate unique id for new event', async () => {
            const result1 = await store.dispatch(createEvent({
                title: 'Event 1',
                description: 'Desc 1',
                date: new Date().toISOString(),
                capacity: 50,
            }));

            const result2 = await store.dispatch(createEvent({
                title: 'Event 2',
                description: 'Desc 2',
                date: new Date().toISOString(),
                capacity: 50,
            }));

            expect(result1.payload.id).not.toBe(result2.payload.id);
        });
    });

    describe('updateEvent Async Thunk', () => {
        beforeEach(async () => {
            await store.dispatch(fetchEvents());
        });

        it('should update event in items array', async () => {
            const state = store.getState().events;
            const eventToUpdate = state.items[0];

            if (eventToUpdate) {
                const updates = { title: 'Updated Title' };
                const resultAction = await store.dispatch(updateEvent({
                    id: eventToUpdate.id,
                    updates,
                }));

                expect(resultAction.type).toBe(updateEvent.fulfilled.type);
            }
        });

        it('should merge updates with existing event data', async () => {
            const state = store.getState().events;
            const eventToUpdate = state.items[0];

            if (eventToUpdate) {
                const originalTitle = eventToUpdate.title;
                const updates = { description: 'New description' };

                await store.dispatch(updateEvent({
                    id: eventToUpdate.id,
                    updates,
                }));

                const updatedEvent = store.getState().events.items[0];
                expect(updatedEvent.description).toBe('New description');
                expect(updatedEvent.title).toBe(originalTitle);
            }
        });

        it('should update currentEvent if it matches', async () => {
            const state = store.getState().events;
            const eventId = state.items[0]?.id;

            if (eventId) {
                await store.dispatch(fetchEventById(eventId));
                const updates = { title: 'Updated Title' };

                await store.dispatch(updateEvent({
                    id: eventId,
                    updates,
                }));

                const updatedCurrent = store.getState().events.currentEvent;
                expect(updatedCurrent.title).toBe('Updated Title');
            }
        });
    });

    describe('deleteEvent Async Thunk', () => {
        beforeEach(async () => {
            await store.dispatch(fetchEvents());
        });

        it('should delete event from items array', async () => {
            const state = store.getState().events;
            const eventToDelete = state.items[0];

            if (eventToDelete) {
                const beforeCount = state.items.length;

                await store.dispatch(deleteEvent(eventToDelete.id));

                const afterState = store.getState().events;
                expect(afterState.items.length).toBe(beforeCount - 1);
            }
        });

        it('should remove deleted event by id', async () => {
            const state = store.getState().events;
            const eventToDelete = state.items[0];

            if (eventToDelete) {
                await store.dispatch(deleteEvent(eventToDelete.id));

                const afterState = store.getState().events;
                const foundEvent = afterState.items.find(e => e.id === eventToDelete.id);
                expect(foundEvent).toBeUndefined();
            }
        });

        it('should handle delete of non-existent event gracefully', async () => {
            const beforeState = store.getState().events;
            const beforeCount = beforeState.items.length;

            await store.dispatch(deleteEvent('nonexistent_id'));

            const afterState = store.getState().events;
            expect(afterState.items.length).toBe(beforeCount);
        });
    });

    describe('Events State Consistency', () => {
        it('should maintain consistent items count after multiple operations', async () => {
            await store.dispatch(fetchEvents());
            const initialCount = store.getState().events.items.length;

            // Create event
            await store.dispatch(createEvent({
                title: 'Test',
                description: 'Test',
                date: new Date().toISOString(),
                capacity: 100,
            }));
            expect(store.getState().events.items.length).toBe(initialCount + 1);

            // Delete event
            const itemToDelete = store.getState().events.items[0];
            if (itemToDelete) {
                await store.dispatch(deleteEvent(itemToDelete.id));
                expect(store.getState().events.items.length).toBe(initialCount);
            }
        });

        it('should not lose data on status changes', async () => {
            await store.dispatch(fetchEvents());
            const itemsBeforeReset = store.getState().events.items;

            store.dispatch(resetStatus());

            const itemsAfterReset = store.getState().events.items;
            expect(itemsAfterReset).toEqual(itemsBeforeReset);
        });

        it('should handle rapid sequential fetches', async () => {
            const fetch1 = await store.dispatch(fetchEvents());
            const fetch2 = await store.dispatch(fetchEvents());

            expect(fetch1.payload).toEqual(fetch2.payload);
            const state = store.getState().events;
            expect(state.items.length).toBeGreaterThan(0);
        });
    });

    describe('Event Selectors', () => {
        beforeEach(async () => {
            await store.dispatch(fetchEvents());
        });

        it('selectAllEvents should return all events', () => {
            const events = selectAllEvents(store.getState());
            expect(Array.isArray(events)).toBe(true);
            expect(events.length).toBeGreaterThan(0);
        });

        it('selectEventById should find event by id', () => {
            const state = store.getState();
            const eventId = state.events.items[0]?.id;

            if (eventId) {
                const event = selectEventById(state, eventId);
                expect(event).toBeDefined();
                expect(event.id).toBe(eventId);
            }
        });

        it('selectEventById should return undefined for non-existent id', () => {
            const state = store.getState();
            const event = selectEventById(state, 'nonexistent_id');
            expect(event).toBeUndefined();
        });

        it('selectEventsStatus should return current status', () => {
            const state = store.getState();
            const status = selectEventsStatus(state);
            expect(['idle', 'loading', 'succeeded', 'failed']).toContain(status);
        });

        it('selectEventsError should return error state', () => {
            const state = store.getState();
            const error = selectEventsError(state);
            expect(error === null || typeof error === 'string').toBe(true);
        });
    });

    describe('Events Error Handling', () => {
        it('should handle fetch error gracefully', async () => {
            const resultAction = await store.dispatch(fetchEventById('invalid_id'));

            expect(resultAction.type).toBe(fetchEventById.rejected.type);
            const state = store.getState().events;
            expect(state.error).not.toBeNull();
        });

        it('should maintain items on error', async () => {
            await store.dispatch(fetchEvents());
            const itemsBeforeError = store.getState().events.items;

            await store.dispatch(fetchEventById('invalid_id'));

            const itemsAfterError = store.getState().events.items;
            expect(itemsAfterError).toEqual(itemsBeforeError);
        });

        it('should allow clearing error state', async () => {
            await store.dispatch(fetchEventById('invalid_id'));
            let state = store.getState().events;
            expect(state.error).not.toBeNull();

            store.dispatch(resetStatus());

            state = store.getState().events;
            expect(state.error).toBeNull();
        });
    });
});
