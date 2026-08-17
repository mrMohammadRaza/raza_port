import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import { getDatabase, saveDatabase, addActivityLog } from '@/lib/db';
import { ProjectItem } from '@/lib/types';

export async function GET() {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = getDatabase();
  return NextResponse.json((db.projects || []).sort((a, b) => a.order - b.order));
}

export async function POST(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const db = getDatabase();
    if (!db.projects) db.projects = [];

    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: body.title,
      subtitle: body.subtitle || 'Personal Project',
      description: body.description || '',
      detailedDescription: body.detailedDescription || body.description || '',
      technologies: Array.isArray(body.technologies) ? body.technologies : (body.technologies || '').split(',').map((t: string) => t.trim()).filter(Boolean),
      githubUrl: body.githubUrl || '',
      liveUrl: body.liveUrl || '',
      badge: body.badge || 'Personal Project',
      published: body.published !== undefined ? body.published : true,
      featured: body.featured !== undefined ? body.featured : false,
      order: db.projects.length + 1,
      image: body.image || '/uploads/project-placeholder.png',
      createdAt: new Date().getFullYear().toString()
    };

    db.projects.push(newProject);
    saveDatabase(db);
    addActivityLog(`Added new project "${newProject.title}"`);

    return NextResponse.json({ success: true, item: newProject });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to add project' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const db = getDatabase();
    if (!db.projects) db.projects = [];

    const index = db.projects.findIndex(p => p.id === id);
    if (index === -1) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    if (typeof updates.technologies === 'string') {
      updates.technologies = updates.technologies.split(',').map((t: string) => t.trim()).filter(Boolean);
    }

    db.projects[index] = { ...db.projects[index], ...updates };
    saveDatabase(db);
    addActivityLog(`Updated project "${db.projects[index].title}"`);

    return NextResponse.json({ success: true, item: db.projects[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const db = getDatabase();
    const target = db.projects.find(p => p.id === id);
    db.projects = (db.projects || []).filter(p => p.id !== id);
    saveDatabase(db);
    addActivityLog(`Deleted project "${target?.title || id}"`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete project' }, { status: 500 });
  }
}
