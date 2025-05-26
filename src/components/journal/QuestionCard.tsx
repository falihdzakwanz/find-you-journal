"use client";

import { motion, AnimatePresence } from "framer-motion";
import { JournalTodayEntry } from "@/types/entry.type";

type QuestionCardProps = {
  answer: JournalTodayEntry;
  index: number;
  onToggleExpand: (index: number) => void;
  onRemoveQuestion: (index: number) => void;
  onAnswerChange: (index: number, value: string) => void;
};

export default function QuestionCard({
  answer,
  index,
  onToggleExpand,
  onRemoveQuestion,
  onAnswerChange,
}: QuestionCardProps) {
  return (
    <motion.div
      className="bg-white border rounded-lg border-primary/80"
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 300,
      }}
    >
      <div
        onClick={() => onToggleExpand(index)}
        className="flex items-center justify-between w-full px-4 py-3 text-left transition-colors duration-200 rounded-t-lg cursor-pointer hover:bg-primary/3"
      >
        <span className="text-base font-medium text-dark-brown lg:text-lg">{answer.question}</span>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveQuestion(index);
            }}
            className="p-1 transition-colors text-accent/70 hover:text-accent"
            whileTap={{ scale: 0.9 }}
            title="Remove"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </motion.button>
          <motion.span
            className="text-primary"
            animate={{ rotate: answer.expanded ? 0 : 180 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </motion.span>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {answer.expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { type: "spring", damping: 15 },
                opacity: { duration: 0.2 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.2 },
                opacity: { duration: 0.1 },
              },
            }}
            className="overflow-hidden"
          >
            <div className="px-4 pt-1 pb-4">
              <textarea
                className="w-full h-32 p-3 text-base transition-all duration-200 border border-none rounded-lg text-dark-brown focus:ring-2 focus:ring-accent/50 focus:border-primary/50 outline-0 placeholder:text-dark-brown/80 bg-neutral/80 lg:text-lg"
                placeholder="Write your thoughts here..."
                value={answer.answer}
                onChange={(e) => onAnswerChange(index, e.target.value)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
