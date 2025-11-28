# Admin API Documentation

This documentation covers the admin-only endpoints for managing projects and blog posts.

## Authentication

All admin endpoints require authentication using a Bearer token in the Authorization header:

```
Authorization: Bearer your-secret-admin-token
```

Set the `ADMIN_TOKEN` environment variable in your `.env.local` file:

```bash
ADMIN_TOKEN=your-secret-admin-token
```

## Projects API

### Base URL: `/api/admin/projects`

#### GET - Fetch all projects
```bash
curl -X GET http://localhost:3000/api/admin/projects
```

#### POST - Create new project
```bash
curl -X POST http://localhost:3000/api/admin/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-admin-token" \
  -d '{
    "title": "My New Project",
    "description": "A detailed description of the project",
    "technologies": ["React", "TypeScript", "Next.js"],
    "status": "completed",
    "githubUrl": "https://github.com/nimnapathum/project",
    "liveUrl": "https://project.nimnapathum.dev",
    "image": "/projects/my-project.jpg"
  }'
```

Required fields:
- `title` (string)
- `description` (string)
- `technologies` (array of strings)
- `status` ("completed" | "in-progress" | "planned")

Optional fields:
- `githubUrl` (string)
- `liveUrl` (string)
- `image` (string, defaults to '/projects/default.jpg')

#### PUT - Update existing project
```bash
curl -X PUT http://localhost:3000/api/admin/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-admin-token" \
  -d '{
    "id": "1",
    "title": "Updated Project Title",
    "status": "in-progress"
  }'
```

#### DELETE - Delete project
```bash
curl -X DELETE "http://localhost:3000/api/admin/projects?id=1" \
  -H "Authorization: Bearer your-secret-admin-token"
```

## Blogs API

### Base URL: `/api/admin/blogs`

#### GET - Fetch all blogs
```bash
curl -X GET http://localhost:3000/api/admin/blogs
```

#### POST - Create new blog post
```bash
curl -X POST http://localhost:3000/api/admin/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-admin-token" \
  -d '{
    "title": "My New Blog Post",
    "excerpt": "A brief summary of the blog post",
    "content": "The full content of the blog post...",
    "category": "Web Development",
    "tags": ["React", "TypeScript", "Tutorial"],
    "featured": true,
    "publishedAt": "2024-11-28T00:00:00.000Z"
  }'
```

Required fields:
- `title` (string)
- `excerpt` (string)
- `content` (string)
- `category` (string)

Optional fields:
- `tags` (array of strings, defaults to empty array)
- `featured` (boolean, defaults to false)
- `publishedAt` (ISO string, defaults to current date)

Note: `readTime` is automatically calculated based on content word count.

#### PUT - Update existing blog post
```bash
curl -X PUT http://localhost:3000/api/admin/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-admin-token" \
  -d '{
    "id": "1",
    "title": "Updated Blog Title",
    "featured": true
  }'
```

#### DELETE - Delete blog post
```bash
curl -X DELETE "http://localhost:3000/api/admin/blogs?id=1" \
  -H "Authorization: Bearer your-secret-admin-token"
```

## Example Usage with JavaScript

```javascript
const ADMIN_TOKEN = 'your-secret-admin-token';
const BASE_URL = 'http://localhost:3000/api/admin';

// Create a new project
async function createProject(projectData) {
  const response = await fetch(`${BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ADMIN_TOKEN}`
    },
    body: JSON.stringify(projectData)
  });
  
  return await response.json();
}

// Create a new blog post
async function createBlog(blogData) {
  const response = await fetch(`${BASE_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ADMIN_TOKEN}`
    },
    body: JSON.stringify(blogData)
  });
  
  return await response.json();
}
```

## Security Notes

1. **Never expose your admin token** in client-side code
2. In production, use a more secure authentication method (JWT, OAuth, etc.)
3. Consider adding rate limiting to prevent abuse
4. Add input validation and sanitization
5. Implement proper database storage instead of mock data

## Next Steps

1. Replace mock data with actual database operations
2. Add proper database models (MongoDB, PostgreSQL, etc.)
3. Implement user authentication and role-based access
4. Add image upload functionality for projects
5. Add rich text editor support for blog content