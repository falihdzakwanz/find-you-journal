"use client";

import { motion } from "framer-motion";
import JournalHistorySkeleton from "@/components/Skeleton/JournalHistorySkeleton";
import { formatDateEng } from "@/utils/formatDate";
import { groupEntries } from "@/utils/groupEntries";
import { useJournalFilters } from "@/hooks/useJournalFilters";
import useJournalHistory from "@/hooks/useJournalHistory";
import ModalDetails from "@/components/modal/ModalDetails";
import NavigationControls from "@/components/journal/NavigationControls";
import ViewModeSelector from "@/components/journal/ViewModeSelector";
import { Entry } from "@/types/entry.type";
import GroupHeader from "@/components/journal/GroupHeader";
import EntryItem from "@/components/journal/EntryItem";
import DateGroup from "@/components/journal/DateGroup";
import EmptyState from "@/components/journal/EmptyState";

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
    loading,
  } = useJournalHistory();

  if (loading) return <JournalHistorySkeleton />;

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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm px-4 py-10 mx-auto md:max-w-md lg:max-w-3xl"
    >
      <motion.h1
        className="mb-6 text-2xl font-bold lg:text-3xl text-dark-brown"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Journal History
      </motion.h1>

      <motion.div
        className="flex flex-row items-center justify-between gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />
        <NavigationControls
          viewMode={viewMode}
          changeDay={changeDay}
          changeWeek={changeWeek}
          changeMonth={changeMonth}
        />
      </motion.div>

      <motion.div
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {visibleKeys.length === 0 ? (
          <EmptyState />
        ) : (
          visibleKeys.map((groupKey, index) => {
            const count =
              viewMode === "daily"
                ? (grouped[groupKey] as Entry[]).length
                : Object.values(
                    grouped[groupKey] as Record<string, Entry[]>
                  ).flat().length;

            return (
              <motion.div
                key={groupKey}
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
              >
                <GroupHeader
                  title={
                    viewMode === "daily"
                      ? formatDateEng(groupKey)
                      : viewMode === "weekly"
                      ? `Minggu ${groupKey}`
                      : `Bulan ${groupKey}`
                  }
                  count={count}
                />

                <div className="space-y-4">
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
      </motion.div>

      {selectedEntry && (
        <ModalDetails
          selectedEntry={selectedEntry}
          setSelectedEntry={setSelectedEntry}
        />
      )}
    </motion.main>
  );
}
