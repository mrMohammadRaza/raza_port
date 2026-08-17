import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import { getDatabase, saveDatabase, addActivityLog } from '@/lib/db';
import { CertificationItem } from '@/lib/types';

export async function GET() {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = getDatabase();
  return NextResponse.json((db.certifications || []).sort((a, b) => a.order - b.order));
}

export async function POST(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const db = getDatabase();
    if (!db.certifications) db.certifications = [];

    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      title: body.title,
      issuer: body.issuer,
      date: body.date || new Date().getFullYear().toString(),
      credentialId: body.credentialId || '',
      credentialUrl: body.credentialUrl || '',
      imageUrl: body.imageUrl || '',
      published: body.published !== undefined ? body.published : true,
      order: db.certifications.length + 1
    };

    db.certifications.push(newCert);
    saveDatabase(db);
    addActivityLog(`Added certification "${newCert.title}"`);

    return NextResponse.json({ success: true, item: newCert });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to add certification' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const db = getDatabase();
    if (!db.certifications) db.certifications = [];

    const index = db.certifications.findIndex(c => c.id === id);
    if (index === -1) return NextResponse.json({ error: 'Certification not found' }, { status: 404 });

    db.certifications[index] = { ...db.certifications[index], ...updates };
    saveDatabase(db);
    addActivityLog(`Updated certification "${db.certifications[index].title}"`);

    return NextResponse.json({ success: true, item: db.certifications[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update certification' }, { status: 500 });
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
    const target = db.certifications.find(c => c.id === id);
    db.certifications = (db.certifications || []).filter(c => c.id !== id);
    saveDatabase(db);
    addActivityLog(`Deleted certification "${target?.title || id}"`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete certification' }, { status: 500 });
  }
}
