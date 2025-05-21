"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Entry } from "@/types/entry.type";
import { Eye, Trash2 } from "lucide-react";

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
  return (
    <motion.div
      className="overflow-hidden border rounded-lg shadow-sm border-neutral-200 bg-neutral"
      whileHover={{ scale: 1.005 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <button
        onClick={() => onToggle(entry.id)}
        className="flex items-center justify-between w-full p-4 text-left transition-colors duration-200 hover:bg-secondary/50"
      >
        <span className="font-medium">{entry.question}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-accent" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 text-base border-t border-neutral-200">
              {entry.answer}
              <div className="flex justify-end gap-2 mt-3">
                <motion.button
                  onClick={() => onViewDetail(entry)}
                  className="flex items-center px-3 py-1 text-sm text-white transition-colors rounded bg-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="w-4 h-4 lg:mr-2" />
                  <span className="hidden lg:inline">Detail</span>
                </motion.button>

                <motion.button
                  onClick={() => onDelete(entry.id)}
                  className="flex items-center px-3 py-1 text-sm text-white transition-colors bg-red-400 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 className="w-4 h-4 lg:mr-2" />
                  <span className="hidden lg:inline">Hapus</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
