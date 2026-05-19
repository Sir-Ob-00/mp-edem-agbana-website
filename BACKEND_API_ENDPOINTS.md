# Backend API Endpoints Reference

This document lists all the API endpoints that the React frontend expects from your backend. Use this to verify your backend implementation or as a template for building missing endpoints.

## Base URL

```
http://localhost:8080
```

All endpoints are relative to this URL.

---

## Announcements API

### Public Routes (No Authentication)

#### Get All Public Announcements
```http
GET /announcements/public?priority=urgent&category=Infrastructure&page=1&limit=20
```

**Query Parameters**:
- `priority` (optional): `low`, `medium`, `high`, `urgent`
- `category` (optional): Any category string
- `page` (optional): Page number, default 1
- `limit` (optional): Results per page, default 20

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Announcements retrieved successfully",
  "data": {
    "announcements": [
      {
        "id": 1,
        "title": "Infrastructure Update",
        "slug": "infrastructure-update",
        "content": "<p>HTML content here</p>",
        "category": "Infrastructure",
        "priority": "urgent",
        "status": "published",
        "publish_date": "2024-01-15T10:00:00Z",
        "expiry_date": null,
        "image_url": "https://example.com/image.jpg",
        "created_at": "2024-01-15T10:00:00Z",
        "updated_at": "2024-01-15T10:00:00Z",
        "published_at": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "total_pages": 1
    }
  }
}
```

#### Get Single Announcement by Slug
```http
GET /announcements/{slug}
```

**URL Parameters**:
- `slug`: The announcement slug (e.g., `infrastructure-update`)

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Announcement retrieved successfully",
  "data": {
    "announcement": {
      "id": 1,
      "title": "Infrastructure Update",
      "slug": "infrastructure-update",
      "content": "<p>HTML content here</p>",
      "category": "Infrastructure",
      "priority": "urgent",
      "status": "published",
      "publish_date": "2024-01-15T10:00:00Z",
      "expiry_date": null,
      "image_url": "https://example.com/image.jpg",
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z",
      "published_at": "2024-01-15T10:00:00Z"
    }
  }
}
```

#### Get Featured Announcements
```http
GET /announcements/featured?limit=5
```

**Query Parameters**:
- `limit` (optional): Number of featured announcements to return

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Featured announcements retrieved",
  "data": {
    "announcements": [ /* array of announcements */ ]
  }
}
```

### Admin Routes (Authentication Required)

**Headers Required**:
```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

#### Get All Announcements (Admin)
```http
GET /admin/announcements?status=draft&priority=high&page=1&limit=20
```

**Query Parameters**:
- `status` (optional): `draft`, `published`, `archived`
- `priority` (optional): `low`, `medium`, `high`, `urgent`
- `category` (optional): Category string
- `page` (optional): Page number
- `limit` (optional): Results per page

**Response** (200 OK): Same as public announcements

#### Get Announcement by ID
```http
GET /admin/announcements/{id}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Announcement retrieved",
  "data": {
    "announcement": { /* announcement object */ }
  }
}
```

#### Create Announcement
```http
POST /admin/announcements
Content-Type: application/json

{
  "title": "New Announcement",
  "content": "<p>HTML content</p>",
  "category": "General",
  "priority": "high",
  "status": "draft",
  "publish_date": "2024-01-20T10:00:00Z",
  "expiry_date": "2024-02-20T10:00:00Z"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Announcement created successfully",
  "data": {
    "announcement": { /* created announcement */ }
  }
}
```

#### Create Announcement with Image
```http
POST /admin/announcements
Content-Type: multipart/form-data

Form Fields:
- title: "New Announcement"
- content: "<p>HTML content</p>"
- category: "General"
- priority: "high"
- status: "draft"
- image: [File object]
```

**Response** (201 Created): Same as above

#### Update Announcement
```http
PUT /admin/announcements/{id}
Content-Type: application/json

{
  "title": "Updated Title",
  "priority": "urgent"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Announcement updated successfully",
  "data": {
    "announcement": { /* updated announcement */ }
  }
}
```

#### Update Announcement with Image
```http
PUT /admin/announcements/{id}
Content-Type: multipart/form-data

Form Fields:
- title: "Updated Title"
- image: [File object]
```

**Response** (200 OK): Same as above

#### Delete Announcement
```http
DELETE /admin/announcements/{id}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Announcement deleted successfully"
}
```

