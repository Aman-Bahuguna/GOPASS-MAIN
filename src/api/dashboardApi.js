/**
 * ==========================================
 * DASHBOARD API SERVICE
 * ==========================================
 * 
 * Handles dashboard statistics for each role.
 * Currently computed from mock data — replace with
 * a single backend endpoint when ready.
 */

import { ROLES, EVENT_STATUS } from '../utils/constants';
import { getUserRegistrations, getEventsByOrganizer, getEventsByCollege } from './eventsApi';
import { getOrganizersByCollege, getPendingOrganizers } from './organizersApi';

/**
 * Get dashboard statistics based on the user's role.
 * 
 * TODO (Backend): Replace with →
 *   const res = await fetch(`${API_BASE}/dashboard/stats`, {
 *     headers: { Authorization: `Bearer ${token}` },
 *   });
 *   return res.json();
 */
export const getDashboardStats = (user) => {
    switch (user.role) {
        case ROLES.USER: {
            const userRegs = getUserRegistrations(user.id);
            return {
                upcomingEvents: 0, // Will be computed differently once we have live data
                registeredEvents: userRegs.length,
                attendedEvents: userRegs.filter(r => {
                    const event = r.event;
                    return event && new Date(event.endDate) < new Date();
                }).length,
            };
        }

        case ROLES.ORGANIZER: {
            const orgEvents = getEventsByOrganizer(user.id);
            return {
                activeEvents: orgEvents.filter(e => e.status === EVENT_STATUS.UPCOMING).length,
                pendingEvents: 0,
                completedEvents: orgEvents.filter(e => e.status === EVENT_STATUS.COMPLETED).length,
                totalRegistrations: orgEvents.reduce((acc, e) => acc + e.registeredCount, 0),
            };
        }

        case ROLES.ADMIN: {
            const collegeOrganizers = getOrganizersByCollege(user.college.name, user.college.state);
            const pendingOrgs = getPendingOrganizers(user.college.name, user.college.state);
            const collegeEvents = getEventsByCollege(user.college.name);
            return {
                pendingApprovals: pendingOrgs.length,
                totalOrganizers: collegeOrganizers.length,
                activeEvents: collegeEvents.filter(e => e.status === EVENT_STATUS.UPCOMING).length,
                totalEvents: collegeEvents.length,
            };
        }

        default:
            return {};
    }
};
