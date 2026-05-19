# API Client Migration Summary

## Overview

Successfully migrated and restructured the Next.js API client for a React (Vite) project. The API client now follows React/Vite best practices while maintaining all functionality from the original Next.js implementation.

## What Was Done

### 1. **Created Core API Client** (`src/lib/apiClient.js`)

A universal, production-ready API client that handles:

- **Environment Variables**: Uses `import.meta.env.VITE_API_URL` (Vite-specific)
- **Authentication**: Automatically reads/writes JWT tokens from `localStorage`
- **Content-Type Handling**: Auto-sets headers for JSON, skips for FormData
- **Error Handling**: Comprehensive error parsing and meaningful error messages
- **Development Logging**: Detailed request logging in dev mode (with redacted tokens)
- **Security**: Clears expired tokens, handles 401 responses
- **Exports**:
  - `apiClient(endpoint, options)` - Main function for making requests
  - `setAuthToken(token)` - Set/clear auth token
  - `getAuthToken()` - Get current token

### 2. **Refactored All Service Files**

Converted all services to use the new API client and added admin endpoints:

| Service | File | Public Methods | Admin Methods |
|---------|------|---|---|
| **Hero Slides** | `heroSlidesService.js` | getActiveSlides() | getAllSlides, getSlideById, createSlide, updateSlide, deleteSlide, reorderSlides |
| **Announcements** | `announcementsService.js` | getPublicAnnouncements, getAnnouncementBySlug | createAnnouncement, updateAnnouncement, deleteAnnouncement |
| **Blog** | `blogService.js` | getAllPosts, getFeaturedPosts, getPostBySlug | createPost, updatePost, deletePost |
| **Events** | `eventsService.js` | getAllEvents, getUpcomingEvents, getEventBySlug | createEvent, updateEvent, deleteEvent |
| **Ideas** | `ideasService.js` | getPublicIdeas, submitIdea, voteIdea, getIdeaById, deleteIdea | (mostly public) |
| **Gallery** | `galleryService.js` | getGalleries, getGallery | createGallery, updateGallery, deleteGallery |
| **Projects** | `projectsService.js` | getPublicProjects, getFeaturedProjects, getProjectBySlug | createProject, updateProject, deleteProject |
| **Youth** | `youthService.js` | submitYouthRegistration | getProfile, updateProfile, getStatistics, getAllRegistrations |
| **Upload** | `uploadService.js` | uploadFile, uploadMultiple | deleteFile |

### 3. **Created New Services**

Added new service that wasn't in original React project:

- **heroSlidesService.js**: Based on Next.js carousel-services.ts
  - Includes backward-compatible `carouselService` alias
  - Supports FormData for image uploads
  - Admin endpoints for managing hero slides

### 4. **Environment Configuration**

Created `.env.example` with Vite-compatible variables:

```
VITE_API_URL=http://localhost:8000
VITE_PUBLIC_API_TOKEN=(optional, for development)
```

### 5. **Documentation**

Created `API_CLIENT_README.md` with:

- Setup instructions
- Authentication patterns
- Service usage examples
- Component integration examples
- Troubleshooting guide
- Error handling patterns

## Key Features

### Authentication Flow

```javascript
import { setAuthToken, getAuthToken } from './lib/apiClient.js';

// After login
setAuthToken(jwtToken); // Saved to localStorage

// Automatically used in all authenticated requests
await heroSlidesService.getAllSlides(); // Bearer token included

// On logout
setAuthToken(null); // Clears localStorage
```

### FormData Support

All services automatically detect and handle FormData:

```javascript
// JSON request
await heroSlidesService.createSlide({ title: '...' });

// FormData with file
const formData = new FormData();
formData.append('image', fileInput.files[0]);
formData.append('title', 'Slide Title');
await heroSlidesService.createSlide(formData); // Automatically handled
```

### Error Handling

```javascript
try {
  await blogService.getAllPosts();
} catch (error) {
  console.error(error.message); // "HTTP 500: Internal server error"
  // No need to manually parse JSON or check res.ok
}
```

### Development Logging

In development mode, all requests are logged:

```
[API Request] {
  method: "GET",
  url: "http://localhost:8000/blog?page=1&limit=9",
  headers: { Authorization: "[REDACTED]", ... }
}
```

