/**
 * Blog Service
 * Handles all blog post API operations for public and admin
 * 
 * @typedef {Object} BlogPost
 * @property {number} id
 * @property {string} title
 * @property {string} slug
 * @property {string} excerpt
 * @property {string} content
 * @property {string} image
 * @property {string} category
 * @property {string[]} tags
 * @property {'draft'|'published'} status
 * @property {string} published_at
 * @property {string} created_at
 * @property {string} updated_at
 * @property {number} views
 * @property {string} author
 * 
 * @typedef {Object} BlogResponse
 * @property {boolean} success
 * @property {string} message
 * @property {Object} data
 * @property {BlogPost[]} data.posts
 * @property {BlogPost} data.post
 * @property {Object} data.pagination
 * @property {number} data.pagination.page
 * @property {number} data.pagination.limit
 * @property {number} data.pagination.total
 * @property {number} data.pagination.total_pages
 */

import { apiClient } from '../lib/apiClient.js';

const blogService = {
  // ============================================================
  // PUBLIC ROUTES (No Authentication Required)
  // ============================================================

  /**
   * Get all blog posts with pagination
   * @param {number} [page=1] - Page number
   * @param {number} [limit=9] - Results per page
   * @returns {Promise<BlogResponse>} Response with paginated posts
   */
  getAllPosts: async (page = 1, limit = 9) => {
    return apiClient(`/blog?page=${page}&limit=${limit}`, {
      requiresAuth: false,
    });
  },

  /**
   * Get featured blog posts
   * @param {number} [limit=3] - Number of featured posts to return
   * @returns {Promise<BlogResponse>} Response with featured posts
   */
  getFeaturedPosts: async (limit = 3) => {
    return apiClient(`/blog/featured?limit=${limit}`, {
      requiresAuth: false,
    });
  },

  /**
   * Get all blog categories
   * @returns {Promise<{success, data: {categories: string[]}}>} Response with categories
   */
  getCategories: async () => {
    return apiClient('/blog/categories', {
      requiresAuth: false,
    });
  },

  /**
   * Get single blog post by slug
   * @param {string} slug - Post slug
   * @returns {Promise<BlogResponse>} Response with single post
   */
  getPostBySlug: async (slug) => {
    return apiClient(`/blog/${slug}`, {
      requiresAuth: false,
    });
  },

  // ============================================================
  // ADMIN ROUTES (Requires Authentication)
  // ============================================================

  /**
   * Get all blog posts (admin - includes drafts)
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @param {string} [status] - Filter by status (draft, published)
   * @returns {Promise<BlogResponse>} Response with posts
   */
  getAdminPosts: async (page = 1, limit = 10, status) => {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (status) query.append('status', status);

    return apiClient(`/admin/blog?${query.toString()}`, {
      requiresAuth: true,
    });
  },

  /**
   * Get single blog post by ID (admin)
   * @param {number|string} id - Post ID
   * @returns {Promise<BlogResponse>} Response with single post
   */
  getPostById: async (id) => {
    return apiClient(`/admin/blog/${id}`, {
      requiresAuth: true,
    });
  },

  /**
   * Create blog post (admin)
   * @param {Object|FormData} data - Post data
   * @param {string} data.title - Post title
   * @param {string} data.content - Post content (HTML)
   * @param {string} data.excerpt - Post excerpt
   * @param {string} data.category - Post category
   * @param {string[]} [data.tags] - Post tags
   * @param {string} [data.status] - Post status (draft, published)
   * @param {string} [data.author] - Post author
   * @param {File} [data.image] - Featured image (FormData)
   * @returns {Promise<BlogResponse>} Response with created post
   */
  createPost: async (data) => {
    const isFormData = data instanceof FormData;
    return apiClient('/admin/blog', {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
      isFormData,
      requiresAuth: true,
    });
  },

  /**
   * Update blog post (admin)
   * @param {number|string} id - Post ID
   * @param {Object|FormData} data - Updated post data
   * @returns {Promise<BlogResponse>} Response with updated post
   */
  updatePost: async (id, data) => {
    const isFormData = data instanceof FormData;
    return apiClient(`/admin/blog/${id}`, {
      method: 'PUT',
      body: isFormData ? data : JSON.stringify(data),
      isFormData,
      requiresAuth: true,
    });
  },

  /**
   * Delete blog post (admin)
   * @param {number|string} id - Post ID
   * @returns {Promise<{success, message}>} Success response
   */
  deletePost: async (id) => {
    return apiClient(`/admin/blog/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },

  /**
   * Bulk update blog posts (admin)
   * @param {number[]} ids - Array of post IDs
   * @param {Object} data - Data to update (status, category, etc)
   * @returns {Promise<{success, message, data: {count}}>} Number of updated posts
   */
  bulkUpdatePosts: async (ids, data) => {
    return apiClient('/admin/blog/bulk/update', {
      method: 'POST',
      body: JSON.stringify({ ids, ...data }),
      requiresAuth: true,
    });
  },

  /**
   * Bulk delete blog posts (admin)
   * @param {number[]} ids - Array of post IDs
   * @returns {Promise<{success, message, data: {count}}>} Number of deleted posts
   */
  bulkDeletePosts: async (ids) => {
    return apiClient('/admin/blog/bulk/delete', {
      method: 'POST',
      body: JSON.stringify({ ids }),
      requiresAuth: true,
    });
  },

  /**
   * Publish blog post (admin)
   * @param {number|string} id - Post ID
   * @returns {Promise<BlogResponse>} Response with published post
   */
  publishPost: async (id) => {
    return apiClient(`/admin/blog/${id}/publish`, {
      method: 'POST',
      requiresAuth: true,
    });
  },

  /**
   * Archive blog post (admin)
   * @param {number|string} id - Post ID
   * @returns {Promise<BlogResponse>} Response with archived post
   */
  archivePost: async (id) => {
    return apiClient(`/admin/blog/${id}/archive`, {
      method: 'POST',
      requiresAuth: true,
    });
  },
};

export default blogService;
