// src/components/admin/AdminShell.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  Printer,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Package,
  Users,
  BarChart3,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Print Queue", href: "/admin/print-queue", icon: Printer },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminShellProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export function AdminShell({ children, isAuthenticated }: AdminShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Handle authentication redirect on client side
  useEffect(() => {
    if (!isAuthenticated && pathname !== "/admin/login") {
      router.push(`/admin/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, pathname, router]);

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Show loading state while redirecting unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="text-stone-500">Redirecting to login...</div>
      </div>
    );
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-stone-800 text-white
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-stone-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="font-semibold">EverHere Admin</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-white/10 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/admin" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-colors group
                  ${isActive 
                    ? "bg-white/10 text-white" 
                    : "text-stone-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="
              flex items-center gap-3 w-full px-3 py-2.5 rounded-lg
              text-stone-400 hover:text-white hover:bg-white/5
              transition-colors disabled:opacity-50
            "
          >
            <LogOut size={20} />
            <span className="font-medium">
              {isLoggingOut ? "Signing out..." : "Sign Out"}
            </span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-stone-200 flex items-center px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-stone-600 hover:bg-stone-100 rounded-lg"
          >
            <Menu size={24} />
          </button>

          <div className="flex-1" />

          {/* Quick actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
            >
              View Site →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}