"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  initialContent: string;
  date: string;
}

export default function EditJournalForm({ initialContent, date }: Props) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/journal/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, content }),
    });

    setLoading(false);
    if (res.ok) {
      router.push("/journal/history");
    } else {
      alert("Gagal menyimpan perubahan");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="w-full border p-3 rounded h-60"
        value={content}
        onChange={(e) => setContent(e.target.value)}
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
