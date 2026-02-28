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

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Fetch all events.
 * Endpoint: /api/event/allEvent
 */
export const fetchAllEvents = async () => {
    try {
        const token = localStorage.getItem('gopass_token');
        const response = await fetch(`${API_BASE}/api/event/allEvent`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'token': token, // Extra header for consistency
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch All Events Error:', error);
        throw error;
    }
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
 * Endpoint: /api/event/saveEvent
 */
export const createEvent = async (eventData) => {
    try {
        const token = localStorage.getItem('gopass_token');

        // Map frontend fields to the specific backend JSON format provided by user
        const payload = {
            id: null,
            eventName: eventData.eventName,
            description: eventData.description,
            startDate: eventData.startDate,
            endDate: eventData.endDate || eventData.startDate,
            venue: eventData.venue,
            phoneNo: eventData.phoneNo,
            email: eventData.email,
            // Use a specific smaller placeholder if no preview to avoid any size issues
            bannerUrl: (eventData.bannerUrl && !eventData.bannerUrl.startsWith('data:'))
                ? eventData.bannerUrl
                : "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070",
            organizerName: eventData.organizerName,
            collegeName: eventData.collegeName,
            token: token
        };

        console.log('DEBUG: Sending Event Payload to Backend:', JSON.stringify(payload, null, 2));

        const response = await fetch(`${API_BASE}/api/event/saveEvent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'token': token, // Added 'token' header as per instruction
                'ngrok-skip-browser-warning': 'true'
            }
            ,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('DEBUG: Backend Error Response:', errorText);
            let errorMsg = 'Failed to create event';
            try {
                const errorJson = JSON.parse(errorText);
                errorMsg = errorJson.message || errorJson.error || errorMsg;
            } catch (e) {
                errorMsg = `Server Error: ${response.status}`;
            }
            throw new Error(errorMsg);
        }

        return await response.json();
    } catch (error) {
        console.error('Create Event Error:', error);
        throw error;
    }
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
export const getEventsByCollege = async (collegeName) => {
    return mockEvents.filter(event =>
        event.collegeId.toLowerCase() === collegeName.toLowerCase()
    );
};

/**
 * Get events filtered by organizer.
 * Endpoint: /api/event/organizerEvent
 */
export const getEventsByOrganizer = async (organizerId) => {
    try {
        const token = localStorage.getItem('gopass_token');
        // Passing token both in header and as query param for maximum compatibility
        const response = await fetch(`${API_BASE}/api/event/organizerEvent?token=${token}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'token': token, // Extra header for certain backend configurations
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch organizer events');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch Organizer Events Error:', error);
        throw error;
    }
};

/**
 * Register a user for an event.
 * Endpoint: /api/registrations/{eventId}
 */
export const registerForEvent = async (eventId) => {
    try {
        const token = localStorage.getItem('gopass_token');
        const response = await fetch(`${API_BASE}/api/registrations/${eventId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'token': token,
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to register for event');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Register for Event Error:', error);
        throw error;
    }
};

/**
 * Get user's registered events (with event details).
 * Endpoint: /api/registrations/userRegistrations
 */
export const getUserRegistrations = async () => {
    try {
        const token = localStorage.getItem('gopass_token');
        const response = await fetch(`${API_BASE}/api/registrations/userRegistrations`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'token': token,
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user registrations');
        }

        const data = await response.json();
        // Backend returns the list of registrations, sometimes wrapped
        return data.data || data.registrations || data.content || data;
    } catch (error) {
        console.error('Fetch User Registrations Error:', error);
        throw error;
    }
};

/**
 * Get registrations for a specific event (with user details).
 * Endpoint: /api/registrations/event/{eventId}
 */
export const getEventRegistrations = async (eventId) => {
    try {
        const token = localStorage.getItem('gopass_token');
        const response = await fetch(`${API_BASE}/api/registrations/event/${eventId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'token': token,
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch event registrations');
        }

        const data = await response.json();
        // Handle potential wrapped response
        return data.data || data.registrations || data.content || data;
    } catch (error) {
        console.error('Fetch Event Registrations Error:', error);
        throw error;
    }
};
