// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionId = request.cookies.get('session')?.value;
  const pathname = request.nextUrl.pathname;

  const isCheckoutRoute = pathname.startsWith('/checkout');

 

  if (isCheckoutRoute && !sessionId) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*'],
};
