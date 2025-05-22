"use client";

import { motion } from "framer-motion";

type SubmitButtonProps = {
  loading: boolean;
  answersLength: number;
  onSubmit: () => void;
};

export default function SubmitButton({
  loading,
  answersLength,
  onSubmit,
}: SubmitButtonProps) {
  if (answersLength === 0) return null;

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <motion.button
        onClick={onSubmit}
        disabled={loading}
        className="flex items-center justify-center w-full gap-2 px-6 py-3 text-white transition-colors duration-200 rounded-lg bg-primary hover:bg-primary/90"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="block w-5 h-5 border-2 border-white rounded-full border-t-transparent"
            />
            Saving...
          </>
        ) : (
          <>
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
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Save All Entries
          </>
        )}
      </motion.button>
    </motion.div>
  );
}
