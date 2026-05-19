# Gallery API Endpoints Reference

Complete API endpoint documentation for gallery operations.

## Base URL

```
{VITE_API_URL}/gallery
```

Example: `http://localhost:8080/gallery` or `http://app.comdevhub-api.com/v1/gallery`

---

## PUBLIC ENDPOINTS (No Authentication)

### GET /gallery

Retrieve list of galleries with optional filtering.

**Parameters:**
- `category` (query, optional): Filter by category
- `page` (query, optional): Page number, default: 1
- `limit` (query, optional): Items per page, default: 12

**Example Request:**
```bash
GET http://localhost:8080/gallery?category=Events&page=1&limit=12
```

**Example Response (200 OK):**
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
        "description": "Our annual community event",
        "category": "Events",
        "date": "2024-01-15",
        "location": "Community Center",
        "cover_image": "gallery/annual-event.jpg",
        "images": [
          {
            "url": "gallery/photo1.jpg",
            "caption": "Opening ceremony"
          }
        ],
        "status": "active"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 45,
      "total_pages": 4
    }
  }
}
```

---

### GET /gallery/featured

Retrieve featured/latest galleries for homepage.

**Parameters:**
- `limit` (query, optional): Number of galleries, default: 4

**Example Request:**
```bash
GET http://localhost:8080/gallery/featured?limit=4
```

**Example Response (200 OK):**
```json
{
  "success": true,
  "message": "Featured galleries retrieved successfully",
  "data": {
    "galleries": [
      {
        "id": 1,
        "title": "Annual Event 2024",
        "slug": "annual-event-2024",
        "category": "Events",
        "date": "2024-01-15",
        "cover_image": "gallery/event.jpg",
        "status": "active"
      }
    ]
  }
}
```

---

### GET /gallery/categories

Retrieve all gallery categories.

**Example Request:**
```bash
GET http://localhost:8080/gallery/categories
```

**Example Response (200 OK):**
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": {
    "categories": [
      "Events",
      "Programs",
      "Community",
      "Infrastructure",
      "General"
    ]
  }
}
```

---

### GET /gallery/:idOrSlug

Retrieve single gallery by ID or slug.

**Path Parameters:**
- `idOrSlug` (required): Gallery ID or slug

**Example Request:**
```bash
GET http://localhost:8080/gallery/annual-event-2024
```

**Example Response (200 OK):**
```json
{
  "success": true,
  "message": "Gallery retrieved successfully",
  "data": {
    "gallery": {
      "id": 1,
      "title": "Annual Event 2024",
      "slug": "annual-event-2024",
      "description": "Our annual community event...",
      "category": "Events",
      "date": "2024-01-15",
      "location": "Community Center",
      "cover_image": "gallery/event.jpg",
      "images": [
        {
          "url": "gallery/photo1.jpg",
          "caption": "Opening ceremony"
        },
        {
          "url": "gallery/photo2.jpg",
          "caption": "Group photo"
        }
      ],
      "status": "active",
      "created_at": "2024-01-10T08:00:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Gallery not found"
}
```

---

## ADMIN ENDPOINTS (Authentication Required)

### GET /admin/gallery

Retrieve all galleries including inactive ones (admin only).

**Headers:**
- `Authorization: Bearer {token}` (required)

**Parameters:**
- `category` (query, optional): Filter by category
- `status` (query, optional): Filter by status: "active", "inactive"
- `page` (query, optional): Page number, default: 1
- `limit` (query, optional): Items per page, default: 20

**Example Request:**
```bash
GET http://localhost:8080/admin/gallery?status=inactive&page=1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiI..."
```

**Example Response (200 OK):**
```json
{
  "success": true,
  "message": "Galleries retrieved successfully",
  "data": {
    "galleries": [
      {
        "id": 1,
        "title": "Annual Event 2024",
        "status": "active",
        "category": "Events"
      },
      {
        "id": 2,
        "title": "Old Event",
        "status": "inactive",
        "category": "General"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 52,
      "total_pages": 3
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

### GET /admin/gallery/:id

Retrieve single gallery by ID for editing (admin only).

**Headers:**
- `Authorization: Bearer {token}` (required)

**Path Parameters:**
- `id` (required): Gallery ID

**Example Request:**
```bash
GET http://localhost:8080/admin/gallery/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiI..."
```

**Example Response (200 OK):**
```json
{
  "success": true,
  "message": "Gallery retrieved successfully",
  "data": {
    "gallery": {
      "id": 1,
      "title": "Annual Event 2024",
      "slug": "annual-event-2024",
      "description": "...",
      "category": "Events",
      "date": "2024-01-15",
      "location": "Community Center",
      "cover_image": "gallery/event.jpg",
      "images": [
        {
          "url": "gallery/photo1.jpg",
          "caption": "Opening"
        }
      ],
      "status": "active"
    }
  }
}
```

---

### POST /admin/gallery

Create new gallery album (admin only).

**Headers:**
- `Authorization: Bearer {token}` (required)
- `Content-Type: application/json` (for JSON)
- `Content-Type: multipart/form-data` (for file upload)

**Request Body (JSON):**
```json
{
  "title": "New Gallery",
  "description": "Gallery description",
  "category": "Events",
  "date": "2024-02-20",
  "location": "Community Center",
  "status": "active"
}
```

**Request Body (FormData with Files):**
```
title: "New Gallery"
description: "Gallery description"
category: "Events"
date: "2024-02-20"
location: "Community Center"
status: "active"
cover_image: <File>
gallery_images[]: <File1>
gallery_images[]: <File2>
gallery_captions[]: "First photo"
gallery_captions[]: "Second photo"
```

**Example Request (JSON):**
```bash
curl -X POST http://localhost:8080/admin/gallery \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiI..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Gallery",
    "category": "Events",
    "date": "2024-02-20",
    "location": "Community Center",
    "status": "active"
  }'
