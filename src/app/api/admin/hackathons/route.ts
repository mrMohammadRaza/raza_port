import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import { getDatabase, saveDatabase, addActivityLog } from '@/lib/db';
import { HackathonItem } from '@/lib/types';

export async function GET() {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = getDatabase();
  return NextResponse.json((db.hackathons || []).sort((a, b) => a.order - b.order));
}

export async function POST(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const db = getDatabase();
    if (!db.hackathons) db.hackathons = [];

    const newHack: HackathonItem = {
      id: `hack-${Date.now()}`,
      title: body.title,
      organizer: body.organizer || '',
      teamName: body.teamName || '',
      project: body.project || '',
      result: body.result || 'Participant',
      description: body.description || '',
      published: body.published !== undefined ? body.published : true,
      order: db.hackathons.length + 1
    };

    db.hackathons.push(newHack);
    saveDatabase(db);
    addActivityLog(`Added hackathon entry "${newHack.title}"`);

    return NextResponse.json({ success: true, item: newHack });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to add hackathon' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const db = getDatabase();
    if (!db.hackathons) db.hackathons = [];

    const index = db.hackathons.findIndex(h => h.id === id);
    if (index === -1) return NextResponse.json({ error: 'Hackathon entry not found' }, { status: 404 });

    db.hackathons[index] = { ...db.hackathons[index], ...updates };
    saveDatabase(db);
    addActivityLog(`Updated hackathon entry "${db.hackathons[index].title}"`);

    return NextResponse.json({ success: true, item: db.hackathons[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update hackathon' }, { status: 500 });
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
    const target = db.hackathons.find(h => h.id === id);
    db.hackathons = (db.hackathons || []).filter(h => h.id !== id);
    saveDatabase(db);
    addActivityLog(`Deleted hackathon entry "${target?.title || id}"`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete hackathon' }, { status: 500 });
  }
}
