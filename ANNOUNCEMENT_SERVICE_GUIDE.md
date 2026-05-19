# Announcement Service - Implementation Guide

This document explains how to use the refactored `announcementsService` in the React (Vite) project, based on the Next.js TypeScript version.

## Overview

The announcement service has been restructured for React with the following improvements:

✅ Full TypeScript-like JSDoc type documentation  
✅ Support for public and admin routes  
✅ FormData support for image uploads  
✅ Comprehensive helper utilities  
✅ Built on the centralized `apiClient`  

## Service Structure

### Public Routes (No Authentication Required)

```javascript
// Get all public announcements with filters
announcementsService.getPublicAnnouncements({
  priority: 'urgent',
  category: 'Infrastructure',
  page: 1,
  limit: 10
})

// Get single announcement by slug
announcementsService.getAnnouncementBySlug('announcement-slug')

// Get featured/latest announcements
announcementsService.getFeaturedAnnouncements(5)
```

### Admin Routes (Authentication Required)

```javascript
// Get all announcements (includes drafts, archived)
announcementsService.getAdminAnnouncements({
  status: 'draft',
  priority: 'high',
  page: 1
})

// Get by ID
announcementsService.getAnnouncementById(123)

// Create announcement
announcementsService.createAnnouncement({
  title: 'New Infrastructure',
  content: '<p>Content...</p>',
  category: 'Infrastructure',
  priority: 'high',
  status: 'published'
})

// Update announcement
announcementsService.updateAnnouncement(123, {
  title: 'Updated Title',
  priority: 'urgent'
})

// Delete announcement
announcementsService.deleteAnnouncement(123)

// Publish announcement
announcementsService.publishAnnouncement(123)

// Archive announcement
announcementsService.archiveAnnouncement(123)

// Bulk operations
announcementsService.bulkUpdateAnnouncements([1, 2, 3], { status: 'published' })
announcementsService.bulkDeleteAnnouncements([1, 2, 3])
```

## Response Structure

All endpoints return a consistent response format:

```javascript
{
  success: boolean,
  message: string,
  data: {
    announcements: Announcement[],
    announcement: Announcement,
    pagination: {
      page: number,
      limit: number,
      total: number,
      total_pages: number
    }
  }
}
```

## Announcement Data Type

```javascript
{
  id: number,
  title: string,
  slug: string,
  content: string,                    // HTML content
  category: string,                   // e.g., 'Infrastructure', 'Health'
  priority: 'low'|'medium'|'high'|'urgent',
  status: 'draft'|'published'|'archived',
  publish_date: string,               // ISO 8601, optional
  expiry_date: string,                // ISO 8601, optional
  image_url: string,                  // Optional
  created_at: string,                 // ISO 8601
  updated_at: string,                 // ISO 8601, optional
  published_at: string                // ISO 8601, optional
}
```

## Helper Utilities

Located in `src/utils/announcementHelpers.js`:

### Formatting

```javascript
// Format date
formatAnnouncementDate('2024-01-15T10:30:00Z') // "Jan 15, 2024"

// Format date and time
formatAnnouncementDateTime('2024-01-15T10:30:00Z') // "Jan 15, 2024 at 10:30 AM"

// Format category name
formatCategory('infrastructure') // "Infrastructure"

// Extract text from HTML
extractSummary('<p>Long announcement...</p>', 150) // "Long announcement..." (truncated)
```

### Styling & Display

```javascript
// Get CSS classes for priority badge
getPriorityClasses('urgent') // "bg-red-100 text-red-700"

// Get priority icon/emoji
getPriorityIcon('urgent') // "🚨"

// Get priority color (hex)
getPriorityColor('high') // "#f97316"

// Get CSS classes for status badge
getStatusClasses('published') // "bg-green-100 text-green-700"
```

### Filtering & Sorting

```javascript
// Filter announcements
filterByPriority(announcements, 'urgent')
filterByCategory(announcements, 'Infrastructure')
filterByStatus(announcements, 'published')

// Get urgent only
getUrgentAnnouncements(announcements)

// Get published only
getPublishedAnnouncements(announcements)

// Sort by date (newest first)
sortAnnouncementsByDate(announcements)

// Sort ascending (oldest first)
sortAnnouncementsByDate(announcements, 'published_at', true)
```

### Validation

```javascript
// Check if expired
isAnnouncementExpired('2024-01-01T10:00:00Z')

// Check if should be published
shouldPublish('2024-01-20T10:00:00Z')
```

### Data Lists

```javascript
// Get categories
getAvailableCategories() // [{ value: 'general', label: 'General' }, ...]

// Get priority levels
getPriorityLevels() // [{ value: 'low', label: 'Low' }, ...]

// Get statuses
getAnnouncementStatuses() // [{ value: 'draft', label: 'Draft' }, ...]

// Get image URL with fallback
getImageUrl(imageUrl) // Returns valid URL or placeholder
```

## Component Integration

### Basic List Example

```javascript
import { useEffect, useState } from 'react';
import announcementsService from '../services/announcementsService.js';

function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await announcementsService.getPublicAnnouncements();
        if (response.success) {
          setAnnouncements(response.data.announcements);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {announcements.map(a => (
        <div key={a.id}>{a.title}</div>
      ))}
    </div>
  );
}
```

### With Filters

