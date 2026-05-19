/**
 * Gallery Service
 * Handles all gallery API operations for public and admin
 * 
 * @typedef {Object} GalleryImage
 * @property {string} url
 * @property {string} caption
 * 
 * @typedef {Object} Gallery
 * @property {number} id
 * @property {string} title
 * @property {string} slug
 * @property {string} description
 * @property {string} category
 * @property {string} date
 * @property {string} location
 * @property {string} cover_image
 * @property {GalleryImage[]} images
 * @property {'active'|'inactive'} status
 * @property {string} created_at
 * @property {string} updated_at
 * 
 * @typedef {Object} GalleriesResponse
 * @property {boolean} success
 * @property {string} message
 * @property {Object} data
 * @property {Gallery[]} data.galleries
 * @property {Object} [data.pagination]
 * @property {number} [data.pagination.page]
 * @property {number} [data.pagination.limit]
 * @property {number} [data.pagination.total]
 * @property {number} [data.pagination.total_pages]
 * 
 * @typedef {Object} GalleryResponse
 * @property {boolean} success
 * @property {string} message
 * @property {Object} data
 * @property {Gallery} data.gallery
 */

import { apiClient } from '../lib/apiClient.js';

const galleryService = {
  // ============================================================
  // PUBLIC ROUTES (No Authentication Required)
  // ============================================================

  /**
   * Get all galleries with optional filtering
   * @param {Object} [params={}] - Query parameters
   * @param {string} [params.category] - Filter by category
   * @param {number} [params.page] - Page number
   * @param {number} [params.limit] - Items per page
   * @returns {Promise<GalleriesResponse>} Response with galleries
   */
  getGalleries: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    if (params.page) query.append('page', String(params.page));
    if (params.limit) query.append('limit', String(params.limit));

    const endpoint = query.toString() ? `/gallery?${query.toString()}` : '/gallery';
    return apiClient(endpoint, {
      requiresAuth: false,
    });
  },

  /**
   * Get featured galleries (latest)
   * @param {number} [limit=4] - Number of galleries to return
   * @returns {Promise<GalleriesResponse>} Response with featured galleries
   */
  getFeaturedGalleries: async (limit = 4) => {
    return apiClient(`/gallery/featured?limit=${limit}`, {
      requiresAuth: false,
    });
  },

  /**
   * Get all gallery categories
   * @returns {Promise<{success, data: {categories: string[]}}>} Response with categories
   */
  getCategories: async () => {
    return apiClient('/gallery/categories', {
      requiresAuth: false,
    });
  },

  /**
   * Get single gallery by ID or slug
   * @param {number|string} idOrSlug - Gallery ID or slug
   * @returns {Promise<GalleryResponse>} Response with single gallery
   */
  getGallery: async (idOrSlug) => {
    return apiClient(`/gallery/${idOrSlug}`, {
      requiresAuth: false,
    });
  },

  // ============================================================
  // ADMIN ROUTES (Requires Authentication)
  // ============================================================

  /**
   * Get all galleries (admin - includes inactive)
   * @param {Object} [params={}] - Query parameters
   * @param {string} [params.category] - Filter by category
   * @param {string} [params.status] - Filter by status (active, inactive)
   * @param {number} [params.page] - Page number
   * @param {number} [params.limit] - Items per page
   * @returns {Promise<GalleriesResponse>} Response with galleries
   */
  getAdminGalleries: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    if (params.status) query.append('status', params.status);
    if (params.page) query.append('page', String(params.page));
    if (params.limit) query.append('limit', String(params.limit));

    const endpoint = query.toString() ? `/admin/gallery?${query.toString()}` : '/admin/gallery';
    return apiClient(endpoint, {
      requiresAuth: true,
    });
  },

  /**
   * Get single gallery by ID (admin)
   * @param {number|string} id - Gallery ID
   * @returns {Promise<GalleryResponse>} Response with single gallery
   */
  getGalleryById: async (id) => {
    return apiClient(`/admin/gallery/${id}`, {
      requiresAuth: true,
    });
  },

  /**
   * Create new gallery (admin)
   * @param {Object|FormData} data - Gallery data with images
   * @param {string} data.title - Gallery title
   * @param {string} [data.description] - Gallery description
   * @param {string} data.category - Gallery category
   * @param {string} data.date - Gallery date (ISO format)
   * @param {string} data.location - Gallery location
   * @param {File} data.cover_image - Cover image file (FormData)
   * @param {File[]} [data.gallery_images] - Gallery image files (FormData)
   * @param {string[]} [data.gallery_captions] - Image captions (FormData)
   * @param {string} [data.status] - Gallery status (active, inactive)
   * @returns {Promise<GalleryResponse>} Response with created gallery
   */
  createGallery: async (data) => {
    const isFormData = data instanceof FormData;
    return apiClient('/admin/gallery', {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
      isFormData,
      requiresAuth: true,
    });
  },

  /**
   * Update gallery (admin)
   * @param {number|string} id - Gallery ID
   * @param {Object|FormData} data - Updated gallery data
   * @returns {Promise<GalleryResponse>} Response with updated gallery
   */
  updateGallery: async (id, data) => {
    const isFormData = data instanceof FormData;
    return apiClient(`/admin/gallery/${id}`, {
      method: 'PUT',
      body: isFormData ? data : JSON.stringify(data),
      isFormData,
      requiresAuth: true,
    });
  },

  /**
   * Delete gallery (admin)
   * @param {number|string} id - Gallery ID
   * @returns {Promise<{success, message}>} Success response
   */
  deleteGallery: async (id) => {
    return apiClient(`/admin/gallery/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },

  /**
   * Bulk update galleries (admin)
   * @param {number[]} ids - Array of gallery IDs
   * @param {Object} data - Data to update (status, category, etc)
   * @returns {Promise<{success, message, data: {count}}>} Number of updated galleries
   */
  bulkUpdateGalleries: async (ids, data) => {
    return apiClient('/admin/gallery/bulk/update', {
      method: 'POST',
      body: JSON.stringify({ ids, ...data }),
      requiresAuth: true,
    });
  },

  /**
   * Bulk delete galleries (admin)
   * @param {number[]} ids - Array of gallery IDs
   * @returns {Promise<{success, message, data: {count}}>} Number of deleted galleries
   */
  bulkDeleteGalleries: async (ids) => {
    return apiClient('/admin/gallery/bulk/delete', {
      method: 'POST',
      body: JSON.stringify({ ids }),
      requiresAuth: true,
    });
  },

  /**
   * Activate gallery (admin)
   * @param {number|string} id - Gallery ID
   * @returns {Promise<GalleryResponse>} Response with activated gallery
   */
  activateGallery: async (id) => {
    return apiClient(`/admin/gallery/${id}/activate`, {
      method: 'POST',
      requiresAuth: true,
    });
  },

  /**
   * Deactivate gallery (admin)
   * @param {number|string} id - Gallery ID
   * @returns {Promise<GalleryResponse>} Response with deactivated gallery
   */
  deactivateGallery: async (id) => {
    return apiClient(`/admin/gallery/${id}/deactivate`, {
      method: 'POST',
      requiresAuth: true,
    });
  },
};

export default galleryService;
