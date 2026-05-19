# Blog API Endpoints Reference

Complete API endpoint documentation for blog operations.

## Base URL

```
{VITE_API_URL}/blog
```

Example: `http://localhost:8080/blog` or `http://app.comdevhub-api.com/v1/blog`

---

## PUBLIC ENDPOINTS (No Authentication)

### GET /blog

Retrieve paginated list of published blog posts.

**Parameters:**
- `page` (query, optional): Page number, default: 1
- `limit` (query, optional): Posts per page, default: 9

**Example Request:**
```bash
GET http://localhost:8080/blog?page=1&limit=9
```

**Example Response (200 OK):**
```json
{
  "success": true,
  "message": "Posts retrieved successfully",
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "Project Success Story",
        "slug": "project-success-story",
        "excerpt": "Learn how our community project achieved success...",
        "category": "Development",
        "image": "blog/project-success.jpg",
        "published_at": "2024-01-15T10:30:00Z",
        "views": 250
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 9,
      "total": 45,
      "total_pages": 5
    }
  }
}
```

---

### GET /blog/featured

Retrieve featured blog posts for homepage.

**Parameters:**
- `limit` (query, optional): Number of featured posts, default: 3

**Example Request:**
```bash
GET http://localhost:8080/blog/featured?limit=3
```

**Example Response (200 OK):**
```json
{
  "success": true,
  "message": "Featured posts retrieved successfully",
  "data": {
    "posts": [
      {
        "id": 2,
        "title": "Community Impact Report",
        "slug": "community-impact-report",
        "excerpt": "Q1 impact metrics and achievements",
        "category": "News",
        "image": "blog/impact-report.jpg",
        "views": 500
      }
    ]
  }
}
```

---

### GET /blog/categories

Retrieve all available blog categories.

**Example Request:**
```bash
GET http://localhost:8080/blog/categories
```

**Example Response (200 OK):**
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": {
    "categories": [
      "Development",
      "Infrastructure",
      "Community",
      "Events",
      "News",
      "Technology"
    ]
  }
}
```

---

### GET /blog/:slug

Retrieve single blog post by slug.

**Path Parameters:**
- `slug` (required): Post slug

**Example Request:**
```bash
GET http://localhost:8080/blog/project-success-story
```

**Example Response (200 OK):**
```json
{
  "success": true,
  "message": "Post retrieved successfully",
  "data": {
    "post": {
      "id": 1,
      "title": "Project Success Story",
      "slug": "project-success-story",
      "excerpt": "Learn how our community project achieved success...",
      "content": "<p>Full post content with HTML...</p>",
      "category": "Development",
      "tags": ["success", "community", "project"],
      "image": "blog/project-success.jpg",
      "status": "published",
      "published_at": "2024-01-15T10:30:00Z",
      "created_at": "2024-01-10T08:00:00Z",
      "updated_at": "2024-01-15T10:30:00Z",
      "views": 250,
      "author": "John Doe"
    }
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Post not found"
}
```

---

## ADMIN ENDPOINTS (Authentication Required)

### GET /admin/blog

Retrieve all blog posts including drafts (admin only).

**Headers:**
- `Authorization: Bearer {token}` (required)

**Parameters:**
- `page` (query, optional): Page number, default: 1
- `limit` (query, optional): Posts per page, default: 10
- `status` (query, optional): Filter by status: "draft", "published"

**Example Request:**
```bash
GET http://localhost:8080/admin/blog?page=1&limit=10&status=draft \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiI..."
```

**Example Response (200 OK):**
```json
{
  "success": true,
  "message": "Posts retrieved successfully",
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "Project Success Story",
        "status": "published",
        "category": "Development",
        "author": "John Doe"
      },
      {
        "id": 3,
        "title": "Draft Post",
        "status": "draft",
        "category": "News",
        "author": "Jane Doe"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 52,
      "total_pages": 6
    }
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Unauthorized - Invalid or missing token"
}
```

---

### GET /admin/blog/:id

Retrieve single post by ID for editing (admin only).

**Headers:**
- `Authorization: Bearer {token}` (required)

**Path Parameters:**
- `id` (required): Post ID

**Example Request:**
```bash
GET http://localhost:8080/admin/blog/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiI..."
```

**Example Response (200 OK):**
```json
{
  "success": true,
  "message": "Post retrieved successfully",
  "data": {
    "post": {
      "id": 1,
      "title": "Project Success Story",
      "slug": "project-success-story",
      "excerpt": "Learn how...",
      "content": "<p>Full content</p>",
      "category": "Development",
      "tags": ["success", "community"],
      "image": "blog/project-success.jpg",
      "status": "published",
      "published_at": "2024-01-15T10:30:00Z",
      "author": "John Doe"
    }
  }
}
```

---

### POST /admin/blog

Create new blog post (admin only).

**Headers:**
- `Authorization: Bearer {token}` (required)
- `Content-Type: application/json` (for JSON)
- `Content-Type: multipart/form-data` (for file upload)

**Request Body (JSON):**
```json
{
  "title": "New Article",
  "content": "<p>Post content</p>",
  "excerpt": "Short preview",
  "category": "Development",
  "tags": ["react", "vite"],
  "status": "draft",
  "author": "Jane Doe"
}
```

**Request Body (FormData with File):**
```
title: "New Article"
content: "<p>Post content</p>"
excerpt: "Short preview"
category: "Development"
tags: ["react", "vite"]
status: "draft"
author: "Jane Doe"
image: <File>
```

**Example Request (JSON):**
```bash
curl -X POST http://localhost:8080/admin/blog \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiI..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Article",
    "content": "<p>Content</p>",
    "excerpt": "Preview",
    "category": "Development",
    "status": "draft"
  }'
