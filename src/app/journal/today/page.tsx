"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import JournalTodaySkeleton from "@/components/Skeleton/JournalTodaySkeleton";
import JournalHeader from "@/components/journal/JournalHeader";
import QuestionCard from "@/components/journal/QuestionCard";
import QuestionSuggestions from "@/components/journal/QuestionSuggestions";
import CustomQuestionInput from "@/components/journal/CustomQuestionInput";
import SubmitButton from "@/components/ui/SubmitButton";
import { Answer, allQuestions } from "@/types/questionAndAnswer";

export default function JournalTodayPage() {
  const { status } = useSession();
  const router = useRouter();

  const [answers, setAnswers] = useState<Answer[]>([
    { question: allQuestions[0], answer: "", expanded: true },
  ]);
  const [customQuestion, setCustomQuestion] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [todayDate, setTodayDate] = useState("");

  const suggestionQuestions = allQuestions.filter(
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
    setTodayDate(today.toLocaleDateString("en-US", options));
  }, []);

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

    if (!removed.isCustom && !allQuestions.includes(removed.question)) {
      allQuestions.push(removed.question);
    }
  };

  const handleSubmit = async () => {
    const filled = answers.filter((a) => a.answer.trim() !== "");

    if (filled.length === 0) {
      toast.error("Please fill at least one answer!");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Saving Journal...");

    const res = await fetch("/api/journal/today", {
      method: "POST",
      body: JSON.stringify({ entries: answers }),
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
          {answers.map((a, i) => (
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
        answersLength={answers.length}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
