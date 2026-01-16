// src/lib/adminAuth.ts
// Admin authentication utilities with security best practices

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { timingSafeEqual } from "crypto";

// =============================================================================
// SECURITY: Environment variable validation
// =============================================================================

function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `SECURITY ERROR: ${name} environment variable is required. ` +
      `Set it in your .env.local file or Vercel dashboard.`
    );
  }
  return value;
}

// Credentials MUST come from environment variables - no fallbacks
const ADMIN_USERNAME = getRequiredEnvVar("ADMIN_USERNAME");
const ADMIN_PASSWORD = getRequiredEnvVar("ADMIN_PASSWORD");
const JWT_SECRET = new TextEncoder().encode(getRequiredEnvVar("JWT_SECRET"));

// =============================================================================
// Session configuration
// =============================================================================

// SECURITY: Reduced session duration from 24h to 4h
const SESSION_DURATION = 60 * 60 * 4; // 4 hours in seconds

// =============================================================================
// Rate limiting (in-memory for single instance, use Redis for multi-instance)
// =============================================================================

interface RateLimitEntry {
  attempts: number;
  lastAttempt: number;
  lockedUntil: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT_CONFIG = {
  maxAttempts: 5,           // Max failed attempts before lockout
  windowMs: 15 * 60 * 1000, // 15 minute window
  lockoutMs: 30 * 60 * 1000, // 30 minute lockout after max attempts
};

/**
 * Check if an IP is rate limited
 */
export function isRateLimited(ip: string): { limited: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry) {
    return { limited: false };
  }

  // Check if locked out
  if (entry.lockedUntil > now) {
    return {
      limited: true,
      retryAfter: Math.ceil((entry.lockedUntil - now) / 1000)
    };
  }

  // Reset if window has passed
  if (now - entry.lastAttempt > RATE_LIMIT_CONFIG.windowMs) {
    rateLimitStore.delete(ip);
    return { limited: false };
  }

  return { limited: false };
}

/**
 * Record a failed login attempt
 */
export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const entry = rateLimitStore.get(ip) || {
    attempts: 0,
    lastAttempt: now,
    lockedUntil: 0
  };

  entry.attempts += 1;
  entry.lastAttempt = now;

  // Lock out if max attempts exceeded
  if (entry.attempts >= RATE_LIMIT_CONFIG.maxAttempts) {
    entry.lockedUntil = now + RATE_LIMIT_CONFIG.lockoutMs;
    console.warn(`SECURITY: IP ${ip} locked out after ${entry.attempts} failed login attempts`);
  }

  rateLimitStore.set(ip, entry);
}

/**
 * Clear rate limit on successful login
 */
export function clearRateLimit(ip: string): void {
  rateLimitStore.delete(ip);
}

// =============================================================================
// Credential verification
// =============================================================================

/**
 * Verify admin credentials using constant-time comparison
 * SECURITY: Prevents timing attacks
 */
export function verifyCredentials(username: string, password: string): boolean {
  try {
    // Convert to buffers for constant-time comparison
    const usernameBuffer = Buffer.from(username.normalize());
    const passwordBuffer = Buffer.from(password.normalize());
    const expectedUsernameBuffer = Buffer.from(ADMIN_USERNAME.normalize());
    const expectedPasswordBuffer = Buffer.from(ADMIN_PASSWORD.normalize());

    // Pad to same length to prevent length-based timing attacks
    const maxUsernameLen = Math.max(usernameBuffer.length, expectedUsernameBuffer.length);
    const maxPasswordLen = Math.max(passwordBuffer.length, expectedPasswordBuffer.length);

    const paddedUsername = Buffer.alloc(maxUsernameLen);
    const paddedExpectedUsername = Buffer.alloc(maxUsernameLen);
    const paddedPassword = Buffer.alloc(maxPasswordLen);
    const paddedExpectedPassword = Buffer.alloc(maxPasswordLen);

    usernameBuffer.copy(paddedUsername);
    expectedUsernameBuffer.copy(paddedExpectedUsername);
    passwordBuffer.copy(paddedPassword);
    expectedPasswordBuffer.copy(paddedExpectedPassword);

    // Constant-time comparison
    const usernameMatch = timingSafeEqual(paddedUsername, paddedExpectedUsername);
    const passwordMatch = timingSafeEqual(paddedPassword, paddedExpectedPassword);

    // Also check lengths match (constant time)
    const lengthMatch =
      usernameBuffer.length === expectedUsernameBuffer.length &&
      passwordBuffer.length === expectedPasswordBuffer.length;

    return usernameMatch && passwordMatch && lengthMatch;
  } catch {
    return false;
  }
}

// =============================================================================
// JWT Session Management
// =============================================================================

/**
 * Create a JWT session token
 */
export async function createSessionToken(): Promise<string> {
  const token = await new SignJWT({
    role: "admin",
    // Add a random nonce to prevent token reuse attacks
    nonce: crypto.randomUUID(),
  })
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
    const { payload } = await jwtVerify(token, JWT_SECRET);
    // Verify the token has the admin role
    return payload.role === "admin";
  } catch {
    return false;
  }
}

// =============================================================================
// Cookie Management
// =============================================================================

/**
 * Set the session cookie with security flags
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("admin_session", token, {
    httpOnly: true,                              // Prevent XSS access
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: "strict",                          // CSRF protection (upgraded from lax)
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
