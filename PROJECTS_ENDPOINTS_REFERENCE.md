# Projects API Endpoints Reference

## Base URL
```
http://localhost:8080
```

---

## Public Endpoints (No Authentication Required)

### Get All Public Projects
```http
GET /projects?status=ongoing&sector=1&page=1&limit=20
```

**Query Parameters**:
- `status` (optional): `planning`, `ongoing`, `completed`, `on_hold`
- `sector` (optional): Sector ID
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20)

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Projects retrieved successfully",
  "data": {
    "projects": [
      {
        "id": 1,
        "title": "Community Water System",
        "slug": "community-water-system",
        "description": "Installation of water supply...",
        "location": "Downtown District",
        "status": "ongoing",
        "progress_percent": 75,
        "budget": 500000,
        "spent": 375000,
        "start_date": "2024-01-15T00:00:00Z",
        "end_date": "2024-06-15T00:00:00Z",
        "sector": {
          "id": 1,
          "name": "Infrastructure"
        },
        "contractor": "BuildCo Ltd",
        "contact_person": "John Smith",
        "contact_phone": "+1234567890",
        "is_featured": true,
        "image": "https://api.example.com/images/project1.jpg",
        "gallery": ["image1.jpg", "image2.jpg"],
        "created_at": "2024-01-15T10:00:00Z",
        "updated_at": "2024-05-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "total_pages": 3
    }
  }
}
```

### Get Featured Projects
```http
GET /projects/featured?limit=4
```

**Query Parameters**:
- `limit` (optional): Number of featured projects (default: 6)

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Featured projects retrieved",
  "data": {
    "projects": [ /* array of featured projects */ ]
  }
}
```

**Used By**: ProjectsShowcase component on home page

### Get Project Statistics
```http
GET /projects/stats
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Statistics retrieved",
  "data": {
    "total": 45,
    "ongoing": 20,
    "completed": 15,
    "planning": 10,
    "by_sector": [
      {
        "id": 1,
        "name": "Infrastructure",
        "count": 25
      },
      {
        "id": 2,
        "name": "Health",
        "count": 20
      }
    ]
  }
}
```

### Get Single Project by Slug
```http
GET /projects/{slug}
```

**Example**:
```http
GET /projects/community-water-system
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Project retrieved",
  "data": {
    "project": { /* single project object */ }
  }
}
```

---

## Admin Endpoints (Authentication Required)

**Header Required**:
```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

### Get All Projects (Admin - Includes Drafts)
```http
GET /admin/projects?status=planning&page=1&limit=20
```

**Query Parameters**: Same as public projects

**Response**: Same format as public projects

### Get Project by ID (Admin)
```http
GET /admin/projects/{id}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "project": { /* project object */ }
  }
}
```

### Create Project
```http
POST /admin/projects
Content-Type: application/json

{
  "title": "New Infrastructure Project",
  "description": "Project description here",
  "sector_id": 1,
  "location": "City Center",
  "status": "planning",
  "start_date": "2024-06-01T00:00:00Z",
  "end_date": "2024-12-31T23:59:59Z",
  "budget": 100000,
  "contractor": "BuildCo Ltd",
  "contact_person": "John Smith",
  "contact_phone": "+1234567890",
  "is_featured": true
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "project": { /* created project with ID */ }
  }
}
```

### Create Project with Image
```http
POST /admin/projects
Content-Type: multipart/form-data

Form Fields:
- title: "New Project"
- description: "Description"
- sector_id: 1
- location: "City Center"
- status: "planning"
- start_date: "2024-06-01T00:00:00Z"
- end_date: "2024-12-31T23:59:59Z"
- budget: 100000
- image: [File object]
```

**Response**: Same as above

### Update Project
```http
PUT /admin/projects/{id}
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "ongoing",
  "progress_percent": 50
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": {
    "project": { /* updated project */ }
  }
}
```

### Update Project with Image
```http
PUT /admin/projects/{id}
Content-Type: multipart/form-data

Form Fields:
- title: "Updated Title"
- image: [File object]
- (other fields as needed)
```

### Delete Project
```http
DELETE /admin/projects/{id}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

### Bulk Update Projects
```http
POST /admin/projects/bulk/update
Content-Type: application/json

{
  "ids": [1, 2, 3],
  "status": "completed",
  "progress_percent": 100
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "3 projects updated",
  "data": {
    "count": 3
  }
}
```

