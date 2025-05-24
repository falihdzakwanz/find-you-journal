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
    <div>
      <motion.button
        onClick={() => onToggleDate(date)}
        className="flex items-center justify-between w-full p-5 overflow-hidden text-left transition-all bg-white border shadow-lg hover:from-primary/15 hover:to-primary/25 rounded-x rounded-xl border-primary/40"
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
        <h3 className="text-lg font-medium text-dark-brown ">
          {date}
          <span className="ml-2 text-sm font-normal lg:text-base">
            ({entries.length} {entries.length === 1 ? "entry" : "entries"})
          </span>
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-accent" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 pr-0 space-y-3">
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
    </div>
  );
}
