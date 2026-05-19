# API Client Documentation

This React project uses a centralized API client (`src/lib/apiClient.js`) for all HTTP requests to the backend API.

## Setup

### 1. Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```bash
VITE_API_URL=http://localhost:8000
```

**Environment Variables:**
- `VITE_API_URL` (required): Base URL of your backend API
- `VITE_PUBLIC_API_TOKEN` (optional): Static token for development (overridden by localStorage at runtime)

### 2. How the API Client Works

The API client (`src/lib/apiClient.js`) handles:

- **Authentication**: Reads token from `localStorage.authToken` automatically
- **Content-Type**: Auto-sets `application/json` for JSON requests
- **FormData**: Skips Content-Type for FormData (browser sets it with boundary)
- **Error Handling**: Parses JSON errors and throws meaningful messages
- **Development Logging**: Logs requests in development mode (with redacted auth tokens)
- **Unauthorized Handling**: Clears token on 401 responses

## Authentication

### Setting Auth Token After Login

```javascript
import { setAuthToken } from './lib/apiClient.js';

// After successful login
setAuthToken(token);

// To logout
setAuthToken(null);
```

### Getting Current Token

```javascript
import { getAuthToken } from './lib/apiClient.js';

const token = getAuthToken(); // Returns token or null
```

## Service Pattern

All services follow a consistent pattern and use the `apiClient`:

```javascript
import { apiClient } from '../lib/apiClient.js';

const myService = {
  getPublicData: async (params = {}) => {
    // No authentication required
    return apiClient('/endpoint', { requiresAuth: false });
  },

  createData: async (data) => {
    // Requires authentication
    return apiClient('/admin/endpoint', {
      method: 'POST',
      body: JSON.stringify(data),
      requiresAuth: true,
    });
  },

  uploadFile: async (file) => {
    // Upload with FormData
    const formData = new FormData();
    formData.append('file', file);
    
    return apiClient('/upload', {
      method: 'POST',
      body: formData,
      isFormData: true,
      requiresAuth: false,
    });
  },
};
```

## Available Services

### 1. **heroSlidesService** / **carouselService**

Handle hero carousel slides.

```javascript
import heroSlidesService from './services/heroSlidesService.js';

// Public: Get active slides
await heroSlidesService.getActiveSlides();

// Admin: Get all slides
await heroSlidesService.getAllSlides();

// Admin: Create slide
await heroSlidesService.createSlide({ title: '...', image: '...' });
```

### 2. **announcementsService**

Handle announcements and community updates.

```javascript
import announcementsService from './services/announcementsService.js';

// Public: Get announcements
await announcementsService.getPublicAnnouncements({ 
  priority: 'urgent',
  limit: 10 
});

// Public: Get single announcement
await announcementsService.getAnnouncementBySlug('announcement-slug');
```

### 3. **blogService**

Handle blog posts.

```javascript
import blogService from './services/blogService.js';

// Get posts with pagination
await blogService.getAllPosts(page, limit);

// Get featured posts
await blogService.getFeaturedPosts(limit);

// Get single post
await blogService.getPostBySlug('post-slug');
```

### 4. **eventsService**

Handle events.

```javascript
import eventsService from './services/eventsService.js';

// Get all events
await eventsService.getAllEvents(page, limit);

// Get upcoming events
await eventsService.getUpcomingEvents(limit);

// Get single event
await eventsService.getEventBySlug('event-slug');
```

### 5. **ideasService**

Handle citizen ideas and suggestions.

```javascript
import ideasService from './services/ideasService.js';

// Get public ideas
await ideasService.getPublicIdeas(page, limit);

// Submit idea
await ideasService.submitIdea({ title, description, category });

// Vote on idea
await ideasService.voteIdea(ideaId, 'up');
```

### 6. **galleryService**

Handle photo galleries.

```javascript
import galleryService from './services/galleryService.js';

// Get galleries
await galleryService.getGalleries({ category, page, limit });

// Get single gallery
await galleryService.getGallery(idOrSlug);
```

### 7. **projectsService**

Handle development projects.

```javascript
import projectsService from './services/projectsService.js';

// Get projects
await projectsService.getPublicProjects({ status, sector, page, limit });

// Get featured projects
await projectsService.getFeaturedProjects(limit);

// Get single project
await projectsService.getProjectBySlug('project-slug');
```

### 8. **youthService**

Handle youth employment tracking.

```javascript
import youthService from './services/youthService.js';

// Submit registration
await youthService.submitYouthRegistration(formData);
```

### 9. **uploadService**

Handle file uploads.

```javascript
import uploadService from './services/uploadService.js';

// Upload single file
await uploadService.uploadFile(file, 'folder', 'kind');

// Upload multiple files
await uploadService.uploadMultiple(files, 'folder', 'kind');
```

## Using in Components

### Example: React Hook with Service

```javascript
import { useEffect, useState } from 'react';
import blogService from '../services/blogService.js';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await blogService.getAllPosts(1, 9);
        setPosts(response.data.posts || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>{post.title}</article>
      ))}
    </div>
  );
}
```

## Error Handling

The API client throws errors with descriptive messages. Always wrap API calls in try-catch:

```javascript
try {
  const result = await heroSlidesService.getActiveSlides();
} catch (error) {
  console.error(error.message);
  // Handle error in UI
}
```

## Development

In development mode, API requests are logged to the browser console with:
- HTTP method
- Full URL
- Request headers (auth token is redacted)
- requiresAuth flag

This helps debug API integration issues without exposing sensitive data.

## TypeScript Support

While this project uses JavaScript, TypeScript definitions are in the Next.js original codebase. To add TypeScript:

1. Add JSDoc comments (already done in all services)
2. Enable TypeScript checking in your IDE
3. Use the JSDoc types for IDE autocomplete

## Common Issues

### 401 Unauthorized
- Token expired or invalid
- Check localStorage has `authToken`
- Verify token is valid and not expired
- Clear token with `setAuthToken(null)` and re-login

### CORS Errors
- Backend needs to allow requests from this origin
- Check backend CORS configuration
- Verify `VITE_API_URL` matches backend domain

### FormData Upload Not Working
- Make sure `isFormData: true` is set in apiClient options
- Don't manually set `Content-Type` header (browser sets it)
- Verify backend expects multipart/form-data

### "VITE_API_URL is not defined"
- Create `.env` file in project root
- Add `VITE_API_URL=...` 
- Restart dev server
- Variables must start with `VITE_` prefix to be exposed to client

