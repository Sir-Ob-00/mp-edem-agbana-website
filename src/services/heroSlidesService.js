/**
 * Hero Slides Service
 * Handles all hero slide API operations
 */

import { apiClient } from '../lib/apiClient.js';

// ============================================================
// Types/Interfaces
// ============================================================

export const HeroSlide = {
  id: 0,
  title: '',
  subtitle: '',
  image: '',
  cta_text: '',
  cta_link: '',
  display_order: 0,
  status: 'active', // 'active' | 'inactive'
  created_at: '',
  updated_at: '',
};

export const HeroSlidesResponse = {
  success: true,
  message: '',
  data: {
    slides: [],
    slide: null,
  },
};

// ============================================================
// Service Methods
// ============================================================

const heroSlidesService = {
  // PUBLIC ROUTES (No Authentication Required)

  /**
   * Get all active hero slides
   * @returns {Promise<Object>} Response with active slides
   */
  getActiveSlides: async () => {
    return apiClient('/hero-slides', {
      requiresAuth: false,
    });
  },

  // ADMIN ROUTES (Requires web_admin role / Authentication)

  /**
   * Get all hero slides (including inactive) - Admin only
   * @returns {Promise<Object>} Response with all slides
   */
  getAllSlides: async () => {
    return apiClient('/admin/hero-slides', {
      requiresAuth: true,
    });
  },

  /**
   * Get single hero slide by ID - Admin only
   * @param {number} id - Hero slide ID
   * @returns {Promise<Object>} Response with single slide
   */
  getSlideById: async (id) => {
    return apiClient(`/admin/hero-slides/${id}`, {
      requiresAuth: true,
    });
  },

  /**
   * Create new hero slide - Admin only
   * @param {Object|FormData} data - Slide data or FormData with image
   * @returns {Promise<Object>} Response with created slide
   */
  createSlide: async (data) => {
    const isFormData = data instanceof FormData;
    return apiClient('/admin/hero-slides', {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
      isFormData,
      requiresAuth: true,
    });
  },

  /**
   * Update hero slide - Admin only
   * @param {number} id - Hero slide ID
   * @param {Object|FormData} data - Updated slide data
   * @returns {Promise<Object>} Response with updated slide
   */
  updateSlide: async (id, data) => {
    const isFormData = data instanceof FormData;
    return apiClient(`/admin/hero-slides/${id}`, {
      method: 'PUT',
      body: isFormData ? data : JSON.stringify(data),
      isFormData,
      requiresAuth: true,
    });
  },

  /**
   * Delete hero slide - Admin only
   * @param {number} id - Hero slide ID
   * @returns {Promise<Object>} Success response
   */
  deleteSlide: async (id) => {
    return apiClient(`/admin/hero-slides/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },

  /**
   * Reorder hero slides - Admin only
   * @param {number[]} orderedIds - Array of slide IDs in new order
   * @returns {Promise<Object>} Success response
   */
  reorderSlides: async (orderedIds) => {
    return apiClient('/admin/hero-slides/reorder', {
      method: 'PUT',
      body: JSON.stringify({ order: orderedIds }),
      requiresAuth: true,
    });
  },
};

// Alias for backward compatibility with carousel naming convention
export const carouselService = {
  getActiveItems: heroSlidesService.getActiveSlides,
  getAllItems: heroSlidesService.getAllSlides,
  getItemById: heroSlidesService.getSlideById,
  createItem: heroSlidesService.createSlide,
  updateItem: heroSlidesService.updateSlide,
  deleteItem: heroSlidesService.deleteSlide,
  reorderItems: heroSlidesService.reorderSlides,
};

export default heroSlidesService;
