"use client";

import { motion, AnimatePresence } from "framer-motion";

type QuestionSuggestionsProps = {
  showSuggestions: boolean;
  suggestionQuestions: string[];
  onAddQuestion: (question: string) => void;
  onToggleSuggestions: () => void;
};

export default function QuestionSuggestions({
  showSuggestions,
  suggestionQuestions,
  onAddQuestion,
  onToggleSuggestions,
}: QuestionSuggestionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <motion.button
        onClick={onToggleSuggestions}
        className="flex items-center justify-between w-full px-4 py-3 text-base text-left transition-colors duration-200 bg-white border rounded-lg border-primary/80 hover:bg-white/50 lg:text-lg"
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-dark-brown">
          {showSuggestions ? "Hide suggestions" : "Show question suggestions"}
        </span>
        <motion.span
          animate={{ rotate: showSuggestions ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-primary"
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
      </motion.button>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                opacity: { duration: 0.3 },
                height: { type: "spring", damping: 15 },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                opacity: { duration: 0.2 },
                height: { duration: 0.3 },
              },
            }}
            className="pl-2 mt-2 space-y-2"
          >
            {suggestionQuestions.map((q, i) => (
              <motion.button
                key={i}
                onClick={() => onAddQuestion(q)}
                className="block w-full px-4 py-2 text-base text-left transition-all duration-200 bg-white border rounded-lg text-dark-brown border-primary/50 hover:bg-white/50 lg:text-lg"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: i * 0.05 },
                }}
              >
                {q}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
