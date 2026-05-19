# Blog Service Implementation Guide

Complete guide for using the Blog Service in the React (Vite) application.

## Overview

The Blog Service provides comprehensive API integration for blog post management:
- **Public methods**: List posts, featured posts, categories, single post details
- **Admin methods**: Full CRUD operations, bulk operations, publish/archive actions
- **File handling**: Integrated image upload with FormData support
- **Authentication**: Public routes don't require auth, admin routes do

## Service Location

```
src/services/blogService.js
```

## Configuration

Blog service uses the universal API client configured in `.env`:

```env
VITE_API_URL=http://localhost:8080
# or production: http://app.comdevhub-api.com/v1
```

Full API endpoints will be:
- Public: `{VITE_API_URL}/blog/*`
- Admin: `{VITE_API_URL}/admin/blog/*`

## Public Methods

### getAllPosts(page, limit)

Get paginated list of published blog posts.

```javascript
import blogService from '../../services/blogService';

// Get first page with 9 posts per page
const response = await blogService.getAllPosts(1, 9);
// or use defaults
const response = await blogService.getAllPosts();

// Response structure
{
  success: true,
  message: "Posts retrieved successfully",
  data: {
    posts: [
      {
        id: 1,
        title: "Project Success",
        slug: "project-success",
        excerpt: "How our project succeeded...",
        content: "<p>Full HTML content...</p>",
        image: "path/to/image.jpg",
        category: "Development",
        tags: ["success", "project"],
        status: "published",
        published_at: "2024-01-15T10:30:00Z",
        views: 150,
        author: "John Doe"
      }
    ],
    pagination: {
      page: 1,
      limit: 9,
      total: 45,
      total_pages: 5
    }
  }
}
```

### getFeaturedPosts(limit)

Get featured blog posts for homepage display.

```javascript
// Get 3 featured posts (default)
const response = await blogService.getFeaturedPosts();

// Or specify custom limit
const response = await blogService.getFeaturedPosts(5);

// Response
{
  success: true,
  data: {
    posts: [ /* featured posts */ ]
  }
}
```

### getCategories()

Get list of all blog categories.

```javascript
const response = await blogService.getCategories();

// Response
{
  success: true,
  data: {
    categories: [
      "Development",
      "Infrastructure",
      "Community",
      "Events",
      "News"
    ]
  }
}
```

### getPostBySlug(slug)

Get single blog post by slug for detail page.

```javascript
const response = await blogService.getPostBySlug('project-success');

// Response
{
  success: true,
  data: {
    post: {
      id: 1,
      title: "Project Success",
      slug: "project-success",
      excerpt: "...",
      content: "<p>Full content with HTML...</p>",
      image: "path/to/image.jpg",
      category: "Development",
      tags: ["success", "project"],
      published_at: "2024-01-15T10:30:00Z",
      views: 150,
      author: "John Doe"
    }
  }
}
```

## Admin Methods

### getAdminPosts(page, limit, status)

Get all posts including drafts (admin only).

```javascript
// Get all posts with pagination
const response = await blogService.getAdminPosts(1, 10);

// Filter by status
const published = await blogService.getAdminPosts(1, 10, 'published');
const drafts = await blogService.getAdminPosts(1, 10, 'draft');
```

### getPostById(id)

Get single post by ID for editing (admin only).

```javascript
const response = await blogService.getPostById(123);

// Response includes all post data
{
  success: true,
  data: {
    post: { /* post data */ }
  }
}
```

### createPost(data)

Create new blog post (admin only).

```javascript
// Method 1: Simple data (no image)
const response = await blogService.createPost({
  title: "New Article",
  content: "<p>Post content in HTML</p>",
  excerpt: "Short preview",
  category: "Development",
  tags: ["react", "vite"],
  status: "draft",
  author: "Jane Doe"
});

// Method 2: With image file using FormData
const formData = new FormData();
formData.append('title', 'New Article');
formData.append('content', '<p>Content</p>');
formData.append('excerpt', 'Preview');
formData.append('category', 'Development');
formData.append('tags', JSON.stringify(['react', 'vite']));
formData.append('status', 'published');
formData.append('author', 'Jane Doe');
formData.append('image', fileInput.files[0]); // File object

const response = await blogService.createPost(formData);

// Response
{
  success: true,
  message: "Post created successfully",
  data: {
    post: {
      id: 2,
      title: "New Article",
      slug: "new-article",
      // ... other fields
    }
  }
}
```

### updatePost(id, data)

Update existing blog post (admin only).

```javascript
// Update without image
const response = await blogService.updatePost(1, {
  title: "Updated Title",
  excerpt: "Updated preview",
  status: "published"
});

// Update with new image
const formData = new FormData();
formData.append('title', 'Updated Title');
formData.append('content', '<p>Updated content</p>');
formData.append('image', newImageFile);

const response = await blogService.updatePost(1, formData);
```

### deletePost(id)

Delete blog post (admin only).

```javascript
const response = await blogService.deletePost(123);

// Response
{
  success: true,
  message: "Post deleted successfully"
}
```

## Bulk Operations (Admin Only)

### bulkUpdatePosts(ids, data)

Update multiple posts at once.

```javascript
const response = await blogService.bulkUpdatePosts(
  [1, 2, 3],  // Post IDs
  {
    status: 'published',
    category: 'News'
  }
);

// Response
{
  success: true,
  message: "3 posts updated successfully",
  data: {
    count: 3
  }
}
```

