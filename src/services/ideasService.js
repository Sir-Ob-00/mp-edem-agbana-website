/**
 * Ideas Service
 * Handles all idea API operations
 */

import { apiClient } from '../lib/apiClient.js';

const ideasService = {
  /**
   * Get all public ideas with pagination
   * @param {number} page - Page number (default: 1)
   * @param {number} limit - Results per page (default: 50)
   * @returns {Promise<Object>} Response with paginated ideas
   */
  getPublicIdeas: async (page = 1, limit = 50) => {
    return apiClient(`/ideas/public?page=${page}&limit=${limit}`, {
      requiresAuth: false,
    });
  },

  /**
   * Submit new idea
   * @param {Object} payload - Idea data (title, description, category, etc.)
   * @returns {Promise<Object>} Response with created idea
   */
  submitIdea: async (payload) => {
    return apiClient('/ideas', {
      method: 'POST',
      body: JSON.stringify(payload),
      requiresAuth: false,
    });
  },

  /**
   * Vote on an idea
   * @param {number|string} id - Idea ID
   * @param {string} voteType - Vote type: 'up' or 'down' (default: 'up')
   * @returns {Promise<Object>} Response with updated idea
   */
  voteIdea: async (id, voteType = 'up') => {
    return apiClient(`/ideas/${id}/vote`, {
      method: 'POST',
      body: JSON.stringify({ type: voteType }),
      requiresAuth: false,
    });
  },

  /**
   * Get idea by ID
   * @param {number|string} id - Idea ID
   * @returns {Promise<Object>} Response with single idea
   */
  getIdeaById: async (id) => {
    return apiClient(`/ideas/${id}`, {
      requiresAuth: false,
    });
  },

  /**
   * Delete idea - Admin only or own idea
   * @param {number|string} id - Idea ID
   * @returns {Promise<Object>} Success response
   */
  deleteIdea: async (id) => {
    return apiClient(`/ideas/${id}`, {
      method: 'DELETE',
      requiresAuth: false,
    });
  },
};

export default ideasService;
