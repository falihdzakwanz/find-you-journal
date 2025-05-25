"use client";

import { useState, useEffect } from "react";
import { JournalStats } from "@/types/entry.type";

export default function useJournalStats() {
  const [stats, setStats] = useState<JournalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/journal/stats");

        if (!res.ok) {
          throw new Error(res.statusText || "Failed to fetch stats");
        }

        const data = await res.json();
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
  };
}
