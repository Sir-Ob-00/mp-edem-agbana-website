# Gallery Service Implementation Guide

Complete guide for using the Gallery Service in the React (Vite) application.

## Overview

The Gallery Service provides comprehensive API integration for gallery management:
- **Public methods**: List galleries, featured galleries, categories, single gallery details
- **Admin methods**: Full CRUD operations, bulk operations, status management
- **File handling**: Integrated image upload with FormData support
- **Authentication**: Public routes don't require auth, admin routes do

## Service Location

```
src/services/galleryService.js
```

## Configuration

Gallery service uses the universal API client configured in `.env`:

```env
VITE_API_URL=http://localhost:8080
# or production: http://app.comdevhub-api.com/v1
```

Full API endpoints will be:
- Public: `{VITE_API_URL}/gallery/*`
- Admin: `{VITE_API_URL}/admin/gallery/*`

## Public Methods

### getGalleries(params)

Get list of galleries with optional filtering.

```javascript
import galleryService from '../../services/galleryService';

// Get all galleries
const response = await galleryService.getGalleries();

// Get galleries by category
const response = await galleryService.getGalleries({ 
  category: 'Events' 
});

// Get with pagination
const response = await galleryService.getGalleries({ 
  page: 1, 
  limit: 12 
});

// Response structure
{
  success: true,
  message: "Galleries retrieved successfully",
  data: {
    galleries: [
      {
        id: 1,
        title: "Annual Event 2024",
        slug: "annual-event-2024",
        description: "Our annual event highlights...",
        category: "Events",
        date: "2024-01-15",
        location: "Community Center",
        cover_image: "gallery/annual-event.jpg",
        images: [
          { url: "gallery/photo1.jpg", caption: "Opening ceremony" },
          { url: "gallery/photo2.jpg", caption: "Group photo" }
        ],
        status: "active"
      }
    ],
    pagination: {
      page: 1,
      limit: 12,
      total: 45,
      total_pages: 4
    }
  }
}
```

### getFeaturedGalleries(limit)

Get latest/featured galleries for homepage display.

```javascript
// Get 4 featured galleries (default)
const response = await galleryService.getFeaturedGalleries();

// Or specify custom limit
const response = await galleryService.getFeaturedGalleries(6);

// Response
{
  success: true,
  data: {
    galleries: [ /* featured galleries */ ]
  }
}
```

### getCategories()

Get list of all gallery categories.

```javascript
const response = await galleryService.getCategories();

// Response
{
  success: true,
  data: {
    categories: [
      "Events",
      "Programs",
      "Community",
      "Infrastructure",
      "General"
    ]
  }
}
```

### getGallery(idOrSlug)

Get single gallery by ID or slug for detail view.

```javascript
// By slug
const response = await galleryService.getGallery('annual-event-2024');

// By ID
const response = await galleryService.getGallery(1);

// Response
{
  success: true,
  data: {
    gallery: {
      id: 1,
      title: "Annual Event 2024",
      slug: "annual-event-2024",
      description: "Full description...",
      category: "Events",
      date: "2024-01-15",
      location: "Community Center",
      cover_image: "gallery/annual-event.jpg",
      images: [
        { url: "gallery/photo1.jpg", caption: "Opening ceremony" },
        { url: "gallery/photo2.jpg", caption: "Group photo" },
        { url: "gallery/photo3.jpg", caption: "Closing remarks" }
      ],
      status: "active"
    }
  }
}
```

## Admin Methods

### getAdminGalleries(params)

Get all galleries including inactive ones (admin only).

```javascript
// Get all galleries
const response = await galleryService.getAdminGalleries();

// Filter by status
const active = await galleryService.getAdminGalleries({ status: 'active' });
const inactive = await galleryService.getAdminGalleries({ status: 'inactive' });

// Filter by category
const events = await galleryService.getAdminGalleries({ category: 'Events' });

// With pagination
const response = await galleryService.getAdminGalleries({ 
  page: 1, 
  limit: 20 
});
```

### getGalleryById(id)

Get single gallery by ID for editing (admin only).

