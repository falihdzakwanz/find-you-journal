"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import JournalTodaySkeleton from "@/components/skeletonLoading/JournalTodaySkeleton";
import JournalHeader from "@/components/journal/JournalHeader";
import QuestionCard from "@/components/journal/QuestionCard";
import QuestionSuggestions from "@/components/journal/QuestionSuggestions";
import CustomQuestionInput from "@/components/journal/CustomQuestionInput";
import SubmitButton from "@/components/ui/SubmitButton";
import { JournalTodayEntry } from "@/types/entry.type";
import { allQuestions } from "@/lib/questions";

export default function JournalTodayPage() {
  const { status } = useSession();
  const router = useRouter();

  const [entries, setEntries] = useState<JournalTodayEntry[]>([
    { question: allQuestions[0], answer: "", expanded: true },
  ]);
  const [customQuestion, setCustomQuestion] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [todayDate, setTodayDate] = useState("");

  const suggestionQuestions = allQuestions.filter(
    (q) => !entries.some((a) => a.question === q)
  );

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setTodayDate(today.toLocaleDateString("en-US", options));
  }, []);

  const handleAddQuestion = (q: string) => {
    if (!entries.find((a) => a.question === q)) {
      setEntries([...entries, { question: q, answer: "", expanded: true }]);
    }
  };

  const handleCustomQuestionSubmit = () => {
    const trimmed = customQuestion.trim();
    if (trimmed && !entries.find((a) => a.question === trimmed)) {
      setEntries([
        ...entries,
        { question: trimmed, answer: "", expanded: true, isCustom: true },
      ]);
      setCustomQuestion("");
      setShowCustomInput(false);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updated = [...entries];
    updated[index].answer = value;
    setEntries(updated);
  };

  const toggleExpand = (index: number) => {
    const updated = [...entries];
    updated[index].expanded = !updated[index].expanded;
    setEntries(updated);
  };

  const removeQuestion = (index: number) => {
    const removed = entries[index];
    setEntries((prev) => prev.filter((_, i) => i !== index));

    if (!removed.isCustom && !allQuestions.includes(removed.question)) {
      allQuestions.push(removed.question);
    }
  };

  const handleSubmit = async () => {
    const filled = entries.filter((a) => a.answer.trim() !== "");

    if (filled.length === 0) {
      toast.error("Please fill at least one answer!");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Saving Journal...");

    const res = await fetch("/api/journal/today", {
      method: "POST",
      body: JSON.stringify({ entries: entries }),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Journal saved successfully!", { id: loadingToast });
      router.push("/journal/history");
    } else {
      toast.error("Failed to save journal!", { id: loadingToast });
    }
  };

  if (status === "loading") return <JournalTodaySkeleton />;

  return (
    <main className="w-full max-w-sm px-4 py-10 mx-auto md:max-w-md lg:max-w-2xl">
      <JournalHeader todayDate={todayDate} />

      <div className="space-y-4">
        <AnimatePresence>
          {entries.map((a, i) => (
            <QuestionCard
              key={a.question}
              answer={a}
              index={i}
              onToggleExpand={toggleExpand}
              onRemoveQuestion={removeQuestion}
              onAnswerChange={handleAnswerChange}
            />
          ))}
        </AnimatePresence>

        {suggestionQuestions.length > 0 && (
          <QuestionSuggestions
            showSuggestions={showSuggestions}
            suggestionQuestions={suggestionQuestions}
            onAddQuestion={handleAddQuestion}
            onToggleSuggestions={() => setShowSuggestions(!showSuggestions)}
          />
        )}

        <CustomQuestionInput
          showCustomInput={showCustomInput}
          customQuestion={customQuestion}
          onSetCustomQuestion={setCustomQuestion}
          onSubmitCustomQuestion={handleCustomQuestionSubmit}
          onShowCustomInput={setShowCustomInput}
        />
      </div>

      <SubmitButton
        loading={loading}
        answersLength={entries.length}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
