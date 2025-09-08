import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  console.log('>>>>> sessionCookie:', sessionCookie);

  // Check for the existence of a session cookie to handle redirection.
  // To avoid blocking requests by making API or database calls.
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: 'nodejs',
  matcher: ['/feed'],
};
