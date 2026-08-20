import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser } from './lib/auth-server';

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login', 
  '/signup', 
  '/api/auth/login', 
  '/api/auth/register',
  '/api/auth/me',
  '/api/auth/logout'
];

function isPublicPath(path: string): boolean {
  return publicRoutes.some(route => path === route || path.startsWith('/api/auth'));
}

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  console.log('🔍 Proxy - Path:', path);
  
  // Allow ALL public routes without any redirects
  if (isPublicPath(path)) {
    console.log('✅ Public route, allowing access');
    return NextResponse.next();
  }

  // Check authentication for protected routes
  try {
    const user = await getCurrentUser();
    console.log('👤 User:', user?.email || 'Not authenticated');
    console.log('👤 User role:', user?.role);

    if (!user) {
      console.log('❌ Not authenticated, redirecting to login');
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', path);
      return NextResponse.redirect(loginUrl);
    }

    // ✅ FIXED: Case-insensitive role check
    const userRole = user.role?.toUpperCase() || '';

    // Role-based access control
    if (path.startsWith('/dashboard/admin') && userRole !== 'ADMIN') {
      console.log('🚫 Not admin, redirecting to dashboard');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (path.startsWith('/dashboard/pm') && userRole !== 'PROJECT_MANAGER') {
      console.log('🚫 Not PM, redirecting to dashboard');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    console.log('✅ Authenticated, allowing access');
    return NextResponse.next();
  } catch (error) {
    console.error('💥 Proxy error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/login',
    '/signup',
    '/api/auth/me',
    '/api/admin/:path*',
    '/api/tasks/:path*',
  ],
};