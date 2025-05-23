import { ViewMode } from "@/types/viewMode.type";
import { motion } from "framer-motion";

type Props = {
  viewMode: ViewMode;
  changeDay?: (dir: "prev" | "next") => void;
  changeWeek: (dir: "prev" | "next") => void;
  changeMonth: (dir: "prev" | "next") => void;
};

export default function NavigationControls({
  viewMode,
  changeDay,
  changeWeek,
  changeMonth,
}: Props) {
  const getChangeFunction = () => {
    switch (viewMode) {
      case "daily":
        return changeDay;
      case "weekly":
        return changeWeek;
      case "monthly":
        return changeMonth;
      default:
        return changeWeek;
    }
  };

  const change = getChangeFunction();

  if (!change) return null;

  return (
    <div className="flex items-center gap-3">
      <motion.button
        onClick={() => change("prev")}
        className="flex items-center px-4 py-2 text-base font-medium text-white rounded-lg md:text-lg bg-primary"
        whileHover={{
          scale: 1.05,
          backgroundColor: "var(--color-accent)",
        }}
        whileTap={{
          scale: 0.95,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10,
        }}
      >
        ←<span className="hidden ml-2 lg:inline">Previous</span>
      </motion.button>

      <motion.button
        onClick={() => change("next")}
        className="flex items-center px-4 py-2 text-base font-medium text-white rounded-lg md:text-lg bg-primary"
        whileHover={{
          scale: 1.05,
          backgroundColor: "var(--color-accent)",
        }}
        whileTap={{
          scale: 0.95,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10,
        }}
      >
        <span className="hidden mr-2 lg:inline">Next</span>→
      </motion.button>
    </div>
  );
}
