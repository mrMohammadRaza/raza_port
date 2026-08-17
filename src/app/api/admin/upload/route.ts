import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import { getDatabase, saveDatabase, addActivityLog } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const admin = checkAuth();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const uploadType = formData.get('type') as string || 'image'; // 'resume' or 'avatar' or 'project' or 'cert'

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let fileName = '';
    const fileExt = path.extname(file.name).toLowerCase() || (uploadType === 'resume' ? '.pdf' : '.png');

    if (uploadType === 'resume') {
      fileName = `Mohammad_Raza_Resume${fileExt}`;
    } else if (uploadType === 'avatar') {
      fileName = `profile${fileExt}`;
    } else {
      const cleanOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      fileName = `${Date.now()}_${cleanOriginalName}`;
    }

    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${fileName}`;
    const db = getDatabase();

    // Auto-update db profile links if it was avatar or resume
    if (uploadType === 'resume') {
      db.profile.resumeUrl = publicUrl;
      saveDatabase(db);
      addActivityLog(`Uploaded new resume file (${fileName})`);
    } else if (uploadType === 'avatar') {
      db.profile.avatarUrl = publicUrl;
      saveDatabase(db);
      addActivityLog(`Uploaded new profile avatar (${fileName})`);
    } else {
      addActivityLog(`Uploaded media file (${fileName})`);
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
      size: file.size
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'File upload failed' }, { status: 500 });
  }
}
