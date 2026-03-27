/**
 * ==========================================
 * ORGANIZERS API SERVICE
 * ==========================================
 * 
 * Handles all organizer-related API calls.
 */

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getOrganizersByCollege = async (collegeName, state) => {
    const res = await fetch(`${API_BASE}/organizers?college=${encodeURIComponent(collegeName)}&state=${encodeURIComponent(state)}`);
    if (!res.ok) throw new Error('Failed to get organizers');
    return res.json();
};

export const getPendingOrganizers = async (collegeName, state) => {
    const res = await fetch(`${API_BASE}/organizers?college=${encodeURIComponent(collegeName)}&state=${encodeURIComponent(state)}&status=pending`);
    if (!res.ok) throw new Error('Failed to get pending organizers');
    return res.json();
};
