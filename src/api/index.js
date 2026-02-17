/**
 * ==========================================
 * API LAYER - Central Export
 * ==========================================
 * 
 * This folder is the SINGLE POINT of integration
 * between the frontend and the backend.
 * 
 * Currently every function uses mock data internally.
 * When your backend is ready, open the individual
 * service file and swap the implementation.
 * The rest of the app imports from HERE and won't
 * need any changes.
 * 
 * Files:
 *   authApi.js        – findUserByEmail, findUserById, getAllUsers
 *   eventsApi.js      – fetchAllEvents, fetchEventById, createEvent, updateEvent, deleteEvent,
 *                        getEventsByCollege, getEventsByOrganizer,
 *                        getUserRegistrations, getEventRegistrations
 *   organizersApi.js  – getOrganizersByCollege, getPendingOrganizers
 *   dashboardApi.js   – getDashboardStats
 */

// Auth
export { findUserByEmail, findUserById, getAllUsers } from './authApi';

// Events & Registrations
export {
    fetchAllEvents,
    fetchEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventsByCollege,
    getEventsByOrganizer,
    getUserRegistrations,
    getEventRegistrations,
} from './eventsApi';

// Organizers
export { getOrganizersByCollege, getPendingOrganizers } from './organizersApi';

// Dashboard
export { getDashboardStats } from './dashboardApi';
