// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionId = request.cookies.get('session')?.value;
  const pathname = request.nextUrl.pathname;

  {/* const isAdminRoute = pathname.startsWith('/adminPanel');*/}
  const isCheckoutRoute = pathname.startsWith('/checkout');

  // Для /adminPanel — просто проверяем, есть ли сессия
    {/*if (isAdminRoute && !sessionId) {
    return NextResponse.redirect(new URL('/login', request.url));
  }*/}

  // Для /checkout — тоже просто наличие сессии
  if (isCheckoutRoute && !sessionId) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*',{/* /adminPanel/:path*,*/}],
};
