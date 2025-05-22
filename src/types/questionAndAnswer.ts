export type Answer = {
  question: string;
  answer: string;
  expanded: boolean;
  isCustom?: boolean;
};

export const allQuestions = [
  "How was your day today?",
  "What are you grateful for today?",
  "What was the best thing that happened today?",
  "What was your biggest challenge today?",
  "What lesson did you learn today?",
  "What could you do better tomorrow?",
];
