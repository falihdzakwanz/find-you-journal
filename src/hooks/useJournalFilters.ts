import { useState } from "react";
import { ViewMode } from "@/types/viewMode.type";
import { format, parseISO, isSameWeek, isSameMonth } from "date-fns";
import { enUS } from "date-fns/locale";

export function useJournalFilters(initialMode: ViewMode = "daily") {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);
  const [dailyDate, setDailyDate] = useState(new Date());
  const [weeklyDate, setWeeklyDate] = useState(new Date());
  const [monthlyDate, setMonthlyDate] = useState(new Date());

  const getCurrentDate = () => {
    switch (viewMode) {
      case "weekly":
        return weeklyDate;
      case "monthly":
        return monthlyDate;
      default:
        return dailyDate;
    }
  };

  const isInCurrent = (entryDate: string) => {
    const date = parseISO(entryDate);
    const currentDate = getCurrentDate();

    if (viewMode === "weekly") {
      return isSameWeek(date, currentDate, { locale: enUS });
    } else if (viewMode === "monthly") {
      return isSameMonth(date, currentDate);
    } else {
      return format(date, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd");
    }
  };

  const changeDay = (direction: "prev" | "next") => {
    const newDate = new Date(dailyDate);
    newDate.setDate(dailyDate.getDate() + (direction === "next" ? 1 : -1));
    setDailyDate(newDate);

    if (viewMode === "daily") {
      setWeeklyDate(new Date(newDate));
      setMonthlyDate(new Date(newDate));
    }
  };

  const changeWeek = (direction: "prev" | "next") => {
    const newDate = new Date(weeklyDate);
    newDate.setDate(weeklyDate.getDate() + (direction === "next" ? 7 : -7));
    setWeeklyDate(newDate);

    if (viewMode === "weekly") {
      setMonthlyDate(new Date(newDate));
    }
  };

  const changeMonth = (direction: "prev" | "next") => {
    const newDate = new Date(monthlyDate);
    newDate.setMonth(monthlyDate.getMonth() + (direction === "next" ? 1 : -1));
    setMonthlyDate(newDate);
  };

  return {
    viewMode,
    setViewMode,
    currentDate: getCurrentDate(),
    isInCurrent,
    changeDay,
    changeWeek,
    changeMonth,
    dailyDate,
    weeklyDate,
    monthlyDate,
  };
}
