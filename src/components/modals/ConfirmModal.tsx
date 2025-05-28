"use client";

import { motion, AnimatePresence } from "framer-motion";
import { JSX } from "react";
import { X, Trash2, ArrowLeft } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmIcon?: JSX.Element;
  cancelIcon?: JSX.Element;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this entry?",
  confirmText = "Delete",
  cancelText = "Cancel",
  confirmIcon = <Trash2 size={16} className="mr-1.5" />,
  cancelIcon = <ArrowLeft size={16} className="mr-1.5" />,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
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
            className="w-full max-w-md p-6 overflow-hidden border-2 shadow-xl bg-neutral rounded-xl border-primary/20"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-medium text-dark-brown">{title}</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-1 text-gray-400 rounded-full hover:text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                <X size={18} />
              </motion.button>
            </div>

            <p className="mt-2 text-sm text-accent">{message}</p>

            <div className="flex justify-end mt-6 space-x-3">
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                  backgroundColor: "#e5e7eb",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                onClick={onClose}
                className="flex items-center px-4 py-2 text-sm font-medium text-dark-brown transition-all bg-white rounded-lg hover:shadow-sm hover:bg-gray-100 border border-primary/30"
              >
                {cancelIcon}
                {cancelText}
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "#dc2626",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                }}
                whileTap={{
                  scale: 0.97,
                  backgroundColor: "#b91c1c",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                onClick={onConfirm}
                className="flex items-center px-5 py-2 text-sm font-medium text-white transition-all bg-red-500 border rounded-lg border-primary/30 hover:shadow-sm"
              >
                {confirmIcon}
                {confirmText}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}