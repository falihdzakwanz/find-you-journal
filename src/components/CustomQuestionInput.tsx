"use client";

import { motion } from "framer-motion";

type CustomQuestionInputProps = {
  showCustomInput: boolean;
  customQuestion: string;
  onSetCustomQuestion: (value: string) => void;
  onSubmitCustomQuestion: () => void;
  onShowCustomInput: (show: boolean) => void;
};

export default function CustomQuestionInput({
  showCustomInput,
  customQuestion,
  onSetCustomQuestion,
  onSubmitCustomQuestion,
  onShowCustomInput,
}: CustomQuestionInputProps) {
  return (
    <motion.div
      className="mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {showCustomInput ? (
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <input
            type="text"
            value={customQuestion}
            onChange={(e) => onSetCustomQuestion(e.target.value)}
            placeholder="Your custom question..."
            className="flex-1 px-4 py-2 transition-all duration-200 border rounded-lg text-dark-brown border-primary focus:ring-2 focus:ring-dark-brown/30 focus:border-primary/50 outline-0"
            onKeyDown={(e) => e.key === "Enter" && onSubmitCustomQuestion()}
          />
          <motion.button
            onClick={onSubmitCustomQuestion}
            className="px-4 py-2 text-white transition-colors duration-200 rounded-lg bg-accent hover:bg-accent/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add
          </motion.button>
        </motion.div>
      ) : (
        <motion.button
          onClick={() => onShowCustomInput(true)}
          className="flex items-center w-full gap-2 px-4 py-3 transition-colors duration-200 border rounded-lg text-dark-brown border-primary/80 hover:bg-primary/5"
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add your own question
        </motion.button>
      )}
    </motion.div>
  );
}