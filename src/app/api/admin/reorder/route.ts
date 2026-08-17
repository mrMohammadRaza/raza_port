import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import { getDatabase, saveDatabase, addActivityLog } from '@/lib/db';

export async function POST(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { section, items } = body; // items = Array of { id: string, order: number }

    if (!section || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Section and items array required' }, { status: 400 });
    }

    const db = getDatabase();
    const sectionKey = section as keyof typeof db;

    if (Array.isArray(db[sectionKey])) {
      const list = db[sectionKey] as any[];
      items.forEach(orderedItem => {
        const target = list.find(x => x.id === orderedItem.id);
        if (target) {
          target.order = orderedItem.order;
        }
      });
      saveDatabase(db);
      addActivityLog(`Re-ordered items in ${section}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to reorder items' }, { status: 500 });
  }
}
