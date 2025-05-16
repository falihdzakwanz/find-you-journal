"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const questionSuggestions = [
  "Bagaimana harimu hari ini?",
  "Apa yang membuat Anda bersyukur hari ini?",
  "Apa hal terbaik yang terjadi hari ini?",
  "Apa tantangan terbesar yang Anda hadapi hari ini?",
  "Apa pelajaran yang Anda ambil hari ini?",
  "Apa yang bisa Anda lakukan lebih baik besok?",
];

export default function JournalTodayPage() {
  const { data: session, status } = useSession();
  const [content, setContent] = useState("");
  const [question, setQuestion] = useState("");
  const [customQuestion, setCustomQuestion] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    router.push("/");
    return null;
  }

  const handleSubmit = async () => {
    const finalQuestion = customQuestion || question;
    if (!content.trim() || !finalQuestion.trim()) return;

    setLoading(true);

    const res = await fetch("/api/journal/today", {
      method: "POST",
      body: JSON.stringify({ content, question: finalQuestion }),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);
    if (res.ok) {
      setContent("");
      setQuestion("");
      setCustomQuestion("");
      setShowCustomInput(false);
      alert("Jurnal berhasil disimpan!");
      router.push("/journal/history");
    } else {
      alert("Gagal menyimpan jurnal!");
    }
  };

  return (
    <main className="max-w-xl mx-auto mt-20 px-4">
      <h1 className="text-2xl font-bold mb-4">✍️ Tulis Jurnal Hari Ini</h1>

      <div className="mb-4">
        <label className="font-semibold mb-2 block">Pilih Pertanyaan</label>
        <div className="space-y-2">
          {questionSuggestions.map((q, i) => (
            <button
              key={i}
              onClick={() => {
                setQuestion(q);
                setCustomQuestion("");
                setShowCustomInput(false);
              }}
              className={`block text-left w-full px-3 py-2 rounded border ${
                question === q
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              {q}
            </button>
          ))}

          {/* Tombol Tambah Pertanyaan Sendiri */}
          <button
            onClick={() => {
              setShowCustomInput(!showCustomInput);
              setQuestion("");
              setCustomQuestion("");
            }}
            className={`block text-left w-full px-3 py-2 rounded border ${
              showCustomInput ? "border-blue-600 bg-blue-50" : "border-gray-300"
            }`}
          >
            ➕ Tambahkan Pertanyaan Sendiri
          </button>
        </div>

        {showCustomInput && (
          <div className="mt-4">
            <input
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Tulis pertanyaanmu di sini..."
            />
          </div>
        )}
      </div>

      <label className="block mb-1 font-semibold">Jawaban Anda:</label>
      <textarea
        className="w-full h-60 border border-gray-300 rounded p-3 text-gray-800"
        placeholder="Tuliskan jawaban Anda di sini..."
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
