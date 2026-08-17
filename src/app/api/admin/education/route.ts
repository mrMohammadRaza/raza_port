import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import { getDatabase, saveDatabase, addActivityLog } from '@/lib/db';
import { EducationItem } from '@/lib/types';

export async function GET() {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = getDatabase();
  return NextResponse.json((db.education || []).sort((a, b) => a.order - b.order));
}

export async function POST(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const db = getDatabase();
    if (!db.education) db.education = [];

    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: body.degree,
      institution: body.institution,
      location: body.location || '',
      period: body.period || '',
      description: body.description || '',
      cgpa: body.cgpa || '',
      published: body.published !== undefined ? body.published : true,
      order: db.education.length + 1
    };

    db.education.push(newEdu);
    saveDatabase(db);
    addActivityLog(`Added education entry "${newEdu.degree}"`);

    return NextResponse.json({ success: true, item: newEdu });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to add education' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const db = getDatabase();
    if (!db.education) db.education = [];

    const index = db.education.findIndex(e => e.id === id);
    if (index === -1) return NextResponse.json({ error: 'Education entry not found' }, { status: 404 });

    db.education[index] = { ...db.education[index], ...updates };
    saveDatabase(db);
    addActivityLog(`Updated education entry "${db.education[index].degree}"`);

    return NextResponse.json({ success: true, item: db.education[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update education' }, { status: 500 });
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
    const target = db.education.find(e => e.id === id);
    db.education = (db.education || []).filter(e => e.id !== id);
    saveDatabase(db);
    addActivityLog(`Deleted education entry "${target?.degree || id}"`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete education' }, { status: 500 });
  }
}
