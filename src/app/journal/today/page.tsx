"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

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
  expanded: boolean;
};

export default function JournalTodayPage() {
  const { data: session, status } = useSession();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [customQuestion, setCustomQuestion] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [todayDate, setTodayDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setTodayDate(today.toLocaleDateString("id-ID", options));
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    router.push("/");
    return null;
  }

  const handleAddQuestion = (q: string) => {
    const index = answers.findIndex((a) => a.question === q);
    if (index !== -1) {
      const updated = [...answers];
      updated[index].expanded = !updated[index].expanded;
      setAnswers(updated);
    } else {
      setAnswers([...answers, { question: q, answer: "", expanded: true }]);
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
    const filled = answers.filter((a) => a.answer.trim() !== "");

    if (filled.length === 0) {
      toast.error("Isi minimal satu jawaban terlebih dahulu!");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Menyimpan Journal...");

    const res = await fetch("/api/journal/today", {
      method: "POST",
      body: JSON.stringify({ entries: answers }),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Jurnal berhasil disimpan!", { id: loadingToast });
      router.push("/journal/history");
    } else {
      toast.error("Gagal menyimpan jurnal!", { id: loadingToast });
    }
  };

  return (
    <main className="max-w-xl px-4 mx-auto mt-20">
      <h1 className="mb-1 text-2xl font-bold">✍️ Tulis Jurnal Hari Ini</h1>
      <p className="mb-6 text-gray-600">{todayDate}</p>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Pilih Pertanyaan</label>
        <div className="space-y-2">
          {questionSuggestions.map((q, i) => {
            const existing = answers.find((a) => a.question === q);
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="mb-2 border rounded"
              >
                <button
                  onClick={() => handleAddQuestion(q)}
                  className="flex items-center justify-between w-full px-3 py-2 text-left hover:bg-blue-50"
                >
                  <span>{q}</span>
                  <span className="text-blue-600">
                    {existing?.expanded ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence>
                  {existing?.expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3">
                        <textarea
                          className="w-full h-32 p-3 text-gray-800 border border-gray-300 rounded"
                          placeholder="Tuliskan jawaban Anda..."
                          value={existing.answer}
                          onChange={(e) =>
                            handleAnswerChange(
                              answers.findIndex((a) => a.question === q),
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Custom question */}
          <div className="mt-3">
            {showCustomInput ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="Tulis pertanyaanmu..."
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <button
                  onClick={handleCustomQuestionSubmit}
                  className="px-3 py-2 text-white bg-blue-600 rounded"
                >
                  Tambah
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowCustomInput(true)}
                className="w-full px-3 py-2 text-left border border-gray-300 rounded hover:bg-blue-50"
              >
                ➕ Tambahkan Pertanyaan Sendiri
              </button>
            )}
          </div>
        </div>
      </div>

      {answers.length > 0 && (
        <motion.button
          onClick={handleSubmit}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          {loading ? "Menyimpan..." : "Simpan Semua Jurnal"}
        </motion.button>
      )}
    </main>
  );
}
