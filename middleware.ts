import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Handle v0 specific requests
  if (request.nextUrl.pathname.startsWith("/@v0")) {
    // Redirect to the appropriate path
    return NextResponse.rewrite(new URL(request.nextUrl.pathname.replace("/@v0", ""), request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

