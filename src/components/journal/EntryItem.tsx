"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Eye, Trash2, ChevronRight } from "lucide-react";
import { Entry } from "@/types/entry.type";
import { useState } from "react";

interface EntryItemProps {
  entry: Entry;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  onViewDetail: (entry: Entry) => void;
  onDelete: (id: string) => void;
}

export default function EntryItem({
  entry,
  isExpanded,
  onToggle,
  onViewDetail,
  onDelete,
}: EntryItemProps) {
  const [showFullAnswer, setShowFullAnswer] = useState(false);
  const maxLength = 150;
  const shouldTruncate = entry.answer.length > maxLength;
  const displayedAnswer = showFullAnswer
    ? entry.answer
    : `${entry.answer.substring(0, maxLength)}${shouldTruncate ? "..." : ""}`;

  return (
    <motion.div
      className="overflow-hidden border shadow-lg rounded-xl border-primary/40"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 25px rgba(237, 148, 85, 0.15)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
    >
      <button
        onClick={() => onToggle(entry.id)}
        className="flex items-center justify-between w-full p-5 text-left transition-all duration-300 bg-white hover:from-primary/15 hover:to-primary/25"
      >
        <span className="text-lg font-semibold text-dark-brown">
          {entry.question}
        </span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-accent" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
            className="overflow-hidden bg-white"
          >
            <div className="p-5 text-lg border-t border-primary/20 text-dark-brown">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="leading-relaxed whitespace-pre-wrap"
              >
                {displayedAnswer}
              </motion.p>

              {shouldTruncate && (
                <motion.button
                  onClick={() => setShowFullAnswer(!showFullAnswer)}
                  className="flex items-center mt-2 text-sm font-medium text-primary hover:text-accent"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {showFullAnswer ? "Show Less" : "Read More"}
                  <motion.span
                    animate={{ rotate: showFullAnswer ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </motion.span>
                </motion.button>
              )}

              <motion.div
                className="flex justify-end gap-3 mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  onClick={() => onViewDetail(entry)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-all rounded-lg bg-primary hover:bg-accent md:text-base"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 4px 12px rgba(226, 94, 62, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="w-5 h-5" />
                  <span>Details</span>
                </motion.button>

                <motion.button
                  onClick={() => onDelete(entry.id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-all bg-red-400 rounded-lg hover:bg-accent md:text-base"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 4px 12px rgba(226, 94, 62, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Delete</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
