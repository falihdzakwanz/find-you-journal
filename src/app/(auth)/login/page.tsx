"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("google", { callbackUrl: "/journal/today" });
    } catch (err) {
      console.error("Failed to sign in. ", err);
      setError("Failed to sign in. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-neutral">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md overflow-hidden bg-white border shadow-lg rounded-xl border-primary/20"
      >
        {/* Header */}
        <div className="p-8 text-center bg-gradient-to-r from-primary to-accent">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex flex-col items-center gap-2"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md">
              <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5z"
                />
              </svg>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white">Find You</h1>
            <p className="mt-1 text-lg text-white/90">
              Your personal journal for self-discovery
            </p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-dark-brown">
              Welcome Back
            </h2>
            <p className="text-dark-brown/70">
              Sign in to access your private journal
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 mb-4 text-sm text-red-600 rounded-lg bg-red-50"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </motion.div>
          )}

          {/* Google Sign-In Button */}
          <motion.button
            onClick={handleSignIn}
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="relative flex items-center justify-center w-full gap-3 px-6 py-3 transition-colors bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
                <span className="font-medium text-gray-700">
                  Redirecting...
                </span>
              </>
            ) : (
              <>
                <Image
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google logo"
                  width={24}
                  height={24}
                  priority
                />
                <span className="font-medium text-gray-700">
                  Continue with Google
                </span>
              </>
            )}
          </motion.button>

          {/* Security Badges */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-1 text-xs text-dark-brown/50">
              <svg
                className="w-4 h-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Secure Login
            </div>
            <div className="flex items-center gap-1 text-xs text-dark-brown/50">
              <svg
                className="w-4 h-4 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Encrypted Data
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 mt-8 text-sm text-center border-t border-gray-100 text-dark-brown/60">
            <p>By continuing, you agree to our</p>
            <p>
              <Link
                href="/terms"
                className="font-medium text-primary hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium text-primary hover:underline"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
