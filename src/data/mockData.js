import { ROLES, USER_STATUS, EVENT_STATUS } from '../utils/constants';

// Mock Admin Users
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

// Mock Organizers
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
        status: USER_STATUS.ACTIVE,  // Organizer account is active, but needs admin approval to create events
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

// Mock Users
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

// Mock Events
export const mockEvents = [
    {
        id: 'evt_001',
        title: 'Tech Fest 2026',
        description: 'Annual technology festival featuring hackathons, workshops, and tech talks from industry experts. Join us for an exciting 3-day event packed with learning and networking opportunities.',
        shortDescription: 'Annual technology festival with hackathons and workshops',
        date: '2026-02-15T10:00:00Z',
        endDate: '2026-02-17T18:00:00Z',
        venue: 'Main Auditorium, XYZ Engineering College',
        fee: 299,
        capacity: 500,
        registeredCount: 245,
        organizerId: 'org_001',
        collegeId: 'XYZ Engineering College',
        status: EVENT_STATUS.UPCOMING,
        category: 'Technology',
        image: '/events/tech_fest.jpg',
        tags: ['hackathon', 'workshop', 'technology', 'networking'],
        createdAt: '2026-01-10T09:00:00Z',
    },
    {
        id: 'evt_002',
        title: 'Cultural Night 2026',
        description: 'Celebrate the diverse cultural heritage with performances, music, dance, and traditional cuisines. An evening of entertainment and cultural exchange.',
        shortDescription: 'Celebrate diversity with performances and music',
        date: '2026-02-20T17:00:00Z',
        endDate: '2026-02-20T22:00:00Z',
        venue: 'Open Air Theatre',
        fee: 149,
        capacity: 1000,
        registeredCount: 578,
        organizerId: 'org_001',
        collegeId: 'XYZ Engineering College',
        status: EVENT_STATUS.UPCOMING,
        category: 'Cultural',
        image: '/events/cultural_night.jpg',
        tags: ['culture', 'music', 'dance', 'entertainment'],
        createdAt: '2026-01-12T11:00:00Z',
    },
    {
        id: 'evt_003',
        title: 'AI/ML Workshop',
        description: 'Hands-on workshop on Artificial Intelligence and Machine Learning. Learn the fundamentals and build your first ML model with expert guidance.',
        shortDescription: 'Hands-on AI/ML workshop for beginners',
        date: '2026-01-30T09:00:00Z',
        endDate: '2026-01-30T17:00:00Z',
        venue: 'Computer Science Lab, Block A',
        fee: 499,
        capacity: 50,
        registeredCount: 48,
        organizerId: 'org_001',
        collegeId: 'XYZ Engineering College',
        status: EVENT_STATUS.UPCOMING,
        category: 'Workshop',
        image: '/events/ai_workshop.jpg',
        tags: ['AI', 'machine learning', 'workshop', 'hands-on'],
        createdAt: '2026-01-05T14:00:00Z',
    },
    {
        id: 'evt_004',
        title: 'Sports Meet 2026',
        description: 'Annual inter-college sports competition featuring cricket, football, basketball, athletics, and more. Represent your department and win exciting prizes!',
        shortDescription: 'Annual inter-college sports competition',
        date: '2026-03-01T07:00:00Z',
        endDate: '2026-03-05T18:00:00Z',
        venue: 'College Sports Ground',
        fee: 0,
        capacity: 2000,
        registeredCount: 890,
        organizerId: 'admin_001',
        collegeId: 'XYZ Engineering College',
        status: EVENT_STATUS.UPCOMING,
        category: 'Sports',
        image: '/events/sports_meet.jpg',
        tags: ['sports', 'cricket', 'football', 'athletics'],
        createdAt: '2026-01-08T10:00:00Z',
    },
];

