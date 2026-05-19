# Implementation Checklist

## Phase 1: Setup ✓ COMPLETE

- [x] Create `src/lib/apiClient.js` - Universal API client for Vite
- [x] Create `heroSlidesService.js` - New service for hero carousel
- [x] Refactor all existing services to use new API client
- [x] Create `.env.example` with proper configuration
- [x] Add JSDoc comments to all service methods

## Phase 2: Documentation ✓ COMPLETE

- [x] Create `API_CLIENT_README.md` - Full setup and usage guide
- [x] Create `API_MIGRATION_SUMMARY.md` - Migration details and changes
- [x] Create `COMPONENT_INTEGRATION_EXAMPLES.md` - Real-world component examples

## Phase 3: Environment Setup - TODO

- [ ] Create `.env` file from `.env.example`
  ```bash
  # Copy the template
  cp .env.example .env
  
  # Edit .env with your backend URL
  VITE_API_URL=http://localhost:8000
  ```
- [ ] Restart dev server: `npm run dev`
- [ ] Verify environment variables load correctly

## Phase 4: Authentication Setup - TODO

If your app has authentication:

- [ ] Implement login page/component
  - Use `apiClient('/login', { method: 'POST', ... })`
  - After success, call `setAuthToken(response.data.token)`
- [ ] Implement logout functionality
  - Call `setAuthToken(null)` to clear token
- [ ] Test that subsequent requests include Bearer token
  - Check browser Network tab headers
- [ ] Implement token refresh if backend supports it
- [ ] Add "unauthorized" error handler (redirect to login)

## Phase 5: Component Migration - TODO

### Priority 1: Core Components (Home Page)

- [ ] Update `HeroCarousel` component
  ```javascript
  import heroSlidesService from '../services/heroSlidesService.js';
  // Replace mock data with: heroSlidesService.getActiveSlides()
  ```

- [ ] Update `AnnouncementSection` component
  - Already uses service ✓ (verify it works)
  
- [ ] Update `EventsList` component
  - Already uses service ✓ (verify it works)

- [ ] Update `ArticlesGrid` component
  - Likely needs: `blogService.getFeaturedPosts()`

- [ ] Update `GalleryPreview` component
  - Already uses service ✓ (verify it works)

- [ ] Update `ProjectsShowcase` component
  - Already uses service ✓ (verify it works)

### Priority 2: Page Components

- [ ] `pages/BlogListPage.jsx`
  - Verify: `blogService.getAllPosts()` works
  - Check: Error handling, loading states

- [ ] `pages/EventsListPage.jsx` (if exists)
  - Verify: `eventsService.getAllEvents()` works

- [ ] `pages/AnnouncementPage.jsx`
  - Verify: `announcementsService.getPublicAnnouncements()` works

- [ ] `pages/GalleryPage.jsx`
  - Verify: `galleryService.getGalleries()` works

- [ ] `pages/ProjectsPage.jsx`
  - Verify: `projectsService.getPublicProjects()` works

- [ ] `pages/YouthPage.jsx`
  - Already uses: `youthService.submitYouthRegistration()` ✓

- [ ] `pages/IdeasPage.jsx`
  - Should use: `ideasService.getPublicIdeas()`, `submitIdea()`

- [ ] `pages/ContactPage.jsx`
  - May need: New contact form service (if not implemented)

### Priority 3: Feature Components

- [ ] Forms with file uploads
  - Use: `uploadService.uploadFile()`
  - Pattern: See `COMPONENT_INTEGRATION_EXAMPLES.md` Example 2

- [ ] Voting/Interaction features
  - Use: `ideasService.voteIdea()`
  - Pattern: See `COMPONENT_INTEGRATION_EXAMPLES.md` Example 4

- [ ] Filtering and search
  - Pass filters to services as params
  - Pattern: See `COMPONENT_INTEGRATION_EXAMPLES.md` Example 3

## Phase 6: Testing - TODO

### Manual Testing

- [ ] Test all public endpoints
  ```bash
  # In browser console:
  import heroSlidesService from './src/services/heroSlidesService.js';
  heroSlidesService.getActiveSlides().then(r => console.log(r));
  ```

- [ ] Test public data pages load correctly
  - [ ] Blog posts load
  - [ ] Announcements display
  - [ ] Events show correctly
  - [ ] Gallery images load
  - [ ] Ideas display with vote counts

- [ ] Test form submissions
  - [ ] Contact form sends data
  - [ ] Youth registration submits
  - [ ] Idea submission works
  - [ ] File uploads work

