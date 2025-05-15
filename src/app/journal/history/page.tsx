"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Entry = {
  id: string;
  content: string;
  createdAt: string;
  date: string;
};

export default function JournalHistoryPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [searchDate, setSearchDate] = useState("");
  const router = useRouter();

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
    const confirmDelete = confirm(`Hapus jurnal tanggal ${id}?`);
    if (!confirmDelete) return;

    const res = await fetch(`/api/journal/delete?date=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } else {
      alert("Gagal menghapus entri.");
    }
  };

  const filteredEntries = searchDate
    ? entries.filter((e) => e.date.includes(searchDate))
    : entries;

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

      <ul className="space-y-4">
        {filteredEntries.map((entry) => (
          <li key={entry.id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{entry.date}</p>
                <p className="truncate max-w-xs">{entry.content}</p>
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
            </div>
          </li>
        ))}
      </ul>

      {/* Modal Detail */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <h2 className="text-lg font-semibold mb-2">
              Edit Jurnal - {selectedEntry.date}
            </h2>
            <textarea
              className="w-full border p-2 rounded"
              rows={6}
              value={selectedEntry.content}
              onChange={(e) =>
                setSelectedEntry({ ...selectedEntry, content: e.target.value })
              }
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setSelectedEntry(null)}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={async () => {
                  const res = await fetch("/api/journal/edit", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      date: selectedEntry.date,
                      content: selectedEntry.content,
                    }),
                  });
                  if (res.ok) {
                    setEntries((prev) =>
                      prev.map((e) =>
                        e.id === selectedEntry.id
                          ? { ...e, content: selectedEntry.content }
                          : e
                      )
                    );
                    setSelectedEntry(null);
                  } else {
                    alert("Gagal mengupdate jurnal.");
                  }
                }}
              >
                Simpan
              </button>
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded"
                onClick={() =>
                  router.push(`/journal/edit/${selectedEntry.date}`)
                }
              >
                Edit Lanjutan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
