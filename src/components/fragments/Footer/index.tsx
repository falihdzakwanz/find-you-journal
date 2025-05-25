import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 pt-6 border-t border-primary/20 text-dark-brown">
      <div className="flex items-center justify-center gap-2 text-sm flex-row sm:gap-4">
        <Link
          href="/privacy"
          className="transition hover:text-accent hover:underline"
        >
          Privacy Policy
        </Link>
        <span className="inline">•</span>
        <Link
          href="/terms"
          className="transition hover:text-accent hover:underline"
        >
          Terms of Service
        </Link>
        <span className="inline">•</span>
        <Link
          href="/contact"
          className="transition hover:text-accent hover:underline"
        >
          Contact
        </Link>
      </div>
      <p className="mt-3 text-center">
        © {new Date().getFullYear()} Find You Journal. All rights reserved.
      </p>
    </footer>
  );
}
