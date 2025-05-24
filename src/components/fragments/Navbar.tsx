"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Info, BookOpen, PencilLine, LogOut, User } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const navLinks = [
    { href: "/", label: "Home", icon: <Home size={18} /> },
    { href: "/about", label: "About", icon: <Info size={18} /> },
    {
      href: "/journal/history",
      label: "History",
      icon: <BookOpen size={18} />,
    },
    {
      href: "/journal/today",
      label: "Journaling",
      icon: <PencilLine size={18} />,
    },
  ];

  return (
    <nav
      className={`${
        isHome ? "absolute" : "sticky top-0"
      } w-full z-50 bg-neutral shadow-sm`}
    >
      <div className="relative flex flex-col px-4 py-3 bg-primary md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="text-xl font-bold text-white lg:text-2xl">
            Growth Journal
          </Link>

          <div className="block md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              initial={false}
              animate={isMenuOpen ? "open" : "closed"}
              className="relative w-8 h-8 text-white focus:outline-none"
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  variants={{
                    closed: { d: "M4 6h16" },
                    open: { d: "M6 18L18 6" },
                  }}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <motion.path
                  variants={{
                    closed: { opacity: 1, d: "M4 12h16" },
                    open: { opacity: 0 },
                  }}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <motion.path
                  variants={{
                    closed: { d: "M4 18h16" },
                    open: { d: "M6 6l12 12" },
                  }}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </motion.svg>
            </motion.button>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden mt-4 md:flex md:space-x-6 lg:space-x-10 md:mt-0">
          {navLinks.map(({ href, label, icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="relative pb-1 text-lg text-white group lg:text-xl w-fit"
              >
                <span className="flex items-center gap-2">
                  {icon}
                  {label}
                </span>
                {isActive ? (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0.5 left-0 h-[2px] w-full bg-white rounded"
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <span className="absolute bottom-0.5 left-0 h-[2px] w-0 bg-white rounded transition-all duration-300 ease-in-out group-hover:w-full" />
                )}
              </Link>
            );
          })}

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-3 py-1 text-lg text-white rounded-md hover:underline lg:text-xl max-w-fit"
              >
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-full"
                  />
                ) : (
                  <User size={20} />
                )}
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 z-50 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-gray-100"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="flex items-center gap-2 px-3 py-1 text-lg bg-white rounded-md hover:underline lg:text-xl max-w-fit text-primary"
            >
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              Login
            </button>
          )}
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute left-0 z-40 flex flex-col w-full px-4 py-4 space-y-4 shadow-md md:hidden top-full bg-primary"
            >
              {navLinks.map(({ href, label, icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className="relative pb-1 text-lg text-white group w-fit"
                  >
                    <span className="flex items-center gap-2">
                      {icon}
                      {label}
                    </span>
                    {isActive ? (
                      <motion.div
                        layoutId="underline"
                        className="absolute bottom-0.5 left-0 h-[2px] w-full bg-white rounded"
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <span className="absolute bottom-0.5 left-0 h-[2px] w-0 bg-white rounded transition-all duration-300 ease-in-out group-hover:w-full" />
                    )}
                  </Link>
                );
              })}
              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-lg text-white rounded-lg hover:underline max-w-fit"
                  >
                    <User size={18} />
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-2 px-4 py-2 text-lg text-red-500 bg-white rounded-lg hover:underline max-w-fit"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="flex items-center gap-2 px-4 py-2 text-primary text-lg bg-white rounded-lg hover:underline max-w-fit"
                >
                  <Image
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  Login
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
