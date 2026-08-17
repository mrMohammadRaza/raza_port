import { NextResponse } from 'next/server';
import { authenticateAdmin, signAdminToken, setAdminCookie } from '@/lib/auth';
import { addActivityLog } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const isValid = authenticateAdmin(email, password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = signAdminToken(email);
    setAdminCookie(token);
    addActivityLog(`Admin logged in successfully (${email})`);

    return NextResponse.json({ success: true, message: 'Logged in successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Authentication error' }, { status: 500 });
  }
}