// Mock Event Registrations
export const mockRegistrations = [
    {
        id: 'reg_001',
        userId: 'user_001',
        eventId: 'evt_001',
        registeredAt: '2026-01-15T10:30:00Z',
        paymentStatus: 'COMPLETED',
        ticketNumber: 'TF2026-0001',
        amount: 299,
    },
    {
        id: 'reg_002',
        userId: 'user_001',
        eventId: 'evt_003',
        registeredAt: '2026-01-20T14:00:00Z',
        paymentStatus: 'COMPLETED',
        ticketNumber: 'AIML2026-0023',
        amount: 499,
    },
    {
        id: 'reg_003',
        userId: 'user_002',
        eventId: 'evt_001',
        registeredAt: '2026-01-16T09:00:00Z',
        paymentStatus: 'COMPLETED',
        ticketNumber: 'TF2026-0002',
        amount: 299,
    },
    {
        id: 'reg_004',
        userId: 'user_002',
        eventId: 'evt_002',
        registeredAt: '2026-01-18T11:30:00Z',
        paymentStatus: 'COMPLETED',
        ticketNumber: 'CN2026-0045',
        amount: 149,
    },
];

// Get all users (combined)
export const getAllUsers = () => [...mockAdmins, ...mockOrganizers, ...mockUsers];

// Find user by email
export const findUserByEmail = (email) => {
    return getAllUsers().find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Find user by ID
export const findUserById = (id) => {
    return getAllUsers().find(user => user.id === id);
};

// Get organizers by college (for admin dashboard)
export const getOrganizersByCollege = (collegeName, state) => {
    return mockOrganizers.filter(org =>
        org.college.name.toLowerCase() === collegeName.toLowerCase() &&
        org.college.state.toLowerCase() === state.toLowerCase()
    );
};

// Get pending organizers for a college
export const getPendingOrganizers = (collegeName, state) => {
    return mockOrganizers.filter(org =>
        org.college.name.toLowerCase() === collegeName.toLowerCase() &&
        org.college.state.toLowerCase() === state.toLowerCase() &&
        org.status === USER_STATUS.ACTIVE && org.isAdminApproved === false
    );
};

// Get events by college
export const getEventsByCollege = (collegeName) => {
    return mockEvents.filter(event =>
        event.collegeId.toLowerCase() === collegeName.toLowerCase()
    );
};

// Get events by organizer
export const getEventsByOrganizer = (organizerId) => {
    return mockEvents.filter(event => event.organizerId === organizerId);
};

// Get user's registered events
export const getUserRegistrations = (userId) => {
    const registrations = mockRegistrations.filter(reg => reg.userId === userId);
    return registrations.map(reg => ({
        ...reg,
        event: mockEvents.find(evt => evt.id === reg.eventId),
    }));
};

// Get event registrations
export const getEventRegistrations = (eventId) => {
    const registrations = mockRegistrations.filter(reg => reg.eventId === eventId);
    return registrations.map(reg => ({
        ...reg,
        user: getAllUsers().find(u => u.id === reg.userId),
    }));
};

// Get dashboard stats for each role
export const getDashboardStats = (user) => {
    switch (user.role) {
        case ROLES.USER:
            const userRegs = getUserRegistrations(user.id);
            return {
                upcomingEvents: mockEvents.filter(e => e.status === EVENT_STATUS.UPCOMING).length,
                registeredEvents: userRegs.length,
                attendedEvents: userRegs.filter(r => {
                    const event = r.event;
                    return event && new Date(event.endDate) < new Date();
                }).length,
            };

        case ROLES.ORGANIZER:
            const orgEvents = getEventsByOrganizer(user.id);
            return {
                activeEvents: orgEvents.filter(e => e.status === EVENT_STATUS.UPCOMING).length,
                pendingEvents: 0,
                completedEvents: orgEvents.filter(e => e.status === EVENT_STATUS.COMPLETED).length,
                totalRegistrations: orgEvents.reduce((acc, e) => acc + e.registeredCount, 0),
            };

        case ROLES.ADMIN:
            const collegeOrganizers = getOrganizersByCollege(user.college.name, user.college.state);
            const pendingOrgs = getPendingOrganizers(user.college.name, user.college.state);
            const collegeEvents = getEventsByCollege(user.college.name);
            return {
                pendingApprovals: pendingOrgs.length,
                totalOrganizers: collegeOrganizers.length,
                activeEvents: collegeEvents.filter(e => e.status === EVENT_STATUS.UPCOMING).length,
                totalEvents: collegeEvents.length,
            };

        default:
            return {};
    }
};
