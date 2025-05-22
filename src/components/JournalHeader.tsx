"use client";

import { motion } from "framer-motion";

type JournalHeaderProps = {
  todayDate: string;
};

export default function JournalHeader({ todayDate }: JournalHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="mb-1 text-2xl font-bold text-dark-brown lg:text-3xl">
        ✍️ Today&apos;s Journal
      </h1>
      <p className="mb-6 text-dark-brown/80">{todayDate}</p>
    </motion.div>
  );
}
