/**
 * ==========================================
 * DASHBOARD API SERVICE
 * ==========================================
 * 
 * Handles dashboard statistics for each role.
 */

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getDashboardStats = async (user) => {
    try {
        const token = localStorage.getItem('gopass_token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/dashboard/stats?userId=${user.id}&role=${user.role}`, {
            method: 'GET',
            headers
        });

        if (!res.ok) {
            return { totalOrganizers: 0, totalRegistrations: 0, activeEvents: 0 };
        }
        return await res.json();
    } catch (err) {
        console.error('Stats fetch error:', err);
        return { totalOrganizers: 0, totalRegistrations: 0, activeEvents: 0 };
    }
};
