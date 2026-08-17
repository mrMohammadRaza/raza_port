import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { getDatabase, saveDatabase } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-mohammad-raza-portfolio-2026';
const COOKIE_NAME = 'admin_session';

export interface AdminPayload {
  email: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

export function generatePasswordHash(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function signAdminToken(email: string): string {
  return jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AdminPayload;
    if (payload && payload.role === 'admin') {
      return payload;
    }
    return null;
  } catch (err) {
    return null;
  }
}

export function checkAuth(): AdminPayload | null {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export function setAdminCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export function clearAdminCookie() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}

// Check admin credentials against DB or env defaults
export function authenticateAdmin(emailInput: string, passwordInput: string): boolean {
  const db = getDatabase();
  const adminEmail = db.settings.adminEmail || process.env.ADMIN_EMAIL || 'razasheikh092007@gmail.com';
  
  if (emailInput.toLowerCase().trim() !== adminEmail.toLowerCase().trim()) {
    // Allow fallback admin email 'admin@mohammadraza.dev'
    if (emailInput.toLowerCase().trim() !== 'admin@mohammadraza.dev') {
      return false;
    }
  }

  // If password hash exists in settings DB, check against it
  if (db.settings.adminPasswordHash) {
    return comparePassword(passwordInput, db.settings.adminPasswordHash);
  }

  // Check against env default hash or default password Admin@12345
  const envHash = process.env.ADMIN_PASSWORD_HASH;
  if (envHash && comparePassword(passwordInput, envHash)) {
    return true;
  }

  // Initial fallback password check: Admin@12345 or raza123
  if (passwordInput === 'Admin@12345' || passwordInput === 'raza123') {
    // Auto save hashed password for future
    db.settings.adminPasswordHash = generatePasswordHash(passwordInput);
    saveDatabase(db);
    return true;
  }

  return false;
}
