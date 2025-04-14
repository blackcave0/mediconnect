import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // You can add custom middleware logic here if needed
  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    '/api/:path*',
  ],
};
