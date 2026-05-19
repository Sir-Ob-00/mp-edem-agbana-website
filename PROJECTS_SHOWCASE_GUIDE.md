# Projects Showcase Feature Guide

## Overview

The **Projects Showcase** is a featured component on the home page that displays up to 4 featured development projects from your backend API. It's fully functional and ready to use with your backend.

---

## 🎯 What It Does

✅ Fetches featured projects from `/projects/featured` endpoint  
✅ Displays projects in a beautiful card grid layout  
✅ Shows project status with color-coded badges  
✅ Shows sector, location, and timeline information  
✅ Click to see detailed project information  
✅ Responsive design (mobile, tablet, desktop)  
✅ Loading skeleton while fetching  
✅ Error handling with fallback  

---

## 📁 Files Involved

```
src/components/home/
├── ProjectsShowcase.jsx        ✅ Main showcase component
├── ProjectDetailsModal.jsx     ✅ Modal for project details

src/services/
└── projectsService.js          ✅ Project API service

src/pages/
└── Home.jsx                    ✅ Integrated into home page
```

---

## 🔄 How It Works

### Component Flow

```
Home.jsx
  ↓
ProjectsShowcase.jsx
  ↓
projectsService.getFeaturedProjects(4)
  ↓
apiClient('/projects/featured?limit=4')
  ↓
Backend: GET http://localhost:8080/projects/featured?limit=4
  ↓
Response: { success: true, data: { projects: [...] } }
  ↓
Render cards with animations
```

### Data Flow

1. **Component Mounts** → `useEffect` runs
2. **Fetch Data** → Calls `projectsService.getFeaturedProjects(4)`
3. **Show Loading** → Displays skeleton cards while loading
4. **Render Projects** → Maps over returned projects
5. **Click Handler** → Opens modal with full project details
6. **Close Modal** → Sets selected project back to null

---

## 📊 API Response Format

### Request
```http
GET /projects/featured?limit=4
```

### Response (200 OK)
```json
{
  "success": true,
  "message": "Featured projects retrieved successfully",
  "data": {
    "projects": [
      {
        "id": 1,
        "title": "Community Water System",
        "slug": "community-water-system",
        "description": "Installation of water supply lines...",
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
      },
      // ... more projects
    ]
  }
}
```

---

## 🎨 Visual Features

### Card Layout

```
┌─────────────────────────┐
│  [Project Image]        │ ← h-56 (image area)
├─────────────────────────┤
│ Infrastructure | ONGOING│ ← Sector + Status badge
├─────────────────────────┤
│ Project Title Here      │ ← Title (max 2 lines)
├─────────────────────────┤
│ Project description ... │ ← Description (max 2 lines)
├─────────────────────────┤
│ Location: Downtown      │ ← Location
│ Timeline: Jan · Jun 2024│ ← Timeline
└─────────────────────────┘
```

### Status Colors

| Status | Color Class | Badge Color |
|--------|-------------|-------------|
| ongoing | emerald-100 text-emerald-700 | 🟢 Green |
| completed | blue-100 text-blue-700 | 🔵 Blue |
| planning | amber-100 text-amber-700 | 🟡 Amber |
| on_hold | slate-100 text-slate-700 | ⚪ Gray |

### Animations

- **Card Entry**: Fade in with staggered delay (0.15s per card)
- **Hover Effect**: Cards translate up slightly on hover
- **Image Zoom**: Images scale on hover for better UX
- **Title Color**: Changes to emerald-600 on hover

---

## 💻 Code Example: Using the Component

### In Home Page (Already Integrated)

```javascript
import ProjectsShowcase from "../components/home/ProjectsShowcase";

function Home() {
  return (
    <main>
      <HeroCarousel />
      <ProjectsShowcase />
      <Footer />
    </main>
  );
}
```

### Component Usage

```javascript
// The component handles everything internally:
// - Fetching data
// - Loading state
// - Error handling
// - Modal for details

<ProjectsShowcase />
// No props needed - it's self-contained!
```

---

## 🧪 Testing

### Manual Testing Steps

1. **Start Backend**
   ```bash
   # Backend should respond to:
   curl http://localhost:8080/projects/featured?limit=4
   ```

2. **Start Frontend**
   ```bash
   npm run dev
   # Opens http://localhost:5173
   ```

3. **Navigate to Home**
   - Visit http://localhost:5173
   - Should see "Featured Projects" section

4. **Verify Loading**
   - Page loads, skeleton cards briefly appear
   - After ~1-2 seconds, real projects appear

5. **Verify Data**
   - Open DevTools (F12) → Network tab
   - Look for request to `/projects/featured?limit=4`
   - Should show 200 OK response

6. **Test Interactions**
   - Hover over cards → Should translate up
   - Hover over images → Should zoom slightly
   - Click card → Modal opens with full details
   - Close modal → Modal closes

---

## 🔌 Using the Projects Service

### Fetch Featured Projects

```javascript
import projectsService from '../services/projectsService.js'

// Get 4 featured projects
const response = await projectsService.getFeaturedProjects(4)
console.log(response.data.projects)
```

### Fetch All Public Projects

```javascript
// With filters
const response = await projectsService.getPublicProjects({
  status: 'ongoing',
  sector: 1,
  page: 1,
  limit: 10
})
```

### Get Project Statistics

```javascript
const stats = await projectsService.getProjectStatistics()
console.log(stats.data) // { total: 45, ongoing: 20, completed: 15, planning: 10, by_sector: [...] }
```

### Get Single Project

```javascript
const response = await projectsService.getProjectBySlug('community-water-system')
console.log(response.data.project)
```

---

## 👨‍💼 Admin Features (When Authentication Ready)

### Create Project

