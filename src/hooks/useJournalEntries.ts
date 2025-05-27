import { useState, useEffect } from "react";
import { JournalEntry } from "@/types/entry.type";

type UseJournalEntriesResult = {
  entries: JournalEntry[];
  loading: boolean;
  error: Error | null;
  setEntries: React.Dispatch<React.SetStateAction<JournalEntry[]>>;
  refresh: () => Promise<void>;
};

export function useJournalEntries(): UseJournalEntriesResult {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/journal/history");

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `HTTP error! status: ${res.status}`);
      }

      const { data } = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Received invalid data format from API");
      }

      setEntries(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error("Failed to fetch journal entries:", error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const refresh = async () => {
    await fetchEntries();
  };

  return {
    entries,
    loading,
    error,
    setEntries,
    refresh,
  };
}