```

**Example Request (FormData with files):**
```bash
curl -X POST http://localhost:8080/admin/gallery \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiI..." \
  -F "title=New Gallery" \
  -F "category=Events" \
  -F "date=2024-02-20" \
  -F "location=Community Center" \
  -F "cover_image=@cover.jpg" \
  -F "gallery_images[]=@photo1.jpg" \
  -F "gallery_images[]=@photo2.jpg" \
  -F "gallery_captions[]=First photo" \
  -F "gallery_captions[]=Second photo"
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Gallery created successfully",
  "data": {
    "gallery": {
      "id": 10,
      "title": "New Gallery",
      "slug": "new-gallery",
      "category": "Events",
      "status": "active"
    }
  }
}
```

---

### PUT /admin/gallery/:id

Update existing gallery (admin only).

**Headers:**
- `Authorization: Bearer {token}` (required)

**Path Parameters:**
- `id` (required): Gallery ID

**Request Body:** Same as POST (only include fields to update)

**Example Request:**
```bash
curl -X PUT http://localhost:8080/admin/gallery/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiI..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "status": "inactive"
  }'
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Gallery updated successfully",
  "data": {
    "gallery": {
      "id": 1,
      "title": "Updated Title",
      "status": "inactive"
    }
  }
}
```

---

### DELETE /admin/gallery/:id

Delete gallery (admin only).

**Headers:**
- `Authorization: Bearer {token}` (required)

**Path Parameters:**
- `id` (required): Gallery ID

**Example Request:**
```bash
curl -X DELETE http://localhost:8080/admin/gallery/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiI..."
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Gallery deleted successfully"
}
```

---

### POST /admin/gallery/:id/activate

Activate an inactive gallery (admin only).

**Headers:**
- `Authorization: Bearer {token}` (required)

**Path Parameters:**
- `id` (required): Gallery ID

**Example Request:**
```bash
curl -X POST http://localhost:8080/admin/gallery/1/activate \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiI..."
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Gallery activated successfully",
  "data": {
    "gallery": {
      "id": 1,
      "status": "active"
    }
  }
}
```

---

### POST /admin/gallery/:id/deactivate

Deactivate an active gallery (admin only).

**Headers:**
- `Authorization: Bearer {token}` (required)

**Path Parameters:**
- `id` (required): Gallery ID

**Example Request:**
```bash
curl -X POST http://localhost:8080/admin/gallery/1/deactivate \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiI..."
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Gallery deactivated successfully",
  "data": {
    "gallery": {
      "id": 1,
      "status": "inactive"
    }
  }
}
```

---

## BULK OPERATIONS (Admin Only)

### POST /admin/gallery/bulk/update

Update multiple galleries at once (admin only).

**Headers:**
- `Authorization: Bearer {token}` (required)
- `Content-Type: application/json`

**Request Body:**
```json
{
  "ids": [1, 2, 3],
  "status": "inactive",
  "category": "General"
}
```

**Example Response (200 OK):**
```json
{
  "success": true,
  "message": "3 galleries updated successfully",
  "data": {
    "count": 3
  }
}
```

---

### POST /admin/gallery/bulk/delete

Delete multiple galleries at once (admin only).

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
  "message": "3 galleries deleted successfully",
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
  "message": "Gallery not found"
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

### Test Featured Galleries (Public)
```bash
curl http://localhost:8080/gallery/featured?limit=4
```

### Test Get All Galleries (Public)
```bash
curl http://localhost:8080/gallery?category=Events
```

### Test Get Single Gallery (Public)
```bash
curl http://localhost:8080/gallery/annual-event-2024
```

### Test Get Categories (Public)
```bash
curl http://localhost:8080/gallery/categories
```

### Test Create Gallery (Admin)
```bash
curl -X POST http://localhost:8080/admin/gallery \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","category":"Events","date":"2024-02-20","location":"Test"}'
```

---

## Pagination Details

The API returns pagination information for list endpoints:

```json
"pagination": {
  "page": 1,           // Current page number
  "limit": 12,         // Items per page
  "total": 45,         // Total items
  "total_pages": 4     // Total pages available
}
```

Use these values to:
- Track current position
- Calculate if more pages exist: `page < total_pages`
- Implement pagination UI with previous/next buttons

---

## Field Constraints

When creating/updating galleries, fields must meet these requirements:

| Field | Type | Required | Max Length | Notes |
|-------|------|----------|------------|-------|
| title | string | Yes | 200 | Gallery title |
| description | string | No | 1000 | Gallery description |
| category | string | Yes | 100 | Must exist in categories |
| date | string | Yes | - | ISO date format (YYYY-MM-DD) |
| location | string | Yes | 200 | Gallery location |
| cover_image | file | Yes | 5MB | JPG, PNG, WebP |
| gallery_images | file[] | No | 5MB each | JPG, PNG, WebP |
| gallery_captions | string[] | No | 500 each | Image captions |
| status | string | No | - | "active" or "inactive" |

---

## Related Documentation

- [GALLERY_SERVICE_GUIDE.md](./GALLERY_SERVICE_GUIDE.md) - Service usage examples
- [API_INTEGRATION_TESTING.md](./API_INTEGRATION_TESTING.md) - Testing guide
- [API_CLIENT_README.md](./API_CLIENT_README.md) - API client implementation
