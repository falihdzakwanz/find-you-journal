"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import JournalTodaySkeleton from "@/components/JournalTodaySkeleton";

const allQuestions = [
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
  isCustom?: boolean;
};

export default function JournalTodayPage() {
  const { status } = useSession();
  const router = useRouter();

  const [answers, setAnswers] = useState<Answer[]>([
    { question: allQuestions[0], answer: "", expanded: true }
  ]);
  const [customQuestion, setCustomQuestion] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [todayDate, setTodayDate] = useState("");

  const initialQuestions = allQuestions;

  const suggestionQuestions = initialQuestions.filter(
    (q) => !answers.some((a) => a.question === q)
  );

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

  if (status === "loading") return <JournalTodaySkeleton />;

  const handleAddQuestion = (q: string) => {
    if (!answers.find((a) => a.question === q)) {
      setAnswers([...answers, { question: q, answer: "", expanded: true }]);
    }
  };

  const handleCustomQuestionSubmit = () => {
    const trimmed = customQuestion.trim();
    if (trimmed && !answers.find((a) => a.question === trimmed)) {
      setAnswers([
        ...answers,
        { question: trimmed, answer: "", expanded: true, isCustom: true },
      ]);
      setCustomQuestion("");
      setShowCustomInput(false);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index].answer = value;
    setAnswers(updated);
  };

  const toggleExpand = (index: number) => {
    const updated = [...answers];
    updated[index].expanded = !updated[index].expanded;
    setAnswers(updated);
  };

  const removeQuestion = (index: number) => {
    const removed = answers[index];
    setAnswers((prev) => prev.filter((_, i) => i !== index));

    // jika bukan pertanyaan custom, tambahkan ke suggestion
    if (!removed.isCustom && !initialQuestions.includes(removed.question)) {
      initialQuestions.push(removed.question);
    }
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
    <main className="w-full max-w-sm px-4 py-10 mx-auto md:max-w-md lg:max-w-2xl">
      <h1 className="mb-1 text-2xl font-bold">✍️ Tulis Jurnal Hari Ini</h1>
      <p className="mb-6 text-gray-600">{todayDate}</p>

      <div className="space-y-4">
        <AnimatePresence>
          {answers.map((a, i) => (
            <motion.div
              key={a.question}
              className="border rounded"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div
                onClick={() => toggleExpand(i)}
                className="flex items-center justify-between w-full px-3 py-2 text-left cursor-pointer hover:bg-blue-50"
              >
                <span>{a.question}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeQuestion(i);
                    }}
                    className="text-red-500 transition-colors duration-200 hover:text-red-700"
                    title="Hapus"
                  >
                    🗑️
                  </button>
                  <span className="text-blue-600">
                    {a.expanded ? "−" : "+"}
                  </span>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {a.expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3">
                      <textarea
                        className="w-full h-32 p-3 text-gray-800 border border-gray-300 rounded"
                        placeholder="Tuliskan jawaban Anda..."
                        value={a.answer}
                        onChange={(e) => handleAnswerChange(i, e.target.value)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Suggestion Toggle */}
        {suggestionQuestions.length > 0 && (
          <div>
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="w-full px-3 py-2 text-left border border-gray-300 rounded hover:bg-blue-50"
            >
              {showSuggestions
                ? "⬆️ Sembunyikan Saran Pertanyaan"
                : "➕ Lihat Saran Pertanyaan"}
            </button>

            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 space-y-2"
                >
                  {suggestionQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleAddQuestion(q)}
                      className="block w-full px-3 py-2 text-left border border-gray-300 rounded hover:bg-blue-50"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

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
                className="px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
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

      {answers.length > 0 && (
        <motion.button
          onClick={handleSubmit}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 mt-6 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          {loading ? "Menyimpan..." : "Simpan Semua Jurnal"}
        </motion.button>
      )}
    </main>
  );
}