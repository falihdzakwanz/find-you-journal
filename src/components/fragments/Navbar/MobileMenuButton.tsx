import { motion } from "framer-motion";

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function MobileMenuButton({
  isMenuOpen,
  toggleMenu,
}: MobileMenuButtonProps) {
  return (
    <div className="block lg:hidden">
      <motion.button
        onClick={toggleMenu}
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
  );
}
