// src/app/api/admin/auth/route.ts
// Admin authentication API endpoints

import { NextRequest, NextResponse } from "next/server";
import { 
  verifyCredentials, 
  createSessionToken, 
  setSessionCookie,
  clearSessionCookie,
  isAuthenticated 
} from "@/lib/adminAuth";

/**
 * POST /api/admin/auth - Login
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Verify credentials
    if (!verifyCredentials(username, password)) {
      // Add a small delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 500));
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create session token
    const token = await createSessionToken();
    
    // Set cookie
    await setSessionCookie(token);

    return NextResponse.json({ 
      success: true, 
      message: "Login successful" 
    });
  } catch (error) {
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
      message: "Logged out successfully" 
    });
  } catch (error) {
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
  } catch (error) {
    return NextResponse.json({ 
      authenticated: false 
    });
  }
}
