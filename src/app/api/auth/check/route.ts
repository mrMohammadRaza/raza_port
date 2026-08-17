import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';

export async function GET() {
  const admin = checkAuth();
  if (!admin) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user: admin });
}
