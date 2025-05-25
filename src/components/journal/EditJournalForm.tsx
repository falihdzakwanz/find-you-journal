"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";

interface Props {
  initialAnswer: string;
  id: string;
}

export default function EditJournalForm({ initialAnswer, id }: Props) {
  const [answer, setAnswer] = useState(initialAnswer);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!answer.trim()) {
      toast.error("Answer cannot be empty");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Updating your entry...");

    try {
      const res = await fetch(`/api/journal/entry?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, answer }),
      });

      if (!res.ok) {
        throw new Error(res.statusText || "Failed to update entry");
      }

      toast.success("Entry updated successfully!", { id: toastId });
      router.push("/journal/history");
      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <textarea
          className="w-full min-h-[180px] p-5 text-lg border-2 rounded-xl border-primary/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 bg-white text-dark-brown"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <motion.button
          type="button"
          onClick={() => router.push("/journal/history")}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all bg-white border-2 rounded-xl border-primary/30 text-dark-brown hover:bg-gray-50 sm:text-base disabled:bg-gray-100"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
        >
          <ArrowLeft className="w-5 h-5" />
          Cancel
        </motion.button>

        <motion.button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-all rounded-xl bg-primary hover:bg-accent disabled:bg-primary/70 sm:text-base"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting || !answer.trim()}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}