```javascript
const response = await galleryService.getGalleryById(1);

// Response includes all gallery data
{
  success: true,
  data: {
    gallery: { /* gallery data */ }
  }
}
```

### createGallery(data)

Create new gallery album (admin only).

```javascript
// Method 1: Simple data (no images)
const response = await galleryService.createGallery({
  title: "Community Workshop",
  description: "Photos from our workshop",
  category: "Programs",
  date: "2024-02-20",
  location: "Community Center",
  status: "active"
});

// Method 2: With images using FormData
const formData = new FormData();
formData.append('title', 'Community Workshop');
formData.append('description', 'Photos from our workshop');
formData.append('category', 'Programs');
formData.append('date', '2024-02-20');
formData.append('location', 'Community Center');
formData.append('status', 'active');

// Add cover image
formData.append('cover_image', fileInput.files[0]);

// Add gallery images and captions
formData.append('gallery_images[]', file1);
formData.append('gallery_images[]', file2);
formData.append('gallery_captions[]', 'First photo');
formData.append('gallery_captions[]', 'Second photo');

const response = await galleryService.createGallery(formData);

// Response
{
  success: true,
  message: "Gallery created successfully",
  data: {
    gallery: {
      id: 10,
      title: "Community Workshop",
      slug: "community-workshop",
      // ... other fields
    }
  }
}
```

### updateGallery(id, data)

Update existing gallery (admin only).

```javascript
// Update without images
const response = await galleryService.updateGallery(1, {
  title: "Updated Title",
  description: "Updated description",
  status: "inactive"
});

// Update with new images
const formData = new FormData();
formData.append('title', 'Updated Title');
formData.append('cover_image', newImageFile);
formData.append('gallery_images[]', newFile1);
formData.append('gallery_captions[]', 'New caption');

const response = await galleryService.updateGallery(1, formData);
```

### deleteGallery(id)

Delete gallery (admin only).

```javascript
const response = await galleryService.deleteGallery(1);

// Response
{
  success: true,
  message: "Gallery deleted successfully"
}
```

## Bulk Operations (Admin Only)

### bulkUpdateGalleries(ids, data)

Update multiple galleries at once.

```javascript
const response = await galleryService.bulkUpdateGalleries(
  [1, 2, 3],  // Gallery IDs
  {
    status: 'inactive',
    category: 'General'
  }
);

// Response
{
  success: true,
  message: "3 galleries updated successfully",
  data: {
    count: 3
  }
}
```

### bulkDeleteGalleries(ids)

Delete multiple galleries at once.

```javascript
const response = await galleryService.bulkDeleteGalleries([1, 2, 3]);

// Response
{
  success: true,
  message: "3 galleries deleted successfully",
  data: {
    count: 3
  }
}
```

## Status Management (Admin Only)

### activateGallery(id)

Activate an inactive gallery.

```javascript
const response = await galleryService.activateGallery(1);

// Response
{
  success: true,
  data: {
    gallery: { /* activated gallery */ }
  }
}
```

### deactivateGallery(id)

Deactivate an active gallery.

```javascript
const response = await galleryService.deactivateGallery(1);

// Response
{
  success: true,
  data: {
    gallery: { /* deactivated gallery */ }
  }
}
```

## Usage in Components

### GalleryPreview (Homepage)

```javascript
import { useEffect, useState } from 'react';
import galleryService from '../../services/galleryService';

function GalleryPreview() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        setLoading(true);
        const response = await galleryService.getGalleries();
        
        if (response.success && response.data.galleries?.length > 0) {
          // Sort by date and get latest 4
          const sorted = response.data.galleries
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 4);
          setGalleries(sorted);
        } else {
          setGalleries([]);
        }
      } catch (error) {
        console.error('Failed to fetch galleries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  // Render galleries...
}
```

### GalleryPage (Full Gallery)

```javascript
function GalleryPage() {
  const [galleries, setGalleries] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const params = activeCategory === 'All' ? {} : { category: activeCategory };
        const response = await galleryService.getGalleries(params);
        setGalleries(response.data.galleries || []);
      } catch (error) {
        console.error('Failed to fetch galleries:', error);
      }
    };

    fetchGalleries();
  }, [activeCategory]);

  // Render galleries with filters...
}
```

