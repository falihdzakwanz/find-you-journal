import { parseISO, format, startOfWeek, endOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import { Entry } from "@/types/entry.type";
import { ViewMode } from "@/types/viewMode.type";

export const groupEntries = (entries: Entry[], viewMode: ViewMode) => {
  const groups: Record<string, Entry[] | Record<string, Entry[]>> = {};

  entries.forEach((entry) => {
    const date = parseISO(entry.date);
    if (viewMode === "daily") {
      const key = format(date, "yyyy-MM-dd");
      if (!groups[key]) groups[key] = [];
      (groups[key] as Entry[]).push(entry);
    } else if (viewMode === "weekly") {
      const start = startOfWeek(date, { locale: enUS });
      const end = endOfWeek(date, { locale: enUS });
      const weekKey = `${format(start, "MMM d", { locale: enUS })} - ${format(
        end,
        "MMM d, yyyy",
        { locale: enUS }
      )}`;
      if (!groups[weekKey]) groups[weekKey] = {};

      const dayKey = format(date, "EEEE, MMM d, yyyy", { locale: enUS });
      if (!(groups[weekKey] as Record<string, Entry[]>)[dayKey]) {
        (groups[weekKey] as Record<string, Entry[]>)[dayKey] = [];
      }
      (groups[weekKey] as Record<string, Entry[]>)[dayKey].push(entry);
    } else if (viewMode === "monthly") {
      const monthKey = format(date, "MMMM yyyy", { locale: enUS });
      if (!groups[monthKey]) groups[monthKey] = {};

      const dayKey = format(date, "EEEE, MMM d, yyyy", { locale: enUS });
      if (!(groups[monthKey] as Record<string, Entry[]>)[dayKey]) {
        (groups[monthKey] as Record<string, Entry[]>)[dayKey] = [];
      }
      (groups[monthKey] as Record<string, Entry[]>)[dayKey].push(entry);
    }
  });

  return groups;
};
