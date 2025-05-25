import { useState, useEffect } from "react";
import { JournalEntry } from "@/types/entry.type";

export function useJournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEntries() {
      const res = await fetch("/api/journal/history");
      const data = await res.json();
      setEntries(data);
      setLoading(false);
    }
    fetchEntries();
  }, []);

  return { entries, loading, setEntries };
}
