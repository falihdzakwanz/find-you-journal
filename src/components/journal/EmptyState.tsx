"use client";

import { motion } from "framer-motion";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 text-center text-primary md:text-lg lg:text-xl"
      >
        No entries for this period.
      </motion.p>
    </div>
  );
}
