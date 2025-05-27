import { AnimatePresence, motion } from "framer-motion";
import { User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import NavLinks from "./NavLinks";
import { usePathname } from "next/navigation";

interface MobileNavProps {
  isMenuOpen: boolean;
  isLoggedIn: boolean;
}

export default function MobileNav({ isMenuOpen, isLoggedIn }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute left-0 z-40 flex flex-col w-full px-4 py-4 space-y-4 shadow-md lg:hidden top-full bg-primary"
        >
          <NavLinks />
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="relative pb-1 text-lg text-white group md:text-xl w-fit"
              >
                <span className="flex items-center gap-2">
                  <User size={18} />
                  Profile
                </span>
                {pathname === "/profile" ? (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0.5 left-0 h-[2px] w-full bg-white rounded"
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <span className="absolute bottom-0.5 left-0 h-[2px] w-0 bg-white rounded transition-all duration-300 ease-in-out group-hover:w-full" />
                )}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 px-4 py-2 text-lg text-red-500 bg-white rounded-lg hover:underline max-w-fit md:text-xl"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="flex items-center gap-2 px-4 py-2 text-lg bg-white rounded-lg text-primary hover:underline max-w-fit md:text-xl"
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
  );
}
