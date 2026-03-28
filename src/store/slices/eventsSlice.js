import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllEvents as apiFetchAllEvents, fetchEventById as apiFetchEventById, createEvent as apiCreateEvent, getEventsByOrganizer as apiGetEventsByOrganizer } from '../../api';
import { EVENT_STATUS } from '../../utils/constants';

// --- Async Thunks ---

// 1. Fetch All Events
export const fetchEvents = createAsyncThunk('events/fetchAll', async (_, { rejectWithValue }) => {
    try {
        return await apiFetchAllEvents();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// 1.5 Fetch Organizer Events
export const fetchOrganizerEvents = createAsyncThunk('events/fetchOrganizerEvents', async (_, { rejectWithValue }) => {
    try {
        return await apiGetEventsByOrganizer();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// 2. Fetch Single Event Details
export const fetchEventById = createAsyncThunk('events/fetchById', async (eventId, { rejectWithValue }) => {
    try {
        return await apiFetchEventById(eventId);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// 3. Create Event
export const createEvent = createAsyncThunk('events/create', async (eventData, { rejectWithValue }) => {
    try {
        const newEvent = await apiCreateEvent(eventData);
        return newEvent;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// 4. Update Event (e.g. status change, content update)
export const updateEvent = createAsyncThunk('events/update', async ({ id, updates }, { rejectWithValue }) => {
    try {
        await delay(500);
        return { id, updates };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// 5. Delete Event
export const deleteEvent = createAsyncThunk('events/delete', async (eventId, { rejectWithValue }) => {
    try {
        return eventId;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


const initialState = {
    items: [], // list of events for grid/list views
    currentEvent: null, // detailed view of a single event
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    lastFetched: null,
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        clearCurrentEvent: (state) => {
            state.currentEvent = null;
        },
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch All
            .addCase(fetchEvents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.lastFetched = Date.now();
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Fetch Organizer Events
            .addCase(fetchOrganizerEvents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrganizerEvents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.lastFetched = Date.now();
            })
            .addCase(fetchOrganizerEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Fetch Single
            .addCase(fetchEventById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEventById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentEvent = action.payload;
            })
            .addCase(fetchEventById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Create
            .addCase(createEvent.fulfilled, (state, action) => {
                state.items.unshift(action.payload); // Add to top of list
            })

            // Update
            .addCase(updateEvent.fulfilled, (state, action) => {
                const { id, updates } = action.payload;
                const index = state.items.findIndex(e => e.id === id);
                if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...updates };
                }
                if (state.currentEvent && state.currentEvent.id === id) {
                    state.currentEvent = { ...state.currentEvent, ...updates };
                }
            })

            // Delete
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.items = state.items.filter(e => e.id !== action.payload);
            });
    }
});

export const { clearCurrentEvent, resetStatus } = eventsSlice.actions;

// Selectors
export const selectAllEvents = (state) => state.events.items;
export const selectEventById = (state, eventId) => state.events.items.find(e => e.id === eventId);
export const selectEventsStatus = (state) => state.events.status;
export const selectEventsError = (state) => state.events.error;

export default eventsSlice.reducer;
