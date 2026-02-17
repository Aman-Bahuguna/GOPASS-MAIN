/**
 * ==========================================
 * AUTH API SERVICE
 * ==========================================
 * 
 * Handles all authentication-related API calls.
 * Currently uses mock data — replace the implementation
 * inside each function with real API calls when ready.
 * 
 * The function signatures and return shapes stay the same,
 * so the rest of the app won't need to change.
 */

import { mockAdmins, mockOrganizers, mockUsers } from '../mocks';

// --- Helpers ---
const getAllUsers = () => [...mockAdmins, ...mockOrganizers, ...mockUsers];

/**
 * Find a user by email address.
 * 
 * TODO (Backend): Replace with →
 *   const res = await fetch(`${API_BASE}/auth/find-by-email?email=${email}`);
 *   return res.json();
 */
export const findUserByEmail = (email) => {
    return getAllUsers().find(user => user.email.toLowerCase() === email.toLowerCase());
};

/**
 * Find a user by their ID.
 * 
 * TODO (Backend): Replace with →
 *   const res = await fetch(`${API_BASE}/users/${id}`);
 *   return res.json();
 */
export const findUserById = (id) => {
    return getAllUsers().find(user => user.id === id);
};

/**
 * Get all users (combined admins + organizers + general users).
 * 
 * TODO (Backend): Replace with →
 *   const res = await fetch(`${API_BASE}/users`);
 *   return res.json();
 */
export { getAllUsers };