#### Publish Announcement
```http
POST /admin/announcements/{id}/publish
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Announcement published successfully",
  "data": {
    "announcement": { /* announcement with status: published */ }
  }
}
```

#### Archive Announcement
```http
POST /admin/announcements/{id}/archive
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Announcement archived successfully",
  "data": {
    "announcement": { /* announcement with status: archived */ }
  }
}
```

#### Bulk Update Announcements
```http
POST /admin/announcements/bulk/update
Content-Type: application/json

{
  "ids": [1, 2, 3],
  "data": {
    "status": "published",
    "priority": "high"
  }
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Announcements updated successfully",
  "data": {
    "count": 3
  }
}
```

#### Bulk Delete Announcements
```http
POST /admin/announcements/bulk/delete
Content-Type: application/json

{
  "ids": [1, 2, 3]
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Announcements deleted successfully",
  "data": {
    "count": 3
  }
}
```

---

## Hero Slides API

### Public Routes

#### Get Active Hero Slides
```http
GET /hero-slides
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Hero slides retrieved successfully",
  "data": {
    "slides": [
      {
        "id": 1,
        "title": "Welcome",
        "subtitle": "To our community",
        "image": "https://example.com/slide1.jpg",
        "cta_text": "Learn More",
        "cta_link": "/about",
        "display_order": 1,
        "status": "active",
        "created_at": "2024-01-15T10:00:00Z",
        "updated_at": "2024-01-15T10:00:00Z"
      }
    ]
  }
}
```

### Admin Routes (Authentication Required)

#### Get All Hero Slides
```http
GET /admin/hero-slides
```

**Response** (200 OK): Same structure as public

#### Get Hero Slide by ID
```http
GET /admin/hero-slides/{id}
```

#### Create Hero Slide
```http
POST /admin/hero-slides
Content-Type: application/json

{
  "title": "Welcome",
  "subtitle": "To our community",
  "image": "https://example.com/slide.jpg",
  "cta_text": "Learn More",
  "cta_link": "/about",
  "display_order": 1,
  "status": "active"
}
```

#### Update Hero Slide
```http
PUT /admin/hero-slides/{id}
Content-Type: application/json
X-HTTP-Method-Override: PUT

{
  "title": "Updated Title"
}
```

#### Delete Hero Slide
```http
DELETE /admin/hero-slides/{id}
```

#### Reorder Hero Slides
```http
PUT /admin/hero-slides/reorder
Content-Type: application/json

{
  "order": [3, 1, 2]
}
```

---

## Blog API

### Public Routes

#### Get All Public Blogs
```http
GET /blogs/public?category=Tech&page=1&limit=10
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Blogs retrieved successfully",
  "data": {
    "blogs": [
      {
        "id": 1,
        "title": "Blog Title",
        "slug": "blog-title",
        "content": "<p>HTML content</p>",
        "category": "Tech",
        "author": "John Doe",
        "image_url": "https://example.com/blog.jpg",
        "status": "published",
        "created_at": "2024-01-15T10:00:00Z",
        "published_at": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": { /* pagination object */ }
  }
}
```

#### Get Blog by Slug
```http
GET /blogs/{slug}
```

---

## Events API

### Public Routes

#### Get All Public Events
```http
GET /events/public?status=upcoming&page=1&limit=10
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Events retrieved successfully",
  "data": {
    "events": [
      {
        "id": 1,
        "title": "Event Title",
        "description": "Event description",
        "start_date": "2024-02-01T10:00:00Z",
        "end_date": "2024-02-01T12:00:00Z",
        "location": "Event location",
        "image_url": "https://example.com/event.jpg",
        "status": "upcoming",
        "created_at": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": { /* pagination object */ }
  }
}
```

---

## Gallery API

### Public Routes

#### Get All Public Galleries
```http
GET /galleries/public?category=Events&page=1&limit=10
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Galleries retrieved successfully",
  "data": {
    "galleries": [
      {
        "id": 1,
        "title": "Gallery Title",
        "slug": "gallery-title",
        "description": "Gallery description",
        "category": "Events",
        "cover_image": "https://example.com/cover.jpg",
        "image_count": 12,
        "created_at": "2024-01-15T10:00:00Z"
      }
    ]
  }
}
```

