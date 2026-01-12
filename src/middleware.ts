// src/middleware.ts
// Middleware to protect admin routes

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "everhere-admin-secret-key-change-in-production"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except /admin/login)
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
      await jwtVerify(token, JWT_SECRET);
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