- [ ] Test error handling
  - [ ] Network error shows message
  - [ ] Invalid data shows error
  - [ ] 404 responses handled
  - [ ] 500 errors caught

- [ ] Test authentication (if implemented)
  - [ ] Login saves token to localStorage
  - [ ] Token sent in Authorization header
  - [ ] Logout clears token
  - [ ] 401 response clears token
  - [ ] Unauthorized requests show error

### Automated Testing (Optional)

- [ ] Create test file for `apiClient.js`
- [ ] Create test file for each service
- [ ] Test error cases
- [ ] Test with mock API responses

## Phase 7: Admin Features - TODO (If needed)

- [ ] Create admin dashboard
  - [ ] Add authentication check
  - [ ] Implement role-based access

- [ ] Hero Slides Management
  - [ ] `heroSlidesService.getAllSlides()`
  - [ ] `heroSlidesService.createSlide(data)`
  - [ ] `heroSlidesService.updateSlide(id, data)`
  - [ ] `heroSlidesService.deleteSlide(id)`
  - [ ] `heroSlidesService.reorderSlides()`

- [ ] Content Management
  - [ ] Create/edit/delete announcements
  - [ ] Create/edit/delete blog posts
  - [ ] Create/edit/delete events
  - [ ] Create/edit/delete projects

- [ ] File Management
  - [ ] View uploaded files
  - [ ] Delete files with `uploadService.deleteFile()`

## Phase 8: Performance & Optimization - TODO

- [ ] Add loading skeletons to components
- [ ] Implement request debouncing for filters
- [ ] Add pagination for large datasets
- [ ] Cache data where appropriate
- [ ] Lazy load images in galleries
- [ ] Minimize API calls (batch requests if needed)

## Phase 9: Error Handling & UX - TODO

- [ ] Create global error boundary component
- [ ] Implement toast/notification system for errors
- [ ] Add retry functionality for failed requests
- [ ] Implement "offline" mode detection
- [ ] Add helpful error messages to users
- [ ] Log errors for debugging

## Phase 10: Deployment - TODO

- [ ] Create production `.env` with correct API URL
- [ ] Test all APIs in production
- [ ] Set up CORS if needed on backend
- [ ] Verify token handling in production
- [ ] Test file uploads in production
- [ ] Monitor for API errors in production

## Verification Checklist

Before considering migration complete:

- [ ] `npm run dev` starts without errors
- [ ] All pages load without console errors
- [ ] Data fetches from API (not mock data)
- [ ] Forms submit successfully
- [ ] Error messages display correctly
- [ ] Authentication works (if implemented)
- [ ] File uploads work
- [ ] Pagination works
- [ ] Filtering works
- [ ] Build succeeds: `npm run build`
- [ ] No console warnings about missing services

## Common Issues & Solutions

### Issue: "VITE_API_URL is not defined"
**Solution:**
- Create `.env` file
- Add `VITE_API_URL=http://localhost:8000`
- Restart dev server
- Variables must start with `VITE_` prefix

### Issue: CORS errors when fetching
**Solution:**
- Backend needs CORS configured
- Check backend allows requests from `localhost:5173`
- Test with Postman/curl to verify backend works

### Issue: Token not being sent
**Solution:**
- Check localStorage: `localStorage.getItem('authToken')`
- Call `setAuthToken(token)` after login
- Verify Network tab shows Authorization header

### Issue: FormData upload not working
**Solution:**
- Ensure `isFormData: true` in apiClient options
- Don't manually set Content-Type header
- Verify file is appended to FormData before sending

### Issue: API responses show different structure than expected
**Solution:**
- Check backend API documentation
- Verify response structure in Network tab
- Update JSDoc types if needed
- Add response validation/transformation if needed

## Getting Help

If you encounter issues:

1. Check the browser console for error messages
2. Check the Network tab to see actual API requests/responses
3. Review `API_CLIENT_README.md` for setup issues
4. Review `COMPONENT_INTEGRATION_EXAMPLES.md` for usage patterns
5. Review `API_MIGRATION_SUMMARY.md` for migration details

## Notes

- All services now use the centralized `apiClient`
- FormData is automatically detected and handled
- Authentication tokens are auto-managed from localStorage
- All services follow the same pattern for consistency
- Error handling is standardized across all services
- Development logging helps debug API issues

---

**Last Updated**: 2026-05-18
**Migration Status**: Phase 1-2 Complete ✓, Phase 3-10 TODO
