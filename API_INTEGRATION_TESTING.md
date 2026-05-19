# API Integration Testing Guide

This guide helps you verify that the API client and all services are correctly integrated and communicating with your backend.

## ✅ Pre-requisites

1. **Backend Running**: Ensure your API is running at `http://localhost:8080`
2. **.env File**: Verify `VITE_API_URL=http://localhost:8080` is set in `.env`
3. **Node Modules**: Run `npm install` if not already done
4. **Dev Server**: Start with `npm run dev`

## Step 1: Verify Environment Configuration

**File**: `.env`
```
VITE_API_URL=http://localhost:8080
```

✅ Environment variable is set to your backend URL  
✅ Vite will automatically expose `VITE_API_URL` to client code  
✅ Only variables prefixed with `VITE_` are accessible in browser

**Important**: After changing `.env`, restart the dev server for changes to take effect.

---

## Step 2: Test API Client in Browser Console

Once `npm run dev` is running and the app is open in the browser:

### Test 1: Check API URL is loaded

```javascript
// In browser console (F12 → Console tab)
console.log(import.meta.env.VITE_API_URL)
// Should output: http://localhost:8080
```

If this returns `undefined`, the `.env` file wasn't loaded correctly. **Solution**: Restart dev server.

### Test 2: Test Basic API Call

```javascript
// Import the API client
import { apiClient } from './src/lib/apiClient.js'

// Make a test call to announcements
const response = await apiClient('/announcements/public', { requiresAuth: false })
console.log(response)
```

Expected output:
```javascript
{
  success: true,
  message: "Announcements retrieved successfully",
  data: {
    announcements: [
      { id: 1, title: "...", ... },
      // ... more announcements
    ],
    pagination: { page: 1, limit: 20, total: 5, total_pages: 1 }
  }
}
```

If you get an error:
- **Network error**: Backend not running or wrong URL
- **CORS error**: Backend needs CORS headers for `http://localhost:5173`
- **404 error**: Wrong endpoint path
- **500 error**: Backend error (check backend logs)

### Test 3: Test Authentication Header

```javascript
// Set a fake token
localStorage.setItem('authToken', 'test-token-12345')

// Make an authenticated request
const response = await apiClient('/admin/announcements', { requiresAuth: true })
console.log(response)
```

Check browser Network tab:
- Find the request to `/admin/announcements`
- In Headers → Request Headers, you should see:
  ```
  Authorization: Bearer test-token-12345
  Content-Type: application/json
  ```

---

## Step 3: Test Each Service

### Test Announcements Service

```javascript
import announcementsService from './src/services/announcementsService.js'

// Test 1: Get public announcements
const result = await announcementsService.getPublicAnnouncements()
console.log('Public announcements:', result)

// Test 2: Get by slug
const detail = await announcementsService.getAnnouncementBySlug('test-announcement')
console.log('Announcement detail:', detail)

// Test 3: Get featured
const featured = await announcementsService.getFeaturedAnnouncements(3)
console.log('Featured:', featured)
```

### Test Hero Slides Service

```javascript
import heroSlidesService from './src/services/heroSlidesService.js'

// Test: Get active slides
const slides = await heroSlidesService.getActiveSlides()
console.log('Hero slides:', slides)
```

### Test Other Services

```javascript
// Blog Service
import blogService from './src/services/blogService.js'
const blogs = await blogService.getPublicBlogs()

// Events Service
import eventsService from './src/services/eventsService.js'
const events = await eventsService.getPublicEvents()

// Gallery Service
import galleryService from './src/services/galleryService.js'
const albums = await galleryService.getPublicGalleries()
```

---

## Step 4: Test Component Integration

### Test Announcement Page (Already Implemented ✅)

1. Navigate to `/announcement` in your app
2. Open browser console (F12)
3. Watch for API calls in Network tab
4. Verify announcements load and display

**Expected**:
- Page shows loading skeleton initially
- Loading disappears after ~1-2 seconds
- Announcements display with correct data
- Network tab shows successful request to `/announcements/public`

**If not working**:
- Check browser console for errors
- Check Network tab for failed requests
- Verify backend is running and responding

### Test Announcement Detail Page (Already Implemented ✅)

1. Click on an announcement from the list
2. Verify URL changes to `/announcement/[slug]`
3. Verify announcement details load
4. Check Network tab for request to `/announcements/{slug}`

---

## Step 5: Full Integration Checklist

### Pages That Should Load Data from API

- [ ] **AnnouncementPage** (`/announcement`)
  - Should fetch from: `GET /announcements/public`
  - Component: `src/pages/announcement/AnnouncementPage.jsx`
  - Status: ✅ Already implemented

- [ ] **AnnouncementDetailPage** (`/announcement/:slug`)
  - Should fetch from: `GET /announcements/{slug}`
  - Component: `src/pages/announcement/AnnouncementDetailPage.jsx`
  - Status: ✅ Already implemented

- [ ] **Home Page** (Hero Carousel)
  - Should fetch from: `GET /hero-slides`
  - Component: `src/components/home/HeroCarousel.jsx`
  - Status: ⚠️ Still using mock data (needs update)

- [ ] **Blog Page** 
  - Should fetch from: `GET /blogs/public`
  - Component: `src/pages/blog/BlogListPage.jsx`
  - Status: Check if implemented

- [ ] **Events Page**
  - Should fetch from: `GET /events/public`
  - Component: `src/pages/events/EventsListPage.jsx`
  - Status: Check if implemented

