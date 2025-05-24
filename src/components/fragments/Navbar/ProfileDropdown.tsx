import { motion } from "framer-motion";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

interface ProfileDropdownProps {
  toggleProfile: () => void;
}

export default function ProfileDropdown({
  toggleProfile,
}: ProfileDropdownProps) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 z-50 w-32 mt-2 origin-top-right bg-white rounded-md shadow-sm px-4 py-2 shadow-primary/50"
      onClick={toggleProfile}
    >
      <div>
        <Link
          href="/profile"
          className="relative pb-1 text-lg text-primary group lg:text-xl w-fit"
        >
          <span className="flex items-center gap-2">
            <User size={18} />
            Profile
          </span>
          {pathname === "/profile" ? (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0.4 left-0 h-[2px] w-full bg-primary rounded"
              transition={{ duration: 0.3 }}
            />
          ) : (
            <span className="absolute bottom-0.4 left-0 h-[2px] w-0 bg-primary rounded transition-all duration-300 ease-in-out group-hover:w-full" />
          )}
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 py-2 text-lg text-red-500 bg-white rounded-lg hover:underline max-w-fit lg:text-xl"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </motion.div>
  );
}
