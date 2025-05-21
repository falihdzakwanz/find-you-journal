import { motion, AnimatePresence } from "framer-motion";
import { X, Edit } from "lucide-react";
import formatDateIndo from "@/utils/formatDateIndo";
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

const ModalDetail = ({ selectedEntry, setSelectedEntry }: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="w-full max-w-2xl overflow-hidden bg-white shadow-xl rounded-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-primary">
            <div>
              <h2 className="text-xl font-bold text-white line-clamp-2">
                {selectedEntry.question}
              </h2>
              <p className="mt-1 text-sm text-white">
                {formatDateIndo(selectedEntry.date)}
              </p>
            </div>
            <button
              onClick={() => setSelectedEntry(null)}
              className="p-1 text-white transition-colors duration-100 rounded-full hover:text-red-400 focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Jawaban Anda
              </label>
              <div className="p-4 text-gray-800 whitespace-pre-wrap rounded-lg bg-gray-50">
                {selectedEntry.answer}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedEntry(null)}
                className="flex items-center px-5 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <X className="w-4 h-4 mr-2" />
                Tutup
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={`/journal/edit/${selectedEntry.date}/${selectedEntry.id}`}
                  className="flex items-center px-5 py-2 text-sm font-medium text-white rounded-lg bg-primary"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalDetail;
