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
    <div className="flex items-center gap-2">
      <motion.button
        onClick={() => change("prev")}
        className="px-3 py-1 text-sm text-white rounded bg-primary lg:text-base"
        whileHover={{
          scale: 1.05,
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
        &larr; <span className="hidden lg:inline">Sebelumnya</span>
      </motion.button>

      <motion.button
        onClick={() => change("next")}
        className="px-3 py-1 text-sm text-white rounded bg-primary lg:text-base"
        whileHover={{
          scale: 1.05,
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
        <span className="hidden lg:inline">Berikutnya</span> &rarr;
      </motion.button>
    </div>
  );
}
