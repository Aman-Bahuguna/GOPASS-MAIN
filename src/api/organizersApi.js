/**
 * ==========================================
 * ORGANIZERS API SERVICE
 * ==========================================
 * 
 * Handles all organizer-related API calls.
 * Currently uses mock data — replace the implementation
 * inside each function with real API calls when ready.
 */

import { mockOrganizers } from '../mocks';
import { USER_STATUS } from '../utils/constants';

/**
 * Get organizers by college name and state.
 * 
 * TODO (Backend): Replace with →
 *   const res = await fetch(`${API_BASE}/organizers?college=${collegeName}&state=${state}`);
 *   return res.json();
 */
export const getOrganizersByCollege = (collegeName, state) => {
    return mockOrganizers.filter(org =>
        org.college.name.toLowerCase() === collegeName.toLowerCase() &&
        org.college.state.toLowerCase() === state.toLowerCase()
    );
};

/**
 * Get pending organizers for a particular college.
 * 
 * TODO (Backend): Replace with →
 *   const res = await fetch(`${API_BASE}/organizers?college=${collegeName}&state=${state}&status=pending`);
 *   return res.json();
 */
export const getPendingOrganizers = (collegeName, state) => {
    return mockOrganizers.filter(org =>
        org.college.name.toLowerCase() === collegeName.toLowerCase() &&
        org.college.state.toLowerCase() === state.toLowerCase() &&
        org.status === USER_STATUS.ACTIVE && org.isAdminApproved === false
    );
};
