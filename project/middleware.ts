import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { pathname } = req.nextUrl;

  // Public paths that don't need auth
  const isPublicPath = pathname.startsWith('/sign-in') || 
                      pathname.startsWith('/sign-up') || 
                      pathname.startsWith('/auth/callback');

  // Refresh session if it exists
  const { data: { session } } = await supabase.auth.getSession();

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (session && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If user is not authenticated and trying to access protected routes
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Add CORS headers for API routes
  if (pathname.startsWith('/api/')) {
    res.headers.append('Access-Control-Allow-Origin', '*');
    res.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
