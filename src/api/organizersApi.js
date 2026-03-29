import { USER_STATUS } from '../utils/constants';

/**
 * ==========================================
 * ORGANIZERS API SERVICE
 * ==========================================
 * 
 * Handles all organizer-related API calls.
 */

export const getOrganizersByCollege = async (collegeName, state) => {
    const stored = localStorage.getItem('gopass_registered_organizers');
    const orgs = stored ? JSON.parse(stored) : [];
    
    // Get locally approved emails/ids to ensure persistence even if backend is flaky/reset
    const localApprovals = JSON.parse(localStorage.getItem('gopass_approved_organizers') || '[]');

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
            
            if (realOrgs.length > 0) {
                // Merge local approval state into backend data for the demo resilience
                return realOrgs.map(org => {
                    if (localApprovals.includes(org.email) || localApprovals.includes(String(org.id)) || localApprovals.includes(String(org.userId))) {
                        return { ...org, isAdminApproved: true, status: USER_STATUS.ACTIVE };
                    }
                    return org;
                });
            }
        }
    } catch (err) {
        console.warn("Backend organizers fetch failed, using local storage fallback", err);
    }

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
        responseData = { message: responseText };
    }

    if (!res.ok) {
        throw new Error(responseData.message || responseText || 'Failed to approve organizer');
    }

    return responseData;
};

export const rejectOrganizer = async (userId) => {
    const token = localStorage.getItem('gopass_token');
    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/admin/reject/${userId}`, {
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
        responseData = { message: responseText };
    }

    if (!res.ok) {
        throw new Error(responseData.message || responseText || 'Failed to reject organizer');
    }

    return responseData;
};
