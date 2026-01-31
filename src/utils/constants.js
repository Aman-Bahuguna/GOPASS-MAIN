// Role constants
export const ROLES = {
    USER: 'USER',
    ORGANIZER: 'ORGANIZER',
    ADMIN: 'ADMIN',
};

// User status constants
export const USER_STATUS = {
    ACTIVE: 'ACTIVE',
    PENDING_PLATFORM_VERIFICATION: 'PENDING_PLATFORM_VERIFICATION',  // Admin only: waiting for platform to verify ID
    REJECTED: 'REJECTED',
    SUSPENDED: 'SUSPENDED',
};

// Event status constants
export const EVENT_STATUS = {
    UPCOMING: 'UPCOMING',
    ONGOING: 'ONGOING',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
};

// Position options for Admin
export const ADMIN_POSITIONS = [
    { value: 'PROFESSOR', label: 'Professor' },
    { value: 'HOD', label: 'Head of Department (HOD)' },
    { value: 'DEAN', label: 'Dean' },
];

// Position options for Organizer
export const ORGANIZER_POSITIONS = [
    { value: 'TEACHER', label: 'Teacher' },
    { value: 'STUDENT', label: 'Student' },
];

// Indian states list
export const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
];

// File upload constraints
export const FILE_UPLOAD = {
    MIN_SIZE_BYTES: 500 * 1024,        // 500KB
    MAX_SIZE_BYTES: 4 * 1024 * 1024,   // 4MB
    MIN_SIZE_MB: 0.5,
    MAX_SIZE_MB: 4,
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
};

// Route paths
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    PENDING_VERIFICATION: '/pending-verification',
    DASHBOARD: {
        USER: '/dashboard',
        ORGANIZER: '/dashboard/organizer',
        ADMIN: '/dashboard/admin',
    },
    EVENTS: '/events',
    CREATE_EVENT: '/events/create',
    MY_EVENTS: '/my-events',
    MY_TICKETS: '/my-tickets',
    PROFILE: '/profile',
};

// API Endpoints (for future backend integration)
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        SIGNUP: '/api/auth/signup',
        LOGOUT: '/api/auth/logout',
        VERIFY_EMAIL: '/api/auth/verify-email',
    },
    USERS: {
        PROFILE: '/api/users/profile',
        UPDATE: '/api/users/update',
    },
    ORGANIZERS: {
        PENDING: '/api/organizers/pending',
        APPROVE: '/api/organizers/approve',
        REJECT: '/api/organizers/reject',
    },
    EVENTS: {
        LIST: '/api/events',
        CREATE: '/api/events/create',
        UPDATE: '/api/events/update',
        DELETE: '/api/events/delete',
        REGISTER: '/api/events/register',
    },
};

// Animation durations
export const ANIMATION = {
    FAST: 0.2,
    NORMAL: 0.3,
    SLOW: 0.5,
    STAGGER: 0.1,
};
