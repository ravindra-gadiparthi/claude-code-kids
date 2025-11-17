/**
 * Input sanitization utilities for security and data integrity
 */

/**
 * Sanitize user name input to prevent XSS and ensure clean data
 * - Removes HTML tags and special characters
 * - Trims whitespace
 * - Limits length
 * - Allows only alphanumeric, spaces, hyphens, apostrophes
 */
export function sanitizeName(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove any HTML tags
  let cleaned = input.replace(/<[^>]*>/g, '');

  // Remove any script-like content
  cleaned = cleaned.replace(/javascript:/gi, '');
  cleaned = cleaned.replace(/on\w+=/gi, '');

  // Allow only letters, numbers, spaces, hyphens, and apostrophes
  // This supports names like "Mary-Jane" or "O'Brien"
  cleaned = cleaned.replace(/[^a-zA-Z0-9\s'-]/g, '');

  // Trim whitespace
  cleaned = cleaned.trim();

  // Replace multiple spaces with single space
  cleaned = cleaned.replace(/\s+/g, ' ');

  // Limit length (max 20 characters)
  cleaned = cleaned.slice(0, 20);

  return cleaned;
}

/**
 * Validate name meets requirements
 */
export function isValidName(name: string): boolean {
  const sanitized = sanitizeName(name);

  // Must have at least 2 characters
  if (sanitized.length < 2) {
    return false;
  }

  // Must contain at least one letter
  if (!/[a-zA-Z]/.test(sanitized)) {
    return false;
  }

  return true;
}

/**
 * Validate and parse data from localStorage
 * Returns null if data is invalid or corrupted
 */
export function safeParseJSON<T>(jsonString: string | null): T | null {
  if (!jsonString) {
    return null;
  }

  try {
    const parsed = JSON.parse(jsonString);
    return parsed as T;
  } catch (error) {
    console.warn('Failed to parse JSON from localStorage:', error);
    return null;
  }
}

/**
 * Safely store data in localStorage with error handling
 */
export function safeSetLocalStorage(key: string, value: any): boolean {
  try {
    const jsonString = JSON.stringify(value);
    localStorage.setItem(key, jsonString);
    return true;
  } catch (error) {
    // localStorage quota exceeded or disabled
    console.error('Failed to save to localStorage:', error);

    if (error instanceof Error && error.name === 'QuotaExceededError') {
      // Attempt to clear old data
      try {
        const keys = Object.keys(localStorage);
        // Remove oldest entries (this is a simple strategy)
        if (keys.length > 0) {
          localStorage.removeItem(keys[0]);
          // Try again
          localStorage.setItem(key, jsonString);
          return true;
        }
      } catch (retryError) {
        console.error('Failed to free up localStorage space:', retryError);
      }
    }

    return false;
  }
}

/**
 * Safely get data from localStorage with error handling
 */
export function safeGetLocalStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return safeParseJSON<T>(item);
  } catch (error) {
    console.error('Failed to read from localStorage:', error);
    return null;
  }
}

/**
 * Check if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Escape HTML to prevent XSS when displaying user content
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
