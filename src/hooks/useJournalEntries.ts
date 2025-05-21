import { useState, useEffect } from "react";
import { Entry } from "@/types/entry.type";

export function useJournalEntries() {
  const [entries, setEntries] = useState<Entry[]>([]);
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
