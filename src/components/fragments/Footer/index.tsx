import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 pt-6 border-t border-primary/20 text-dark-brown">
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm sm:gap-4 md:text-lg">
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
        <span className="inline">•</span>
        <a
          href="https://quotive.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-accent hover:underline"
        >
          Quotive
        </a>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 md:text-sm">
        <a
          href="https://www.flaticon.com/free-icons/magnifying-glass"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-accent hover:underline text-dark-brown"
        >
          Magnifying glass icons created by Freepik - Flaticon
        </a>
      </p>

      <p className="mt-3 text-center">
        © {new Date().getFullYear()} Find You Journal. All rights reserved.
      </p>
    </footer>
  );
}