- [ ] **Youth Page**
  - Should fetch from: `GET /youth/public`
  - Component: `src/pages/youth/YouthPage.jsx`
  - Status: Check if implemented

### Navbar Links

- [ ] "Announcements" link in navbar → `/announcement` ✅
- [ ] All navigation links working correctly
- [ ] No 404 errors

---

## Step 6: Monitor Network Activity

### In Browser DevTools Network Tab

1. Open Network tab (F12 → Network)
2. Reload the page
3. Look for requests to:
   - `/announcements/public` (GET) - should be 200 OK
   - `/hero-slides` (GET) - should be 200 OK
   - Other service endpoints

### Check Headers

Click on any API request and verify:

**Request Headers**:
```
GET /announcements/public HTTP/1.1
Host: localhost:8080
Authorization: Bearer [token] (if requiresAuth: true)
Content-Type: application/json (for POST/PUT/PATCH)
```

**Response Headers**:
```
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

If you see CORS errors, your backend needs to allow requests from `http://localhost:5173`.

---

## Step 7: Error Diagnosis

### Error: "VITE_API_URL is not defined"

**Cause**: `.env` file not loaded by Vite  
**Solution**: 
1. Restart dev server: `npm run dev`
2. Hard refresh browser: `Ctrl+Shift+R`
3. Check `.env` file exists in project root

### Error: "Network error: Failed to connect to API"

**Cause**: Backend not running or wrong URL  
**Solution**:
1. Verify backend is running: `curl http://localhost:8080/health`
2. Check URL in `.env` is correct
3. Check for typos

### Error: "HTTP 401 Unauthorized"

**Cause**: 
- Token is invalid or expired
- `requiresAuth: true` but no valid token
**Solution**:
1. For public endpoints, use `requiresAuth: false`
2. For admin endpoints, set valid token in localStorage:
   ```javascript
   localStorage.setItem('authToken', 'your-valid-jwt-token')
   ```

### Error: "HTTP 404 Not Found"

**Cause**: 
- Endpoint path is wrong
- Backend route not implemented
**Solution**:
1. Check endpoint path in service file
2. Verify backend has the route implemented
3. Check for typos in endpoint

### Error: "HTTP 500 Internal Server Error"

**Cause**: Backend error  
**Solution**:
1. Check backend logs for error details
2. Verify database connection
3. Check query syntax

### Error: CORS Error

**Cause**: Backend doesn't allow requests from frontend URL  
**Solution**: Backend needs to set CORS headers:
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Authorization, Content-Type
```

---

## Step 8: Authentication Flow (If Needed)

### For Testing Admin Functions

1. **Get a valid JWT token** from your backend login endpoint:
   ```javascript
   // In browser console
   const loginResponse = await fetch('http://localhost:8080/login', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email: 'admin@example.com', password: 'password' })
   })
   const data = await loginResponse.json()
   const token = data.token // or data.data.token
   console.log(token)
   ```

2. **Store token in localStorage**:
   ```javascript
   localStorage.setItem('authToken', token)
   ```

3. **Test admin endpoint**:
   ```javascript
   import announcementsService from './src/services/announcementsService.js'
   const adminData = await announcementsService.getAdminAnnouncements()
   console.log(adminData)
   ```

The token will be automatically included in all subsequent requests.

---

## Step 9: Performance Monitoring

### Check API Response Times

In Network tab, look at "Time" column:
- ✅ Good: < 200ms
- ⚠️ Acceptable: 200-500ms
- ❌ Slow: > 500ms

### Check for Unnecessary Requests

1. Open Network tab
2. Reload page
3. Count requests:
   - Each service endpoint should be called once
   - No duplicate requests
   - No requests to wrong URLs

---

## Next Steps

### Immediate (This Session)

1. ✅ Set up `.env` with API URL
2. ⏳ Start dev server: `npm run dev`
3. ⏳ Test in browser console (Steps 2-3)
4. ⏳ Navigate to `/announcement` and verify announcements load
5. ⏳ Check Network tab for correct API calls

### Short Term

- [ ] Update Home page HeroCarousel to use API
- [ ] Update Blog page to use API (if not already)
- [ ] Update Events page to use API (if not already)
- [ ] Test all public pages load from API

### Later

- [ ] Implement login system
- [ ] Test admin endpoints
- [ ] Set up error alerts for users
- [ ] Implement data refresh/pagination

---

## Files Reference

| File | Purpose |
|------|---------|
| `src/lib/apiClient.js` | Core API client - handles all HTTP requests |
| `src/services/announcementsService.js` | Announcements endpoints |
| `src/services/heroSlidesService.js` | Hero carousel endpoints |
| `src/services/*.js` | Other service endpoints |
| `src/pages/announcement/AnnouncementPage.jsx` | List page (already integrated ✅) |
| `src/pages/announcement/AnnouncementDetailPage.jsx` | Detail page (already integrated ✅) |
| `.env` | Environment variables |

---

## Quick Command Reference

```bash
# Install dependencies
npm install

# Start dev server (then go to http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## Support

If you encounter issues:

1. **Check backend logs** - most errors originate from backend
2. **Check browser console** - error messages are logged there
3. **Check Network tab** - see exact requests and responses
4. **Verify `.env`** - ensure `VITE_API_URL` is set correctly
5. **Restart dev server** - changes to `.env` require restart

Good luck! 🚀