```

**Example Request (FormData with file):**
```bash
curl -X POST http://localhost:8080/admin/blog \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiI..." \
  -F "title=New Article" \
  -F "content=<p>Content</p>" \
  -F "category=Development" \
  -F "image=@image.jpg"
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "post": {
      "id": 10,
      "title": "New Article",
      "slug": "new-article",
      "status": "draft",
      "category": "Development"
    }
  }
}
```

---

### PUT /admin/blog/:id

Update existing blog post (admin only).

**Headers:**
- `Authorization: Bearer {token}` (required)

**Path Parameters:**
- `id` (required): Post ID

**Request Body:** Same as POST (only include fields to update)

**Example Request:**
```bash
curl -X PUT http://localhost:8080/admin/blog/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiI..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "status": "published"
  }'
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Post updated successfully",
  "data": {
    "post": {
      "id": 1,
      "title": "Updated Title",
      "status": "published"
    }
  }
}
```

---

### DELETE /admin/blog/:id

Delete blog post (admin only).

**Headers:**
- `Authorization: Bearer {token}` (required)

**Path Parameters:**
- `id` (required): Post ID

**Example Request:**
```bash
curl -X DELETE http://localhost:8080/admin/blog/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiI..."
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

---

### POST /admin/blog/:id/publish

Publish a draft post (admin only).

**Headers:**
- `Authorization: Bearer {token}` (required)

**Example Request:**
```bash
curl -X POST http://localhost:8080/admin/blog/1/publish \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiI..."
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Post published successfully",
  "data": {
    "post": {
      "id": 1,
      "status": "published",
      "published_at": "2024-01-20T15:45:00Z"
    }
  }
}
```

---

### POST /admin/blog/:id/archive

Archive a post (admin only).

**Headers:**
- `Authorization: Bearer {token}` (required)

**Example Request:**
```bash
curl -X POST http://localhost:8080/admin/blog/1/archive \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiI..."
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Post archived successfully",
  "data": {
    "post": {
      "id": 1,
      "status": "archived"
    }
  }
}
```

---

## BULK OPERATIONS (Admin Only)

### POST /admin/blog/bulk/update

Update multiple posts at once (admin only).

**Headers:**
- `Authorization: Bearer {token}` (required)
- `Content-Type: application/json`

**Request Body:**
```json
{
  "ids": [1, 2, 3],
  "status": "published",
  "category": "News"
}
```

**Example Response (200 OK):**
```json
{
  "success": true,
  "message": "3 posts updated successfully",
  "data": {
    "count": 3
  }
}
```

---

### POST /admin/blog/bulk/delete

Delete multiple posts at once (admin only).

**Headers:**
- `Authorization: Bearer {token}` (required)
- `Content-Type: application/json`

**Request Body:**
```json
{
  "ids": [1, 2, 3]
}
```

**Example Response (200 OK):**
```json
{
  "success": true,
  "message": "3 posts deleted successfully",
  "data": {
    "count": 3
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed: title is required"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized - Invalid or missing token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Post not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Status Codes Summary

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Backend error |

---

## Authentication

Admin endpoints require a valid authentication token in the Authorization header:

```
Authorization: Bearer {token}
```

Tokens are obtained through the authentication system and stored in localStorage. The API client automatically includes them in admin requests.

---

## Testing Commands

### Test Featured Posts (Public)
```bash
curl http://localhost:8080/blog/featured?limit=3
```

### Test Get All Posts (Public)
```bash
curl http://localhost:8080/blog?page=1&limit=9
```

### Test Get Single Post (Public)
```bash
curl http://localhost:8080/blog/your-post-slug
```

### Test Create Post (Admin)
```bash
curl -X POST http://localhost:8080/admin/blog \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"<p>Test</p>","category":"News"}'
```

---

## Pagination Details

The API returns pagination information for list endpoints:

```json
"pagination": {
  "page": 1,           // Current page number
  "limit": 9,          // Items per page
  "total": 45,         // Total items
  "total_pages": 5     // Total pages available
}
```

Use these values to:
- Track current position
- Calculate if more pages exist: `page < total_pages`
- Implement pagination UI with previous/next buttons

---

## Field Constraints

When creating/updating posts, fields must meet these requirements:

| Field | Type | Required | Max Length | Notes |
|-------|------|----------|------------|-------|
| title | string | Yes | 200 | Used to generate slug |
| content | string | Yes | 50000 | HTML content allowed |
| excerpt | string | Yes | 500 | Short preview text |
| category | string | Yes | 100 | Must exist in categories |
| tags | array | No | 10 items | Autocomplete suggestions |
| status | string | No | - | "draft" or "published" |
| author | string | No | 100 | Author name |
| image | file | No | 5MB | JPG, PNG, WebP |

---

## Related Documentation

- [BLOG_SERVICE_GUIDE.md](./BLOG_SERVICE_GUIDE.md) - Service usage examples
- [API_INTEGRATION_TESTING.md](./API_INTEGRATION_TESTING.md) - Testing guide
- [API_CLIENT_README.md](./API_CLIENT_README.md) - API client implementation
