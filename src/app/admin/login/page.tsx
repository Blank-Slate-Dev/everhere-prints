// src/app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #d5c8bf 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-charcoal px-8 py-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <Lock size={28} className="text-white" />
            </div>
            <h1 className="text-xl font-semibold text-white">Admin Access</h1>
            <p className="text-stone-400 text-sm mt-1">EverHere Prints Dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg"
              >
                <AlertCircle size={18} />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            {/* Username field */}
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-stone-700 mb-2"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-stone-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  autoComplete="username"
                  className="
                    w-full pl-10 pr-4 py-3 
                    bg-stone-50 border border-stone-200 rounded-lg
                    text-charcoal placeholder:text-stone-400
                    focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                    transition-colors
                  "
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-stone-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-stone-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                  className="
                    w-full pl-10 pr-12 py-3 
                    bg-stone-50 border border-stone-200 rounded-lg
                    text-charcoal placeholder:text-stone-400
                    focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                    transition-colors
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="
                w-full py-3 px-4 
                bg-charcoal hover:bg-stone-800 
                text-white font-medium rounded-lg
                transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              "
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 py-4 bg-stone-50 border-t border-stone-100 text-center">
            <p className="text-xs text-stone-500">
              Protected area. Authorized personnel only.
            </p>
          </div>
        </div>

        {/* Back to site link */}
        <div className="mt-6 text-center">
          <a 
            href="/" 
            className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
          >
            ← Back to EverHere Prints
          </a>
        </div>
      </motion.div>
    </div>
  );
}