## Breaking Changes from Original

### For Components

1. **Import paths changed:**
   ```javascript
   // Old (direct fetch)
   const response = await fetch(API_BASE + endpoint);
   
   // New (service-based)
   import heroSlidesService from './services/heroSlidesService.js';
   const response = await heroSlidesService.getActiveSlides();
   ```

2. **No manual Content-Type headers needed:**
   ```javascript
   // Old (manual)
   fetch(url, {
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(data)
   })
   
   // New (automatic)
   await myService.method(data);
   ```

3. **FormData automatically handled:**
   ```javascript
   // Old (manual management)
   const formData = new FormData();
   // ... manually set headers
   
   // New (automatic)
   const formData = new FormData();
   await uploadService.uploadFile(formData);
   ```

## Migration Checklist for Components

When updating components to use new services:

- [ ] Replace all `fetch(API_BASE + endpoint)` with service calls
- [ ] Remove manual `Content-Type: application/json` headers
- [ ] Use `apiClient` or service pattern for all HTTP requests
- [ ] Ensure auth token is set after login: `setAuthToken(token)`
- [ ] Verify error handling is in place (try-catch blocks)
- [ ] Test that requests include Bearer token in Authorization header

## What Still Needs to be Done

1. **Update Components**: Components like `HeroCarousel` currently use mock data. Update to fetch from:
   ```javascript
   import heroSlidesService from './services/heroSlidesService.js';
   ```

2. **Create Auth Context** (optional): For managing auth state globally
   ```javascript
   // context/AuthContext.jsx
   export const useAuth = () => {
     return useContext(AuthContext);
   };
   ```

3. **Create useService Hook** (optional): For cleaner component integration
   ```javascript
   const useServiceData = (serviceFn) => {
     const [data, setData] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     // ... setup effect
     return { data, loading, error };
   };
   ```

4. **Environment Setup**: Ensure `.env` file exists with `VITE_API_URL` pointing to backend

5. **Test All Services**: Run through each service with backend API to verify:
   - Authentication works correctly
   - FormData uploads work
   - Error handling catches API errors
   - Pagination works for paginated endpoints

## File Structure

```
src/
├── lib/
│   └── apiClient.js                    # Core API client (NEW)
├── services/
│   ├── announcementsService.js         # Updated ✓
│   ├── blogService.js                  # Updated ✓
│   ├── eventsService.js                # Updated ✓
│   ├── galleryService.js               # Updated ✓
│   ├── heroSlidesService.js            # NEW - from Next.js carousel-services.ts
│   ├── ideasService.js                 # Updated ✓
│   ├── projectsService.js              # Updated ✓
│   ├── uploadService.js                # Updated ✓
│   └── youthService.js                 # Updated ✓
├── pages/
├── components/
└── ...

Root:
├── .env                                # Environment variables (create from .env.example)
├── .env.example                        # Template (NEW)
└── API_CLIENT_README.md               # Full documentation (NEW)
```

## Testing

To verify the API client is working:

```javascript
// In browser console or test file
import { apiClient } from './lib/apiClient.js';

// Test public endpoint (no auth required)
apiClient('/hero-slides', { requiresAuth: false })
  .then(data => console.log('Success:', data))
  .catch(err => console.error('Error:', err));
```

## Next Steps

1. Copy `.env.example` to `.env` and update `VITE_API_URL`
2. Restart dev server (`npm run dev`)
3. Update components to use services instead of mock data
4. Test authentication flow by implementing login form
5. Verify all API endpoints work with backend

## Comparison with Next.js Version

| Feature | Next.js | React/Vite |
|---------|---------|-----------|
| Environment vars | `process.env.NEXT_PUBLIC_*` | `import.meta.env.VITE_*` |
| API Client | `apiClient.ts` (TypeScript) | `apiClient.js` (JavaScript) |
| Auth Token | localStorage + optional cookies | localStorage only |
| Development Logging | `process.env.NODE_ENV` | `import.meta.env.DEV` |
| FormData Support | ✓ | ✓ |
| Error Handling | ✓ | ✓ |
| 401 Handling | ✓ Redirect to /login | ✓ Clear token (optional redirect) |
| Services | carousel, various | All services updated + heroSlidesService |

