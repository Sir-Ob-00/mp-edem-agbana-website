/**
 * Upload Service
 * Handles file uploads to the API
 */

import { apiClient } from '../lib/apiClient.js';

const uploadService = {
  /**
   * Upload a file to the API
   * @param {File} file - File to upload
   * @param {string} folder - Destination folder (ideas, announcements, gallery, etc. - default: 'ideas')
   * @param {string} kind - File kind/type (document, image, etc. - default: 'document')
   * @returns {Promise<Object>} Response with uploaded file data
   */
  uploadFile: async (file, folder = 'ideas', kind = 'document') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('kind', kind);

    return apiClient('/upload', {
      method: 'POST',
      body: formData,
      isFormData: true,
      requiresAuth: false,
    });
  },

  /**
   * Upload multiple files
   * @param {File[]} files - Array of files to upload
   * @param {string} folder - Destination folder (default: 'ideas')
   * @param {string} kind - File kind/type (default: 'document')
   * @returns {Promise<Object>} Response with uploaded files data
   */
  uploadMultiple: async (files, folder = 'ideas', kind = 'document') => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    formData.append('folder', folder);
    formData.append('kind', kind);

    return apiClient('/upload/multiple', {
      method: 'POST',
      body: formData,
      isFormData: true,
      requiresAuth: false,
    });
  },

  /**
   * Delete uploaded file - Admin only
   * @param {string} fileId - File ID or path
   * @returns {Promise<Object>} Success response
   */
  deleteFile: async (fileId) => {
    return apiClient(`/upload/${fileId}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },
};

export default uploadService;
