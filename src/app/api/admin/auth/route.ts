// src/app/api/admin/auth/route.ts
// Admin authentication API endpoints with rate limiting

import { NextRequest, NextResponse } from "next/server";
import {
  verifyCredentials,
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  isAuthenticated,
  isRateLimited,
  recordFailedAttempt,
  clearRateLimit,
} from "@/lib/adminAuth";

/**
 * Get client IP from request headers
 */
function getClientIp(request: NextRequest): string {
  // Check various headers for the real IP (behind proxies/load balancers)
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // Take the first IP in the list (original client)
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fallback - this might not be accurate behind proxies
  return "unknown";
}

/**
 * POST /api/admin/auth - Login
 */
export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);

  try {
    // SECURITY: Check rate limiting first
    const rateLimitStatus = isRateLimited(clientIp);
    if (rateLimitStatus.limited) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many login attempts. Please try again later.",
          retryAfter: rateLimitStatus.retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimitStatus.retryAfter || 1800),
          },
        }
      );
    }

    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Verify credentials (uses constant-time comparison internally)
    if (!verifyCredentials(username, password)) {
      // Record failed attempt for rate limiting
      recordFailedAttempt(clientIp);

      // Add a consistent delay to prevent timing attacks
      await new Promise((resolve) => setTimeout(resolve, 500));

      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Success - clear rate limit for this IP
    clearRateLimit(clientIp);

    // Create session token
    const token = await createSessionToken();

    // Set cookie
    await setSessionCookie(token);

    // Log successful login (without sensitive data)
    console.log(`Admin login successful from IP: ${clientIp}`);

    return NextResponse.json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    // SECURITY: Don't leak error details
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/auth - Logout
 */
export async function DELETE() {
  try {
    await clearSessionCookie();
    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    // SECURITY: Don't leak error details
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, error: "Logout failed" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/auth - Check authentication status
 */
export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    return NextResponse.json({
      authenticated,
    });
  } catch {
    return NextResponse.json({
      authenticated: false,
    });
  }
}
