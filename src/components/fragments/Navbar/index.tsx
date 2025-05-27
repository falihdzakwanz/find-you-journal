"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import MobileMenuButton from "./MobileMenuButton";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <nav
      className={`${
        isHome ? "absolute" : "sticky top-0"
      } w-full z-50 bg-neutral shadow-sm`}
    >
      <div className="relative flex flex-col px-4 py-3 bg-primary lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <NavBrand />
          <MobileMenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>

        {/* Desktop Navigation */}
        <DesktopNav
          isLoggedIn={isLoggedIn}
          isProfileOpen={isProfileOpen}
          toggleProfile={toggleProfile}
          session={session}
        />

        {/* Mobile Navigation */}
        <MobileNav
          isMenuOpen={isMenuOpen}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </nav>
  );
}

function NavBrand() {
  return (
    <Link href="/" className="flex items-center gap-2 text-white">
      <div className="flex items-center justify-center w-8 h-8">
        <svg className="w-5 h-5 md:w-7 md:h-7 lg:w-10 lg:h-10" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5z"
          />
        </svg>
      </div>
      <span className="text-xl font-bold md:text-2xl">Find You</span>
    </Link>
  );
}
