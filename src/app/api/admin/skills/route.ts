import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import { getDatabase, saveDatabase, addActivityLog } from '@/lib/db';
import { SkillItem } from '@/lib/types';

export async function GET() {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = getDatabase();
  return NextResponse.json((db.skills || []).sort((a, b) => a.order - b.order));
}

export async function POST(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const db = getDatabase();
    if (!db.skills) db.skills = [];

    const newSkill: SkillItem = {
      id: `sk-${Date.now()}`,
      name: body.name,
      category: body.category || 'Other Areas',
      level: Number(body.level) || 80,
      published: body.published !== undefined ? body.published : true,
      order: db.skills.length + 1,
    };

    db.skills.push(newSkill);
    saveDatabase(db);
    addActivityLog(`Added new skill "${newSkill.name}"`);

    return NextResponse.json({ success: true, item: newSkill });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to add skill' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const db = getDatabase();
    if (!db.skills) db.skills = [];

    const index = db.skills.findIndex(s => s.id === id);
    if (index === -1) return NextResponse.json({ error: 'Skill not found' }, { status: 404 });

    db.skills[index] = { ...db.skills[index], ...updates };
    saveDatabase(db);
    addActivityLog(`Updated skill "${db.skills[index].name}"`);

    return NextResponse.json({ success: true, item: db.skills[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update skill' }, { status: 500 });
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
    const target = db.skills.find(s => s.id === id);
    db.skills = (db.skills || []).filter(s => s.id !== id);
    saveDatabase(db);
    addActivityLog(`Deleted skill "${target?.name || id}"`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete skill' }, { status: 500 });
  }
}
