/**
 * ==========================================
 * AUTH API SERVICE
 * ==========================================
 * 
 * Handles all authentication-related API calls.
 */

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Find a user by email address.
 */
export const findUserByEmail = async (email) => {
    const res = await fetch(`${API_BASE}/auth/find-by-email?email=${encodeURIComponent(email)}`);
    if (!res.ok) throw new Error('User not found');
    return res.json();
};

/**
 * Find a user by their ID.
 */
export const findUserById = async (id) => {
    const res = await fetch(`${API_BASE}/users/${id}`);
    if (!res.ok) throw new Error('User not found');
    return res.json();
};

/**
 * Get all users (combined admins + organizers + general users).
 */
export const getAllUsers = async () => {
    const res = await fetch(`${API_BASE}/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
};

/**
 * Register a new user
 */
export const registerUser = async (userData) => {
    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (!res.ok) {
        let errorMessage = data.message || data.error || 'Registration failed';
        if (res.status === 500) {
            errorMessage = 'Server Error: The email might already be registered or there is a backend issue.';
        }
        throw new Error(errorMessage);
    }
    return data;
};

/**
 * Login an existing user
 */
export const loginUser = async (credentials) => {
    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || data.error || 'Login failed');
    }
    return data;
};
