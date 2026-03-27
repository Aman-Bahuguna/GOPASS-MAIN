/**
 * ==========================================
 * EVENTS API SERVICE
 * ==========================================
 * 
 * Handles all event-related API calls.
 */

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchAllEvents = async () => {
    const res = await fetch(`${API_BASE}/events`);
    if (!res.ok) throw new Error('Failed to fetch events');
    return res.json();
};

export const fetchEventById = async (eventId) => {
    const res = await fetch(`${API_BASE}/events/${eventId}`);
    if (!res.ok) throw new Error('Event not found');
    return res.json();
};

export const createEvent = async (eventData) => {
    const res = await fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...eventData,
            createdAt: new Date().toISOString(),
        }),
    });
    if (!res.ok) throw new Error('Failed to create event');
    return res.json();
};

export const updateEvent = async (id, updates) => {
    const res = await fetch(`${API_BASE}/events/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update event');
    return res.json();
};

export const deleteEvent = async (eventId) => {
    const res = await fetch(`${API_BASE}/events/${eventId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete event');
    return res.json();
};

export const getEventsByCollege = async (collegeName) => {
    const res = await fetch(`${API_BASE}/events?college=${encodeURIComponent(collegeName)}`);
    if (!res.ok) throw new Error('Failed to get events by college');
    return res.json();
};

export const getEventsByOrganizer = async (organizerId) => {
    const res = await fetch(`${API_BASE}/events?organizerId=${encodeURIComponent(organizerId)}`);
    if (!res.ok) throw new Error('Failed to get events by organizer');
    return res.json();
};

export const getUserRegistrations = async (userId) => {
    const res = await fetch(`${API_BASE}/registrations?userId=${encodeURIComponent(userId)}`);
    if (!res.ok) throw new Error('Failed to get user registrations');
    return res.json();
};

export const getEventRegistrations = async (eventId) => {
    const res = await fetch(`${API_BASE}/registrations?eventId=${encodeURIComponent(eventId)}`);
    if (!res.ok) throw new Error('Failed to get event registrations');
    return res.json();
};
