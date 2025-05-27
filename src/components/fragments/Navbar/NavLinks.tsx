import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Info, BookOpen, PencilLine, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

export const navLinks = [
  { href: "/", label: "Home", icon: <Home size={18} /> },
  { href: "/about", label: "About", icon: <Info size={18} /> },
  {
    href: "/journal/today",
    label: "Journaling",
    icon: <PencilLine size={18} />,
  },
  {
    href: "/journal/history",
    label: "History",
    icon: <BookOpen size={18} />,
  },

  {
    href: "/contact",
    label: "Contact",
    icon: <Mail size={18} />,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map(({ href, label, icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="relative pb-1 text-lg text-white md:text-xl group w-fit"
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
    </>
  );
}
