/**
 * Validation utilities for form inputs
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates if a username is URL-safe and meets requirements
 * Requirements:
 * - Only alphanumeric, periods, underscores, and hyphens
 * - Cannot start or end with special characters
 * - Must be 3-30 characters long
 */
export function validateUsername(username: string): ValidationResult {
  // Check length
  if (username.length < 3) {
    return {
      isValid: false,
      error: 'Username must be at least 3 characters long.',
    };
  }

  if (username.length > 30) {
    return {
      isValid: false,
      error: 'Username cannot be longer than 30 characters.',
    };
  }

  // Only allow URL-safe characters: alphanumeric, hyphens, underscores, and periods
  const urlSafePattern = /^[a-zA-Z0-9._-]+$/;
  if (!urlSafePattern.test(username)) {
    return {
      isValid: false,
      error: 'Username can only contain letters, numbers, hyphens, underscores, and periods.',
    };
  }

  // Prevent usernames starting or ending with special characters
  if (/^[._-]|[._-]$/.test(username)) {
    return {
      isValid: false,
      error: 'Username cannot start or end with a period, hyphen, or underscore.',
    };
  }

  return { isValid: true };
}

/**
 * Pattern for URL-safe usernames (for HTML5 input pattern attribute)
 */
export const USERNAME_PATTERN = '[a-zA-Z0-9._-]+';

/**
 * Username constraints
 */
export const USERNAME_CONSTRAINTS = {
  minLength: 3,
  maxLength: 30,
  pattern: USERNAME_PATTERN,
  helperText: '3-30 characters. Letters, numbers, and ._- only.',
} as const;