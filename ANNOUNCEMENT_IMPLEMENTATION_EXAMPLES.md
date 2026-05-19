/**
 * ANNOUNCEMENT INTEGRATION GUIDE
 * 
 * How to use the refactored announcementsService in React components
 * This file contains practical examples for common use cases
 */

// ============================================================
// Example 1: Simple Announcement List (Current Implementation)
// ============================================================

import { useEffect, useState } from 'react';
import announcementsService from '../services/announcementsService.js';
import { formatAnnouncementDate, getPriorityClasses } from '../utils/announcementHelpers.js';

export function AnnouncementListExample() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        setLoading(true);
        const response = await announcementsService.getPublicAnnouncements({
          page: currentPage,
          limit: 10,
        });
        
        if (response.success) {
          setAnnouncements(response.data.announcements || []);
          setTotalPages(response.data.pagination?.total_pages || 1);
        } else {
          setError(response.message || 'Failed to load announcements');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncements();
  }, [currentPage]);

  if (loading) return <div>Loading announcements...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{announcement.title}</h3>
                <p className="text-sm text-gray-600">{formatAnnouncementDate(announcement.published_at)}</p>
              </div>
              <span className={`px-3 py-1 rounded text-sm font-medium ${getPriorityClasses(announcement.priority)}`}>
                {announcement.priority.toUpperCase()}
              </span>
            </div>
            <p className="mt-2 text-gray-700">{announcement.content.substring(0, 150)}...</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex gap-2 justify-center">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Example 2: Filtered Announcements (Priority & Category)
// ============================================================

import { useCallback } from 'react';
import { getAvailableCategories, getPriorityLevels } from '../utils/announcementHelpers.js';

