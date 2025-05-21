import { useState } from "react";
import toast from "react-hot-toast";
import { Entry } from "@/types/entry.type";
import { useJournalEntries } from "@/hooks/useJournalEntries";

export default function useJournalHistory() {
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(
    new Set()
  );
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  const { entries, setEntries, loading } = useJournalEntries();

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Hapus jurnal?");
    if (!confirmDelete) return;

    const loadingToast = toast.loading("Menghapus...");
    const res = await fetch(`/api/journal/entry?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
      toast.success("Berhasil Menghapus Entry", { id: loadingToast });
    } else {
      toast.error("Gagal menghapus entri.", { id: loadingToast });
    }
  };

  const toggleEntry = (id: string) => {
    setExpandedEntries((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleDate = (date: string) => {
    setExpandedDates((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(date)) {
        newSet.delete(date);
      } else {
        newSet.add(date);
      }
      return newSet;
    });
  };

  return {
    selectedEntry,
    setSelectedEntry,
    expandedEntries,
    expandedDates,
    entries,
    handleDelete,
    toggleEntry,
    toggleDate,
    loading
  };
}
