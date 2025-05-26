// Base type for all entries
export interface JournalEntryBase {
  answer: string;
  question: string;
  createdAt: string;
  date: string;
  category?: string;
  isEncrypted?: boolean;
}

// Complete entry with ID (for Firebase documents)
export interface JournalEntry extends JournalEntryBase {
  id: string;
}

// For creating new entries (client → API)
export interface JournalEntryInput {
  answer: string;
  question: string;
  category?: string;
}

// Specifically for encrypted entries
export interface EncryptedJournalEntry extends JournalEntryBase {
  isEncrypted: true;
}

// For statistics
export interface JournalStats {
  totalEntries: number;
  streak: number;
  avgEntriesPerWeek: number;
  mostActiveDay: string;
  longestEntry: number;
  categories: Record<string, number>;
}
export interface JournalTodayEntry {
  question: string;
  answer: string;
  expanded: boolean;
  isCustom?: boolean;
};
