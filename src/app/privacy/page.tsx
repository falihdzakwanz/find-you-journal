"use client";

import Footer from "@/components/fragments/Footer";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-4 py-12 bg-neutral sm:px-6 lg:px-8">
      <div className="w-full mx-auto lg:max-w-3xl md:max-w-2xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-2 text-2xl font-bold md:text-3xl text-dark-brown lg:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-dark-brown/70">Last Updated: May 26, 2025</p>
        </motion.header>

        {/* Content */}
        <motion.main
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
                policy applies to their services. We don&apos;t share your data
                with other third parties except:
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
        </motion.main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
