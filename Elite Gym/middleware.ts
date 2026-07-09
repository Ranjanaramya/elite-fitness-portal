import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('elite_gym_session')?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/forgot-password');
  const isMemberRoute = pathname.startsWith('/member-dashboard') || pathname.startsWith('/classes') || pathname.startsWith('/membership') || pathname.startsWith('/bmi-history') || pathname.startsWith('/profile') || pathname.startsWith('/reviews');

  if (sessionToken) {
    try {
      const lastDotIndex = sessionToken.lastIndexOf('.');
      if (lastDotIndex !== -1) {
        // Decode raw session string (which might have been URL encoded by cookie header)
        const rawJson = decodeURIComponent(sessionToken.substring(0, lastDotIndex));
        const payload = JSON.parse(rawJson);
        
        // Expiry check
        if (new Date(payload.expiresAt) < new Date()) {
          const response = NextResponse.redirect(new URL('/login', request.url));
          response.cookies.delete('elite_gym_session');
          return response;
        }

        // If trying to access login/register while authenticated
        if (isAuthRoute) {
          return NextResponse.redirect(new URL('/member-dashboard', request.url));
        }
      }
    } catch (e) {
      console.error('Middleware token parsing failed', e);
    }
  } else {
    // No session token
    if (isMemberRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/forgot-password',
    '/member-dashboard',
    '/classes',
    '/membership',
    '/bmi-history',
    '/profile',
    '/reviews'
  ]
};
