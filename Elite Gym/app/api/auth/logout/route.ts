import { destroySession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  await destroySession();
  
  // Redirect to home page
  return NextResponse.redirect(new URL('/', request.url), {
    status: 303 // 303 See Other is ideal for redirecting after a POST request
  });
}

// Support GET requests as well for simplicity
export async function GET(request: NextRequest) {
  await destroySession();
  return NextResponse.redirect(new URL('/', request.url), {
    status: 303
  });
}
