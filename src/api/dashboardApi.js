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
        const res = await fetch(`${API_BASE}/dashboard/stats?userId=${user.id}&role=${user.role}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
            return { totalOrganizers: 0, totalRegistrations: 0, activeEvents: 0 };
        }
        return await res.json();
    } catch {
        // Return fallback stats if backend is unreachable 
        return { totalOrganizers: 0, totalRegistrations: 0, activeEvents: 0 };
    }
};
