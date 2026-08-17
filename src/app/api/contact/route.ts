import { NextResponse } from 'next/server';
import { getDatabase, saveDatabase, addActivityLog } from '@/lib/db';
import { ContactMessage } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const db = getDatabase();
    if (!db.settings.allowContactForm) {
      return NextResponse.json({ error: 'Contact form is currently disabled' }, { status: 403 });
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      subject: (subject || 'Portfolio Contact Inquiry').trim(),
      message: message.trim(),
      read: false,
      createdAt: new Date().toISOString()
    };

    if (!db.messages) db.messages = [];
    db.messages.unshift(newMessage);

    saveDatabase(db);
    addActivityLog(`New contact message received from ${name} (${email})`);

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to send message' }, { status: 500 });
  }
}
