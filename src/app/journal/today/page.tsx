"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JournalTodayPage() {
  const { data: session, status } = useSession();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    router.push("/");
    return null;
  }

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setLoading(true);

    const res = await fetch("/api/journal/today", {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);
    if (res.ok) {
      setContent("");
      alert("Jurnal berhasil disimpan!");
      router.push("/journal/history");
    } else {
      alert("Gagal menyimpan jurnal!");
    }
  };

  return (
    <main className="max-w-xl mx-auto mt-20 px-4">
      <h1 className="text-2xl font-bold mb-4">✍️ Tulis Jurnal Hari Ini</h1>
      <textarea
        className="w-full h-60 border border-gray-300 rounded p-3 text-gray-800"
        placeholder="Bagaimana harimu hari ini?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Menyimpan..." : "Simpan Jurnal"}
      </button>
    </main>
  );
}
