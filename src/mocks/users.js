import { ROLES, USER_STATUS } from '../utils/constants';

// ==========================================
// Mock Admin Users
// ==========================================
export const mockAdmins = [
    {
        id: 'admin_001',
        fullName: 'Dr. Rajesh Sharma',
        email: 'rajesh.sharma@xyz.edu.in',
        role: ROLES.ADMIN,
        position: 'HOD',
        status: USER_STATUS.ACTIVE,
        college: {
            name: 'XYZ Engineering College',
            state: 'Maharashtra',
            pincode: '400001',
        },
        idCardUrl: '/uploads/id_admin_001.jpg',
        createdAt: '2025-06-15T10:00:00Z',
        avatar: null,
    },
    {
        id: 'admin_002',
        fullName: 'Prof. Anita Desai',
        email: 'anita.desai@abc.edu.in',
        role: ROLES.ADMIN,
        position: 'DEAN',
        status: USER_STATUS.ACTIVE,
        college: {
            name: 'ABC Institute of Technology',
            state: 'Karnataka',
            pincode: '560001',
        },
        idCardUrl: '/uploads/id_admin_002.jpg',
        createdAt: '2025-04-20T14:30:00Z',
        avatar: null,
    },
];

// ==========================================
// Mock Organizers
// ==========================================
export const mockOrganizers = [
    {
        id: 'org_001',
        fullName: 'Priya Patel',
        email: 'priya.patel@xyz.edu.in',
        role: ROLES.ORGANIZER,
        position: 'TEACHER',
        status: USER_STATUS.ACTIVE,
        isAdminApproved: true,
        approvedBy: 'admin_001',
        approvedAt: '2025-12-01T09:00:00Z',
        college: {
            name: 'XYZ Engineering College',
            state: 'Maharashtra',
            pincode: '400001',
        },
        idCardUrl: '/uploads/id_org_001.jpg',
        createdAt: '2025-11-28T11:00:00Z',
        avatar: null,
    },
    {
        id: 'org_002',
        fullName: 'Rahul Verma',
        email: 'rahul.verma@xyz.edu.in',
        role: ROLES.ORGANIZER,
        position: 'STUDENT',
        status: USER_STATUS.ACTIVE,
        isAdminApproved: false,
        approvedBy: null,
        approvedAt: null,
        college: {
            name: 'XYZ Engineering College',
            state: 'Maharashtra',
            pincode: '400001',
        },
        idCardUrl: '/uploads/id_org_002.jpg',
        createdAt: '2026-01-25T15:00:00Z',
        avatar: null,
    },
    {
        id: 'org_003',
        fullName: 'Sneha Kulkarni',
        email: 'sneha.k@abc.edu.in',
        role: ROLES.ORGANIZER,
        position: 'STUDENT',
        status: USER_STATUS.PENDING_PLATFORM_VERIFICATION,
        isAdminApproved: false,
        approvedBy: null,
        approvedAt: null,
        college: {
            name: 'ABC Institute of Technology',
            state: 'Karnataka',
            pincode: '560001',
        },
        idCardUrl: '/uploads/id_org_003.jpg',
        createdAt: '2026-01-26T10:00:00Z',
        avatar: null,
    },
];

// ==========================================
// Mock Users (General / Attendees)
// ==========================================
export const mockUsers = [
    {
        id: 'user_001',
        fullName: 'Amit Kumar',
        email: 'amit.kumar@gmail.com',
        role: ROLES.USER,
        status: USER_STATUS.ACTIVE,
        createdAt: '2025-08-10T12:00:00Z',
        avatar: null,
        registeredEvents: ['evt_001', 'evt_003'],
    },
    {
        id: 'user_002',
        fullName: 'Neha Singh',
        email: 'neha.singh@gmail.com',
        role: ROLES.USER,
        status: USER_STATUS.ACTIVE,
        createdAt: '2025-09-05T16:00:00Z',
        avatar: null,
        registeredEvents: ['evt_001', 'evt_002'],
    },
    {
        id: 'user_003',
        fullName: 'Vikram Joshi',
        email: 'vikram.j@gmail.com',
        role: ROLES.USER,
        status: USER_STATUS.ACTIVE,
        createdAt: '2026-01-27T08:00:00Z',
        avatar: null,
        registeredEvents: [],
    },
];
