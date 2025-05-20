"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  isSameWeek,
  isSameMonth,
} from "date-fns";
import { id } from "date-fns/locale";
import { ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import ModalDetail from "@/components/ModalDetail";
import { Entry } from "@/types/entry.type";
import EntryItem from "@/components/EntryItem";
import NavigationControls from "@/components/NavigationControls";
import ViewModeSelector from "@/components/ViewModeSelector";
import { ViewMode } from "@/types/viewMode.type";

export default function JournalHistoryPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("weekly");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    async function fetchEntries() {
      const res = await fetch("/api/journal/history");
      const data = await res.json();
      setEntries(data);
      setLoading(false);
    }
    fetchEntries();
  }, []);

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

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const toggleDay = (key: string) => {
    setExpandedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const isInCurrent = (entryDate: string) => {
    const date = parseISO(entryDate);
    if (viewMode === "weekly") {
      return isSameWeek(date, currentDate, { locale: id });
    } else if (viewMode === "monthly") {
      return isSameMonth(date, currentDate);
    } else {
      return format(date, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd");
    }
  };

  const changeWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    setCurrentDate(newDate);
  };

  const changeMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  // Grup utama: daily / weekly / monthly
  const groupEntries = () => {
    const groups: Record<string, Entry[] | Record<string, Entry[]>> = {};

    entries.forEach((entry) => {
      const date = parseISO(entry.date);
      if (viewMode === "daily") {
        const key = format(date, "yyyy-MM-dd");
        if (!groups[key]) groups[key] = [];
        (groups[key] as Entry[]).push(entry);
      } else if (viewMode === "weekly") {
        const start = startOfWeek(date, { locale: id });
        const end = endOfWeek(date, { locale: id });
        const weekKey = `${format(start, "d MMM", { locale: id })} - ${format(
          end,
          "d MMM yyyy",
          { locale: id }
        )}`;
        if (!groups[weekKey]) groups[weekKey] = {};

        const dayKey = format(date, "EEEE, d MMM yyyy", { locale: id });
        if (!(groups[weekKey] as Record<string, Entry[]>)[dayKey]) {
          (groups[weekKey] as Record<string, Entry[]>)[dayKey] = [];
        }
        (groups[weekKey] as Record<string, Entry[]>)[dayKey].push(entry);
      } else if (viewMode === "monthly") {
        const monthKey = format(date, "MMMM yyyy", { locale: id });
        if (!groups[monthKey]) groups[monthKey] = {};

        const dayKey = format(date, "EEEE, d MMM yyyy", { locale: id });
        if (!(groups[monthKey] as Record<string, Entry[]>)[dayKey]) {
          (groups[monthKey] as Record<string, Entry[]>)[dayKey] = [];
        }
        (groups[monthKey] as Record<string, Entry[]>)[dayKey].push(entry);
      }
    });

    return groups;
  };

  const grouped = groupEntries();

  const visibleKeys = Object.keys(grouped).filter((key) => {
    const group = grouped[key];
    if (viewMode === "daily") {
      return (group as Entry[]).some((entry) => isInCurrent(entry.date));
    } else {
      const subGroups = group as Record<string, Entry[]>;
      return Object.values(subGroups).some((entries) =>
        entries.some((entry) => isInCurrent(entry.date))
      );
    }
  });

  return (
    <main className="max-w-3xl mx-auto p-4 text-base">
      <h1 className="text-2xl font-bold mb-4">Riwayat Jurnal</h1>

      {/* Dropdown tampilan dan navigasi */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
        <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode}/>
        <NavigationControls
          viewMode={viewMode}
          changeWeek={changeWeek}
          changeMonth={changeMonth}
        />
      </div>

      {/* Konten */}
      <div className="space-y-4">
        {visibleKeys.length === 0 ? (
          <p className="text-center">Tidak ada entri pada periode ini.</p>
        ) : (
          visibleKeys.map((groupKey) => (
            <div key={groupKey} className="border rounded shadow-sm">
              <button
                onClick={() => toggleGroup(groupKey)}
                className="w-full text-left p-4 bg-gray-100 font-semibold flex justify-between items-center"
              >
                <span>
                  {groupKey}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    (
                    {viewMode === "daily"
                      ? (grouped[groupKey] as Entry[]).length
                      : Object.values(
                          grouped[groupKey] as Record<string, Entry[]>
                        ).flat().length}
                    {" entri)"}
                  </span>
                </span>
                <motion.div
                  animate={{ rotate: expandedGroups.has(groupKey) ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {expandedGroups.has(groupKey) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <ul className="p-4 space-y-3">
                      {viewMode === "daily"
                        ? (grouped[groupKey] as Entry[]).map((entry) => (
                            <EntryItem
                              key={entry.id}
                              entry={entry}
                              onView={() => setSelectedEntry(entry)}
                              onDelete={() => handleDelete(entry.id)}
                            />
                          ))
                        : Object.entries(
                            grouped[groupKey] as Record<string, Entry[]>
                          ).map(([dayKey, entries]) => (
                            <div key={dayKey}>
                              <button
                                onClick={() => toggleDay(dayKey)}
                                className="w-full text-left font-medium text-base py-2 px-3 bg-gray-50 flex justify-between items-center rounded"
                              >
                                <span>
                                  {dayKey}{" "}
                                  <span className="text-sm font-normal text-gray-500">
                                    ({entries.length} entri)
                                  </span>
                                </span>
                                <motion.div
                                  animate={{
                                    rotate: expandedDays.has(dayKey) ? 180 : 0,
                                  }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <ChevronDown className="w-4 h-4 text-gray-500" />
                                </motion.div>
                              </button>
                              <AnimatePresence initial={false}>
                                {expandedDays.has(dayKey) && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden mt-2 gap-2"
                                  >
                                    {entries.map((entry) => (
                                      <EntryItem
                                        key={entry.id}
                                        entry={entry}
                                        onView={() => setSelectedEntry(entry)}
                                        onDelete={() => handleDelete(entry.id)}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>

      {/* Modal Detail */}
      {selectedEntry && (
        <ModalDetail
          selectedEntry={selectedEntry}
          setSelectedEntry={setSelectedEntry}
        />
      )}
    </main>
  );
}
