import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import { getDatabase, saveDatabase, addActivityLog } from '@/lib/db';
import { AchievementItem } from '@/lib/types';

export async function GET() {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = getDatabase();
  return NextResponse.json((db.achievements || []).sort((a, b) => a.order - b.order));
}

export async function POST(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const db = getDatabase();
    if (!db.achievements) db.achievements = [];

    const newAch: AchievementItem = {
      id: `ach-${Date.now()}`,
      title: body.title,
      description: body.description || '',
      published: body.published !== undefined ? body.published : true,
      order: db.achievements.length + 1
    };

    db.achievements.push(newAch);
    saveDatabase(db);
    addActivityLog(`Added achievement "${newAch.title}"`);

    return NextResponse.json({ success: true, item: newAch });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to add achievement' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const db = getDatabase();
    if (!db.achievements) db.achievements = [];

    const index = db.achievements.findIndex(a => a.id === id);
    if (index === -1) return NextResponse.json({ error: 'Achievement not found' }, { status: 404 });

    db.achievements[index] = { ...db.achievements[index], ...updates };
    saveDatabase(db);
    addActivityLog(`Updated achievement "${db.achievements[index].title}"`);

    return NextResponse.json({ success: true, item: db.achievements[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update achievement' }, { status: 500 });
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
    const target = db.achievements.find(a => a.id === id);
    db.achievements = (db.achievements || []).filter(a => a.id !== id);
    saveDatabase(db);
    addActivityLog(`Deleted achievement "${target?.title || id}"`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete achievement' }, { status: 500 });
  }
}
