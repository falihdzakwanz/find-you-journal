"use client";

import { useState, useEffect, useCallback } from "react";
import { JournalStats } from "@/types/entry.type";

type UseJournalStatsResult = {
  stats: JournalStats | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

export default function useJournalStats(): UseJournalStatsResult {
  const [stats, setStats] = useState<JournalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async (signal?: AbortSignal) => {
    try {
      setError(null);

      const res = await fetch("/api/journal/stats", { signal });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `HTTP error! status: ${res.status}`);
      }

      const { data } = await res.json();

      if (!data || typeof data !== "object") {
        throw new Error("Invalid stats data format");
      }

      setStats(data);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        const errorMessage = err.message;
        console.error("Failed to fetch journal stats:", errorMessage);
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    fetchStats(abortController.signal);

    return () => abortController.abort();
  }, [fetchStats]);

  const refresh = useCallback(async () => {
    await fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refresh,
  };
}
