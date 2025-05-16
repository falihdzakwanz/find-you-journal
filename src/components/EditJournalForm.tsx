"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  initialAnswer: string;
  id: string;
}

export default function EditJournalForm({ initialAnswer, id }: Props) {
  const [answer, setAnswer] = useState(initialAnswer);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastLoading = toast.loading("Submiting...");

    const res = await fetch(`/api/journal/entry?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, answer }),
    });

    setLoading(false);
    if (res.ok) {
      toast.success("Update Success!", { id: toastLoading });
      router.push("/journal/history");
    } else {
      toast.error("Failed to Update!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="w-full border p-3 rounded h-60"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push("/journal/history")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
