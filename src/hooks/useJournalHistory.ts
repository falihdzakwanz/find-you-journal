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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);
  const { entries, setEntries, loading } = useJournalEntries();

  const handleDeleteInit = (id: string) => {
    setEntryToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!entryToDelete) return;

    const loadingToast = toast.loading("Deleting...");
    const res = await fetch(`/api/journal/entry?id=${entryToDelete}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setEntries((prev) => prev.filter((e) => e.id !== entryToDelete));
      toast.success("Entry deleted successfully", { id: loadingToast });
    } else {
      toast.error("Failed to delete entry", { id: loadingToast });
    }

    setDeleteModalOpen(false);
    setEntryToDelete(null);
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
    deleteModalOpen,
    setDeleteModalOpen,
    handleDeleteInit,
    handleDeleteConfirm,
    entryToDelete,
    toggleEntry,
    toggleDate,
    loading,
  };
}
