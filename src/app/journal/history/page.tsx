"use client";

import { motion } from "framer-motion";
import JournalHistorySkeleton from "@/components/JournalHistorySkeleton";
import formatDateIndo from "@/utils/formatDateIndo";
import { groupEntries } from "@/utils/groupEntries";
import { useJournalFilters } from "@/hooks/useJournalFilters";
import useJournalHistory from "@/hooks/useJournalHistory";
import ModalDetail from "@/components/ModalDetail";
import NavigationControls from "@/components/NavigationControls";
import ViewModeSelector from "@/components/ViewModeSelector";
import { Entry } from "@/types/entry.type";
import GroupHeader from "@/components/GroupHeader";
import EntryItem from "@/components/EntryItem";
import DateGroup from "@/components/DateGroup";
import EmptyState from "@/components/EmptyState";

export default function JournalHistoryPage() {
  const {
    viewMode,
    setViewMode,
    isInCurrent,
    changeDay,
    changeWeek,
    changeMonth,
  } = useJournalFilters();
  const {
    selectedEntry,
    setSelectedEntry,
    expandedEntries,
    expandedDates,
    entries,
    handleDelete,
    toggleEntry,
    toggleDate,
    loading
  } = useJournalHistory();

  if (loading === true) return <JournalHistorySkeleton />;

  const grouped = groupEntries(entries, viewMode);

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
    <main className="max-w-3xl p-4 mx-auto text-base">
      <h1 className="mb-4 text-2xl font-bold text-base-800">Riwayat Jurnal</h1>

      <div className="flex flex-col justify-between gap-2 mb-6 sm:flex-row">
        <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />
        <NavigationControls
          viewMode={viewMode}
          changeDay={changeDay}
          changeWeek={changeWeek}
          changeMonth={changeMonth}
        />
      </div>

      <div className="space-y-6">
        {visibleKeys.length === 0 ? (
          <EmptyState />
        ) : (
          visibleKeys.map((groupKey) => {
            const count =
              viewMode === "daily"
                ? (grouped[groupKey] as Entry[]).length
                : Object.values(grouped[groupKey] as Record<string, Entry[]>)
                    .flat().length;

            return (
              <motion.div
                key={groupKey}
                className="space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <GroupHeader
                  title={
                    viewMode === "daily"
                      ? formatDateIndo(groupKey)
                      : viewMode === "weekly"
                      ? `Minggu ${groupKey}`
                      : `Bulan ${groupKey}`
                  }
                  count={count}
                />

                <div className="space-y-3">
                  {viewMode === "daily"
                    ? (grouped[groupKey] as Entry[]).map((entry) => (
                        <EntryItem
                          key={entry.id}
                          entry={entry}
                          isExpanded={expandedEntries.has(entry.id)}
                          onToggle={toggleEntry}
                          onViewDetail={setSelectedEntry}
                          onDelete={handleDelete}
                        />
                      ))
                    : Object.entries(
                        grouped[groupKey] as Record<string, Entry[]>
                      ).map(([dayKey, dayEntries]) => (
                        <DateGroup
                          key={dayKey}
                          date={dayKey}
                          entries={dayEntries}
                          isExpanded={expandedDates.has(dayKey)}
                          onToggleDate={toggleDate}
                          expandedEntries={expandedEntries}
                          onToggleEntry={toggleEntry}
                          onViewDetail={setSelectedEntry}
                          onDelete={handleDelete}
                        />
                      ))}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {selectedEntry && (
        <ModalDetail
          selectedEntry={selectedEntry}
          setSelectedEntry={setSelectedEntry}
        />
      )}
    </main>
  );
}