import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes (not /admin)
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const xsrfToken = extractXsrfToken(cookieHeader);

    const userData = await fetchUser(cookieHeader, xsrfToken, request.url);
    if (!userData?.user) return redirectToLogin(request);

    const userRole = userData.user.role;

    // Admin restriction
    if (userRole !== 'admin') {
      return redirectToLogin(request);
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return redirectToLogin(request);
  }
}

// === Helper functions ===

function extractXsrfToken(cookieHeader: string): string {
  const match = cookieHeader.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : '';
}

async function fetchUser(cookie: string, xsrfToken: string, referer: string) {
  const response = await fetch(`${API_URL}/user`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Cookie: cookie,
      'X-XSRF-TOKEN': xsrfToken,
      'X-Requested-With': 'XMLHttpRequest',
      Referer: referer,
    },
    credentials: 'include',
  });

  if (!response.ok) throw new Error(`User API error: ${response.status}`);
  return response.json();
}

function redirectToLogin(request: NextRequest) {
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/admin/:path*'], // Only admin routes
};
