import { FILE_UPLOAD, ROLES } from './constants';

// Email validation
export const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return null;
};

// Password validation
export const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    return null;
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (password !== confirmPassword) return 'Passwords do not match';
    return null;
};

// Full name validation
export const validateFullName = (name) => {
    if (!name) return 'Full name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    if (name.trim().length > 100) return 'Name must be less than 100 characters';
    if (!/^[a-zA-Z\s.'-]+$/.test(name)) return 'Name can only contain letters, spaces, and basic punctuation';
    return null;
};

// College name validation
export const validateCollegeName = (name) => {
    if (!name) return 'College name is required';
    if (name.trim().length < 5) return 'College name must be at least 5 characters';
    if (name.trim().length > 200) return 'College name must be less than 200 characters';
    return null;
};

// State validation
export const validateState = (state) => {
    if (!state) return 'Please select a state';
    return null;
};

// Pincode validation (Indian 6-digit)
export const validatePincode = (pincode) => {
    if (!pincode) return 'Pincode is required';
    if (!/^\d{6}$/.test(pincode)) return 'Pincode must be exactly 6 digits';
    return null;
};

// Position validation (only required for Admin role)
export const validatePosition = (position, role) => {
    if (role === ROLES.ORGANIZER) return null; // Position not required for organizers
    if (!position) return 'Please select your position';
    return null;
};

// File validation for ID card upload
export const validateIdCardFile = (file) => {
    if (!file) return 'College ID card image is required';

    // Check file type
    if (!FILE_UPLOAD.ALLOWED_TYPES.includes(file.type)) {
        return `Only ${FILE_UPLOAD.ALLOWED_EXTENSIONS.join(', ')} files are allowed`;
    }

    // Check file size
    if (file.size < FILE_UPLOAD.MIN_SIZE_BYTES) {
        return `File size must be at least ${FILE_UPLOAD.MIN_SIZE_MB}MB`;
    }

    if (file.size > FILE_UPLOAD.MAX_SIZE_BYTES) {
        return `File size must not exceed ${FILE_UPLOAD.MAX_SIZE_MB}MB`;
    }

    return null;
};

// Get file size in readable format
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Validate Step 1 (Basic Info)
export const validateStep1 = (formData) => {
    const errors = {};

    const fullNameError = validateFullName(formData.fullName);
    if (fullNameError) errors.fullName = fullNameError;

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    return errors;
};

// Validate Step 2 (Password & Role)
export const validateStep2 = (formData) => {
    const errors = {};

    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

    if (!formData.role) errors.role = 'Please select an account type';

    if (!formData.agreedToTerms) errors.terms = 'You must agree to the terms and conditions';

    return errors;
};

// Validate Step 3 (College Verification - Admin/Organizer only)
export const validateStep3 = (formData) => {
    const errors = {};

    const collegeNameError = validateCollegeName(formData.collegeName);
    if (collegeNameError) errors.collegeName = collegeNameError;

    const stateError = validateState(formData.collegeState);
    if (stateError) errors.collegeState = stateError;

    const pincodeError = validatePincode(formData.pincode);
    if (pincodeError) errors.pincode = pincodeError;

    // Only validate position for Admin role (organizers don't have position selection)
    if (formData.role === ROLES.ADMIN) {
        const positionError = validatePosition(formData.position, formData.role);
        if (positionError) errors.position = positionError;
    }

    const idCardError = validateIdCardFile(formData.idCardFile);
    if (idCardError) errors.idCardFile = idCardError;

    return errors;
};

// Full form validation
export const validateFullForm = (formData, includeCollegeVerification = false) => {
    let errors = {
        ...validateStep1(formData),
        ...validateStep2(formData),
    };

    if (includeCollegeVerification) {
        errors = { ...errors, ...validateStep3(formData) };
    }

    return errors;
};
