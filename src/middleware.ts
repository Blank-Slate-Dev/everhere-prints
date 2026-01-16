// src/middleware.ts
// Middleware to protect admin routes

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// SECURITY: Require JWT_SECRET - no fallback
function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("SECURITY ERROR: JWT_SECRET environment variable is required");
    // Return a dummy value that will fail verification
    // This prevents the app from working without proper configuration
    return new TextEncoder().encode("INVALID_SECRET_NOT_CONFIGURED");
  }
  return new TextEncoder().encode(secret);
}

const JWT_SECRET = getJwtSecret();

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("admin_session")?.value;

    // No token - redirect to login
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify token
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      // SECURITY: Verify the token has the admin role
      if (payload.role !== "admin") {
        throw new Error("Invalid role");
      }
      // Token is valid, continue
      return NextResponse.next();
    } catch {
      // Token is invalid - redirect to login
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);

      // Clear the invalid cookie
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("admin_session");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
