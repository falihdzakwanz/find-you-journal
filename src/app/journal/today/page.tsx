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

type Answer = {
  question: string;
  answer: string;
};

export default function JournalTodayPage() {
  const { data: session, status } = useSession();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [customQuestion, setCustomQuestion] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    router.push("/");
    return null;
  }

  const handleAddQuestion = (q: string) => {
    if (!answers.some((a) => a.question === q)) {
      setAnswers([...answers, { question: q, answer: "" }]);
    }
  };

  const handleCustomQuestionSubmit = () => {
    if (customQuestion.trim()) {
      handleAddQuestion(customQuestion.trim());
      setCustomQuestion("");
      setShowCustomInput(false);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index].answer = value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (answers.length === 0 || answers.some((a) => !a.answer.trim())) {
      alert("Isi semua jawaban terlebih dahulu!");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/journal/today", {
      method: "POST",
      body: JSON.stringify({ entries: answers }),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);
    if (res.ok) {
      alert("Jurnal berhasil disimpan!");
      router.push("/journal/history");
    } else {
      console.log(res)
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
            <div
              key={i}
              className="flex items-center justify-between border px-3 py-2 rounded hover:bg-blue-50"
            >
              <span>{q}</span>
              <button
                onClick={() => handleAddQuestion(q)}
                className="text-blue-600 font-bold text-lg"
              >
                +
              </button>
            </div>
          ))}

          <div className="mt-3">
            {showCustomInput ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="Tulis pertanyaanmu..."
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <button
                  onClick={handleCustomQuestionSubmit}
                  className="bg-blue-600 text-white px-3 py-2 rounded"
                >
                  Tambah
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowCustomInput(true)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-left hover:bg-blue-50"
              >
                ➕ Tambahkan Pertanyaan Sendiri
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Daftar pertanyaan yang dipilih */}
      {answers.map((item, index) => (
        <div key={index} className="mb-6">
          <label className="block font-semibold mb-1">{item.question}</label>
          <textarea
            className="w-full h-32 border border-gray-300 rounded p-3 text-gray-800"
            placeholder="Tuliskan jawaban Anda..."
            value={item.answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
        </div>
      ))}

      {answers.length > 0 && (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Menyimpan..." : "Simpan Semua Jurnal"}
        </button>
      )}
    </main>
  );
}
