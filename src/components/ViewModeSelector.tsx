import { ViewMode } from "@/types/viewMode.type";
import { motion } from "framer-motion";

type Props = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};

export default function ViewModeSelector({ viewMode, setViewMode }: Props) {
  return (
    <motion.div
      className="relative w-full sm:w-56"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <select
        value={viewMode}
        onChange={(e) => setViewMode(e.target.value as ViewMode)}
        className="block w-full px-4 py-2.5 text-base md:text-lg transition-all duration-300 border-2 rounded-lg cursor-pointer appearance-none bg-white border-primary/30 text-dark-brown focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
      >
        <option value="daily" className="text-xs md:text-base">
          Daily
        </option>
        <option value="weekly" className="text-xs md:text-base">
          Weekly
        </option>
        <option value="monthly" className="text-xs md:text-base">
          Monthly
        </option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-6 h-6 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </motion.div>
  );
}
