"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-4 py-12 bg-neutral sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-dark-brown">Find You</h1>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-dark-brown">
            Privacy Policy
          </h2>
          <p className="text-dark-brown/70">
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white border shadow-sm rounded-xl sm:p-8 border-primary/10"
        >
          <div className="prose-sm prose sm:prose max-w-none text-dark-brown">
            <section className="mb-8">
              <h3 className="mb-3 text-xl font-semibold text-dark-brown">
                1. Information We Collect
              </h3>
              <p>When you use Find You with Google Sign-In, we collect:</p>
              <ul className="pl-5 mt-2 space-y-2 list-disc">
                <li>Basic profile information (name, email)</li>
                <li>Journal entries you create</li>
                <li>Usage data (features accessed, time spent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="mb-3 text-xl font-semibold text-dark-brown">
                2. How We Use Your Data
              </h3>
              <ul className="pl-5 space-y-2 list-disc">
                <li>To provide and maintain our Service</li>
                <li>To personalize your journaling experience</li>
                <li>To improve our app&apos;s functionality</li>
                <li>To communicate important service updates</li>
              </ul>
              <p className="mt-3">
                We <strong>never</strong> read your journal content unless
                required by law or for troubleshooting with your explicit
                permission.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="mb-3 text-xl font-semibold text-dark-brown">
                3. Data Security
              </h3>
              <p>We implement several security measures:</p>
              <ul className="pl-5 mt-2 space-y-2 list-disc">
                <li>End-to-end encryption for all journal entries</li>
                <li>Regular security audits</li>
                <li>Limited employee access to user data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="mb-3 text-xl font-semibold text-dark-brown">
                4. Third-Party Services
              </h3>
              <p>
                We use Google Authentication for sign-in. Google&apos;s privacy
                policy applies to their services. We don&apos;t share your data with
                other third parties except:
              </p>
              <ul className="pl-5 mt-2 space-y-2 list-disc">
                <li>When required by law</li>
                <li>
                  With service providers under strict confidentiality agreements
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="mb-3 text-xl font-semibold text-dark-brown">
                5. Your Rights
              </h3>
              <p>You can:</p>
              <ul className="pl-5 mt-2 space-y-2 list-disc">
                <li>Access and download your data anytime</li>
                <li>Delete your account and all associated data</li>
                <li>Opt out of non-essential communications</li>
              </ul>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-semibold text-dark-brown">
                6. Changes to This Policy
              </h3>
              <p>
                We&apos;ll notify you of significant changes via email or in-app
                notification. Continued use after changes constitutes
                acceptance.
              </p>
            </section>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-sm text-center text-dark-brown/60"
        >
          <p>© {new Date().getFullYear()} Find You. All rights reserved.</p>
          <p className="mt-1">
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            |{" "}
            <Link href="/" className="text-primary hover:underline">
              Return to App
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
