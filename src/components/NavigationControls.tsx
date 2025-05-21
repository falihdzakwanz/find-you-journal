import { ViewMode } from "@/types/viewMode.type";

type Props = {
  viewMode: ViewMode;
  changeDay?: (dir: "prev" | "next") => void;
  changeWeek: (dir: "prev" | "next") => void;
  changeMonth: (dir: "prev" | "next") => void;
};

export default function NavigationControls({
  viewMode,
  changeDay,
  changeWeek,
  changeMonth,
}: Props) {
  const getChangeFunction = () => {
    switch (viewMode) {
      case "daily":
        return changeDay;
      case "weekly":
        return changeWeek;
      case "monthly":
        return changeMonth;
      default:
        return changeWeek;
    }
  };

  const change = getChangeFunction();

  if (!change) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => change("prev")}
        className="px-3 py-1 text-sm text-white rounded bg-primary"
      >
        &larr; Sebelumnya
      </button>
      <button
        onClick={() => change("next")}
        className="px-3 py-1 text-sm text-white rounded bg-primary"
      >
        Berikutnya &rarr;
      </button>
    </div>
  );
}
