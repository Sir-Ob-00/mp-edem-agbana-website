/**
 * Universal API Client for React (Vite)
 * Handles authentication, FormData, error handling, and development logging
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://app.kofibenteh..com/v1';

/**
 * Configure API client (e.g., after login to set token)
 */
export function setAuthToken(token) {
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }
}

/**
 * Get stored auth token from localStorage
 */
export function getAuthToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
}

/**
 * Main API client function
 * @param {string} endpoint - API endpoint (e.g., '/hero-slides')
 * @param {Object} options - Fetch options with custom properties
 * @param {boolean} options.requiresAuth - Whether auth token is required (default: true)
 * @param {boolean} options.isFormData - Whether body is FormData (default: auto-detect)
 * @returns {Promise<any>} Parsed JSON response
 */
export async function apiClient(endpoint, options = {}) {
  const {
    requiresAuth = false,
    isFormData = false,
    ...fetchOptions
  } = options;

  if (!BASE_URL) {
    throw new Error(
      'VITE_API_URL is not defined in environment variables. ' +
      'Please add VITE_API_URL to your .env file.'
    );
  }

  const headers = new Headers(fetchOptions.headers || {});
  const method = (fetchOptions.method || 'GET').toUpperCase();
  const hasBody = ['POST', 'PUT', 'PATCH'].includes(method);

  // Set Content-Type only for non-FormData requests with body
  if (hasBody && !isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Add auth token if required
  if (requiresAuth) {
    const token = getAuthToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const url = `${BASE_URL}${endpoint}`;

  // Development logging
  if (import.meta.env.DEV) {
    try {
      const headersObj = {};
      headers.forEach((value, key) => {
        headersObj[key] = key === 'Authorization' ? '[REDACTED]' : value;
      });
      console.debug('[API Request]', { method, url, headers: headersObj });
    } catch (e) {
      // Ignore logging errors
    }
  }

  let response;
  try {
    response = await fetch(url, {
      ...fetchOptions,
      method,
      headers,
    });
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error(`[API Network Error] ${method} ${url}`, error);
    }
    throw new Error(
      `Network error: Failed to connect to API at ${url}`
    );
  }

  // Try to parse response as JSON
  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error(`HTTP ${response.status}: Failed to parse response as JSON`);
  }

  // Handle errors
  if (!response.ok) {
    // Handle 401 Unauthorized - clear token and optionally redirect
    if (response.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      // Optional: redirect to login if not already there
      if (!window.location.pathname.includes('/login')) {
        // You can uncomment this if you have a login page
        // window.location.href = '/login?expired=true';
      }
    }

    if (import.meta.env.DEV) {
      console.warn('[API Error]', response.status, endpoint, data?.message || data?.error || '');
    }

    const errorMessage = data?.message || data?.error || `HTTP ${response.status}: An error occurred`;
    throw new Error(errorMessage);
  }

  return data;
}

export default apiClient;
