import { ROLES, ROUTES, USER_STATUS } from './constants';

// Role-based permissions configuration
export const rolePermissions = {
    [ROLES.USER]: {
        canBrowseEvents: true,
        canRegisterForEvents: true,
        canViewRegisteredEvents: true,
        canCreateEvents: false,
        canManageEvents: false,
        canApproveOrganizers: false,
        canViewOrganizers: false,
        canManageCollegeDetails: false,
        requiresPlatformVerification: false,
        requiresAdminApprovalForEvents: false,
    },
    [ROLES.ORGANIZER]: {
        canBrowseEvents: true,
        canRegisterForEvents: true,
        canViewRegisteredEvents: true,
        canCreateEvents: true,        // Only after admin approval
        canManageEvents: true,        // Own events only
        canApproveOrganizers: false,
        canViewOrganizers: false,
        canManageCollegeDetails: false,
        requiresPlatformVerification: false,  // No platform verification for organizer
        requiresAdminApprovalForEvents: true, // Needs admin approval to create events
    },
    [ROLES.ADMIN]: {
        canBrowseEvents: true,
        canRegisterForEvents: true,
        canViewRegisteredEvents: true,
        canCreateEvents: true,
        canManageEvents: true,        // All events in college
        canApproveOrganizers: true,
        canViewOrganizers: true,
        canManageCollegeDetails: true,
        requiresPlatformVerification: true,   // Admin needs platform verification
        requiresAdminApprovalForEvents: false,
    },
};

// Get dashboard route based on role
export const getDashboardRoute = (role) => {
    switch (role) {
        case ROLES.ADMIN:
            return ROUTES.DASHBOARD.ADMIN;
        case ROLES.ORGANIZER:
            return ROUTES.DASHBOARD.ORGANIZER;
        case ROLES.USER:
        default:
            return ROUTES.DASHBOARD.USER;
    }
};

// Check if user can access a specific feature
export const canAccess = (role, feature) => {
    const permissions = rolePermissions[role];
    if (!permissions) return false;
    return permissions[feature] === true;
};

// Check if user requires additional verification
export const getRequiredVerifications = (role) => {
    const permissions = rolePermissions[role];
    if (!permissions) return [];

    const verifications = [];
    if (permissions.requiresPlatformVerification) verifications.push('platform');
    if (permissions.requiresAdminApprovalForEvents) verifications.push('adminApprovalForEvents');

    return verifications;
};

// Check if user account is fully verified
export const isAccountFullyVerified = (user) => {
    if (!user) return false;
    
    // If user is explicitly rejected or suspended, they aren't verified
    if (user.status === USER_STATUS.REJECTED || user.status === USER_STATUS.SUSPENDED) return false;
    
    return user.status === USER_STATUS.ACTIVE || 
           user.status === 'APPROVED' || 
           user.isApproved === true || 
           user.isAdminApproved === true;
};

// Check if user should be redirected to the blocking verification page
// Only Admins usually require this full-page platform verification blocker
export const isBlockingVerificationRequired = (user) => {
    if (!user) return false;
    
    const permissions = rolePermissions[user.role];
    
    // If the role doesn't require platform verification (like STUDENT or ORGANIZER),
    // then they shouldn't be blocked by the full-page verification screen.
    if (!permissions?.requiresPlatformVerification) return false;
    
    // If they ARE an admin (requires platform verification), check if they are verified
    return !isAccountFullyVerified(user);
};

// Check if organizer can create events
export const canOrganizerCreateEvents = (user) => {
    if (!user) return false;
    if (user.role !== ROLES.ORGANIZER) return false;
    if (user.status !== USER_STATUS.ACTIVE) return false;
    return user.isAdminApproved === true;
};

// Get user's pending verification step
export const getPendingVerificationStep = (user) => {
    if (!user) return null;

    switch (user.status) {
        case USER_STATUS.PENDING_PLATFORM_VERIFICATION:
            return 'platform';
        case USER_STATUS.REJECTED:
            return 'rejected';
        default:
            return null;
    }
};

// Get status message for user
export const getStatusMessage = (status, user = null) => {
    switch (status) {
        case USER_STATUS.PENDING_PLATFORM_VERIFICATION:
            return {
                title: 'Platform Verification Pending',
                message: 'Your account is under review by our platform team. This usually takes 24-48 hours.',
                type: 'info',
            };
        case USER_STATUS.REJECTED:
            return {
                title: 'Account Rejected',
                message: 'Unfortunately, your account verification was not approved. Please contact support.',
                type: 'error',
            };
        case USER_STATUS.SUSPENDED:
            return {
                title: 'Account Suspended',
                message: 'Your account has been suspended. Please contact support for assistance.',
                type: 'error',
            };
        case USER_STATUS.ACTIVE:
            // Check if organizer needs admin approval for events
            if (user?.role === ROLES.ORGANIZER && !user?.isAdminApproved) {
                return {
                    title: 'Awaiting Event Creation Approval',
                    message: 'Your account is active! However, you need college admin approval to create events.',
                    type: 'warning',
                };
            }
            return {
                title: 'Account Active',
                message: 'Your account is active and fully verified.',
                type: 'success',
            };
        default:
            return null;
    }
};

// Check if organizer belongs to same college as admin
export const isSameCollege = (user1, user2) => {
    if (!user1?.college || !user2?.college) return false;

    const normalize = (str) => str?.toLowerCase().trim();

    return (
        normalize(user1.college.name) === normalize(user2.college.name) &&
        normalize(user1.college.state) === normalize(user2.college.state)
    );
};

// Route protection configuration
export const protectedRoutes = {
    [ROUTES.DASHBOARD.USER]: {
        allowedRoles: [ROLES.USER, ROLES.ORGANIZER, ROLES.ADMIN],
        requiresAuth: true,
        requiresActiveStatus: false, // Can show pending status page
    },
    [ROUTES.DASHBOARD.ORGANIZER]: {
        allowedRoles: [ROLES.ORGANIZER],
        requiresAuth: true,
        requiresActiveStatus: false,
    },
    [ROUTES.DASHBOARD.ADMIN]: {
        allowedRoles: [ROLES.ADMIN],
        requiresAuth: true,
        requiresActiveStatus: true,
    },
    [ROUTES.CREATE_EVENT]: {
        allowedRoles: [ROLES.ORGANIZER, ROLES.ADMIN],
        requiresAuth: true,
        requiresActiveStatus: true,
        customCheck: (user) => {
            if (user.role === ROLES.ORGANIZER) {
                return canOrganizerCreateEvents(user);
            }
            return true;
        },
    },
};

// Check if user can access route
export const canAccessRoute = (user, route) => {
    const config = protectedRoutes[route];

    if (!config) return true; // Unprotected route

    if (config.requiresAuth && !user) return false;

    if (!config.allowedRoles.includes(user.role)) return false;

    if (config.requiresActiveStatus && user.status !== USER_STATUS.ACTIVE) return false;

    if (config.customCheck && !config.customCheck(user)) return false;

    return true;
};
