import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const isAdminRoute = url.pathname.startsWith('/adminPanel');

  const userRole = request.cookies.get('session')?.value;
  console.log('MIDDLEWARE: role =', userRole);

  if (isAdminRoute && (userRole !== 'admin')) {
    return NextResponse.redirect(new URL('/homepage', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/adminPanel/:path*'],
};
