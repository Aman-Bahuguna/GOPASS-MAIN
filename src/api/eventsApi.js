/**
 * ==========================================
 * EVENTS API SERVICE
 * ==========================================
 * 
 * Handles all event-related API calls.
 */

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchAllEvents = async () => {
    const token = localStorage.getItem('gopass_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/event/allEvent`, {
        method: 'GET',
        headers
    });
    if (!res.ok) throw new Error('Failed to fetch events');
    
    const data = await res.json();
    // Safely extract array depending on API format
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.content)) return data.content; // <== The crucial fix for pagination
    if (data && Array.isArray(data.events)) return data.events;
    if (data && Array.isArray(data.allEvents)) return data.allEvents;
    if (data && Array.isArray(data.data)) return data.data;
    return data;
};

export const fetchEventById = async (eventId) => {
    const token = localStorage.getItem('gopass_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/event/${eventId}`, {
        method: 'GET',
        headers
    });

    if (!res.ok) throw new Error(`Event fetch failed: ${res.status}`);
    return res.json();
};

export const createEvent = async (eventData) => {
    const token = localStorage.getItem('gopass_token');
    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/event/saveEvent`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(eventData),
    });
    if (!res.ok) throw new Error('Failed to create event');
    return res.json();
};

export const updateEvent = async (id, updates) => {
    const token = localStorage.getItem('gopass_token');
    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/event/${id}`, {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update event');
    return res.json();
};

export const deleteEvent = async (eventId) => {
    const token = localStorage.getItem('gopass_token');
    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/event/${eventId}`, { 
        method: 'DELETE',
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error('Failed to delete event');
    return res.json();
};

export const getEventsByCollege = async (collegeName) => {
    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/event/college?name=${encodeURIComponent(collegeName)}`);
    if (!res.ok) throw new Error('Failed to get events by college');
    return res.json();
};

export const getEventsByOrganizer = async () => {
    const token = localStorage.getItem('gopass_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    // Note: page=0&size=10 are hardcoded as per endpoint specification photo
    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/event/organizerEvent?page=0&size=10`, {
        method: 'GET',
        headers
    });
    if (!res.ok) throw new Error('Failed to get events by organizer');
    
    const data = await res.json();
    
    // Safely extract the paginated array
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.content)) return data.content;
    if (data && Array.isArray(data.events)) return data.events;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
};

export const registerForEvent = async (eventId, registrationData) => {
    const token = localStorage.getItem('gopass_token');
    const headers = { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    };

    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/registrations/${eventId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(registrationData)
    });
    
    if (!res.ok) throw new Error('Registration failed');
    // Backend returns a plain string like "Successfully registered", 
    // so we handle both text and JSON safely
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return res.json();
    } else {
        return res.text();
    }
};

export const getUserRegistrations = async () => {
    const token = localStorage.getItem('gopass_token');
    const headers = { 'Authorization': `Bearer ${token}` };

    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/registrations/userRegistrations?page=0&size=10`, {
        method: 'GET',
        headers
    });
    if (!res.ok) throw new Error('Failed to get user registrations');
    const data = await res.json();
    
    // Extract paginated array
    if (data && Array.isArray(data.content)) return data.content;
    return [];
};

export const getEventRegistrations = async (eventId) => {
    const token = localStorage.getItem('gopass_token');
    const headers = { 'Authorization': `Bearer ${token}` };

    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/registrations/event/${eventId}?page=0&size=10`, {
        method: 'GET',
        headers
    });
    if (!res.ok) throw new Error('Failed to get event registrations');
    const data = await res.json();

    // Extract paginated array
    if (data && Array.isArray(data.content)) return data.content;
    return [];
};