#### Get Gallery by Slug with Images
```http
GET /galleries/{slug}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Gallery retrieved successfully",
  "data": {
    "gallery": {
      "id": 1,
      "title": "Gallery Title",
      "slug": "gallery-title",
      "images": [
        {
          "id": 1,
          "url": "https://example.com/image1.jpg",
          "caption": "Image caption",
          "display_order": 1
        }
      ]
    }
  }
}
```

---

## Ideas API

### Public Routes

#### Get All Public Ideas
```http
GET /ideas/public?status=approved&page=1&limit=10
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Ideas retrieved successfully",
  "data": {
    "ideas": [
      {
        "id": 1,
        "title": "Idea Title",
        "description": "Idea description",
        "category": "Infrastructure",
        "status": "approved",
        "votes": 25,
        "created_at": "2024-01-15T10:00:00Z"
      }
    ]
  }
}
```

---

## Youth API

### Public Routes

#### Get All Public Youth Programs
```http
GET /youth/public?category=Education&page=1&limit=10
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Youth programs retrieved successfully",
  "data": {
    "programs": [
      {
        "id": 1,
        "title": "Program Title",
        "description": "Program description",
        "category": "Education",
        "image_url": "https://example.com/program.jpg",
        "created_at": "2024-01-15T10:00:00Z"
      }
    ]
  }
}
```

---

## General Response Format

All endpoints follow this general response structure:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // endpoint-specific data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

---

## HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful GET, PUT, POST |
| 201 | Created | Successful POST creating new resource |
| 400 | Bad Request | Invalid query parameters |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | User lacks permission |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Backend error |

---

## Authentication

For admin endpoints, include:
```
Authorization: Bearer {jwt_token}
```

The token is obtained from a login endpoint (not listed here - implement as needed):
```http
POST /login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

## CORS Requirements

Frontend runs on: `http://localhost:5173`

Backend must allow:
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Authorization, Content-Type
Access-Control-Allow-Credentials: true
```

---

## File Upload

For endpoints that support image uploads:

1. Use `multipart/form-data` Content-Type
2. Include file in form field (e.g., `image`)
3. API client automatically handles this when FormData is detected

Example:
```javascript
const formData = new FormData()
formData.append('title', 'New Announcement')
formData.append('image', fileInput.files[0])

const response = await fetch('http://localhost:8080/admin/announcements', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer token'
  },
  body: formData
})
```

---

## Testing the API

Use curl:
```bash
# Get public announcements
curl http://localhost:8080/announcements/public

# Get admin announcements (with auth)
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:8080/admin/announcements

# Create announcement
curl -X POST http://localhost:8080/admin/announcements \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Test",
       "content": "Test content",
       "category": "General",
       "priority": "high",
       "status": "draft"
     }'
```

Or use Postman/Insomnia:
1. Create new request
2. Set method (GET, POST, PUT, DELETE)
3. Set URL (e.g., `http://localhost:8080/announcements/public`)
4. Add Authorization header if needed
5. Send request

---

## Implementation Checklist

- [ ] GET /announcements/public
- [ ] GET /announcements/{slug}
- [ ] GET /announcements/featured
- [ ] GET /admin/announcements
- [ ] GET /admin/announcements/{id}
- [ ] POST /admin/announcements
- [ ] PUT /admin/announcements/{id}
- [ ] DELETE /admin/announcements/{id}
- [ ] POST /admin/announcements/{id}/publish
- [ ] POST /admin/announcements/{id}/archive
- [ ] POST /admin/announcements/bulk/update
- [ ] POST /admin/announcements/bulk/delete
- [ ] GET /hero-slides
- [ ] GET /admin/hero-slides
- [ ] POST /admin/hero-slides
- [ ] PUT /admin/hero-slides/{id}
- [ ] DELETE /admin/hero-slides/{id}
- [ ] PUT /admin/hero-slides/reorder
- [ ] GET /blogs/public
- [ ] GET /blogs/{slug}
- [ ] GET /events/public
- [ ] GET /galleries/public
- [ ] GET /galleries/{slug}
- [ ] GET /ideas/public
- [ ] GET /youth/public

---

## Notes

- All datetime fields use ISO 8601 format (UTC)
- All responses are JSON
- Slugs are URL-friendly versions of titles (lowercase, hyphens instead of spaces)
- The `_method=PUT` trick may be needed if backend doesn't support PUT with FormData
- Pagination defaults: page=1, limit=20
- Empty arrays are returned as `[]` not `null`