```javascript
const newProject = {
  title: "New Infrastructure",
  description: "Project description",
  sector_id: 1,
  location: "City Center",
  status: "planning",
  start_date: "2024-06-01",
  end_date: "2024-12-31",
  budget: 100000,
  is_featured: true
}

const response = await projectsService.createProject(newProject)
```

### With Image

```javascript
const formData = new FormData()
formData.append('title', 'New Project')
formData.append('image', fileInput.files[0])
// ... other fields
const response = await projectsService.createProject(formData)
```

### Update Project

```javascript
await projectsService.updateProject(1, {
  status: 'ongoing',
  progress_percent: 50
})
```

### Delete Project

```javascript
await projectsService.deleteProject(1)
```

### Bulk Operations

```javascript
// Update multiple projects
await projectsService.bulkUpdateProjects([1, 2, 3], {
  status: 'completed'
})

// Delete multiple projects
await projectsService.bulkDeleteProjects([4, 5, 6])
```

---

## 🔧 ProjectsShowcase Component Props

The component is **self-contained** and doesn't require props:

```javascript
// All props are optional/ignored
<ProjectsShowcase />

// Component manages:
// - Fetching data
// - Loading state
// - Error state
// - Modal state
// - All interactions
```

### Internal State

```javascript
const [projects, setProjects] = useState([])           // Projects to display
const [isLoading, setIsLoading] = useState(true)      // Loading state
const [error, setError] = useState(null)              // Error message
const [selectedProject, setSelectedProject] = useState(null) // For modal
```

---

## 📱 Responsive Design

### Breakpoints

| Screen | Columns | Layout |
|--------|---------|--------|
| Mobile (< 640px) | 1 | Stacked |
| Tablet (640px - 1024px) | 2 | 2 columns |
| Desktop (> 1024px) | 3 | 3 columns |

**Code**: `md:grid-cols-2 lg:grid-cols-3`

---

## ⚠️ Error Handling

### If API Fails

The component **silently fails** (returns null) and shows nothing:

```javascript
if (error) return null; // No error display (intentional)
```

This prevents breaking the home page if projects aren't available.

### Debugging Errors

1. Open browser console (F12)
2. Check for logged errors:
   ```
   Error: Failed to fetch featured projects
   ```
3. Check Network tab for API request
4. Verify backend is responding

---

## 🎯 Backend Requirements

Your backend **must** implement:

```http
GET /projects/featured?limit=4
```

**Returns**: Array of projects marked with `is_featured: true`

**Response Format**:
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": 1,
        "title": "...",
        "slug": "...",
        "description": "...",
        "location": "...",
        "status": "ongoing|completed|planning|on_hold",
        "sector": { "id": 1, "name": "..." },
        "image": "url-to-image.jpg",
        "start_date": "2024-01-15T00:00:00Z",
        "end_date": "2024-06-15T00:00:00Z",
        // ... other fields
      }
    ]
  }
}
```

---

## 📊 Display Features

### Information Shown

| Item | Source | Display |
|------|--------|---------|
| Image | project.image | Hero image (h-56) |
| Sector | project.sector.name | Top-left badge |
| Status | project.status | Top-right colored badge |
| Title | project.title | Large heading (2 lines max) |
| Description | project.description | Truncated text (2 lines max) |
| Location | project.location | "Location: ..." |
| Timeline | start_date, end_date | "Jan · Jun 2024" |

### Helper Functions

```javascript
// Format dates
formatDate(project.start_date) // "Jan 2024"

// Get status colors
getStatusColor('ongoing')  // "bg-emerald-100 text-emerald-700"

// Clean HTML from description
cleanupHtml(project.description) // Strip HTML tags
```

---

## 🚀 Customization

### Change Number of Projects

```javascript
// In ProjectsShowcase.jsx, line 46:
const response = await projectsService.getFeaturedProjects(4) // Change 4 to desired number
```

### Change Grid Layout

```javascript
// In ProjectsShowcase.jsx, line 103:
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {/* Change lg:grid-cols-3 to your preferred columns */}
</div>
```

### Change Colors

```javascript
// Modify getStatusColor function
case "ongoing":
  return "bg-emerald-100 text-emerald-700" // Change colors here
```

### Disable Modal

```javascript
// Remove or comment out:
<ProjectDetailsModal
  project={selectedProject}
  isOpen={!!selectedProject}
  onClose={() => setSelectedProject(null)}
/>
```

---

## 🐛 Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Projects not showing | Backend not running | Start backend on `http://localhost:8080` |
| Shows "Failed to fetch" | API endpoint wrong | Check `/projects/featured` exists |
| Loading skeleton stuck | Network error | Check Network tab in DevTools |
| Modal doesn't open | Component error | Check browser console for JS errors |
| Images not loading | Wrong image URL | Verify image path in response |

---

## 📚 Related Files

- **Component**: `src/components/home/ProjectsShowcase.jsx`
- **Service**: `src/services/projectsService.js`
- **Modal**: `src/components/projects/ProjectDetailsModal.jsx`
- **Home Page**: `src/pages/Home.jsx`

---

## ✅ Checklist

Before deploying, verify:

- [ ] Backend `/projects/featured?limit=4` endpoint works
- [ ] Returns correct project data format
- [ ] Images load properly
- [ ] Status badges show correct colors
- [ ] Modal opens when clicking card
- [ ] Component appears on home page
- [ ] No console errors
- [ ] Responsive on mobile/tablet/desktop

---

## 🎉 Summary

The **Projects Showcase** is a complete, production-ready component that:

✅ Fetches from your backend  
✅ Displays featured projects beautifully  
✅ Handles loading and errors  
✅ Shows detailed information in modal  
✅ Fully responsive  
✅ Animated and interactive  

**Just ensure your backend implements `/projects/featured` endpoint and you're ready to go!** 🚀
