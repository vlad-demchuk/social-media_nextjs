import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);

  // Check for the existence of a session cookie to handle redirection.
  // To avoid blocking requests by making API or database calls.
  // Redirect authenticated users away from public/auth pages
  if (sessionCookie && (pathname === '/' || pathname === '/auth')) {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  const protectedPaths = ['/feed', '/messages', '/notifications', '/users'];

  if (!sessionCookie && protectedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: 'nodejs',
  matcher: ['/', '/auth', '/feed', '/feed/:path*', '/users/:path', '/messages', '/notifications'],
};
