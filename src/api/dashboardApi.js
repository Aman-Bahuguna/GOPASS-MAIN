/**
 * ==========================================
 * DASHBOARD API SERVICE
 * ==========================================
 * 
 * Handles dashboard statistics for each role.
 */

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getDashboardStats = async (user) => {
    const res = await fetch(`${API_BASE}/dashboard/stats?userId=${user.id}&role=${user.role}`, {
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to get dashboard stats');
    return res.json();
};
