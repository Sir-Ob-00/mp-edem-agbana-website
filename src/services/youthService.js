/**
 * Youth Service
 * Handles youth registration and employment tracking API operations
 */

import { apiClient } from '../lib/apiClient.js';

const youthService = {
  /**
   * Submit youth registration
   * @param {Object} payload - Youth data (personal, education, experience, skills)
   * @returns {Promise<Object>} Response with registration confirmation
   */
  submitYouthRegistration: async (payload) => {
    return apiClient('/youth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
      requiresAuth: false,
    });
  },

  /**
   * Get youth profile (requires auth)
   * @returns {Promise<Object>} Response with authenticated user's youth profile
   */
  getProfile: async () => {
    return apiClient('/youth/profile', {
      requiresAuth: true,
    });
  },

  /**
   * Update youth profile (requires auth)
   * @param {Object|FormData} data - Updated youth profile data
   * @returns {Promise<Object>} Response with updated profile
   */
  updateProfile: async (data) => {
    const isFormData = data instanceof FormData;
    return apiClient('/youth/profile', {
      method: 'PUT',
      body: isFormData ? data : JSON.stringify(data),
      isFormData,
      requiresAuth: true,
    });
  },

  /**
   * Get youth statistics - Admin only
   * @returns {Promise<Object>} Response with youth registration stats
   */
  getStatistics: async () => {
    return apiClient('/admin/youth/statistics', {
      requiresAuth: true,
    });
  },

  /**
   * Get all youth registrations - Admin only
   * @param {Object} params - Query parameters (page, limit, status)
   * @returns {Promise<Object>} Response with paginated youth records
   */
  getAllRegistrations: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', String(params.page));
    if (params.limit) query.append('limit', String(params.limit));
    if (params.status) query.append('status', params.status);

    return apiClient(`/admin/youth?${query.toString()}`, {
      requiresAuth: true,
    });
  },
};

export default youthService;
