/**
 * ==========================================
 * EVENTS API SERVICE
 * ==========================================
 * 
 * Handles all event-related API calls.
 * Currently uses mock data — replace the implementation
 * inside each function with real API calls when ready.
 */

import { mockEvents } from '../mocks';
import { mockRegistrations } from '../mocks';
import { mockAdmins, mockOrganizers, mockUsers } from '../mocks';

/**
 * Fetch all events.
 * 
 * TODO (Backend): Replace with →
 *   const res = await fetch(`${API_BASE}/events`);
 *   return res.json();
 */
export const fetchAllEvents = async () => {
    // Simulate network delay
    // await new Promise(resolve => setTimeout(resolve, 500));
    return mockEvents;
};

/**
 * Fetch a single event by its ID.
 * 
 * TODO (Backend): Replace with →
 *   const res = await fetch(`${API_BASE}/events/${eventId}`);
 *   return res.json();
 */
export const fetchEventById = async (eventId) => {
    const event = mockEvents.find(e => e.id === eventId);
    if (!event) throw new Error('Event not found');
    return event;
};

/**
 * Create a new event.
 * 
 * TODO (Backend): Replace with →
 *   const res = await fetch(`${API_BASE}/events`, {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(eventData),
 *   });
 *   return res.json();
 */
export const createEvent = async (eventData) => {
    const newEvent = {
        ...eventData,
        id: `evt_${Date.now()}`,
        createdAt: new Date().toISOString(),
    };
    return newEvent;
};

/**
 * Update an existing event.
 * 
 * TODO (Backend): Replace with →
 *   const res = await fetch(`${API_BASE}/events/${id}`, {
 *     method: 'PATCH',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(updates),
 *   });
 *   return res.json();
 */
export const updateEvent = async (id, updates) => {
    return { id, updates };
};

/**
 * Delete an event.
 * 
 * TODO (Backend): Replace with →
 *   await fetch(`${API_BASE}/events/${eventId}`, { method: 'DELETE' });
 */
export const deleteEvent = async (eventId) => {
    return eventId;
};

/**
 * Get events filtered by college name.
 * 
 * TODO (Backend): Replace with →
 *   const res = await fetch(`${API_BASE}/events?college=${collegeName}`);
 *   return res.json();
 */
export const getEventsByCollege = (collegeName) => {
    return mockEvents.filter(event =>
        event.collegeId.toLowerCase() === collegeName.toLowerCase()
    );
};

/**
 * Get events filtered by organizer.
 * 
 * TODO (Backend): Replace with →
 *   const res = await fetch(`${API_BASE}/events?organizerId=${organizerId}`);
 *   return res.json();
 */
export const getEventsByOrganizer = (organizerId) => {
    return mockEvents.filter(event => event.organizerId === organizerId);
};

/**
 * Get user's registered events (with event details).
 * 
 * TODO (Backend): Replace with →
 *   const res = await fetch(`${API_BASE}/registrations?userId=${userId}`);
 *   return res.json();
 */
export const getUserRegistrations = (userId) => {
    const registrations = mockRegistrations.filter(reg => reg.userId === userId);
    return registrations.map(reg => ({
        ...reg,
        event: mockEvents.find(evt => evt.id === reg.eventId),
    }));
};

/**
 * Get registrations for a specific event (with user details).
 * 
 * TODO (Backend): Replace with →
 *   const res = await fetch(`${API_BASE}/registrations?eventId=${eventId}`);
 *   return res.json();
 */
export const getEventRegistrations = (eventId) => {
    const allUsers = [...mockAdmins, ...mockOrganizers, ...mockUsers];
    const registrations = mockRegistrations.filter(reg => reg.eventId === eventId);
    return registrations.map(reg => ({
        ...reg,
        user: allUsers.find(u => u.id === reg.userId),
    }));
};