### bulkDeletePosts(ids)

Delete multiple posts at once.

```javascript
const response = await blogService.bulkDeletePosts([1, 2, 3]);

// Response
{
  success: true,
  message: "3 posts deleted successfully",
  data: {
    count: 3
  }
}
```

## Status Update Methods (Admin Only)

### publishPost(id)

Publish a draft post.

```javascript
const response = await blogService.publishPost(123);

// Response
{
  success: true,
  data: {
    post: { /* published post */ }
  }
}
```

### archivePost(id)

Archive a post.

```javascript
const response = await blogService.archivePost(123);

// Response
{
  success: true,
  data: {
    post: { /* archived post */ }
  }
}
```

## Usage in Components

### ArticlesGrid (Homepage)

```javascript
import { useEffect, useState } from 'react';
import blogService from '../../services/blogService';

function ArticlesGrid() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        let response = await blogService.getFeaturedPosts(3);
        
        if (response.success && response.data.posts?.length > 0) {
          setPosts(response.data.posts);
        } else {
          // Fallback to latest posts
          response = await blogService.getAllPosts(1, 3);
          setPosts(response.data.posts || []);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Render posts...
}
```

### BlogListPage

```javascript
function BlogListPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogService.getAllPosts(currentPage, 9);
        setPosts(response.data.posts || []);
        setTotalPages(response.data.pagination?.total_pages || 1);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  // Render posts and pagination...
}
```

### BlogPostPage (Detail)

```javascript
import { useParams } from 'react-router-dom';

function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await blogService.getPostBySlug(slug);
        if (response.success && response.data.post) {
          setPost(response.data.post);
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Render post detail...
}
```

## Error Handling

The API client automatically handles errors. All service methods will throw errors if:
- Network fails
- Server returns error status
- Authentication fails (401 redirects to login)

```javascript
try {
  const response = await blogService.getAllPosts();
} catch (error) {
  console.error('Error:', error.message);
  // Handle error
}
```

## Image Handling

### Uploading Images

Images are handled through FormData when creating/updating posts:

```javascript
// From file input
const file = fileInput.files[0]; // File object

const formData = new FormData();
formData.append('title', 'New Post');
formData.append('image', file); // Add file
formData.append('content', '<p>Content</p>');

await blogService.createPost(formData);
```

### Displaying Images

Images returned from API may be:
- Full URLs: `https://cdn.example.com/image.jpg`
- Relative paths: `images/posts/image.jpg`

Handle with helper function:

```javascript
import { getImageUrl } from '../../utils/blogHelpers';

<img src={getImageUrl(post.image)} alt={post.title} />
```

## Data Structure

### BlogPost Object

```javascript
{
  id: number,              // Unique identifier
  title: string,           // Post title
  slug: string,            // URL-friendly slug (auto-generated from title)
  excerpt: string,         // Short preview text
  content: string,         // Full post content (HTML)
  image: string,           // Image path/URL
  category: string,        // Post category
  tags: string[],          // Array of tags
  status: 'draft'|'published',  // Publication status
  published_at: string,    // ISO timestamp when published
  created_at: string,      // ISO timestamp when created
  updated_at: string,      // ISO timestamp when last updated
  views: number,           // View count
  author: string           // Author name
}
```

### BlogResponse Object

```javascript
{
  success: boolean,        // Request success status
  message: string,         // Response message
  data: {
    posts: BlogPost[],     // Array of posts (for list queries)
    post: BlogPost,        // Single post (for detail queries)
    pagination: {
      page: number,        // Current page
      limit: number,       // Posts per page
      total: number,       // Total posts
      total_pages: number  // Total pages
    },
    categories: string[]   // For getCategories()
  }
}
```

## Development vs Production

### Development

```javascript
// .env
VITE_API_URL=http://localhost:8080

// Service will call: http://localhost:8080/blog/*
```

### Production

```javascript
// .env or environment variable
VITE_API_URL=http://app.comdevhub-api.com/v1

// Service will call: http://app.comdevhub-api.com/v1/blog/*
```

## Security Notes

1. **Authentication**: Admin methods require valid authentication token in localStorage
2. **CORS**: Backend must have proper CORS headers configured
3. **FormData**: File uploads via FormData bypass JSON Content-Type (expected)
4. **Status codes**: 401 responses automatically clear token and redirect to login

## Testing

See [API_INTEGRATION_TESTING.md](./API_INTEGRATION_TESTING.md) for comprehensive testing guide.

### Quick Test - Get Featured Posts

```bash
curl http://localhost:8080/v1/blog/featured?limit=3
```

### Response Example

```json
{
  "success": true,
  "message": "Featured posts retrieved successfully",
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "Welcome to Our Blog",
        "slug": "welcome-to-our-blog",
        "excerpt": "Welcome...",
        "category": "News",
        "image": "blog/welcome.jpg"
      }
    ]
  }
}
```

## Next Steps

1. ✅ Blog service enhanced with all methods
2. ✅ ArticlesGrid using getFeaturedPosts
3. ✅ BlogListPage using getAllPosts
4. ✅ BlogPostPage using getPostBySlug
5. Admin features ready for implementation:
   - Admin dashboard for creating/editing posts
   - Bulk management interface
   - Category management
   - Draft preview system
