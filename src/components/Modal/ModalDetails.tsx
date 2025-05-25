import { motion, AnimatePresence } from "framer-motion";
import { X, Edit } from "lucide-react";
import { formatDateEng } from "@/utils/formatDate";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

type Entry = {
  id: string;
  answer: string;
  question: string;
  createdAt: string;
  date: string;
};

interface Props {
  selectedEntry: Entry;
  setSelectedEntry: Dispatch<SetStateAction<Entry | null>>;
}

const ModalDetails = ({ selectedEntry, setSelectedEntry }: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: 10, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 10, opacity: 0, scale: 0.98 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
          }}
          className="flex flex-col w-full max-w-2xl max-h-[90vh] overflow-hidden border-2 shadow-xl bg-neutral rounded-xl border-primary/20"
        >
          {/* Header */}
          <motion.div
            className="flex items-center justify-between p-6 bg-primary"
            whileHover={{ backgroundColor: "var(--color-accent)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white truncate">
                {selectedEntry.question}
              </h2>
              <p className="mt-1 text-sm text-white/90">
                {formatDateEng(selectedEntry.date)}
              </p>
            </div>
            <motion.button
              onClick={() => setSelectedEntry(null)}
              className="flex-shrink-0 p-1 text-white transition-colors duration-200 rounded-full hover:text-red-300 focus:outline-none"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </motion.div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <motion.div
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-6">
                <label className="block mb-3 text-sm font-medium text-dark-brown">
                  Your Response
                </label>
                <pre className="p-4 max-h-[50vh] overflow-y-auto font-sans text-base whitespace-pre-wrap break-words bg-white border rounded-lg text-dark-brown border-primary/20">
                  {selectedEntry.answer}
                </pre>
              </div>
            </motion.div>
          </div>

          {/* Footer Buttons */}
          <div className="p-6 border-t border-primary/20">
            <div className="flex justify-end gap-3">
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedEntry(null)}
                className="flex items-center px-5 py-2 text-sm font-medium transition-all bg-white border rounded-lg text-dark-brown border-primary/30 hover:shadow-sm hover:bg-gray-100"
              >
                <X className="w-4 h-4 mr-2" />
                Close
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link
                  href={`/journal/edit/${selectedEntry.date}/${selectedEntry.id}`}
                  className="flex items-center px-5 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-primary hover:bg-accent"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Entry
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalDetails;
