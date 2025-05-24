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
      <div className="relative flex flex-col px-4 py-3 bg-primary md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex items-center justify-between w-full md:w-auto">
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
    <Link href="/" className="text-xl font-bold text-white lg:text-2xl">
      Find You
    </Link>
  );
}
