import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import { getDatabase, saveDatabase, addActivityLog } from '@/lib/db';
import { ExperienceItem } from '@/lib/types';

export async function GET() {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = getDatabase();
  return NextResponse.json((db.experience || []).sort((a, b) => a.order - b.order));
}

export async function POST(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const db = getDatabase();
    if (!db.experience) db.experience = [];

    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      organization: body.organization,
      position: body.position,
      period: body.period || '',
      description: body.description || '',
      responsibilities: Array.isArray(body.responsibilities) ? body.responsibilities : (body.responsibilities || '').split('\n').filter(Boolean),
      technologies: Array.isArray(body.technologies) ? body.technologies : (body.technologies || '').split(',').map((t: string) => t.trim()).filter(Boolean),
      certificateUrl: body.certificateUrl || '',
      published: body.published !== undefined ? body.published : true,
      order: db.experience.length + 1
    };

    db.experience.push(newExp);
    saveDatabase(db);
    addActivityLog(`Added experience entry "${newExp.position} at ${newExp.organization}"`);

    return NextResponse.json({ success: true, item: newExp });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to add experience' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const db = getDatabase();
    if (!db.experience) db.experience = [];

    const index = db.experience.findIndex(e => e.id === id);
    if (index === -1) return NextResponse.json({ error: 'Experience entry not found' }, { status: 404 });

    if (typeof updates.responsibilities === 'string') {
      updates.responsibilities = updates.responsibilities.split('\n').map((r: string) => r.trim()).filter(Boolean);
    }
    if (typeof updates.technologies === 'string') {
      updates.technologies = updates.technologies.split(',').map((t: string) => t.trim()).filter(Boolean);
    }

    db.experience[index] = { ...db.experience[index], ...updates };
    saveDatabase(db);
    addActivityLog(`Updated experience entry "${db.experience[index].position}"`);

    return NextResponse.json({ success: true, item: db.experience[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update experience' }, { status: 500 });
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
    const target = db.experience.find(e => e.id === id);
    db.experience = (db.experience || []).filter(e => e.id !== id);
    saveDatabase(db);
    addActivityLog(`Deleted experience entry "${target?.position || id}"`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete experience' }, { status: 500 });
  }
}
