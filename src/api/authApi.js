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
    const token = localStorage.getItem('gopass_token');
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/auth/find-by-email?email=${encodeURIComponent(email)}`, {
        headers
    });
    if (!res.ok) throw new Error('User not found');
    return res.json();
};

export const findUserById = async (id) => {
    const token = localStorage.getItem('gopass_token');
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/users/${id}`, {
        headers
    });
    if (!res.ok) throw new Error('User not found');
    return res.json();
};

export const getAllUsers = async () => {
    const token = localStorage.getItem('gopass_token');
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`https://eventhub-backend-prsg.onrender.com/api/users`, {
        headers
    });
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