### Gallery Detail View

```javascript
import { useParams } from 'react-router-dom';

function GalleryDetail() {
  const { slug } = useParams();
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await galleryService.getGallery(slug);
        if (response.success && response.data.gallery) {
          setGallery(response.data.gallery);
        }
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [slug]);

  // Render gallery detail with lightbox...
}
```

## Error Handling

The API client automatically handles errors. All service methods will throw errors if:
- Network fails
- Server returns error status
- Authentication fails (401 redirects to login)

```javascript
try {
  const response = await galleryService.getGalleries();
} catch (error) {
  console.error('Error:', error.message);
  // Handle error
}
```

## Image Handling

### Uploading Images

Images are handled through FormData when creating/updating galleries:

```javascript
// From file input
const files = fileInput.files;

const formData = new FormData();
formData.append('title', 'New Gallery');
formData.append('cover_image', files[0]); // Cover image
formData.append('gallery_images[]', files[1]);
formData.append('gallery_images[]', files[2]);
formData.append('gallery_captions[]', 'Photo 1');
formData.append('gallery_captions[]', 'Photo 2');

await galleryService.createGallery(formData);
```

### Displaying Images

Images returned from API may be:
- Full URLs: `https://cdn.example.com/image.jpg`
- Relative paths: `gallery/image.jpg`

Handle with helper function:

```javascript
import { getImageUrl } from '../../utils/galleryHelpers';

<img src={getImageUrl(gallery.cover_image)} alt={gallery.title} />
```

## Data Structure

### Gallery Object

```javascript
{
  id: number,              // Unique identifier
  title: string,           // Gallery title
  slug: string,            // URL-friendly slug (auto-generated)
  description: string,     // Gallery description
  category: string,        // Gallery category
  date: string,            // Gallery date (ISO format)
  location: string,        // Gallery location
  cover_image: string,     // Cover image path/URL
  images: [{               // Array of images
    url: string,           // Image path/URL
    caption: string        // Image caption
  }],
  status: 'active'|'inactive',  // Gallery status
  created_at: string,      // ISO timestamp
  updated_at: string       // ISO timestamp
}
```

### GalleriesResponse Object

```javascript
{
  success: boolean,        // Request success status
  message: string,         // Response message
  data: {
    galleries: Gallery[],  // Array of galleries
    pagination: {
      page: number,        // Current page
      limit: number,       // Items per page
      total: number,       // Total galleries
      total_pages: number  // Total pages
    }
  }
}
```

## Gallery Categories

Available categories for filtering:
- Events
- Programs
- Community
- Infrastructure
- General

## Development vs Production

### Development

```javascript
// .env
VITE_API_URL=http://localhost:8080

// Service will call: http://localhost:8080/gallery/*
```

### Production

```javascript
// .env or environment variable
VITE_API_URL=http://app.comdevhub-api.com/v1

// Service will call: http://app.comdevhub-api.com/v1/gallery/*
```

## Security Notes

1. **Authentication**: Admin methods require valid authentication token
2. **CORS**: Backend must have proper CORS headers configured
3. **FormData**: File uploads via FormData (browser sets Content-Type)
4. **Status codes**: 401 responses automatically clear token and redirect to login

## Testing

See [API_INTEGRATION_TESTING.md](./API_INTEGRATION_TESTING.md) for comprehensive testing guide.

### Quick Test - Get All Galleries

```bash
curl http://localhost:8080/gallery
```

### Response Example

```json
{
  "success": true,
  "message": "Galleries retrieved successfully",
  "data": {
    "galleries": [
      {
        "id": 1,
        "title": "Annual Event 2024",
        "slug": "annual-event-2024",
        "category": "Events",
        "date": "2024-01-15",
        "location": "Community Center",
        "cover_image": "gallery/event-cover.jpg",
        "images": []
      }
    ]
  }
}
```

## Next Steps

1. ✅ Gallery service complete - ready for backend testing
2. Test all endpoints with real backend
3. Verify image uploads work correctly
4. Create admin dashboard for gallery management
