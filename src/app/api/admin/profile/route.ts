import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import { getDatabase, saveDatabase, addActivityLog } from '@/lib/db';

export async function GET() {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDatabase();
  return NextResponse.json(db.profile);
}

export async function PUT(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const db = getDatabase();
    db.profile = { ...db.profile, ...body };
    saveDatabase(db);
    addActivityLog('Updated profile information');
    return NextResponse.json({ success: true, profile: db.profile });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update profile' }, { status: 500 });
  }
}
