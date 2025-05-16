"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalDetail from "@/components/ModalDetail";
import formatDateIndo from "@/utils/formatDateIndo";
import toast from "react-hot-toast";
import { Entry } from "@/types/entry.type";
import { ChevronDown } from "lucide-react";

export default function JournalHistoryPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [searchDate, setSearchDate] = useState("");
  const [expandedDate, setExpandedDate] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEntries() {
      const res = await fetch("/api/journal/history");
      const data = await res.json();
      setEntries(data);
      setLoading(false);

      // Expand today's date by default
      const today = new Date().toISOString().slice(0, 10);
      const hasToday = data.some((entry: Entry) => entry.date === today);
      if (hasToday) {
        setExpandedDate(today);
      }
    }

    fetchEntries();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(`Hapus jurnal?`);
    if (!confirmDelete) return;

    const loadingToast = toast.loading("Menghapus...")
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

  const filteredEntries = searchDate
    ? entries.filter((e) => e.date.includes(searchDate))
    : entries;

  // Group by date
  const groupedEntries: { [date: string]: Entry[] } = {};
  filteredEntries.forEach((entry) => {
    if (!groupedEntries[entry.date]) {
      groupedEntries[entry.date] = [];
    }
    groupedEntries[entry.date].push(entry);
  });

  if (loading) return <p className="text-center">Loading...</p>;
  if (entries.length === 0)
    return <p className="text-center">Belum ada jurnal tersimpan.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Riwayat Jurnal</h1>

      {/* Input pencarian */}
      <input
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="space-y-4">
        {Object.keys(groupedEntries)
          .sort((a, b) => b.localeCompare(a)) // terbaru ke lama
          .map((date) => (
            <div key={date} className="border rounded-lg shadow-sm">
              <button
                className="w-full text-left p-4 bg-gray-100 font-semibold flex justify-between items-center"
                onClick={() =>
                  setExpandedDate((prev) => (prev === date ? null : date))
                }
              >
                <span>
                  {formatDateIndo(date)}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    ({groupedEntries[date].length} entri)
                  </span>
                </span>

                {/* Ikon dengan rotasi */}
                <motion.div
                  animate={{ rotate: expandedDate === date ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {expandedDate === date && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <ul className="p-4 space-y-3">
                      {groupedEntries[date].map((entry) => (
                        <li
                          key={entry.id}
                          className="p-4 border rounded-lg flex justify-between items-start"
                        >
                          <div>
                            <p className="text-sm text-blue-600 italic mb-1">
                              Pertanyaan: {entry.question}
                            </p>
                            <p className="truncate max-w-xs">{entry.answer}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedEntry(entry)}
                              className="text-blue-500 hover:underline"
                            >
                              Detail
                            </button>
                            <button
                              onClick={() => handleDelete(entry.id)}
                              className="text-red-500 hover:underline"
                            >
                              Hapus
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
      </div>

      {/* Modal Detail */}
      {selectedEntry && (
        <ModalDetail
          selectedEntry={selectedEntry}
          setSelectedEntry={setSelectedEntry}
        />
      )}
    </div>
  );
}
