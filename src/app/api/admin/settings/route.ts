import { NextResponse } from 'next/server';
import { checkAuth, generatePasswordHash } from '@/lib/auth';
import { getDatabase, saveDatabase, addActivityLog } from '@/lib/db';

export async function GET() {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = getDatabase();
  return NextResponse.json({
    settings: db.settings,
    logs: db.activityLogs || []
  });
}

export async function PUT(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { newPassword, adminEmail, ...otherSettings } = body;
    const db = getDatabase();

    db.settings = {
      ...db.settings,
      ...otherSettings,
      adminEmail: adminEmail || db.settings.adminEmail
    };

    if (newPassword && newPassword.trim().length >= 6) {
      db.settings.adminPasswordHash = generatePasswordHash(newPassword.trim());
      addActivityLog('Admin password updated successfully');
    }

    saveDatabase(db);
    addActivityLog('Updated website settings');

    return NextResponse.json({ success: true, settings: db.settings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update settings' }, { status: 500 });
  }
}
