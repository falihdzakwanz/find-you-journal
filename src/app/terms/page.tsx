"use client";

import Footer from "@/components/fragments/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsPage() {
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
          <h1 className="mb-2 text-xl md:text-3xl font-bold text-dark-brown lg:text-4xl">
            Terms of Service
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
                1. Acceptance of Terms
              </h3>
              <p>
                By accessing or using the Find You journaling application
                (&quot;Service&quot;), you agree to be bound by these Terms of
                Service. If you disagree, please refrain from using our Service.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="mb-3 text-xl font-semibold text-dark-brown">
                2. Service Description
              </h3>
              <p>
                Find You provides a digital journaling platform for personal
                reflection and self-discovery. We reserve the right to modify or
                discontinue the Service at any time without notice.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="mb-3 text-xl font-semibold text-dark-brown">
                3. User Responsibilities
              </h3>
              <ul className="pl-5 space-y-2 list-disc">
                <li>You must be at least 13 years old to use this Service</li>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your Google account
                </li>
                <li>All journal content must comply with applicable laws</li>
                <li>Prohibited: Hate speech, illegal content, or harassment</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="mb-3 text-xl font-semibold text-dark-brown">
                4. Data Privacy
              </h3>
              <p>
                Your journal entries are private by default. We implement
                industry-standard security measures but cannot guarantee
                absolute security. Review our{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>{" "}
                for details.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="mb-3 text-xl font-semibold text-dark-brown">
                5. Limitation of Liability
              </h3>
              <p>
                Find You shall not be liable for any indirect, incidental, or
                consequential damages arising from your use of the Service. Our
                total liability is limited to the amount you&apos;ve paid us in
                the past six months.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-semibold text-dark-brown">
                6. Changes to Terms
              </h3>
              <p>
                We may revise these terms at any time. Continued use after
                changes constitutes acceptance. We&apos;ll notify users of
                significant changes via email or in-app notification.
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
