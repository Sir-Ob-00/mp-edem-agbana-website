/**
 * Announcements Service
 * Handles all announcement API operations for public and admin
 * 
 * @typedef {Object} Announcement
 * @property {number} id
 * @property {string} title
 * @property {string} slug
 * @property {string} content
 * @property {string} category
 * @property {'low'|'medium'|'high'|'urgent'} priority
 * @property {'draft'|'published'|'archived'} status
 * @property {string} [publish_date]
 * @property {string} [expiry_date]
 * @property {string} [image_url]
 * @property {string} created_at
 * @property {string} [updated_at]
 * @property {string} [published_at]
 * 
 * @typedef {Object} AnnouncementResponse
 * @property {boolean} success
 * @property {string} message
 * @property {Object} data
 * @property {Announcement[]} data.announcements
 * @property {Announcement} [data.announcement]
 * @property {Object} [data.pagination]
 * @property {number} data.pagination.page
 * @property {number} data.pagination.limit
 * @property {number} data.pagination.total
 * @property {number} data.pagination.total_pages
 */

import { apiClient } from '../lib/apiClient.js';

const announcementsService = {
  // ============================================================
  // PUBLIC ROUTES (No Authentication Required)
  // ============================================================

  /**
   * Get public announcements with optional filters
   * @param {Object} params - Query parameters
   * @param {string} [params.priority] - Filter by priority (urgent, high, medium, low)
   * @param {string} [params.category] - Filter by category
   * @param {number} [params.page] - Page number for pagination (default: 1)
   * @param {number} [params.limit] - Number of results per page (default: 20)
   * @returns {Promise<AnnouncementResponse>} Response with announcements array and pagination
   * @example
   * const response = await announcementsService.getPublicAnnouncements({
   *   priority: 'urgent',
   *   category: 'Infrastructure',
   *   page: 1,
   *   limit: 10
   * });
   */
  getPublicAnnouncements: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.priority) query.append('priority', params.priority);
    if (params.category) query.append('category', params.category);
    if (params.page) query.append('page', String(params.page));
    if (params.limit) query.append('limit', String(params.limit));

    return apiClient(`/announcements/public?${query.toString()}`, {
      requiresAuth: false,
    });
  },

  /**
   * Get single announcement by slug
   * @param {string} slug - Announcement slug
   * @returns {Promise<AnnouncementResponse>} Response with single announcement
   * @example
   * const response = await announcementsService.getAnnouncementBySlug('infrastructure-update-2024');
   */
  getAnnouncementBySlug: async (slug) => {
    return apiClient(`/announcements/${slug}`, {
      requiresAuth: false,
    });
  },

  /**
   * Get latest/featured announcements
   * @param {number} [limit] - Number of announcements to fetch (default: 5)
   * @returns {Promise<AnnouncementResponse>} Response with latest announcements
   * @example
   * const response = await announcementsService.getFeaturedAnnouncements(3);
   */
  getFeaturedAnnouncements: async (limit = 5) => {
    return apiClient(`/announcements/featured?limit=${limit}`, {
      requiresAuth: false,
    });
  },

  // ============================================================
  // ADMIN ROUTES (Requires Authentication & Admin Role)
  // ============================================================

  /**
   * Get all announcements (admin only) - includes drafts and archived
   * @param {Object} params - Query parameters for filtering
   * @param {string} [params.status] - Filter by status (draft, published, archived)
   * @param {string} [params.priority] - Filter by priority
   * @param {string} [params.category] - Filter by category
   * @param {number} [params.page] - Page number for pagination
   * @param {number} [params.limit] - Number of results per page
   * @returns {Promise<AnnouncementResponse>} Response with all announcements
   */
  getAdminAnnouncements: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.priority) query.append('priority', params.priority);
    if (params.category) query.append('category', params.category);
    if (params.page) query.append('page', String(params.page));
    if (params.limit) query.append('limit', String(params.limit));

    return apiClient(`/admin/announcements?${query.toString()}`, {
      requiresAuth: true,
    });
  },

  /**
   * Get single announcement by ID (admin only)
   * @param {number|string} id - Announcement ID
   * @returns {Promise<AnnouncementResponse>} Response with single announcement
   */
  getAnnouncementById: async (id) => {
    return apiClient(`/admin/announcements/${id}`, {
      requiresAuth: true,
    });
  },

  /**
   * Create new announcement (admin only)
   * @param {Object|FormData} data - Announcement data
   * @param {string} data.title - Announcement title
   * @param {string} data.content - Announcement content (HTML supported)
   * @param {string} data.category - Announcement category
   * @param {'low'|'medium'|'high'|'urgent'} data.priority - Priority level
   * @param {'draft'|'published'|'archived'} data.status - Publication status
   * @param {string} [data.publish_date] - When to publish (ISO 8601 format)
   * @param {string} [data.expiry_date] - When announcement expires
   * @param {File} [data.image] - Featured image (if using FormData)
   * @returns {Promise<AnnouncementResponse>} Response with created announcement
   * @example
   * // JSON request
   * const response = await announcementsService.createAnnouncement({
   *   title: 'Infrastructure Update',
   *   content: '<p>New bridge opening...</p>',
   *   category: 'Infrastructure',
   *   priority: 'high',
   *   status: 'published'
   * });
   * 
   * // FormData with image
   * const formData = new FormData();
   * formData.append('title', 'Infrastructure Update');
   * formData.append('content', '<p>New bridge opening...</p>');
   * formData.append('image', imageFile);
   * formData.append('priority', 'high');
   * const response = await announcementsService.createAnnouncement(formData);
   */
  createAnnouncement: async (data) => {
    const isFormData = data instanceof FormData;
    return apiClient('/admin/announcements', {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
      isFormData,
      requiresAuth: true,
    });
  },

  /**
   * Update existing announcement (admin only)
   * @param {number|string} id - Announcement ID
   * @param {Object|FormData} data - Updated announcement data (same structure as create)
   * @returns {Promise<AnnouncementResponse>} Response with updated announcement
   */
  updateAnnouncement: async (id, data) => {
    const isFormData = data instanceof FormData;
    return apiClient(`/admin/announcements/${id}`, {
      method: 'PUT',
      body: isFormData ? data : JSON.stringify(data),
      isFormData,
      requiresAuth: true,
    });
  },

  /**
   * Delete announcement (admin only)
   * @param {number|string} id - Announcement ID
   * @returns {Promise<Object>} Success response
   */
  deleteAnnouncement: async (id) => {
    return apiClient(`/admin/announcements/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },

  /**
   * Publish announcement (change status to published)
   * @param {number|string} id - Announcement ID
   * @returns {Promise<AnnouncementResponse>} Response with updated announcement
   */
  publishAnnouncement: async (id) => {
    return apiClient(`/admin/announcements/${id}/publish`, {
      method: 'POST',
      requiresAuth: true,
    });
  },

  /**
   * Archive announcement (change status to archived)
   * @param {number|string} id - Announcement ID
   * @returns {Promise<AnnouncementResponse>} Response with updated announcement
   */
  archiveAnnouncement: async (id) => {
    return apiClient(`/admin/announcements/${id}/archive`, {
      method: 'POST',
      requiresAuth: true,
    });
  },

  /**
   * Bulk update announcements
   * @param {number[]} ids - Array of announcement IDs
   * @param {Object} updates - Fields to update (status, priority, etc.)
   * @returns {Promise<Object>} Response with update count
   */
  bulkUpdateAnnouncements: async (ids, updates) => {
    return apiClient('/admin/announcements/bulk/update', {
      method: 'POST',
      body: JSON.stringify({ ids, ...updates }),
      requiresAuth: true,
    });
  },

  /**
   * Bulk delete announcements
   * @param {number[]} ids - Array of announcement IDs
   * @returns {Promise<Object>} Response with delete count
   */
  bulkDeleteAnnouncements: async (ids) => {
    return apiClient('/admin/announcements/bulk/delete', {
      method: 'POST',
      body: JSON.stringify({ ids }),
      requiresAuth: true,
    });
  },
};

export default announcementsService;
