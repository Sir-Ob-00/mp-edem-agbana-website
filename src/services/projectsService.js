/**
 * Projects Service
 * Handles all development projects API operations
 * 
 * @typedef {Object} Project
 * @property {number} id
 * @property {string} title
 * @property {string} slug
 * @property {string} description
 * @property {string} location
 * @property {'planning'|'ongoing'|'completed'|'on_hold'} status
 * @property {number} progress_percent
 * @property {number} budget
 * @property {number} spent
 * @property {string} start_date
 * @property {string} end_date
 * @property {Object} sector
 * @property {number} sector.id
 * @property {string} sector.name
 * @property {string} contractor
 * @property {string} contact_person
 * @property {string} contact_phone
 * @property {boolean} is_featured
 * @property {string} image
 * @property {string[]} gallery
 * @property {string} created_at
 * @property {string} updated_at
 * 
 * @typedef {Object} ProjectResponse
 * @property {boolean} success
 * @property {string} message
 * @property {Object} data
 * @property {Project[]} data.projects
 * @property {Project} data.project
 * @property {Object} data.pagination
 * @property {number} data.pagination.page
 * @property {number} data.pagination.limit
 * @property {number} data.pagination.total
 * @property {number} data.pagination.total_pages
 * 
 * @typedef {Object} ProjectStatistics
 * @property {number} total
 * @property {number} ongoing
 * @property {number} completed
 * @property {number} planning
 * @property {Array} by_sector
 */

import { apiClient } from '../lib/apiClient.js';

const projectsService = {
  // ============================================================
  // PUBLIC ROUTES (No Authentication Required)
  // ============================================================

  /**
   * Get public projects with pagination and filtering
   * @param {Object} params - Query parameters
   * @param {string} [params.status] - Filter by status (ongoing, completed, planning, on_hold)
   * @param {number} [params.sector] - Filter by sector ID
   * @param {number} [params.page] - Page number (default: 1)
   * @param {number} [params.limit] - Results per page (default: 20)
   * @returns {Promise<ProjectResponse>} Response with projects and pagination
   */
  getPublicProjects: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.sector) query.append('sector', String(params.sector));
    if (params.page) query.append('page', String(params.page));
    if (params.limit) query.append('limit', String(params.limit));

    return apiClient(`/projects?${query.toString()}`, {
      requiresAuth: false,
    });
  },

  /**
   * Get featured projects
   * @param {number} [limit=6] - Number of featured projects to return
   * @returns {Promise<ProjectResponse>} Response with featured projects
   */
  getFeaturedProjects: async (limit = 6) => {
    return apiClient(`/projects/featured?limit=${limit}`, {
      requiresAuth: false,
    });
  },

  /**
   * Get project statistics (total, by status, by sector)
   * @returns {Promise<{success, message, data: ProjectStatistics}>} Statistics data
   */
  getProjectStatistics: async () => {
    return apiClient('/projects/stats', {
      requiresAuth: false,
    });
  },

  /**
   * Get single project by slug
   * @param {string} slug - Project slug
   * @returns {Promise<ProjectResponse>} Response with single project
   */
  getProjectBySlug: async (slug) => {
    return apiClient(`/projects/${slug}`, {
      requiresAuth: false,
    });
  },

  // ============================================================
  // ADMIN ROUTES (Requires Authentication)
  // ============================================================

  /**
   * Get all projects (admin - includes drafts)
   * @param {Object} params - Query parameters
   * @param {string} [params.status] - Filter by status
   * @param {number} [params.sector] - Filter by sector ID
   * @param {number} [params.page] - Page number
   * @param {number} [params.limit] - Results per page
   * @returns {Promise<ProjectResponse>} Response with projects
   */
  getAdminProjects: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.sector) query.append('sector', String(params.sector));
    if (params.page) query.append('page', String(params.page));
    if (params.limit) query.append('limit', String(params.limit));

    return apiClient(`/admin/projects?${query.toString()}`, {
      requiresAuth: true,
    });
  },

  /**
   * Get single project by ID (admin)
   * @param {number|string} id - Project ID
   * @returns {Promise<ProjectResponse>} Response with single project
   */
  getProjectById: async (id) => {
    return apiClient(`/admin/projects/${id}`, {
      requiresAuth: true,
    });
  },

  /**
   * Create new project (admin)
   * @param {Object|FormData} data - Project data
   * @param {string} data.title - Project title
   * @param {string} data.description - Project description
   * @param {number} data.sector_id - Sector ID
   * @param {string} data.location - Project location
   * @param {'planning'|'ongoing'|'completed'|'on_hold'} data.status - Project status
   * @param {string} data.start_date - Start date (ISO 8601)
   * @param {string} data.end_date - End date (ISO 8601)
   * @param {number} data.budget - Total budget
   * @param {string} [data.contractor] - Contractor name
   * @param {string} [data.contact_person] - Contact person name
   * @param {string} [data.contact_phone] - Contact phone
   * @param {boolean} [data.is_featured] - Is featured project
   * @param {File} [data.image] - Image file (FormData)
   * @returns {Promise<ProjectResponse>} Response with created project
   */
  createProject: async (data) => {
    const isFormData = data instanceof FormData;
    return apiClient('/admin/projects', {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
      isFormData,
      requiresAuth: true,
    });
  },

  /**
   * Update project (admin)
   * @param {number|string} id - Project ID
   * @param {Object|FormData} data - Updated project data
   * @returns {Promise<ProjectResponse>} Response with updated project
   */
  updateProject: async (id, data) => {
    const isFormData = data instanceof FormData;
    return apiClient(`/admin/projects/${id}`, {
      method: 'PUT',
      body: isFormData ? data : JSON.stringify(data),
      isFormData,
      requiresAuth: true,
    });
  },

  /**
   * Delete project (admin)
   * @param {number|string} id - Project ID
   * @returns {Promise<{success, message}>} Success response
   */
  deleteProject: async (id) => {
    return apiClient(`/admin/projects/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },

  /**
   * Bulk update projects (admin)
   * @param {number[]} ids - Array of project IDs
   * @param {Object} data - Data to update (status, sector_id, etc)
   * @returns {Promise<{success, message, data: {count}}>} Number of updated projects
   */
  bulkUpdateProjects: async (ids, data) => {
    return apiClient('/admin/projects/bulk/update', {
      method: 'POST',
      body: JSON.stringify({ ids, ...data }),
      requiresAuth: true,
    });
  },

  /**
   * Bulk delete projects (admin)
   * @param {number[]} ids - Array of project IDs
   * @returns {Promise<{success, message, data: {count}}>} Number of deleted projects
   */
  bulkDeleteProjects: async (ids) => {
    return apiClient('/admin/projects/bulk/delete', {
      method: 'POST',
      body: JSON.stringify({ ids }),
      requiresAuth: true,
    });
  },
};

export default projectsService;
