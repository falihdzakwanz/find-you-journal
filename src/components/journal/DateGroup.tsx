"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Entry } from "@/types/entry.type";
import EntryItem from "./EntryItem";

interface DateGroupProps {
  date: string;
  entries: Entry[];
  isExpanded: boolean;
  onToggleDate: (date: string) => void;
  expandedEntries: Set<string>;
  onToggleEntry: (id: string) => void;
  onViewDetail: (entry: Entry) => void;
  onDelete: (id: string) => void;
}

export default function DateGroup({
  date,
  entries,
  isExpanded,
  onToggleDate,
  expandedEntries,
  onToggleEntry,
  onViewDetail,
  onDelete,
}: DateGroupProps) {
  return (
    <motion.div
      className="overflow-hidden border rounded-lg shadow-sm border-neutral-200 bg-neutral"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <button
        onClick={() => onToggleDate(date)}
        className="flex items-center justify-between w-full p-4 text-left transition-colors duration-200 hover:bg-secondary/50"
      >
        <h3 className="font-medium text-primary-800">
          {date}
          <span className="ml-2 text-sm font-normal text-neutral-500">
            ({entries.length} entri)
          </span>
        </h3>
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
            <div className="p-4 space-y-3 border-t border-neutral-200">
              {entries.map((entry) => (
                <EntryItem
                  key={entry.id}
                  entry={entry}
                  isExpanded={expandedEntries.has(entry.id)}
                  onToggle={onToggleEntry}
                  onViewDetail={onViewDetail}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
