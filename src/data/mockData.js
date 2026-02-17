/**
 * ==========================================
 * DEPRECATED — Use src/mocks/ for mock data
 *               and src/api/  for API calls
 * ==========================================
 * 
 * This file is kept for backwards compatibility only.
 * All exports are re-exported from the new locations.
 * 
 * New code should import from:
 *   - '@/mocks'  → raw mock data arrays
 *   - '@/api'    → functions (findUserByEmail, getDashboardStats, etc.)
 */

// Re-export raw mock data
export { mockAdmins, mockOrganizers, mockUsers, mockEvents, mockRegistrations } from '../mocks';

// Re-export API / helper functions
export {
    findUserByEmail,
    findUserById,
    getAllUsers,
    getOrganizersByCollege,
    getPendingOrganizers,
    getEventsByCollege,
    getEventsByOrganizer,
    getUserRegistrations,
    getEventRegistrations,
    getDashboardStats,
} from '../api';
