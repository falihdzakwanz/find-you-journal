import { useState } from "react";
import { ViewMode } from "@/types/viewMode.type";
import { format, parseISO, isSameWeek, isSameMonth } from "date-fns";
import { id } from "date-fns/locale";

export function useJournalFilters(initialMode: ViewMode = "daily") {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);
  const [currentDate, setCurrentDate] = useState(new Date());

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

  const changeDay = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
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

  return {
    viewMode,
    setViewMode,
    currentDate,
    isInCurrent,
    changeDay,
    changeWeek,
    changeMonth,
  };
}
