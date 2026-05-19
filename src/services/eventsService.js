/**
 * Events Service
 * Handles all event API operations
 */

import { apiClient } from '../lib/apiClient.js';

const eventsService = {
  /**
   * Get all events with pagination
   * @param {number} page - Page number (default: 1)
   * @param {number} limit - Results per page (default: 20)
   * @returns {Promise<Object>} Response with paginated events
   */
  getAllEvents: async (page = 1, limit = 20) => {
    return apiClient(`/events?page=${page}&limit=${limit}`, {
      requiresAuth: false,
    });
  },

  /**
   * Get upcoming events
   * @param {number} limit - Number of upcoming events (default: 5)
   * @returns {Promise<Object>} Response with upcoming events
   */
  getUpcomingEvents: async (limit = 5) => {
    return apiClient(`/events/upcoming?limit=${limit}`, {
      requiresAuth: false,
    });
  },

  /**
   * Get single event by slug
   * @param {string} slug - Event slug
   * @returns {Promise<Object>} Response with single event
   */
  getEventBySlug: async (slug) => {
    return apiClient(`/events/${slug}`, {
      requiresAuth: false,
    });
  },

  /**
   * Create event - Admin only
   * @param {Object|FormData} data - Event data
   * @returns {Promise<Object>} Response with created event
   */
  createEvent: async (data) => {
    const isFormData = data instanceof FormData;
    return apiClient('/admin/events', {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
      isFormData,
      requiresAuth: true,
    });
  },

  /**
   * Update event - Admin only
   * @param {number|string} id - Event ID or slug
   * @param {Object|FormData} data - Updated event data
   * @returns {Promise<Object>} Response with updated event
   */
  updateEvent: async (id, data) => {
    const isFormData = data instanceof FormData;
    return apiClient(`/admin/events/${id}`, {
      method: 'PUT',
      body: isFormData ? data : JSON.stringify(data),
      isFormData,
      requiresAuth: true,
    });
  },

  /**
   * Delete event - Admin only
   * @param {number|string} id - Event ID or slug
   * @returns {Promise<Object>} Success response
   */
  deleteEvent: async (id) => {
    return apiClient(`/admin/events/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },
};

export default eventsService;
