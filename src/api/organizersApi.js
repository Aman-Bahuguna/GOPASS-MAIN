import { USER_STATUS } from '../utils/constants';

/**
 * ==========================================
 * ORGANIZERS API SERVICE
 * ==========================================
 * 
 * Handles all organizer-related API calls.
 */

export const getOrganizersByCollege = async (collegeName, state) => {
    // Attempt to fetch from real backend first
    try {
        const token = localStorage.getItem('gopass_token');
        const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/admin/organizers?college=${encodeURIComponent(collegeName)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (res.ok) {
            const data = await res.json();
            const realOrgs = Array.isArray(data) ? data : (data.content || data.organizers || []);
            if (realOrgs.length > 0) return realOrgs;
        }
    } catch (err) {
        console.warn("Backend organizers fetch failed, using local storage fallback", err);
    }

    const stored = localStorage.getItem('gopass_registered_organizers');
    const orgs = stored ? JSON.parse(stored) : [];
    // Ensure both college object format or flat collegeName string are matched
    return orgs.filter(o => 
        (o.college?.name && o.college.name.toLowerCase() === collegeName.toLowerCase()) || 
        (o.collegeName && o.collegeName.toLowerCase() === collegeName.toLowerCase())
    );
};

export const getPendingOrganizers = async () => {
    const token = localStorage.getItem('gopass_token');
    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/admin/pending-organizers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
        }
    });
    
    if (!res.ok) throw new Error('Failed to fetch pending organizers from API');
    
    const data = await res.json();
    console.log("Pending Organizers API Response:", data);
    
    // Support responses where the array is inside a data field
    // Since login returns `pendingUsers`, this endpoint might too.
    return Array.isArray(data) ? data : data.pendingUsers || data.data || data.pendingOrganizers || data.organizers || [];
};

export const approveOrganizer = async (userId) => {
    const token = localStorage.getItem('gopass_token');
    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/admin/approve/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
        }
    });

    const responseText = await res.text();
    let responseData = {};
    
    try {
        if (responseText) {
            responseData = JSON.parse(responseText);
        }
    } catch {
        // Backend returned a plain text string instead of json (like "Organizer approved")
        responseData = { message: responseText };
    }

    if (!res.ok) {
        throw new Error(responseData.message || responseText || 'Failed to approve organizer');
    }

    return responseData;
};
