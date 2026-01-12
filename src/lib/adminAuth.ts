// src/lib/adminAuth.ts
// Admin authentication utilities

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

// Admin credentials - in production, use environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Bluezoomer30!";
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "everhere-admin-secret-key-change-in-production"
);

const SESSION_DURATION = 60 * 60 * 24; // 24 hours in seconds

/**
 * Verify admin credentials
 */
export function verifyCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

/**
 * Create a JWT session token
 */
export async function createSessionToken(): Promise<string> {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(JWT_SECRET);
  
  return token;
}

/**
 * Verify a JWT session token
 */
export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

/**
 * Set the session cookie
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/",
  });
}

/**
 * Get the session cookie
 */
export async function getSessionCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value;
}

/**
 * Clear the session cookie
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}

/**
 * Check if the current request is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getSessionCookie();
  if (!token) return false;
  return verifySessionToken(token);
}
