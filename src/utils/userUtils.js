/**
 * User data utilities for normalization and mapping.
 * Shared between Redux slices and dashboard components.
 */

import { ROLES, USER_STATUS } from './constants';

/**
 * Normalizes raw user data from backend variations to the frontend expected format.
 * Expects the Redux/UI format: { fullName, email, role, status, college: { name, state, pincode }, position }
 */
export const normalizeUser = (user, fallbackCollege = null) => {
    if (!user) return null;
    
    // 1. Basic properties
    const normalized = { ...user };
    
    // Map basic identity fields
    normalized.id = normalized.id || normalized._id || normalized.userId;
    normalized.fullName = normalized.fullName || normalized.name || 'User';
    normalized.email = normalized.email || normalized.userEmail || '';
    
    // 2. Map Role
    const roleMap = {
        'STUDENT': ROLES.USER,
        'ADMIN': ROLES.ADMIN,
        'ORGANIZER': ROLES.ORGANIZER,
        'USER': ROLES.USER
    };
    
    if (roleMap[normalized.role]) {
        normalized.role = roleMap[normalized.role];
    } else if (!Object.values(ROLES).includes(normalized.role)) {
        normalized.role = ROLES.USER;
    }

    // 3. Map Status
    const isActive = 
        normalized.status === 'ACTIVE' || 
        normalized.status === 'APPROVED' || 
        normalized.isApproved === true ||
        normalized.isAdminApproved === true;

    if (isActive) {
        normalized.status = USER_STATUS.ACTIVE;
    } else if (!normalized.status) {
        normalized.status = normalized.role === ROLES.ORGANIZER 
            ? USER_STATUS.PENDING_ADMIN_APPROVAL 
            : USER_STATUS.ACTIVE;
    }

    // 4. Map ID Card and Approval Flags
    normalized.isAdminApproved = normalized.isAdminApproved || (normalized.role === ROLES.ORGANIZER && normalized.status === USER_STATUS.ACTIVE);
    normalized.idCardUrl = normalized.idCardUrl || normalized.id_card || normalized.documentUrl;

    // 5. Position & Designation
    normalized.position = normalized.position || normalized.designation || normalized.role_detail || normalized.department || '';

    // 6. Map College/Institution Object (The Most Critical Mapping)
    // Preference: 1. Existing college object, 2. Root collegeName/state/pinCode, 3. Fallback college
    
    const existingCollege = normalized.college || {};
    
    const collegeName = normalized.collegeName || normalized.institution || normalized.college_name || existingCollege.name || (fallbackCollege && fallbackCollege.name) || '';
    const collegeState = normalized.state || normalized.college_state || normalized.province || existingCollege.state || (fallbackCollege && fallbackCollege.state) || '';
    const collegePincode = normalized.pinCode || normalized.pincode || normalized.zip_code || existingCollege.pincode || existingCollege.pinCode || (fallbackCollege && (fallbackCollege.pincode || fallbackCollege.pinCode)) || '';

    normalized.college = {
        name: collegeName,
        state: collegeState,
        pincode: collegePincode
    };

    return normalized;
};
