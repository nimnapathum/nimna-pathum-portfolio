import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';

// Authentication using centralized environment configuration
const ADMIN_TOKEN = env.ADMIN_TOKEN;

function authenticateAdmin(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token || token !== ADMIN_TOKEN) {
    return false;
  }
  return true;
}

// GET - Fetch all blogs
export async function GET() {
  try {
    // TODO: Replace with actual database query
    const blogs = [
      {
        id: "1",
        title: "Building Modern Web Applications with Next.js 14",
        excerpt: "Explore the latest features and best practices for developing high-performance web applications.",
        content: "Full blog content here...",
        publishedAt: new Date().toISOString(),
        readTime: 8,
        category: "Web Development",
        tags: ["Next.js", "React", "TypeScript"],
        featured: true,
        createdAt: new Date().toISOString(),
      }
    ];

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST - Create new blog post (Admin only)
export async function POST(request: NextRequest) {
  try {
    // Authenticate admin
    if (!authenticateAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin token required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    const { title, excerpt, content, category, tags } = body;
    
    if (!title || !excerpt || !content || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, excerpt, content, category' },
        { status: 400 }
      );
    }

    // Calculate estimated read time (average 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    // Create new blog object
    const newBlog = {
      id: Date.now().toString(), // In production, use UUID or database-generated ID
      title,
      excerpt,
      content,
      publishedAt: body.publishedAt || new Date().toISOString(),
      readTime,
      category,
      tags: Array.isArray(tags) ? tags : [tags],
      featured: body.featured || false,
      createdAt: new Date().toISOString(),
    };

    // TODO: Save to database
    // await saveBlogToDatabase(newBlog);
    
    console.log('New blog created:', newBlog);

    return NextResponse.json({ 
      message: 'Blog post created successfully',
      blog: newBlog 
    });

  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

// PUT - Update existing blog post (Admin only)
export async function PUT(request: NextRequest) {
  try {
    if (!authenticateAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin token required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    // Recalculate read time if content is updated
    if (updateData.content) {
      const wordCount = updateData.content.split(/\s+/).length;
      updateData.readTime = Math.ceil(wordCount / 200);
    }

    // TODO: Update in database
    // const updatedBlog = await updateBlogInDatabase(id, updateData);

    const updatedBlog = { 
      id, 
      ...updateData, 
      updatedAt: new Date().toISOString() 
    };
    
    console.log('Blog updated:', updatedBlog);

    return NextResponse.json({ 
      message: 'Blog post updated successfully',
      blog: updatedBlog 
    });

  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog post (Admin only)
export async function DELETE(request: NextRequest) {
  try {
    if (!authenticateAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin token required.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    // TODO: Delete from database
    // await deleteBlogFromDatabase(id);
    
    console.log('Blog deleted:', id);

    return NextResponse.json({ 
      message: 'Blog post deleted successfully',
      deletedId: id 
    });

  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}