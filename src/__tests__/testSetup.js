/**
 * Test Setup and Utilities
 * Provides common setup, teardown, and helper functions for testing
 */

// Real localStorage mock that actually stores data
const store = {};

const localStorageMock = {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
        store[key] = String(value);
    }),
    removeItem: jest.fn((key) => {
        delete store[key];
    }),
    clear: jest.fn(() => {
        Object.keys(store).forEach(key => {
            delete store[key];
        });
    }),
};

global.localStorage = localStorageMock;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Universal test setup
beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
});

afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
});

// Helper functions for testing
export const createMockUser = (overrides = {}) => ({
    id: 'user_' + Date.now(),
    fullName: 'Test User',
    email: 'test@example.com',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    ...overrides,
});

export const createMockEvent = (overrides = {}) => ({
    id: 'evt_' + Date.now(),
    title: 'Test Event',
    description: 'Test event description',
    date: new Date().toISOString(),
    capacity: 100,
    registeredCount: 0,
    status: 'UPCOMING',
    createdAt: new Date().toISOString(),
    ...overrides,
});

export const createMockOrganizerUser = (overrides = {}) => ({
    id: 'org_' + Date.now(),
    fullName: 'Test Organizer',
    email: 'organizer@example.com',
    role: 'ORGANIZER',
    status: 'PENDING_ADMIN_APPROVAL',
    position: 'Event Manager',
    college: {
        name: 'Test College',
        state: 'Maharashtra',
        pincode: '400001',
    },
    isAdminApproved: false,
    createdAt: new Date().toISOString(),
    ...overrides,
});

export const createMockAdminUser = (overrides = {}) => ({
    id: 'admin_' + Date.now(),
    fullName: 'Test Admin',
    email: 'rajesh.sharma@xyz.edu.in',
    role: 'ADMIN',
    status: 'PENDING_PLATFORM_VERIFICATION',
    position: 'Platform Admin',
    college: {
        name: 'Admin College',
        state: 'Delhi',
        pincode: '110001',
    },
    createdAt: new Date().toISOString(),
    ...overrides,
});

/**
 * Wait for async state updates
 */
export const waitForStateUpdate = () => {
    return new Promise((resolve) => {
        setImmediate(resolve);
    });
};

/**
 * Helper to dispatch and wait for async thunk
 */
export const dispatchAndWait = async (store, action) => {
    const result = await store.dispatch(action);
    await waitForStateUpdate();
    return result;
};

/**
 * Test data generators
 */
export const generateMockEvents = (count = 5) => {
    return Array.from({ length: count }, (_, i) => createMockEvent({
        id: `evt_${i}`,
        title: `Event ${i + 1}`,
    }));
};

export const generateMockUsers = (count = 5, role = 'USER') => {
    return Array.from({ length: count }, (_, i) => createMockUser({
        id: `user_${i}`,
        email: `user${i}@example.com`,
        role,
    }));
};

/**
 * Assertion helpers
 */
export const expectValidUser = (user) => {
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('role');
    expect(user).toHaveProperty('fullName');
};

export const expectValidEvent = (event) => {
    expect(event).toHaveProperty('id');
    expect(event).toHaveProperty('title');
    expect(event).toHaveProperty('date');
    expect(event).toHaveProperty('capacity');
    expect(event).toHaveProperty('status');
};

export const expectValidAuthState = (state) => {
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('isAuthenticated');
    expect(state).toHaveProperty('isLoading');
    expect(state).toHaveProperty('error');
};

export const expectValidEventsState = (state) => {
    expect(state).toHaveProperty('items');
    expect(state).toHaveProperty('currentEvent');
    expect(state).toHaveProperty('status');
    expect(state).toHaveProperty('error');
    expect(state).toHaveProperty('lastFetched');
};

/**
 * Redux testing utilities
 */
export class StoreTestHelper {
    constructor(store) {
        this.store = store;
    }

    getState() {
        return this.store.getState();
    }

    getAuthState() {
        return this.getState().auth;
    }

    getEventsState() {
        return this.getState().events;
    }

    isAuthenticated() {
        return this.getAuthState().isAuthenticated;
    }

    getUser() {
        return this.getAuthState().user;
    }

    getEvents() {
        return this.getEventsState().items;
    }

    getCurrentEvent() {
        return this.getEventsState().currentEvent;
    }

    getAuthError() {
        return this.getAuthState().error;
    }

    getEventsError() {
        return this.getEventsState().error;
    }

    isLoading() {
        return this.getAuthState().isLoading;
    }

    getEventsStatus() {
        return this.getEventsState().status;
    }

    async dispatch(action) {
        const result = await this.store.dispatch(action);
        await waitForStateUpdate();
        return result;
    }

    subscribe(listener) {
        return this.store.subscribe(listener);
    }
}

export default {
    createMockUser,
    createMockEvent,
    createMockOrganizerUser,
    createMockAdminUser,
    waitForStateUpdate,
    dispatchAndWait,
    generateMockEvents,
    generateMockUsers,
    expectValidUser,
    expectValidEvent,
    expectValidAuthState,
    expectValidEventsState,
    StoreTestHelper,
};