```javascript
const [filters, setFilters] = useState({
  priority: '',
  category: '',
  page: 1,
});

useEffect(() => {
  async function fetch() {
    const response = await announcementsService.getPublicAnnouncements(filters);
    setAnnouncements(response.data.announcements);
  }
  fetch();
}, [filters]);

return (
  <>
    <select onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
      <option value="">All Priorities</option>
      <option value="urgent">Urgent</option>
      <option value="high">High</option>
    </select>
  </>
);
```

### Form Example (Create/Update)

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  
  // With image
  if (imageFile) {
    formData.append('image', imageFile);
    const response = await announcementsService.createAnnouncement(formData);
  } else {
    // Without image
    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
      // ... other fields
    };
    const response = await announcementsService.createAnnouncement(data);
  }
};
```

## Current Implementation Status

### ✅ Already Implemented

- `src/services/announcementsService.js` - Full service with all endpoints
- `src/utils/announcementHelpers.js` - Comprehensive helper utilities
- `src/pages/announcement/AnnouncementPage.jsx` - List page with pagination
- `src/pages/announcement/AnnouncementDetailPage.jsx` - Detail page
- `src/components/announcements/AnnouncementList.jsx` - Reusable list component
- `src/components/announcements/AnnouncementCard.jsx` - Individual announcement card

### ✅ Navbar Integration

- Navbar links to `/announcement` route ✓
- Navbar imports working correctly ✓

### TODO - Further Enhancements

- [ ] Featured announcements widget on home page
- [ ] Urgent announcements alert banner
- [ ] Announcement search functionality
- [ ] Admin announcement dashboard
- [ ] Scheduled publishing (use `publish_date` field)
- [ ] Announcement expiry handling (check `expiry_date`)
- [ ] Email notification system for urgent announcements
- [ ] Announcement RSS feed

## API Endpoint Reference

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/announcements/public` | ❌ | Get all public announcements with filters |
| GET | `/announcements/{slug}` | ❌ | Get single announcement by slug |
| GET | `/announcements/featured` | ❌ | Get featured announcements |
| GET | `/admin/announcements` | ✅ | Get all announcements (admin) |
| GET | `/admin/announcements/{id}` | ✅ | Get announcement by ID (admin) |
| POST | `/admin/announcements` | ✅ | Create announcement |
| PUT | `/admin/announcements/{id}` | ✅ | Update announcement |
| DELETE | `/admin/announcements/{id}` | ✅ | Delete announcement |
| POST | `/admin/announcements/{id}/publish` | ✅ | Publish announcement |
| POST | `/admin/announcements/{id}/archive` | ✅ | Archive announcement |
| POST | `/admin/announcements/bulk/update` | ✅ | Bulk update announcements |
| POST | `/admin/announcements/bulk/delete` | ✅ | Bulk delete announcements |

## Query Parameters

### getPublicAnnouncements & getAdminAnnouncements

```javascript
{
  status: 'draft|published|archived',    // Filter by status
  priority: 'low|medium|high|urgent',    // Filter by priority
  category: 'Infrastructure|Health|...',  // Filter by category
  page: 1,                               // Page number (default: 1)
  limit: 20                              // Results per page (default: 20)
}
```

## Error Handling

All service methods throw errors on failure. Always use try-catch:

```javascript
try {
  const response = await announcementsService.getPublicAnnouncements();
  // Handle response
} catch (error) {
  console.error('Error:', error.message);
  // Show error to user
}
```

Common error scenarios:
- **Network error**: "Network error: Failed to connect to API..."
- **Not found**: "HTTP 404: ..."
- **Unauthorized**: "HTTP 401: ..." (token cleared automatically)
- **Server error**: "HTTP 500: ..."

## FormData Support

When uploading images with announcements:

```javascript
const formData = new FormData();
formData.append('title', 'Announcement');
formData.append('content', 'Content...');
formData.append('image', fileInput.files[0]); // File object

// Service automatically detects FormData
const response = await announcementsService.createAnnouncement(formData);
```

The API client automatically:
- Detects FormData
- Does NOT set Content-Type (browser sets it with boundary)
- Sends correct multipart request

## Files Modified/Created

```
src/
├── services/
│   └── announcementsService.js           # ✅ UPDATED - Full implementation
├── utils/
│   └── announcementHelpers.js            # ✅ UPDATED - Helper functions
├── pages/announcement/
│   ├── AnnouncementPage.jsx              # ✅ Already working
│   └── AnnouncementDetailPage.jsx        # ✅ Already working
├── components/announcements/
│   ├── AnnouncementList.jsx              # ✅ Already implemented
│   └── AnnouncementCard.jsx              # ✅ Already implemented

Root/
└── ANNOUNCEMENT_IMPLEMENTATION_EXAMPLES.md  # ✅ NEW - Code examples
```

## Next Steps

1. **Verify current pages work**: Test `/announcement` and `/announcement/{slug}` routes
2. **Check navbar**: Verify "Announcements" link in navbar works
3. **Test filters**: Add filter UI to AnnouncementPage
4. **Admin features**: Implement admin dashboard if needed
5. **Home page**: Add featured announcements widget
6. **Alerts**: Add urgent announcements banner

See `ANNOUNCEMENT_IMPLEMENTATION_EXAMPLES.md` for detailed component examples.
