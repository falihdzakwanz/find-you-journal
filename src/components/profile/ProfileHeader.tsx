"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmModal from "@/components/modal/ConfirmModal";

export default function ProfileHeader({
  onDeleteConfirm,
  isDeleting,
}: {
  onDeleteConfirm: () => void;
  isDeleting: boolean;
}) {
  const { data: session } = useSession();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center mb-12 text-center"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-32 h-32 mb-4 overflow-hidden rounded-full bg-primary/10"
        >
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="Profile"
              fill
              className="object-cover"
            />
          )}
        </motion.div>
        <h1 className="text-xl font-bold md:text-2xl lg:text-3xl text-dark-brown">
          {session?.user?.name}
        </h1>
        <p className="text-sm text-primary/80 sm:text-base md:text-lg">{session?.user?.email}</p>

        <motion.button
          onClick={() => setShowDeleteModal(true)}
          disabled={isDeleting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 mt-6 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50"
        >
          <Trash2 size={16} />
          {isDeleting ? "Deleting..." : "Delete Account"}
        </motion.button>
      </motion.div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={onDeleteConfirm}
        title="Delete Account"
        message="Are you sure you want to delete your account? All your data will be permanently removed."
        confirmText="Delete Account"
        cancelText="Cancel"
        confirmIcon={<Trash2 size={16} className="mr-1.5" />}
      />
    </>
  );
}
