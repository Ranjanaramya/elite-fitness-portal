import { cookies } from 'next/headers';
import crypto from 'crypto';

const SESSION_COOKIE_NAME = 'elite_gym_session';
const SESSION_SECRET = process.env.SESSION_SECRET || 'a-very-secure-secret-key-for-elite-gym-2026';

export interface SessionPayload {
  userId: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  expiresAt: string;
}

// Sign payload to prevent editing
function signPayload(payload: string): string {
  return crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
}

export async function createSession(userId: string, name: string, email: string, role: 'admin' | 'member') {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days
  const payload: SessionPayload = { userId, name, email, role, expiresAt };
  const serialized = JSON.stringify(payload);
  const signature = signPayload(serialized);
  const token = `${serialized}.${signature}`;
  
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(expiresAt),
    path: '/'
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!tokenCookie || !tokenCookie.value) {
    return null;
  }

  const lastDotIndex = tokenCookie.value.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return null;
  }

  const serialized = tokenCookie.value.substring(0, lastDotIndex);
  const signature = tokenCookie.value.substring(lastDotIndex + 1);
  const expectedSignature = signPayload(serialized);
  if (signature !== expectedSignature) {
    return null; // Tampered!
  }

  try {
    const payload: SessionPayload = JSON.parse(serialized);
    if (new Date(payload.expiresAt) < new Date()) {
      return null; // Expired!
    }
    return payload;
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/'
  });
}