### Bulk Delete Projects
```http
POST /admin/projects/bulk/delete
Content-Type: application/json

{
  "ids": [4, 5, 6]
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "3 projects deleted",
  "data": {
    "count": 3
  }
}
```

---

## Project Status Values

| Value | Display | Use Case |
|-------|---------|----------|
| `planning` | Planning 🟡 | Project in planning phase |
| `ongoing` | Ongoing 🟢 | Project currently in progress |
| `completed` | Completed 🔵 | Project finished |
| `on_hold` | On Hold ⚪ | Project temporarily halted |

---

## Project Data Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | number | - | Auto-generated |
| title | string | ✅ | Project title |
| slug | string | - | Auto-generated from title |
| description | string | ✅ | Can contain HTML |
| location | string | ✅ | Project location |
| status | string | ✅ | One of the values above |
| progress_percent | number | - | 0-100 |
| budget | number | ✅ | Total budget |
| spent | number | - | Amount spent so far |
| start_date | string | ✅ | ISO 8601 format |
| end_date | string | ✅ | ISO 8601 format |
| sector_id | number | ✅ | Foreign key to sectors |
| contractor | string | - | Contractor name |
| contact_person | string | - | Contact name |
| contact_phone | string | - | Phone number |
| is_featured | boolean | - | Featured project? |
| image | string | - | Image URL |
| gallery | array | - | Array of image URLs |
| created_at | string | - | Creation timestamp |
| updated_at | string | - | Last update timestamp |

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid project data",
  "data": null
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized - valid token required",
  "data": null
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "You don't have permission to perform this action",
  "data": null
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Project not found",
  "data": null
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "data": null
}
```

---

## HTTP Status Codes

| Code | Status | Use |
|------|--------|-----|
| 200 | OK | Successful GET, PUT |
| 201 | Created | Successful POST (creation) |
| 400 | Bad Request | Invalid data |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Permission denied |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Backend error |

---

## Testing with curl

### Get Featured Projects
```bash
curl http://localhost:8080/projects/featured?limit=4
```

### Get Project Stats
```bash
curl http://localhost:8080/projects/stats
```

### Get Single Project
```bash
curl http://localhost:8080/projects/community-water-system
```

### Create Project (with auth)
```bash
curl -X POST http://localhost:8080/admin/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Project",
    "description": "Description",
    "sector_id": 1,
    "location": "City",
    "status": "planning",
    "start_date": "2024-06-01T00:00:00Z",
    "end_date": "2024-12-31T23:59:59Z",
    "budget": 100000
  }'
```

### Delete Project (with auth)
```bash
curl -X DELETE http://localhost:8080/admin/projects/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## CORS Requirements

Frontend runs on: `http://localhost:5173`

Backend must allow:
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Authorization, Content-Type
```

---

## Implementation Checklist

### Public Endpoints
- [ ] `GET /projects` - List all public projects
- [ ] `GET /projects/featured` - Get featured projects
- [ ] `GET /projects/stats` - Get statistics
- [ ] `GET /projects/{slug}` - Get single project

### Admin Endpoints
- [ ] `GET /admin/projects` - List all projects
- [ ] `GET /admin/projects/{id}` - Get by ID
- [ ] `POST /admin/projects` - Create project
- [ ] `PUT /admin/projects/{id}` - Update project
- [ ] `DELETE /admin/projects/{id}` - Delete project
- [ ] `POST /admin/projects/bulk/update` - Bulk update
- [ ] `POST /admin/projects/bulk/delete` - Bulk delete

---

## React Service Usage

```javascript
import projectsService from '../services/projectsService.js'

// Get featured projects (for home page showcase)
const response = await projectsService.getFeaturedProjects(4)
console.log(response.data.projects)

// Get all projects with filters
const response = await projectsService.getPublicProjects({
  status: 'ongoing',
  sector: 1,
  page: 1,
  limit: 20
})

// Get stats
const stats = await projectsService.getProjectStatistics()

// Admin: Create project
await projectsService.createProject({
  title: 'New Project',
  // ... other fields
})

// Admin: Update project
await projectsService.updateProject(1, { status: 'ongoing' })

// Admin: Delete project
await projectsService.deleteProject(1)
```

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- Slugs are URL-friendly versions of titles
- Images should be absolute URLs or served from the same domain
- FormData requests don't set Content-Type (browser handles it)
- Pagination uses 1-based indexing
- Empty arrays are returned as `[]` not `null`
- Success is indicated by `"success": true` in response
