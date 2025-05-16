// src/utils/validators.js
/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Whether the email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with strength and messages
 */
export const validatePassword = (password) => {
  const result = {
    isValid: false,
    strength: 'weak',
    messages: [],
  };
  
  if (!password || password.length < 8) {
    result.messages.push('Password must be at least 8 characters long');
    return result;
  }
  
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  if (!hasUppercase) {
    result.messages.push('Password should include at least one uppercase letter');
  }
  
  if (!hasLowercase) {
    result.messages.push('Password should include at least one lowercase letter');
  }
  
  if (!hasNumbers) {
    result.messages.push('Password should include at least one number');
  }
  
  if (!hasSpecialChars) {
    result.messages.push('Password should include at least one special character');
  }
  
  // Calculate strength
  const strength = [hasUppercase, hasLowercase, hasNumbers, hasSpecialChars].filter(Boolean).length;
  
  if (strength === 4 && password.length >= 10) {
    result.strength = 'strong';
    result.isValid = true;
  } else if (strength >= 3) {
    result.strength = 'medium';
    result.isValid = true;
  }
  
  return result;
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} Whether the URL is valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Check if a value is empty (null, undefined, empty string, or empty array/object)
 * @param {*} value - Value to check
 * @returns {boolean} Whether the value is empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) {
    return true;
  }
  
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  
  return false;
};

/**
 * Validate phone number format (basic validation)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Whether the phone number is valid
 */
export const isValidPhone = (phone) => {
  // Basic validation - at least 10 digits
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 10;
};