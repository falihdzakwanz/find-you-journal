export type Entry = {
  id: string;
  answer: string;
  question: string;
  createdAt: string;
  date: string;
};

export type JournalEntry = {
  answer: string;
  createdAt: string;
  date: string;
  question: string;
  category?: string;
};

export type JournalStats = {
  totalEntries: number;
  streak: number;
  avgEntriesPerWeek: number;
  mostActiveDay: string;
  longestEntry: number;
  categories: Record<string, number>;
};