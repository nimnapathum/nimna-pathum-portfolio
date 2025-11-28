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

// GET - Fetch all projects
export async function GET() {
  try {
    // TODO: Replace with actual database query
    const projects = [
      {
        id: "1",
        title: "AI-Powered Portfolio Assistant",
        description: "An intelligent portfolio website with AI-driven content generation.",
        technologies: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
        image: "/projects/project-1.jpg",
        githubUrl: "https://github.com/nimnapathum/ai-portfolio",
        liveUrl: "https://ai-portfolio.nimnapathum.dev",
        status: "completed",
        createdAt: new Date().toISOString(),
      }
    ];

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST - Create new project (Admin only)
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
    const { title, description, technologies, status } = body;
    
    if (!title || !description || !technologies || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, technologies, status' },
        { status: 400 }
      );
    }

    // Create new project object
    const newProject = {
      id: Date.now().toString(), // In production, use UUID or database-generated ID
      title,
      description,
      technologies: Array.isArray(technologies) ? technologies : [technologies],
      image: body.image || '/projects/default.jpg',
      githubUrl: body.githubUrl || null,
      liveUrl: body.liveUrl || null,
      status,
      createdAt: new Date().toISOString(),
    };

    // TODO: Save to database
    // await saveProjectToDatabase(newProject);
    
    console.log('New project created:', newProject);

    return NextResponse.json({ 
      message: 'Project created successfully',
      project: newProject 
    });

  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

// PUT - Update existing project (Admin only)
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
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    // TODO: Update in database
    // const updatedProject = await updateProjectInDatabase(id, updateData);

    const updatedProject = { id, ...updateData, updatedAt: new Date().toISOString() };
    
    console.log('Project updated:', updatedProject);

    return NextResponse.json({ 
      message: 'Project updated successfully',
      project: updatedProject 
    });

  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE - Delete project (Admin only)
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
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    // TODO: Delete from database
    // await deleteProjectFromDatabase(id);
    
    console.log('Project deleted:', id);

    return NextResponse.json({ 
      message: 'Project deleted successfully',
      deletedId: id 
    });

  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}