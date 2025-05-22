"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { signIn } from "next-auth/react";

interface AuthButtonProps {
  isAuthenticated: boolean;
  userName?: string | null;
  onWriteClick?: () => void;
}

export const AuthButton = ({
  isAuthenticated,
  userName,
  onWriteClick,
}: AuthButtonProps) => {
  if (isAuthenticated) {
    return (
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <p className="mb-6 text-lg text-accent">Welcome, {userName}</p>
        <motion.button
          onClick={onWriteClick}
          className="bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          whileFocus={{
            scale: 1.05,
            boxShadow: "0 0 0 3px rgba(255,187,112,0.5)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          ✍️ Start Journaling
        </motion.button>
      </div>
    );
  }

  return (
    <motion.button
      onClick={() => signIn("google")}
      className="bg-primary text-white py-3.5 px-7 rounded-lg font-bold shadow-md flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      whileFocus={{
        scale: 1.05,
        boxShadow: "0 0 0 3px rgba(255,187,112,0.5)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Image
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        width={20}
        height={20}
      />
      Sign in with Google
    </motion.button>
  );
};
