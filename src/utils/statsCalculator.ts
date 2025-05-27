import { JournalEntry } from "@/types/entry.type";

export function calculateJournalStats(entries: JournalEntry[]) {
  if (entries.length === 0) {
    return {
      totalEntries: 0,
      streak: 0,
      avgEntriesPerWeek: 0,
      mostActiveDay: "No entries yet",
      longestEntry: 0,
      categories: {},
      entriesThisMonth: 0, 
    };
  }

  return {
    totalEntries: entries.length,
    streak: calculateStreak(entries),
    avgEntriesPerWeek: calculateAvgEntriesPerWeek(entries),
    mostActiveDay: calculateMostActiveDay(entries),
    longestEntry: calculateLongestEntry(entries),
    categories: calculateCategories(entries),
    entriesThisMonth: calculateCurrentMonthEntries(entries), 
  };
}

function calculateCurrentMonthEntries(entries: JournalEntry[]): number {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return entries.filter((entry) => {
    const entryDate = new Date(entry.date);
    return (
      entryDate.getMonth() === currentMonth &&
      entryDate.getFullYear() === currentYear
    );
  }).length;
}

export function calculateStreak(entries: JournalEntry[]): number {
  if (entries.length === 0) return 0;

  // Sort entries by date (newest first)
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let streak = 1;
  let currentDate = new Date(sortedEntries[0].date);

  // Check if yesterday exists in entries
  for (let i = 1; i < sortedEntries.length; i++) {
    const entryDate = new Date(sortedEntries[i].date);
    const diffDays = Math.floor(
      (currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      streak++;
      currentDate = entryDate;
    } else if (diffDays > 1) {
      break; // Streak broken
    }
  }

  return streak;
}

// Helper export function to calculate average entries per week
export function calculateAvgEntriesPerWeek(entries: JournalEntry[]): number {
  if (entries.length === 0) return 0;

  // Sort entries by date (oldest first)
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const firstDate = new Date(sortedEntries[0].date);
  const lastDate = new Date(sortedEntries[sortedEntries.length - 1].date);

  const diffWeeks =
    Math.ceil(
      (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
    ) || 1; // Prevent division by zero

  return parseFloat((entries.length / diffWeeks).toFixed(1));
}

// Helper export function to calculate most active day
export function calculateMostActiveDay(entries: JournalEntry[]): string {
  if (entries.length === 0) return "No entries";

  const dayCount: Record<string, number> = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  };

  entries.forEach((entry) => {
    const day = new Date(entry.date).toLocaleDateString("en-US", {
      weekday: "long",
    });
    dayCount[day]++;
  });

  return Object.entries(dayCount).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
}

// Helper export function to calculate longest entry
export function calculateLongestEntry(entries: JournalEntry[]): number {
  if (entries.length === 0) return 0;
  return Math.max(...entries.map((entry) => entry.answer.split(/\s+/).length));
}

export function calculateCategories(
  entries: JournalEntry[]
): Record<string, number> {
  const categories: Record<string, number> = {};

  entries.forEach((entry) => {
    const category = entry.category || "Uncategorized";
    categories[category] = (categories[category] || 0) + 1;
  });

  return categories;
}
