// src/app/admin/layout.tsx
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/adminAuth";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication on the server
  const authenticated = await isAuthenticated();

  // Get current path from headers for redirect handling
  // Note: We check auth for all admin routes except login
  const isLoginPage = false; // This layout doesn't know the current path directly
  
  // The login page has its own simple layout, so if we're here and not authenticated,
  // redirect to login. The login page itself bypasses this check via its own page structure.
  
  return (
    <AdminShell isAuthenticated={authenticated}>
      {children}
    </AdminShell>
  );
}
