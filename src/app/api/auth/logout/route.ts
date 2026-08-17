import { NextResponse } from 'next/server';
import { clearAdminCookie } from '@/lib/auth';
import { addActivityLog } from '@/lib/db';

export async function POST() {
  clearAdminCookie();
  addActivityLog('Admin logged out');
  return NextResponse.json({ success: true, message: 'Logged out successfully' });
}