export function FilteredAnnouncementsExample() {
  const [announcements, setAnnouncements] = useState([]);
  const [filters, setFilters] = useState({
    priority: '',
    category: '',
    page: 1,
  });
  const [loading, setLoading] = useState(false);

  const fetchAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      const response = await announcementsService.getPublicAnnouncements(filters);
      if (response.success) {
        setAnnouncements(response.data.announcements || []);
      }
    } catch (err) {
      console.error('Error fetching announcements:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
      page: 1, // Reset to page 1 when filtering
    });
  };

  return (
    <div>
      <div className="mb-6 flex gap-4">
        <select
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Priorities</option>
          {getPriorityLevels().map(level => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          {getAvailableCategories().map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {loading && <div>Loading...</div>}
      {announcements.length === 0 && <div>No announcements found</div>}

      <div className="grid gap-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-lg shadow p-4">
            <h4 className="font-semibold">{announcement.title}</h4>
            <p className="text-sm text-gray-500">{formatAnnouncementDate(announcement.published_at)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Example 3: Admin - Create Announcement
// ============================================================

import { useRef } from 'react';
import { getAvailableCategories, getPriorityLevels, getAnnouncementStatuses } from '../utils/announcementHelpers.js';

export function AdminCreateAnnouncementExample() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  async function handleCreateAnnouncement(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData(e.target);
      
      // Convert FormData to JSON for submission
      const data = {
        title: formData.get('title'),
        content: formData.get('content'),
        category: formData.get('category'),
        priority: formData.get('priority'),
        status: formData.get('status'),
        publish_date: formData.get('publish_date') || undefined,
        expiry_date: formData.get('expiry_date') || undefined,
      };

      // If image is provided, use FormData
      let response;
      if (fileInputRef.current?.files[0]) {
        const fData = new FormData();
        fData.append('title', data.title);
        fData.append('content', data.content);
        fData.append('category', data.category);
        fData.append('priority', data.priority);
        fData.append('status', data.status);
        fData.append('image', fileInputRef.current.files[0]);
        
        response = await announcementsService.createAnnouncement(fData);
      } else {
        response = await announcementsService.createAnnouncement(data);
      }

      if (response.success) {
        setSuccess(true);
        e.target.reset();
        // Optionally redirect to announcement view
      } else {
        setError(response.message || 'Failed to create announcement');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleCreateAnnouncement} className="space-y-4 max-w-2xl">
      {success && <div className="bg-green-100 text-green-700 p-3 rounded">Announcement created successfully!</div>}
      {error && <div className="bg-red-100 text-red-700 p-3 rounded">Error: {error}</div>}

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          required
          className="w-full border rounded px-3 py-2"
          placeholder="Announcement title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          name="content"
          required
          rows={6}
          className="w-full border rounded px-3 py-2"
          placeholder="Announcement content (HTML supported)"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select name="category" required className="w-full border rounded px-3 py-2">
            <option value="">Select category</option>
            {getAvailableCategories().map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select name="priority" required className="w-full border rounded px-3 py-2">
            {getPriorityLevels().map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" required className="w-full border rounded px-3 py-2">
            {getAnnouncementStatuses().map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Publish Date</label>
          <input
            type="datetime-local"
            name="publish_date"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Expiry Date</label>
          <input
            type="datetime-local"
            name="expiry_date"
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Announcement'}
      </button>
    </form>
  );
}

// ============================================================
// Example 4: Admin - Update Announcement
// ============================================================

export function AdminUpdateAnnouncementExample({ announcementId }) {
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    async function fetchAnnouncement() {
      try {
        const response = await announcementsService.getAnnouncementById(announcementId);
        if (response.success && response.data.announcement) {
          setAnnouncement(response.data.announcement);
        } else {
          setError('Announcement not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncement();
  }, [announcementId]);

  async function handleUpdateAnnouncement(e) {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    try {
      const formData = new FormData(e.target);
      const data = {
        title: formData.get('title'),
        content: formData.get('content'),
        category: formData.get('category'),
        priority: formData.get('priority'),
        status: formData.get('status'),
      };

      let response;
      if (fileInputRef.current?.files[0]) {
        const fData = new FormData();
        Object.keys(data).forEach(key => fData.append(key, data[key]));
        fData.append('image', fileInputRef.current.files[0]);
        response = await announcementsService.updateAnnouncement(announcementId, fData);
      } else {
        response = await announcementsService.updateAnnouncement(announcementId, data);
      }

      if (response.success) {
        setAnnouncement(response.data.announcement);
        alert('Announcement updated successfully!');
      } else {
        setError(response.message || 'Update failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  }

  if (loading) return <div>Loading announcement...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!announcement) return <div>Announcement not found</div>;

  return (
    <form onSubmit={handleUpdateAnnouncement} className="space-y-4 max-w-2xl">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={announcement.title}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          name="content"
          defaultValue={announcement.content}
          rows={6}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select name="category" defaultValue={announcement.category} className="w-full border rounded px-3 py-2">
            {getAvailableCategories().map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select name="priority" defaultValue={announcement.priority} className="w-full border rounded px-3 py-2">
            {getPriorityLevels().map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={updating}
        className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {updating ? 'Updating...' : 'Update Announcement'}
      </button>
    </form>
  );
}

// ============================================================
// Example 5: Admin - Delete Announcement
// ============================================================

export function AdminDeleteAnnouncementExample({ announcementId, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this announcement?')) {
      return;
    }

    try {
      setDeleting(true);
      const response = await announcementsService.deleteAnnouncement(announcementId);
      if (response.success) {
        alert('Announcement deleted');
        if (onDelete) onDelete();
      } else {
        setError(response.message || 'Delete failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {deleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}

// ============================================================
// Example 6: Urgent Announcements Widget
// ============================================================

import { getUrgentAnnouncements, formatAnnouncementDate } from '../utils/announcementHelpers.js';

export function UrgentAnnouncementsWidget() {
  const [urgentAnnouncements, setUrgentAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUrgent() {
      try {
        const response = await announcementsService.getPublicAnnouncements({
          priority: 'urgent',
          limit: 3,
        });
        if (response.success) {
          setUrgentAnnouncements(response.data.announcements || []);
        }
      } catch (err) {
        console.error('Error fetching urgent announcements:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUrgent();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (urgentAnnouncements.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-red-900 mb-3">🚨 Urgent Announcements</h3>
      <div className="space-y-2">
        {urgentAnnouncements.map(announcement => (
          <div key={announcement.id} className="text-sm">
            <p className="font-medium text-red-900">{announcement.title}</p>
            <p className="text-xs text-red-700">{formatAnnouncementDate(announcement.published_at)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default {
  AnnouncementListExample,
  FilteredAnnouncementsExample,
  AdminCreateAnnouncementExample,
  AdminUpdateAnnouncementExample,
  AdminDeleteAnnouncementExample,
  UrgentAnnouncementsWidget,
};
